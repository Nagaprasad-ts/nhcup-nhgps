<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationConfirmed;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class RazorpayWebhookController extends Controller
{
    /**
     * Handle incoming Razorpay webhook events.
     *
     * Razorpay signs every webhook payload using HMAC-SHA256 with your
     * Webhook Secret. Always verify the signature before acting on the event.
     *
     * Dashboard → Settings → Webhooks → add endpoint:
     *   https://yourdomain.com/razorpay/webhook
     * Subscribe to event: payment.captured
     */
    public function handle(Request $request)
    {
        Log::info('Razorpay webhook hit', [
            'event'     => $request->json('event'),
            'signature' => $request->header('X-Razorpay-Signature'),
            'body'      => $request->getContent(),
        ]);
        $webhookSecret = config('services.razorpay.webhook_secret');
        $webhookBody   = $request->getContent();
        $webhookHeader = $request->header('X-Razorpay-Signature');

        // ── 1. Verify Signature ──────────────────────────────────────────────
        if (! $this->isSignatureValid($webhookBody, $webhookHeader, $webhookSecret)) {
            Log::warning('Razorpay webhook: invalid signature', [
                'ip' => $request->ip(),
            ]);

            return response()->json(['status' => 'invalid_signature'], 400);
        }

        $payload = $request->json()->all();
        $event   = $payload['event'] ?? null;

        Log::info('Razorpay webhook received', ['event' => $event]);

        // ── 2. Handle payment.captured ───────────────────────────────────────
        if ($event === 'payment.captured') {
            $this->handlePaymentCaptured($payload);
        }

        // ── 3. Handle payment.failed (optional) ─────────────────────────────
        if ($event === 'payment.failed') {
            $this->handlePaymentFailed($payload);
        }

        return response()->json(['status' => 'ok']);
    }

    // ─── Private Helpers ─────────────────────────────────────────────────────

    private function isSignatureValid(string $body, ?string $header, string $secret): bool
    {
        if (empty($header)) {
            return false;
        }

        $expectedSignature = hash_hmac('sha256', $body, $secret);

        return hash_equals($expectedSignature, $header);
    }

    private function handlePaymentCaptured(array $payload): void
    {
        $payment = $payload['payload']['payment']['entity'] ?? null;

        if (! $payment) {
            Log::error('Razorpay webhook: missing payment entity in payload');
            return;
        }

        $orderId   = $payment['order_id']  ?? null;
        $paymentId = $payment['id']        ?? null;

        if (! $orderId) {
            Log::error('Razorpay webhook: missing order_id', ['payment_id' => $paymentId]);
            return;
        }

        $registration = Registration::where('razorpay_order_id', $orderId)->first();

        if (! $registration) {
            Log::warning('Razorpay webhook: registration not found', ['order_id' => $orderId]);
            return;
        }

        // Idempotency guard — do not re-process already captured payments
        if ($registration->payment_status === 'paid') {
            Log::info('Razorpay webhook: payment already captured, skipping', ['order_id' => $orderId]);
            return;
        }

        // ── Update registration ──────────────────────────────────────────────
        $registration->update([
            'razorpay_payment_id' => $paymentId,
            'payment_status'      => 'paid',
        ]);

        // ── Send confirmation email ──────────────────────────────────────────
        if (! $registration->email_sent) {
            try {
                Mail::to($registration->captain_email)
                    ->send(new RegistrationConfirmed($registration));

                $registration->update(['email_sent' => true]);

                Log::info('Registration confirmation email sent', [
                    'registration_id' => $registration->id,
                    'email'           => $registration->captain_email,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to send registration confirmation email', [
                    'registration_id' => $registration->id,
                    'error'           => $e->getMessage(),
                ]);
            }
        }
    }

    private function handlePaymentFailed(array $payload): void
    {
        $payment = $payload['payload']['payment']['entity'] ?? null;
        $orderId = $payment['order_id'] ?? null;

        if (! $orderId) {
            return;
        }

        Registration::where('razorpay_order_id', $orderId)
            ->where('payment_status', 'pending')
            ->update(['payment_status' => 'failed']);

        Log::info('Razorpay webhook: payment marked as failed', ['order_id' => $orderId]);
    }
}
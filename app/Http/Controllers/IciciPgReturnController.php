<?php

namespace App\Http\Controllers;

use App\Mail\SkillBuilderRegistrationConfirmed;
use App\Models\SkillBuilderRegistration;
use App\Services\IciciPgService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class IciciPgReturnController extends Controller
{
    /**
     * Handle the POST return from ICICI PG after payment completion.
     *
     * ICICI redirects the user's browser back to our returnURL via POST,
     * including all transaction response parameters in the request body.
     */
    public function handle(Request $request, IciciPgService $pgService): RedirectResponse
    {
        $responseData = $request->all();

        Log::info('ICICI PG return URL hit', $responseData);

        $merchantTxnNo = $responseData['merchantTxnNo'] ?? null;

        if (! $merchantTxnNo) {
            Log::error('ICICI PG return: missing merchantTxnNo in response');

            return redirect()->route('home');
        }

        $registration = SkillBuilderRegistration::firstWhere('pg_merchant_txn_no', $merchantTxnNo);

        if (! $registration) {
            Log::error('ICICI PG return: registration not found', ['merchantTxnNo' => $merchantTxnNo]);

            return redirect()->route('home');
        }

        // Idempotency guard — return URL can be hit more than once
        if ($registration->payment_status === 'paid') {
            return redirect()->route('skill-builder.success', ['registration_id' => $registration->id]);
        }

        // Verify secureHash to ensure the response is genuinely from ICICI
        if (! $pgService->verifyResponseHash($responseData)) {
            Log::warning('ICICI PG return: secureHash mismatch', [
                'merchantTxnNo' => $merchantTxnNo,
            ]);
        }

        // ICICI PG uses responseCode "0000" for a successful payment
        $isSuccess = ($responseData['responseCode'] ?? '') === '0000';

        if ($isSuccess) {
            // Response field names vary by payment mode — check all known variants
            $pgPaymentId = $responseData['paymentID']  // card payments
                ?? $responseData['txnID']              // UPI / wallet
                ?? $responseData['pgTxnNo']            // older modes
                ?? $responseData['bankTxnNo']          // net banking
                ?? null;

            $registration->update([
                'pg_payment_id' => $pgPaymentId,
                'payment_status' => 'paid',
            ]);

            // Send confirmation email only if the parent provided one
            if (! $registration->email_sent && $registration->email) {
                try {
                    Mail::to($registration->email)
                        ->send(new SkillBuilderRegistrationConfirmed($registration));

                    $registration->update(['email_sent' => true]);

                    Log::info('Skill Builder confirmation email sent', [
                        'registration_id' => $registration->id,
                        'email' => $registration->email,
                    ]);
                } catch (\Exception $e) {
                    Log::error('Failed to send Skill Builder confirmation email', [
                        'registration_id' => $registration->id,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            return redirect()->route('skill-builder.success', ['registration_id' => $registration->id]);
        }

        $registration->update(['payment_status' => 'failed']);

        Log::info('ICICI PG return: payment failed', [
            'merchantTxnNo' => $merchantTxnNo,
            'responseCode' => $responseData['responseCode'] ?? 'N/A',
        ]);

        return redirect()->route('skill-builder.register')->with('payment_failed', true);
    }
}

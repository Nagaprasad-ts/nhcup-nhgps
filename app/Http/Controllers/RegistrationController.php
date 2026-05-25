<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use App\Services\IciciPgService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    /** Available events for the NH Cup. */
    public function create()
    {
        $events = Event::active()
            ->where('id', '!=', 1)
            ->orderBy('name')
            ->get(['id', 'name', 'fee']);

        return Inertia::render('Registration/Create', [
            'events' => $events,
        ]);
    }

    public function basketball()
    {
        $events = Event::active()
            ->where('id', 1)
            ->orderBy('name')
            ->get(['id', 'name', 'fee']);

        return Inertia::render('Basketball/Create', [
            'events' => $events,
        ]);
    }

    // ─── Create PG Order & Store Pending Registration ─────────────────────────

    public function store(Request $request, IciciPgService $pgService)
    {
        $validated = $request->validate([
            'institution_name' => ['required', 'string', 'max:255'],
            'ped_name' => ['required', 'string', 'max:255'],
            'ped_contact' => ['required', 'digits:10'],
            'captain_name' => ['required', 'string', 'max:255'],
            'captain_email' => ['required', 'email', 'max:255'],
            'captain_contact' => ['required', 'digits:10'],
            'event_id' => ['required', 'integer', 'exists:events,id'],
        ]);

        $event = Event::active()->findOrFail($validated['event_id']);

        // Create the pending registration first so we have an ID for merchantTxnNo
        $registration = Registration::create([
            ...$validated,
            'payment_status' => 'pending',
            'amount' => $event->fee,
        ]);

        try {
            $merchantTxnNo = $pgService->buildMerchantTxnNo($registration->id);

            $registration->update(['pg_merchant_txn_no' => $merchantTxnNo]);

            $params = array_filter([
                'merchantId' => config('services.icici_pg.merchant_id'),
                'merchantTxnNo' => $merchantTxnNo,
                'amount' => number_format((float) $event->fee, 2, '.', ''),
                'aggregatorID' => config('services.icici_pg.aggregator_id') ?: null,
                'currencyCode' => '356',
                'payType' => '0',
                'customerEmailID' => $validated['captain_email'],
                'customerName' => $validated['captain_name'],
                'customerMobileNo' => $validated['captain_contact'],
                'transactionType' => 'SALE',
                'txnDate' => now()->format('Ymd').'235959',
                'returnURL' => config('app.url').'/thank-you',
            ], fn ($value) => $value !== null);

            $response = $pgService->initiateSale($params);

            if (($response['responseCode'] ?? '') !== 'R1000') {
                throw new \Exception('ICICI PG rejected the initiateSale request. Response code: '.($response['responseCode'] ?? 'N/A'));
            }

            $paymentUrl = $pgService->buildPaymentUrl(
                $response['redirectURI'],
                $response['tranCtx']
            );

            return response()->json([
                'registration_id' => $registration->id,
                'payment_url' => $paymentUrl,
            ]);

        } catch (\Exception $e) {
            Log::error('ICICI PG initiateSale failed', [
                'error' => $e->getMessage(),
                'registration_id' => $registration->id,
                'data' => $validated,
            ]);

            $registration->delete();

            return response()->json([
                'message' => 'Payment initiation failed. Please try again.',
            ], 500);
        }
    }

    // ─── Registration Success Page ───────────────────────────────────────────

    public function success(Request $request)
    {
        $registration = null;

        if ($request->has('registration_id')) {
            $registration = Registration::find($request->registration_id);
        }

        return Inertia::render('Registration/Success', [
            'registration' => $registration ? [
                'captain_name' => $registration->captain_name,
                'institution_name' => $registration->institution_name,
                'event' => $registration->event->name,
                'payment_status' => $registration->payment_status,
            ] : null,
        ]);
    }

    public function viewBrochure()
    {
        $path = public_path('brochure-file/NHCUP-2026-BROCHURE.pdf');

        return response()->file($path, ['Content-Type' => 'application/pdf']);
    }
}

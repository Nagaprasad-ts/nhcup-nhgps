<?php

namespace App\Http\Controllers;

use App\Models\EventSetting;
use App\Models\Programme;
use App\Models\SkillBuilderRegistration;
use App\Services\IciciPgService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class SkillBuilderRegistrationController extends Controller
{
    /**
     * Show the registration form.
     * Passes payment_failed flash into the page so the form can show a banner.
     * Programmes and fees are loaded from the database.
     */
    public function create(Request $request): Response
    {
        $setting = EventSetting::get();

        return Inertia::render('Register', [
            'paymentFailed' => $request->session()->pull('payment_failed', false),
            'programmes' => Programme::orderBy('sort_order')->get()->map(fn ($p) => [
                'key' => $p->key,
                'emoji' => $p->emoji,
                'name' => $p->name,
                'short_desc' => $p->short_desc,
                'days' => $p->days,
                'schedule' => $p->schedule,
            ])->values(),
            'event' => HomeController::eventData(),
        ]);
    }

    /**
     * Validate the form, create a pending registration,
     * call ICICI initiateSale, and return the payment URL as JSON.
     */
    public function store(Request $request, IciciPgService $pgService): JsonResponse
    {
        $validated = $request->validate([
            'childName' => ['required', 'string', 'max:100'],
            'childAge' => ['required', 'string', 'in:3 years,4 years,5 years,6 years,7 years,8 years'],
            'programme' => ['required', 'string', 'in:A,B,C,AB,AC,BC,ABC'],
            'parentName' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'digits:10'],
            'email' => ['required', 'email', 'max:150'],
        ]);

        // Fee is determined by number of bundles selected (length of programme string)
        $feesMap = EventSetting::get()->feesMap();
        $fee = $feesMap[strlen($validated['programme'])];

        // Create the pending row first so we have an ID for merchantTxnNo
        $registration = SkillBuilderRegistration::create([
            'child_name' => $validated['childName'],
            'child_age' => $validated['childAge'],
            'programme' => $validated['programme'],
            'parent_name' => $validated['parentName'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'payment_status' => 'pending',
            'amount' => $fee,
        ]);

        try {
            $merchantTxnNo = $pgService->buildMerchantTxnNo($registration->id);

            $registration->update(['pg_merchant_txn_no' => $merchantTxnNo]);

            $params = array_filter([
                'merchantId' => config('services.icici_pg.merchant_id'),
                'merchantTxnNo' => $merchantTxnNo,
                'amount' => number_format((float) $fee, 2, '.', ''),
                'aggregatorID' => config('services.icici_pg.aggregator_id') ?: null,
                'currencyCode' => '356',
                'payType' => '0',
                'customerEmailID' => $validated['email'],
                'customerName' => $validated['parentName'],
                'customerMobileNo' => $validated['phone'],
                'transactionType' => 'SALE',
                'txnDate' => now()->format('Ymd').'235959',
                'returnURL' => config('app.url').'/thank-you',
            ], fn ($value) => $value !== null && $value !== '');

            Log::info('Sending to ICICI PG initiateSale', ['params' => $params]);

            $response = $pgService->initiateSale($params);

            Log::info('ICICI PG initiateSale response', ['response' => $response]);

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
            Log::error('ICICI PG initiateSale failed for Skill Builder', [
                'error' => $e->getMessage(),
                'registration_id' => $registration->id,
            ]);

            $registration->delete();

            return response()->json([
                'message' => 'Payment initiation failed. Please try again.',
            ], 500);
        }
    }

    /**
     * Post-payment success page.
     * ICICI redirects here via IciciPgReturnController after a successful payment.
     */
    public function success(Request $request): Response
    {
        $registration = null;

        if ($request->has('registration_id')) {
            $registration = SkillBuilderRegistration::find($request->registration_id);
        }

        return Inertia::render('RegisterSuccess', [
            'registration' => $registration ? [
                'parent_name' => $registration->parent_name,
                'child_name' => $registration->child_name,
                'programme' => $registration->programme,
                'phone' => $registration->phone,
                'payment_status' => $registration->payment_status,
                'pg_payment_id' => $registration->pg_payment_id,
            ] : null,
        ]);
    }
}

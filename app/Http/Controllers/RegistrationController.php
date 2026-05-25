<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Razorpay\Api\Api;

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
            'events'          => $events,
            'razorpay_key_id' => config('services.razorpay.key_id'),
        ]);
    }

    public function basketball()
    {
        $events = Event::active()
            ->where('id', 1)
            ->orderBy('name')
            ->get(['id', 'name', 'fee']);

        return Inertia::render('Basketball/Create', [
            'events'          => $events,
            'razorpay_key_id' => config('services.razorpay.key_id'),
        ]);
    }

    // ─── Create Razorpay Order & Store Pending Registration ──────────────────

    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution_name' => ['required', 'string', 'max:255'],
            'ped_name'         => ['required', 'string', 'max:255'],
            'ped_contact'      => ['required', 'digits:10'],
            'captain_name'     => ['required', 'string', 'max:255'],
            'captain_email'    => ['required', 'email', 'max:255'],
            'captain_contact'  => ['required', 'digits:10'],
            'event_id'         => ['required', 'integer', 'exists:events,id'],
        ]);

        $event = Event::active()->findOrFail($validated['event_id']);
        try {
            $api = new Api(
                config('services.razorpay.key_id'),
                config('services.razorpay.key_secret')
            );

            $amountInPaise = (int) ($event->fee * 100);

            $order = $api->order->create([
                'amount'          => $amountInPaise,
                'currency'        => 'INR',
                'receipt'         => 'nhcup_' . uniqid(),
                'payment_capture' => 1,   // auto-capture
                'notes'           => [
                    'institution' => $validated['institution_name'],
                    'event'       => $event->name,
                    'captain'     => $validated['captain_name'],
                ],
            ]);

            $registration = Registration::create([
                ...$validated,
                'razorpay_order_id' => $order['id'],
                'payment_status'    => 'pending',
                'amount'            => $event->fee,
            ]);

            return response()->json([
                'registration_id' => $registration->id,
                'order_id'        => $order['id'],
                'amount'          => $amountInPaise,
                'currency'        => 'INR',
                'key_id'          => config('services.razorpay.key_id'),
                'name'            => $validated['captain_name'],
                'email'           => $validated['captain_email'],
                'contact'         => $validated['captain_contact'],
                'description'     => 'NH Cup 2026 — ' . $event->name,
            ]);

        } catch (\Exception $e) {
            Log::error('Razorpay order creation failed', [
                'error' => $e->getMessage(),
                'data'  => $validated,
            ]);

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
                'captain_name'     => $registration->captain_name,
                'institution_name' => $registration->institution_name,
                'event'            => $registration->event->name,
                'payment_status'   => $registration->payment_status,
            ] : null,
        ]);
    }

    public function viewBrochure()
    {
        $path = public_path('brochure-file/NHCUP-2026-BROCHURE.pdf');
        return response()->file($path, ['Content-Type' => 'application/pdf']);
    }
}
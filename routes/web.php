<?php

use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RazorpayWebhookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| NH Cup Registration Routes
|--------------------------------------------------------------------------
*/
 
// ── Public Registration ────────────────────────────────────────────────────────
Route::get('/', fn() => Inertia::render('Home'))->name('home');
Route::get('/brochure/view', [RegistrationController::class, 'viewBrochure'])->name('brochure.view');
// Route::get('/register',  [RegistrationController::class, 'create'])->name('registration.create');
// Route::post('/register', [RegistrationController::class, 'store'])->name('registration.store');
// Route::get('/register/success', [RegistrationController::class, 'success'])->name('registration.success');
// Route::get('/basketball', [RegistrationController::class, 'basketball'])->name('registration.basketball');
 
// ── Razorpay Webhook ───────────────────────────────────────────────────────────
// This route is excluded from CSRF verification (see App\Http\Middleware\VerifyCsrfToken)
Route::post('/razorpay/webhook', [RazorpayWebhookController::class, 'handle'])
    ->name('razorpay.webhook');
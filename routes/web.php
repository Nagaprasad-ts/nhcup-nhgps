<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IciciPgReturnController;
use App\Http\Controllers\SkillBuilderRegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Skill Builder for Kids — Main Website
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::get('/terms-and-conditions', fn () => Inertia::render('TermsAndConditions'))->name('terms');
Route::get('/privacy-policy', fn () => Inertia::render('PrivacyPolicy'))->name('privacy');
Route::get('/refund-policy', fn () => Inertia::render('RefundPolicy'))->name('refund');
Route::get('/cancellation-policy', fn () => Inertia::render('CancellationPolicy'))->name('cancellation');

Route::get('/register', [SkillBuilderRegistrationController::class, 'create'])
    ->name('skill-builder.register');

Route::post('/register', [SkillBuilderRegistrationController::class, 'store'])
    ->name('skill-builder.store');

Route::get('/register/success', [SkillBuilderRegistrationController::class, 'success'])
    ->name('skill-builder.success');

/*
|--------------------------------------------------------------------------
| ICICI PG Return URL
| CSRF verification is excluded for this route (see bootstrap/app.php).
| ICICI POSTs payment response to this URL after the user completes payment.
|--------------------------------------------------------------------------
*/

Route::post('/thank-you', [IciciPgReturnController::class, 'handle'])
    ->name('pg.return');

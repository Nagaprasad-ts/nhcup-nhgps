<?php

use App\Http\Controllers\IciciPgReturnController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Skill Builder for Kids — Main Website
|--------------------------------------------------------------------------
*/

Route::get('/', fn () => Inertia::render('SkillBuilder/Home'))->name('home');
Route::get('/register', fn () => Inertia::render('SkillBuilder/Register'))->name('skill-builder.register');

/*
|--------------------------------------------------------------------------
| NH Cup Registration Routes
|--------------------------------------------------------------------------
*/

Route::get('/nhcup', [RegistrationController::class, 'create'])->name('registration.create');
Route::post('/nhcup/register', [RegistrationController::class, 'store'])->name('registration.store');
Route::get('/nhcup/success', [RegistrationController::class, 'success'])->name('registration.success');
Route::get('/nhcup/basketball', [RegistrationController::class, 'basketball'])->name('registration.basketball');
Route::get('/brochure/view', [RegistrationController::class, 'viewBrochure'])->name('brochure.view');

// ── ICICI PG Return URL ────────────────────────────────────────────────────────
// CSRF verification is excluded for this route (see bootstrap/app.php).
// ICICI POSTs payment response to this URL after the user completes payment.
Route::post('/thank-you', [IciciPgReturnController::class, 'handle'])->name('pg.return');

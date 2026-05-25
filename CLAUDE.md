# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**NH Cup 2026** is a Laravel + React/Inertia application for managing sports tournament registration with integrated payment processing via ICICI Bank PG Direct. The app handles team registrations across multiple events with email confirmations.

### Core Features
- Public-facing registration form for sports event participation
- ICICI Bank PG Direct payment gateway (full-page redirect flow)
- Event management with dynamic fee structures
- Automated email confirmations post-payment via return URL handler
- Admin panel (Filament) for managing events and registrations
- Role-based access control (Spatie Permissions)

## Tech Stack

**Backend:** Laravel 13, PHP 8.4
**Frontend:** React 19, Inertia.js v3, Tailwind CSS v4
**Database:** SQLite (dev), supports MySQL
**Payment:** ICICI Bank PG Direct (`initiateSale` API)
**Build:** Vite, Tailwind, TypeScript
**Admin Panel:** Filament v5
**Testing:** Pest 4
**Code Quality:** Pint (PHP), ESLint, Prettier, TypeScript strict mode
**Queue:** Database-backed (configured in .env)

## Common Commands

### Development
```bash
# Start local dev server (auto runs Laravel + Vite + Queue listener)
composer run dev

# Build frontend for production
npm run build
```

### Testing & Linting
```bash
# Run all tests
php artisan test --compact

# Run a single test file
php artisan test tests/Feature/ExampleTest.php

# Run tests matching a pattern
php artisan test --compact --filter=testName

# Lint PHP code (auto-fixes) — run after every PHP file change
vendor/bin/pint --dirty

# Lint JavaScript/TypeScript
npm run lint

# Check TypeScript types
npm run types:check
```

### Database & Migrations
```bash
# Run migrations
php artisan migrate

# Fresh migration (drops all tables, re-runs all migrations)
php artisan migrate:fresh --seed

# Create a new migration
php artisan make:migration create_table_name
```

### Admin & Configuration
```bash
# Generate Wayfinder route functions (TypeScript) — run after changing routes
php artisan wayfinder:generate

# Clear config cache after .env changes
php artisan config:clear
```

## Project Structure

### Backend Architecture

**Models** (`app/Models/`)
- `User` — Application users; Filament admin access gated via Spatie Permissions (`super_admin` or `core-team` role)
- `Event` — Sports events with `is_active` flag and `fee`; scoped via `Event::active()`
- `Registration` — Team registration records tracking PG payment state (`pg_merchant_txn_no`, `pg_payment_id`, `payment_status`)

**Controllers** (`app/Http/Controllers/`)
- `RegistrationController` — Renders registration forms, calls `IciciPgService` to initiate payment, returns `payment_url` JSON, and renders the success page
- `IciciPgReturnController` — Handles the POST from ICICI on `/thank-you` after payment completes; updates registration status and sends confirmation email

**Services** (`app/Services/`)
- `IciciPgService` — All ICICI PG Direct logic: alphabetical-sort HMAC-SHA256 hash generation, `initiateSale` API call via `Http::post`, response hash verification, `merchantTxnNo` construction, and payment URL assembly

### Payment Flow (ICICI PG Direct)

```
User submits form
  → POST /register (RegistrationController::store)
  → Create pending Registration record
  → Build merchantTxnNo = "NH" + zero-padded registration ID (20 chars)
  → ksort all params alphabetically, HMAC-SHA256 values, add secureHash
  → POST to ICICI initiateSale API → get redirectURI + tranCtx
  → Return { payment_url: "redirectURI?tranCtx=..." } as JSON
  → Frontend: window.location.href = payment_url
  → User completes payment on ICICI's hosted page
  → ICICI POSTs response to POST /thank-you (IciciPgReturnController::handle)
  → Verify response secureHash, check responseCode === "0000"
  → Update Registration: status = paid, pg_payment_id = pgTxnNo/bankTxnNo
  → Send RegistrationConfirmed email (fire-and-forget)
  → Redirect → GET /register/success?registration_id=X
```

**Key difference from webhook-based gateways:** ICICI uses a browser POST redirect to the `returnURL` (not a server-to-server webhook). The user's browser carries the POST body to `/thank-you`. This is why `/thank-you` is excluded from CSRF protection in `bootstrap/app.php`.

### Frontend Architecture

**Pages** (`resources/js/Pages/`)
- `Home.tsx` — Landing page with tournament info and brochure download
- `Registration/Create.tsx` — Multi-event registration form; POSTs to `/register`, redirects browser to `payment_url`
- `Basketball/Create.tsx` — Basketball-only registration form (fixed event, same payment flow)
- `Registration/Success.tsx` — Post-payment confirmation page

**Frontend Pattern**
- Form submits via `axios.post('/register', ...)` → receives `{ payment_url }` → sets `step = 'redirecting'` → `window.location.href = payment_url`
- No payment SDK loaded on frontend; ICICI payment happens on their hosted page

### Database Schema

**registrations table** (key columns)
- `pg_merchant_txn_no` — ICICI transaction reference (`NH` + 18-digit padded ID), unique, nullable
- `pg_payment_id` — ICICI payment ID from return URL response (`pgTxnNo`/`bankTxnNo`), unique, nullable
- `payment_status` — enum: `pending` | `paid` | `failed`
- `amount` — registration fee in rupees (integer)
- `email_sent` — boolean, prevents duplicate confirmation emails

**events table**: `id`, `name`, `fee`, `is_active`, `timestamps`

### Configuration

**`config/services.php` → `icici_pg`**
```
ICICI_PG_MERCHANT_ID     — from onboarding email
ICICI_PG_AGGREGATOR_ID   — from onboarding email (optional; omit if not provided)
ICICI_PG_KEY_SECRET      — HMAC secret downloaded from dashboard
ICICI_PG_API_URL         — UAT: https://pgpayuat.icicibank.com/tsp/pg/api/v2/initiateSale
                           Live: https://pgpay.icicibank.com/pg/api/v2/initiateSale
```

## Key Architectural Decisions

1. **Registration-first, then PG call:** The `Registration` record is created before calling ICICI (to get the ID for `merchantTxnNo`). If the ICICI call fails, the pending registration is deleted. This avoids orphaned records on API failure.

2. **Pending → Paid via return URL:** Unlike webhook-based gateways, ICICI sends the payment result as a POST to `returnURL` through the user's browser. The return URL handler at `POST /thank-you` verifies the `secureHash` and updates status.

3. **`responseCode === "0000"` for success:** The return URL uses `0000` for success (different from `R1000` used by the `initiateSale` response). Log the full response during UAT testing to confirm — check `storage/logs/laravel.log`.

4. **Idempotency guard:** `IciciPgReturnController` checks `payment_status === 'paid'` before re-processing, preventing duplicate emails if the return URL is hit twice.

5. **Aggregator ID is optional:** If `ICICI_PG_AGGREGATOR_ID` is empty, it's excluded from the request via `array_filter`. The HMAC is computed only over the fields actually sent.

6. **Event-Scoped Queries:** `Event::active()` scope filters inactive events, allowing admins to close registration without deleting data.

## Important Notes

- **CSRF exclusion:** `POST /thank-you` is excluded from CSRF verification in `bootstrap/app.php` — required because the POST comes from ICICI's redirect, not a form with a CSRF token.
- **`txnDate` format:** Sent as `YYYYMMDD235959` (today's date at 23:59:59) to ensure it is always greater than the initiation time, as required by ICICI.
- **Email configuration:** Dev uses log driver (check `storage/logs/`); production requires SMTP setup.
- **Brochure file:** Served from `public/brochure-file/NHCUP-2026-BROCHURE.pdf`; ensure the file exists before deployment.
- **Vite build:** Run `npm run build` before deploying; if a frontend change isn't visible, run `npm run dev` or `composer run dev`.

## Skills to Use When Developing

Always activate the relevant skill for your current task:
- **laravel-best-practices** — When modifying controllers, models, migrations, queries, or backend patterns
- **pest-testing** — When writing or fixing tests
- **inertia-react-development** — When working with React pages, forms, or Inertia integration
- **tailwindcss-development** — When styling components or building responsive layouts
- **wayfinder-development** — When connecting frontend to backend routes/controllers

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Skill Builder for Kids** — a children's after-school programme registration site for New Horizon Gurukul Pre School. Parents register their child, pay via ICICI Bank, and receive a confirmation email.

## Tech Stack

**Backend:** Laravel 13, PHP 8.4  
**Frontend:** React 19, Inertia.js v3, Tailwind CSS v4  
**Database:** SQLite (dev), supports MySQL  
**Payment:** ICICI Bank PG Direct (`initiateSale` API)  
**Admin Panel:** Filament v5 (`/admin`)  
**Testing:** Pest 4  
**Code Quality:** Pint (PHP), ESLint, Prettier, TypeScript strict mode  
**Queue:** Database-backed  

## Common Commands

```bash
# Start dev server (Laravel + Vite + Queue listener)
composer run dev

# Build frontend for production
npm run build

# Run all tests
php artisan test --compact

# Run a single test
php artisan test --compact --filter=TestName

# Lint PHP (auto-fixes) — run after every PHP file change
vendor/bin/pint --dirty

# Lint JS/TS (auto-fixes)
npm run lint

# Check TypeScript types
npm run types:check

# Fresh migration + seed (resets DB)
php artisan migrate:fresh --seed

# Regenerate Wayfinder route helpers — run after any route or controller method change
php artisan wayfinder:generate

# Clear config cache after .env changes
php artisan config:clear
```

## Route Map

| Method | URL | Handler | Notes |
|--------|-----|---------|-------|
| `GET` | `/` | `Inertia::render('Home')` | Landing page |
| `GET` | `/register` | `SkillBuilderRegistrationController::create` | Form; passes `paymentFailed` flash |
| `POST` | `/register` | `SkillBuilderRegistrationController::store` | Returns `{ payment_url }` JSON |
| `GET` | `/register/success` | `SkillBuilderRegistrationController::success` | Post-payment page |
| `POST` | `/thank-you` | `IciciPgReturnController::handle` | ICICI browser-POST return URL |
| `GET` | `/admin` | Filament panel | Gated by `super_admin` or `core-team` role |

`POST /thank-you` is excluded from CSRF in `bootstrap/app.php`.

## Frontend Architecture

`app.tsx` resolves Inertia pages as `./pages/${name}.tsx`. Pages live flat in `resources/js/pages/`:

- `Home.tsx` — landing page
- `Register.tsx` — registration form (uses `axios.post`, not Inertia `useForm`)
- `RegisterSuccess.tsx` — post-payment confirmation
- `components/` — Hero, Programmes, WhyParents, Schedule, FooterCTA, ScrollToTop, Toast, RegistrationModal

### Why `axios.post` instead of Inertia `useForm` in Register.tsx

`POST /register` returns JSON (`{ payment_url }`), not an Inertia response. On success, the frontend does `window.location.href = payment_url` to redirect to ICICI's hosted page. Validation errors (HTTP 422) come back as `{ errors: { fieldName: 'message' } }` and are shown per-field. The `paymentFailed` boolean prop (Inertia shared prop, from session flash) triggers a dismissable banner when ICICI redirects back after a failed payment.

### Skill Builder Brand

Defined in `resources/css/app.css` via Tailwind v4 `@theme`:
- `navy` → `#0f2f5e`, `coral` → `#f05a28`, `iceblue` → `#e8f4ff`
- Font: Nunito — wrap pages in `className="font-nunito"`
- CSS utilities: `.card-pink`, `.card-blue`, `.card-green`, `.lift`, `.float`, `.toast-show`
- Google Fonts `@import` must come **before** `@import 'tailwindcss'` (PostCSS requirement)

### Images

All images are in `public/images/` — reference as `/images/filename`. Logo: `/images/nhgps_logo.png`.

## Backend Architecture

### Payment Flow

```
POST /register
  → Validate (all fields required; email mandatory for ICICI)
  → Create pending SkillBuilderRegistration (gets DB ID for merchantTxnNo)
  → Build merchantTxnNo: "SB" + 10-digit Unix timestamp + 8-digit zero-padded ID (20 chars total)
  → Call IciciPgService::initiateSale()
      [on failure → delete registration row, return 500 JSON]
  → Return { registration_id, payment_url } JSON
  → Frontend: window.location.href = payment_url
  → User pays on ICICI hosted page
  → ICICI browser-POSTs to POST /thank-you
  → Verify secureHash
  → responseCode "0000" = success; update to paid, send confirmation email
  → Redirect to GET /register/success?registration_id=X

On payment failure:
  → Update status to "failed"
  → Redirect to GET /register with payment_failed flash
```

### IciciPgService (`app/Services/IciciPgService.php`)

- `initiateSale(array $params)` — adds `secureHash`, POSTs to ICICI, returns decoded JSON
- `generateSecureHash(array $data)` — `ksort` keys → concat values → `hash_hmac('sha256', ...)`  
- `verifyResponseHash(array $responseData)` — strips `secureHash`, recomputes, compares
- `buildMerchantTxnNo(int $id)` — `"SB" . str_pad(now()->timestamp, 10) . str_pad($id, 8)` — timestamp prefix prevents P1006 collisions after DB resets
- `buildPaymentUrl(string $redirectUri, string $tranCtx)` — `redirectUri?tranCtx=<encoded>`

### Key constants / config

**Programme fees** — defined in `SkillBuilderRegistrationController::FEES` (rupees). **Update before going live.**

**`config/services.php` → `icici_pg`:**
```
ICICI_PG_MERCHANT_ID    — merchant ID
ICICI_PG_AGGREGATOR_ID  — optional; omitted from request if empty (via array_filter)
ICICI_PG_KEY_SECRET     — HMAC secret
ICICI_PG_API_URL        — UAT: https://pgpayuat.icicibank.com/tsp/pg/api/v2/initiateSale
                          Live: https://pgpay.icicibank.com/pg/api/v2/initiateSale
```

`txnDate` is always sent as `YYYYMMDD235959` (end of day) — ICICI requires it to be greater than initiation time.

`aggregatorID` is excluded from the request (and therefore the secureHash) via `array_filter` when empty.

`customerEmailID` is **mandatory** per ICICI spec — the form enforces email as required.

### ICICI response codes

- `R1000` — `initiateSale` API call accepted
- `0000` — payment successful (on `/thank-you` return URL)
- `P1006` — "Merchant reference number should be unique" — merchantTxnNo already used in ICICI's system. Solved by embedding the Unix timestamp in the txnNo (`SB` + 10-digit timestamp + 8-digit ID) so it is unique even after `migrate:fresh` resets auto-increment IDs.

### Payment ID field priority (on return URL)

`paymentID` (cards) → `txnID` (UPI/wallet) → `pgTxnNo` → `bankTxnNo`

### Admin Panel

Filament v5 at `/admin`. Two resources:
- **Skill Builder Registrations** — filterable by programme, payment status, age; badge-coloured payment status
- **Users** — role management via Spatie Permissions

Roles: `super_admin`, `core-team` (seeded by `UserSeeder`).  
Filament v5 uses `getNavigationGroup(): ?string` method — not the `$navigationGroup` property (type conflict with parent).

### Wayfinder

`resources/js/actions/` and `resources/js/routes/` are auto-generated. Re-run `php artisan wayfinder:generate` after any route or controller method change. Never edit these files manually.

## Skills to Use When Developing

- **laravel-best-practices** — controllers, models, migrations, queries
- **pest-testing** — writing or fixing tests
- **inertia-react-development** — React pages, Inertia navigation
- **tailwindcss-development** — styling, responsive layouts
- **wayfinder-development** — after changing routes or controller methods

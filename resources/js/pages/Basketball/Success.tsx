import { Head, Link } from '@inertiajs/react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegistrationSummary {
  captain_name    : string
  institution_name: string
  event           : string
  payment_status  : 'pending' | 'paid' | 'failed'
}

interface Props {
  registration: RegistrationSummary | null
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Success({ registration }: Props) {
  return (
    <>
      <Head title="Registration Successful - NH Cup" />

      <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg w-full">

          {/* Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800 mb-2">You're Registered! 🎉</h1>

          {registration ? (
            <>
              <p className="text-slate-500 text-sm mb-6">
                Hi <strong>{registration.captain_name}</strong>, your registration for{' '}
                <strong>{registration.event}</strong> representing{' '}
                <strong>{registration.institution_name}</strong> has been received.
              </p>

              {registration.payment_status === 'paid' ? (
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-full px-4 py-2 mb-6">
                  ✅ Payment Confirmed
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold rounded-full px-4 py-2 mb-6">
                  ⏳ Payment Verification Pending
                </div>
              )}

              <p className="text-slate-400 text-xs mb-8">
                A confirmation email will be sent to the captain's email address
                once the payment is verified (usually within a few minutes).
              </p>
            </>
          ) : (
            <p className="text-slate-500 text-sm mb-8">
              Your registration has been submitted. A confirmation email will be sent
              to the captain's email address once payment is verified.
            </p>
          )}

          <Link
            href="/register"
            className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white
                       text-sm font-semibold rounded-lg transition-colors"
          >
            Register Another Team
          </Link>
        </div>
      </div>
    </>
  )
}
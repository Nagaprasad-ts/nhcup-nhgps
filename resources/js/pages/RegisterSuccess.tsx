import { Head, router } from '@inertiajs/react'
import Navbar from './components/Navbar'

interface Registration {
  parent_name: string
  child_name: string
  programme: string
  phone: string
  payment_status: string
  pg_payment_id: string | null
}

interface Props {
  registration: Registration | null
}

const PROGRAMME: Record<string, { emoji: string; name: string }> = {
  A: { emoji: '🧠', name: 'Brain Builders Programme' },
  B: { emoji: '🎨', name: 'Confidence & Expression Programme' },
  C: { emoji: '⚽', name: 'Movement & Sports Foundation' },
}

/** Expand 'ABC' → [{emoji,name}, {emoji,name}, {emoji,name}] */
function expandProgramme(key: string) {
  return key.split('').map(k => PROGRAMME[k]).filter(Boolean)
}

export default function RegisterSuccess({ registration }: Props) {
  return (
    <div className="font-nunito min-h-screen" style={{ background: '#FFF8EE' }}>
      <Head title="Registration Confirmed — Skill Builder for Kids" />
      <Navbar />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-2xl font-black text-navy mb-2">Registration Confirmed!</h2>

        {registration ? (
          <>
            <p className="text-gray-500 font-semibold text-sm mb-1">
              Thank you, <span className="text-navy font-black">{registration.parent_name}</span>!
            </p>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-3">
              <span className="text-navy font-black">{registration.child_name}</span> is enrolled in:
            </p>
            <div className="flex flex-col gap-1.5 mb-4">
              {expandProgramme(registration.programme).map(p => (
                <div key={p.name} className="flex items-center justify-center gap-2">
                  <span className="text-base">{p.emoji}</span>
                  <span className="text-coral font-black text-sm">{p.name}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-6">
              Our team will contact you on{' '}
              <span className="text-navy font-black">{registration.phone}</span> with session details.
            </p>

            {registration.pg_payment_id && (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 mb-4 text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Payment ID
                </p>
                <p className="text-xs font-black text-navy font-mono break-all">
                  {registration.pg_payment_id}
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-sm font-semibold mb-6">
            Your payment was successful and your spot is confirmed!
          </p>
        )}

        <div className="bg-[#FFF8E7] border border-amber-200 rounded-2xl px-5 py-4 mb-6 text-left">
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">
            📅 What's Next
          </p>
          <p className="text-xs text-gray-600 font-semibold leading-relaxed">
            Programme starts <strong>June 2026</strong>. Our team will call you with the exact
            schedule. Keep this confirmation for your records.
          </p>
        </div>

        <button
          onClick={() => router.visit('/')}
          className="w-full py-3.5 rounded-full font-black text-navy text-sm shadow-lg hover:brightness-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg,#FFE234,#ffd000)' }}
        >
          ← Back to Home
        </button>
      </div>
      </div>
    </div>
  )
}

import { Head, router } from '@inertiajs/react'
import { useState  } from 'react'
import type {FormEvent} from 'react';
import type { FormData } from './types'

const EMPTY_FORM: FormData = {
  childName: '',
  childAge: '',
  programme: '',
  parentName: '',
  phone: '',
  email: '',
}

const programmes = [
  {
    value: 'A',
    emoji: '🧠',
    name: 'Brain Builders',
    days: 'Mon & Thu',
    desc: 'Abacus, Coding, Puzzles, Logic',
    border: 'border-pink-300',
    bg: 'bg-pink-50',
    badge: 'bg-pink-100 text-pink-700',
    activeBorder: 'border-pink-500',
    activeBg: 'bg-pink-50',
    dot: 'bg-pink-400',
    accent: 'accent-pink-500',
  },
  {
    value: 'B',
    emoji: '🎨',
    name: 'Confidence & Expression',
    days: 'Tue & Fri',
    desc: 'Dance, Music, Art, Public Speaking',
    border: 'border-sky-300',
    bg: 'bg-sky-50',
    badge: 'bg-sky-100 text-sky-700',
    activeBorder: 'border-sky-500',
    activeBg: 'bg-sky-50',
    dot: 'bg-sky-400',
    accent: 'accent-sky-500',
  },
  {
    value: 'C',
    emoji: '⚽',
    name: 'Movement & Sports',
    days: 'Wed & Sat',
    desc: 'Karate, Agility, Coordination',
    border: 'border-green-300',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
    activeBorder: 'border-green-500',
    activeBg: 'bg-green-50',
    dot: 'bg-green-500',
    accent: 'accent-green-500',
  },
  {
    value: 'All ABC',
    emoji: '🌟',
    name: 'All ABC — Complete',
    days: 'Mon to Sat',
    desc: 'Full holistic development package',
    border: 'border-orange-300',
    bg: 'bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    activeBorder: 'border-coral',
    activeBg: 'bg-orange-50',
    dot: 'bg-coral',
    accent: 'accent-orange-500',
  },
]

export default function Register() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.childName || !form.childAge || !form.programme || !form.parentName || !form.phone) {
      setError('Please fill in all required fields.')

      return
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError('Enter a valid 10-digit phone number.')

      return
    }

    setSubmitted(true)
  }

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="font-nunito min-h-screen flex items-center justify-center px-4" style={{ background: '#FFF8EE' }}>
        <Head title="Registration Submitted — Skill Builder" />
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-navy mb-2">Registration Submitted!</h2>
          <p className="text-gray-500 font-semibold text-sm mb-1">
            Thank you, <span className="text-navy font-black">{form.parentName}</span>!
          </p>
          <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-6">
            We've received the registration for{' '}
            <span className="text-navy font-black">{form.childName}</span> — Programme{' '}
            <span className="text-coral font-black">{form.programme}</span>.<br />
            Our team will contact you on{' '}
            <span className="text-navy font-black">{form.phone}</span> shortly.
          </p>
          <div className="bg-[#FFF8E7] border border-amber-200 rounded-2xl px-5 py-4 mb-6 text-left">
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">📅 What's Next</p>
            <p className="text-xs text-gray-600 font-semibold leading-relaxed">
              Registration begins <strong>May 1, 2026</strong>. Programme starts <strong>June 2026</strong>. Seats are limited — you're on the list!
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
    )
  }

  /* ── Form page ── */
  return (
    <div className="font-nunito min-h-screen" style={{ background: '#FFF8EE' }}>
      <Head title="Register Your Child — Skill Builder" />

      {/* ── Top nav ── */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.visit('/')}
            className="flex items-center gap-2 text-navy font-bold text-sm hover:text-coral transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </button>
          <img src="/images/nhgps_logo.png" alt="NHGPS" className="h-10 w-auto object-contain" />
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-navy uppercase tracking-widest">Skill Builder for Kids</p>
            <p className="text-[10px] text-gray-400 font-semibold">June 2026 – March 2027</p>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">

        {/* Page title */}
        <div className="text-center mb-10">
          <p className="text-coral font-black text-xs uppercase tracking-[0.2em] mb-2">New Horizon Gurukul Pre School</p>
          <h1 className="text-3xl sm:text-4xl font-black text-navy mb-3">Register Your Child</h1>
          <p className="text-gray-500 font-semibold text-sm max-w-md mx-auto leading-relaxed">
            Fill in the details below and we'll get in touch to confirm your child's spot.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ══ LEFT: Form ══ */}
          <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">

              {/* Child details */}
              <div>
                <h3 className="text-xs font-black text-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-[10px] font-black flex items-center justify-center">1</span>
                  Child's Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5" htmlFor="childName">
                      Child's Full Name <span className="text-coral">*</span>
                    </label>
                    <input
                      id="childName"
                      type="text"
                      required
                      placeholder="e.g. Arjun Sharma"
                      value={form.childName}
                      onChange={e => setForm(f => ({ ...f, childName: e.target.value }))}
                      className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none focus:border-coral transition-colors bg-gray-50 placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5" htmlFor="childAge">
                      Age <span className="text-coral">*</span>
                    </label>
                    <select
                      id="childAge"
                      required
                      value={form.childAge}
                      onChange={e => setForm(f => ({ ...f, childAge: e.target.value }))}
                      className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none focus:border-coral bg-gray-50"
                    >
                      <option value="">Select age</option>
                      {[3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={`${n} years`}>{n} years</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Programme selection */}
              <div>
                <h3 className="text-xs font-black text-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-[10px] font-black flex items-center justify-center">2</span>
                  Choose Programme <span className="text-coral">*</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {programmes.map(prog => (
                    <label
                      key={prog.value}
                      className={`flex items-start gap-3 rounded-2xl p-4 cursor-pointer border-2 transition-all ${
                        form.programme === prog.value
                          ? `${prog.activeBorder} ${prog.activeBg} shadow-sm`
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="programme"
                        value={prog.value}
                        className={`mt-1 ${prog.accent}`}
                        checked={form.programme === prog.value}
                        onChange={e => setForm(f => ({ ...f, programme: e.target.value }))}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">{prog.emoji}</span>
                          <p className="text-xs font-black text-navy">{prog.name}</p>
                        </div>
                        <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-1 ${prog.badge}`}>
                          {prog.days}
                        </span>
                        <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">{prog.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Parent details */}
              <div>
                <h3 className="text-xs font-black text-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-[10px] font-black flex items-center justify-center">3</span>
                  Parent / Guardian Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5" htmlFor="parentName">
                      Parent's Name <span className="text-coral">*</span>
                    </label>
                    <input
                      id="parentName"
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={form.parentName}
                      onChange={e => setForm(f => ({ ...f, parentName: e.target.value }))}
                      className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none focus:border-coral transition-colors bg-gray-50 placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5" htmlFor="phone">
                      Phone Number <span className="text-coral">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      maxLength={10}
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
                      className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none focus:border-coral transition-colors bg-gray-50 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5" htmlFor="email">
                      Email Address <span className="text-gray-300">(optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="parent@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none focus:border-coral transition-colors bg-gray-50 placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-red-600 text-xs font-bold">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-black text-navy text-base shadow-lg hover:brightness-105 active:scale-[0.98] transition-all"
                style={{ background: 'linear-gradient(135deg,#FFE234,#ffd000)' }}
              >
                ✦ Submit Registration
              </button>

              <p className="text-center text-gray-400 text-xs font-semibold">
                By submitting, you agree to be contacted by New Horizon Gurukul Pre School.
              </p>

            </form>
          </div>

          {/* ══ RIGHT: Info panel ══ */}
          <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-4">

            {/* Quick info */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <p className="text-[10px] font-black text-coral uppercase tracking-widest mb-4">Programme Info</p>
              <div className="space-y-3">
                {[
                  { icon: '📅', label: 'Duration',  value: 'June 2026 – March 2027' },
                  { icon: '🕐', label: 'Weekdays',  value: '1:30 PM – 2:30 PM' },
                  { icon: '🌅', label: 'Saturday',  value: '9:00 AM – 10:00 AM' },
                  { icon: '👦', label: 'Age Group', value: '3 to 8 Years' },
                  { icon: '📞', label: 'Contact',   value: '+91 9606911078' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-lg w-8 flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">{label}</p>
                      <p className="text-xs font-black text-navy">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Did you know */}
            <div className="rounded-3xl p-6" style={{ background: 'linear-gradient(135deg,#0a1f4e,#0f2f5e)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💡</span>
                <p className="text-[#FFE234] font-black text-xs uppercase tracking-widest">Did You Know?</p>
              </div>
              <p className="text-5xl font-black text-[#FFE234] leading-none mb-1">90%</p>
              <p className="text-white/70 text-xs font-bold mb-3">of a child's brain develops before age 8</p>
              <div className="h-px bg-white/10 mb-3" />
              <p className="text-white/60 text-xs font-semibold leading-relaxed">
                Early structured activities in{' '}
                <span className="text-[#FFE234] font-extrabold">movement, music &amp; problem-solving</span>{' '}
                build stronger neural connections for life.
              </p>
            </div>

            {/* Open to all banner */}
            <div className="rounded-3xl p-5 text-center"
              style={{ background: 'linear-gradient(135deg,#FFE234,#ffd000)' }}>
              <p className="text-navy font-black text-lg">Open To All ✦</p>
              <p className="text-navy/70 text-xs font-bold">Age 3–8 · Registration from May 1, 2026</p>
              <p className="text-navy/60 text-[10px] font-semibold mt-1">Limited seats per batch</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

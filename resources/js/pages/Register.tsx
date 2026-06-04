import axios from 'axios'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import type { EventData, ProgrammeSlim } from '../types'

// Styling constants keyed by key — cosmetics only, content comes from DB
const BUNDLE_STYLES: Record<string, {
  badgeBg: string; badgeText: string
  activeBorder: string; activeBg: string; checkAccent: string
}> = {
  A: { badgeBg: 'bg-pink-100', badgeText: 'text-pink-700', activeBorder: 'border-pink-500', activeBg: 'bg-pink-50', checkAccent: 'accent-pink-500' },
  B: { badgeBg: 'bg-sky-100',  badgeText: 'text-sky-700',  activeBorder: 'border-sky-500',  activeBg: 'bg-sky-50',  checkAccent: 'accent-sky-500'  },
  C: { badgeBg: 'bg-green-100',badgeText: 'text-green-700',activeBorder: 'border-green-500',activeBg: 'bg-green-50',checkAccent: 'accent-green-500'},
}

interface Props {
  paymentFailed?: boolean
  programmes: ProgrammeSlim[]
  event: EventData
}

interface FormData {
  childName: string
  childAge: string
  parentName: string
  phone: string
  email: string
}

interface FieldErrors {
  childName?: string
  childAge?: string
  programme?: string
  parentName?: string
  phone?: string
  email?: string
}

const EMPTY: FormData = { childName: '', childAge: '', parentName: '', phone: '', email: '' }

export default function Register({ paymentFailed = false, programmes, event }: Props) {
  const [data, setData] = useState<FormData>(EMPTY)
  const [selectedBundles, setSelectedBundles] = useState<string[]>([])
  const [errors, setErrors] = useState<FieldErrors>({})
  const [bundleError, setBundleError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showFailedBanner, setShowFailedBanner] = useState(paymentFailed)

  function getFee(count: number): number {
    if (count === 1) {
      return event.fee_1_bundle
    }
    
    if (count === 2) {
      return event.fee_2_bundles
    }
    
    if (count === 3) {
      return event.fee_3_bundles
    }
    
    return 0
  }

  const set = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData(prev => ({ ...prev, [field]: e.target.value }))

  const toggleBundle = (key: string) => {
    setBundleError('')
    setSelectedBundles(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key],
    )
  }

  // Sort selected keys and join → 'A', 'AB', 'ABC', etc.
  const programme = [...selectedBundles].sort().join('')
  const fee = getFee(selectedBundles.length)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (selectedBundles.length === 0) {
      setBundleError('Please select at least one programme.')
      
      return
    }

    setErrors({})
    setServerError('')
    setProcessing(true)

    try {
      const response = await axios.post('/register', { ...data, programme })
      window.location.href = response.data.payment_url
    } catch (err: unknown) {
      setProcessing(false)
      
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors ?? {})
        } else {
          setServerError(
            err.response?.data?.message ?? 'Something went wrong. Please try again.',
          )
        }
      } else {
        setServerError('Something went wrong. Please try again.')
      }
    }
  }

  const navRight = (
    <div className="text-right hidden sm:block">
      <p className="text-[10px] font-black text-navy uppercase tracking-widest">Skill Builder for Kids</p>
      <p className="text-[10px] text-gray-400 font-semibold">{event.start_date} – {event.end_date}</p>
    </div>
  )

  return (
    <AppLayout title="Register Your Child" navRight={navRight}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">

        {/* Payment failed banner */}
        {showFailedBanner && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4">
            <span className="text-red-500 text-lg mt-0.5">⚠️</span>
            <div className="flex-1">
              <p className="text-red-700 font-black text-sm">Payment was not completed</p>
              <p className="text-red-500 text-xs font-semibold mt-0.5">Your registration was not confirmed. Please try again.</p>
            </div>
            <button onClick={() => setShowFailedBanner(false)} className="text-red-400 hover:text-red-600 text-lg font-black leading-none">×</button>
          </div>
        )}

        {/* Server error banner */}
        {serverError && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4">
            <span className="text-red-500 text-lg mt-0.5">⚠️</span>
            <p className="text-red-700 font-black text-sm flex-1">{serverError}</p>
            <button onClick={() => setServerError('')} className="text-red-400 hover:text-red-600 text-lg font-black leading-none">×</button>
          </div>
        )}

        {/* Page title */}
        <div className="text-center mb-10">
          <p className="text-coral font-black text-xs uppercase tracking-[0.2em] mb-2">New Horizon Gurukul Pre School</p>
          <h1 className="text-3xl sm:text-4xl font-black text-navy mb-3">Register Your Child</h1>
          <p className="text-gray-500 font-semibold text-sm max-w-md mx-auto leading-relaxed">
            Choose your programme(s), fill in the details, and complete payment to secure the spot.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ══ LEFT: Form ══ */}
          <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">

              {/* 1 — Programme selection */}
              <div>
                <h3 className="text-xs font-black text-navy uppercase tracking-widest mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-[10px] font-black flex items-center justify-center">1</span>
                  Choose Programme(s) <span className="text-coral">*</span>
                </h3>
                <p className="text-[10px] text-gray-400 font-semibold mb-4 ml-8">Select one, two, or all three bundles</p>

                <div className="space-y-3">
                  {programmes.map(bundle => {
                    const style = BUNDLE_STYLES[bundle.key] ?? BUNDLE_STYLES.A
                    const selected = selectedBundles.includes(bundle.key)
                    
                    return (
                      <label
                        key={bundle.key}
                        className={`flex items-start gap-4 rounded-2xl p-4 cursor-pointer border-2 transition-all ${
                          selected
                            ? `${style.activeBorder} ${style.activeBg} shadow-sm`
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className={`mt-1 w-4 h-4 rounded ${style.checkAccent} shrink-0`}
                          checked={selected}
                          onChange={() => toggleBundle(bundle.key)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-base">{bundle.emoji}</span>
                            <p className="text-xs font-black text-navy">{bundle.name}</p>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${style.badgeBg} ${style.badgeText}`}>
                              {bundle.days}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-semibold leading-relaxed ml-7">{bundle.schedule}</p>
                        </div>
                      </label>
                    )
                  })}
                </div>

                {bundleError && <p className="text-red-500 text-xs font-bold mt-2">{bundleError}</p>}
                {errors.programme && <p className="text-red-500 text-xs font-bold mt-2">{errors.programme}</p>}

                {/* Fee preview */}
                {selectedBundles.length > 0 && (
                  <div className="mt-4 flex items-center justify-between bg-navy/5 rounded-2xl px-5 py-3">
                    <p className="text-xs font-black text-navy">
                      {selectedBundles.length === 1 ? 'Any One Bundle' : selectedBundles.length === 2 ? 'Any Two Bundles' : 'All Three Bundles'}
                    </p>
                    <p className="text-lg font-black text-coral">₹{fee.toLocaleString('en-IN')}<span className="text-xs text-gray-400 font-semibold">/year</span></p>
                  </div>
                )}
              </div>

              <div className="h-px bg-gray-100" />

              {/* 2 — Child details */}
              <div>
                <h3 className="text-xs font-black text-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-[10px] font-black flex items-center justify-center">2</span>
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
                      value={data.childName}
                      onChange={set('childName')}
                      className={`w-full border-2 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none transition-colors bg-gray-50 placeholder:text-gray-300 ${errors.childName ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-coral'}`}
                    />
                    {errors.childName && <p className="text-red-500 text-xs font-bold mt-1">{errors.childName}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5" htmlFor="childAge">
                      Age <span className="text-coral">*</span>
                    </label>
                    <select
                      id="childAge"
                      required
                      value={data.childAge}
                      onChange={set('childAge')}
                      className={`w-full border-2 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none bg-gray-50 ${errors.childAge ? 'border-red-300' : 'border-gray-100 focus:border-coral'}`}
                    >
                      <option value="">Select age</option>
                      {[3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={`${n} years`}>{n} years</option>
                      ))}
                    </select>
                    {errors.childAge && <p className="text-red-500 text-xs font-bold mt-1">{errors.childAge}</p>}
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* 3 — Parent details */}
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
                      value={data.parentName}
                      onChange={set('parentName')}
                      className={`w-full border-2 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none transition-colors bg-gray-50 placeholder:text-gray-300 ${errors.parentName ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-coral'}`}
                    />
                    {errors.parentName && <p className="text-red-500 text-xs font-bold mt-1">{errors.parentName}</p>}
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
                      value={data.phone}
                      onChange={e => setData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                      className={`w-full border-2 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none transition-colors bg-gray-50 placeholder:text-gray-300 ${errors.phone ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-coral'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5" htmlFor="email">
                      Email Address <span className="text-coral">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="parent@email.com"
                      value={data.email}
                      onChange={set('email')}
                      className={`w-full border-2 rounded-2xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none transition-colors bg-gray-50 placeholder:text-gray-300 ${errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-coral'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing || selectedBundles.length === 0}
                className="w-full py-4 rounded-2xl font-black text-navy text-base shadow-lg hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg,#FFE234,#ffd000)' }}
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Redirecting to payment…
                  </span>
                ) : selectedBundles.length === 0 ? (
                  'Select a Programme to Continue'
                ) : (
                  `✦ Pay ₹${fee.toLocaleString('en-IN')} & Confirm`
                )}
              </button>

              <p className="text-center text-gray-400 text-xs font-semibold">
                You will be redirected to a secure ICICI Bank payment page.
              </p>
            </form>
          </div>

          {/* ══ RIGHT: Info panel ══ */}
          <div className="lg:w-75 shrink-0 flex flex-col gap-4">

            {/* Fee structure */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <p className="text-[10px] font-black text-coral uppercase tracking-widest mb-4">Fee Structure</p>
              <div className="space-y-3">
                {[
                  { label: 'Any One Bundle', fee: event.fee_1_bundle },
                  { label: 'Any Two Bundles', fee: event.fee_2_bundles },
                  { label: 'All Three Bundles', fee: event.fee_3_bundles },
                ].map(({ label, fee: f }) => (
                  <div key={label} className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-500">{label}</p>
                    <div className="text-right">
                      <p className="text-sm font-black text-navy">₹{f.toLocaleString('en-IN')}</p>
                      <p className="text-[9px] text-gray-400 font-semibold">per year</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programme info */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <p className="text-[10px] font-black text-coral uppercase tracking-widest mb-4">Programme Info</p>
              <div className="space-y-3">
                {[
                  { icon: '📅', label: 'Duration', value: `${event.start_date} – ${event.end_date}` },
                  { icon: '🕐', label: 'Mon–Fri', value: event.weekday_time },
                  { icon: '🌅', label: 'Sat & Sun', value: event.weekend_time },
                  { icon: '👦', label: 'Age Group', value: `${event.age_group_min} to ${event.age_group_max} Years` },
                  { icon: '📞', label: 'Contact', value: event.phone },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-lg w-8 shrink-0">{icon}</span>
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
              <p className="text-5xl font-black text-[#FFE234] leading-none mb-1">95%</p>
              <p className="text-white/70 text-xs font-bold mb-3">of a child's brain develops before age 8</p>
              <div className="h-px bg-white/10 mb-3" />
              <p className="text-white/60 text-xs font-semibold leading-relaxed">
                Early structured activities in{' '}
                <span className="text-[#FFE234] font-extrabold">movement, music &amp; problem-solving</span>{' '}
                build stronger neural connections for life.
              </p>
            </div>

            {/* Secure payment */}
            <div className="rounded-3xl p-5 text-center" style={{ background: 'linear-gradient(135deg,#FFE234,#ffd000)' }}>
              <p className="text-navy font-black text-lg">🔒 Secure Payment</p>
              <p className="text-navy/70 text-xs font-bold">Powered by ICICI Bank</p>
              <p className="text-navy/60 text-[10px] font-semibold mt-1">UPI · Cards · Net Banking · Wallets</p>
            </div>

          </div>

        </div>
      </div>
    </AppLayout>
  )
}

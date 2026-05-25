/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head } from '@inertiajs/react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface NhEvent {
  id  : number
  name: string
  fee : number   // in paise
}

interface Props {
  events          : NhEvent[]
  razorpay_key_id?: string
}

interface FormData {
  institution_name: string
  ped_name        : string
  ped_contact     : string
  captain_name    : string
  captain_email   : string
  captain_contact : string
  event_id        : string
}

interface FormErrors {
  institution_name?: string
  ped_name        ?: string
  ped_contact     ?: string
  captain_name    ?: string
  captain_email   ?: string
  captain_contact ?: string
  event_id        ?: string
}

interface OrderResponse {
  registration_id: number
  order_id       : string
  amount         : number
  currency       : string
  key_id         : string
  name           : string
  email          : string
  contact        : string
  description    : string
}

type Step = 'form' | 'processing' | 'failed'

// ─── Razorpay type declarations ───────────────────────────────────────────────

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key           : string
  amount        : number
  currency      : string
  name          : string
  description   : string
  image        ?: string
  order_id      : string
  prefill      ?: { name?: string; email?: string; contact?: string }
  theme        ?: { color?: string }
  modal        ?: { ondismiss?: () => void }
  handler       : (response: RazorpayPaymentResponse) => void
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id  : string
  razorpay_signature : string
}

interface RazorpayInstance {
  open: () => void
  on  : (event: string, callback: (data: unknown) => void) => void
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({ label, required, error, children }: {
  label   : string
  required?: boolean
  error   ?: string
  children : React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

function Input({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${error
          ? 'border-red-400 bg-red-50 focus:ring-red-400'
          : 'border-slate-300 bg-white hover:border-slate-400'
        }`}
    />
  )
}

function FeeBadge({ fee }: { fee: number }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
      fee === 60000
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-blue-100 text-blue-700'
    }`}>
      ₹{(fee)}
    </span>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Create({ events }: Props) {
  const [form, setForm]       = useState<FormData>({
    institution_name : '',
    ped_name         : '',
    ped_contact      : '',
    captain_name     : '',
    captain_email    : '',
    captain_contact  : '',
    event_id         : '',
  })
  const [errors, setErrors]   = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [step, setStep]       = useState<Step>('form')

  const selectedEvent = events.find((e) => String(e.id) === form.event_id) ?? null

  useEffect(() => {
    if (document.getElementById('razorpay-script')) {
        return
    }

    const script  = document.createElement('script')
    script.id     = 'razorpay-script'
    script.src    = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async  = true
    document.body.appendChild(script)
  }, [])

  const set = (field: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    
    if (!form.institution_name.trim()) { 
        errs.institution_name = 'Institution name is required.'
    }
    
    if (!form.ped_name.trim())         { 
        errs.ped_name         = "PED's name is required."
    }
    
    if (!form.ped_contact.trim())      { 
        errs.ped_contact      = "PED's contact number is required."
    }
    
    if (!form.captain_name.trim())     { 
        errs.captain_name     = "Captain's name is required."
    }
    
    if (!form.captain_email.trim())    { 
        errs.captain_email    = "Captain's email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.captain_email)) { 
        errs.captain_email    = 'Enter a valid email address.'
    }
    
    if (!form.captain_contact.trim())  { 
        errs.captain_contact  = "Captain's contact number is required."
    }
    
    if (!form.event_id) { 
        errs.event_id = 'Please select a participating event.'
    }
    
    return errs
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validate()
    
    if (Object.keys(errs).length) { 
        setErrors(errs); 
        
        return 
    }

    setLoading(true)
    
    try {
      const { data } = await axios.post<OrderResponse>('/register', {
        ...form,
        event_id: Number(form.event_id),
      })
      openRazorpay(data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors((err.response.data as { errors: FormErrors }).errors ?? {})
        } else {
          alert((err.response?.data as { message?: string })?.message ?? 'Something went wrong. Please try again.')
        }
      }
      
      setLoading(false)
    }
  }

  const openRazorpay = (orderData: OrderResponse) => {
    const options: RazorpayOptions = {
      key         : orderData.key_id,
      amount      : orderData.amount,
      currency    : orderData.currency,
      name        : 'NH Cup 2026',
      description : orderData.description,
      image       : '/logo.png',
      order_id    : orderData.order_id,
      prefill     : { name: orderData.name, email: orderData.email, contact: orderData.contact },
      theme       : { color: '#2563eb' },
      modal       : { ondismiss: () => setLoading(false) },
      handler     : (_response: RazorpayPaymentResponse) => {
        setStep('processing')
        setTimeout(() => {
          window.location.href = `/register/success?registration_id=${orderData.registration_id}`
        }, 2000)
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', () => { 
        setStep('failed'); setLoading(false) 
    })
    rzp.open()
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Processing Payment</h2>
          <p className="text-slate-500 text-sm">Please wait while we confirm your registration…</p>
        </div>
      </div>
    )
  }

  if (step === 'failed') {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Payment Failed</h2>
          <p className="text-slate-500 text-sm mb-6">Your payment could not be completed. No amount has been deducted.</p>
          <button
            onClick={() => setStep('form')}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head title="NH Cup 2026 – Registration" />

      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-slate-100 py-12 px-4">

        <div className="text-center mb-5 flex flex-col justify-center items-center">
          {/* <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">NH Cup 2026</h1> */}
          <img src='/images/logo.png' alt='NH Cup 2026' className='w-100 h-50'/>
          <p className="text-slate-500 text-sm">State Level Intercollegiate Tournament · 27-29 April 2026</p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-500" />

          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* Institution */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Institution Details</h2>
              <Field label="Name of Institution" required error={errors.institution_name}>
                <Input type="text" placeholder="e.g. New Horizon College of Engineering"
                  value={form.institution_name} onChange={set('institution_name')} error={errors.institution_name} />
              </Field>
            </div>

            {/* PED */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Physical Education Director (PED)</h2>
              <div className="space-y-4">
                <Field label="Name of PED" required error={errors.ped_name}>
                  <Input type="text" placeholder="Full name of the PED"
                    value={form.ped_name} onChange={set('ped_name')} error={errors.ped_name} />
                </Field>
                <Field label="Contact Number of PED" required error={errors.ped_contact}>
                  <Input type="tel" placeholder="+91 98765 43210"
                    value={form.ped_contact} onChange={set('ped_contact')} error={errors.ped_contact} />
                </Field>
              </div>
            </div>

            {/* Captain */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Captain Details</h2>
              <div className="space-y-4">
                <Field label="Name of Captain" required error={errors.captain_name}>
                  <Input type="text" placeholder="Full name of the team captain"
                    value={form.captain_name} onChange={set('captain_name')} error={errors.captain_name} />
                </Field>
                <Field label="Email Address of Captain" required error={errors.captain_email}>
                  <Input type="email" placeholder="captain@institution.edu"
                    value={form.captain_email} onChange={set('captain_email')} error={errors.captain_email} />
                  <p className="mt-1 text-xs text-slate-400">Confirmation email will be sent here after payment.</p>
                </Field>
                <Field label="Contact Number of Captain" required error={errors.captain_contact}>
                  <Input type="tel" placeholder="+91 98765 43210"
                    value={form.captain_contact} onChange={set('captain_contact')} error={errors.captain_contact} />
                </Field>
              </div>
            </div>

            {/* Event */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Event Selection</h2>
              <Field label="Participating Event" required error={errors.event_id}>
                <select
                  value={form.event_id}
                  onChange={set('event_id')}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white
                    ${errors.event_id ? 'border-red-400 bg-red-50' : 'border-slate-300 hover:border-slate-400'}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundSize: '1.5rem',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">— Select an event —</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={String(ev.id)}>
                      {ev.name} — ₹{ev.fee}
                    </option>

                  ))}
                </select>
              </Field>
              <p className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                One event can be selected per registration.
              </p>
            </div>

            {/* Payment Summary — live fee update */}
            <div className={`rounded-xl border p-4 flex items-center justify-between transition-all ${
              selectedEvent ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Registration Fee</p>
                {selectedEvent ? (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-extrabold text-blue-800">
                      ₹{selectedEvent.fee}
                    </p>
                    {/* <FeeBadge fee={selectedEvent.fee} /> */}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 mt-1">Select an event to see the fee</p>
                )}
              </div>
              <div className="text-right">
                {/* <img
                  src="https://razorpay.com/assets/razorpay-glyph.svg"
                  alt="Razorpay"
                  className="h-7 ml-auto mb-1"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).style.display = 'none' 
                }}
                />
                <p className="text-xs text-slate-500">Secured by Razorpay</p> */}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-linear-to-r from-blue-600 to-indigo-600
                         hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm
                         rounded-xl shadow-md hover:shadow-lg transition-all duration-150
                         disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Initiating Payment…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  {selectedEvent
                    ? `Register & Pay ₹${selectedEvent.fee}`
                    : 'Register & Pay'}
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              By registering you agree to the NH Cup rules and regulations. Payment is non-refundable.
            </p>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          © {new Date().getFullYear()} New Horizon College of Engineering — All rights reserved
        </p>
      </div>
    </>
  )
}
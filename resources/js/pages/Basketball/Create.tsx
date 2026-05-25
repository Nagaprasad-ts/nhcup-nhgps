import { Head } from '@inertiajs/react'
import axios from 'axios'
import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface NhEvent {
  id  : number
  name: string
  fee : number
}

interface Props {
  events: NhEvent[]
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
  payment_url    : string
}

type Step = 'form' | 'redirecting'

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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Create({ events }: Props) {
  const [form, setForm] = useState<FormData>({
    institution_name : '',
    ped_name         : '',
    ped_contact      : '',
    captain_name     : '',
    captain_email    : '',
    captain_contact  : '',
    event_id         : events[0] ? String(events[0].id) : '',
  })
  const [errors, setErrors]   = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [step, setStep]       = useState<Step>('form')

  const selectedEvent = events.find((e) => String(e.id) === form.event_id) ?? null

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

    if (!form.ped_name.trim()) {
      errs.ped_name = "PED's name is required."
    }

    if (!form.ped_contact.trim()) {
      errs.ped_contact = "PED's contact number is required."
    }

    if (!form.captain_name.trim()) {
      errs.captain_name = "Captain's name is required."
    }

    if (!form.captain_email.trim()) {
      errs.captain_email = "Captain's email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.captain_email)) {
      errs.captain_email = 'Enter a valid email address.'
    }

    if (!form.captain_contact.trim()) {
      errs.captain_contact = "Captain's contact number is required."
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
      setErrors(errs)

      return
    }

    setLoading(true)

    try {
      const { data } = await axios.post<OrderResponse>('/nhcup/register', {
        ...form,
        event_id: Number(form.event_id),
      })

      setStep('redirecting')
      window.location.href = data.payment_url
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

  if (step === 'redirecting') {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Redirecting to Payment</h2>
          <p className="text-slate-500 text-sm">Please wait, you are being redirected to the ICICI Bank payment page…</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head title="NH Cup 2026 – Registration" />

      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-slate-100 py-12 px-4">

        <div className="text-center mb-5 flex flex-col justify-center items-center">
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

            {/* Event — fixed to Basketball, read-only display */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Event Selection</h2>
              <Field label="Participating Event" required error={errors.event_id}>
                <input type="hidden" name="event_id" value={form.event_id} />
                <input
                  type="text"
                  value={events[0] ? `${events[0].name} — ₹${events[0].fee}` : ''}
                  disabled
                  className="w-full px-4 py-2.5 rounded-lg border text-sm border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </Field>
            </div>

            {/* Payment Summary */}
            <div className={`rounded-xl border p-4 flex items-center justify-between transition-all ${
              selectedEvent ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Registration Fee</p>
                {selectedEvent ? (
                  <p className="text-2xl font-extrabold text-blue-800 mt-1">₹{selectedEvent.fee}</p>
                ) : (
                  <p className="text-sm text-slate-400 mt-1">Select an event to see the fee</p>
                )}
              </div>
              <div className="text-right text-xs text-slate-400">
                Secured by ICICI Bank
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
                  {selectedEvent ? `Register & Pay ₹${selectedEvent.fee}` : 'Register & Pay'}
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

import { useState, useEffect, useCallback } from 'react'
import type { FormEvent } from 'react'
import type { ModalProps, FormData } from '../types'

const EMPTY_FORM: FormData = {
  childName: '',
  childAge: '',
  programme: '',
  parentName: '',
  phone: '',
  email: '',
}

export default function RegistrationModal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [error, setError] = useState('')

  const handleClose = useCallback(() => {
    setForm(EMPTY_FORM)
    setError('')
    onClose()
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
handleClose()
}
    }
    document.addEventListener('keydown', handler)

    return () => document.removeEventListener('keydown', handler)
  }, [handleClose])

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

    onSubmit()
  }

  if (!isOpen) {
return null
}

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-y-auto max-h-[92vh]">

        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg,#0f2f5e,#1a4a7e)' }}>
          <div>
            <h2 id="modalTitle" className="text-lg font-black text-white uppercase tracking-wide">
              Register Your Child
            </h2>
            <p className="text-blue-200 text-[10px] font-semibold">
              Skill Builder for Kids — New Horizon Gurukul
            </p>
          </div>
          <button onClick={handleClose} className="text-white hover:text-[#FFE234] transition-colors" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4" noValidate>

          {/* Child name + Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-black text-navy uppercase tracking-widest mb-1" htmlFor="childName">
                Child's Name <span className="text-coral">*</span>
              </label>
              <input
                id="childName"
                type="text"
                required
                placeholder="Arjun Sharma"
                value={form.childName}
                onChange={e => setForm(f => ({ ...f, childName: e.target.value }))}
                className="w-full border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-coral transition-colors bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-navy uppercase tracking-widest mb-1" htmlFor="childAge">
                Age <span className="text-coral">*</span>
              </label>
              <select
                id="childAge"
                required
                value={form.childAge}
                onChange={e => setForm(f => ({ ...f, childAge: e.target.value }))}
                className="w-full border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-coral bg-gray-50"
              >
                <option value="">Select age</option>
                {[3,4,5,6,7,8].map(n => (
                  <option key={n} value={`${n} years`}>{n} years</option>
                ))}
              </select>
            </div>
          </div>

          {/* Programme */}
          <div>
            <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-2">
              Programme <span className="text-coral">*</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { value: 'A', label: 'A — Brain Builders',          checked: 'border-pink-400 bg-pink-50',   hover: 'hover:border-pink-300',  accent: 'accent-pink-500'   },
                { value: 'B', label: 'B — Confidence & Expression', checked: 'border-sky-400 bg-sky-50',     hover: 'hover:border-sky-300',   accent: 'accent-sky-500'    },
                { value: 'C', label: 'C — Movement & Sports',       checked: 'border-green-400 bg-green-50', hover: 'hover:border-green-300', accent: 'accent-green-500'  },
                { value: 'All ABC', label: 'All ABC ✦',             checked: 'border-coral bg-orange-50',    hover: 'hover:border-coral',     accent: 'accent-orange-500' },
              ].map(({ value, label, checked, hover, accent }) => (
                <label
                  key={value}
                  className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2 cursor-pointer bg-gray-50 text-xs font-bold transition-colors ${hover} ${form.programme === value ? checked : 'border-gray-100'}`}
                >
                  <input
                    type="radio"
                    name="programme"
                    value={value}
                    className={accent}
                    checked={form.programme === value}
                    onChange={e => setForm(f => ({ ...f, programme: e.target.value }))}
                  />
                  <span className="text-navy">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Parent name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-black text-navy uppercase tracking-widest mb-1" htmlFor="parentName">
                Parent's Name <span className="text-coral">*</span>
              </label>
              <input
                id="parentName"
                type="text"
                required
                placeholder="Priya Sharma"
                value={form.parentName}
                onChange={e => setForm(f => ({ ...f, parentName: e.target.value }))}
                className="w-full border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-coral transition-colors bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-navy uppercase tracking-widest mb-1" htmlFor="phone">
                Phone <span className="text-coral">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="10-digit"
                maxLength={10}
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
                className="w-full border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-coral transition-colors bg-gray-50"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-black text-navy uppercase tracking-widest mb-1" htmlFor="email">
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
              placeholder="parent@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-coral transition-colors bg-gray-50"
            />
          </div>

          {/* Error */}
          {error && <p className="text-coral text-xs font-bold">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-navy text-navy font-black text-sm rounded-full py-2.5 hover:bg-navy hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-coral hover:brightness-110 text-white font-black text-sm rounded-full py-2.5 active:scale-95 transition-all shadow"
            >
              Submit Registration
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

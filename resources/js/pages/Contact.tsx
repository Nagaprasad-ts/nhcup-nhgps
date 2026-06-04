import { router } from '@inertiajs/react'
import AppLayout from '../layouts/AppLayout'
import type { EventData } from '../types'

interface Props {
  event: EventData
}

export default function Contact({ event }: Props) {
  return (
    <AppLayout title="Contact Us">

      {/* ── Page header ── */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-8">
        <div className="absolute -top-32 -right-32 w-100 h-100 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(240,90,40,0.10) 0%,transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle,#0f2f5e 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-coral font-black text-xs uppercase tracking-[0.25em] mb-3">
            New Horizon Gurukul Pre School
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-navy leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 font-semibold text-sm max-w-md mx-auto leading-relaxed">
            We'd love to hear from you. Visit us or give us a call — we're happy to answer all your questions.
          </p>
        </div>
      </section>

      {/* ── Contact card + map ── */}
      <section className="pb-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* ── Left: details ── */}
              <div className="p-8 sm:p-12 flex flex-col justify-between gap-8">

                <div>
                  <p className="text-coral font-black text-xs uppercase tracking-widest mb-6">Get in Touch</p>

                  {/* Address */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-11 h-11 rounded-2xl bg-iceblue flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f2f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Address</p>
                      <p className="text-sm font-black text-navy leading-snug">
                        124/2, Bhoganahalli Main Road,<br />
                        Bellandur, Bangalore - 560103
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-iceblue flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f2f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone / WhatsApp</p>
                      <a
                        href={`tel:${event.phone}`}
                        className="text-sm font-black text-navy hover:text-coral transition-colors"
                      >
                        📞 {event.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-iceblue rounded-2xl p-5">
                  <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-4">Programme Timings</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-semibold text-gray-500">Monday – Friday</p>
                      <p className="text-xs font-black text-navy">{event.weekday_time}</p>
                    </div>
                    <div className="h-px bg-navy/10" />
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-semibold text-gray-500">Saturday & Sunday</p>
                      <p className="text-xs font-black text-navy">{event.weekend_time}</p>
                    </div>
                    <div className="h-px bg-navy/10" />
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-semibold text-gray-500">Duration</p>
                      <p className="text-xs font-black text-navy">{event.start_date} – {event.end_date}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => router.visit('/register')}
                  className="w-full py-4 rounded-2xl font-black text-navy text-sm shadow-lg hover:brightness-105 active:scale-[0.98] transition-all"
                  style={{ background: 'linear-gradient(135deg,#FFE234,#ffd000)' }}
                >
                  ✦ Register Your Child
                </button>

              </div>

              {/* ── Right: map ── */}
              <div className="flex flex-col min-h-105 lg:min-h-0" style={{ background: '#0f2f5e' }}>

                {/* Branded map header */}
                <div className="px-6 py-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFE234" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#FFE234] font-black text-xs uppercase tracking-widest leading-none">Find Us</p>
                      <p className="text-white/50 text-[10px] font-semibold mt-0.5">Bellandur, Bangalore</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=New+Horizon+Gurukul+Pre+School+Bellandur+Bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-coral hover:brightness-110 active:scale-95 transition-all text-white font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    Directions
                  </a>
                </div>

                {/* Map iframe */}
                <div className="flex-1 relative" style={{ minHeight: '340px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7082819795783!2d77.6989917!3d12.9264615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1300749d4c43%3A0xa7629b2be6eeaade!2sNew%20Horizon%20Gurukul%20Pre%20School!5e0!3m2!1sen!2sin!4v1780384852522!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="New Horizon Gurukul Pre School location"
                  />
                </div>

                {/* Address strip */}
                <div className="px-6 py-3 flex items-center gap-2 shrink-0 border-t border-white/10">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFE234" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <p className="text-white/60 text-[10px] font-semibold">
                    124/2, Bhoganahalli Main Road, Bellandur, Bangalore - 560103
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

    </AppLayout>
  )
}

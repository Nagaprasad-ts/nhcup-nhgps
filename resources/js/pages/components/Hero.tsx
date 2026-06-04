import { router } from '@inertiajs/react'
import type { EventData } from '../../types'

interface HeroProps {
  onRegister: () => void
  event: EventData
}

export default function Hero({ onRegister, event }: HeroProps) {
  return (
    <section className="relative overflow-hidden min-h-screen" style={{ background: '#FFF8EE' }}>

      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-130 h-130 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(240,90,40,0.13) 0%,transparent 70%)' }} />
      <div className="absolute -bottom-24 -left-24 w-95 h-95 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(15,47,94,0.09) 0%,transparent 70%)' }} />
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(255,226,52,0.18) 0%,transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle,#0f2f5e 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-10 min-h-screen py-10">

        {/* ── LEFT: Text ── */}
        <div className="flex-1 flex flex-col justify-center py-8 lg:py-0">

          {/* Logo */}
          <div className="mb-7">
            <img src="/images/nhgps_logo.png" alt="New Horizon Gurukul Pre School"
              className="h-14 w-auto object-contain object-left" />
          </div>

          {/* Label pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-orange-200 shadow-sm rounded-full px-4 py-1.5 mb-5 w-fit">
            <span className="w-2 h-2 rounded-full bg-coral inline-block animate-pulse" />
            <p className="text-[11px] font-black text-navy uppercase tracking-widest">
              After-School Programme · Age 3–8
            </p>
          </div>

          {/* Heading */}
          <h1 className="font-black text-navy leading-none mb-4" style={{ fontSize: 'clamp(2.6rem,5vw,4rem)' }}>
            Where Every Child<br />
            Discovers Their<br />
            <span style={{ color: '#f05a28' }}>Superpower</span> ✦
          </h1>

          {/* Description */}
          <p className="text-gray-500 font-semibold text-base leading-relaxed mb-7 max-w-xl">
            A structured yet joyful after-school space where children aged 3–8 build{' '}
            <strong className="text-navy">cognitive, creative, and physical skills</strong> — one exciting session at a time.
          </p>

          {/* Programme cards */}
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 mb-8">
            <div className="bg-white rounded-2xl px-3 py-2.5 sm:px-4 shadow-sm border border-pink-100 flex items-center gap-2 sm:gap-2.5">
              <span className="text-lg sm:text-xl shrink-0">🧠</span>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-black text-pink-500 uppercase tracking-widest leading-none mb-0.5">
                  <span className="sm:hidden">Prog A</span>
                  <span className="hidden sm:inline">Programme A</span>
                </p>
                <p className="text-[10px] sm:text-xs font-extrabold text-navy truncate">
                  Brain Builders
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl px-3 py-2.5 sm:px-4 shadow-sm border border-sky-100 flex items-center gap-2 sm:gap-2.5">
              <span className="text-lg sm:text-xl shrink-0">🎨</span>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-black text-sky-500 uppercase tracking-widest leading-none mb-0.5">
                  <span className="sm:hidden">Prog B</span>
                  <span className="hidden sm:inline">Programme B</span>
                </p>
                <p className="text-[10px] sm:text-xs font-extrabold text-navy truncate">
                  <span className="sm:hidden">Confidence</span>
                  <span className="hidden sm:inline">Confidence &amp; Expression</span>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl px-3 py-2.5 sm:px-4 shadow-sm border border-green-100 flex items-center gap-2 sm:gap-2.5">
              <span className="text-lg sm:text-xl shrink-0">⚽</span>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-black text-green-500 uppercase tracking-widest leading-none mb-0.5">
                  <span className="sm:hidden">Prog C</span>
                  <span className="hidden sm:inline">Programme C</span>
                </p>
                <p className="text-[10px] sm:text-xs font-extrabold text-navy truncate">
                  <span className="sm:hidden">Movement</span>
                  <span className="hidden sm:inline">Movement &amp; Sports</span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-row items-stretch gap-3">
            <button
              onClick={onRegister}
              className="flex-1 sm:flex-none active:scale-95 text-navy font-black text-sm px-4 sm:px-8 py-3.5 rounded-full shadow-lg transition-all hover:brightness-105 text-center"
              style={{ background: 'linear-gradient(135deg,#FFE234,#ffd000)' }}
            >
              ✦ Register Now
            </button>
            <button
              onClick={() => router.visit('/about')}
              className="flex-1 sm:flex-none border-2 border-navy/25 hover:border-navy text-navy font-bold text-sm px-4 sm:px-8 py-3.5 rounded-full transition-all bg-white/60 backdrop-blur-sm text-center flex items-center justify-center"
            >
              Learn More →
            </button>
            <button
              onClick={() => router.visit('/contact')}
              className="flex-1 sm:flex-none border-2 border-navy/25 hover:border-navy text-navy font-bold text-sm px-4 sm:px-8 py-3.5 rounded-full transition-all bg-white/60 backdrop-blur-sm text-center items-center justify-center hidden sm:flex"
            >
              Contact Us
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-8 pt-6 border-t border-gray-200/70">
            {/* Mobile 2×2 grid */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              {[
                { value: event.start_date.split(' ').slice(1).join(' '), label: 'Start Date', color: 'text-navy' },
                { value: `${event.age_group_min}–${event.age_group_max} yrs`, label: 'Age Group', color: 'text-navy' },
                { value: 'Mon–Sat', label: 'Schedule', color: 'text-navy' },
                { value: event.registration_open_date, label: 'Reg. Opens', color: 'text-coral' },
              ].map(({ value, label, color }) => (
                <div key={label} className="text-center bg-white/60 rounded-2xl py-2.5">
                  <p className={`${color} font-black text-base`}>{value}</p>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
            {/* sm+ flex row */}
            <div className="hidden sm:flex items-center gap-5">
              <div className="text-center">
                <p className="text-navy font-black text-lg">{event.start_date.split(' ').slice(1).join(' ')}</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Start Date</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-navy font-black text-lg">{event.age_group_min}–{event.age_group_max} yrs</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Age Group</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-navy font-black text-lg">Mon–Sat</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Schedule</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-coral font-black text-lg">{event.registration_open_date}</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Reg. Opens</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Image ── */}
        <div className="relative shrink-0 w-full lg:w-105 flex items-center justify-center pb-8 lg:pb-0">

          {/* Decorative ring */}
          <div className="absolute inset-0 rounded-[3rem] pointer-events-none"
            style={{ background: 'linear-gradient(135deg,rgba(240,90,40,0.15),rgba(255,226,52,0.15))', transform: 'rotate(8deg)' }} />

          {/* Image card */}
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl w-full"
            style={{ maxWidth: '420px', height: 'clamp(300px,55vw,560px)', border: '4px solid #fff', boxShadow: '0 30px 70px rgba(15,47,94,0.18),0 0 0 1px rgba(240,90,40,0.1)' }}>
            <img src="/images/image1.jpg" alt="Skill Builder Kids"
              className="w-full h-full object-cover object-top" />
            <div className="absolute bottom-0 left-0 right-0 h-28"
              style={{ background: 'linear-gradient(to top,rgba(15,47,94,0.55),transparent)' }} />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-white font-black text-sm">New Horizon Gurukul Pre School</p>
              <p className="text-white/70 text-xs font-semibold">Skill Builder for Kids · 2026–27</p>
            </div>
          </div>

          {/* Floating badges — desktop only */}
          <div className="hidden lg:flex absolute -left-4 top-8 bg-white rounded-2xl px-3.5 py-2.5 shadow-xl items-center gap-2.5 float"
            style={{ border: '2px solid #f9a8d4' }}>
            <span className="text-lg">🧩</span>
            <div>
              <p className="text-[9px] font-black text-pink-400 uppercase tracking-widest leading-none mb-0.5">Brain</p>
              <p className="text-xs font-black text-navy">Abacus &amp; Coding</p>
            </div>
          </div>
          <div className="hidden lg:flex absolute -right-4 top-24 bg-white rounded-2xl px-3.5 py-2.5 shadow-xl items-center gap-2.5"
            style={{ border: '2px solid #7dd3fc', animation: 'float 4s ease-in-out infinite', animationDelay: '0.8s' }}>
            <span className="text-lg">🎤</span>
            <div>
              <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest leading-none mb-0.5">Expression</p>
              <p className="text-xs font-black text-navy">Public Speaking</p>
            </div>
          </div>
          <div className="hidden lg:flex absolute -right-3 bottom-20 bg-white rounded-2xl px-3.5 py-2.5 shadow-xl items-center gap-2.5"
            style={{ border: '2px solid #86efac', animation: 'float 3.8s ease-in-out infinite', animationDelay: '1.4s' }}>
            <span className="text-lg">🥋</span>
            <div>
              <p className="text-[9px] font-black text-green-500 uppercase tracking-widest leading-none mb-0.5">Sports</p>
              <p className="text-xs font-black text-navy">Karate &amp; Agility</p>
            </div>
          </div>

          {/* Stars — desktop only */}
          <div className="hidden lg:block absolute top-3 right-12 text-[#FFE234] text-2xl float" style={{ animationDelay: '0.3s' }}>✦</div>
          <div className="hidden lg:block absolute bottom-10 left-6 text-coral text-xl float" style={{ animationDelay: '1s' }}>✦</div>
          <div className="hidden lg:block absolute top-1/2 -left-8 text-pink-300 text-lg float" style={{ animationDelay: '0.6s' }}>★</div>
        </div>

      </div>
    </section>
  )
}

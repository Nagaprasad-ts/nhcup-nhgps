import { router } from '@inertiajs/react'
import AppLayout from '../layouts/AppLayout'
import type { EventData, ProgrammeAbout } from '../types'

// Styling constants keyed by key
const CARD_STYLES: Record<string, { cardClass: string; accentColor: string }> = {
  A: { cardClass: 'card-pink', accentColor: '#f9a8d4' },
  B: { cardClass: 'card-blue', accentColor: '#7dd3fc' },
  C: { cardClass: 'card-green', accentColor: '#86efac' },
}

const pillars = [
  { icon: '🧩', label: 'Memory Retention' },
  { icon: '💡', label: 'Problem-Solving' },
  { icon: '🎭', label: 'Self-Expression' },
  { icon: '🚀', label: 'Self-Confidence' },
  { icon: '🎨', label: 'Creativity' },
  { icon: '🤝', label: 'Social Skills' },
]

interface Props {
  programmes: ProgrammeAbout[]
  event: EventData
}

export default function About({ programmes, event }: Props) {
  const goToRegister = () => router.visit('/register')

  return (
    <AppLayout title="About">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 max-sm:pb-10 px-8 md:px-4">
        {/* Background blobs */}
        <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(240,90,40,0.10) 0%,transparent 70%)' }} />
        <div className="absolute -bottom-24 -left-24 w-95 h-95 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(15,47,94,0.08) 0%,transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle,#0f2f5e 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-coral font-black text-xs uppercase tracking-[0.25em] mb-4">
            New Horizon Gurukul Pre School
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-navy leading-tight mb-6">
            Help your Children<br />
            <span className="text-coral">Discover their</span> Superpowers
          </h1>
          <p className="text-gray-500 font-semibold text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            In today's rapidly evolving world, success belongs to those who can think creatively, adapt quickly, and approach challenges with confidence. Early childhood is the ideal stage to nurture these essential life skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={goToRegister}
              className="bg-coral text-white font-black text-base px-10 py-4 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Enroll Today ✦
            </button>
            <p className="text-gray-400 text-sm font-semibold">Open to all · Age {event.age_group_min}–{event.age_group_max} · Seats filling fast</p>
          </div>
        </div>
      </section>

      {/* ── What makes it special ── */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              <div>
                <p className="text-coral font-black text-xs uppercase tracking-widest mb-3">About Us</p>
                <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-4">
                  With this vision, Gurukul Pre-School has introduced a specially curated range of activity classes conducted twice a week that is open to kids who are non-horizonites as well.
                </p>
                <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-4">
                  While these sessions may appear to be fun-filled games and play activities, they are thoughtfully designed to strengthen key cognitive and developmental abilities. The programme enhances memory retention, encourages innovative problem-solving, stimulates creativity, fosters self-expression, and builds lasting self-confidence.
                </p>
                <p className="text-gray-500 font-semibold text-sm leading-relaxed">
                  Our signature programmes such as Brain Builders Programme, Confidence and Expression Programme, and Movement and Sports Foundation provide children with a strong foundation for lifelong learning and personal growth. Through engaging, age-appropriate activities, children learn to explore, express, and excel in a supportive environment.
                </p>
              </div>

              {/* Pillars grid */}
              <div className="grid grid-cols-2 gap-3">
                {pillars.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 bg-iceblue rounded-2xl p-4 text-center"
                  >
                    <span className="text-2xl">{icon}</span>
                    <p className="text-[10px] font-black text-navy uppercase tracking-widest leading-tight">{label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Brain stat banner ── */}
      <section className="py-10 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8"
            style={{ background: 'linear-gradient(135deg,#0a1f4e,#0f2f5e)' }}>
            <div className="text-center sm:text-left shrink-0">
              <p className="text-7xl sm:text-8xl font-black text-[#FFE234] leading-none">95%</p>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">of brain develops</p>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">before age 8</p>
            </div>
            <div className="h-px sm:h-20 sm:w-px bg-white/10 w-full" />
            <div className="text-center sm:text-left">
              <p className="text-[#FFE234] font-black text-sm uppercase tracking-widest mb-3">💡 Did You Know?</p>
              <p className="text-white font-semibold text-sm leading-relaxed">
                Children who regularly engage in <span className="text-[#FFE234] font-extrabold">movement, music, creativity,
                and problem-solving</span> activities develop stronger neural connections that improve focus,
                memory, learning ability, communication, and emotional confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three programmes ── */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-coral font-black text-xs uppercase tracking-widest mb-2">Our Signature Programmes</p>
            <h2 className="text-2xl sm:text-3xl font-black text-navy">Three Paths to Holistic Growth</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programmes.map(prog => {
              const s = CARD_STYLES[prog.key] ?? CARD_STYLES.A
              
              return (
              <div key={prog.key} className={`lift rounded-3xl p-6 ${s.cardClass}`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${s.accentColor}40` }}>
                  {prog.emoji}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white mb-3 inline-block"
                  style={{ background: s.accentColor }}>
                  {prog.days}
                </span>
                <h3 className="text-sm font-black text-navy mb-2 leading-snug">{prog.name}</h3>
                <p className="text-[11px] text-gray-500 font-semibold leading-relaxed mb-4">{prog.desc}</p>
                <ul className="space-y-1.5">
                  {prog.outcomes.map(o => (
                    <li key={o} className="flex items-start gap-2 text-[11px] text-gray-600 font-semibold">
                      <span className="text-green-500 font-black shrink-0 mt-0.5">✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )
            })}
          </div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section className="py-10 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-10">
            <p className="text-coral font-black text-xs uppercase tracking-widest mb-6 text-center">Why Parents Choose This Programme</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: '🌱', text: 'Holistic development beyond academics' },
                { icon: '🎯', text: 'Structured yet joyful learning' },
                { icon: '🏫', text: 'Safe & nurturing environment' },
                { icon: '👥', text: 'Small groups for personal attention' },
                { icon: '🔓', text: 'Open to non-Horizonites' },
                { icon: '✨', text: 'Activities designed for overall child development' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-iceblue rounded-2xl px-4 py-3">
                  <span className="text-xl shrink-0">{icon}</span>
                  <p className="text-xs font-black text-navy leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </AppLayout>
  )
}

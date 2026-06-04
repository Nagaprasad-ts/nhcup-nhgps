import { router } from '@inertiajs/react'
import type React from 'react'
import type { Programme } from '../../types'

const CheckIcon = ({ color }: { color: string }) => (
  <span className={`${color} mt-0.5 shrink-0`}>✦</span>
)

// Styling constants keyed by programme key — only cosmetics, content comes from DB
const STYLES: Record<string, {
  checkColor: string
  cardClass: string
  badgeBg: string
  badgeText: string
  letterBg: string
  tagBg: string
  tagText: string
  outcomeTitle: string
  btnStyle: React.CSSProperties
  btnHoverClass: string
  shadowColor: string
}> = {
  A: {
    checkColor: 'text-pink-400',
    cardClass: 'card-pink',
    badgeBg: 'bg-pink-100 border-pink-200',
    badgeText: 'text-pink-800',
    letterBg: 'bg-pink-400',
    tagBg: 'bg-pink-100',
    tagText: 'text-pink-700',
    outcomeTitle: 'text-pink-600',
    btnStyle: { background: 'linear-gradient(135deg,#f9a8d4,#ec4899)' },
    btnHoverClass: 'hover:brightness-110',
    shadowColor: 'hover:shadow-pink-200',
  },
  B: {
    checkColor: 'text-sky-400',
    cardClass: 'card-blue',
    badgeBg: 'bg-sky-100 border-sky-200',
    badgeText: 'text-sky-800',
    letterBg: 'bg-sky-400',
    tagBg: 'bg-sky-100',
    tagText: 'text-sky-700',
    outcomeTitle: 'text-sky-600',
    btnStyle: { background: 'linear-gradient(135deg,#7dd3fc,#0ea5e9)' },
    btnHoverClass: 'hover:brightness-110',
    shadowColor: 'hover:shadow-sky-200',
  },
  C: {
    checkColor: 'text-green-500',
    cardClass: 'card-green',
    badgeBg: 'bg-green-100 border-green-200',
    badgeText: 'text-green-800',
    letterBg: 'bg-green-500',
    tagBg: 'bg-green-100',
    tagText: 'text-green-700',
    outcomeTitle: 'text-green-700',
    btnStyle: { background: 'linear-gradient(135deg,#86efac,#22c55e)' },
    btnHoverClass: 'hover:brightness-110',
    shadowColor: 'hover:shadow-green-200',
  },
}

interface Props {
  programmes: Programme[]
}

export default function Programmes({ programmes }: Props) {
  return (
    <section id="programmes" className="py-12 md:py-16 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
        <p className="text-coral font-black text-sm uppercase tracking-widest mb-2">What We Offer</p>
        <h2 className="text-3xl font-black text-navy">Our Three Core Programmes</h2>
        <p className="text-gray-500 text-sm font-semibold mt-2">Choose A, B, C — or enrol in All ABC</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {programmes.map(prog => {
          const s = STYLES[prog.key] ?? STYLES.A
          
          return (
            <div
              key={prog.key}
              className={`
                ${s.cardClass} rounded-3xl p-7 flex flex-col
                shadow-lg ${s.shadowColor}
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-2xl
                cursor-default
              `}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-10 h-10 rounded-2xl ${s.letterBg} text-white font-black text-lg flex items-center justify-center shadow shrink-0`}>
                  {prog.key}
                </span>
                <span className={`${s.tagBg} ${s.tagText} text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full`}>
                  {prog.days}
                </span>
              </div>

              <h3 className="text-xl font-black text-navy mb-1">{prog.name}</h3>
              <p className={`${s.checkColor} font-bold text-xs mb-3`}>{prog.subtitle}</p>
              <p className="text-gray-500 text-xs font-semibold leading-relaxed mb-5">{prog.full_desc}</p>

              {/* Experience */}
              <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-2">What Children Experience</p>
              <ul className="space-y-1.5 mb-5">
                {prog.experience.map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                    <CheckIcon color={s.checkColor} />{item}
                  </li>
                ))}
              </ul>

              {/* Activities */}
              <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-2">Activities</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {prog.activities.map(a => (
                  <span key={a} className={`${s.tagBg} ${s.tagText} text-[10px] font-bold px-2.5 py-1 rounded-full`}>{a}</span>
                ))}
              </div>

              {/* Outcome */}
              <div className={`mt-auto ${s.badgeBg} border rounded-2xl px-4 py-3 mb-4`}>
                <p className={`text-[10px] font-black ${s.outcomeTitle} uppercase tracking-widest mb-0.5`}>Outcome</p>
                <p className={`text-xs ${s.badgeText} font-bold leading-snug`}>{prog.outcome_text}</p>
              </div>

              {/* Register Now button */}
              <button
                onClick={() => router.visit('/register')}
                className={`w-full py-3 rounded-2xl font-black text-white text-sm ${s.btnHoverClass} active:scale-95 transition-all duration-200 shadow-md flex items-center justify-center gap-2`}
                style={s.btnStyle}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                Register for Programme {prog.key}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

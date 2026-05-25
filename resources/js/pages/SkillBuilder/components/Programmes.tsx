import { router } from '@inertiajs/react'

const CheckIcon = ({ color }: { color: string }) => (
  <span className={`${color} mt-0.5 flex-shrink-0`}>✦</span>
)

interface CardConfig {
  letter: string
  days: string
  title: string
  subtitle: string
  desc: string
  checkColor: string
  experience: string[]
  activities: string[]
  outcomeTitle: string
  outcomeText: string
  cardClass: string
  badgeBg: string
  badgeText: string
  letterBg: string
  tagBg: string
  tagText: string
  btnStyle: React.CSSProperties
  btnHoverClass: string
  shadowColor: string
}

import type React from 'react'

const cards: CardConfig[] = [
  {
    letter: 'A',
    days: 'Mon & Thu',
    title: 'Brain Builders Programme',
    subtitle: 'Strengthening thinking, logic, and problem-solving',
    desc: 'A carefully designed programme that builds strong cognitive foundations through numbers, patterns, and logical thinking. Children engage in hands-on activities that naturally improve focus, memory, and analytical ability — without pressure.',
    checkColor: 'text-pink-400',
    experience: ['Develop number sense and mental maths', 'Build logical thinking and pattern recognition', 'Learn problem-solving strategies', 'Explore early coding concepts', 'Engage in creative building and construction'],
    activities: ['Abacus', 'Puzzle Lab', 'Memory Games', 'Pattern Recognition', 'Chess Foundations', 'Cognitive Exercises', 'Basic Coding', 'Lego Robotics'],
    outcomeTitle: 'text-pink-600',
    outcomeText: 'Children develop sharper thinking, better concentration, and the confidence to approach problems independently.',
    cardClass: 'card-pink',
    badgeBg: 'bg-pink-100 border-pink-200',
    badgeText: 'text-pink-800',
    letterBg: 'bg-pink-400',
    tagBg: 'bg-pink-100',
    tagText: 'text-pink-700',
    btnStyle: { background: 'linear-gradient(135deg,#f9a8d4,#ec4899)' },
    btnHoverClass: 'hover:brightness-110',
    shadowColor: 'hover:shadow-pink-200',
  },
  {
    letter: 'B',
    days: 'Tue & Fri',
    title: 'Confidence & Expression Programme',
    subtitle: 'Building confident, expressive, and creative individuals',
    desc: 'A vibrant, nurturing programme that encourages children to express themselves freely through movement, music, storytelling, and art. It helps children feel comfortable being themselves — while building confidence in communication and social interaction.',
    checkColor: 'text-sky-400',
    experience: ['Improve verbal and non-verbal communication', 'Explore creativity and self-expression', 'Gain confidence in speaking and performing', 'Express emotions through art and movement'],
    activities: ['Dance & Free Style', 'Music & Rhythm', 'Story Enactment', 'Public Speaking', 'Art & Craft'],
    outcomeTitle: 'text-sky-600',
    outcomeText: 'Children become more confident, expressive, and comfortable in sharing their thoughts and ideas.',
    cardClass: 'card-blue',
    badgeBg: 'bg-sky-100 border-sky-200',
    badgeText: 'text-sky-800',
    letterBg: 'bg-sky-400',
    tagBg: 'bg-sky-100',
    tagText: 'text-sky-700',
    btnStyle: { background: 'linear-gradient(135deg,#7dd3fc,#0ea5e9)' },
    btnHoverClass: 'hover:brightness-110',
    shadowColor: 'hover:shadow-sky-200',
  },
  {
    letter: 'C',
    days: 'Wed & Sat',
    title: 'Movement & Sports Foundation',
    subtitle: 'Developing coordination, fitness, and discipline',
    desc: 'An active and engaging programme focused on physical development, coordination, and overall fitness. Through structured play and movement, children build strength, balance, and discipline — while enjoying every session.',
    checkColor: 'text-green-500',
    experience: ['Develop motor skills and coordination', 'Improve balance and body control', 'Learn team participation and discipline', 'Build agility and physical endurance'],
    activities: ['Kicking & Dribbling', 'Throwing & Catching', 'Karate', 'Balance Beams', 'Coordination Drills', 'Obstacle Courses', 'Agility Ladders'],
    outcomeTitle: 'text-green-700',
    outcomeText: 'Children build strong physical foundations, better coordination, and healthy active habits for life.',
    cardClass: 'card-green',
    badgeBg: 'bg-green-100 border-green-200',
    badgeText: 'text-green-800',
    letterBg: 'bg-green-500',
    tagBg: 'bg-green-100',
    tagText: 'text-green-700',
    btnStyle: { background: 'linear-gradient(135deg,#86efac,#22c55e)' },
    btnHoverClass: 'hover:brightness-110',
    shadowColor: 'hover:shadow-green-200',
  },
]

export default function Programmes() {
  return (
    <section id="programmes" className="py-12 md:py-16 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
        <p className="text-coral font-black text-sm uppercase tracking-widest mb-2">What We Offer</p>
        <h2 className="text-3xl font-black text-navy">Our Three Core Programmes</h2>
        <p className="text-gray-500 text-sm font-semibold mt-2">Choose A, B, C — or enrol in All ABC</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {cards.map(card => (
          <div
            key={card.letter}
            className={`
              ${card.cardClass} rounded-3xl p-7 flex flex-col
              shadow-lg ${card.shadowColor}
              transition-all duration-300 ease-in-out
              hover:-translate-y-2 hover:shadow-2xl
              cursor-default
            `}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-10 h-10 rounded-2xl ${card.letterBg} text-white font-black text-lg flex items-center justify-center shadow flex-shrink-0`}>
                {card.letter}
              </span>
              <span className={`${card.tagBg} ${card.tagText} text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full`}>
                {card.days}
              </span>
            </div>

            <h3 className="text-xl font-black text-navy mb-1">{card.title}</h3>
            <p className={`${card.checkColor} font-bold text-xs mb-3`}>{card.subtitle}</p>
            <p className="text-gray-500 text-xs font-semibold leading-relaxed mb-5">{card.desc}</p>

            {/* Experience */}
            <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-2">What Children Experience</p>
            <ul className="space-y-1.5 mb-5">
              {card.experience.map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                  <CheckIcon color={card.checkColor} />{item}
                </li>
              ))}
            </ul>

            {/* Activities */}
            <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-2">Activities</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {card.activities.map(a => (
                <span key={a} className={`${card.tagBg} ${card.tagText} text-[10px] font-bold px-2.5 py-1 rounded-full`}>{a}</span>
              ))}
            </div>

            {/* Outcome */}
            <div className={`mt-auto ${card.badgeBg} border rounded-2xl px-4 py-3 mb-4`}>
              <p className={`text-[10px] font-black ${card.outcomeTitle} uppercase tracking-widest mb-0.5`}>Outcome</p>
              <p className={`text-xs ${card.badgeText} font-bold leading-snug`}>{card.outcomeText}</p>
            </div>

            {/* Register Now button */}
            <button
              onClick={() => router.visit('/register')}
              className={`w-full py-3 rounded-2xl font-black text-white text-sm ${card.btnHoverClass} active:scale-95 transition-all duration-200 shadow-md flex items-center justify-center gap-2`}
              style={card.btnStyle}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              Register for Programme {card.letter}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

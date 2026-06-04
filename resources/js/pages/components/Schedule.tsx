import type React from 'react'
import type { EventData } from '../../types'

interface ScheduleCard {
  bg: string
  iconStroke: string
  label: string
  title: string
  subtitle: string
  desc: React.ReactNode
  icon: React.ReactNode
}

const ClockIcon = ({ stroke }: { stroke: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

const CalendarIcon = ({ stroke }: { stroke: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const UsersIcon = ({ stroke }: { stroke: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

interface Props {
  event: EventData
}

export default function Schedule({ event }: Props) {
  const cards: ScheduleCard[] = [
    {
      bg: 'bg-iceblue',
      iconStroke: '#0f2f5e',
      label: 'Weekday Sessions',
      title: event.weekday_time,
      subtitle: 'Monday to Friday',
      desc: 'One hour of focused activity per session, five days a week across all programmes.',
      icon: <ClockIcon stroke="#0f2f5e" />,
    },
    {
      bg: 'bg-[#f0fdf4]',
      iconStroke: '#16a34a',
      label: 'Weekend Sessions',
      title: event.weekend_time,
      subtitle: 'Saturday & Sunday',
      desc: 'Weekend sessions for Movement & Sports Foundation (Programme C).',
      icon: <CalendarIcon stroke="#16a34a" />,
    },
    {
      bg: 'bg-[#fff7ed]',
      iconStroke: '#f05a28',
      label: 'Programme Duration',
      title: `${event.start_date} – ${event.end_date}`,
      subtitle: 'Full Academic Year',
      desc: (
        <>Registration begins <span className="font-black text-coral">{event.registration_open_date}</span>. Seats are limited — enrol early.</>
      ),
      icon: <CalendarIcon stroke="#f05a28" />,
    },
    {
      bg: 'bg-[#fdf4ff]',
      iconStroke: '#9333ea',
      label: 'Age Group & Enrolment',
      title: `${event.age_group_min} to ${event.age_group_max} Years`,
      subtitle: 'Flexible Enrolment',
      desc: (
        <>
          Choose A, B, C individually — or enrol in{' '}
          <span className="font-black text-purple-600">All ABC</span>.{' '}
          <span className="text-coral font-bold">Limited seats per batch.</span>
        </>
      ),
      icon: <UsersIcon stroke="#9333ea" />,
    },
  ]

  return (
    <section id="schedule" className="py-12 md:py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-12">
        <p className="text-coral font-black text-sm uppercase tracking-widest mb-2">Plan Your Visit</p>
        <h2 className="text-3xl font-black text-navy">Programme Details</h2>
        <p className="text-gray-400 text-sm font-semibold mt-2">Everything you need to know before enrolling</p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch">

        {/* ── LEFT: 2×2 cards ── */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map(({ bg, label, title, subtitle, desc, icon }) => (
            <div key={label} className={`lift ${bg} rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center gap-3`}>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                {icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-1">{label}</p>
                <p className="text-navy font-black text-lg">{title}</p>
                <p className="text-gray-500 font-bold text-sm mt-1">{subtitle}</p>
                <p className="text-gray-400 text-xs font-semibold mt-2 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── RIGHT: image ── */}
        <div className="lg:w-95 shrink-0 relative">
          <div className="lg:sticky lg:top-8">
            <div className="absolute inset-2 rounded-[2.5rem] pointer-events-none"
              style={{ background: 'linear-gradient(135deg,rgba(240,90,40,0.12),rgba(255,226,52,0.12))', transform: 'rotate(2.5deg)' }} />
            <div className="relative rounded-4xl overflow-hidden shadow-2xl w-full"
              style={{ height: 'clamp(260px,60vw,460px)', border: '4px solid #fff', boxShadow: '0 24px 60px rgba(15,47,94,0.16)' }}>
              <img src="/images/image2.jpg" alt="Kids Activity"
                className="w-full h-full object-cover object-center" />
              <div className="absolute bottom-0 left-0 right-0 h-24"
                style={{ background: 'linear-gradient(to top,rgba(15,47,94,0.6),transparent)' }} />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-black text-sm">After-School Activities</p>
                <p className="text-white/70 text-xs font-semibold">Mon – Sat · {event.weekday_time}</p>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute -top-3 -right-3 bg-[#FFE234] rounded-2xl px-4 py-2.5 shadow-lg"
              style={{ border: '2px solid #fff' }}>
              <p className="text-[10px] font-black text-navy uppercase tracking-widest leading-none mb-0.5">Open To All</p>
              <p className="text-sm font-black text-navy">Age {event.age_group_min}–{event.age_group_max} ✦</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

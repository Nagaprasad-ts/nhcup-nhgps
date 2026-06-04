const features = [
  'Structured yet playful learning approach',
  'Focus on overall development — not just academics',
  'Safe, supervised, and nurturing environment',
  'Designed to make children enjoy learning, not feel pressured',
  'Small groups for better attention and engagement',
]

export default function WhyParents() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-8"
      style={{ background: 'linear-gradient(135deg, #0a1f4e 0%, #0f2f5e 50%, #1a3f7a 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-5 bg-white" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-5 bg-white" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* ── LEFT ── */}
        <div>
          <p className="text-coral font-black text-xs uppercase tracking-[0.2em] mb-3">
            Why Parents Choose This Programme
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-snug mb-4">
            A programme designed with your child's{' '}
            <span className="text-[#FFE234]">best interests at heart</span>
          </h2>
          <p className="text-white/50 text-sm font-semibold leading-relaxed mb-8">
            Our approach is built around what children genuinely need — not just what looks good on paper.
          </p>

          {/* Did You Know card */}
          <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,226,52,0.25)' }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">💡</span>
              <p className="text-[#FFE234] font-black text-xs uppercase tracking-[0.2em]">Did You Know?</p>
            </div>
            <div className="flex items-end gap-4 mb-4">
              <p className="text-5xl font-black text-[#FFE234] leading-none">90%</p>
              <p className="text-white/70 text-sm font-bold leading-snug mb-2">
                of a child's brain<br />develops before age 8
              </p>
            </div>
            <div className="h-px bg-white/10 mb-4" />
            <p className="text-white/70 text-sm font-semibold leading-relaxed">
              Children who regularly engage in{' '}
              <span className="text-[#FFE234] font-extrabold">movement, music, and problem-solving</span>{' '}
              develop stronger neural connections — improving memory, focus, and learning ability for life.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Feature cards ── */}
        <div className="grid grid-cols-1 gap-3 mt-2">
          {features.map(text => (
            <div
              key={text}
              className="flex items-center gap-4 rounded-2xl px-5 py-4"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <span className="w-9 h-9 rounded-xl bg-[#FFE234] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f2f5e" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p className="text-white font-bold text-sm">{text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

interface FooterCTAProps {
  onRegister: () => void
}

export default function FooterCTA({ onRegister }: FooterCTAProps) {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-14 px-4 sm:px-8"
      style={{ background: 'linear-gradient(135deg,#0f2f5e 0%,#1a4a7e 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-10 bg-white" />
      <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-10 bg-white" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
        <div>
          <p className="text-[#FFE234] font-black text-xs uppercase tracking-widest mb-2">
            Registration Begins: MAY 01 2026
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-snug">
            Give your child a strong<br />foundation for life
          </h2>
          <p className="text-blue-200 font-semibold text-sm mt-2 max-w-sm mx-auto md:mx-0">
            Watch them grow into confident, curious, and capable individuals — one step at a time.
          </p>
          <p className="text-blue-100 font-bold text-sm mt-3">
            📞 Call / WhatsApp:{' '}
            <span className="text-white font-black">+91 9606911078</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
          <button
            onClick={onRegister}
            className="bg-coral hover:brightness-110 active:scale-95 text-white font-black text-base px-10 py-4 rounded-full shadow-lg transition-all w-full sm:w-auto"
          >
            Register Now ✦
          </button>
          <p className="text-blue-300 text-sm font-semibold text-center">
            Open to all · Age 3–8 · June 2026<br />Limited seats — enrol early
          </p>
        </div>
      </div>
    </section>
  )
}

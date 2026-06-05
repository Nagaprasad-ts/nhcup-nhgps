import { router } from '@inertiajs/react'

export default function FooterCTA() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-14 px-4 sm:px-8"
      style={{ background: 'linear-gradient(135deg,#0f2f5e 0%,#1a4a7e 100%)' }}
    >
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-10 bg-white" />
      <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-10 bg-white" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
        <div>
          <p className="text-[#FFE234] font-black text-xs uppercase tracking-widest mb-2">
            Registration Begins: May 01, 2026
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-snug">
            Give your child a strong<br />foundation for life
          </h2>
          <p className="text-blue-200 font-semibold text-sm mt-2 max-w-sm mx-auto md:mx-0">
            Watch them grow into confident, curious, and capable individuals — one step at a time.
          </p>
          <p className="text-blue-100 font-bold text-sm mt-3">
            📞 Call / WhatsApp:{' '}
            <a href="tel:+919606911078" className="text-white font-black hover:text-[#FFE234] transition-colors">
              +91 9606911078
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => router.visit('/register')}
            className="bg-coral hover:brightness-110 active:scale-95 text-white font-black text-base px-10 py-4 rounded-full shadow-lg transition-all w-full sm:w-auto"
          >
            Register Now ✦
          </button>
          <p className="text-blue-300 text-sm font-semibold text-center">
            Open to all · Age 3-8 · Jun 2026<br />Limited seats — enrol early
          </p>
        </div>
      </div>

      {/* Policy links */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {[
          { label: 'Terms & Conditions', href: '/terms-and-conditions' },
          { label: 'Privacy Policy', href: '/privacy-policy' },
          { label: 'Refund Policy', href: '/refund-policy' },
          { label: 'Cancellation Policy', href: '/cancellation-policy' },
          { label: 'Contact Us', href: '/contact'},
        ].map(({ label, href }) => (
          <button
            key={href}
            onClick={() => router.visit(href)}
            className="text-blue-300 hover:text-white text-xs font-semibold transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}

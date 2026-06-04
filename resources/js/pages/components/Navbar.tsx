import { router } from '@inertiajs/react'
import type React from 'react'

interface NavbarProps {
  /** Right-side slot. Defaults to a "Register Now" button. */
  rightSlot?: React.ReactNode
}

export default function Navbar({ rightSlot }: NavbarProps) {
  const defaultRight = (
    <button
      onClick={() => router.visit('/register')}
      className="bg-coral text-white font-black text-xs px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-sm hidden sm:block"
    >
      Register Now ✦
    </button>
  )

  return (
    <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Left — back button */}
        <button
          onClick={() => router.visit('/')}
          className="flex items-center gap-2 text-navy font-bold text-sm hover:text-coral transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </button>

        {/* Center — logo */}
        <img src="/images/nhgps_logo.png" alt="NHGPS" className="h-10 w-auto object-contain" />

        {/* Right — slot or default */}
        {rightSlot !== undefined ? rightSlot : defaultRight}

      </div>
    </nav>
  )
}

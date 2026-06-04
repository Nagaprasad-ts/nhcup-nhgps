import { Head } from '@inertiajs/react'
import type React from 'react'
import FooterCTA from '../pages/components/FooterCTA'
import Navbar from '../pages/components/Navbar'

interface AppLayoutProps {
  title: string
  children: React.ReactNode
  background?: string
  navRight?: React.ReactNode
  pageTitle?: string
}

export default function AppLayout({
  title,
  children,
  background = '#FFF8EE',
  navRight,
  pageTitle,
}: AppLayoutProps) {
  return (
    <div className="font-nunito" style={{ background }}>
      <Head title={`${title} — Skill Builder for Kids`} />

      <Navbar rightSlot={navRight} />

      {pageTitle && (
        <div
          className="relative overflow-hidden py-12 px-4 sm:px-8"
          style={{ background: 'linear-gradient(135deg,#0f2f5e 0%,#1a4a7e 100%)' }}
        >
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-10 bg-white" />
          <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-10 bg-white" />
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="text-[#FFE234] font-black text-xs uppercase tracking-[0.25em] mb-3">
              New Horizon Gurukul Pre School
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">{pageTitle}</h1>
          </div>
        </div>
      )}

      <main>{children}</main>

      <FooterCTA />
    </div>
  )
}

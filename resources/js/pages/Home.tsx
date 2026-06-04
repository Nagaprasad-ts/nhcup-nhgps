import { Head, router } from '@inertiajs/react'
import type { EventData, Programme } from '../types'
import FooterCTA from './components/FooterCTA'
import Hero from './components/Hero'
import Programmes from './components/Programmes'
import Schedule from './components/Schedule'
import ScrollToTop from './components/ScrollToTop'
import WhyParents from './components/WhyParents'

interface Props {
  programmes: Programme[]
  event: EventData
}

export default function Home({ programmes, event }: Props) {
  const goToRegister = () => router.visit('/register')

  return (
    <div className="font-nunito">
      <Head title="Skill Builder for Kids — New Horizon Gurukul Pre School" />
      <ScrollToTop />
      <Hero       onRegister={goToRegister} event={event} />
      <Programmes programmes={programmes} />
      <WhyParents />
      <Schedule   event={event} />
      <FooterCTA />
    </div>
  )
}

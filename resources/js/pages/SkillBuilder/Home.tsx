import { Head, router } from '@inertiajs/react'
import FooterCTA from './components/FooterCTA'
import Hero from './components/Hero'
import Programmes from './components/Programmes'
import Schedule from './components/Schedule'
import ScrollToTop from './components/ScrollToTop'
import WhyParents from './components/WhyParents'

export default function Home() {
  const goToRegister = () => router.visit('/register')

  return (
    <div className="font-nunito">
      <Head title="Skill Builder for Kids — New Horizon Gurukul Pre School" />
      <ScrollToTop />
      <Hero       onRegister={goToRegister} />
      <Programmes />
      <WhyParents />
      <Schedule />
      <FooterCTA  onRegister={goToRegister} />
    </div>
  )
}

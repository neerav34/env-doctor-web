import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LiveDemo from '@/components/LiveDemo'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import ActionSection from '@/components/ActionSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveDemo />
        <Features />
        <HowItWorks />
        <ActionSection />
      </main>
      <Footer />
    </>
  )
}

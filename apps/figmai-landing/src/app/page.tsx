import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Demo from '@/components/Demo'
import Community from '@/components/Community'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import GetStarted from '@/components/GetStarted'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="demo">
        <Demo />
      </div>
      <div id="community">
        <Community />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <FAQ />
      <GetStarted />
      <Footer />
    </main>
  )
}

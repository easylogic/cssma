import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Demo from '@/components/Demo'
import Community from '@/components/Community'
import GetStarted from '@/components/GetStarted'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Demo />
      <Community />
      <GetStarted />
      <Footer />
    </main>
  )
}

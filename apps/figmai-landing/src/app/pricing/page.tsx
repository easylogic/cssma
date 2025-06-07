import { Metadata } from 'next'
import Header from '@/components/Header'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import { DollarSign, Shield, Zap, Crown, Check, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing - CSSMA',
  description: 'Simple, transparent pricing for CSSMA. Start free with our open-source library.',
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-24 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-16 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-36 right-12 w-28 h-28 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-24 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-700"></div>
            <div className="absolute bottom-32 right-1/6 w-18 h-18 bg-pink-200 rounded-full opacity-20 animate-pulse delay-300"></div>
          </div>

          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <DollarSign className="absolute top-32 left-1/5 w-8 h-8 text-green-400 opacity-40 animate-bounce" style={{ animationDelay: '0s' }} />
            <Shield className="absolute top-48 right-1/5 w-6 h-6 text-blue-400 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />
            <Zap className="absolute bottom-36 left-1/3 w-7 h-7 text-purple-400 opacity-40 animate-bounce" style={{ animationDelay: '2s' }} />
            <Crown className="absolute top-1/3 right-1/6 w-6 h-6 text-yellow-400 opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <Star className="absolute bottom-44 right-1/4 w-6 h-6 text-pink-400 opacity-40 animate-bounce" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 mb-8">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Transparent Pricing</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Simple{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Pricing
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Start for free, scale as you grow. No hidden fees, no surprises.
              </p>
              
              {/* Pricing highlights */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Free Forever</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">No Lock-in</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">Open Source</span>
                </div>
              </div>

              {/* Value proposition */}
              <div className="mt-12 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl border border-purple-200 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Special Launch Offer</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Get started with our core library for free. Premium features and enterprise support available.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Pricing />
        <FAQ />
      </main>
    </>
  )
} 
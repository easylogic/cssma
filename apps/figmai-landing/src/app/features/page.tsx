import { Metadata } from 'next'
import Header from '@/components/Header'
import Features from '@/components/Features'
import { Code, Wand2, Box, Rocket, Zap, Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Features - CSSMA',
  description: 'Discover all the powerful features of CSSMA for converting between Tailwind CSS and Figma',
}

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-24 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
            <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-700"></div>
          </div>

          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <Code className="absolute top-32 left-1/4 w-8 h-8 text-purple-400 opacity-30 animate-bounce" style={{ animationDelay: '0s' }} />
            <Wand2 className="absolute top-48 right-1/4 w-6 h-6 text-blue-400 opacity-30 animate-bounce" style={{ animationDelay: '1s' }} />
            <Box className="absolute bottom-32 left-1/3 w-7 h-7 text-pink-400 opacity-30 animate-bounce" style={{ animationDelay: '2s' }} />
            <Rocket className="absolute top-1/2 right-1/5 w-8 h-8 text-indigo-400 opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <Zap className="absolute bottom-40 right-1/3 w-6 h-6 text-purple-400 opacity-30 animate-bounce" style={{ animationDelay: '1.5s' }} />
            <Layers className="absolute top-1/4 left-1/5 w-7 h-7 text-blue-400 opacity-30 animate-bounce" style={{ animationDelay: '2.5s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 mb-8">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Powerful Features</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Powerful{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Features
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Everything you need to bridge the gap between design and development
              </p>
              
              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200">
                  <Code className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Multi-Framework</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200">
                  <Wand2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200">
                  <Rocket className="w-4 h-4 text-pink-600" />
                  <span className="text-sm font-medium text-gray-700">Lightning Fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Features />
        
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">Advanced Capabilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Batch Processing</h3>
                <p className="text-gray-600">Convert multiple components at once with our batch processing feature.</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Custom Themes</h3>
                <p className="text-gray-600">Support for custom design systems and theme configurations.</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Plugin Ecosystem</h3>
                <p className="text-gray-600">Extend functionality with our growing plugin ecosystem.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

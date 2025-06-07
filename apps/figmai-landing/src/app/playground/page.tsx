import { Metadata } from "next"
import Header from "@/components/Header"
import Demo from "@/components/Demo"
import { Play, Code2, Palette, Sparkles, Terminal, Figma } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Playground - CSSMA',
  description: 'Try CSSMA live - Convert between Tailwind CSS and Figma in real-time',
}

export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-24 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-16 left-16 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-32 right-12 w-32 h-32 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-24 left-1/3 w-20 h-20 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-700"></div>
          </div>

          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <Code2 className="absolute top-28 left-1/5 w-8 h-8 text-purple-400 opacity-40 animate-bounce" style={{ animationDelay: '0s' }} />
            <Palette className="absolute top-44 right-1/5 w-6 h-6 text-blue-400 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />
            <Terminal className="absolute bottom-36 left-1/4 w-7 h-7 text-green-400 opacity-40 animate-bounce" style={{ animationDelay: '2s' }} />
            <Figma className="absolute top-1/3 right-1/6 w-8 h-8 text-pink-400 opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="absolute bottom-44 right-1/3 w-6 h-6 text-indigo-400 opacity-40 animate-bounce" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 mb-8">
                <Play className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Live Playground</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Playground
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Try CSSMA live and see the magic happen in real-time
              </p>
              
              {/* Interactive features */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Code2 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Live Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Palette className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Visual Preview</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                  <span className="text-sm font-medium text-gray-700">Real-time Output</span>
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-4">Start with a preset or create your own</p>
                <div className="flex justify-center">
                  <div className="animate-bounce">
                    <div className="w-6 h-6 border-2 border-purple-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Demo />
      </main>
    </>
  )
}

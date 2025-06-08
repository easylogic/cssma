import { Metadata } from "next"
import Header from "@/components/Header"
import InteractiveTutorial from "@/components/InteractiveTutorial"
import { BookOpen, Zap, Target, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Interactive Tutorial - CSSMA',
  description: 'Learn CSSMA step by step with our interactive tutorial system',
}

export default function TutorialPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-24 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>

          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <BookOpen className="absolute top-32 left-1/6 w-8 h-8 text-indigo-400 opacity-40 animate-bounce" style={{ animationDelay: '0s' }} />
            <Zap className="absolute top-48 right-1/5 w-6 h-6 text-purple-400 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />
            <Target className="absolute bottom-40 left-1/3 w-7 h-7 text-blue-400 opacity-40 animate-bounce" style={{ animationDelay: '2s' }} />
            <Trophy className="absolute top-1/3 right-1/6 w-8 h-8 text-pink-400 opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-indigo-200 mb-8">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-800">Interactive Learning</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Learn CSSMA
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Master the art of converting between Tailwind CSS and Figma with our step-by-step interactive tutorial
              </p>
              
              {/* Learning features */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Step-by-Step</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Interactive</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Trophy className="w-4 h-4 text-pink-600" />
                  <span className="text-sm font-medium text-gray-700">Progress Tracking</span>
                </div>
              </div>

              {/* Tutorial stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Tutorial Steps</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">15min</div>
                  <div className="text-sm text-gray-600">Average Time</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-pink-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Hands-on</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive Tutorial Component */}
        <InteractiveTutorial />
      </main>
    </>
  )
} 
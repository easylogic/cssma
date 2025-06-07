import { Metadata } from 'next'
import Header from '@/components/Header'
import Community from '@/components/Community'
import { Users, Heart, MessageCircle, Star, Github, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Community - CSSMA',
  description: 'Join the CSSMA community. Success stories, testimonials, and community stats.',
}

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-24 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>
            <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-700"></div>
            <div className="absolute bottom-32 right-1/5 w-18 h-18 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-300"></div>
          </div>

          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <Users className="absolute top-32 left-1/4 w-8 h-8 text-purple-400 opacity-40 animate-bounce" style={{ animationDelay: '0s' }} />
            <Heart className="absolute top-48 right-1/4 w-6 h-6 text-pink-400 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />
            <MessageCircle className="absolute bottom-32 left-1/3 w-7 h-7 text-blue-400 opacity-40 animate-bounce" style={{ animationDelay: '2s' }} />
            <Star className="absolute top-1/2 right-1/5 w-6 h-6 text-yellow-400 opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <Github className="absolute bottom-40 right-1/3 w-7 h-7 text-gray-400 opacity-40 animate-bounce" style={{ animationDelay: '1.5s' }} />
            <Globe className="absolute top-1/4 left-1/5 w-6 h-6 text-green-400 opacity-40 animate-bounce" style={{ animationDelay: '2.5s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 mb-8">
                <Heart className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Growing Community</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Join Our{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Community
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Connect with designers and developers who are building the future
              </p>
              
              {/* Community stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-white/80 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-gray-500">Members</div>
                </div>
                <div className="text-center p-4 bg-white/80 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-500">Contributors</div>
                </div>
                <div className="text-center p-4 bg-white/80 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-pink-600">50+</div>
                  <div className="text-sm text-gray-500">Countries</div>
                </div>
                <div className="text-center p-4 bg-white/80 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
              </div>

              {/* Community highlights */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Active Discussions</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">Open Source</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Global Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Community />
        
        {/* Additional community content */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Involved</h2>
              <p className="text-xl text-gray-600">Multiple ways to contribute and connect</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Discord</h3>
                <p className="text-gray-600 text-sm">Join our Discord for real-time discussions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🐙</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">GitHub</h3>
                <p className="text-gray-600 text-sm">Contribute to the open-source project</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Blog</h3>
                <p className="text-gray-600 text-sm">Read tutorials and best practices</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">YouTube</h3>
                <p className="text-gray-600 text-sm">Watch video tutorials and demos</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 
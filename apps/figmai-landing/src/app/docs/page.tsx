import { Metadata } from 'next'
import Header from '@/components/Header'
import { BookOpen, FileText, Code, Search, Download, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation - CSSMA',
  description: 'Complete documentation for CSSMA - Convert between Tailwind CSS and Figma',
}

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-24 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-12 w-16 h-16 bg-blue-200 rounded-lg opacity-20 animate-pulse transform rotate-12"></div>
            <div className="absolute top-36 right-16 w-20 h-20 bg-purple-200 rounded-lg opacity-20 animate-pulse delay-1000 transform -rotate-12"></div>
            <div className="absolute bottom-28 left-1/4 w-12 h-12 bg-green-200 rounded-lg opacity-20 animate-pulse delay-500 transform rotate-45"></div>
            <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-indigo-200 rounded-lg opacity-20 animate-pulse delay-700 transform -rotate-6"></div>
          </div>

          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <BookOpen className="absolute top-32 left-1/5 w-8 h-8 text-blue-400 opacity-40 animate-bounce" style={{ animationDelay: '0s' }} />
            <FileText className="absolute top-48 right-1/5 w-6 h-6 text-purple-400 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />
            <Code className="absolute bottom-36 left-1/3 w-7 h-7 text-green-400 opacity-40 animate-bounce" style={{ animationDelay: '2s' }} />
            <Search className="absolute top-1/2 right-1/6 w-6 h-6 text-pink-400 opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 mb-8">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Complete Guide</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Documentation
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Everything you need to get started with CSSMA
              </p>
              
              {/* Quick access buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Quick Start</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">API Reference</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <ExternalLink className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Examples</span>
                </div>
              </div>

              {/* Documentation stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-500">Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-gray-500">Examples</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-500">Updated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-8">Getting Started</h2>
              <p className="text-lg text-gray-600 mb-8">
                CSSMA is a powerful library for converting between Tailwind CSS and Figma design tokens.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4">Installation</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-8">
                <code className="text-sm">npm install cssma</code>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">Basic Usage</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-8">
                <pre className="text-sm overflow-x-auto">
{`import { convertToFigma } from 'cssma'

const nodeData = {
  type: "FRAME",
  name: "Button",
  styles: "bg-blue-500 text-white px-4 py-2 rounded-lg"
}

const figmaProperties = convertToFigma(nodeData)`}
                </pre>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">API Reference</h3>
              <p className="text-gray-600">Detailed API documentation coming soon...</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
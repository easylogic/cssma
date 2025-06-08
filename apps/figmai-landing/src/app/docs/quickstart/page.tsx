import { Metadata } from 'next'
import DocsLayout from '@/components/DocsLayout'
import { Terminal, Package, Play, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quick Start - CSSMA Documentation',
  description: 'Get started with CSSMA in minutes. Installation guide and first steps.',
}

export default function QuickStartPage() {
  return (
    <DocsLayout>
      <div className="prose prose-lg max-w-none">
        <div className="not-prose mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Start</h1>
          <p className="text-xl text-gray-600">
            Get up and running with CSSMA in just a few minutes.
          </p>
        </div>

        <h2>Installation</h2>
        <p>
          Install CSSMA using your preferred package manager:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium">npm</span>
            </div>
            <code className="text-green-400">npm install cssma</code>
          </div>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">yarn</span>
            </div>
            <code className="text-green-400">yarn add cssma</code>
          </div>
        </div>

        <h2>Basic Usage</h2>
        <p>
          Here's a simple example to get you started with CSSMA:
        </p>

        <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre><code>{`import { convertToFigma } from 'cssma'

// Define your component structure
const buttonComponent = {
  type: "FRAME",
  name: "Primary Button",
  styles: "bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
}

// Convert to Figma properties
const figmaProperties = convertToFigma(buttonComponent)

console.log(figmaProperties)`}</code></pre>
          </div>
        </div>

        <h2>Step-by-Step Tutorial</h2>
        
        <div className="not-prose space-y-6 my-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">1</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Import CSSMA</h3>
              <p className="text-gray-600 mb-3">Start by importing the functions you need from the CSSMA library.</p>
              <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                <code>import &#123; convertToFigma, generateReact &#125; from 'cssma'</code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Define Your Component</h3>
              <p className="text-gray-600 mb-3">Create a NodeData object with your component structure and Tailwind classes.</p>
              <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                <code>{`const nodeData = {
  type: "FRAME",
  name: "Card",
  styles: "bg-white p-6 rounded-xl shadow-lg"
}`}</code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Convert and Use</h3>
              <p className="text-gray-600 mb-3">Convert your component to the desired output format.</p>
              <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                <code>{`const figmaProps = convertToFigma(nodeData)
const reactComponent = generateReact(nodeData)`}</code>
              </div>
            </div>
          </div>
        </div>

        <h2>What's Next?</h2>
        <p>
          Now that you have CSSMA installed and working, here are some next steps:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <a 
            href="/docs/api" 
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-900">Explore the API</h3>
              <p className="text-sm text-gray-600 group-hover:text-purple-700">
                Learn about all available functions and their parameters
              </p>
            </div>
          </a>

          <a 
            href="/docs/examples" 
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
          >
            <Play className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-900">Try Examples</h3>
              <p className="text-sm text-gray-600 group-hover:text-purple-700">
                See real-world examples and common use cases
              </p>
            </div>
          </a>
        </div>

        <div className="not-prose mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
          <p className="text-blue-800">
            Use the <a href="/playground" className="underline font-medium">Playground</a> to experiment 
            with different Tailwind classes and see the conversion results in real-time.
          </p>
        </div>
      </div>
    </DocsLayout>
  )
} 
import { Metadata } from 'next'
import DocsLayout from '@/components/DocsLayout'
import { Download, Code, ExternalLink, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation - CSSMA',
  description: 'Complete documentation for CSSMA - Convert between Tailwind CSS and Figma',
}

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="prose prose-lg max-w-none">
        {/* Hero Section */}
        <div className="not-prose mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to CSSMA Documentation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn how to convert between Tailwind CSS and Figma design tokens with ease.
          </p>
          
          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <a 
              href="/docs/quickstart" 
              className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <Download className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-semibold text-purple-900">Quick Start</div>
                <div className="text-sm text-purple-700">Get up and running in minutes</div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-600 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="/docs/api" 
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <Code className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-semibold text-blue-900">API Reference</div>
                <div className="text-sm text-blue-700">Complete function documentation</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="/docs/examples" 
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold text-green-900">Examples</div>
                <div className="text-sm text-green-700">Real-world usage examples</div>
              </div>
              <ArrowRight className="w-4 h-4 text-green-600 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Introduction */}
        <h2>What is CSSMA?</h2>
        <p>
          CSSMA is a powerful library that bridges the gap between design and development by providing 
          seamless conversion between Tailwind CSS classes and Figma design properties. Whether you're 
          a designer looking to generate code from your designs or a developer wanting to create 
          Figma-compatible design tokens, CSSMA has you covered.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Bidirectional Conversion</strong> - Convert from Tailwind to Figma and vice versa</li>
          <li><strong>Multi-Framework Support</strong> - Generate React, Vue, and Angular components</li>
          <li><strong>Type Safety</strong> - Full TypeScript support with comprehensive type definitions</li>
          <li><strong>Extensible</strong> - Plugin system for custom transformations</li>
          <li><strong>Performance</strong> - Optimized for large-scale applications</li>
        </ul>

        <h3>How It Works</h3>
        <p>
          CSSMA uses a sophisticated parsing engine to understand Tailwind CSS classes and convert 
          them into Figma-compatible design properties. The conversion process maintains design 
          fidelity while ensuring that the output is optimized for each target platform.
        </p>

        <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Example</h4>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre><code>{`import { convertToFigma } from 'cssma'

const nodeData = {
  type: "FRAME",
  name: "Button",
  styles: "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
}

const figmaProperties = convertToFigma(nodeData)
console.log(figmaProperties)

// Output:
// {
//   fills: [{ type: "SOLID", color: { r: 0.239, g: 0.447, b: 0.847, a: 1 } }],
//   cornerRadius: 8,
//   paddingLeft: 16,
//   paddingRight: 16,
//   paddingTop: 8,
//   paddingBottom: 8
// }`}</code></pre>
          </div>
        </div>

        <h3>Next Steps</h3>
        <p>
          Ready to get started? Check out our <a href="/docs/quickstart">Quick Start Guide</a> to 
          install CSSMA and create your first conversion. For more advanced usage, explore our 
          <a href="/docs/api">API Reference</a> and <a href="/docs/examples">Examples</a> sections.
        </p>

        <div className="not-prose mt-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h4>
          <p className="text-gray-700 mb-4">
            Join our community for support, discussions, and the latest updates.
          </p>
          <div className="flex gap-4">
            <a 
              href="/community" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Join Community
            </a>
            <a 
              href="https://github.com/easylogic/cssma" 
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}
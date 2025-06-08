import { Metadata } from "next"
import DocsLayout from '@/components/DocsLayout'
import { Code, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'API Reference - CSSMA Documentation',
  description: 'Complete API reference for all CSSMA functions and types.',
}

export default function APIPage() {
  return (
    <DocsLayout>
      <div className="prose prose-lg max-w-none">
        <div className="not-prose mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
          <p className="text-xl text-gray-600">
            Complete reference for all CSSMA functions, types, and interfaces.
          </p>
        </div>

        <h2>Core Functions</h2>
        
        {/* convertToFigma */}
        <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">convertToFigma</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Converts NodeData with Tailwind CSS classes to Figma-compatible design properties.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Signature</h4>
            <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
              <code>convertToFigma(nodeData: NodeData): FigmaProperties</code>
            </div>
          </div>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre><code>{`import { convertToFigma } from 'cssma'

const nodeData = {
  type: "FRAME",
  name: "Button",
  styles: "bg-blue-500 text-white px-4 py-2 rounded-lg"
}

const result = convertToFigma(nodeData)`}</code></pre>
          </div>
        </div>

        {/* generateReact */}
        <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">generateReact</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Generates React component code from NodeData structure.
          </p>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre><code>{`import { generateReact } from 'cssma'

const nodeData = {
  type: "FRAME",
  name: "Card",
  styles: "bg-white p-6 rounded-xl shadow-lg"
}

const reactCode = generateReact(nodeData)`}</code></pre>
          </div>
        </div>

        <h2>Types & Interfaces</h2>

        <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">NodeData</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <pre><code>{`interface NodeData {
  type: "FRAME" | "TEXT" | "COMPONENT"
  name: string
  styles?: string
  text?: string
  children?: NodeData[]
}`}</code></pre>
          </div>
        </div>

        <div className="not-prose mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">📚 More Documentation</h3>
          <p className="text-yellow-800 mb-4">
            For detailed examples and advanced usage patterns, check out our examples section.
          </p>
          <a 
            href="/docs/examples" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            View Examples
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </DocsLayout>
  )
}

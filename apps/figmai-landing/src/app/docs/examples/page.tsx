import { Metadata } from 'next'
import DocsLayout from '@/components/DocsLayout'
import { Play, Copy, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Examples - CSSMA Documentation',
  description: 'Real-world examples and use cases for CSSMA library.',
}

export default function ExamplesPage() {
  return (
    <DocsLayout>
      <div className="prose prose-lg max-w-none">
        <div className="not-prose mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Examples</h1>
          <p className="text-xl text-gray-600">
            Real-world examples and common use cases for CSSMA.
          </p>
        </div>

        <h2>Basic Components</h2>

        {/* Button Example */}
        <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Button Component</h3>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            A simple button component with hover states and focus rings.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Input (NodeData)</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <pre><code>{`{
  type: "FRAME",
  name: "PrimaryButton",
  styles: "bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
}`}</code></pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Output (Figma Properties)</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <pre><code>{`{
  fills: [{
    type: "SOLID",
    color: { r: 0.239, g: 0.447, b: 0.847, a: 1 }
  }],
  cornerRadius: 8,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 12,
  paddingBottom: 12
}`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        {/* Card Example */}
        <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Card Component</h3>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            A card component with nested text elements and proper hierarchy.
          </p>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <pre><code>{`{
  type: "FRAME",
  name: "ProductCard",
  styles: "bg-white p-6 rounded-xl shadow-lg border border-gray-200",
  children: [
    {
      type: "TEXT",
      name: "Title",
      text: "Product Name",
      styles: "text-xl font-bold text-gray-900 mb-2"
    },
    {
      type: "TEXT", 
      name: "Description",
      text: "Product description goes here...",
      styles: "text-gray-600 mb-4"
    },
    {
      type: "FRAME",
      name: "PriceContainer",
      styles: "flex items-center justify-between",
      children: [
        {
          type: "TEXT",
          name: "Price",
          text: "$99.99",
          styles: "text-2xl font-bold text-green-600"
        },
        {
          type: "FRAME",
          name: "Button",
          styles: "bg-blue-500 text-white px-4 py-2 rounded-lg"
        }
      ]
    }
  ]
}`}</code></pre>
          </div>
        </div>

        <h2>Framework-Specific Examples</h2>

        {/* React Example */}
        <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">React Component Generation</h3>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                <Copy className="w-4 h-4" />
              </button>
              <a href="/playground" className="p-2 text-gray-500 hover:text-gray-700 rounded">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            Generate React components with TypeScript support and proper prop interfaces.
          </p>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <pre><code>{`import { generateReact } from 'cssma'

const nodeData = {
  type: "FRAME",
  name: "AlertBanner",
  styles: "bg-yellow-50 border border-yellow-200 p-4 rounded-lg",
  children: [
    {
      type: "TEXT",
      name: "Message",
      text: "Warning message",
      styles: "text-yellow-800 font-medium"
    }
  ]
}

const reactComponent = generateReact(nodeData, {
  typescript: true,
  includeProps: true
})

// Generated output:
// interface AlertBannerProps {
//   message?: string;
// }
// 
// export const AlertBanner: React.FC<AlertBannerProps> = ({ 
//   message = "Warning message" 
// }) => {
//   return (
//     <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
//       <span className="text-yellow-800 font-medium">{message}</span>
//     </div>
//   );
// };`}</code></pre>
          </div>
        </div>

        <h2>Advanced Use Cases</h2>

        {/* Complex Layout Example */}
        <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Complex Layout</h3>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            A complex dashboard layout with multiple nested components and responsive design.
          </p>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <pre><code>{`{
  type: "FRAME",
  name: "Dashboard",
  styles: "min-h-screen bg-gray-100 p-6",
  children: [
    {
      type: "FRAME",
      name: "Header",
      styles: "bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between",
      children: [
        {
          type: "TEXT",
          name: "Title",
          text: "Dashboard",
          styles: "text-2xl font-bold text-gray-900"
        },
        {
          type: "FRAME",
          name: "UserMenu",
          styles: "flex items-center gap-3"
        }
      ]
    },
    {
      type: "FRAME",
      name: "Content",
      styles: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      children: [
        // Multiple card components...
      ]
    }
  ]
}`}</code></pre>
          </div>
        </div>

        <div className="not-prose mt-12 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">🚀 Try It Yourself</h3>
          <p className="text-purple-800 mb-4">
            Want to experiment with these examples? Use our interactive playground to test 
            different configurations and see the results in real-time.
          </p>
          <a 
            href="/playground" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Open Playground
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </DocsLayout>
  )
}

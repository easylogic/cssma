"use client";

import { useState } from 'react';
import { useCssmaWithAnimations } from 'cssma-react';

interface AnimationExample {
  name: string;
  classes: string;
  description: string;
  category: 'transition' | 'animation' | 'transform';
}

const animationExamples: AnimationExample[] = [
  {
    name: 'Smooth Hover',
    classes: 'transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg',
    description: 'Smooth scaling and shadow transition on hover',
    category: 'transition'
  },
  {
    name: 'Color Transition',
    classes: 'transition-colors duration-500 bg-blue-500 hover:bg-purple-600 text-white',
    description: 'Smooth color transition between states',
    category: 'transition'
  },
  {
    name: 'Spinning Loading',
    classes: 'animate-spin bg-gradient-to-r from-blue-500 to-purple-600 rounded-full',
    description: 'Continuous spinning animation for loading states',
    category: 'animation'
  },
  {
    name: 'Pulse Effect',
    classes: 'animate-pulse bg-gray-300 rounded-lg',
    description: 'Subtle pulsing effect for skeleton loading',
    category: 'animation'
  },
  {
    name: 'Bounce Animation',
    classes: 'animate-bounce bg-red-500 rounded-full text-white flex items-center justify-center',
    description: 'Playful bouncing animation',
    category: 'animation'
  },
  {
    name: 'Transform Hover',
    classes: 'transition-transform duration-300 hover:rotate-12 hover:-translate-y-2',
    description: 'Combined rotation and translation on hover',
    category: 'transform'
  }
];

export default function AnimationShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'transition' | 'animation' | 'transform'>('all');

  const filteredExamples = selectedCategory === 'all' 
    ? animationExamples 
    : animationExamples.filter(example => example.category === selectedCategory);

  return (
    <div className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Animation System Showcase
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore how CSSMA handles various animation and transition classes, 
            providing seamless conversion between Tailwind and Figma.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border">
            {(['all', 'transition', 'animation', 'transform'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md capitalize transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Animation Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example, index) => (
            <AnimationCard key={index} example={example} />
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Animation System Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Supported Animations
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Transitions (colors, opacity, shadows, transforms)</li>
                <li>• Duration control (75ms - 1000ms + arbitrary)</li>
                <li>• Easing functions (linear, ease-in, ease-out, ease-in-out)</li>
                <li>• Built-in animations (spin, pulse, bounce, ping)</li>
                <li>• Transform animations (rotate, scale, translate)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Figma Integration
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Animation metadata extraction</li>
                <li>• Smart transition suggestions</li>
                <li>• CSS keyframe definitions</li>
                <li>• Plugin animation previews</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimationCard({ example }: { example: AnimationExample }) {
  const { className, animationMetadata } = useCssmaWithAnimations(example.classes);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {example.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            example.category === 'transition' ? 'bg-green-100 text-green-800' :
            example.category === 'animation' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {example.category}
          </span>
        </div>

        {/* Demo Element */}
        <div className="mb-4 flex justify-center">
          <div 
            className={`w-16 h-16 cursor-pointer ${className}`}
            style={{ minHeight: '64px', minWidth: '64px' }}
          >
            {example.category === 'animation' && example.classes.includes('text-white') && (
              <span className="text-sm font-medium">Demo</span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {example.description}
        </p>

        {/* Animation Metadata */}
        {animationMetadata.hasAnimations && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">
              Animation Details:
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              {animationMetadata.duration && (
                <div>Duration: {animationMetadata.duration}</div>
              )}
              {animationMetadata.easing && (
                <div>Easing: {animationMetadata.easing}</div>
              )}
              {animationMetadata.animationTypes.length > 0 && (
                <div>Animations: {animationMetadata.animationTypes.join(', ')}</div>
              )}
            </div>
          </div>
        )}

        {/* CSS Classes */}
        <div className="bg-gray-900 rounded-lg p-3">
          <code className="text-xs text-green-400 break-all">
            {example.classes}
          </code>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { Template } from '@/types/template';
import { Copy, Eye, Heart, Check } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCopyTailwind = async () => {
    try {
      await navigator.clipboard.writeText(template.tailwindClasses);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyFigma = async () => {
    try {
      const figmaCode = JSON.stringify(template.figmaStyles, null, 2);
      await navigator.clipboard.writeText(figmaCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Preview Area */}
      <div className="relative bg-gray-50 p-8 min-h-[200px] flex items-center justify-center">
        {/* Live Preview */}
        <div 
          className={`${template.tailwindClasses} flex items-center justify-center`}
          style={{ 
            minWidth: 'fit-content',
            minHeight: 'fit-content'
          }}
        >
          {template.category.id === 'buttons' && (
            <span className="text-current">Button</span>
          )}
          {template.category.id === 'cards' && (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <span>Card Content</span>
            </div>
          )}
          {template.category.id === 'forms' && (
            <input 
              type="text" 
              placeholder="Enter text..." 
              className={template.tailwindClasses}
              readOnly
            />
          )}
          {template.category.id === 'navigation' && (
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold">Logo</span>
              <div className="flex space-x-4">
                <span>Home</span>
                <span>About</span>
                <span>Contact</span>
              </div>
            </div>
          )}
          {template.category.id === 'layout' && (
            <div className="w-full h-full">
              <div className="grid grid-cols-3 gap-4 h-full">
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
              </div>
            </div>
          )}
          {template.category.id === 'feedback' && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-current rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Success message</span>
            </div>
          )}
        </div>

        {/* Overlay Actions */}
        <div className="absolute top-2 right-2 flex space-x-2" suppressHydrationWarning>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            title="Toggle preview"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            title="Like template"
          >
            <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Featured Badge */}
        {template.featured && (
          <div className="absolute top-2 left-2">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-medium px-2 py-1 rounded-full">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {template.name}
            </h3>
            <p className="text-sm text-gray-600">
              {template.description}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <span className={template.category.color.replace('bg-', 'text-')}>
              {template.category.icon}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              +{template.tags.length - 3}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(template.complexity)}`}>
              {template.complexity}
            </span>
            {template.usageCount && (
              <span>{template.usageCount.toLocaleString()} uses</span>
            )}
          </div>
          {template.author && (
            <span>by {template.author.name}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2" suppressHydrationWarning>
          <button
            onClick={handleCopyTailwind}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy CSS</span>
              </>
            )}
          </button>
          <button
            onClick={handleCopyFigma}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Figma</span>
          </button>
        </div>

        {/* Code Preview */}
        {showPreview && (
          <div className="mt-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{template.tailwindClasses}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 
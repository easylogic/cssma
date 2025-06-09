'use client';

import { useState } from 'react';
import { Template } from '@/types/template';
import { Copy, Eye, Heart, Check, Star, Maximize2, Code, Figma } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [copyType, setCopyType] = useState<'tailwind' | 'figma'>('tailwind');
  
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCopy = async (type: 'tailwind' | 'figma') => {
    try {
      const textToCopy = type === 'tailwind' 
        ? template.tailwindClasses 
        : JSON.stringify(template.figmaStyles, null, 2);
      
      await navigator.clipboard.writeText(textToCopy);
      setCopyType(type);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(template.id);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      {/* Preview Area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 min-h-[180px] flex items-center justify-center overflow-hidden">
        {/* Live Preview */}
        <div className="transition-transform group-hover:scale-105 duration-300 flex items-center justify-center w-full">
          {template.category.id === 'buttons' && (
            <button className={template.tailwindClasses} disabled>
              {template.name.includes('Primary') ? 'Primary' : 
               template.name.includes('Outline') ? 'Outline' : 
               template.name.includes('Ghost') ? 'Ghost' : 'Button'}
            </button>
          )}
          {template.category.id === 'cards' && (
            <div className={`${template.tailwindClasses} w-48 max-w-full`}>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Product Card</h3>
                <p className="text-gray-600 text-xs">Beautiful card design with clean layout</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">$29</span>
                  <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Buy</button>
                </div>
              </div>
            </div>
          )}
          {template.category.id === 'forms' && (
            <div className="w-48 max-w-full">
              <input 
                type="text" 
                placeholder="Enter your email..." 
                className={template.tailwindClasses}
                readOnly
              />
            </div>
          )}
          {template.category.id === 'navigation' && (
            <nav className={`${template.tailwindClasses} w-48 max-w-full`}>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="font-semibold text-sm">Logo</span>
                <div className="flex space-x-3 text-xs">
                  <span>Home</span>
                  <span>About</span>
                </div>
              </div>
            </nav>
          )}
          {template.category.id === 'layout' && (
            <div className={`${template.tailwindClasses} w-48 max-w-full h-24`}>
              <div className="grid grid-cols-3 gap-2 h-full p-2">
                <div className="bg-gray-300 rounded"></div>
                <div className="bg-gray-300 rounded"></div>
                <div className="bg-gray-300 rounded"></div>
              </div>
            </div>
          )}
          {template.category.id === 'feedback' && (
            <div className={`${template.tailwindClasses} max-w-xs`}>
              <div className="flex items-center space-x-2 p-3">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Success message</span>
              </div>
            </div>
          )}
          {template.category.id === 'modals' && (
            <div className={`${template.tailwindClasses} w-48 max-w-full`}>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-sm mb-2">Modal Title</h3>
                <p className="text-xs text-gray-600 mb-3">Modal content goes here</p>
                <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded">OK</button>
              </div>
            </div>
          )}
          {template.category.id === 'badges' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <span className={template.tailwindClasses}>
                {template.name.includes('Success') ? 'Success' :
                 template.name.includes('Warning') ? 'Warning' :
                 template.name.includes('Error') ? 'Error' : 'Badge'}
              </span>
            </div>
          )}
          {/* Default fallback for other categories */}
          {!['buttons', 'cards', 'forms', 'navigation', 'layout', 'feedback', 'modals', 'badges'].includes(template.category.id) && (
            <div className={`${template.tailwindClasses} w-48 max-w-full p-3`}>
              <div className="text-center text-sm">
                {template.name}
              </div>
            </div>
          )}
        </div>

        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" suppressHydrationWarning>
          <button
            onClick={() => setShowFullPreview(true)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
            title="Full preview"
          >
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleFavoriteToggle}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
            title={isFavorite(template.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 ${isFavorite(template.id) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {template.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
              ⭐ Featured
            </span>
          )}
          {template.rating && template.rating.average >= 4.5 && (
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
              🏆 Top Rated
            </span>
          )}
        </div>

        {/* Usage Count */}
        {template.usageCount && template.usageCount > 1000 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {template.usageCount > 1000 ? `${Math.floor(template.usageCount / 1000)}k+ uses` : `${template.usageCount} uses`}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {template.name}
              </h3>
              <span className="text-lg">{template.category.icon}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {template.description}
            </p>
          </div>
        </div>

        {/* Rating */}
        {template.rating && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(template.rating.average)}
            </div>
            <span className="text-sm text-gray-600">
              {template.rating.average.toFixed(1)} ({template.rating.count})
            </span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
              +{template.tags.length - 3}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getComplexityColor(template.complexity)}`}>
              {template.complexity}
            </span>
            {template.author && (
              <span className="text-gray-500">by {template.author.name}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2" suppressHydrationWarning>
          <button
            onClick={() => handleCopy('tailwind')}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2 shadow-sm"
          >
            {copied && copyType === 'tailwind' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Code className="w-4 h-4" />
                <span>CSS</span>
              </>
            )}
          </button>
          <button
            onClick={() => handleCopy('figma')}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-2.5 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2 shadow-sm"
          >
            {copied && copyType === 'figma' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Figma className="w-4 h-4" />
                <span>Figma</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Full Preview Modal */}
      {showFullPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowFullPreview(false)}>
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                <button
                  onClick={() => setShowFullPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-8 bg-gray-50 min-h-[300px] flex items-center justify-center">
              <div className={`${template.tailwindClasses} scale-150`}>
                {template.category.id === 'buttons' && <span className="text-current">Button</span>}
                {template.category.id === 'cards' && (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <span>Card Content</span>
                  </div>
                )}
                {/* Add other category previews as needed */}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tailwind CSS</h4>
                  <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
                    <code>{template.tailwindClasses}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Figma Styles</h4>
                  <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto max-h-40">
                    <code>{JSON.stringify(template.figmaStyles, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
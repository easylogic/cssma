/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Template, NodeData } from '@/types/template';
import { Copy, Eye, Heart, Check, Star, Maximize2, Code } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { getTemplateComponent } from '@/components/templates';
import Image from 'next/image';
import { parseStyles, convertStylesToFigma } from 'cssma';
import { NodeRenderer } from 'cssma-react';

interface TemplateCardProps {
  template: Template;
}

// Convert nodeData to JSON string for copying
const nodeDataToJson = (nodeData: NodeData): string => {
  return JSON.stringify(nodeData, null, 2);
};

// Extract Tailwind classes from nodeData recursively
const extractTailwindClasses = (nodeData: NodeData): string => {
  const styles = nodeData.styles || '';
  const childStyles = nodeData.children?.map(child => extractTailwindClasses(child)).filter(Boolean).join(' ') || '';
  return [styles, childStyles].filter(Boolean).join(' ');
};

// Convert NodeData to Figma properties using cssma package (from Demo.tsx)
const convertNodeDataToFigma = (nodeData: NodeData): any => {
  const convertedNode = { ...nodeData };

  // Convert styles to figmaProperties if styles exist
  if (nodeData.styles) {
    try {
      const parsedStyles = parseStyles(nodeData.styles);
      const figmaProperties = convertStylesToFigma(parsedStyles);
      convertedNode.figmaProperties = figmaProperties;
    } catch (error) {
      console.error('Error converting styles:', error);
      convertedNode.figmaProperties = { error: 'Failed to convert styles' };
    }
  }

  // Recursively convert children
  if (nodeData.children && Array.isArray(nodeData.children)) {
    convertedNode.children = nodeData.children.map((child: NodeData) =>
      convertNodeDataToFigma(child)
    );
  }

  // Remove original styles property
  delete (convertedNode as any).styles;
  return convertedNode;
};

// Render preview - use NodeRenderer with useCssma for dynamic rendering
const renderPreview = (template: Template, isFullSize: boolean = false): React.ReactNode => {
  // Try to get component by template ID first (for backward compatibility)
  const Component = getTemplateComponent(template.id);
  
  if (Component) {
    const ComponentToRender = Component as React.ComponentType<any>;
    return (
      <div className={isFullSize ? '' : 'transform scale-75 origin-center'}>
        <ComponentToRender />
      </div>
    );
  }

  // Use NodeRenderer with useCssma for dynamic rendering
  if (template.nodeData) {
    return (
      <NodeRenderer 
        nodeData={template.nodeData} 
        scale={isFullSize ? 1 : 0.75}
      />
    );
  }

  return <div className="text-gray-400 text-sm">No Preview Available</div>;
};

export default function TemplateCard({ template }: TemplateCardProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [copyType, setCopyType] = useState<'tailwind' | 'nodedata' | 'figma'>('tailwind');
  
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCopy = async (type: 'tailwind' | 'nodedata' | 'figma') => {
    try {
      let textToCopy = '';
      if (type === 'tailwind') {
        textToCopy = extractTailwindClasses(template.nodeData);
      } else if (type === 'nodedata') {
        textToCopy = nodeDataToJson(template.nodeData);
      } else if (type === 'figma') {
        textToCopy = JSON.stringify(convertNodeDataToFigma(template.nodeData), null, 2);
      }
      
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
    return Array.from({ length: 5 }, (_, i) => {
      const StarIcon = Star as React.ComponentType<{ 
        key: number; 
        className: string; 
      }>;
      return (
        <StarIcon
          key={i}
          className={`w-3 h-3 ${
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-current'
              : i < rating
              ? 'text-yellow-400 fill-current opacity-50'
              : 'text-gray-300'
          }`}
        />
      );
    });
  };

  // Lucide 아이콘들을 타입캐스팅
  const EyeIcon = Eye as React.ComponentType<{ className: string }>;
  const Maximize2Icon = Maximize2 as React.ComponentType<{ className: string }>;
  const HeartIcon = Heart as React.ComponentType<{ className: string }>;
  const CheckIcon = Check as React.ComponentType<{ className: string }>;
  const CopyIcon = Copy as React.ComponentType<{ className: string }>;
  const CodeIcon = Code as React.ComponentType<{ className: string }>;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      {/* Preview Area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-[200px] flex items-center justify-center overflow-hidden">
        {/* Live Preview */}
        <div className="transition-transform flex items-center justify-center w-full h-full">
          <div className="flex items-center justify-center max-w-[240px] max-h-[160px]">
            {renderPreview(template, false)}
          </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
              title="Quick Preview"
            >
              <EyeIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setShowFullPreview(true)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
              title="Full Preview"
            >
              <Maximize2Icon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Featured Badge */}
        {template.featured && (
          <div className="absolute top-3 left-3">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Featured
            </div>
          </div>
        )}
      </div>

      {/* Quick Preview Overlay */}
      {showPreview && (
        <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg p-6 max-w-full max-h-full overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="flex items-center justify-center p-4">
              {renderPreview(template, true)}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {template.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {template.description}
            </p>
          </div>
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-lg transition-colors ml-2 ${
              isFavorite(template.id)
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <HeartIcon className={`w-4 h-4 ${isFavorite(template.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="inline-block text-gray-500 text-xs">
              +{template.tags.length - 3}
            </span>
          )}
        </div>

        {/* Metadata Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* Category */}
            <span
              className="inline-flex items-center text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: `${template.category.color}15`, color: template.category.color }}
            >
              <span className="mr-1">{template.category.icon}</span>
              {template.category.name}
            </span>

            {/* Complexity */}
            <span className={`text-xs px-2 py-1 rounded-full ${getComplexityColor(template.complexity)}`}>
              {template.complexity}
            </span>
          </div>

          {/* Usage Count */}
          {template.usageCount && (
            <div className="text-xs text-gray-500">
              {template.usageCount.toLocaleString()} uses
            </div>
          )}
        </div>

        {/* Rating */}
        {template.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {renderStars(template.rating.average)}
            </div>
            <span className="text-sm text-gray-600">
              {template.rating.average.toFixed(1)} ({template.rating.count})
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => handleCopy('tailwind')}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {copied && copyType === 'tailwind' ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
            {copied && copyType === 'tailwind' ? 'Copied!' : 'Copy CSS'}
          </button>
          
          <button
            onClick={() => handleCopy('nodedata')}
            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copied && copyType === 'nodedata' ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <CodeIcon className="w-4 h-4" />
            )}
            {copied && copyType === 'nodedata' ? 'Copied!' : 'NodeData'}
          </button>
        </div>

        {/* Author & Date */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {template.author.avatar && <Image src={template.author.avatar} alt={template.author.name} className="w-6 h-6 rounded-full" width={24} height={24} />}
            <span className="text-sm text-gray-600">{template.author.name}</span>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(template.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Full Preview Modal */}
      {showFullPreview && typeof document !== 'undefined' && (
        createPortal(
          <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-[95vw] h-[95vh] max-w-7xl flex flex-col overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
                  <p className="text-gray-600 mt-1">{template.description}</p>
                </div>
                <button
                  onClick={() => setShowFullPreview(false)}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-light hover:bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-6 flex flex-col min-h-0">
                {/* Preview - 상단 영역 (높이 더 증가) */}
                <div className="h-96 mb-4 flex-shrink-0">
                  <div className="h-full border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 flex items-center justify-center">
                    <div className="flex items-center justify-center max-w-full max-h-full">
                      {renderPreview(template, true)}
                    </div>
                  </div>
                </div>

                {/* Bottom Section: nodeData와 Figma Styles */}
                <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                  {/* Left: nodeData */}
                  <div className="flex flex-col min-h-0">
                    <div className="flex items-center gap-3 mb-2 flex-shrink-0">
                      <h3 className="text-sm font-semibold text-gray-900">NodeData Structure</h3>
                      <button
                        onClick={() => handleCopy('nodedata')}
                        className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        Copy JSON
                      </button>
                    </div>
                    <div className="flex-1 bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-auto min-h-0">
                      <pre className="whitespace-pre-wrap">
                        <code className="language-json text-green-400">
                          {nodeDataToJson(template.nodeData)}
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Right: Figma Styles */}
                  <div className="flex flex-col min-h-0">
                    <div className="flex items-center gap-3 mb-2 flex-shrink-0">
                      <h3 className="text-sm font-semibold text-gray-900">Figma Styles</h3>
                      <button
                        onClick={() => handleCopy('figma')}
                        className="px-2 py-1 text-xs text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                      >
                        Copy Figma JSON
                      </button>
                    </div>
                    <div className="flex-1 bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-auto min-h-0">
                      <pre className="whitespace-pre-wrap">
                        <code className="language-json text-blue-400">
                          {JSON.stringify(convertNodeDataToFigma(template.nodeData), null, 2)}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </div>
  );
} 
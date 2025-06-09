'use client';

import { TemplateFilter, TemplateCategory } from '@/types/template';

interface TemplateFiltersProps {
  filter: TemplateFilter;
  onChange: (filter: Partial<TemplateFilter>) => void;
  categories: TemplateCategory[];
}

export default function TemplateFilters({ filter, onChange, categories }: TemplateFiltersProps) {
  const complexityOptions = [
    { value: 'beginner', label: 'Beginner', color: 'text-green-600' },
    { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-600' },
    { value: 'advanced', label: 'Advanced', color: 'text-red-600' }
  ];

  const popularTags = [
    'button', 'card', 'form', 'navigation', 'layout', 'responsive',
    'shadow', 'gradient', 'interactive', 'modern', 'simple', 'clean'
  ];

  const handleCategoryChange = (categoryId: string) => {
    onChange({ 
      category: filter.category === categoryId ? undefined : categoryId 
    });
  };

  const handleComplexityChange = (complexity: string) => {
    onChange({ 
      complexity: filter.complexity === complexity ? undefined : complexity 
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filter.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onChange({ tags: newTags.length > 0 ? newTags : undefined });
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                filter.category === category.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-xs text-gray-500">{category.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Complexity */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Complexity</h4>
        <div className="space-y-2">
          {complexityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleComplexityChange(option.value)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                filter.complexity === option.value
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${
                option.value === 'beginner' ? 'bg-green-500' :
                option.value === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter.tags?.includes(tag)
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filter.category || filter.complexity || (filter.tags && filter.tags.length > 0)) && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Active Filters</h4>
          <div className="space-y-2">
            {filter.category && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">
                  {categories.find(c => c.id === filter.category)?.name}
                </span>
              </div>
            )}
            {filter.complexity && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Complexity:</span>
                <span className="font-medium capitalize">{filter.complexity}</span>
              </div>
            )}
            {filter.tags && filter.tags.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-600">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {filter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
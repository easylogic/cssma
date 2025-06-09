'use client';

import { useState } from 'react';
import { TemplateFilter, TemplateCategory } from '@/types/template';
import { ChevronDown, ChevronUp, Star, Heart, TrendingUp, Filter } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface TemplateFilterPanelProps {
  filter: TemplateFilter;
  onChange: (filter: Partial<TemplateFilter>) => void;
  categories: TemplateCategory[];
}

export default function TemplateFilterPanel({
  filter,
  onChange,
  categories
}: TemplateFilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    complexity: true,
    rating: false,
    usage: false,
    special: false
  });

  const { favoriteCount } = useFavorites();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const complexityOptions = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' }
  ];

  const ratingOptions = [
    { value: 4, label: '4+ Stars', icon: '⭐⭐⭐⭐' },
    { value: 3, label: '3+ Stars', icon: '⭐⭐⭐' },
    { value: 2, label: '2+ Stars', icon: '⭐⭐' },
    { value: 1, label: '1+ Stars', icon: '⭐' }
  ];

  const usageRanges = [
    { min: 10000, label: '10K+ uses', icon: '🔥' },
    { min: 5000, max: 9999, label: '5K-10K uses', icon: '📈' },
    { min: 1000, max: 4999, label: '1K-5K uses', icon: '👍' },
    { max: 999, label: 'Under 1K uses', icon: '🆕' }
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

  const handleRatingChange = (rating: number) => {
    onChange({
      rating: filter.rating === rating ? undefined : rating
    });
  };

  const handleUsageRangeChange = (range: { min?: number; max?: number }) => {
    const currentRange = filter.usageRange;
    const isSameRange = currentRange?.min === range.min && currentRange?.max === range.max;
    
    onChange({
      usageRange: isSameRange ? undefined : range
    });
  };

  const handleSpecialFilterChange = (type: 'featured' | 'favorites') => {
    onChange({
      [type]: filter[type] ? undefined : true
    });
  };

  const FilterSection = ({ 
    title, 
    section, 
    children, 
    count 
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode;
    count?: number;
  }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{title}</span>
          {count !== undefined && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        {expandedSections[section] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[section] && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-0">
      {/* Categories */}
      <FilterSection title="Categories" section="category" count={categories.length}>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={filter.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-lg">{category.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {category.name}
                </div>
                <div className="text-xs text-gray-500">
                  {category.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Complexity */}
      <FilterSection title="Complexity" section="complexity">
        <div className="space-y-2">
          {complexityOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={filter.complexity === option.value}
                onChange={() => handleComplexityChange(option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${option.color}`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Rating" section="rating">
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={filter.rating === option.value}
                onChange={() => handleRatingChange(option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm">{option.icon}</span>
                <span className="text-sm text-gray-700">{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Usage */}
      <FilterSection title="Usage" section="usage">
        <div className="space-y-2">
          {usageRanges.map((range, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={
                  filter.usageRange?.min === range.min && 
                  filter.usageRange?.max === range.max
                }
                onChange={() => handleUsageRangeChange(range)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm">{range.icon}</span>
                <span className="text-sm text-gray-700">{range.label}</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Special Filters */}
      <FilterSection title="Special" section="special">
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
            <input
              type="checkbox"
              checked={filter.featured || false}
              onChange={() => handleSpecialFilterChange('featured')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-700">Featured Templates</span>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
            <input
              type="checkbox"
              checked={filter.favorites || false}
              onChange={() => handleSpecialFilterChange('favorites')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-700">
                My Favorites {favoriteCount > 0 && `(${favoriteCount})`}
              </span>
            </div>
          </label>
        </div>
      </FilterSection>

      {/* Active Filters Summary */}
      {(filter.category || filter.complexity || filter.rating || filter.usageRange || filter.featured || filter.favorites) && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Active Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filter.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                {categories.find(c => c.id === filter.category)?.name}
              </span>
            )}
            {filter.complexity && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                {filter.complexity}
              </span>
            )}
            {filter.rating && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                {filter.rating}+ stars
              </span>
            )}
            {filter.featured && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                Featured
              </span>
            )}
            {filter.favorites && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                Favorites
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
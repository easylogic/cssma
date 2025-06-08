'use client';

import { useState, useMemo } from 'react';
import { templateCollection, searchTemplates, getTemplatesByCategory } from '@/lib/template-data';
import { TemplateFilter } from '@/types/template';
import TemplateCard from '@/components/TemplateCard';
import TemplateFilters from '@/components/TemplateFilters';
import TemplateSearch from '@/components/TemplateSearch';
import FeaturedTemplates from '@/components/FeaturedTemplates';

export default function TemplatesPage() {
  const [filter, setFilter] = useState<TemplateFilter>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search templates
  const filteredTemplates = useMemo(() => {
    let templates = templateCollection.templates;

    // Apply search
    if (searchQuery.trim()) {
      templates = searchTemplates(searchQuery);
    }

    // Apply category filter
    if (filter.category) {
      templates = templates.filter(template => template.category.id === filter.category);
    }

    // Apply complexity filter
    if (filter.complexity) {
      templates = templates.filter(template => template.complexity === filter.complexity);
    }

    // Apply tag filters
    if (filter.tags && filter.tags.length > 0) {
      templates = templates.filter(template =>
        filter.tags!.some(tag => template.tags.includes(tag))
      );
    }

    return templates;
  }, [searchQuery, filter]);

  const handleFilterChange = (newFilter: Partial<TemplateFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const clearFilters = () => {
    setFilter({});
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Template Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover ready-to-use UI components with Tailwind CSS classes and Figma styles. 
              Copy, customize, and integrate into your projects instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Templates Section */}
      {!searchQuery && !filter.category && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FeaturedTemplates />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {(Object.keys(filter).length > 0 || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <TemplateSearch 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search templates..."
              />
              
              <div className="mt-6">
                <TemplateFilters 
                  filter={filter}
                  onChange={handleFilterChange}
                  categories={templateCollection.categories}
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filter.category 
                    ? templateCollection.categories.find(c => c.id === filter.category)?.name 
                    : 'All Templates'
                  }
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="complexity">Complexity</option>
                </select>
              </div>
            </div>

            {/* Templates Grid */}
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard 
                    key={template.id} 
                    template={template}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No templates found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or browse different categories.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {templateCollection.totalCount}
              </div>
              <div className="text-gray-600 mt-1">Total Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {templateCollection.categories.length}
              </div>
              <div className="text-gray-600 mt-1">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {templateCollection.featuredTemplates.length}
              </div>
              <div className="text-gray-600 mt-1">Featured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">
                {templateCollection.templates.reduce((sum, t) => sum + (t.usageCount || 0), 0).toLocaleString()}
              </div>
              <div className="text-gray-600 mt-1">Total Uses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
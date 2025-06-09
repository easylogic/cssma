'use client';

import { useState, useMemo } from 'react';
import { TemplateFilter } from '@/types/template';
import { useTemplates } from '@/hooks/useTemplates';
import { useCategories } from '@/hooks/useCategories';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import TemplateFilterPanel from '@/components/TemplateFilterPanel';
import TemplateSearchWithHistory from '@/components/TemplateSearchWithHistory';
import FeaturedTemplates from '@/components/FeaturedTemplates';
import { useSearchHistory } from '@/hooks/useSearchHistory';

export default function TemplatesPage() {
  const [filter, setFilter] = useState<TemplateFilter>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'name' | 'complexity'>('popular');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch templates using API
  const { templates, pagination, loading, error } = useTemplates({
    filter,
    searchQuery,
    sortBy,
    page: currentPage,
    limit: 12
  });

  // Fetch categories
  const { categories } = useCategories();
  
  // Search history
  const { addToHistory } = useSearchHistory();

  const handleFilterChange = (newFilter: Partial<TemplateFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const clearFilters = () => {
    setFilter({});
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy: 'popular' | 'newest' | 'name' | 'complexity') => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    addToHistory(query, pagination?.totalCount);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">
              {pagination?.totalCount || 0} Templates Available
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Template
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Gallery</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover ready-to-use UI components with <strong>Tailwind CSS</strong> classes and <strong>Figma styles</strong>. 
            Copy, customize, and integrate into your projects instantly.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-indigo-600 mb-1">{pagination?.totalCount || 0}</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-purple-600 mb-1">{categories.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-pink-600 mb-1">
                {templates.filter(t => t.featured).length}
              </div>
              <div className="text-sm text-gray-600">Featured</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {Math.floor(templates.reduce((sum, t) => sum + (t.usageCount || 0), 0) / 1000)}K+
              </div>
              <div className="text-sm text-gray-600">Uses</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

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
              
              <TemplateSearchWithHistory 
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search templates..."
              />
              
              <div className="mt-6">
                <TemplateFilterPanel 
                  filter={filter}
                  onChange={handleFilterChange}
                  categories={categories}
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
                    ? categories.find(c => c.id === filter.category)?.name 
                    : 'All Templates'
                  }
                </h2>
                <p className="text-gray-600 mt-1">
                  {pagination?.totalCount || 0} template{(pagination?.totalCount || 0) !== 1 ? 's' : ''} found
                  {loading && ' (Loading...)'}
                </p>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as any)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="complexity">Complexity</option>
                </select>
              </div>
            </div>

            {/* Templates Grid */}
            {error ? (
              <div className="text-center py-12">
                <div className="text-red-400 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading templates</h3>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : templates.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {templates.map((template) => (
                    <TemplateCard 
                      key={template.id} 
                      template={template}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(pagination.totalPages, 10) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 rounded-md ${
                              page === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : loading ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">⏳</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading templates...</h3>
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


    </div>
    <Footer />
    </>
  );
} 
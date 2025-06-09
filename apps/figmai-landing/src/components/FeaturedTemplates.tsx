'use client';

import { useFeaturedTemplates } from '@/hooks/useTemplates';
import TemplateCard from './TemplateCard';

export default function FeaturedTemplates() {
  const { templates: featuredTemplates, loading, error } = useFeaturedTemplates();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Loading featured templates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <p className="text-gray-600">Failed to load featured templates</p>
      </div>
    );
  }

  if (featuredTemplates.length === 0) {
    return null;
  }

  return (
    <section className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 rounded-3xl opacity-30"></div>
      
      <div className="relative z-10 text-center mb-12">
        {/* Featured Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full mb-6 shadow-lg">
          <span className="text-lg">⭐</span>
          <span className="font-semibold">Featured Templates</span>
          <span className="text-lg">✨</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Handpicked Excellence
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Curated templates that showcase the <strong>best of design and functionality</strong>. 
          Perfect starting points for your next breakthrough project.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredTemplates.map((template, index) => (
          <div 
            key={template.id}
            className="transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <TemplateCard template={template} />
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to explore more?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse our complete collection of templates, filter by category, 
            and find the perfect components for your design system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/templates"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Browse All Templates
            </a>
            <a
              href="/docs"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold border border-blue-200"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 
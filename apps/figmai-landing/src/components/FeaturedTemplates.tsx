'use client';

import { getFeaturedTemplates } from '@/lib/template-data';
import TemplateCard from './TemplateCard';

export default function FeaturedTemplates() {
  const featuredTemplates = getFeaturedTemplates();

  if (featuredTemplates.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ⭐ Featured Templates
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hand-picked templates that showcase the best of design and functionality. 
          Perfect starting points for your next project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTemplates.map((template) => (
          <TemplateCard 
            key={template.id} 
            template={template}
          />
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
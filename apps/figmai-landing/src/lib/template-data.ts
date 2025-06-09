import { Template, TemplateCategory, TemplateCollection } from '@/types/template';
import { templateCategories } from '@/data/categories';
import { allTemplates, getFeaturedTemplates, getTemplatesByCategory, searchTemplates } from '@/data/templates';

// Re-export templates and categories
export { templateCategories } from '@/data/categories';
export { allTemplates as templates } from '@/data/templates';

// Legacy export for backward compatibility
export const sampleTemplates: Template[] = allTemplates;

// Template Collection
export const templateCollection: TemplateCollection = {
  templates: allTemplates,
  categories: templateCategories,
  totalCount: allTemplates.length,
  featuredTemplates: getFeaturedTemplates()
};

// Re-export utility functions
export { getFeaturedTemplates, getTemplatesByCategory, searchTemplates } from '@/data/templates'; 
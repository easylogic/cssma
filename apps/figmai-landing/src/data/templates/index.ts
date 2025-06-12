import { Template } from '@/types/template';
import { buttonTemplates } from './buttons';
import { cardTemplates } from './cards';
import { formTemplates } from './forms';
import { navigationTemplates } from './navigation';
import { layoutTemplates } from './layout';
import { feedbackTemplates } from './feedback';
import { modalTemplates } from './modals';
import { tableTemplates } from './tables';
import { badgeTemplates } from './badges';
import { loadingTemplates } from './loading';

// Combine all templates
export const allTemplates: Template[] = [
  ...buttonTemplates,
  ...cardTemplates,
  ...formTemplates,
  ...navigationTemplates,
  ...layoutTemplates,
  ...feedbackTemplates,
  ...modalTemplates,
  ...tableTemplates,
  ...badgeTemplates,
  ...loadingTemplates
];

// Export individual category templates
export {
  buttonTemplates,
  cardTemplates,
  formTemplates,
  navigationTemplates,
  layoutTemplates,
  feedbackTemplates,
  modalTemplates,
  tableTemplates,
  badgeTemplates,
  loadingTemplates
};

// Utility functions
export const getTemplatesByCategory = (categoryId: string): Template[] => {
  return allTemplates.filter(template => template.category.id === categoryId);
};

export const getFeaturedTemplates = (): Template[] => {
  return allTemplates.filter(template => template.featured);
};

export const searchTemplates = (query: string): Template[] => {
  const lowercaseQuery = query.toLowerCase();
  return allTemplates.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getTemplateById = (id: string): Template | undefined => {
  return allTemplates.find(template => template.id === id);
};

export const getTemplateStats = () => {
  return {
    totalCount: allTemplates.length,
    featuredCount: getFeaturedTemplates().length,
    totalUsage: allTemplates.reduce((sum, t) => sum + (t.usageCount || 0), 0),
    categoryCounts: allTemplates.reduce((acc, template) => {
      const categoryId = template.category.id;
      acc[categoryId] = (acc[categoryId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
}; 
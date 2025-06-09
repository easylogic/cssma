import { TemplateCategory } from '@/types/template';

export const templateCategories: TemplateCategory[] = [
  {
    id: 'buttons',
    name: 'Buttons',
    description: 'Interactive button components with various styles',
    icon: '🔘',
    color: 'bg-blue-500'
  },
  {
    id: 'cards',
    name: 'Cards',
    description: 'Content cards and containers',
    icon: '🃏',
    color: 'bg-green-500'
  },
  {
    id: 'forms',
    name: 'Forms',
    description: 'Input fields and form components',
    icon: '📝',
    color: 'bg-purple-500'
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Headers, menus, and navigation elements',
    icon: '🧭',
    color: 'bg-orange-500'
  },
  {
    id: 'layout',
    name: 'Layout',
    description: 'Grid systems and layout components',
    icon: '📐',
    color: 'bg-pink-500'
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'Alerts, notifications, and status indicators',
    icon: '💬',
    color: 'bg-yellow-500'
  },
  {
    id: 'modals',
    name: 'Modals & Overlays',
    description: 'Dialog boxes, popups, and overlay components',
    icon: '🪟',
    color: 'bg-indigo-500'
  },
  {
    id: 'tables',
    name: 'Tables & Data',
    description: 'Data tables, lists, and data display components',
    icon: '📊',
    color: 'bg-cyan-500'
  },
  {
    id: 'media',
    name: 'Media & Images',
    description: 'Image galleries, video players, and media components',
    icon: '🖼️',
    color: 'bg-emerald-500'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Shopping carts, product displays, and commerce components',
    icon: '🛒',
    color: 'bg-rose-500'
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Admin panels, charts, and dashboard components',
    icon: '📈',
    color: 'bg-violet-500'
  },
  {
    id: 'social',
    name: 'Social & Community',
    description: 'User profiles, comments, and social interaction components',
    icon: '👥',
    color: 'bg-teal-500'
  },
  {
    id: 'pricing',
    name: 'Pricing & Plans',
    description: 'Pricing tables, subscription plans, and billing components',
    icon: '💰',
    color: 'bg-amber-500'
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Customer reviews, testimonials, and social proof components',
    icon: '⭐',
    color: 'bg-lime-500'
  },
  {
    id: 'hero',
    name: 'Hero Sections',
    description: 'Landing page heroes, banners, and call-to-action sections',
    icon: '🚀',
    color: 'bg-sky-500'
  },
  {
    id: 'footers',
    name: 'Footers',
    description: 'Website footers with links, contact info, and social media',
    icon: '🦶',
    color: 'bg-slate-500'
  },
  {
    id: 'loading',
    name: 'Loading & Progress',
    description: 'Spinners, progress bars, and loading state components',
    icon: '⏳',
    color: 'bg-orange-400'
  },
  {
    id: 'badges',
    name: 'Badges & Labels',
    description: 'Status badges, tags, and label components',
    icon: '🏷️',
    color: 'bg-red-500'
  },
  {
    id: 'timeline',
    name: 'Timeline & Steps',
    description: 'Progress indicators, timelines, and step-by-step components',
    icon: '📅',
    color: 'bg-blue-400'
  },
  {
    id: 'stats',
    name: 'Statistics',
    description: 'Metric displays, counters, and statistical components',
    icon: '📊',
    color: 'bg-green-400'
  }
];

export const getCategoryById = (id: string): TemplateCategory | undefined => {
  return templateCategories.find(category => category.id === id);
}; 
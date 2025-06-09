import { Template, TemplateCategory } from '@/types/template';

// Template Categories
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

// Core template samples (reduced set for better performance)
export const coreTemplates: Template[] = [
  // Essential Buttons
  {
    id: 'btn-primary',
    name: 'Primary Button',
    description: 'A solid primary button with hover effects',
    category: templateCategories[0],
    tags: ['button', 'primary', 'solid', 'interactive'],
    tailwindClasses: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200',
    figmaStyles: {
      layout: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        width: 120,
        height: 40
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.15, g: 0.47, b: 0.85 },
          opacity: 1
        }],
        cornerRadius: 8
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 600,
        textAlignHorizontal: 'CENTER',
        textAlignVertical: 'CENTER'
      }
    },
    complexity: 'beginner',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    author: { name: 'FigmaikR Team' },
    usageCount: 1250,
    featured: true
  },
  {
    id: 'btn-outline',
    name: 'Outline Button',
    description: 'A clean outline button with border',
    category: templateCategories[0],
    tags: ['button', 'outline', 'border', 'secondary'],
    tailwindClasses: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200',
    figmaStyles: {
      layout: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        width: 120,
        height: 40
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 8,
        strokeWeight: 2,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.15, g: 0.47, b: 0.85 },
          opacity: 1
        }]
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 600,
        textAlignHorizontal: 'CENTER',
        textAlignVertical: 'CENTER'
      }
    },
    complexity: 'beginner',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    author: { name: 'FigmaikR Team' },
    usageCount: 890
  },
  {
    id: 'btn-gradient',
    name: 'Gradient Button',
    description: 'Eye-catching gradient button with shadow',
    category: templateCategories[0],
    tags: ['button', 'gradient', 'shadow', 'modern'],
    tailwindClasses: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
    figmaStyles: {
      layout: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 12,
        paddingBottom: 12,
        width: 140,
        height: 48
      },
      appearance: {
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            { position: 0, color: { r: 0.67, g: 0.31, b: 0.86 } },
            { position: 1, color: { r: 0.93, g: 0.31, b: 0.67 } }
          ]
        }],
        cornerRadius: 24
      },
      effects: [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0 },
        offset: { x: 0, y: 4 },
        radius: 12,
        spread: 0,
        visible: true
      }],
      typography: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 700,
        textAlignHorizontal: 'CENTER',
        textAlignVertical: 'CENTER'
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
    author: { name: 'FigmaikR Team' },
    usageCount: 2100,
    featured: true
  },

  // Essential Cards
  {
    id: 'card-simple',
    name: 'Simple Card',
    description: 'Clean and minimal card component',
    category: templateCategories[1],
    tags: ['card', 'container', 'simple', 'shadow'],
    tailwindClasses: 'bg-white rounded-lg shadow-md p-6 border border-gray-200',
    figmaStyles: {
      layout: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        width: 320,
        height: 200
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 8,
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.9, g: 0.9, b: 0.9 },
          opacity: 1
        }]
      },
      effects: [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0 },
        offset: { x: 0, y: 2 },
        radius: 8,
        spread: 0,
        visible: true
      }]
    },
    complexity: 'beginner',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17',
    author: { name: 'FigmaikR Team' },
    usageCount: 1580
  },
  {
    id: 'card-product',
    name: 'Product Card',
    description: 'E-commerce product card with image and details',
    category: templateCategories[1],
    tags: ['card', 'product', 'ecommerce', 'image'],
    tailwindClasses: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        primaryAxisSizingMode: 'AUTO',
        counterAxisSizingMode: 'FIXED',
        width: 280,
        height: 380
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 12
      },
      effects: [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0 },
        offset: { x: 0, y: 4 },
        radius: 16,
        spread: 0,
        visible: true
      }]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    author: { name: 'FigmaikR Team' },
    usageCount: 950,
    featured: true
  },

  // Essential Forms
  {
    id: 'input-text',
    name: 'Text Input',
    description: 'Standard text input field with focus states',
    category: templateCategories[2],
    tags: ['input', 'form', 'text', 'focus'],
    tailwindClasses: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    figmaStyles: {
      layout: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        width: 300,
        height: 40
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 6,
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.8, g: 0.8, b: 0.8 },
          opacity: 1
        }]
      }
    },
    complexity: 'beginner',
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19',
    author: { name: 'FigmaikR Team' },
    usageCount: 2200
  },

  // Essential Navigation
  {
    id: 'navbar-simple',
    name: 'Simple Navbar',
    description: 'Clean navigation bar with logo and menu items',
    category: templateCategories[3],
    tags: ['navbar', 'navigation', 'header', 'menu'],
    tailwindClasses: 'bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        primaryAxisSizingMode: 'FIXED',
        counterAxisSizingMode: 'FIXED',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        paddingBottom: 16,
        width: 1200,
        height: 64,
        itemSpacing: 32
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.9, g: 0.9, b: 0.9 },
          opacity: 1
        }]
      },
      effects: [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0 },
        offset: { x: 0, y: 1 },
        radius: 3,
        spread: 0,
        visible: true
      }]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    author: { name: 'FigmaikR Team' },
    usageCount: 1100
  },

  // Essential Layout
  {
    id: 'grid-3col',
    name: '3-Column Grid',
    description: 'Responsive 3-column grid layout',
    category: templateCategories[4],
    tags: ['grid', 'layout', 'responsive', 'columns'],
    tailwindClasses: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        primaryAxisSizingMode: 'FIXED',
        counterAxisSizingMode: 'AUTO',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        width: 1200,
        itemSpacing: 24
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-01-21',
    updatedAt: '2024-01-21',
    author: { name: 'FigmaikR Team' },
    usageCount: 780
  },

  // Essential Feedback
  {
    id: 'alert-success',
    name: 'Success Alert',
    description: 'Success notification with icon and message',
    category: templateCategories[5],
    tags: ['alert', 'success', 'notification', 'feedback'],
    tailwindClasses: 'bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center space-x-2',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        primaryAxisSizingMode: 'AUTO',
        counterAxisSizingMode: 'FIXED',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        height: 48,
        itemSpacing: 8
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.94, g: 0.98, b: 0.94 },
          opacity: 1
        }],
        cornerRadius: 6,
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.73, g: 0.9, b: 0.73 },
          opacity: 1
        }]
      }
    },
    complexity: 'beginner',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
    author: { name: 'FigmaikR Team' },
    usageCount: 1350
  }
];

// Utility functions
export const getTemplatesByCategory = (categoryId: string): Template[] => {
  return coreTemplates.filter(template => template.category.id === categoryId);
};

export const getFeaturedTemplates = (): Template[] => {
  return coreTemplates.filter(template => template.featured);
};

export const searchTemplates = (query: string): Template[] => {
  const lowercaseQuery = query.toLowerCase();
  return coreTemplates.filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}; 
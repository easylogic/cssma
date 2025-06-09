import { Template, TemplateCategory, TemplateCollection } from '@/types/template';

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

// Sample Templates
export const sampleTemplates: Template[] = [
  // Buttons
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

  // Cards
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

  // Forms
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

  // Navigation
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

  // Layout
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

  // Feedback
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
  },

  // More Buttons
  {
    id: 'btn-icon',
    name: 'Icon Button',
    description: 'Button with icon and text',
    category: templateCategories[0],
    tags: ['button', 'icon', 'text', 'interactive'],
    tailwindClasses: 'bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors duration-200',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        width: 140,
        height: 40,
        itemSpacing: 8
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.11, g: 0.11, b: 0.11 },
          opacity: 1
        }],
        cornerRadius: 8
      }
    },
    complexity: 'beginner',
    createdAt: '2024-01-23',
    updatedAt: '2024-01-23',
    author: { name: 'FigmaikR Team' },
    usageCount: 720
  },
  {
    id: 'btn-floating',
    name: 'Floating Action Button',
    description: 'Circular floating action button with shadow',
    category: templateCategories[0],
    tags: ['button', 'floating', 'fab', 'circular'],
    tailwindClasses: 'bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300',
    figmaStyles: {
      layout: {
        width: 56,
        height: 56
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.15, g: 0.47, b: 0.85 },
          opacity: 1
        }],
        cornerRadius: 28
      },
      effects: [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0 },
        offset: { x: 0, y: 4 },
        radius: 12,
        spread: 0,
        visible: true
      }]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-24',
    updatedAt: '2024-01-24',
    author: { name: 'FigmaikR Team' },
    usageCount: 890
  },

  // More Cards
  {
    id: 'card-profile',
    name: 'Profile Card',
    description: 'User profile card with avatar and details',
    category: templateCategories[1],
    tags: ['card', 'profile', 'user', 'avatar'],
    tailwindClasses: 'bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        width: 280,
        height: 320,
        itemSpacing: 16
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 12,
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.95, g: 0.95, b: 0.95 },
          opacity: 1
        }]
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
    author: { name: 'FigmaikR Team' },
    usageCount: 1200,
    featured: true
  },
  {
    id: 'card-pricing',
    name: 'Pricing Card',
    description: 'Pricing plan card with features list',
    category: templateCategories[1],
    tags: ['card', 'pricing', 'plan', 'features'],
    tailwindClasses: 'bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-blue-500 transition-all duration-300',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 32,
        paddingBottom: 32,
        width: 320,
        height: 480,
        itemSpacing: 20
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 16,
        strokeWeight: 2,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.9, g: 0.9, b: 0.9 },
          opacity: 1
        }]
      }
    },
    complexity: 'advanced',
    createdAt: '2024-01-26',
    updatedAt: '2024-01-26',
    author: { name: 'FigmaikR Team' },
    usageCount: 1850,
    featured: true
  },

  // Modals & Overlays
  {
    id: 'modal-simple',
    name: 'Simple Modal',
    description: 'Basic modal dialog with backdrop',
    category: templateCategories[6],
    tags: ['modal', 'dialog', 'overlay', 'popup'],
    tailwindClasses: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    figmaStyles: {
      layout: {
        width: 400,
        height: 300,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24
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
        offset: { x: 0, y: 8 },
        radius: 24,
        spread: 0,
        visible: true
      }]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-27',
    updatedAt: '2024-01-27',
    author: { name: 'FigmaikR Team' },
    usageCount: 980
  },
  {
    id: 'modal-confirmation',
    name: 'Confirmation Modal',
    description: 'Modal for confirming destructive actions',
    category: templateCategories[6],
    tags: ['modal', 'confirmation', 'delete', 'warning'],
    tailwindClasses: 'bg-white rounded-lg shadow-2xl p-6 max-w-md mx-auto',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 400,
        height: 200,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 16
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 8
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28',
    author: { name: 'FigmaikR Team' },
    usageCount: 650
  },

  // Tables & Data
  {
    id: 'table-simple',
    name: 'Simple Data Table',
    description: 'Clean data table with alternating rows',
    category: templateCategories[7],
    tags: ['table', 'data', 'rows', 'columns'],
    tailwindClasses: 'w-full bg-white shadow-sm rounded-lg overflow-hidden',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 800,
        height: 400
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 8
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-01-29',
    updatedAt: '2024-01-29',
    author: { name: 'FigmaikR Team' },
    usageCount: 1100
  },
  {
    id: 'table-sortable',
    name: 'Sortable Table',
    description: 'Data table with sortable columns and pagination',
    category: templateCategories[7],
    tags: ['table', 'sortable', 'pagination', 'interactive'],
    tailwindClasses: 'w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 900,
        height: 500
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
      }
    },
    complexity: 'advanced',
    createdAt: '2024-01-30',
    updatedAt: '2024-01-30',
    author: { name: 'FigmaikR Team' },
    usageCount: 750,
    featured: true
  },

  // Media & Images
  {
    id: 'gallery-grid',
    name: 'Image Gallery Grid',
    description: 'Responsive image gallery with hover effects',
    category: templateCategories[8],
    tags: ['gallery', 'images', 'grid', 'responsive'],
    tailwindClasses: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        width: 800,
        height: 600,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        itemSpacing: 16
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    author: { name: 'FigmaikR Team' },
    usageCount: 920
  },
  {
    id: 'video-player',
    name: 'Video Player',
    description: 'Custom video player with controls',
    category: templateCategories[8],
    tags: ['video', 'player', 'controls', 'media'],
    tailwindClasses: 'relative bg-black rounded-lg overflow-hidden shadow-2xl',
    figmaStyles: {
      layout: {
        width: 640,
        height: 360
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          opacity: 1
        }],
        cornerRadius: 8
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-02',
    updatedAt: '2024-02-02',
    author: { name: 'FigmaikR Team' },
    usageCount: 580
  },

  // E-commerce
  {
    id: 'product-grid',
    name: 'Product Grid',
    description: 'E-commerce product grid with filters',
    category: templateCategories[9],
    tags: ['ecommerce', 'products', 'grid', 'shopping'],
    tailwindClasses: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        width: 1200,
        height: 800,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 24
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-03',
    updatedAt: '2024-02-03',
    author: { name: 'FigmaikR Team' },
    usageCount: 1400,
    featured: true
  },
  {
    id: 'shopping-cart',
    name: 'Shopping Cart',
    description: 'Shopping cart with item management',
    category: templateCategories[9],
    tags: ['cart', 'shopping', 'checkout', 'ecommerce'],
    tailwindClasses: 'bg-white rounded-lg shadow-lg p-6 border border-gray-200',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 400,
        height: 500,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 16
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
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-04',
    updatedAt: '2024-02-04',
    author: { name: 'FigmaikR Team' },
    usageCount: 890
  },

  // Dashboard
  {
    id: 'dashboard-card',
    name: 'Dashboard Metric Card',
    description: 'KPI card with trend indicator',
    category: templateCategories[10],
    tags: ['dashboard', 'metrics', 'kpi', 'analytics'],
    tailwindClasses: 'bg-white rounded-xl shadow-sm p-6 border border-gray-100',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 280,
        height: 160,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 12
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 12,
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.95, g: 0.95, b: 0.95 },
          opacity: 1
        }]
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05',
    author: { name: 'FigmaikR Team' },
    usageCount: 1250
  },
  {
    id: 'chart-card',
    name: 'Chart Card',
    description: 'Dashboard card with embedded chart',
    category: templateCategories[10],
    tags: ['dashboard', 'chart', 'analytics', 'visualization'],
    tailwindClasses: 'bg-white rounded-xl shadow-lg p-6 border border-gray-200',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 400,
        height: 300,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 16
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 12,
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.9, g: 0.9, b: 0.9 },
          opacity: 1
        }]
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-06',
    updatedAt: '2024-02-06',
    author: { name: 'FigmaikR Team' },
    usageCount: 680,
    featured: true
  },

  // Social & Community
  {
    id: 'comment-thread',
    name: 'Comment Thread',
    description: 'Nested comment system with replies',
    category: templateCategories[11],
    tags: ['comments', 'social', 'thread', 'discussion'],
    tailwindClasses: 'bg-white rounded-lg p-4 border border-gray-200 space-y-4',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 600,
        height: 400,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        itemSpacing: 16
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
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-07',
    updatedAt: '2024-02-07',
    author: { name: 'FigmaikR Team' },
    usageCount: 540
  },
  {
    id: 'user-avatar',
    name: 'User Avatar',
    description: 'User avatar with status indicator',
    category: templateCategories[11],
    tags: ['avatar', 'user', 'profile', 'status'],
    tailwindClasses: 'relative inline-block',
    figmaStyles: {
      layout: {
        width: 48,
        height: 48
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.9, g: 0.9, b: 0.9 },
          opacity: 1
        }],
        cornerRadius: 24
      }
    },
    complexity: 'beginner',
    createdAt: '2024-02-08',
    updatedAt: '2024-02-08',
    author: { name: 'FigmaikR Team' },
    usageCount: 1800
  },

  // Loading & Progress
  {
    id: 'spinner-dots',
    name: 'Dot Spinner',
    description: 'Animated loading spinner with dots',
    category: templateCategories[16],
    tags: ['loading', 'spinner', 'animation', 'dots'],
    tailwindClasses: 'flex space-x-1 justify-center items-center',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        width: 60,
        height: 20,
        itemSpacing: 4
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-09',
    updatedAt: '2024-02-09',
    author: { name: 'FigmaikR Team' },
    usageCount: 920
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    description: 'Animated progress bar with percentage',
    category: templateCategories[16],
    tags: ['progress', 'bar', 'percentage', 'loading'],
    tailwindClasses: 'w-full bg-gray-200 rounded-full h-2.5',
    figmaStyles: {
      layout: {
        width: 300,
        height: 10
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.9, g: 0.9, b: 0.9 },
          opacity: 1
        }],
        cornerRadius: 5
      }
    },
    complexity: 'beginner',
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10',
    author: { name: 'FigmaikR Team' },
    usageCount: 1350
  },

  // Badges & Labels
  {
    id: 'status-badge',
    name: 'Status Badge',
    description: 'Colored status badge with text',
    category: templateCategories[17],
    tags: ['badge', 'status', 'label', 'indicator'],
    tailwindClasses: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
    figmaStyles: {
      layout: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        height: 20
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.86, g: 0.98, b: 0.86 },
          opacity: 1
        }],
        cornerRadius: 10
      }
    },
    complexity: 'beginner',
    createdAt: '2024-02-11',
    updatedAt: '2024-02-11',
    author: { name: 'FigmaikR Team' },
    usageCount: 1650
  },
  {
    id: 'notification-badge',
    name: 'Notification Badge',
    description: 'Small notification count badge',
    category: templateCategories[17],
    tags: ['badge', 'notification', 'count', 'indicator'],
    tailwindClasses: 'absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center',
    figmaStyles: {
      layout: {
        width: 20,
        height: 20
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.94, g: 0.26, b: 0.26 },
          opacity: 1
        }],
        cornerRadius: 10
      }
    },
    complexity: 'beginner',
    createdAt: '2024-02-12',
    updatedAt: '2024-02-12',
    author: { name: 'FigmaikR Team' },
    usageCount: 980
  },

  // More Forms
  {
    id: 'form-contact',
    name: 'Contact Form',
    description: 'Complete contact form with validation',
    category: templateCategories[2],
    tags: ['form', 'contact', 'validation', 'submit'],
    tailwindClasses: 'bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 400,
        height: 500,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 32,
        paddingBottom: 32,
        itemSpacing: 20
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 8
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-13',
    updatedAt: '2024-02-13',
    author: { name: 'FigmaikR Team' },
    usageCount: 1450,
    featured: true
  },
  {
    id: 'form-search',
    name: 'Search Form',
    description: 'Search input with autocomplete suggestions',
    category: templateCategories[2],
    tags: ['form', 'search', 'autocomplete', 'suggestions'],
    tailwindClasses: 'relative w-full max-w-md mx-auto',
    figmaStyles: {
      layout: {
        width: 400,
        height: 48
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 24,
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.8, g: 0.8, b: 0.8 },
          opacity: 1
        }]
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-14',
    updatedAt: '2024-02-14',
    author: { name: 'FigmaikR Team' },
    usageCount: 1120
  },

  // More Navigation
  {
    id: 'sidebar-nav',
    name: 'Sidebar Navigation',
    description: 'Collapsible sidebar with menu items',
    category: templateCategories[3],
    tags: ['sidebar', 'navigation', 'menu', 'collapsible'],
    tailwindClasses: 'bg-gray-900 text-white w-64 min-h-screen p-4',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 256,
        height: 800,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        itemSpacing: 8
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.11, g: 0.11, b: 0.11 },
          opacity: 1
        }]
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
    author: { name: 'FigmaikR Team' },
    usageCount: 890
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb Navigation',
    description: 'Hierarchical breadcrumb navigation',
    category: templateCategories[3],
    tags: ['breadcrumb', 'navigation', 'hierarchy', 'path'],
    tailwindClasses: 'flex items-center space-x-2 text-sm text-gray-600',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        height: 24,
        itemSpacing: 8
      }
    },
    complexity: 'beginner',
    createdAt: '2024-02-16',
    updatedAt: '2024-02-16',
    author: { name: 'FigmaikR Team' },
    usageCount: 1340
  },

  // Pricing & Plans
  {
    id: 'pricing-table',
    name: 'Pricing Table',
    description: 'Complete pricing table with multiple plans',
    category: templateCategories[12],
    tags: ['pricing', 'table', 'plans', 'comparison'],
    tailwindClasses: 'grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-8',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        width: 1200,
        height: 600,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 32,
        paddingBottom: 32,
        itemSpacing: 32
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-17',
    updatedAt: '2024-02-17',
    author: { name: 'FigmaikR Team' },
    usageCount: 1680,
    featured: true
  },
  {
    id: 'subscription-card',
    name: 'Subscription Card',
    description: 'Individual subscription plan card',
    category: templateCategories[12],
    tags: ['subscription', 'plan', 'card', 'billing'],
    tailwindClasses: 'bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 300,
        height: 400,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 16
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 12,
        strokeWeight: 2,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.9, g: 0.9, b: 0.9 },
          opacity: 1
        }]
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-18',
    updatedAt: '2024-02-18',
    author: { name: 'FigmaikR Team' },
    usageCount: 920
  },

  // Testimonials
  {
    id: 'testimonial-card',
    name: 'Testimonial Card',
    description: 'Customer testimonial with photo and quote',
    category: templateCategories[13],
    tags: ['testimonial', 'review', 'customer', 'quote'],
    tailwindClasses: 'bg-white rounded-lg shadow-md p-6 border border-gray-200',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 350,
        height: 250,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 16
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
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-19',
    updatedAt: '2024-02-19',
    author: { name: 'FigmaikR Team' },
    usageCount: 1250
  },
  {
    id: 'testimonial-carousel',
    name: 'Testimonial Carousel',
    description: 'Rotating testimonials with navigation',
    category: templateCategories[13],
    tags: ['testimonial', 'carousel', 'slider', 'navigation'],
    tailwindClasses: 'relative bg-gray-50 rounded-xl p-8 overflow-hidden',
    figmaStyles: {
      layout: {
        width: 800,
        height: 400,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 32,
        paddingBottom: 32
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.98, g: 0.98, b: 0.98 },
          opacity: 1
        }],
        cornerRadius: 12
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
    author: { name: 'FigmaikR Team' },
    usageCount: 780,
    featured: true
  },

  // Hero Sections
  {
    id: 'hero-simple',
    name: 'Simple Hero',
    description: 'Clean hero section with title and CTA',
    category: templateCategories[14],
    tags: ['hero', 'landing', 'cta', 'simple'],
    tailwindClasses: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 text-center',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 1200,
        height: 500,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 80,
        paddingBottom: 80,
        itemSpacing: 24
      },
      appearance: {
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            { position: 0, color: { r: 0.15, g: 0.47, b: 0.85 } },
            { position: 1, color: { r: 0.67, g: 0.31, b: 0.86 } }
          ]
        }]
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-21',
    updatedAt: '2024-02-21',
    author: { name: 'FigmaikR Team' },
    usageCount: 1890,
    featured: true
  },
  {
    id: 'hero-video',
    name: 'Video Hero',
    description: 'Hero section with background video',
    category: templateCategories[14],
    tags: ['hero', 'video', 'background', 'media'],
    tailwindClasses: 'relative h-screen flex items-center justify-center overflow-hidden',
    figmaStyles: {
      layout: {
        width: 1200,
        height: 600
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          opacity: 0.5
        }]
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-22',
    updatedAt: '2024-02-22',
    author: { name: 'FigmaikR Team' },
    usageCount: 650
  },

  // Footers
  {
    id: 'footer-simple',
    name: 'Simple Footer',
    description: 'Clean footer with links and copyright',
    category: templateCategories[15],
    tags: ['footer', 'links', 'copyright', 'simple'],
    tailwindClasses: 'bg-gray-900 text-white py-8 px-4',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 1200,
        height: 200,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 32,
        paddingBottom: 32,
        itemSpacing: 24
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.11, g: 0.11, b: 0.11 },
          opacity: 1
        }]
      }
    },
    complexity: 'beginner',
    createdAt: '2024-02-23',
    updatedAt: '2024-02-23',
    author: { name: 'FigmaikR Team' },
    usageCount: 1560
  },
  {
    id: 'footer-complex',
    name: 'Complex Footer',
    description: 'Multi-column footer with social links',
    category: templateCategories[15],
    tags: ['footer', 'columns', 'social', 'newsletter'],
    tailwindClasses: 'bg-gray-800 text-white py-12 px-4',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 1200,
        height: 400,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 48,
        paddingBottom: 48,
        itemSpacing: 32
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 0.16, g: 0.16, b: 0.16 },
          opacity: 1
        }]
      }
    },
    complexity: 'advanced',
    createdAt: '2024-02-24',
    updatedAt: '2024-02-24',
    author: { name: 'FigmaikR Team' },
    usageCount: 890
  },

  // Timeline & Steps
  {
    id: 'timeline-vertical',
    name: 'Vertical Timeline',
    description: 'Vertical timeline with events',
    category: templateCategories[18],
    tags: ['timeline', 'vertical', 'events', 'history'],
    tailwindClasses: 'relative pl-8 space-y-8',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 600,
        height: 800,
        paddingLeft: 32,
        itemSpacing: 32
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-25',
    updatedAt: '2024-02-25',
    author: { name: 'FigmaikR Team' },
    usageCount: 720
  },
  {
    id: 'stepper',
    name: 'Step Progress',
    description: 'Multi-step progress indicator',
    category: templateCategories[18],
    tags: ['stepper', 'progress', 'steps', 'wizard'],
    tailwindClasses: 'flex items-center justify-between w-full max-w-2xl mx-auto',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        width: 600,
        height: 80,
        itemSpacing: 40
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-26',
    updatedAt: '2024-02-26',
    author: { name: 'FigmaikR Team' },
    usageCount: 1180
  },

  // Statistics
  {
    id: 'stats-grid',
    name: 'Statistics Grid',
    description: 'Grid of key statistics and metrics',
    category: templateCategories[19],
    tags: ['statistics', 'metrics', 'grid', 'numbers'],
    tailwindClasses: 'grid grid-cols-2 md:grid-cols-4 gap-6 p-6',
    figmaStyles: {
      layout: {
        layoutMode: 'HORIZONTAL',
        width: 800,
        height: 200,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 24
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-27',
    updatedAt: '2024-02-27',
    author: { name: 'FigmaikR Team' },
    usageCount: 1420
  },
  {
    id: 'counter-animated',
    name: 'Animated Counter',
    description: 'Animated number counter with icon',
    category: templateCategories[19],
    tags: ['counter', 'animated', 'numbers', 'statistics'],
    tailwindClasses: 'text-center p-6 bg-white rounded-lg shadow-sm',
    figmaStyles: {
      layout: {
        layoutMode: 'VERTICAL',
        width: 200,
        height: 150,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        itemSpacing: 12
      },
      appearance: {
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 },
          opacity: 1
        }],
        cornerRadius: 8
      }
    },
    complexity: 'intermediate',
    createdAt: '2024-02-28',
    updatedAt: '2024-02-28',
    author: { name: 'FigmaikR Team' },
    usageCount: 890,
    featured: true
  }
];

// Template Collection
export const templateCollection: TemplateCollection = {
  templates: sampleTemplates,
  categories: templateCategories,
  totalCount: sampleTemplates.length,
  featuredTemplates: sampleTemplates.filter(template => template.featured)
};

// Utility functions
export const getTemplatesByCategory = (categoryId: string): Template[] => {
  return sampleTemplates.filter(template => template.category.id === categoryId);
};

export const getFeaturedTemplates = (): Template[] => {
  return sampleTemplates.filter(template => template.featured);
};

export const searchTemplates = (query: string): Template[] => {
  const lowercaseQuery = query.toLowerCase();
  return sampleTemplates.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}; 
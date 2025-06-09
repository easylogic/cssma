import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const cardsCategory = getCategoryById('cards')!;

export const cardTemplates: Template[] = [
  {
    id: 'card-basic',
    name: 'Basic Card',
    description: 'Simple card with title and description',
    category: cardsCategory,
    tags: ['card', 'basic', 'content', 'simple'],
    nodeData: {
      type: 'FRAME',
      name: 'Basic Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[320px] h-auto',
      children: [
        {
          type: 'TEXT',
          name: 'Card Title',
          styles: 'text-xl font-semibold text-gray-900',
          text: 'Card Title'
        },
        {
          type: 'TEXT',
          name: 'Card Description',
          styles: 'text-base text-gray-600 leading-relaxed',
          text: 'This is a description of the card content. It provides helpful information to the user.'
        }
      ]
    },
    complexity: 'beginner',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    author: { name: 'FigmaikR Team' },
    usageCount: 3200,
    featured: true
  },
  {
    id: 'card-product',
    name: 'Product Card',
    description: 'Card for displaying product information',
    category: cardsCategory,
    tags: ['card', 'product', 'ecommerce', 'price'],
    nodeData: {
      type: 'FRAME',
      name: 'Product Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-[280px] h-auto',
      children: [
        {
          type: 'RECTANGLE',
          name: 'Product Image',
          styles: 'w-full h-[200px] bg-gray-200'
        },
        {
          type: 'FRAME',
          name: 'Card Content',
          styles: 'flex flex-col p-4 gap-3',
          children: [
            {
              type: 'TEXT',
              name: 'Product Name',
              styles: 'text-lg font-semibold text-gray-900',
              text: 'Product Name'
            },
            {
              type: 'TEXT',
              name: 'Product Description',
              styles: 'text-sm text-gray-600',
              text: 'Brief product description goes here'
            },
            {
              type: 'FRAME',
              name: 'Price Row',
              styles: 'flex flex-row justify-between items-center',
              children: [
                {
                  type: 'TEXT',
                  name: 'Price',
                  styles: 'text-xl font-bold text-gray-900',
                  text: '$99.99'
                },
                {
                  type: 'FRAME',
                  name: 'Add to Cart Button',
                  styles: 'flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Button Text',
                      styles: 'text-sm font-medium text-white',
                      text: 'Add to Cart'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-11',
    updatedAt: '2024-01-11',
    author: { name: 'FigmaikR Team' },
    usageCount: 2100,
    featured: true
  },
  {
    id: 'card-profile',
    name: 'Profile Card',
    description: 'User profile card with avatar and details',
    category: cardsCategory,
    tags: ['card', 'profile', 'user', 'avatar'],
    nodeData: {
      type: 'FRAME',
      name: 'Profile Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[300px] h-auto items-center text-center',
      children: [
        {
          type: 'ELLIPSE',
          name: 'Avatar',
          styles: 'w-[80px] h-[80px] bg-gray-300'
        },
        {
          type: 'FRAME',
          name: 'Profile Info',
          styles: 'flex flex-col gap-2 items-center',
          children: [
            {
              type: 'TEXT',
              name: 'User Name',
              styles: 'text-xl font-semibold text-gray-900',
              text: 'John Doe'
            },
            {
              type: 'TEXT',
              name: 'User Title',
              styles: 'text-sm text-gray-600',
              text: 'Senior Designer'
            },
            {
              type: 'TEXT',
              name: 'User Bio',
              styles: 'text-sm text-gray-500 text-center leading-relaxed',
              text: 'Passionate about creating beautiful and functional user experiences.'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Action Buttons',
          styles: 'flex flex-row gap-3 w-full',
          children: [
            {
              type: 'FRAME',
              name: 'Follow Button',
              styles: 'flex items-center justify-center flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md',
              children: [
                {
                  type: 'TEXT',
                  name: 'Follow Text',
                  styles: 'text-sm font-medium text-white',
                  text: 'Follow'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Message Button',
              styles: 'flex items-center justify-center flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md',
              children: [
                {
                  type: 'TEXT',
                  name: 'Message Text',
                  styles: 'text-sm font-medium text-gray-700',
                  text: 'Message'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    author: { name: 'FigmaikR Team' },
    usageCount: 1800
  },
  {
    id: 'card-feature',
    name: 'Feature Card',
    description: 'Card highlighting a feature with icon',
    category: cardsCategory,
    tags: ['card', 'feature', 'icon', 'highlight'],
    nodeData: {
      type: 'FRAME',
      name: 'Feature Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[280px] h-auto hover:shadow-md transition-shadow duration-200',
      children: [
        {
          type: 'FRAME',
          name: 'Icon Container',
          styles: 'flex items-center justify-center w-[48px] h-[48px] bg-blue-100 rounded-lg',
          children: [
            {
              type: 'TEXT',
              name: 'Feature Icon',
              styles: 'text-xl text-blue-600',
              text: '⚡'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Feature Content',
          styles: 'flex flex-col gap-2',
          children: [
            {
              type: 'TEXT',
              name: 'Feature Title',
              styles: 'text-lg font-semibold text-gray-900',
              text: 'Fast Performance'
            },
            {
              type: 'TEXT',
              name: 'Feature Description',
              styles: 'text-sm text-gray-600 leading-relaxed',
              text: 'Lightning fast performance with optimized code and efficient algorithms.'
            }
          ]
        }
      ]
    },
    complexity: 'beginner',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13',
    author: { name: 'FigmaikR Team' },
    usageCount: 2500
  },
  {
    id: 'card-stats',
    name: 'Stats Card',
    description: 'Card for displaying statistics',
    category: cardsCategory,
    tags: ['card', 'stats', 'metrics', 'dashboard'],
    nodeData: {
      type: 'FRAME',
      name: 'Stats Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[240px] h-auto',
      children: [
        {
          type: 'FRAME',
          name: 'Header',
          styles: 'flex flex-row justify-between items-start',
          children: [
            {
              type: 'FRAME',
              name: 'Stats Info',
              styles: 'flex flex-col gap-1',
              children: [
                {
                  type: 'TEXT',
                  name: 'Stats Label',
                  styles: 'text-sm font-medium text-gray-600',
                  text: 'Total Sales'
                },
                {
                  type: 'TEXT',
                  name: 'Stats Value',
                  styles: 'text-2xl font-bold text-gray-900',
                  text: '$24,500'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Trend Badge',
              styles: 'flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Trend Icon',
                  styles: 'text-xs text-green-600',
                  text: '↗'
                },
                {
                  type: 'TEXT',
                  name: 'Trend Value',
                  styles: 'text-xs font-medium text-green-600',
                  text: '+12%'
                }
              ]
            }
          ]
        },
        {
          type: 'TEXT',
          name: 'Period Info',
          styles: 'text-xs text-gray-500',
          text: 'vs last month'
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    author: { name: 'FigmaikR Team' },
    usageCount: 1650
  },
  {
    id: 'card-pricing',
    name: 'Pricing Card',
    description: 'Pricing plan card with features list',
    category: cardsCategory,
    tags: ['card', 'pricing', 'plan', 'features'],
    nodeData: {
      type: 'FRAME',
      name: 'Pricing Card',
      styles: 'flex flex-col bg-white border-2 border-gray-200 hover:border-blue-500 rounded-2xl shadow-xl p-8 gap-5 w-[320px] h-auto transition-all duration-300',
      children: [
        {
          type: 'FRAME',
          name: 'Plan Header',
          styles: 'flex flex-col gap-2 text-center',
          children: [
            {
              type: 'TEXT',
              name: 'Plan Name',
              styles: 'text-2xl font-bold text-gray-900',
              text: 'Pro Plan'
            },
            {
              type: 'TEXT',
              name: 'Plan Description',
              styles: 'text-sm text-gray-600',
              text: 'Perfect for growing teams'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Price Section',
          styles: 'flex flex-col gap-1 text-center',
          children: [
            {
              type: 'FRAME',
              name: 'Price Row',
              styles: 'flex flex-row items-baseline justify-center gap-1',
              children: [
                {
                  type: 'TEXT',
                  name: 'Currency',
                  styles: 'text-lg font-semibold text-gray-900',
                  text: '$'
                },
                {
                  type: 'TEXT',
                  name: 'Price',
                  styles: 'text-4xl font-bold text-gray-900',
                  text: '29'
                },
                {
                  type: 'TEXT',
                  name: 'Period',
                  styles: 'text-sm text-gray-600',
                  text: '/month'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Features List',
          styles: 'flex flex-col gap-3',
          children: [
            {
              type: 'FRAME',
              name: 'Feature 1',
              styles: 'flex flex-row items-center gap-2',
              children: [
                {
                  type: 'TEXT',
                  name: 'Check Icon',
                  styles: 'text-green-500',
                  text: '✓'
                },
                {
                  type: 'TEXT',
                  name: 'Feature Text',
                  styles: 'text-sm text-gray-700',
                  text: 'Unlimited projects'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Feature 2',
              styles: 'flex flex-row items-center gap-2',
              children: [
                {
                  type: 'TEXT',
                  name: 'Check Icon',
                  styles: 'text-green-500',
                  text: '✓'
                },
                {
                  type: 'TEXT',
                  name: 'Feature Text',
                  styles: 'text-sm text-gray-700',
                  text: 'Priority support'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Feature 3',
              styles: 'flex flex-row items-center gap-2',
              children: [
                {
                  type: 'TEXT',
                  name: 'Check Icon',
                  styles: 'text-green-500',
                  text: '✓'
                },
                {
                  type: 'TEXT',
                  name: 'Feature Text',
                  styles: 'text-sm text-gray-700',
                  text: 'Advanced analytics'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'CTA Button',
          styles: 'flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg w-full',
          children: [
            {
              type: 'TEXT',
              name: 'Button Text',
              styles: 'text-base font-semibold text-white',
              text: 'Choose Plan'
            }
          ]
        }
      ]
    },
    complexity: 'advanced',
    createdAt: '2024-01-26',
    updatedAt: '2024-01-26',
    author: { name: 'FigmaikR Team' },
    usageCount: 1850,
    featured: true
  },
  {
    id: 'card-blog',
    name: 'Blog Card',
    description: 'Blog post card with image and excerpt',
    category: cardsCategory,
    tags: ['card', 'blog', 'post', 'article'],
    nodeData: {
      type: 'FRAME',
      name: 'Blog Card',
      styles: 'flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow w-[350px] h-auto',
      children: [
        {
          type: 'RECTANGLE',
          name: 'Blog Image',
          styles: 'w-full h-[200px] bg-gray-300'
        },
        {
          type: 'FRAME',
          name: 'Blog Content',
          styles: 'flex flex-col p-5 gap-3',
          children: [
            {
              type: 'FRAME',
              name: 'Blog Meta',
              styles: 'flex flex-row items-center gap-2',
              children: [
                {
                  type: 'TEXT',
                  name: 'Category',
                  styles: 'text-xs font-medium text-blue-600 bg-blue-100 px-2 py-[2px] rounded-full',
                  text: 'Design'
                },
                {
                  type: 'TEXT',
                  name: 'Date',
                  styles: 'text-xs text-gray-500',
                  text: 'Jan 15, 2024'
                }
              ]
            },
            {
              type: 'TEXT',
              name: 'Blog Title',
              styles: 'text-lg font-semibold text-gray-900 leading-tight',
              text: 'Building Better User Interfaces'
            },
            {
              type: 'TEXT',
              name: 'Blog Excerpt',
              styles: 'text-sm text-gray-600 leading-relaxed',
              text: 'Learn the fundamentals of creating intuitive and engaging user interfaces that delight your users.'
            },
            {
              type: 'FRAME',
              name: 'Read More',
              styles: 'flex items-center gap-1',
              children: [
                {
                  type: 'TEXT',
                  name: 'Read More Text',
                  styles: 'text-sm font-medium text-blue-600 hover:text-blue-800',
                  text: 'Read more'
                },
                {
                  type: 'TEXT',
                  name: 'Arrow',
                  styles: 'text-sm text-blue-600',
                  text: '→'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-29',
    updatedAt: '2024-01-29',
    author: { name: 'FigmaikR Team' },
    usageCount: 1150
  },
  {
    id: 'card-team',
    name: 'Team Member Card',
    description: 'Team member card with photo and social links',
    category: cardsCategory,
    tags: ['card', 'team', 'member', 'social'],
    nodeData: {
      type: 'FRAME',
      name: 'Team Card',
      styles: 'flex flex-col bg-white border border-gray-100 rounded-xl shadow-lg p-6 gap-4 w-[280px] h-auto text-center items-center',
      children: [
        {
          type: 'ELLIPSE',
          name: 'Team Photo',
          styles: 'w-[100px] h-[100px] bg-gray-300'
        },
        {
          type: 'FRAME',
          name: 'Team Info',
          styles: 'flex flex-col gap-2 items-center',
          children: [
            {
              type: 'TEXT',
              name: 'Member Name',
              styles: 'text-xl font-semibold text-gray-900',
              text: 'Sarah Johnson'
            },
            {
              type: 'TEXT',
              name: 'Member Role',
              styles: 'text-sm font-medium text-blue-600',
              text: 'Lead Designer'
            },
            {
              type: 'TEXT',
              name: 'Member Bio',
              styles: 'text-sm text-gray-600 text-center leading-relaxed',
              text: 'Passionate about creating beautiful and functional designs that solve real problems.'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Social Links',
          styles: 'flex flex-row gap-3 items-center',
          children: [
            {
              type: 'FRAME',
              name: 'LinkedIn',
              styles: 'flex items-center justify-center w-[32px] h-[32px] bg-blue-100 hover:bg-blue-200 rounded-full cursor-pointer',
              children: [
                {
                  type: 'TEXT',
                  name: 'LinkedIn Icon',
                  styles: 'text-sm text-blue-600',
                  text: 'in'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Twitter',
              styles: 'flex items-center justify-center w-[32px] h-[32px] bg-sky-100 hover:bg-sky-200 rounded-full cursor-pointer',
              children: [
                {
                  type: 'TEXT',
                  name: 'Twitter Icon',
                  styles: 'text-sm text-sky-600',
                  text: 'tw'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Email',
              styles: 'flex items-center justify-center w-[32px] h-[32px] bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer',
              children: [
                {
                  type: 'TEXT',
                  name: 'Email Icon',
                  styles: 'text-sm text-gray-600',
                  text: '@'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-30',
    updatedAt: '2024-01-30',
    author: { name: 'FigmaikR Team' },
    usageCount: 850
  },
  {
    id: 'dashboard-card',
    name: 'Dashboard Metric Card',
    description: 'KPI card with trend indicator',
    category: cardsCategory,
    tags: ['dashboard', 'metrics', 'kpi', 'analytics'],
    nodeData: {
      type: 'FRAME',
      name: 'Dashboard Card',
      styles: 'flex flex-col bg-white border border-gray-100 rounded-xl shadow-sm p-6 gap-3 w-[280px] h-[160px]',
      children: [
        {
          type: 'FRAME',
          name: 'Metric Header',
          styles: 'flex flex-row justify-between items-start',
          children: [
            {
              type: 'TEXT',
              name: 'Metric Label',
              styles: 'text-sm font-medium text-gray-600',
              text: 'Monthly Revenue'
            },
            {
              type: 'FRAME',
              name: 'Trend Indicator',
              styles: 'flex items-center gap-1 px-[6px] py-[2px] bg-green-100 rounded-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Trend Icon',
                  styles: 'text-xs text-green-600',
                  text: '↗'
                },
                {
                  type: 'TEXT',
                  name: 'Trend Percentage',
                  styles: 'text-xs font-medium text-green-600',
                  text: '+8.2%'
                }
              ]
            }
          ]
        },
        {
          type: 'TEXT',
          name: 'Metric Value',
          styles: 'text-3xl font-bold text-gray-900',
          text: '$142,850'
        },
        {
          type: 'TEXT',
          name: 'Metric Comparison',
          styles: 'text-xs text-gray-500',
          text: 'vs $132,100 last month'
        }
      ]
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
    category: cardsCategory,
    tags: ['dashboard', 'chart', 'analytics', 'visualization'],
    nodeData: {
      type: 'FRAME',
      name: 'Chart Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-xl shadow-lg p-6 gap-4 w-[400px] h-[300px]',
      children: [
        {
          type: 'FRAME',
          name: 'Chart Header',
          styles: 'flex flex-row justify-between items-center',
          children: [
            {
              type: 'TEXT',
              name: 'Chart Title',
              styles: 'text-lg font-semibold text-gray-900',
              text: 'Revenue Overview'
            },
            {
              type: 'FRAME',
              name: 'Period Selector',
              styles: 'px-3 py-1 bg-gray-100 rounded-md',
              children: [
                {
                  type: 'TEXT',
                  name: 'Period Text',
                  styles: 'text-sm font-medium text-gray-700',
                  text: 'Last 30 days'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Chart Area',
          styles: 'flex items-center justify-center flex-1 bg-gray-50 rounded-lg',
          children: [
            {
              type: 'TEXT',
              name: 'Chart Placeholder',
              styles: 'text-sm text-gray-500',
              text: '[Chart Visualization]'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Chart Legend',
          styles: 'flex flex-row gap-4 justify-center',
          children: [
            {
              type: 'FRAME',
              name: 'Legend Item 1',
              styles: 'flex items-center gap-[6px]',
              children: [
                {
                  type: 'RECTANGLE',
                  name: 'Legend Color',
                  styles: 'w-[12px] h-[12px] bg-blue-500 rounded'
                },
                {
                  type: 'TEXT',
                  name: 'Legend Label',
                  styles: 'text-xs text-gray-600',
                  text: 'Revenue'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Legend Item 2',
              styles: 'flex items-center gap-[6px]',
              children: [
                {
                  type: 'RECTANGLE',
                  name: 'Legend Color',
                  styles: 'w-[12px] h-[12px] bg-green-500 rounded'
                },
                {
                  type: 'TEXT',
                  name: 'Legend Label',
                  styles: 'text-xs text-gray-600',
                  text: 'Profit'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'advanced',
    createdAt: '2024-02-06',
    updatedAt: '2024-02-06',
    author: { name: 'FigmaikR Team' },
    usageCount: 680,
    featured: true
  },
  {
    id: 'subscription-card',
    name: 'Subscription Card',
    description: 'Individual subscription plan card',
    category: cardsCategory,
    tags: ['subscription', 'plan', 'card', 'billing'],
    nodeData: {
      type: 'FRAME',
      name: 'Subscription Card',
      styles: 'flex flex-col bg-white border-2 border-gray-200 hover:border-blue-500 rounded-xl shadow-lg p-6 gap-4 w-[300px] h-auto transition-colors',
      children: [
        {
          type: 'FRAME',
          name: 'Subscription Header',
          styles: 'flex flex-row justify-between items-start',
          children: [
            {
              type: 'FRAME',
              name: 'Plan Info',
              styles: 'flex flex-col gap-1',
              children: [
                {
                  type: 'TEXT',
                  name: 'Plan Name',
                  styles: 'text-lg font-semibold text-gray-900',
                  text: 'Premium Plan'
                },
                {
                  type: 'TEXT',
                  name: 'Plan Status',
                  styles: 'text-sm text-green-600',
                  text: 'Active'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Popular Badge',
              styles: 'px-2 py-[2px] bg-blue-100 rounded-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Popular Text',
                  styles: 'text-xs font-medium text-blue-700',
                  text: 'Popular'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Price Info',
          styles: 'flex flex-col gap-1',
          children: [
            {
              type: 'FRAME',
              name: 'Price Row',
              styles: 'flex flex-row items-baseline gap-1',
              children: [
                {
                  type: 'TEXT',
                  name: 'Price',
                  styles: 'text-2xl font-bold text-gray-900',
                  text: '$49'
                },
                {
                  type: 'TEXT',
                  name: 'Period',
                  styles: 'text-sm text-gray-600',
                  text: '/month'
                }
              ]
            },
            {
              type: 'TEXT',
              name: 'Billing Info',
              styles: 'text-xs text-gray-500',
              text: 'Billed monthly • Cancel anytime'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Plan Features',
          styles: 'flex flex-col gap-2',
          children: [
            {
              type: 'TEXT',
              name: 'Features Title',
              styles: 'text-sm font-medium text-gray-900',
              text: 'What\'s included:'
            },
            {
              type: 'TEXT',
              name: 'Feature List',
              styles: 'text-sm text-gray-600 leading-relaxed',
              text: '• Unlimited projects\n• Priority support\n• Advanced analytics\n• Team collaboration'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Action Buttons',
          styles: 'flex flex-col gap-2',
          children: [
            {
              type: 'FRAME',
              name: 'Upgrade Button',
              styles: 'flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg w-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Upgrade Text',
                  styles: 'text-sm font-medium text-white',
                  text: 'Upgrade Now'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Manage Button',
              styles: 'flex items-center justify-center px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg w-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Manage Text',
                  styles: 'text-sm font-medium text-gray-700',
                  text: 'Manage Plan'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-02-18',
    updatedAt: '2024-02-18',
    author: { name: 'FigmaikR Team' },
    usageCount: 920
  },
  {
    id: 'testimonial-card',
    name: 'Testimonial Card',
    description: 'Customer testimonial with photo and quote',
    category: cardsCategory,
    tags: ['testimonial', 'review', 'customer', 'quote'],
    nodeData: {
      type: 'FRAME',
      name: 'Testimonial Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-md p-6 gap-4 w-[350px] h-auto',
      children: [
        {
          type: 'FRAME',
          name: 'Quote Section',
          styles: 'flex flex-col gap-3',
          children: [
            {
              type: 'TEXT',
              name: 'Quote Icon',
              styles: 'text-2xl text-blue-500',
              text: '"'
            },
            {
              type: 'TEXT',
              name: 'Quote Text',
              styles: 'text-base text-gray-700 leading-relaxed italic',
              text: 'This product has completely transformed how our team collaborates. The interface is intuitive and the features are exactly what we needed.'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Customer Info',
          styles: 'flex flex-row items-center gap-3',
          children: [
            {
              type: 'ELLIPSE',
              name: 'Customer Photo',
              styles: 'w-[48px] h-[48px] bg-gray-300'
            },
            {
              type: 'FRAME',
              name: 'Customer Details',
              styles: 'flex flex-col gap-[2px]',
              children: [
                {
                  type: 'TEXT',
                  name: 'Customer Name',
                  styles: 'text-sm font-semibold text-gray-900',
                  text: 'Emily Chen'
                },
                {
                  type: 'TEXT',
                  name: 'Customer Title',
                  styles: 'text-sm text-gray-600',
                  text: 'Product Manager at TechCorp'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Rating',
          styles: 'flex flex-row gap-1',
          children: [
            {
              type: 'TEXT',
              name: 'Star 1',
              styles: 'text-sm text-yellow-400',
              text: '★'
            },
            {
              type: 'TEXT',
              name: 'Star 2',
              styles: 'text-sm text-yellow-400',
              text: '★'
            },
            {
              type: 'TEXT',
              name: 'Star 3',
              styles: 'text-sm text-yellow-400',
              text: '★'
            },
            {
              type: 'TEXT',
              name: 'Star 4',
              styles: 'text-sm text-yellow-400',
              text: '★'
            },
            {
              type: 'TEXT',
              name: 'Star 5',
              styles: 'text-sm text-yellow-400',
              text: '★'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-02-19',
    updatedAt: '2024-02-19',
    author: { name: 'FigmaikR Team' },
    usageCount: 1250
  },
  {
    id: 'card-testimonial',
    name: 'Testimonial Card',
    description: 'Customer testimonial with rating and quote',
    category: cardsCategory,
    tags: ['testimonial', 'review', 'customer', 'rating'],
    nodeData: {
      type: 'FRAME',
      name: 'Testimonial Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[380px] h-auto',
      children: [
        {
          type: 'FRAME',
          name: 'Rating',
          styles: 'flex flex-row gap-1',
          children: [
            {
              type: 'TEXT',
              name: 'Star 1',
              styles: 'text-lg text-yellow-400',
              text: '★'
            },
            {
              type: 'TEXT',
              name: 'Star 2',
              styles: 'text-lg text-yellow-400',
              text: '★'
            },
            {
              type: 'TEXT',
              name: 'Star 3',
              styles: 'text-lg text-yellow-400',
              text: '★'
            },
            {
              type: 'TEXT',
              name: 'Star 4',
              styles: 'text-lg text-yellow-400',
              text: '★'
            },
            {
              type: 'TEXT',
              name: 'Star 5',
              styles: 'text-lg text-yellow-400',
              text: '★'
            }
          ]
        },
        {
          type: 'TEXT',
          name: 'Quote',
          styles: 'text-base text-gray-700 italic leading-relaxed',
          text: '"This product has transformed our workflow completely. Highly recommended!"'
        },
        {
          type: 'FRAME',
          name: 'Author Info',
          styles: 'flex flex-row items-center gap-3',
          children: [
            {
              type: 'FRAME',
              name: 'Avatar',
              styles: 'w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center',
              children: [
                {
                  type: 'TEXT',
                  name: 'Avatar Text',
                  styles: 'text-lg',
                  text: '👤'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Author Details',
              styles: 'flex flex-col',
              children: [
                {
                  type: 'TEXT',
                  name: 'Author Name',
                  styles: 'text-sm font-semibold text-gray-900',
                  text: 'John Doe'
                },
                {
                  type: 'TEXT',
                  name: 'Author Title',
                  styles: 'text-sm text-gray-600',
                  text: 'CEO at TechCorp'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
    author: { name: 'FigmaikR Team' },
    usageCount: 1350
  },
  {
    id: 'card-dashboard',
    name: 'Dashboard Widget Card',
    description: 'Dashboard widget with header and content area',
    category: cardsCategory,
    tags: ['dashboard', 'widget', 'analytics', 'chart'],
    nodeData: {
      type: 'FRAME',
      name: 'Dashboard Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm w-[400px] h-[300px]',
      children: [
        {
          type: 'FRAME',
          name: 'Card Header',
          styles: 'flex flex-row items-center justify-between p-4 border-b border-gray-200',
          children: [
            {
              type: 'TEXT',
              name: 'Widget Title',
              styles: 'text-lg font-semibold text-gray-900',
              text: 'Dashboard Widget'
            },
            {
              type: 'FRAME',
              name: 'Actions',
              styles: 'flex flex-row gap-2',
              children: [
                {
                  type: 'TEXT',
                  name: 'View Action',
                  styles: 'text-sm text-gray-600 hover:text-gray-900 cursor-pointer',
                  text: 'View'
                },
                {
                  type: 'TEXT',
                  name: 'Edit Action',
                  styles: 'text-sm text-gray-600 hover:text-gray-900 cursor-pointer',
                  text: 'Edit'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Card Content',
          styles: 'flex flex-1 items-center justify-center p-4',
          children: [
            {
              type: 'FRAME',
              name: 'Placeholder Content',
              styles: 'text-center',
              children: [
                {
                  type: 'TEXT',
                  name: 'Chart Icon',
                  styles: 'text-4xl text-gray-400',
                  text: '📊'
                },
                {
                  type: 'TEXT',
                  name: 'Content Text',
                  styles: 'text-sm text-gray-500',
                  text: 'Dashboard content goes here'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-02-21',
    updatedAt: '2024-02-21',
    author: { name: 'FigmaikR Team' },
    usageCount: 890
  },
  {
    id: 'card-event',
    name: 'Event Card',
    description: 'Event card with date, location and join button',
    category: cardsCategory,
    tags: ['event', 'calendar', 'date', 'location'],
    nodeData: {
      type: 'FRAME',
      name: 'Event Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[350px] h-auto',
      children: [
        {
          type: 'TEXT',
          name: 'Event Title',
          styles: 'text-lg font-semibold text-gray-900',
          text: 'Tech Conference 2024'
        },
        {
          type: 'FRAME',
          name: 'Event Details',
          styles: 'flex flex-col gap-2',
          children: [
            {
              type: 'FRAME',
              name: 'Date Info',
              styles: 'flex flex-row items-center gap-2',
              children: [
                {
                  type: 'TEXT',
                  name: 'Date Icon',
                  styles: 'text-sm',
                  text: '📅'
                },
                {
                  type: 'TEXT',
                  name: 'Date Text',
                  styles: 'text-sm text-gray-600',
                  text: 'Jan 15, 2024 at 9:00 AM'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Location Info',
              styles: 'flex flex-row items-center gap-2',
              children: [
                {
                  type: 'TEXT',
                  name: 'Location Icon',
                  styles: 'text-sm',
                  text: '📍'
                },
                {
                  type: 'TEXT',
                  name: 'Location Text',
                  styles: 'text-sm text-gray-600',
                  text: 'San Francisco, CA'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Attendees Info',
              styles: 'flex flex-row items-center gap-2',
              children: [
                {
                  type: 'TEXT',
                  name: 'Attendees Icon',
                  styles: 'text-sm',
                  text: '👥'
                },
                {
                  type: 'TEXT',
                  name: 'Attendees Text',
                  styles: 'text-sm text-gray-600',
                  text: '150 attending'
                }
              ]
            }
          ]
        },
        {
          type: 'TEXT',
          name: 'Event Description',
          styles: 'text-sm text-gray-700 leading-relaxed',
          text: 'Join us for an amazing tech conference with industry leaders.'
        },
        {
          type: 'FRAME',
          name: 'Join Button',
          styles: 'flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200',
          children: [
            {
              type: 'TEXT',
              name: 'Join Text',
              styles: 'text-sm font-medium text-white',
              text: 'Join Event'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-02-22',
    updatedAt: '2024-02-22',
    author: { name: 'FigmaikR Team' },
    usageCount: 670
  },
  {
    id: 'card-social',
    name: 'Social Media Post Card',
    description: 'Social media post with profile, content and interactions',
    category: cardsCategory,
    tags: ['social', 'post', 'profile', 'interaction'],
    nodeData: {
      type: 'FRAME',
      name: 'Social Card',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-4 gap-3 w-[400px] h-auto',
      children: [
        {
          type: 'FRAME',
          name: 'Post Header',
          styles: 'flex flex-row items-start gap-3',
          children: [
            {
              type: 'FRAME',
              name: 'Avatar',
              styles: 'w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center',
              children: [
                {
                  type: 'TEXT',
                  name: 'Avatar Text',
                  styles: 'text-lg',
                  text: '👤'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Post Info',
              styles: 'flex flex-1 flex-col',
              children: [
                {
                  type: 'FRAME',
                  name: 'User Info',
                  styles: 'flex flex-row items-center gap-2',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'User Name',
                      styles: 'text-sm font-semibold text-gray-900',
                      text: 'John Doe'
                    },
                    {
                      type: 'TEXT',
                      name: 'User Handle',
                      styles: 'text-sm text-gray-500',
                      text: '@johndoe'
                    },
                    {
                      type: 'TEXT',
                      name: 'Separator',
                      styles: 'text-sm text-gray-400',
                      text: '•'
                    },
                    {
                      type: 'TEXT',
                      name: 'Timestamp',
                      styles: 'text-sm text-gray-500',
                      text: '2h ago'
                    }
                  ]
                },
                {
                  type: 'TEXT',
                  name: 'Post Content',
                  styles: 'text-sm text-gray-800 leading-relaxed',
                  text: 'Just shipped a new feature! Excited to see how users respond to it.'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Post Actions',
          styles: 'flex flex-row items-center gap-6 text-gray-500 text-sm',
          children: [
            {
              type: 'FRAME',
              name: 'Like Action',
              styles: 'flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer',
              children: [
                {
                  type: 'TEXT',
                  name: 'Like Icon',
                  styles: 'text-sm',
                  text: '❤️'
                },
                {
                  type: 'TEXT',
                  name: 'Like Count',
                  styles: 'text-sm',
                  text: '42'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Share Action',
              styles: 'flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer',
              children: [
                {
                  type: 'TEXT',
                  name: 'Share Icon',
                  styles: 'text-sm',
                  text: '🔄'
                },
                {
                  type: 'TEXT',
                  name: 'Share Count',
                  styles: 'text-sm',
                  text: '8'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-02-23',
    updatedAt: '2024-02-23',
    author: { name: 'FigmaikR Team' },
    usageCount: 1120
  }
]; 
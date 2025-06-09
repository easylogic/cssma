import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const navigationCategory = getCategoryById('navigation')!;

export const navigationTemplates: Template[] = [
  {
    id: 'nav-header',
    name: 'Header Navigation',
    description: 'Horizontal navigation bar with logo and menu items',
    category: navigationCategory,
    tags: ['navigation', 'header', 'menu', 'horizontal'],
    nodeData: {
      type: 'FRAME',
      name: 'Header Navigation',
      styles: 'flex flex-row items-center justify-between bg-white border-b border-gray-200 px-6 py-4 w-full h-[72px]',
      children: [
        {
          type: 'TEXT',
          name: 'Logo',
          styles: 'text-xl font-bold text-gray-900',
          text: 'Brand'
        },
        {
          type: 'FRAME',
          name: 'Navigation Menu',
          styles: 'flex flex-row items-center gap-8',
          children: [
            {
              type: 'TEXT',
              name: 'Home Link',
              styles: 'text-base font-medium text-gray-700 hover:text-blue-600',
              text: 'Home'
            },
            {
              type: 'TEXT',
              name: 'About Link',
              styles: 'text-base font-medium text-gray-700 hover:text-blue-600',
              text: 'About'
            },
            {
              type: 'TEXT',
              name: 'Services Link',
              styles: 'text-base font-medium text-gray-700 hover:text-blue-600',
              text: 'Services'
            },
            {
              type: 'TEXT',
              name: 'Contact Link',
              styles: 'text-base font-medium text-gray-700 hover:text-blue-600',
              text: 'Contact'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'CTA Button',
          styles: 'flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md',
          children: [
            {
              type: 'TEXT',
              name: 'CTA Text',
              styles: 'text-sm font-medium text-white',
              text: 'Get Started'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    author: { name: 'FigmaikR Team' },
    usageCount: 4200,
    featured: true
  },
  {
    id: 'nav-sidebar',
    name: 'Sidebar Navigation',
    description: 'Vertical sidebar navigation with icons and labels',
    category: navigationCategory,
    tags: ['navigation', 'sidebar', 'vertical', 'icons'],
    nodeData: {
      type: 'FRAME',
      name: 'Sidebar Navigation',
      styles: 'flex flex-col bg-gray-900 text-white p-6 gap-4 w-[256px] h-full',
      children: [
        {
          type: 'TEXT',
          name: 'Brand Logo',
          styles: 'text-lg font-bold text-white',
          text: 'Dashboard'
        },
        {
          type: 'FRAME',
          name: 'Navigation Items',
          styles: 'flex flex-col gap-2',
          children: [
            {
              type: 'FRAME',
              name: 'Dashboard Item',
              styles: 'flex flex-row items-center gap-3 px-3 py-2.5 rounded-md bg-blue-600 text-white',
              children: [
                {
                  type: 'TEXT',
                  name: 'Dashboard Icon',
                  styles: 'text-base text-white',
                  text: '📊'
                },
                {
                  type: 'TEXT',
                  name: 'Dashboard Label',
                  styles: 'text-sm font-medium text-white',
                  text: 'Dashboard'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Analytics Item',
              styles: 'flex flex-row items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-800 text-gray-300',
              children: [
                {
                  type: 'TEXT',
                  name: 'Analytics Icon',
                  styles: 'text-base text-gray-300',
                  text: '📈'
                },
                {
                  type: 'TEXT',
                  name: 'Analytics Label',
                  styles: 'text-sm font-medium text-gray-300',
                  text: 'Analytics'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Users Item',
              styles: 'flex flex-row items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-800 text-gray-300',
              children: [
                {
                  type: 'TEXT',
                  name: 'Users Icon',
                  styles: 'text-base text-gray-300',
                  text: '👥'
                },
                {
                  type: 'TEXT',
                  name: 'Users Label',
                  styles: 'text-sm font-medium text-gray-300',
                  text: 'Users'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Settings Item',
              styles: 'flex flex-row items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-800 text-gray-300',
              children: [
                {
                  type: 'TEXT',
                  name: 'Settings Icon',
                  styles: 'text-base text-gray-300',
                  text: '⚙️'
                },
                {
                  type: 'TEXT',
                  name: 'Settings Label',
                  styles: 'text-sm font-medium text-gray-300',
                  text: 'Settings'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
    author: { name: 'FigmaikR Team' },
    usageCount: 2800
  },
  {
    id: 'nav-breadcrumb',
    name: 'Breadcrumb Navigation',
    description: 'Breadcrumb trail navigation component',
    category: navigationCategory,
    tags: ['navigation', 'breadcrumb', 'trail', 'hierarchy'],
    nodeData: {
      type: 'FRAME',
      name: 'Breadcrumb Navigation',
      styles: 'flex flex-row items-center gap-2 px-6 py-3 bg-gray-50 border-b border-gray-200 w-full',
      children: [
        {
          type: 'TEXT',
          name: 'Home Crumb',
          styles: 'text-sm text-blue-600 hover:text-blue-800 cursor-pointer',
          text: 'Home'
        },
        {
          type: 'TEXT',
          name: 'Separator 1',
          styles: 'text-sm text-gray-400',
          text: '/'
        },
        {
          type: 'TEXT',
          name: 'Category Crumb',
          styles: 'text-sm text-blue-600 hover:text-blue-800 cursor-pointer',
          text: 'Category'
        },
        {
          type: 'TEXT',
          name: 'Separator 2',
          styles: 'text-sm text-gray-400',
          text: '/'
        },
        {
          type: 'TEXT',
          name: 'Current Page',
          styles: 'text-sm text-gray-500',
          text: 'Current Page'
        }
      ]
    },
    complexity: 'beginner',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17',
    author: { name: 'FigmaikR Team' },
    usageCount: 1500
  }
]; 
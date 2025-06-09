import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const layoutCategory = getCategoryById('layout')!;

export const layoutTemplates: Template[] = [
  {
    id: 'layout-grid',
    name: 'Grid Layout',
    description: 'Responsive grid layout with multiple columns',
    category: layoutCategory,
    tags: ['layout', 'grid', 'responsive', 'columns'],
    nodeData: {
      type: 'FRAME',
      name: 'Grid Layout',
      styles: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full h-auto',
      children: [
        {
          type: 'FRAME',
          name: 'Grid Item 1',
          styles: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm',
          children: [
            {
              type: 'TEXT',
              name: 'Item Title',
              styles: 'text-lg font-semibold text-gray-900',
              text: 'Item 1'
            },
            {
              type: 'TEXT',
              name: 'Item Content',
              styles: 'text-sm text-gray-600',
              text: 'Content for grid item 1'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Grid Item 2',
          styles: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm',
          children: [
            {
              type: 'TEXT',
              name: 'Item Title',
              styles: 'text-lg font-semibold text-gray-900',
              text: 'Item 2'
            },
            {
              type: 'TEXT',
              name: 'Item Content',
              styles: 'text-sm text-gray-600',
              text: 'Content for grid item 2'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Grid Item 3',
          styles: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm',
          children: [
            {
              type: 'TEXT',
              name: 'Item Title',
              styles: 'text-lg font-semibold text-gray-900',
              text: 'Item 3'
            },
            {
              type: 'TEXT',
              name: 'Item Content',
              styles: 'text-sm text-gray-600',
              text: 'Content for grid item 3'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    author: { name: 'FigmaikR Team' },
    usageCount: 2800,
    featured: true
  },
  {
    id: 'layout-dashboard',
    name: 'Dashboard Layout',
    description: 'Complete dashboard layout with sidebar and main content area',
    category: layoutCategory,
    tags: ['layout', 'dashboard', 'sidebar', 'admin'],
    nodeData: {
      type: 'FRAME',
      name: 'Dashboard Layout',
      styles: 'flex flex-row min-h-screen bg-gray-50 w-full h-screen',
      children: [
        {
          type: 'FRAME',
          name: 'Sidebar',
          styles: 'w-64 bg-gray-900 text-white p-4',
          children: [
            {
              type: 'FRAME',
              name: 'Logo Section',
              styles: 'text-xl font-bold text-center pb-6 border-b border-gray-700',
              children: [
                {
                  type: 'TEXT',
                  name: 'Logo Text',
                  styles: 'text-white',
                  text: 'FigmaikR'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Navigation',
              styles: 'space-y-2',
              children: [
                {
                  type: 'FRAME',
                  name: 'Nav Item Active',
                  styles: 'block px-3 py-2 rounded-lg bg-blue-600 text-white',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Nav Text',
                      styles: 'text-sm',
                      text: 'Dashboard'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Nav Item',
                  styles: 'block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Nav Text',
                      styles: 'text-sm',
                      text: 'Projects'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Nav Item',
                  styles: 'block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Nav Text',
                      styles: 'text-sm',
                      text: 'Settings'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Main Content',
          styles: 'flex-1 flex flex-col',
          children: [
            {
              type: 'FRAME',
              name: 'Header',
              styles: 'bg-white border-b border-gray-200 px-6 py-4',
              children: [
                {
                  type: 'FRAME',
                  name: 'Header Content',
                  styles: 'flex items-center justify-between',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Page Title',
                      styles: 'text-2xl font-bold text-gray-900',
                      text: 'Dashboard'
                    },
                    {
                      type: 'FRAME',
                      name: 'Header Actions',
                      styles: 'flex items-center space-x-3',
                      children: [
                        {
                          type: 'FRAME',
                          name: 'Action Button',
                          styles: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700',
                          children: [
                            {
                              type: 'TEXT',
                              name: 'Button Text',
                              styles: 'text-sm font-medium',
                              text: 'New Project'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Page Content',
              styles: 'flex-1 p-6',
              children: [
                {
                  type: 'FRAME',
                  name: 'Widgets Grid',
                  styles: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                  children: [
                    {
                      type: 'FRAME',
                      name: 'Widget 1',
                      styles: 'bg-white p-6 rounded-lg border border-gray-200',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Widget Title',
                          styles: 'text-lg font-semibold text-gray-900',
                          text: 'Widget 1'
                        },
                        {
                          type: 'TEXT',
                          name: 'Widget Content',
                          styles: 'text-gray-600 text-sm',
                          text: 'Sample dashboard widget content'
                        }
                      ]
                    },
                    {
                      type: 'FRAME',
                      name: 'Widget 2',
                      styles: 'bg-white p-6 rounded-lg border border-gray-200',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Widget Title',
                          styles: 'text-lg font-semibold text-gray-900',
                          text: 'Widget 2'
                        },
                        {
                          type: 'TEXT',
                          name: 'Widget Content',
                          styles: 'text-gray-600 text-sm',
                          text: 'Sample dashboard widget content'
                        }
                      ]
                    },
                    {
                      type: 'FRAME',
                      name: 'Widget 3',
                      styles: 'bg-white p-6 rounded-lg border border-gray-200',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Widget Title',
                          styles: 'text-lg font-semibold text-gray-900',
                          text: 'Widget 3'
                        },
                        {
                          type: 'TEXT',
                          name: 'Widget Content',
                          styles: 'text-gray-600 text-sm',
                          text: 'Sample dashboard widget content'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'advanced',
    createdAt: '2024-02-26',
    updatedAt: '2024-02-26',
    author: { name: 'FigmaikR Team' },
    usageCount: 750
  }
]; 
import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const tablesCategory = getCategoryById('tables')!;

export const tableTemplates: Template[] = [
  {
    id: 'table-simple',
    name: 'Simple Table',
    description: 'Basic data table with headers and rows',
    category: tablesCategory,
    tags: ['table', 'data', 'list', 'grid'],
    nodeData: {
      type: 'FRAME',
      name: 'Simple Table',
      styles: 'bg-white border border-gray-200 rounded-lg overflow-hidden w-full',
      children: [
        {
          type: 'FRAME',
          name: 'Table Header',
          styles: 'flex flex-row bg-gray-50 border-b border-gray-200',
          children: [
            {
              type: 'FRAME',
              name: 'Header Cell 1',
              styles: 'flex items-center px-4 py-3 flex-1 border-r border-gray-200',
              children: [
                {
                  type: 'TEXT',
                  name: 'Header Text',
                  styles: 'text-sm font-semibold text-gray-900',
                  text: 'Name'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Header Cell 2',
              styles: 'flex items-center px-4 py-3 flex-1 border-r border-gray-200',
              children: [
                {
                  type: 'TEXT',
                  name: 'Header Text',
                  styles: 'text-sm font-semibold text-gray-900',
                  text: 'Email'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Header Cell 3',
              styles: 'flex items-center px-4 py-3 flex-1',
              children: [
                {
                  type: 'TEXT',
                  name: 'Header Text',
                  styles: 'text-sm font-semibold text-gray-900',
                  text: 'Status'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Table Body',
          styles: 'flex flex-col',
          children: [
            {
              type: 'FRAME',
              name: 'Table Row 1',
              styles: 'flex flex-row border-b border-gray-200 hover:bg-gray-50',
              children: [
                {
                  type: 'FRAME',
                  name: 'Cell 1',
                  styles: 'flex items-center px-4 py-3 flex-1 border-r border-gray-200',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Cell Text',
                      styles: 'text-sm text-gray-900',
                      text: 'John Doe'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Cell 2',
                  styles: 'flex items-center px-4 py-3 flex-1 border-r border-gray-200',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Cell Text',
                      styles: 'text-sm text-gray-600',
                      text: 'john@example.com'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Cell 3',
                  styles: 'flex items-center px-4 py-3 flex-1',
                  children: [
                    {
                      type: 'FRAME',
                      name: 'Status Badge',
                      styles: 'px-2 py-[2px] bg-green-100 text-green-800 rounded-full',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Status Text',
                          styles: 'text-xs font-medium',
                          text: 'Active'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Table Row 2',
              styles: 'flex flex-row border-b border-gray-200 hover:bg-gray-50',
              children: [
                {
                  type: 'FRAME',
                  name: 'Cell 1',
                  styles: 'flex items-center px-4 py-3 flex-1 border-r border-gray-200',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Cell Text',
                      styles: 'text-sm text-gray-900',
                      text: 'Jane Smith'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Cell 2',
                  styles: 'flex items-center px-4 py-3 flex-1 border-r border-gray-200',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Cell Text',
                      styles: 'text-sm text-gray-600',
                      text: 'jane@example.com'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Cell 3',
                  styles: 'flex items-center px-4 py-3 flex-1',
                  children: [
                    {
                      type: 'FRAME',
                      name: 'Status Badge',
                      styles: 'px-2 py-[2px] bg-yellow-100 text-yellow-800 rounded-full',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Status Text',
                          styles: 'text-xs font-medium',
                          text: 'Pending'
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
    complexity: 'intermediate',
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28',
    author: { name: 'FigmaikR Team' },
    usageCount: 1650
  },
  {
    id: 'table-sortable',
    name: 'Sortable Table',
    description: 'Data table with sortable column headers',
    category: tablesCategory,
    tags: ['table', 'sort', 'data', 'interactive'],
    nodeData: {
      type: 'FRAME',
      name: 'Sortable Table',
      styles: 'bg-white border border-gray-200 rounded-lg overflow-hidden w-full',
      children: [
        {
          type: 'FRAME',
          name: 'Sortable Header',
          styles: 'flex flex-row bg-gray-50 border-b border-gray-200',
          children: [
            {
              type: 'FRAME',
              name: 'Sortable Header Cell',
              styles: 'flex items-center justify-between px-4 py-3 flex-1 border-r border-gray-200 cursor-pointer hover:bg-gray-100',
              children: [
                {
                  type: 'TEXT',
                  name: 'Header Text',
                  styles: 'text-sm font-semibold text-gray-900',
                  text: 'Product'
                },
                {
                  type: 'TEXT',
                  name: 'Sort Icon',
                  styles: 'text-xs text-gray-400',
                  text: '↕'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Active Sort Header',
              styles: 'flex items-center justify-between px-4 py-3 flex-1 border-r border-gray-200 cursor-pointer bg-blue-50',
              children: [
                {
                  type: 'TEXT',
                  name: 'Header Text',
                  styles: 'text-sm font-semibold text-blue-900',
                  text: 'Price'
                },
                {
                  type: 'TEXT',
                  name: 'Sort Icon',
                  styles: 'text-xs text-blue-600',
                  text: '↑'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Header Cell',
              styles: 'flex items-center px-4 py-3 flex-1',
              children: [
                {
                  type: 'TEXT',
                  name: 'Header Text',
                  styles: 'text-sm font-semibold text-gray-900',
                  text: 'Actions'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Table Body',
          styles: 'flex flex-col',
          children: [
            {
              type: 'FRAME',
              name: 'Data Row',
              styles: 'flex flex-row border-b border-gray-200 hover:bg-gray-50',
              children: [
                {
                  type: 'FRAME',
                  name: 'Product Cell',
                  styles: 'flex items-center px-4 py-3 flex-1 border-r border-gray-200',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Product Name',
                      styles: 'text-sm text-gray-900',
                      text: 'Premium Widget'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Price Cell',
                  styles: 'flex items-center px-4 py-3 flex-1 border-r border-gray-200',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Price Text',
                      styles: 'text-sm font-medium text-gray-900',
                      text: '$99.99'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Actions Cell',
                  styles: 'flex items-center px-4 py-3 flex-1 gap-2',
                  children: [
                    {
                      type: 'FRAME',
                      name: 'Edit Button',
                      styles: 'px-2 py-1 text-blue-600 hover:bg-blue-50 rounded',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Edit Text',
                          styles: 'text-xs font-medium',
                          text: 'Edit'
                        }
                      ]
                    },
                    {
                      type: 'FRAME',
                      name: 'Delete Button',
                      styles: 'px-2 py-1 text-red-600 hover:bg-red-50 rounded',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Delete Text',
                          styles: 'text-xs font-medium',
                          text: 'Delete'
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
    createdAt: '2024-01-29',
    updatedAt: '2024-01-29',
    author: { name: 'FigmaikR Team' },
    usageCount: 890
  }
]; 
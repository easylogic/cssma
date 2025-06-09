import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const modalsCategory = getCategoryById('modals')!;

export const modalTemplates: Template[] = [
  {
    id: 'modal-confirm',
    name: 'Confirmation Modal',
    description: 'Simple confirmation dialog with action buttons',
    category: modalsCategory,
    tags: ['modal', 'dialog', 'confirmation', 'popup'],
    nodeData: {
      type: 'FRAME',
      name: 'Modal Overlay',
      styles: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
      children: [
        {
          type: 'FRAME',
          name: 'Modal Content',
          styles: 'bg-white rounded-lg shadow-xl max-w-[400px] w-full p-6 gap-5',
          children: [
            {
              type: 'FRAME',
              name: 'Modal Header',
              styles: 'flex flex-row items-center justify-between',
              children: [
                {
                  type: 'TEXT',
                  name: 'Modal Title',
                  styles: 'text-lg font-semibold text-gray-900',
                  text: 'Confirm Action'
                },
                {
                  type: 'FRAME',
                  name: 'Close Button',
                  styles: 'flex items-center justify-center w-[24px] h-[24px] cursor-pointer',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Close Icon',
                      styles: 'text-gray-400 hover:text-gray-600',
                      text: '×'
                    }
                  ]
                }
              ]
            },
            {
              type: 'TEXT',
              name: 'Modal Message',
              styles: 'text-base text-gray-600 leading-relaxed',
              text: 'Are you sure you want to proceed with this action? This action cannot be undone.'
            },
            {
              type: 'FRAME',
              name: 'Modal Actions',
              styles: 'flex flex-row gap-3 justify-end',
              children: [
                {
                  type: 'FRAME',
                  name: 'Cancel Button',
                  styles: 'flex items-center justify-center px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Cancel Text',
                      styles: 'text-sm font-medium text-gray-700',
                      text: 'Cancel'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Confirm Button',
                  styles: 'flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Confirm Text',
                      styles: 'text-sm font-medium text-white',
                      text: 'Confirm'
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
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
    author: { name: 'FigmaikR Team' },
    usageCount: 1400,
    featured: true
  },
  {
    id: 'modal-form',
    name: 'Form Modal',
    description: 'Modal with form input fields',
    category: modalsCategory,
    tags: ['modal', 'form', 'input', 'dialog'],
    nodeData: {
      type: 'FRAME',
      name: 'Form Modal Overlay',
      styles: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
      children: [
        {
          type: 'FRAME',
          name: 'Form Modal Content',
          styles: 'bg-white rounded-lg shadow-xl max-w-[500px] w-full p-6 gap-5',
          children: [
            {
              type: 'TEXT',
              name: 'Form Title',
              styles: 'text-xl font-semibold text-gray-900',
              text: 'Add New Item'
            },
            {
              type: 'FRAME',
              name: 'Form Fields',
              styles: 'flex flex-col gap-4',
              children: [
                {
                  type: 'FRAME',
                  name: 'Name Field',
                  styles: 'flex flex-col gap-2',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Name Label',
                      styles: 'text-sm font-medium text-gray-700',
                      text: 'Name'
                    },
                    {
                      type: 'FRAME',
                      name: 'Name Input',
                      styles: 'flex items-center px-3 py-2.5 border border-gray-300 rounded-md w-full h-[40px]',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Name Placeholder',
                          styles: 'text-base text-gray-400',
                          text: 'Enter name'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Description Field',
                  styles: 'flex flex-col gap-2',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Description Label',
                      styles: 'text-sm font-medium text-gray-700',
                      text: 'Description'
                    },
                    {
                      type: 'FRAME',
                      name: 'Description Textarea',
                      styles: 'flex px-3 py-2.5 border border-gray-300 rounded-md w-full h-[80px]',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Description Placeholder',
                          styles: 'text-base text-gray-400',
                          text: 'Enter description'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Form Actions',
              styles: 'flex flex-row gap-3 justify-end',
              children: [
                {
                  type: 'FRAME',
                  name: 'Cancel Button',
                  styles: 'flex items-center justify-center px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Cancel Text',
                      styles: 'text-sm font-medium text-gray-700',
                      text: 'Cancel'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Save Button',
                  styles: 'flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Save Text',
                      styles: 'text-sm font-medium text-white',
                      text: 'Save'
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
    createdAt: '2024-01-26',
    updatedAt: '2024-01-26',
    author: { name: 'FigmaikR Team' },
    usageCount: 980
  }
]; 
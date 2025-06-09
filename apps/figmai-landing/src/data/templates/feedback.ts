import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const feedbackCategory = getCategoryById('feedback')!;

export const feedbackTemplates: Template[] = [
  {
    id: 'feedback-alert',
    name: 'Alert Message',
    description: 'Alert message with different types and dismissible option',
    category: feedbackCategory,
    tags: ['alert', 'notification', 'message', 'feedback'],
    nodeData: {
      type: 'FRAME',
      name: 'Alert',
      styles: 'flex flex-row items-start p-4 bg-blue-50 border border-blue-200 rounded-lg w-[400px] h-auto',
      children: [
        {
          type: 'FRAME',
          name: 'Icon Container',
          styles: 'flex-shrink-0 text-lg mr-3',
          children: [
            {
              type: 'TEXT',
              name: 'Alert Icon',
              styles: 'text-blue-600',
              text: 'ℹ️'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Content',
          styles: 'flex-1',
          children: [
            {
              type: 'TEXT',
              name: 'Alert Title',
              styles: 'font-medium text-blue-800',
              text: 'Alert Title'
            },
            {
              type: 'TEXT',
              name: 'Alert Message',
              styles: 'text-sm text-blue-700 opacity-90',
              text: 'This is an alert message.'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Close Button',
          styles: 'flex-shrink-0 ml-3 text-blue-500 hover:text-blue-700 cursor-pointer transition-colors',
          children: [
            {
              type: 'TEXT',
              name: 'Close Icon',
              styles: 'text-sm',
              text: '✕'
            }
          ]
        }
      ]
    },
    complexity: 'beginner',
    createdAt: '2024-02-24',
    updatedAt: '2024-02-24',
    author: { name: 'FigmaikR Team' },
    usageCount: 2100
  },
  {
    id: 'feedback-toast',
    name: 'Toast Notification',
    description: 'Toast notification with auto-dismiss and progress bar',
    category: feedbackCategory,
    tags: ['toast', 'notification', 'popup', 'temporary'],
    nodeData: {
      type: 'FRAME',
      name: 'Toast',
      styles: 'flex flex-col bg-blue-600 text-white rounded-lg shadow-lg p-4 w-[320px] h-auto fixed top-4 right-4 z-50',
      children: [
        {
          type: 'FRAME',
          name: 'Toast Content',
          styles: 'flex flex-row items-center',
          children: [
            {
              type: 'FRAME',
              name: 'Icon Container',
              styles: 'flex-shrink-0 text-lg mr-3',
              children: [
                {
                  type: 'TEXT',
                  name: 'Toast Icon',
                  styles: 'text-white',
                  text: 'ℹ️'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Message',
              styles: 'flex-1',
              children: [
                {
                  type: 'TEXT',
                  name: 'Toast Message',
                  styles: 'text-sm font-medium text-white',
                  text: 'Toast notification message'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Close Button',
              styles: 'flex-shrink-0 ml-3 text-white hover:text-gray-200 cursor-pointer transition-colors',
              children: [
                {
                  type: 'TEXT',
                  name: 'Close Icon',
                  styles: 'text-sm',
                  text: '✕'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Progress Bar',
          styles: 'w-full bg-white bg-opacity-30 rounded-full h-1',
          children: [
            {
              type: 'RECTANGLE',
              name: 'Progress Fill',
              styles: 'bg-white h-1 rounded-full w-full transition-all duration-300'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-02-25',
    updatedAt: '2024-02-25',
    author: { name: 'FigmaikR Team' },
    usageCount: 1650
  }
]; 
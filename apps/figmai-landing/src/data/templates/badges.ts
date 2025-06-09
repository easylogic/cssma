import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const badgesCategory = getCategoryById('badges')!;

export const badgeTemplates: Template[] = [
  {
    id: 'badge-status',
    name: 'Status Badge',
    description: 'Colored status indicator badge',
    category: badgesCategory,
    tags: ['badge', 'status', 'indicator', 'label'],
    nodeData: {
      type: 'FRAME',
      name: 'Status Badge',
      styles: 'flex items-center px-2 py-[2px] bg-green-100 text-green-800 rounded-full',
      children: [
        {
          type: 'TEXT',
          name: 'Badge Text',
          styles: 'text-xs font-medium',
          text: 'Active'
        }
      ]
    },
    complexity: 'beginner',
    createdAt: '2024-01-30',
    updatedAt: '2024-01-30',
    author: { name: 'FigmaikR Team' },
    usageCount: 2200
  },
  {
    id: 'badge-notification',
    name: 'Notification Badge',
    description: 'Small notification count badge',
    category: badgesCategory,
    tags: ['badge', 'notification', 'count', 'indicator'],
    nodeData: {
      type: 'FRAME',
      name: 'Notification Badge',
      styles: 'relative flex',
      children: [
        {
          type: 'FRAME',
          name: 'Icon Container',
          styles: 'w-[24px] h-[24px] bg-gray-200 rounded',
          children: [
            {
              type: 'TEXT',
              name: 'Icon',
              styles: 'text-sm text-gray-600',
              text: '🔔'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Badge Container',
          styles: 'absolute -top-[4px] -right-[4px] flex items-center justify-center min-w-[16px] h-[16px] bg-red-500 text-white rounded-full',
          children: [
            {
              type: 'TEXT',
              name: 'Count Text',
              styles: 'text-xs font-bold',
              text: '3'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-31',
    updatedAt: '2024-01-31',
    author: { name: 'FigmaikR Team' },
    usageCount: 1800
  }
]; 
import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const loadingCategory = getCategoryById('loading')!;

export const loadingTemplates: Template[] = [
  {
    id: 'loading-spinner',
    name: 'Loading Spinner',
    description: 'Animated spinning loader',
    category: loadingCategory,
    tags: ['loading', 'spinner', 'animated', 'circular'],
    nodeData: {
      type: 'FRAME',
      name: 'Loading Spinner',
      styles: 'flex items-center justify-center w-[32px] h-[32px]',
      children: [
        {
          type: 'ELLIPSE',
          name: 'Spinner Ring',
          styles: 'w-[32px] h-[32px] border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin'
        }
      ]
    },
    complexity: 'beginner',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    author: { name: 'FigmaikR Team' },
    usageCount: 3100,
    featured: true
  },
  {
    id: 'loading-skeleton',
    name: 'Skeleton Loader',
    description: 'Content placeholder skeleton loader',
    category: loadingCategory,
    tags: ['loading', 'skeleton', 'placeholder', 'shimmer'],
    nodeData: {
      type: 'FRAME',
      name: 'Skeleton Loader',
      styles: 'flex flex-col gap-3 p-4 bg-white rounded-lg border border-gray-200 w-[320px] animate-pulse',
      children: [
        {
          type: 'FRAME',
          name: 'Header Skeleton',
          styles: 'flex flex-row items-center gap-3',
          children: [
            {
              type: 'ELLIPSE',
              name: 'Avatar Skeleton',
              styles: 'w-[40px] h-[40px] bg-gray-200 rounded-full'
            },
            {
              type: 'FRAME',
              name: 'Text Skeleton',
              styles: 'flex flex-col gap-1 flex-1',
              children: [
                {
                  type: 'RECTANGLE',
                  name: 'Title Skeleton',
                  styles: 'h-[16px] bg-gray-200 rounded w-[120px]'
                },
                {
                  type: 'RECTANGLE',
                  name: 'Subtitle Skeleton',
                  styles: 'h-[12px] bg-gray-200 rounded w-[80px]'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Content Skeleton',
          styles: 'flex flex-col gap-2',
          children: [
            {
              type: 'RECTANGLE',
              name: 'Line 1',
              styles: 'h-[12px] bg-gray-200 rounded w-full'
            },
            {
              type: 'RECTANGLE',
              name: 'Line 2',
              styles: 'h-[12px] bg-gray-200 rounded w-[85%]'
            },
            {
              type: 'RECTANGLE',
              name: 'Line 3',
              styles: 'h-[12px] bg-gray-200 rounded w-[90%]'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Actions Skeleton',
          styles: 'flex flex-row gap-2 justify-end',
          children: [
            {
              type: 'RECTANGLE',
              name: 'Button 1',
              styles: 'w-[60px] h-[32px] bg-gray-200 rounded'
            },
            {
              type: 'RECTANGLE',
              name: 'Button 2',
              styles: 'w-[80px] h-[32px] bg-gray-200 rounded'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-02-02',
    updatedAt: '2024-02-02',
    author: { name: 'FigmaikR Team' },
    usageCount: 2400
  }
]; 
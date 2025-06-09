import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const buttonsCategory = getCategoryById('buttons')!;

export const buttonTemplates: Template[] = [
  {
    id: 'btn-primary',
    name: 'Primary Button',
    description: 'A solid primary button with hover effects',
    category: buttonsCategory,
    tags: ['button', 'primary', 'solid', 'interactive'],
    nodeData: {
      type: 'FRAME',
      name: 'Primary Button',
      styles: 'flex items-center justify-center px-[16px] py-[8px] bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 w-[120px] h-[40px]',
      children: [
        {
          type: 'TEXT',
          name: 'Button Text',
          styles: 'text-sm font-semibold text-white',
          text: 'Button'
        }
      ]
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
    category: buttonsCategory,
    tags: ['button', 'outline', 'border', 'secondary'],
    nodeData: {
      type: 'FRAME',
      name: 'Outline Button',
      styles: 'flex items-center justify-center px-[16px] py-[8px] border-2 border-blue-600 bg-transparent hover:bg-blue-600 rounded-lg transition-all duration-200 w-[120px] h-[40px]',
      children: [
        {
          type: 'TEXT',
          name: 'Button Text',
          styles: 'text-sm font-semibold text-blue-600 hover:text-white',
          text: 'Button'
        }
      ]
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
    category: buttonsCategory,
    tags: ['button', 'gradient', 'shadow', 'modern'],
    nodeData: {
      type: 'FRAME',
      name: 'Gradient Button',
      styles: 'flex items-center justify-center px-[24px] py-[12px] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-[140px] h-[48px]',
      children: [
        {
          type: 'TEXT',
          name: 'Button Text',
          styles: 'text-base font-bold text-white',
          text: 'Button'
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
    author: { name: 'FigmaikR Team' },
    usageCount: 2100,
    featured: true
  },
  {
    id: 'btn-icon',
    name: 'Icon Button',
    description: 'Button with icon and text',
    category: buttonsCategory,
    tags: ['button', 'icon', 'text', 'interactive'],
    nodeData: {
      type: 'FRAME',
      name: 'Icon Button',
      styles: 'flex flex-row items-center justify-center gap-[8px] px-[16px] py-[8px] bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors duration-200 w-[140px] h-[40px]',
      children: [
        {
          type: 'TEXT',
          name: 'Icon',
          styles: 'text-sm text-white',
          text: '★'
        },
        {
          type: 'TEXT',
          name: 'Button Text',
          styles: 'text-sm font-medium text-white',
          text: 'Button'
        }
      ]
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
    category: buttonsCategory,
    tags: ['button', 'floating', 'fab', 'circular'],
    nodeData: {
      type: 'FRAME',
      name: 'Floating Button',
      styles: 'flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-[56px] h-[56px]',
      children: [
        {
          type: 'TEXT',
          name: 'Icon',
          styles: 'text-lg text-white',
          text: '+'
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-24',
    updatedAt: '2024-01-24',
    author: { name: 'FigmaikR Team' },
    usageCount: 890
  }
]; 
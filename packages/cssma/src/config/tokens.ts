import { FigmaColor } from '../types';
import { round } from '../utils/math';

// Color Tokens
export const COLORS: Record<string, FigmaColor> = {
  // Basic Colors
  'white': { r: 1, g: 1, b: 1 },
  'black': { r: 0, g: 0, b: 0 },
  'transparent': { r: 0, g: 0, b: 0, a: 0 },

  // Gray Scale
  'gray-50': { r: round(249/255), g: round(250/255), b: round(251/255) },
  'gray-100': { r: round(243/255), g: round(244/255), b: round(246/255) },
  'gray-200': { r: round(229/255), g: round(231/255), b: round(235/255) },
  'gray-300': { r: round(209/255), g: round(213/255), b: round(219/255) },
  'gray-400': { r: round(156/255), g: round(163/255), b: round(175/255) },
  'gray-500': { r: round(107/255), g: round(114/255), b: round(128/255) },
  'gray-600': { r: round(75/255), g: round(85/255), b: round(99/255) },
  'gray-700': { r: round(55/255), g: round(65/255), b: round(81/255) },
  'gray-800': { r: round(31/255), g: round(41/255), b: round(55/255) },
  'gray-900': { r: round(17/255), g: round(24/255), b: round(39/255) },

  // Blue Scale
  'blue-50': { r: round(239/255), g: round(246/255), b: round(255/255) },
  'blue-100': { r: round(219/255), g: round(234/255), b: round(254/255) },
  'blue-200': { r: round(191/255), g: round(219/255), b: round(254/255) },
  'blue-300': { r: round(147/255), g: round(197/255), b: round(253/255) },
  'blue-400': { r: round(96/255), g: round(165/255), b: round(250/255) },
  'blue-500': { r: round(59/255), g: round(130/255), b: round(246/255) },
  'blue-600': { r: round(37/255), g: round(99/255), b: round(235/255) },
  'blue-700': { r: round(29/255), g: round(78/255), b: round(216/255) },
  'blue-800': { r: round(30/255), g: round(64/255), b: round(175/255) },
  'blue-900': { r: round(30/255), g: round(58/255), b: round(138/255) },

  // Red Scale
  'red-50': { r: round(254/255), g: round(242/255), b: round(242/255) },
  'red-100': { r: round(254/255), g: round(226/255), b: round(226/255) },
  'red-200': { r: round(254/255), g: round(202/255), b: round(202/255) },
  'red-300': { r: round(252/255), g: round(165/255), b: round(165/255) },
  'red-400': { r: round(248/255), g: round(113/255), b: round(113/255) },
  'red-500': { r: round(239/255), g: round(68/255), b: round(68/255) },
  'red-600': { r: round(220/255), g: round(38/255), b: round(38/255) },
  'red-700': { r: round(185/255), g: round(28/255), b: round(28/255) },
  'red-800': { r: round(153/255), g: round(27/255), b: round(27/255) },
  'red-900': { r: round(127/255), g: round(29/255), b: round(29/255) },

  // Purple Scale
  'purple-50': { r: round(250/255), g: round(245/255), b: round(255/255) },
  'purple-100': { r: round(243/255), g: round(232/255), b: round(255/255) },
  'purple-200': { r: round(233/255), g: round(213/255), b: round(255/255) },
  'purple-300': { r: round(216/255), g: round(180/255), b: round(254/255) },
  'purple-400': { r: round(192/255), g: round(132/255), b: round(252/255) },
  'purple-500': { r: round(168/255), g: round(85/255), b: round(247/255) },
  'purple-600': { r: round(147/255), g: round(51/255), b: round(234/255) },
  'purple-700': { r: round(126/255), g: round(34/255), b: round(206/255) },
  'purple-800': { r: round(107/255), g: round(33/255), b: round(168/255) },
  'purple-900': { r: round(88/255), g: round(28/255), b: round(135/255) },

  // Green Scale
  'green-50': { r: round(240/255), g: round(253/255), b: round(244/255) },
  'green-100': { r: round(220/255), g: round(252/255), b: round(231/255) },
  'green-200': { r: round(187/255), g: round(247/255), b: round(208/255) },
  'green-300': { r: round(134/255), g: round(239/255), b: round(172/255) },
  'green-400': { r: round(74/255), g: round(222/255), b: round(128/255) },
  'green-500': { r: round(34/255), g: round(197/255), b: round(94/255) },
  'green-600': { r: round(22/255), g: round(163/255), b: round(74/255) },
  'green-700': { r: round(21/255), g: round(128/255), b: round(61/255) },
  'green-800': { r: round(22/255), g: round(101/255), b: round(52/255) },
  'green-900': { r: round(20/255), g: round(83/255), b: round(45/255) },

  // Pink Scale
  'pink-50': { r: round(255/255), g: round(240/255), b: round(245/255) },
  'pink-100': { r: round(254/255), g: round(225/255), b: round(236/255) },
  'pink-200': { r: round(253/255), g: round(200/255), b: round(237/255) },
  'pink-300': { r: round(252/255), g: round(174/255), b: round(232/255) },
  'pink-400': { r: round(251/255), g: round(133/255), b: round(200/255) },
  'pink-500': { r: round(249/255), g: round(95/255), b: round(180/255) },
  'pink-600': { r: round(244/255), g: round(63/255), b: round(144/255) },
  'pink-700': { r: round(236/255), g: round(32/255), b: round(116/255) },
  'pink-800': { r: round(216/255), g: round(30/255), b: round(91/255) },
  'pink-900': { r: round(194/255), g: round(29/255), b: round(71/255) }
  
};

// Font Size Tokens
export const FONT_SIZES: Record<string, number> = {
  'xs': 12,
  'sm': 14,
  'base': 16,
  'md': 16,
  'lg': 18,
  'xl': 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60
};

// Font Weight Tokens
export const FONT_WEIGHTS: Record<string, { family: string; style: string }> = {
  'thin': { family: 'Inter', style: 'Thin' },
  'extralight': { family: 'Inter', style: 'ExtraLight' },
  'light': { family: 'Inter', style: 'Light' },
  'normal': { family: 'Inter', style: 'Regular' },
  'medium': { family: 'Inter', style: 'Medium' },
  'semibold': { family: 'Inter', style: 'SemiBold' },
  'bold': { family: 'Inter', style: 'Bold' },
  'extrabold': { family: 'Inter', style: 'ExtraBold' },
  'black': { family: 'Inter', style: 'Black' }
};

// Spacing Tokens
export const SPACING: Record<string, number> = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64
};

// Border Radius Tokens
export const RADIUS: Record<string, number> = {
  'none': 0,
  'sm': 2,
  'DEFAULT': 4,
  'md': 6,
  'lg': 8,
  'xl': 12,
  '2xl': 16,
  '3xl': 24,
  'full': 9999
};

// Shadow Tokens
export const SHADOWS: Record<string, {
  offset: { x: number; y: number };
  radius: number;
  spread: number;
  color: FigmaColor;
}> = {
  'sm': {
    offset: { x: 0, y: 1 },
    radius: 2,
    spread: 0,
    color: { r: 0, g: 0, b: 0, a: 0.05 }
  },
  'DEFAULT': {
    offset: { x: 0, y: 2 },
    radius: 4,
    spread: -1,
    color: { r: 0, g: 0, b: 0, a: 0.1 }
  },
  'md': {
    offset: { x: 0, y: 4 },
    radius: 6,
    spread: -2,
    color: { r: 0, g: 0, b: 0, a: 0.1 }
  },
  'lg': {
    offset: { x: 0, y: 8 },
    radius: 10,
    spread: -3,
    color: { r: 0, g: 0, b: 0, a: 0.1 }
  },
  'xl': {
    offset: { x: 0, y: 12 },
    radius: 14,
    spread: -4,
    color: { r: 0, g: 0, b: 0, a: 0.1 }
  }
};

// Gradient Transform Tokens
export const GRADIENT_TRANSFORMS = {
  'to-t': [[1, 0, 0], [0, -1, 1]],
  'to-r': [[1, 0, 0], [0, 1, 0]],
  'to-b': [[1, 0, 0], [0, 1, 0]],
  'to-l': [[-1, 0, 1], [0, 1, 0]],
  'to-tr': [[0.7071, -0.7071, 0], [0.7071, 0.7071, 0]],
  'to-tl': [[-0.7071, -0.7071, 1], [0.7071, -0.7071, 0]],
  'to-br': [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0]],
  'to-bl': [[-0.7071, 0.7071, 1], [-0.7071, -0.7071, 1]]
} as const; 

export const TEXT_ALIGNMENTS = {
  'left': 'LEFT',
  'center': 'CENTER',
  'right': 'RIGHT',
  'justify': 'JUSTIFIED'
} as const;

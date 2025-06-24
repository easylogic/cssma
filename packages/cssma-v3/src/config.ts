/**
 * 기본 설정 및 프리셋 정의
 * 
 * Tailwind CSS v4 스타일 테마 시스템 구현
 * - OKLCH 색상 공간 사용으로 더 생생한 색상 구현
 * - @theme 방식의 CSS 변수 시스템
 * - 최신 웹 표준 준수 (color-mix, cascade layers 등)
 */

import { Config, DesignPreset, Color, ColorPalette } from './types';

/**
 * 기본 설정 (Tailwind v4 표준)
 */
export const DEFAULT_CONFIG: Config = {
  prefix: '',
  separator: ':',
  important: false,
  enableArbitraryValues: true,
  enableStateModifiers: true,
  enableResponsiveModifiers: true,
  // v4 새로운 설정
  colorFormat: 'oklch', // 'rgb' | 'hsl' | 'oklch'
  outputCSSVariables: true, // CSS 변수로 출력할지 여부
};

/**
 * Tailwind v4 OKLCH 색상 팔레트
 * 더 생생하고 일관된 색상을 위해 OKLCH 색상 공간 사용
 */
const DEFAULT_COLORS_V4: ColorPalette = {
  // Neutral Colors
  slate: {
    '50': { l: 0.984, c: 0.003, h: 247.858 },
    '100': { l: 0.968, c: 0.007, h: 247.896 },
    '200': { l: 0.929, c: 0.013, h: 255.508 },
    '300': { l: 0.869, c: 0.022, h: 252.894 },
    '400': { l: 0.704, c: 0.04, h: 256.788 },
    '500': { l: 0.554, c: 0.046, h: 257.417 },
    '600': { l: 0.446, c: 0.043, h: 257.281 },
    '700': { l: 0.372, c: 0.044, h: 257.287 },
    '800': { l: 0.279, c: 0.041, h: 260.031 },
    '900': { l: 0.208, c: 0.042, h: 265.755 },
    '950': { l: 0.129, c: 0.042, h: 264.695 },
  },
  gray: {
    '50': { l: 0.985, c: 0.002, h: 247.839 },
    '100': { l: 0.967, c: 0.003, h: 264.542 }, // #f4f4f4 실제 값과 일치
    '200': { l: 0.928, c: 0.006, h: 264.531 }, // #e5e5e5 실제 값과 일치
    '300': { l: 0.872, c: 0.01, h: 258.338 },
    '400': { l: 0.707, c: 0.022, h: 261.325 },
    '500': { l: 0.551, c: 0.027, h: 264.364 },
    '600': { l: 0.446, c: 0.03, h: 256.802 },
    '700': { l: 0.373, c: 0.034, h: 259.733 },
    '800': { l: 0.278, c: 0.033, h: 256.848 },
    '900': { l: 0.21, c: 0.034, h: 264.665 },
    '950': { l: 0.13, c: 0.028, h: 261.692 },
  },
  // Primary Colors - Blue (더 생생한 OKLCH 버전)
  blue: {
    '50': { l: 0.97, c: 0.014, h: 254.604 },
    '100': { l: 0.932, c: 0.032, h: 255.585 },
    '200': { l: 0.882, c: 0.059, h: 254.128 },
    '300': { l: 0.809, c: 0.105, h: 251.813 },
    '400': { l: 0.707, c: 0.165, h: 254.624 },
    '500': { l: 0.623, c: 0.214, h: 259.815 }, // #3b82f6 OKLCH 등가값
    '600': { l: 0.546, c: 0.245, h: 262.881 },
    '700': { l: 0.488, c: 0.243, h: 264.376 },
    '800': { l: 0.424, c: 0.199, h: 265.638 },
    '900': { l: 0.379, c: 0.146, h: 265.522 },
    '950': { l: 0.282, c: 0.091, h: 267.935 },
  },
  // Secondary Colors - Red
  red: {
    '50': { l: 0.971, c: 0.013, h: 17.38 },
    '100': { l: 0.936, c: 0.032, h: 17.717 },
    '200': { l: 0.885, c: 0.062, h: 18.334 },
    '300': { l: 0.808, c: 0.114, h: 19.571 },
    '400': { l: 0.704, c: 0.191, h: 22.216 },
    '500': { l: 0.637, c: 0.237, h: 25.331 },
    '600': { l: 0.577, c: 0.245, h: 27.325 },
    '700': { l: 0.505, c: 0.213, h: 27.518 },
    '800': { l: 0.444, c: 0.177, h: 26.899 },
    '900': { l: 0.396, c: 0.141, h: 25.723 },
    '950': { l: 0.258, c: 0.092, h: 26.042 },
  },
  // Green
  green: {
    '50': { l: 0.982, c: 0.018, h: 155.826 },
    '100': { l: 0.962, c: 0.044, h: 156.743 },
    '200': { l: 0.925, c: 0.084, h: 155.995 },
    '300': { l: 0.871, c: 0.15, h: 154.449 },
    '400': { l: 0.792, c: 0.209, h: 151.711 },
    '500': { l: 0.723, c: 0.219, h: 149.579 },
    '600': { l: 0.627, c: 0.194, h: 149.214 },
    '700': { l: 0.527, c: 0.154, h: 150.069 },
    '800': { l: 0.448, c: 0.119, h: 151.328 },
    '900': { l: 0.393, c: 0.095, h: 152.535 },
    '950': { l: 0.266, c: 0.065, h: 152.934 },
  },
  // Orange, Yellow, Purple 등 추가 색상들도 OKLCH로 변환
  orange: {
    '50': { l: 0.98, c: 0.016, h: 73.684 },
    '100': { l: 0.954, c: 0.038, h: 75.164 },
    '200': { l: 0.901, c: 0.076, h: 70.697 },
    '300': { l: 0.837, c: 0.128, h: 66.29 },
    '400': { l: 0.75, c: 0.183, h: 55.934 },
    '500': { l: 0.705, c: 0.213, h: 47.604 },
    '600': { l: 0.646, c: 0.222, h: 41.116 },
    '700': { l: 0.553, c: 0.195, h: 38.402 },
    '800': { l: 0.47, c: 0.157, h: 37.304 },
    '900': { l: 0.408, c: 0.123, h: 38.172 },
    '950': { l: 0.266, c: 0.079, h: 36.259 },
  },
  // 추가 색상들...
  zinc: {
    '50': { l: 0.985, c: 0, h: 0 },
    '100': { l: 0.967, c: 0.001, h: 286.375 },
    '200': { l: 0.92, c: 0.004, h: 286.32 },
    '300': { l: 0.871, c: 0.006, h: 286.286 },
    '400': { l: 0.705, c: 0.015, h: 286.067 },
    '500': { l: 0.552, c: 0.016, h: 285.938 },
    '600': { l: 0.442, c: 0.017, h: 285.786 },
    '700': { l: 0.37, c: 0.013, h: 285.805 },
    '800': { l: 0.274, c: 0.006, h: 286.033 },
    '900': { l: 0.21, c: 0.006, h: 285.885 },
    '950': { l: 0.141, c: 0.005, h: 285.823 },
  },
};

/**
 * 기본 프리셋
 */
export const DEFAULT_PRESET: DesignPreset = {
  name: 'default',
  version: '3.0.0',
  colors: DEFAULT_COLORS_V4,
  spacing: {
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
    '16': 64,
    '20': 80,
    '24': 96,
    '32': 128,
    '40': 160,
    '48': 192,
    '56': 224,
    '64': 256,
  },
  typography: {
    fontSize: {
      'xs': 12,
      'sm': 14,
      'base': 16,
      'lg': 18,
      'xl': 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
      '8xl': 96,
      '9xl': 128,
    },
    fontWeight: {
      'thin': 100,
      'extralight': 200,
      'light': 300,
      'normal': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
      'extrabold': 800,
      'black': 900,
    },
    lineHeight: {
      'none': 1,
      'tight': 1.25,
      'snug': 1.375,
      'normal': 1.5,
      'relaxed': 1.625,
      'loose': 2,
    },
    letterSpacing: {
      'tighter': -0.8,
      'tight': -0.4,
      'normal': 0,
      'wide': 0.4,
      'wider': 0.8,
      'widest': 1.6,
    },
    fontFamily: {
      'sans': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      'serif': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },
  effects: {
    boxShadow: {
      'none': 'none',
      'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
    textShadow: {
      'none': 'none',
      'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
      'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
      'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
      'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      '2xl': '0 25px 50px rgba(0, 0, 0, 0.1)',
      'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    blur: {
      'none': 0,
      'sm': 4,
      'default': 8,
      'md': 12,
      'lg': 16,
      'xl': 24,
      '2xl': 40,
      '3xl': 64,
    },
    brightness: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    contrast: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    grayscale: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    saturate: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    dropShadow: {
      'none': 'none',
      'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
      'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
      'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
      'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      '2xl': '0 25px 50px rgba(0, 0, 0, 0.1)',
    },
    opacity: {
      '0': 0,
      '5': 0.05,
      '10': 0.1,
      '20': 0.2,
      '25': 0.25,
      '30': 0.3,
      '40': 0.4,
      '50': 0.5,
      '60': 0.6,
      '70': 0.7,
      '75': 0.75,
      '80': 0.8,
      '90': 0.9,
      '95': 0.95,
      '100': 1,
    },
    borderRadius: {
      'none': 0,
      'sm': 2,
      'default': 4,
      'md': 6,
      'lg': 8,
      'xl': 12,
      '2xl': 16,
      '3xl': 24,
      'full': 9999,
    },
  },
  layout: {
    width: {
      'auto': 'auto',
      'full': '100%',
      'screen': '100vw',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    height: {
      'auto': 'auto',
      'full': '100%',
      'screen': '100vh',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    maxWidth: {
      'none': 'none',
      'xs': 320,
      'sm': 384,
      'md': 448,
      'lg': 512,
      'xl': 576,
      '2xl': 672,
      '3xl': 768,
      '4xl': 896,
      '5xl': 1024,
      '6xl': 1152,
      '7xl': 1280,
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
      'prose': 672,
    },
    maxHeight: {
      'none': 'none',
      'full': '100%',
      'screen': '100vh',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    minWidth: {
      '0': 0,
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    minHeight: {
      '0': 0,
      'full': '100%',
      'screen': '100vh',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
  },
  animation: {
    presets: {
      'spin': {
        name: 'spin',
        duration: 1000,
        timingFunction: 'linear',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'rotate(0deg)' },
          { offset: 1, transform: 'rotate(360deg)' },
        ],
      },
      'ping': {
        name: 'ping',
        duration: 1000,
        timingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'scale(1)', opacity: 1 },
          { offset: 0.5, opacity: 0.5 },
          { offset: 1, transform: 'scale(2)', opacity: 0 },
        ],
      },
      'pulse': {
        name: 'pulse',
        duration: 2000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, opacity: 1 },
          { offset: 0.5, opacity: 0.5 },
          { offset: 1, opacity: 1 },
        ],
      },
      'bounce': {
        name: 'bounce',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          { offset: 0.5, transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
          { offset: 1, transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
        ],
      },
      'wiggle': {
        name: 'wiggle',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'rotate(-3deg)' },
          { offset: 0.5, transform: 'rotate(3deg)' },
          { offset: 1, transform: 'rotate(-3deg)' },
        ],
      },
      'fade-in': {
        name: 'fade-in',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, opacity: 0 },
          { offset: 1, opacity: 1 },
        ],
      },
      'fade-out': {
        name: 'fade-out',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, opacity: 1 },
          { offset: 1, opacity: 0 },
        ],
      },
      'slide-in': {
        name: 'slide-in',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'translateX(-100%)' },
          { offset: 1, transform: 'translateX(0)' },
        ],
      },
      'slide-out': {
        name: 'slide-out',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'translateX(0)' },
          { offset: 1, transform: 'translateX(100%)' },
        ],
      },
      'zoom-in': {
        name: 'zoom-in',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'scale(0.5)' },
          { offset: 1, transform: 'scale(1)' },
        ],
      },
      'zoom-out': {
        name: 'zoom-out',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'scale(1)' },
          { offset: 1, transform: 'scale(0.5)' },
        ],
      },
      'bounce-in': {
        name: 'bounce-in',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'translateY(-25%)' },
          { offset: 0.5, transform: 'translateY(0)' },
          { offset: 1, transform: 'translateY(-25%)' },
        ],
      },
      'bounce-out': {
        name: 'bounce-out',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'translateY(0)' },
          { offset: 1, transform: 'translateY(25%)' },
        ],
      },
      'flip': {
        name: 'flip',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 1,
        keyframes: [
          { offset: 0, transform: 'rotateY(0deg)' },
          { offset: 0.5, transform: 'rotateY(180deg)' },
          { offset: 1, transform: 'rotateY(360deg)' },
        ],
      },
      'shake': {
        name: 'shake',
        duration: 1000,
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'translateX(0)' },
          { offset: 0.1, transform: 'translateX(-10px)' },
          { offset: 0.2, transform: 'translateX(10px)' },
          { offset: 0.3, transform: 'translateX(-10px)' },
          { offset: 0.4, transform: 'translateX(10px)' },
          { offset: 0.5, transform: 'translateX(0)' },
        ],
      },
    },
    durations: {
      '75': 75,
      '100': 100,
      '150': 150,
      '200': 200,
      '300': 300,
      '500': 500,
      '700': 700,
      '1000': 1000,
    },
    easings: {
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      'back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      'quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
    },
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  borders: {
    borderWidth: {
      'none': '0',
      'default': '1px',
      'sm': '2px',
      'md': '4px',
      'lg': '8px',
      'xl': '12px',
      '2xl': '16px',
      '3xl': '24px',
      '4xl': '32px',
      '5xl': '40px',
      '6xl': '48px',
      '7xl': '56px',
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      'default': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      'full': '9999px',
    },
    borderStyle: {
      'none': 'none',
      'solid': 'solid',
      'dashed': 'dashed',
      'dotted': 'dotted',
      'double': 'double',
    },
  },
  backgrounds: {
    backgroundImage: {
      'none': 'none',
      'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
      'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    },
    gradients: {
      'none': 'transparent',
      'current': 'currentColor',
    },
  },
  
  transitions: {
    property: {
      'none': 'none',
      'all': 'all',
      'default': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      'opacity': 'opacity',
      'shadow': 'box-shadow',
      'transform': 'transform',
    },
    duration: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
    timingFunction: {
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    delay: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
  },
  
  transforms: {
    scale: {
      '0': '0',
      '50': '.5',
      '75': '.75',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
    },
    rotate: {
      '0': '0deg',
      '1': '1deg',
      '2': '2deg',
      '3': '3deg',
      '6': '6deg',
      '12': '12deg',
      '45': '45deg',
      '90': '90deg',
      '180': '180deg',
    },
    translate: {
      '0': '0px',
      '0.5': '2px',
      '1': '4px',
      '1.5': '6px',
      '2': '8px',
      '2.5': '10px',
      '3': '12px',
      '4': '16px',
      '6': '24px',
      '8': '32px',
      '12': '48px',
      '16': '64px',
      '24': '96px',
      '32': '128px',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '3/4': '75%',
      'full': '100%',
    },
    skew: {
      '0': '0deg',
      '1': '1deg',
      '2': '2deg',
      '3': '3deg',
      '6': '6deg',
      '12': '12deg',
    },
  },
      
  // Tailwind CSS v4.1 새로운 기능들 추가
  textShadow: {
    'sm': '1px 1px 2px rgba(0, 0, 0, 0.3)',
    'default': '2px 2px 4px rgba(0, 0, 0, 0.3)',
    'md': '3px 3px 6px rgba(0, 0, 0, 0.3)',
    'lg': '4px 4px 8px rgba(0, 0, 0, 0.3)',
    'xl': '5px 5px 10px rgba(0, 0, 0, 0.3)',
    'none': 'none',
  },
  
  fontStretch: {
    'ultra-condensed': 'ultra-condensed',
    'extra-condensed': 'extra-condensed',
    'condensed': 'condensed',
    'semi-condensed': 'semi-condensed',
    'normal': 'normal',
    'semi-expanded': 'semi-expanded',
    'expanded': 'expanded',
    'extra-expanded': 'extra-expanded',
    'ultra-expanded': 'ultra-expanded',
  },

  mask: {
    'none': 'none',
    'linear-gradient': 'linear-gradient(to bottom, black 0%, transparent 100%)',
    'radial-gradient': 'radial-gradient(circle, black 50%, transparent 70%)',
  },

  accentColor: {
    'auto': 'auto',
    'inherit': 'inherit',
    'current': 'currentColor',
    'transparent': 'transparent',
    'blue': '#3b82f6',
    'red': '#ef4444',
    'green': '#10b981',
    'yellow': '#f59e0b',
    'purple': '#8b5cf6',
  },

  fieldSizing: {
    'content': 'content',
    'fixed': 'fixed',
  },

  scrollBehavior: {
    'auto': 'auto',
    'smooth': 'smooth',
  },

  scrollSnapType: {
    'none': 'none',
    'x': 'x mandatory',
    'y': 'y mandatory',
    'both': 'both mandatory',
    'x-proximity': 'x proximity',
    'y-proximity': 'y proximity',
  },

  scrollSnapAlign: {
    'start': 'start',
    'end': 'end',
    'center': 'center',
    'none': 'none',
  },

  viewTransitionName: {
    'none': 'none',
    'auto': 'auto',
  },

  // Container Queries 확장
  containerType: {
    'normal': 'normal',
    'size': 'size',
    'inline-size': 'inline-size',
  },

  // Logical Properties 확장
  logicalProperties: {
    'block-start': 'block-start',
    'block-end': 'block-end',
    'inline-start': 'inline-start',
    'inline-end': 'inline-end',
  },

  // Safe/Unsafe Alignment
  safeAlignment: {
    'safe-start': 'safe start',
    'safe-end': 'safe end',
    'safe-center': 'safe center',
    'unsafe-start': 'unsafe start',
    'unsafe-end': 'unsafe end',
    'unsafe-center': 'unsafe center',
  },

  // Pointer 변형자
  pointerVariants: {
    'pointer-fine': '@media (pointer: fine)',
    'pointer-coarse': '@media (pointer: coarse)',
    'any-pointer-fine': '@media (any-pointer: fine)',
    'any-pointer-coarse': '@media (any-pointer: coarse)',
  },

  // Grid Subgrid 지원
  gridTemplateSubgrid: {
    'subgrid': 'subgrid',
    'masonry': 'masonry',
  },

};

/**
 * 최소 프리셋 - 기본 프리셋보다 간소화된 버전
 */
export const MINIMAL_PRESET: DesignPreset = {
  name: 'minimal',
  version: '3.0.0',
  colors: {
    blue: {
      '500': { r: 0.25, g: 0.53, b: 0.94 },
    },
    red: {
      '500': { r: 0.94, g: 0.25, b: 0.25 },
    },
    green: {
      '500': { r: 0.25, g: 0.8, b: 0.25 },
    },
  },
  spacing: {
    '0': 0,
    '1': 4,
    '2': 8,
    '4': 16,
    '8': 32,
  },
  typography: {
    fontSize: {
      'sm': 14,
      'base': 16,
      'lg': 18,
    },
    fontWeight: {
      'normal': 400,
      'bold': 700,
    },
    lineHeight: {
      'normal': 1.5,
    },
    letterSpacing: {
      'normal': 0,
    },
    fontFamily: {
      'sans': 'system-ui, sans-serif',
    },
  },
  effects: {
    boxShadow: {
      'none': 'none',
      'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    textShadow: {
      'none': 'none',
      'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    blur: {
      'none': 0,
      'default': 8,
    },
    brightness: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    contrast: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    grayscale: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    saturate: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    dropShadow: {
      'none': 'none',
      'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    opacity: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    borderRadius: {
      'none': 0,
      'default': 4,
    },
  },
  layout: {
    width: {
      'auto': 'auto',
      'full': '100%',
    },
    height: {
      'auto': 'auto',
      'full': '100%',
    },
    maxWidth: {
      'none': 'none',
      'full': '100%',
    },
    maxHeight: {
      'none': 'none',
      'full': '100%',
    },
    minWidth: {
      '0': 0,
      'full': '100%',
    },
    minHeight: {
      '0': 0,
      'full': '100%',
    },
  },
  animation: {
    presets: {
      'spin': {
        name: 'spin',
        duration: 1000,
        timingFunction: 'linear',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, transform: 'rotate(0deg)' },
          { offset: 1, transform: 'rotate(360deg)' },
        ],
      },
    },
    durations: {
      '300': 300,
      '500': 500,
    },
    easings: {
      'linear': 'linear',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  borders: {
    borderWidth: {
      'none': '0',
      'default': '1px',
      'sm': '2px',
    },
    borderRadius: {
      'none': '0',
      'default': '0.25rem',
      'md': '0.375rem',
    },
    borderStyle: {
      'none': 'none',
      'solid': 'solid',
      'dashed': 'dashed',
    },
  },
  backgrounds: {
    backgroundImage: {
      'none': 'none',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
    },
    gradients: {
      'none': 'transparent',
      'current': 'currentColor',
    },
  },
  transitions: {
    property: {
      'none': 'none',
      'all': 'all',
      'default': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    },
    duration: {
      '150': '150ms',
      '300': '300ms',
      '500': '500ms',
    },
    timingFunction: {
      'linear': 'linear',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    delay: {
      '75': '75ms',
      '150': '150ms',
      '300': '300ms',
    },
  },
  transforms: {
    scale: {
      '50': '.5',
      '100': '1',
      '150': '1.5',
    },
    rotate: {
      '0': '0deg',
      '45': '45deg',
      '90': '90deg',
    },
    translate: {
      '0': '0px',
      '1': '4px',
      '2': '8px',
    },
    skew: {
      '0': '0deg',
      '1': '1deg',
      '2': '2deg',
    },
  },
};

/**
 * Figma에 최적화된 프리셋
 */
export const FIGMA_OPTIMIZED_PRESET: DesignPreset = {
  ...DEFAULT_PRESET,
  name: 'figma-optimized',
  version: '3.0.0',
};

/**
 * 설정을 로드합니다.
 * @param customConfig 사용자 정의 설정 (선택 사항)
 * @returns 병합된 설정 객체
 */
export function loadConfig(customConfig: Partial<Config> = {}): Config {
  return {
    ...DEFAULT_CONFIG,
    ...customConfig,
  };
}

/**
 * 프리셋을 로드합니다.
 * @param presetOrName 프리셋 이름 또는 커스텀 프리셋 객체 (선택 사항)
 * @returns 프리셋 객체
 */
export function loadPreset(presetOrName: string | Partial<DesignPreset> = 'default'): DesignPreset {
  // 문자열인 경우 기본 프리셋들 중에서 선택
  if (typeof presetOrName === 'string') {
    switch (presetOrName) {
      case 'minimal':
        return MINIMAL_PRESET;
      case 'figma-optimized':
        return FIGMA_OPTIMIZED_PRESET;
      case 'default':
      default:
        return DEFAULT_PRESET;
    }
  }
  
  // 객체인 경우 기본 프리셋과 병합
  return mergeConfigs(DEFAULT_PRESET, presetOrName);
}

/**
 * 딥 머지 유틸리티 함수
 * @param target 대상 객체
 * @param source 소스 객체
 * @returns 병합된 객체
 */
export function mergeConfigs<T extends Record<string, any>>(target: T, source?: Partial<T>): T {
  if (!source) return target;

  const result = { ...target } as any;
  
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];
    
    if (Array.isArray(sourceValue)) {
      // 배열은 완전히 덮어씌움
      result[key] = sourceValue;
    } else if (sourceValue && typeof sourceValue === 'object' && targetValue && typeof targetValue === 'object') {
      // 객체는 재귀적으로 병합
      result[key] = mergeConfigs(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      // 원시 값은 덮어씌움
      result[key] = sourceValue;
    }
  }
  
  return result as T;
}

/**
 * Tailwind v4 색상 변환 유틸리티
 */
export class ColorUtils {
  /**
   * OKLCH 색상을 RGB로 변환
   */
  static oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
    // OKLCH → RGB 변환 (간단한 근사치 구현)
    // 실제 구현에서는 더 정확한 색상 변환 라이브러리를 사용해야 함
    
    // L (명도): 0-1 범위
    // C (채도): 0-0.4 범위 (일반적)
    // H (색조): 0-360도
    
    const radH = (h * Math.PI) / 180;
    
    // LAB 색상 공간으로 중간 변환
    const a = c * Math.cos(radH);
    const b = c * Math.sin(radH);
    
    // LAB → XYZ 변환 (D65 illuminant)
    const y = (l + 0.16) / 1.16;
    const x = a / 5 + y;
    const z = y - b / 2;
    
    // XYZ → sRGB 변환
    let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let blue = x * 0.0557 + y * -0.2040 + z * 1.0570;
    
    // 감마 보정
    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
    blue = blue > 0.0031308 ? 1.055 * Math.pow(blue, 1 / 2.4) - 0.055 : 12.92 * blue;
    
    // 0-1 범위로 클램프
    r = Math.max(0, Math.min(1, r));
    g = Math.max(0, Math.min(1, g));
    blue = Math.max(0, Math.min(1, blue));
    
    return { r, g, b };
  }
  
  /**
   * RGB 값을 헥스 코드로 변환
   */
  static rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  
  /**
   * 색상 이름에서 실제 헥스 값 가져오기
   */
  static getColorValue(colorName: string, preset: DesignPreset, config: Config): string {
    // 기본 색상들
    if (colorName === 'black') return '#000000';
    if (colorName === 'white') return '#ffffff';
    if (colorName === 'transparent') return 'transparent';
    if (colorName === 'current') return 'currentColor';
    
    // 색상-shade 패턴 파싱 (예: blue-500, gray-100)
    const match = colorName.match(/^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\\d{2,3})$/);
    
    if (match && preset?.colors) {
      const [, colorFamily, shade] = match;
      const colorData = preset.colors[colorFamily]?.[shade];
      
      if (colorData) {
        // OKLCH 형식인지 확인
        if ('l' in colorData && 'c' in colorData && 'h' in colorData) {
          const rgb = this.oklchToRgb(colorData.l, colorData.c, colorData.h);
          return this.rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        // 기존 RGB 형식 지원
        else if ('r' in colorData && 'g' in colorData && 'b' in colorData) {
          return this.rgbToHex(colorData.r, colorData.g, colorData.b);
        }
      }
    }
    
    // CSS 변수 출력 여부에 따라 결정
    if (config.outputCSSVariables) {
      return `var(--color-${colorName.replace('-', '-')})`;
    }
    
    // 기본값: CSS 변수 형태로 반환
    return `var(--color-${colorName})`;
  }
  
  /**
   * OKLCH 색상을 CSS oklch() 함수로 변환
   */
  static oklchToCSS(l: number, c: number, h: number): string {
    return `oklch(${l} ${c} ${h})`;
  }
  
  /**
   * 색상 형식에 따른 최적 출력 생성
   */
  static formatColor(colorName: string, preset: DesignPreset, config: Config): string {
    const format = config.colorFormat || 'oklch';
    
    // 기본 색상들은 그대로 반환
    if (['black', 'white', 'transparent', 'current'].includes(colorName)) {
      return this.getColorValue(colorName, preset, config);
    }
    
    const match = colorName.match(/^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\\d{2,3})$/);
    
    if (match && preset?.colors) {
      const [, colorFamily, shade] = match;
      const colorData = preset.colors[colorFamily]?.[shade];
      
      if (colorData && 'l' in colorData) {
        switch (format) {
          case 'oklch':
            return this.oklchToCSS(colorData.l, colorData.c, colorData.h);
          case 'rgb': {
            const rgb = this.oklchToRgb(colorData.l, colorData.c, colorData.h);
            return `rgb(${Math.round(rgb.r * 255)} ${Math.round(rgb.g * 255)} ${Math.round(rgb.b * 255)})`;
          }
          case 'hex':
          default: {
            const rgb = this.oklchToRgb(colorData.l, colorData.c, colorData.h);
            return this.rgbToHex(rgb.r, rgb.g, rgb.b);
          }
        }
      }
    }
    
    return this.getColorValue(colorName, preset, config);
  }
} 
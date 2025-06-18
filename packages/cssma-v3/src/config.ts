/**
 * 기본 설정 및 프리셋 정의
 */

import { Config, DesignPreset, Color } from './types';

/**
 * 기본 설정
 */
export const DEFAULT_CONFIG: Config = {
  prefix: '',
  separator: ':',
  important: false,
  enableArbitraryValues: true,
  enableStateModifiers: true,
  enableResponsiveModifiers: true,
};

/**
 * 기본 색상 팔레트
 */
const DEFAULT_COLORS: Record<string, Record<string, Color>> = {
  blue: {
    '50': { r: 0.94, g: 0.97, b: 1 },
    '100': { r: 0.88, g: 0.93, b: 1 },
    '200': { r: 0.75, g: 0.86, b: 0.99 },
    '300': { r: 0.58, g: 0.77, b: 0.98 },
    '400': { r: 0.38, g: 0.65, b: 0.96 },
    '500': { r: 0.25, g: 0.53, b: 0.94 },
    '600': { r: 0.16, g: 0.44, b: 0.87 },
    '700': { r: 0.15, g: 0.35, b: 0.75 },
    '800': { r: 0.15, g: 0.28, b: 0.62 },
    '900': { r: 0.15, g: 0.24, b: 0.51 },
  },
  red: {
    '50': { r: 1, g: 0.94, b: 0.94 },
    '100': { r: 1, g: 0.88, b: 0.88 },
    '200': { r: 0.99, g: 0.73, b: 0.73 },
    '300': { r: 0.98, g: 0.58, b: 0.58 },
    '400': { r: 0.96, g: 0.38, b: 0.38 },
    '500': { r: 0.94, g: 0.25, b: 0.25 },
    '600': { r: 0.87, g: 0.16, b: 0.16 },
    '700': { r: 0.75, g: 0.15, b: 0.15 },
    '800': { r: 0.62, g: 0.15, b: 0.15 },
    '900': { r: 0.51, g: 0.15, b: 0.15 },
  },
  green: {
    '50': { r: 0.94, g: 0.99, b: 0.94 },
    '100': { r: 0.88, g: 0.97, b: 0.88 },
    '200': { r: 0.73, g: 0.94, b: 0.73 },
    '300': { r: 0.58, g: 0.91, b: 0.58 },
    '400': { r: 0.38, g: 0.86, b: 0.38 },
    '500': { r: 0.25, g: 0.8, b: 0.25 },
    '600': { r: 0.16, g: 0.73, b: 0.16 },
    '700': { r: 0.15, g: 0.63, b: 0.15 },
    '800': { r: 0.15, g: 0.52, b: 0.15 },
    '900': { r: 0.15, g: 0.42, b: 0.15 },
  },
};

/**
 * 기본 프리셋
 */
export const DEFAULT_PRESET: DesignPreset = {
  name: 'default',
  version: '3.0.0',
  colors: DEFAULT_COLORS,
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
    boxShadow: {
      'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      'none': 'none',
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
    },
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
    borderRadius: {
      'none': 0,
      'default': 4,
    },
    boxShadow: {
      'none': 'none',
      'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    opacity: {
      '0': 0,
      '50': 0.5,
      '100': 1,
    },
    blur: {
      'none': 0,
      'default': 8,
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
import { CssmaTheme, CssmaPreset, CssmaConfig } from '../theme-types';
import { defaultColorPalette } from './color-palette';

// 1. Default Theme (색상 팔레트 분리 적용)
export const defaultTheme: CssmaTheme = {
  colors: defaultColorPalette,
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  textSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  breakpoints: {
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem',
    '2xl': '96rem',
  },
  radius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    25: '0.25',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    75: '0.75',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1',
  },
  // ... 기타 네임스페이스도 필요시 추가
};

// 2. Default Preset
export const defaultPreset: CssmaPreset = {
  name: 'default',
  theme: defaultTheme,
  description: 'Cssma 기본 프리셋',
};

// 3. Default Config
export const defaultConfig: CssmaConfig = {
  mode: 'jit',
  prefix: '',
  corePlugins: ['colors', 'spacing', 'fontFamily'],
  presets: [defaultPreset],
  theme: defaultTheme,
};

// 4. 확장/생성 유틸리티
export function createTheme(base: CssmaTheme, override?: Partial<CssmaTheme>): CssmaTheme {
  return { ...base, ...override };
}

export function extendTheme(theme: CssmaTheme, extension: Partial<CssmaTheme>): CssmaTheme {
  return { ...theme, ...extension };
}

export function createPreset(name: string, theme: CssmaTheme, options?: Partial<CssmaPreset>): CssmaPreset {
  return { name, theme, ...options };
}

export function extendPreset(preset: CssmaPreset, extension: Partial<CssmaPreset>): CssmaPreset {
  return { ...preset, ...extension };
}

export function createConfig(base: CssmaConfig, override?: Partial<CssmaConfig>): CssmaConfig {
  return { ...base, ...override };
}

export function extendConfig(config: CssmaConfig, extension: Partial<CssmaConfig>): CssmaConfig {
  return { ...config, ...extension };
} 
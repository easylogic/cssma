/**
 * CSSMA Preset System Types
 * 모든 preset이 따라야 할 핵심 타입 정의
 */

// ============================================================================
// 🎨 Color System
// ============================================================================

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

export interface ColorPalette {
  // Neutral colors
  slate: ColorScale;
  gray: ColorScale;
  zinc: ColorScale;
  neutral: ColorScale;
  stone: ColorScale;
  
  // Brand colors
  red: ColorScale;
  orange: ColorScale;
  amber: ColorScale;
  yellow: ColorScale;
  lime: ColorScale;
  green: ColorScale;
  emerald: ColorScale;
  teal: ColorScale;
  cyan: ColorScale;
  sky: ColorScale;
  blue: ColorScale;
  indigo: ColorScale;
  violet: ColorScale;
  purple: ColorScale;
  fuchsia: ColorScale;
  pink: ColorScale;
  rose: ColorScale;
  
  // Special colors
  transparent: string;
  current: string;
  black: string;
  white: string;
  
  // Allow custom colors
  [key: string]: ColorScale | string;
}

// ============================================================================
// 📏 Spacing System
// ============================================================================

export interface SpacingScale {
  '0': string;
  'px': string;
  '0.5': string;
  '1': string;
  '1.5': string;
  '2': string;
  '2.5': string;
  '3': string;
  '3.5': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '96': string;
  
  // Allow custom spacing
  [key: string]: string;
}

// ============================================================================
// 📝 Typography System
// ============================================================================

export interface FontSizeConfig {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
}

export interface FontSizeScale {
  'xs': FontSizeConfig;
  'sm': FontSizeConfig;
  'base': FontSizeConfig;
  'lg': FontSizeConfig;
  'xl': FontSizeConfig;
  '2xl': FontSizeConfig;
  '3xl': FontSizeConfig;
  '4xl': FontSizeConfig;
  '5xl': FontSizeConfig;
  '6xl': FontSizeConfig;
  '7xl': FontSizeConfig;
  '8xl': FontSizeConfig;
  '9xl': FontSizeConfig;
  
  // Allow custom font sizes
  [key: string]: FontSizeConfig;
}

export interface FontWeightScale {
  'thin': string;
  'extralight': string;
  'light': string;
  'normal': string;
  'medium': string;
  'semibold': string;
  'bold': string;
  'extrabold': string;
  'black': string;
  
  // Allow custom font weights
  [key: string]: string;
}

export interface FontFamilyScale {
  'sans': string[];
  'serif': string[];
  'mono': string[];
  
  // Allow custom font families
  [key: string]: string[];
}

// ============================================================================
// 🎭 Effects System
// ============================================================================

export interface BorderRadiusScale {
  'none': string;
  'sm': string;
  '': string;
  'md': string;
  'lg': string;
  'xl': string;
  '2xl': string;
  '3xl': string;
  'full': string;
  
  // Allow custom border radius
  [key: string]: string;
}

export interface BoxShadowScale {
  'sm': string;
  '': string;
  'md': string;
  'lg': string;
  'xl': string;
  '2xl': string;
  'inner': string;
  'none': string;
  
  // Allow custom box shadows
  [key: string]: string;
}

export interface OpacityScale {
  '0': string;
  '5': string;
  '10': string;
  '20': string;
  '25': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '75': string;
  '80': string;
  '90': string;
  '95': string;
  '100': string;
  
  // Allow custom opacity values
  [key: string]: string;
}

// ============================================================================
// 📱 Responsive System
// ============================================================================

export interface BreakpointScale {
  'sm': string;
  'md': string;
  'lg': string;
  'xl': string;
  '2xl': string;
  
  // Allow custom breakpoints
  [key: string]: string;
}

// ============================================================================
// 🎯 Responsive Modifiers System
// ============================================================================

export interface ResponsiveModifierConfig {
  // Enable responsive variants for each breakpoint
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
  
  // Allow custom responsive modifiers
  [key: string]: boolean;
}

// ============================================================================
// 🌙 Dark Mode System
// ============================================================================

export interface DarkModeConfig {
  enabled: boolean;
  strategy: 'media' | 'class';
  className?: string; // default: 'dark'
  autoDetect?: boolean; // 시스템 설정 기반 자동 감지 (class 전략에서만 유효)
  fallback?: 'light' | 'dark'; // 자동 감지 실패 시 기본값
}

// ============================================================================
// 🎨 Advanced Modifier System
// ============================================================================

export interface AdvancedModifierConfig {
  // Motion preferences
  'motion-safe': boolean;
  'motion-reduce': boolean;
  
  // Contrast preferences
  'contrast-more': boolean;
  'contrast-less': boolean;
  
  // Color scheme preferences
  'prefers-dark': boolean;
  'prefers-light': boolean;
  
  // Reduced data preferences
  'prefers-reduced-data': boolean;
  
  // Transparency preferences
  'prefers-reduced-transparency': boolean;
  
  // Print styles
  print: boolean;
  
  // Screen reader
  'screen-reader': boolean;
  
  // Orientation
  portrait: boolean;
  landscape: boolean;
  
  // Allow custom advanced modifiers
  [key: string]: boolean;
}

// ============================================================================
// 🎯 Modifiers System
// ============================================================================

export interface ModifierConfig {
  // Interactive states
  hover: boolean;
  focus: boolean;
  'focus-within': boolean;
  'focus-visible': boolean;
  active: boolean;
  visited: boolean;
  target: boolean;
  
  // Form states
  checked: boolean;
  indeterminate: boolean;
  default: boolean;
  required: boolean;
  valid: boolean;
  invalid: boolean;
  'in-range': boolean;
  'out-of-range': boolean;
  'placeholder-shown': boolean;
  autofill: boolean;
  'read-only': boolean;
  
  // Structural states
  first: boolean;
  last: boolean;
  odd: boolean;
  even: boolean;
  'first-of-type': boolean;
  'last-of-type': boolean;
  empty: boolean;
  
  // Disabled state
  disabled: boolean;
  
  // Allow custom modifiers
  [key: string]: boolean;
}

// ============================================================================
// 🏗️ Layout System
// ============================================================================

export interface SizeScale extends SpacingScale {
  // Fractional sizes
  '1/2': string;
  '1/3': string;
  '2/3': string;
  '1/4': string;
  '2/4': string;
  '3/4': string;
  '1/5': string;
  '2/5': string;
  '3/5': string;
  '4/5': string;
  '1/6': string;
  '2/6': string;
  '3/6': string;
  '4/6': string;
  '5/6': string;
  '1/12': string;
  '2/12': string;
  '3/12': string;
  '4/12': string;
  '5/12': string;
  '6/12': string;
  '7/12': string;
  '8/12': string;
  '9/12': string;
  '10/12': string;
  '11/12': string;
  
  // Special sizes
  'auto': string;
  'full': string;
  'screen': string;
  'min': string;
  'max': string;
  'fit': string;
}

// ============================================================================
// 🎨 Core Preset Interface
// ============================================================================

export interface CSSMAPreset {
  // Metadata
  name: string;
  version: string;
  description?: string;
  
  // Color system
  colors: ColorPalette;
  
  // Spacing system
  spacing: SpacingScale;
  
  // Typography system
  fontSize: FontSizeScale;
  fontWeight: FontWeightScale;
  fontFamily: FontFamilyScale;
  lineHeight: Record<string, string>;
  letterSpacing: Record<string, string>;
  
  // Layout system
  width: SizeScale;
  height: SizeScale;
  maxWidth: Record<string, string>;
  maxHeight: Record<string, string>;
  minWidth: Record<string, string>;
  minHeight: Record<string, string>;
  
  // Effects system
  borderRadius: BorderRadiusScale;
  boxShadow: BoxShadowScale;
  opacity: OpacityScale;
  
  // Responsive system
  screens: BreakpointScale;
  
  // Modifiers system
  modifiers: ModifierConfig;
  
  // Responsive modifiers system
  responsiveModifiers: ResponsiveModifierConfig;
  
  // Dark mode configuration
  darkMode: DarkModeConfig;
  
  // Advanced modifiers
  advancedModifiers: AdvancedModifierConfig;
  
  // Extension point
  extend?: Partial<CSSMAPreset>;
}

// ============================================================================
// 🔧 Utility Types
// ============================================================================

export type PresetKey = keyof CSSMAPreset;
export type ColorKey = keyof ColorPalette;
export type SpacingKey = keyof SpacingScale;
export type FontSizeKey = keyof FontSizeScale;
export type BreakpointKey = keyof BreakpointScale;
export type ModifierKey = keyof ModifierConfig;

// ============================================================================
// 📦 Preset Loader Types
// ============================================================================

export interface PresetLoaderOptions {
  preset: string | CSSMAPreset;
  extend?: Partial<CSSMAPreset> | undefined;
  cache?: boolean;
}

export interface LoadedPreset {
  preset: CSSMAPreset;
  metadata: {
    loadTime: number;
    source: 'builtin' | 'custom';
    cached: boolean;
  };
} 
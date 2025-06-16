/**
 * CSSMA v2 - Main Entry Point
 * 완전히 새로운 아키텍처의 CSS-to-Figma 브리지
 */

// ============================================================================
// 🎯 Core Engine
// ============================================================================
export { CSSMAEngine, createCSSMA, cssma } from './engine';

// ============================================================================
// 🔧 Core Components
// ============================================================================
export { UnifiedParser } from './parser';
export { UnifiedConverter } from './converter';
export { PresetLoader, loadTailwindV4Preset } from './config/preset-loader';
export { tailwindV4Preset } from './config/presets/tailwind-v4';

// ============================================================================
// 📦 Presets
// ============================================================================
export { tailwindV3Preset, tailwindV4Preset } from './config/presets';
export { createPreset, loadPreset, loadTailwindPreset, loadTailwindV4Preset } from './config/preset-loader';

// ============================================================================
// 📝 Types
// ============================================================================
export type {
  // Configuration
  CSSMAConfig,
  CSSMAPreset,
  
  // Core Data Structures
  ParsedStyles,
  FigmaProperties,
  
  // Style Categories
  SpacingStyles,
  ColorStyles,
  TypographyStyles,
  LayoutStyles,
  EffectStyles,
  
  // Detailed Types
  SpacingScale,
  ColorPalette,
  ColorShades,
  FigmaColor,
  BoxSpacing,
  GapSpacing,
  
  // Typography
  TypographyScale,
  FontSizeScale,
  FontWeightScale,
  LineHeightScale,
  LetterSpacingScale,
  FontFamilyScale,
  
  // Effects
  EffectsScale,
  BorderRadiusScale,
  BoxShadowScale,
  BoxShadowValue,
  OpacityScale,
  BlurScale,
  
  // Layout
  LayoutScale,
  SizeScale,
  
  // Figma API Types
  Paint,
  RGB,
  RGBA,
  Effect,
  Vector2,
  LineHeight,
  LetterSpacing,
  FontName,
  
  // Utility Types
  ParseResult,
  ClassNameMatch,
  StyleCategory,
  StyleMeta,
  DebugInfo,
  BenchmarkResult,
  
  // Interfaces
  CSSMAEngine as ICSSMAEngine,
  PresetLoader as IPresetLoader,
} from './types';

// ============================================================================
// 🚀 Quick Start Examples
// ============================================================================

/**
 * 기본 사용법
 * 
 * @example
 * ```typescript
 * import { cssma } from 'cssma-v2';
 * 
 * // 파싱
 * const styles = cssma.parse('p-4 bg-red-500 text-white rounded-lg');
 * 
 * // Figma 변환
 * const figmaProps = cssma.toFigma(styles);
 * 
 * // CSS 역변환
 * const cssClasses = cssma.toCss(figmaProps);
 * ```
 */

/**
 * 커스텀 설정
 * 
 * @example
 * ```typescript
 * import { createCSSMA } from 'cssma-v2';
 * 
 * const customCSSMA = createCSSMA({
 *   preset: 'figma-optimized',
 *   cache: true,
 *   debug: true,
 * });
 * 
 * const styles = customCSSMA.parse('p-2 bg-blue-500');
 * ```
 */

/**
 * 체이닝 API
 * 
 * @example
 * ```typescript
 * import { cssma } from 'cssma-v2';
 * 
 * const result = cssma
 *   .chain('p-4 bg-red-500')
 *   .toFigma();
 * 
 * console.log(result.fills); // Figma paint 배열
 * ```
 */

/**
 * Preset 확장
 * 
 * @example
 * ```typescript
 * import { createCSSMA } from 'cssma-v2';
 * 
 * const brandCSSMA = createCSSMA({
 *   preset: 'tailwind-v3',
 *   extend: {
 *     colors: {
 *       'brand': { r: 0.2, g: 0.4, b: 1.0 },
 *       'accent': { r: 1.0, g: 0.6, b: 0.0 },
 *     },
 *     spacing: {
 *       'custom': 42,
 *     },
 *   },
 * });
 * ```
 */

// ============================================================================
// 🎨 Built-in Presets
// ============================================================================

/**
 * 사용 가능한 내장 Preset들
 * 
 * - `'default'` | `'tailwind-v3'`: Tailwind CSS v3 호환 (기본값)
 * - `'tailwind-v4'`: Tailwind CSS v4 알파 기능 포함
 * - `'minimal'`: 최소한의 유틸리티만 포함
 * - `'figma-optimized'`: Figma Auto Layout에 최적화된 8px 그리드
 */

// ============================================================================
// 🌙 Dark Mode Utilities
// ============================================================================

/**
 * 다크모드 상태 확인
 * 
 * @returns 현재 다크모드 상태 (true: 다크모드, false: 라이트모드)
 * 
 * @example
 * ```typescript
 * import { isDarkMode } from 'cssma-v2';
 * 
 * if (isDarkMode()) {
 *   // 다크모드일 때 수행할 작업
 * }
 * ```
 */
export function isDarkMode(): boolean {
  if (typeof document === 'undefined') return false;
  
  const darkClassName = 'dark'; // 기본값
  return document.documentElement.classList.contains(darkClassName);
}

/**
 * 다크모드 토글
 * 
 * @param mode 설정할 다크모드 상태 ('light', 'dark', 'system', 'toggle' 중 하나)
 * @param options 다크모드 옵션 (className: 다크모드 클래스명, 기본값 'dark')
 * @returns 변경 후 다크모드 상태
 * 
 * @example
 * ```typescript
 * import { toggleDarkMode } from 'cssma-v2';
 * 
 * // 다크모드 토글
 * toggleDarkMode('toggle');
 * 
 * // 다크모드로 설정
 * toggleDarkMode('dark');
 * 
 * // 라이트모드로 설정
 * toggleDarkMode('light');
 * 
 * // 시스템 설정에 따라 자동 설정
 * toggleDarkMode('system');
 * 
 * // 커스텀 클래스명 사용
 * toggleDarkMode('dark', { className: 'night-mode' });
 * ```
 */
export function toggleDarkMode(
  mode: 'light' | 'dark' | 'system' | 'toggle' = 'toggle',
  options: { className?: string; storageKey?: string } = {}
): boolean {
  if (typeof document === 'undefined') return false;
  
  const className = options.className || 'dark';
  const storageKey = options.storageKey || 'cssma-theme';
  const html = document.documentElement;
  
  // 현재 상태 확인
  const isDark = html.classList.contains(className);
  
  // 모드에 따라 처리
  let newIsDark = isDark;
  
  switch (mode) {
    case 'toggle':
      newIsDark = !isDark;
      break;
    case 'dark':
      newIsDark = true;
      break;
    case 'light':
      newIsDark = false;
      break;
    case 'system':
      if (typeof window !== 'undefined' && window.matchMedia) {
        newIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        localStorage.removeItem(storageKey); // 시스템 설정 사용 시 저장소에서 제거
      }
      break;
  }
  
  // DOM 및 localStorage 업데이트
  if (newIsDark) {
    html.classList.add(className);
    if (mode !== 'system') localStorage.setItem(storageKey, 'dark');
  } else {
    html.classList.remove(className);
    if (mode !== 'system') localStorage.setItem(storageKey, 'light');
  }
  
  return newIsDark;
}

/**
 * 다크모드 초기화
 * 
 * @param options 다크모드 옵션
 * @returns 초기화 후 다크모드 상태
 * 
 * @example
 * ```typescript
 * import { initDarkMode } from 'cssma-v2';
 * 
 * // 기본 설정으로 초기화
 * initDarkMode();
 * 
 * // 커스텀 설정으로 초기화
 * initDarkMode({
 *   className: 'night-mode',
 *   storageKey: 'my-theme',
 *   defaultMode: 'system'
 * });
 * ```
 */
export function initDarkMode(options: {
  className?: string;
  storageKey?: string;
  defaultMode?: 'light' | 'dark' | 'system';
} = {}): boolean {
  if (typeof document === 'undefined' || typeof window === 'undefined') return false;
  
  const className = options.className || 'dark';
  const storageKey = options.storageKey || 'cssma-theme';
  const defaultMode = options.defaultMode || 'system';
  
  // localStorage에서 테마 설정 확인
  const savedTheme = localStorage.getItem(storageKey);
  
  // 저장된 설정이 있으면 적용, 없으면 기본값 사용
  if (savedTheme === 'dark') {
    return toggleDarkMode('dark', { className, storageKey });
  } else if (savedTheme === 'light') {
    return toggleDarkMode('light', { className, storageKey });
  } else {
    // 시스템 설정 또는 기본값 적용
    return toggleDarkMode(defaultMode, { className, storageKey });
  }
}

// ============================================================================
// 🔍 Version Info
// ============================================================================
export const VERSION = '2.0.0';
export const PRESET_VERSION = '1.0.0';

// ============================================================================
// 🎯 Default Export (편의성)
// ============================================================================
export default cssma; 
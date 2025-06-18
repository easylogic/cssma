/**
 * CSSMA-V3 - CSS to Figma Converter
 * 
 * 이 라이브러리는 CSS 클래스를 Figma 스타일로 변환하고,
 * Figma 스타일을 CSS 클래스로 변환하는 기능을 제공합니다.
 * 
 * @module cssma-v3
 */

// Export main classes
export { CSSParser as Parser } from './core/parser';
export { StyleEngine as Engine, StyleEngine as CSSEngine } from './core/engine';
export { StyleConverter as Converter, StyleConverter as CSSConverter } from './core/converter';

// Core functionality exports
export { CSSParser } from './core/parser';
export { StyleEngine } from './core/engine';
export { StyleConverter } from './core/converter';

// 설정 및 프리셋 내보내기
export { loadConfig, loadPreset, DEFAULT_PRESET, MINIMAL_PRESET, FIGMA_OPTIMIZED_PRESET } from './config';

// 타입 정의 내보내기
export type {
  Config,
  Color,
  BoxSpacing,
  GridGap,
  AnimationKeyframe,
  AnimationPreset,
  Transition,
  DesignPreset,
  StyleCategory,
  StateModifier,
  BreakpointModifier,
  ContainerQueryModifier,
  ParsedClass,
  ParsedStyles,
  StyleMeta,
  SpacingStyles,
  ColorStyles,
  TypographyStyles,
  LayoutStyles,
  EffectsStyles,
  AnimationStyles,
  PositionStyles,
  TransformStyles,
  FigmaColor,
  ParserConfig,
  BreakpointConfig,
  ContainerSizeConfig,
  ConversionResult,
  SpecialSelector
} from './types';

/**
 * 기본 스타일 엔진 인스턴스 생성
 * 
 * 이 인스턴스는 기본 설정과 프리셋으로 초기화됩니다.
 * 필요에 따라 설정과 프리셋을 업데이트할 수 있습니다.
 * 
 * @example
 * ```ts
 * import { engine } from 'cssma-v3';
 * 
 * // CSS → Figma 변환
 * const figmaStyles = engine.cssToFigma('bg-blue-500 text-white p-4 rounded-lg');
 * 
 * // Figma → CSS 변환
 * const cssClasses = engine.figmaToCss(figmaStyles);
 * ```
 */
import { StyleEngine } from './core/engine';
import { loadConfig, loadPreset } from './config';

export const engine = new StyleEngine(loadConfig(), loadPreset()); 
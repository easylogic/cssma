/**
 * CSSMA v2 Core Types
 * 완전히 새로운 타입 시스템 - 기존 코드와 독립적
 */

// ============================================================================
// 🎯 Core Engine Types
// ============================================================================

export interface CSSMAConfig {
  preset?: string | CSSMAPreset;
  extend?: Partial<CSSMAPreset>;
  cache?: boolean;
  debug?: boolean;
}

export interface CSSMAPreset {
  name: string;
  version: string;
  spacing: SpacingScale;
  colors: ColorPalette;
  typography: TypographyScale;
  effects: EffectsScale;
  layout: LayoutScale;
  animation?: {
    presets: Record<string, AnimationPreset>;
    durations: Record<string, number>;
    easings: Record<string, string>;
  };
}

// ============================================================================
// 🎨 Style Categories
// ============================================================================

export type StyleCategory = 
  | 'spacing' 
  | 'colors' 
  | 'typography' 
  | 'layout' 
  | 'effects' 
  | 'animation'
  | 'position'
  | 'transform';

export interface ParsedStyles {
  spacing: SpacingStyles;
  colors: ColorStyles;
  typography: TypographyStyles;
  layout: LayoutStyles;
  effects: EffectStyles;
  animation: AnimationStyles;
  position: PositionStyles;
  transform: TransformStyles;
  meta: StyleMeta;
  
  // 상태 변형자 스타일
  states?: {
    hover?: Partial<ParsedStyles>;
    focus?: Partial<ParsedStyles>;
    active?: Partial<ParsedStyles>;
    disabled?: Partial<ParsedStyles>;
    visited?: Partial<ParsedStyles>;
    checked?: Partial<ParsedStyles>;
    groupHover?: Partial<ParsedStyles>;
    dark?: Partial<ParsedStyles>;
  };
  
  // 반응형 미디어 쿼리 스타일
  breakpoints?: {
    sm?: Partial<ParsedStyles>;
    md?: Partial<ParsedStyles>;
    lg?: Partial<ParsedStyles>;
    xl?: Partial<ParsedStyles>;
    '2xl'?: Partial<ParsedStyles>;
  };
}

export interface StyleMeta {
  originalClasses: string[];
  originalInput: string;
  preset: string;
  parseTime: number;
  warnings: string[];
  classNames: string[];
}

// ============================================================================
// 📏 Spacing System
// ============================================================================

export interface SpacingScale {
  [key: string]: number; // '4': 16, '8': 32, etc.
}

export interface SpacingStyles {
  padding?: BoxSpacing;
  margin?: BoxSpacing;
  gap?: GapSpacing;
}

export interface BoxSpacing {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface GapSpacing {
  row?: number;
  column?: number;
}

// ============================================================================
// 🎨 Color System
// ============================================================================

export interface ColorPalette {
  [colorName: string]: ColorShades | FigmaColor;
}

export interface ColorShades {
  [shade: string]: FigmaColor; // '500': { r: 1, g: 0, b: 0 }
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface ColorStyles {
  background?: FigmaColor;
  text?: FigmaColor;
  border?: FigmaColor;
  fill?: FigmaColor;
  stroke?: FigmaColor;
}

// ============================================================================
// 📝 Typography System
// ============================================================================

export interface TypographyScale {
  fontSize: FontSizeScale;
  fontWeight: FontWeightScale;
  lineHeight: LineHeightScale;
  letterSpacing: LetterSpacingScale;
  fontFamily: FontFamilyScale;
}

export interface FontSizeScale {
  [key: string]: number; // 'sm': 14, 'base': 16, 'lg': 18
}

export interface FontWeightScale {
  [key: string]: number; // 'normal': 400, 'bold': 700
}

export interface LineHeightScale {
  [key: string]: number; // 'tight': 1.25, 'normal': 1.5
}

export interface LetterSpacingScale {
  [key: string]: number; // 'tight': -0.025, 'wide': 0.025
}

export interface FontFamilyScale {
  [key: string]: string; // 'sans': 'Inter, sans-serif'
}

export interface TypographyStyles {
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: number;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textDecoration?: 'none' | 'underline' | 'line-through';
}

// ============================================================================
// 🎭 Effects System
// ============================================================================

export interface EffectsScale {
  borderRadius: BorderRadiusScale;
  boxShadow: BoxShadowScale;
  opacity: OpacityScale;
  blur: BlurScale;
}

export interface BorderRadiusScale {
  [key: string]: number; // 'sm': 2, 'md': 6, 'lg': 8
}

export interface BoxShadowScale {
  [key: string]: BoxShadowValue;
}

export interface BoxShadowValue {
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
  color: FigmaColor;
}

export interface OpacityScale {
  [key: string]: number; // '50': 0.5, '75': 0.75
}

export interface BlurScale {
  [key: string]: number; // 'sm': 4, 'md': 8, 'lg': 16
}

export interface EffectStyles {
  borderRadius?: number;
  boxShadow?: BoxShadowValue[];
  opacity?: number;
  blur?: number;
}

// ============================================================================
// 📐 Layout System
// ============================================================================

export interface LayoutScale {
  width: SizeScale;
  height: SizeScale;
  maxWidth: SizeScale;
  maxHeight: SizeScale;
  minWidth: SizeScale;
  minHeight: SizeScale;
}

export interface SizeScale {
  [key: string]: number | string; // 'full': '100%', '64': 256
}

export interface LayoutStyles {
  display?: 'flex' | 'block' | 'inline' | 'none' | 'grid';
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  flexDirection?: 'row' | 'column';
  justifyContent?: string;
  alignItems?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumn?: string;
  gridRow?: string;
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRowStart?: string;
  gridRowEnd?: string;
  gridAutoFlow?: string;
}

// ============================================================================
// 🔄 Conversion Types
// ============================================================================

export interface FigmaProperties {
  // Figma 노드에 직접 적용 가능한 속성들
  fills?: Paint[];
  strokes?: Paint[];
  strokeWeight?: number;
  cornerRadius?: number;
  effects?: Effect[];
  opacity?: number;
  // Layout properties
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisSizingMode?: 'FIXED' | 'AUTO';
  counterAxisSizingMode?: 'FIXED' | 'AUTO';
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  itemSpacing?: number;
  // Typography properties (for text nodes)
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  fontName?: FontName;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  animations?: FigmaAnimation;
}

// Figma API 타입들 (필요한 것만)
export interface Paint {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'IMAGE';
  color?: RGB;
  opacity?: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Effect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  color?: RGBA;
  offset?: Vector2;
  radius: number;
  spread?: number;
  visible: boolean;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface LineHeight {
  value: number;
  unit: 'PIXELS' | 'PERCENT';
}

export interface LetterSpacing {
  value: number;
  unit: 'PIXELS' | 'PERCENT';
}

export interface FontName {
  family: string;
  style: string;
}

// ============================================================================
// 🔍 Parser Types
// ============================================================================

export interface ParseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  warnings?: string[];
}

// 클래스 이름 매칭 결과 인터페이스
export interface ClassNameMatch {
  className: string;
  category: StyleCategory;
  property: string;
  value: string;
  isArbitrary?: boolean;
  modifier?: StateModifier;
  breakpoint?: BreakpointModifier;
}

// 상태 모디파이어 타입
export type StateModifier = 'hover' | 'focus' | 'active' | 'disabled' | 'visited' | 'focus-within' | 'focus-visible' | 'group-hover' | 'peer-hover' | 'dark';

// 반응형 모디파이어 타입
export type BreakpointModifier = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// 모디파이어 타입 (상태 또는 반응형)
export type Modifier = StateModifier | BreakpointModifier;

// 클래스 매칭 결과에 모디파이어 정보 추가
export interface ClassMatchResult {
  property: string;
  value: string;
  modifiers?: string[]; // 모디파이어 배열 (순서 유지)
  isArbitrary?: boolean;
}

// 파서 설정 타입
export interface ParserConfig {
  enableArbitraryValues?: boolean;
  enableStateModifiers?: boolean;
  enableResponsiveModifiers?: boolean;
}

// ============================================================================
// 🚀 Engine Interface
// ============================================================================

export interface CSSMAEngine {
  readonly config: CSSMAConfig;
  readonly preset: CSSMAPreset;
  
  // 핵심 3개 메서드
  parse(input: string): ParsedStyles;
  toFigma(styles: ParsedStyles): FigmaProperties;
  toCss(figma: FigmaProperties): string;
  
  // 유틸리티 메서드
  parseClassName(className: string): ParseResult<Partial<ParsedStyles>>;
  validateStyles(styles: ParsedStyles): ParseResult<ParsedStyles>;
  getPresetInfo(): { name: string; version: string; categories: string[] };
}

// ============================================================================
// 🎛️ Preset Loader Types
// ============================================================================

export interface PresetLoader {
  load(preset: string | CSSMAPreset): Promise<CSSMAPreset>;
  merge(base: CSSMAPreset, extend: Partial<CSSMAPreset>): CSSMAPreset;
  validate(preset: CSSMAPreset): ParseResult<CSSMAPreset>;
  cache: Map<string, CSSMAPreset>;
}

// ============================================================================
// 🧪 Testing & Debug Types
// ============================================================================

export interface DebugInfo {
  parseTime: number;
  cacheHits: number;
  cacheMisses: number;
  warnings: string[];
  errors: string[];
  preset: string;
  version: string;
}

export interface BenchmarkResult {
  operation: string;
  iterations: number;
  averageTime: number;
  minTime: number;
  maxTime: number;
  memoryUsage: number;
}

// Animation Types
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
export type AnimationPlayState = 'running' | 'paused';
export type AnimationIterationCount = number | 'infinite';

export interface CSSKeyframe {
  offset: number;
  properties: Record<string, string | number>;
}

export interface CSSTransition {
  property: string;
  duration: number;
  timingFunction: string;
  delay: number;
}

export interface AnimationStyles {
  name?: string;
  duration?: number;
  timingFunction?: string;
  delay?: number;
  iterationCount?: AnimationIterationCount;
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
  playState?: AnimationPlayState;
  keyframes?: CSSKeyframe[];
  transition?: CSSTransition;
}

export interface AnimationPreset {
  name: string;
  duration: number;
  timingFunction: string;
  delay?: number;
  iterationCount?: AnimationIterationCount;
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
  keyframes: CSSKeyframe[];
}

// Figma Animation Types
export interface FigmaEasing {
  type: 'LINEAR' | 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_OUT' | 'CUSTOM';
  easingFunction: string;
}

export interface FigmaTransition {
  property: string;
  duration: number;
  easing: FigmaEasing;
  delay: number;
}

export interface FigmaKeyframe {
  time: number;
  properties: Record<string, string | number>;
}

export interface FigmaAnimation {
  name: string;
  duration: number;
  easing: FigmaEasing;
  delay: number;
  iterations: number;
  direction: 'NORMAL' | 'REVERSE' | 'ALTERNATE' | 'ALTERNATE_REVERSE';
  fillMode: 'NONE' | 'FORWARDS' | 'BACKWARDS' | 'BOTH';
  transition?: FigmaTransition;
  keyframes?: FigmaKeyframe[];
}

// 위치 스타일 타입
export interface PositionStyles {
  position?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  inset?: string;
  zIndex?: number;
}

// 변형 스타일 타입
export interface TransformStyles {
  scale?: number | string;
  scaleX?: number | string;
  scaleY?: number | string;
  rotate?: number | string;
  translateX?: number | string;
  translateY?: number | string;
  skewX?: number | string;
  skewY?: number | string;
  transformOrigin?: string;
}

// 색상 문자열 타입 (HEX, RGB, HSL 등)
export type ColorString = string;

// 색상 타입 (FigmaColor 또는 문자열)
export type Color = FigmaColor | ColorString; 
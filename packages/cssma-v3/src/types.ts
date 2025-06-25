/**
 * Core type definitions for CSSMA-V3
 */

import { ColorUtils, SpacingUtils, TypographyUtils, UnitUtils } from "./utils";

/**
 * Individual parsed style result (used by individual parsers)
 */
export interface ParsedStyle {
  property: string;
  value: string | Color | RGBColor | undefined;
  variant: 'preset' | 'arbitrary' | 'custom';
  additionalProperties?: Array<{
    property: string;
    value: string;
  }>;
}

/**
 * 기본 설정 타입 (Tailwind v4 확장)
 */
export interface Config {
  prefix: string;
  separator: string;
  important: boolean;
  enableArbitraryValues: boolean;
  enableStateModifiers: boolean;
  enableResponsiveModifiers: boolean;
  // Tailwind v4 새로운 설정들
  colorFormat?: 'rgb' | 'hsl' | 'oklch' | 'hex';  // 색상 출력 형식
  outputCSSVariables?: boolean;                   // CSS 변수로 출력할지 여부
  useOKLCH?: boolean;                            // OKLCH 색상 공간 사용 여부
  enableColorMix?: boolean;                       // color-mix() 함수 사용 여부
  enableCascadeLayers?: boolean;                  // @layer 지원 여부
  themeProvider?: 'css-variables' | 'direct';     // 테마 제공 방식
}

/**
 * OKLCH 색상 타입 (Tailwind v4)
 */
export interface OKLCHColor {
  l: number;  // Lightness (0-1)
  c: number;  // Chroma (0-0.4 일반적)
  h: number;  // Hue (0-360도)
}

/**
 * RGB 색상 타입 (기존)
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * 색상 타입 - OKLCH, RGB 객체 또는 CSS 색상 문자열 지원 (v4 업데이트)
 */
export interface Color extends OKLCHColor {}

/**
 * 색상 값 타입 - Color 객체 또는 CSS 색상 문자열
 */
export type ColorValue = Color | RGBColor | string;

/**
 * 간격 타입 (상하좌우)
 */
export interface BoxSpacing {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

/**
 * 그리드 간격 타입
 */
export interface GridGap {
  row?: number | string;
  column?: number | string;
}

/**
 * 애니메이션 키프레임 타입
 */
export interface AnimationKeyframe {
  offset: number;
  transform?: string;
  opacity?: number;
  animationTimingFunction?: string;
  [key: string]: any;
}

/**
 * 애니메이션 프리셋 타입
 */
export interface AnimationPreset {
  name: string;
  duration: number;
  timingFunction: string;
  delay?: number;
  iterationCount?: number | 'infinite';
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
  playState?: AnimationPlayState;
  keyframes: AnimationKeyframe[];
}

/**
 * 트랜지션 타입
 */
export interface Transition {
  property: string;
  duration: number;
  timingFunction: string;
  delay: number;
}

/**
 * 색상 팔레트 (v4 OKLCH 지원)
 */
export interface ColorPalette {
  blue: Record<string, Color | RGBColor>;
  green: Record<string, Color | RGBColor>;
  red: Record<string, Color | RGBColor>;
  slate: Record<string, Color | RGBColor>;
  gray: Record<string, Color | RGBColor>;
  zinc: Record<string, Color | RGBColor>;
  neutral: Record<string, Color | RGBColor>;
  stone: Record<string, Color | RGBColor>;
  orange: Record<string, Color | RGBColor>;
  amber: Record<string, Color | RGBColor>;
  yellow: Record<string, Color | RGBColor>;
  lime: Record<string, Color | RGBColor>;
  emerald: Record<string, Color | RGBColor>;
  teal: Record<string, Color | RGBColor>;
  cyan: Record<string, Color | RGBColor>;
  sky: Record<string, Color | RGBColor>;
  indigo: Record<string, Color | RGBColor>;
  violet: Record<string, Color | RGBColor>;
  purple: Record<string, Color | RGBColor>;
  fuchsia: Record<string, Color | RGBColor>;
  pink: Record<string, Color | RGBColor>;
  rose: Record<string, Color | RGBColor>;
  [key: string]: Record<string, Color | RGBColor> | undefined;
}

/**
 * 디자인 프리셋 타입
 */
export interface DesignPreset {
  name: string;
  version: string;
  colors: ColorPalette;
  spacing: Record<string, number>;
  typography: {
    fontSize: Record<string, number>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, number>;
    letterSpacing: Record<string, number>;
    fontFamily: Record<string, string>;
  };
  effects: {
    boxShadow: Record<string, string>;
    textShadow: Record<string, string>;
    blur: Record<string, string | number>;
    brightness: Record<string, string | number>;
    contrast: Record<string, string | number>;
    grayscale: Record<string, string | number>;
    saturate: Record<string, string | number>;
    dropShadow: Record<string, string>;
    opacity: Record<string, string | number>;
    borderRadius: Record<string, string | number>;
  };
  layout: {
    width: Record<string, number | string>;
    height: Record<string, number | string>;
    maxWidth: Record<string, number | string>;
    maxHeight: Record<string, number | string>;
    minWidth: Record<string, number | string>;
    minHeight: Record<string, number | string>;
  };
  animation: {
    presets: { [key: string]: AnimationPreset };
    easings: { [key: string]: string };
    durations: { [key: string]: number };
  };
  screens?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
    [key: string]: string | undefined;
  };
  containers?: {
    sm?: string;
    md?: string;
    lg?: string;
    [key: string]: string | undefined;
  };
  borders: {
    borderWidth: Record<string, string>;
    borderRadius: Record<string, string>;
    borderStyle: Record<string, string>;
  };
  
  backgrounds: {
    backgroundImage: Record<string, string>;
    gradients: Record<string, string>;
  };
  
  transitions: {
    property: Record<string, string>;
    duration: Record<string, string>;
    timingFunction: Record<string, string>;
    delay: Record<string, string>;
  };
  
  transforms: {
    scale: Record<string, string>;
    rotate: Record<string, string>;
    translate: Record<string, string>;
    skew: Record<string, string>;
  };

  // Tailwind CSS v4.1 새로운 기능들
  textShadow?: Record<string, string>;
  fontStretch?: Record<string, string>;
  mask?: Record<string, string>;
  accentColor?: Record<string, string>;
  fieldSizing?: Record<string, string>;
  scrollBehavior?: Record<string, string>;
  scrollSnapType?: Record<string, string>;
  scrollSnapAlign?: Record<string, string>;
  viewTransitionName?: Record<string, string>;
  containerType?: Record<string, string>;
  logicalProperties?: Record<string, string>;
  safeAlignment?: Record<string, string>;
  pointerVariants?: Record<string, string>;
  gridTemplateSubgrid?: Record<string, string>;
}

/**
 * 스타일 카테고리 타입
 */
export type StyleCategory = 
  | 'spacing' 
  | 'colors' 
  | 'typography' 
  | 'layout' 
  | 'effects' 
  | 'animation' 
  | 'position' 
  | 'transform' 
  | 'sizing'
  | 'flexbox-grid'
  | 'filters'
  | 'interactivity'
  | 'tables'
  | 'svg'
  | 'transitions'
  | 'backgrounds'
  | 'borders'
  | 'overflow'
  | 'accessibility'
  | 'blend-modes'
  | 'mask';

/**
 * 상태 모디파이어 타입
 */
export type StateModifier = 
  // 기본 상호작용 상태
  | 'hover' | 'focus' | 'active' | 'visited' | 'disabled'
  // 포커스 관련 확장
  | 'focus-within' | 'focus-visible'
  // 그룹 상호작용
  | 'group-hover' | 'group-focus' | 'group-active' | 'group-visited'
  // 피어 상호작용
  | 'peer-hover' | 'peer-focus' | 'peer-active' | 'peer-visited' | 'peer-disabled'
  // 테마 관련
  | 'dark' | 'light'
  // 폼 요소 상태
  | 'checked' | 'indeterminate' | 'default' | 'required' | 'valid' | 'invalid'
  | 'user-valid' | 'user-invalid' | 'in-range' | 'out-of-range' | 'placeholder-shown'
  | 'autofill' | 'read-only'
  // 위치 관련
  | 'first' | 'last' | 'only' | 'odd' | 'even'
  | 'first-of-type' | 'last-of-type' | 'only-of-type'
  | 'empty'
  // 논리 선택자
  | 'not' | 'has'
  // 의사 요소
  | 'before' | 'after' | 'placeholder' | 'selection' | 'marker'
  | 'first-line' | 'first-letter' | 'backdrop' | 'file'
  // Tailwind CSS v4.1 새로운 변형자들
  | 'pointer-fine' | 'pointer-coarse' | 'any-pointer-fine' | 'any-pointer-coarse'
  | 'noscript' | 'inverted-colors' | 'details-content' | 'inert'
  | 'starting' | 'popover-open'
  // nth-* 변형자들
  | 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type'
  // 기타 v4.1 변형자들
  | 'in' | 'descendant'
  
  // v4.1 새로운 상태들
  // 미디어 쿼리들
  | 'motion-safe' | 'motion-reduce'
  | 'contrast-more' | 'contrast-less'
  | 'portrait' | 'landscape'
  | 'print' | 'scripting'
  
  // 그룹/피어 상태들
  | `group-${string}` | `peer-${string}`
  
  // 복합 선택자들
  | `has-[${string}]` | `not-[${string}]` | `supports-[${string}]`
  
  // ARIA/데이터 속성들
  | `aria-${string}` | `data-${string}`;

/**
 * 반응형 모디파이어 타입
 * 
 * 기본 브레이크포인트:
 * - sm: 40rem (640px)
 * - md: 48rem (768px)
 * - lg: 64rem (1024px)
 * - xl: 80rem (1280px)
 * - 2xl: 96rem (1536px)
 * 
 * 최대 너비 브레이크포인트:
 * - max-sm: @media (width < 40rem)
 * - max-md: @media (width < 48rem)
 * - max-lg: @media (width < 64rem)
 * - max-xl: @media (width < 80rem)
 * - max-2xl: @media (width < 96rem)
 */

/**
 * 컨테이너 쿼리 모디파이어 타입
 * 
 * 기본 컨테이너 사이즈:
 * - @3xs: 16rem (256px)
 * - @2xs: 18rem (288px)
 * - @xs: 20rem (320px)
 * - @sm: 24rem (384px)
 * - @md: 28rem (448px)
 * - @lg: 32rem (512px)
 * - @xl: 36rem (576px)
 * - @2xl: 42rem (672px)
 * - @3xl: 48rem (768px)
 * - @4xl: 56rem (896px)
 * - @5xl: 64rem (1024px)
 * - @6xl: 72rem (1152px)
 * - @7xl: 80rem (1280px)
 */

export interface ContainerQueryModifier {
  type: 'min-width' | 'max-width' | 'named-container';
  value: string;
  containerName?: string;
}

export interface BreakpointModifier {
  type: 'min-width' | 'max-width';
  value: string;
}

/**
 * 애니메이션 방향 타입
 */
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

/**
 * 애니메이션 채우기 모드 타입
 */
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

/**
 * 애니메이션 재생 상태 타입
 */
export type AnimationPlayState = 'running' | 'paused';

/**
 * Tailwind CSS v4.1 Modifier 타입 정의
 * 단일 modifier 체인을 파싱한 결과
 */
export interface ParsedModifiers {
  // Media queries (최우선 순위) - 객체 형태로 반환
  responsive?: Record<string, string>;    // { "md": "@media (min-width: 768px)" }
  container?: Record<string, string>;     // { "@md": "@container (min-width: 768px)" }
  motion?: string | null;                 // "@media (prefers-reduced-motion: no-preference)"
  
  // States (pseudo-classes) - 배열 형태로 복합 상태 지원 (v4 업데이트)
  state?: string[] | null;                // [":hover", "@media (pointer: fine)"] 등
  
  // Pseudo-elements - 단일 문자열
  pseudoElement?: string | null;          // "::before", "::after", "::placeholder"
  
  // Attribute selectors - 객체 형태로 반환
  aria?: Record<string, string>;          // { "checked": "[aria-checked]" }
  data?: Record<string, string>;          // { "active": "[data-active]" }
  
  // v4.1 새로운 modifiers
  not?: string | null;                    // "not-[selector]"
  starting?: boolean;                     // true/false
  pointer?: string | null;                // "pointer-fine", "pointer-coarse"
  noscript?: string | null;               // "noscript"
  userValid?: string | null;              // "user-valid", "user-invalid"
  invertedColors?: string | null;         // "inverted-colors"
  detailsContent?: string | null;         // "details-content"
  
  // 추가 v4.1 기능들
  contrast?: string | null;               // "contrast-more", "contrast-less"
  colorScheme?: string | null;            // "dark", "light"
  orientation?: string | null;            // "portrait", "landscape"
  print?: string | null;                  // "print"
  scripting?: string | null;              // "scripting"
  
  // Group/Peer modifiers - 단일 문자열
  group?: string | null;                  // "group-hover", "group-focus"
  peer?: string | null;                   // "peer-hover", "peer-focus"
  
  // Complex selectors
  has?: string | null;                    // "has-[selector]"
  supports?: string | null;               // "supports-[feature]"
  
  // nth-* selectors
  nthChild?: string | null;               // "nth-[3]", "nth-[3n+1]"
  nthLastChild?: string | null;           // "nth-last-[3]"
  nthOfType?: string | null;              // "nth-of-type-[3]"
  nthLastOfType?: string | null;          // "nth-last-of-type-[3]"
  
  // Arbitrary values
  arbitrary?: string | null;              // "[custom-value]"의 내용
}

/**
 * 파싱된 클래스 정보
 */
export interface ParsedClass {
  original: string;
  className: string;
  baseClassName: string;
  category: StyleCategory;
  property: string;
  value: string;
  isArbitrary?: boolean;
  
  // 🎯 Tailwind CSS v4.1 방식의 modifier 정보
  modifiers?: ParsedModifiers;
}

/**
 * 파싱된 스타일 메타데이터 타입
 */
export interface StyleMeta {
  originalClasses: string[];
  originalInput: string;
  preset: string;
  parseTime: number;
  warnings: string[];
}

/**
 * 간격 스타일 타입
 */
export interface SpacingStyles {
  padding?: BoxSpacing;
  margin?: BoxSpacing;
  gap?: GridGap | number | string;
  // Tailwind CSS v4.1 추가 속성들
  paddingInline?: number | string | { start?: number | string; end?: number | string; };
  paddingBlock?: number | string | { start?: number | string; end?: number | string; };
  marginInline?: number | string | { start?: number | string; end?: number | string; };
  marginBlock?: number | string | { start?: number | string; end?: number | string; };
  spaceBetween?: { x?: number | string; y?: number | string; };
  spaceX?: number | string;
  spaceY?: number | string;
  spaceXReverse?: boolean;
  spaceYReverse?: boolean;
}

/**
 * 색상 스타일 타입
 */
export interface ColorStyles {
  text?: ColorValue;
  background?: ColorValue;
  border?: ColorValue;
  fill?: ColorValue;
  stroke?: ColorValue;
}

/**
 * 텍스트 정렬 타입
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end' | string;

/**
 * 텍스트 변환 타입
 */
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'full-width' | string;

/**
 * 타이포그래피 스타일 인터페이스
 */
export interface TypographyStyles {
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  fontFamily?: string;
  textAlign?: TextAlign;
  textTransform?: TextTransform;
  textDecoration?: string;
  textDecorationColor?: ColorValue;
  textDecorationStyle?: string;
  textDecorationThickness?: string | number;
  textUnderlineOffset?: string | number;
  textIndent?: string | number;
  textShadow?: string;
  color?: ColorValue;
  // Tailwind CSS v4.1 새로운 타이포그래피 기능들
  fontStretch?: 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'normal' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded' | string;
  colorScheme?: 'light' | 'dark' | 'light dark' | 'dark light' | 'normal' | string;
  overflowWrap?: 'normal' | 'break-word' | 'anywhere';
  hyphens?: 'none' | 'manual' | 'auto';
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
  textOrientation?: 'mixed' | 'upright' | 'sideways' | 'sideways-right' | 'use-glyph-orientation';
  // 기존 v4.1 속성들
  fontStyle?: 'normal' | 'italic' | 'oblique';
  verticalAlign?: 'baseline' | 'top' | 'middle' | 'bottom' | 'text-top' | 'text-bottom' | 'sub' | 'super' | 'baseline-last' | string;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces';
  textOverflow?: 'clip' | 'ellipsis';
  overflow?: string;
  textDecorationLine?: 'none' | 'underline' | 'overline' | 'line-through';
  // Font smoothing
  WebkitFontSmoothing?: 'auto' | 'antialiased';
  MozOsxFontSmoothing?: 'auto' | 'grayscale';
}

/**
 * 레이아웃 스타일 타입
 */
export interface LayoutStyles {
  display?: 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'table' | 'table-cell' | 'table-row' | 'grid' | 'inline-grid' | 'none' | 'contents' | 'flow-root' | 'list-item' | string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  float?: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end';
  clear?: 'left' | 'right' | 'both' | 'none' | 'inline-start' | 'inline-end';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  overflow?: 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
  overflowX?: 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
  overflowY?: 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
  // Tailwind CSS v4.1 새로운 레이아웃 기능들
  overflowBlock?: 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
  overflowInline?: 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
  scrollBehavior?: 'auto' | 'smooth';
  scrollSnapType?: string;
  scrollSnapAlign?: 'none' | 'start' | 'end' | 'center';
  scrollSnapStop?: 'normal' | 'always';
  scrollMargin?: string;
  scrollPadding?: string;
  // Container 관련
  containerType?: 'normal' | 'size' | 'inline-size';
  containerName?: string;
  // Aspect ratio
  aspectRatio?: string | number;
  // Isolation
  isolation?: 'auto' | 'isolate';
  // Mix blend mode
  mixBlendMode?: string;
  // Logical properties
  marginBlock?: string | number;
  marginInline?: string | number;
  paddingBlock?: string | number;
  paddingInline?: string | number;
  borderBlock?: string;
  borderInline?: string;
  borderBlockWidth?: string | number;
  borderInlineWidth?: string | number;
  borderBlockColor?: ColorValue;
  borderInlineColor?: ColorValue;
  borderBlockStyle?: string;
  borderInlineStyle?: string;
  // 기본 크기 속성들
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  // 기본 간격 속성들
  margin?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  padding?: string | number;
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  // 위치 속성들
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  inset?: string | number;
  insetBlock?: string | number;
  insetInline?: string | number;
  zIndex?: number | string;
  // 누락된 레이아웃 속성들
  columns?: string | number;
  breakAfter?: 'auto' | 'avoid' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'column';
  breakBefore?: 'auto' | 'avoid' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'column';
  breakInside?: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column';
  boxDecorationBreak?: 'clone' | 'slice';
  boxSizing?: 'border-box' | 'content-box';

  // Tailwind CSS v4.1 새로운 레이아웃 기능들
  containerPosition?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
  containerAlignment?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  containerJustify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  containerItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';

  gridTemplateColumns?: 'subgrid' | 'masonry' | string;
  gridTemplateRows?: 'subgrid' | 'masonry' | string;
  gridTemplateAreas?: string;
  gridTemplate?: string;
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense' | string;
  gridAutoColumns?: string;
  gridAutoRows?: string;

  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  alignSelf?: string;
  placeContent?: string;
  placeItems?: string;
  placeSelf?: string;
}

/**
 * 효과 스타일 타입
 */
export interface EffectsStyles {
  borderRadius?: number;
  borderWidth?: BoxSpacing;
  boxShadow?: string;
  textShadow?: string;
  opacity?: number | string;
  filter?: string;
  backdropFilter?: string;
  // Tailwind CSS v4.1 새로운 효과들
  accentColor?: ColorValue;
  caretColor?: ColorValue;
  scrollbarColor?: string;
  scrollbarWidth?: 'auto' | 'thin' | 'none';
  colorScheme?: 'light' | 'dark' | 'light dark' | 'dark light' | 'normal';
  fieldSizing?: 'content' | 'fixed';
  // Ring 관련 색상 속성들 (focus outlines)
  ringColor?: ColorValue;
  ringOffsetColor?: ColorValue;
  outlineColor?: ColorValue;
  // Mask 관련 속성들
  mask?: string;
  maskImage?: string;
  maskPosition?: string;
  maskSize?: string;
  maskRepeat?: string;
  maskOrigin?: string;
  maskClip?: string;
  maskComposite?: string;
  maskMode?: string;
  // View Transition 관련
  viewTransitionName?: string;
  // Highlight 관련  
  highlight?: ColorValue;
  // CSS 필터 확장
  brightness?: number | string;
  contrast?: number | string;
  grayscale?: number | string;
  saturate?: number | string;
  sepia?: number | string;
  hueRotate?: number | string;
  invert?: number | string;
  blur?: string;
  dropShadow?: string;
  // Backdrop 필터 확장
  backdropBrightness?: number | string;
  backdropContrast?: number | string;
  backdropGrayscale?: number | string;
  backdropSaturate?: number | string;
  backdropSepia?: number | string;
  backdropHueRotate?: number | string;
  backdropInvert?: number | string;
  backdropBlur?: string;
  backdropOpacity?: number | string;
}

/**
 * 애니메이션 스타일 타입
 */
export interface AnimationStyles {
  name?: string;
  duration?: string;
  timingFunction?: string;
  delay?: string;
  iterationCount?: number | 'infinite';
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
  playState?: AnimationPlayState;
  keyframes?: AnimationKeyframe[];
  transition?: boolean | Transition;
}

/**
 * 위치 스타일 타입
 */
export interface PositionStyles {
  position?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky' | string;
  type?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky' | string; // 테스트 호환성
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  zIndex?: number;
  inset?: number | string;
}

/**
 * 변형 스타일 타입
 */
export interface TransformStyles {
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;  // 3D (v4.1)
  rotate?: number | string;
  rotateX?: number | string;  // 3D (v4.1)
  rotateY?: number | string;  // 3D (v4.1)  
  rotateZ?: number | string;  // 3D (v4.1)
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;  // 3D (v4.1)
  skewX?: number | string;
  skewY?: number | string;
  transformOrigin?: string;
}

/**
 * 사이징 관련 스타일 (Min/Max Width/Height, Size)
 */
export interface SizingStyles {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  size?: string;  // Tailwind v3.4+ feature for width and height together
}

/**
 * Flexbox & Grid 스타일 타입
 */
export interface FlexboxGridStyles {
  display?: string;
  flexDirection?: string;
  flexWrap?: string;
  flex?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexBasis?: string;
  order?: string;
  gridTemplateColumns?: string;
  gridColumn?: string;
  gridTemplateRows?: string;
  gridRow?: string;
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRowStart?: string;
  gridRowEnd?: string;
  gridAutoFlow?: string;
  gridAutoColumns?: string;
  gridAutoRows?: string;
  gap?: string;
  columnGap?: string;
  rowGap?: string;
  justifyContent?: string;
  justifyItems?: string;
  justifySelf?: string;
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  placeContent?: string;
  placeItems?: string;
  placeSelf?: string;
}

/**
 * 필터 스타일 타입
 */
export interface FiltersStyles {
  filter?: string;
  backdropFilter?: string;
}

/**
 * 상호작용 스타일 타입
 */
export interface InteractivityStyles {
  accentColor?: string;
  appearance?: string;
  cursor?: string;
  caretColor?: string;
  pointerEvents?: string;
  resize?: string;
  scrollBehavior?: string;
  scrollMargin?: string;
  scrollMarginTop?: string;
  scrollMarginRight?: string;
  scrollMarginBottom?: string;
  scrollMarginLeft?: string;
  scrollPadding?: string;
  scrollPaddingTop?: string;
  scrollPaddingRight?: string;
  scrollPaddingBottom?: string;
  scrollPaddingLeft?: string;
  scrollSnapAlign?: string;
  scrollSnapStop?: string;
  scrollSnapType?: string;
  touchAction?: string;
  userSelect?: string;
  willChange?: string;
}

/**
 * 테이블 스타일 타입
 */
export interface TablesStyles {
  borderCollapse?: string;
  borderSpacing?: string;
  tableLayout?: string;
  captionSide?: string;
}

/**
 * SVG 스타일 타입
 */
export interface SVGStyles {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
}

/**
 * 파싱된 스타일 타입
 */
export interface ParsedStyles {
  spacing: SpacingStyles;
  colors: ColorStyles;
  typography: TypographyStyles;
  layout: LayoutStyles;
  effects: EffectsStyles;
  animation: AnimationStyles;
  position: PositionStyles;
  transform: TransformStyles;
  sizing: SizingStyles;
  flexboxGrid: FlexboxGridStyles;
  filters: FiltersStyles;
  interactivity: InteractivityStyles;
  tables: TablesStyles;
  svg: SVGStyles;
  transitions: TransitionsStyles;
  backgrounds: BackgroundsStyles;
  borders: BordersStyles;
  overflow: OverflowStyles;
  accessibility: AccessibilityStyles;
  blendModes: BlendModesStyles;
  mask: MaskStyles;
  
  // 메타 정보
  meta?: StyleMeta;
  
  // Tailwind CSS v4.1 Modifier 구조
  // 단일 상태 변형자
  states?: Record<string, Partial<ParsedStyles>>;
  
  // 의사 요소
  pseudoElements?: Record<string, Partial<ParsedStyles>>;
  
  // 반응형 중단점
  breakpoints?: Record<string, Partial<ParsedStyles>>;
  
  // 컨테이너 쿼리
  containers?: Record<string, Partial<ParsedStyles>>;
  
  // v4.1 새로운 modifier 카테고리들
  // Motion queries (motion-safe, motion-reduce)
  motion?: Record<string, Partial<ParsedStyles>>;
  
  // Attribute selectors (aria-*, data-*, etc.)
  attributes?: Record<string, Partial<ParsedStyles>>;
  
  // Complex selectors (has-[], not-[], supports-[])
  complexSelectors?: Record<string, Partial<ParsedStyles>>;
  
  // Group/Peer modifiers
  groupStates?: Record<string, Partial<ParsedStyles>>;
  peerStates?: Record<string, Partial<ParsedStyles>>;
  
  // v4.1 새로운 상태들
  contrast?: Record<string, Partial<ParsedStyles>>;        // contrast-more, contrast-less
  colorScheme?: Record<string, Partial<ParsedStyles>>;     // dark, light
  orientation?: Record<string, Partial<ParsedStyles>>;     // portrait, landscape
  print?: Record<string, Partial<ParsedStyles>>;           // print
  scripting?: Record<string, Partial<ParsedStyles>>;       // scripting
  pointer?: Record<string, Partial<ParsedStyles>>;         // pointer-fine, pointer-coarse
  noscript?: Record<string, Partial<ParsedStyles>>;        // noscript
  userValidation?: Record<string, Partial<ParsedStyles>>;  // user-valid, user-invalid
  invertedColors?: Record<string, Partial<ParsedStyles>>;  // inverted-colors
  detailsContent?: Record<string, Partial<ParsedStyles>>;  // details-content
  starting?: Record<string, Partial<ParsedStyles>>;        // starting
  
  // nth-* selectors
  nthSelectors?: Record<string, Partial<ParsedStyles>>;    // nth-[3], nth-[3n+1], etc.
}

/**
 * Figma 색상 타입
 */
export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * 클래스 파서 설정
 */
export interface ParserConfig {
  // 기본 기능 활성화 여부
  enableArbitraryValues?: boolean;
  enableStateModifiers?: boolean;
  enableResponsiveModifiers?: boolean;
  enableContainerQueries?: boolean;
  
  // 커스텀 모디파이어 설정
  stateModifiers?: StateModifier[];
  breakpoints?: BreakpointConfig[];
  containerSizes?: ContainerSizeConfig[];
  
  // 기타 설정
  prefix?: string;
  separator?: string;
  strict?: boolean;
}

/**
 * 반응형 브레이크포인트 설정
 */
export interface BreakpointConfig {
  name: string;
  minWidth?: number; // 최소 너비 (px)
  maxWidth?: number; // 최대 너비 (px)
  deviceType?: 'mobile' | 'tablet' | 'desktop' | string; // 디바이스 타입
}

/**
 * 컨테이너 사이즈 설정
 */
export interface ContainerSizeConfig {
  name: string;
  minWidth?: number; // 최소 너비 (px)
  maxWidth?: number; // 최대 너비 (px)
}

/**
 * 변환 결과 타입
 */
export interface ConversionResult {
  css: string;
  figma: any;
  meta: {
    originalClasses: string[];
    parseTime: number;
    warnings: string[];
  };
}

/**
 * 특수 선택자 타입 (nth-child 등)
 */
export interface SpecialSelector {
  type: 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type';
  value: string; // '3', '3n+1' 등
}

export interface TransitionsStyles {
  transitionProperty?: string;
  transitionDuration?: string;
  transitionDelay?: string;
  transitionTimingFunction?: string;
}

export interface BackgroundsStyles {
  backgroundColor?: ColorValue;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundAttachment?: string;
  backgroundClip?: string;
  backgroundOrigin?: string;
  '--tw-gradient-from'?: string;
  '--tw-gradient-via'?: string;
  '--tw-gradient-to'?: string;
}

export interface BordersStyles {
  borderWidth?: string;
  borderTopWidth?: string;
  borderRightWidth?: string;
  borderBottomWidth?: string;
  borderLeftWidth?: string;
  borderInlineWidth?: string;
  borderBlockWidth?: string;
  borderStyle?: string;
  borderColor?: ColorValue;
  borderTopColor?: ColorValue;
  borderRightColor?: ColorValue;
  borderBottomColor?: ColorValue;
  borderLeftColor?: ColorValue;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomRightRadius?: string;
  borderBottomLeftRadius?: string;
  divideXWidth?: string;
  divideYWidth?: string;
  divideStyle?: string;
  divideColor?: ColorValue;
  divideReverse?: string;
  ringWidth?: string;
  ringColor?: ColorValue;
  ringOffsetWidth?: string;
  ringOffsetColor?: ColorValue;
  ringInset?: string;
  outlineWidth?: string;
  outlineStyle?: string;
  outlineColor?: ColorValue;
}

export interface OverflowStyles {
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  overscrollBehavior?: string;
  overscrollBehaviorX?: string;
  overscrollBehaviorY?: string;
  visibility?: string;
  objectFit?: string;
  objectPosition?: string;
  textOverflow?: string;
  whiteSpace?: string;
  overflowWrap?: string;
  wordBreak?: string;
  hyphens?: string;
}

export interface AccessibilityStyles {
  screenReader?: Record<string, string>;
  forcedColorAdjust?: string;
  focusOutline?: string;
  focusOutlineStyle?: string;
  focusOutlineWidth?: string;
  focusOutlineColor?: string;
  focusRingWidth?: string;
  focusRingColor?: string;
  focusVisibleOutline?: string;
  focusVisibleOutlineColor?: string;
  focusVisibleRingWidth?: string;
  focusVisibleRingColor?: string;
  focusWithinOutlineColor?: string;
  focusWithinRingWidth?: string;
  focusWithinRingColor?: string;
  // sr-only 구현에 필요한 속성들
  position?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  overflow?: string;
  clip?: string;
  whiteSpace?: string;
  borderWidth?: string;
}

/**
 * 블렌드 모드 스타일 타입
 */
export interface BlendModesStyles {
  mixBlendMode?: string;
  backgroundBlendMode?: string;
  isolation?: string;
}

export interface MaskStyles {
  maskImage?: string;
  maskPosition?: string;
  maskSize?: string;
  maskRepeat?: string;
  maskOrigin?: string;
  maskClip?: string;
  maskComposite?: string;
  maskMode?: string;
}

export interface FlexboxStyles {
  display?: 'flex' | 'inline-flex';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
  flex?: string | number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right' | string;
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'start' | 'end' | 'self-start' | 'self-end' | string;
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'start' | 'end' | string;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'start' | 'end' | 'self-start' | 'self-end' | string;
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
  // Tailwind CSS v4.1 새로운 flexbox 기능들
  justifyItems?: 'stretch' | 'start' | 'end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'safe start' | 'safe end' | 'safe center' | 'unsafe start' | 'unsafe end' | 'unsafe center' | string;
  justifySelf?: 'auto' | 'stretch' | 'start' | 'end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'safe start' | 'safe end' | 'safe center' | 'unsafe start' | 'unsafe end' | 'unsafe center' | string;
  placeContent?: string;
  placeItems?: string;
  placeSelf?: string;
  order?: number;
}

export interface GridStyles {
  display?: 'grid' | 'inline-grid';
  gridTemplateColumns?: 'subgrid' | 'masonry' | string;
  gridTemplateRows?: 'subgrid' | 'masonry' | string;
  gridTemplateAreas?: string;
  gridTemplate?: string;
  gridColumn?: string | number;
  gridRow?: string | number;
  gridColumnStart?: string | number;
  gridColumnEnd?: string | number;
  gridRowStart?: string | number;
  gridRowEnd?: string | number;
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  gridAutoColumns?: string;
  gridAutoRows?: string;
  gridArea?: string;
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
  // Tailwind CSS v4.1 새로운 grid alignment 기능들
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly' | 'safe start' | 'safe end' | 'safe center' | 'unsafe start' | 'unsafe end' | 'unsafe center' | string;
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly' | 'baseline' | 'first baseline' | 'last baseline' | 'safe start' | 'safe end' | 'safe center' | 'unsafe start' | 'unsafe end' | 'unsafe center' | string;
  justifyItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'first baseline' | 'last baseline' | 'safe start' | 'safe end' | 'safe center' | 'unsafe start' | 'unsafe end' | 'unsafe center' | string;
  alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'first baseline' | 'last baseline' | 'safe start' | 'safe end' | 'safe center' | 'unsafe start' | 'unsafe end' | 'unsafe center' | string;
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'first baseline' | 'last baseline' | 'safe start' | 'safe end' | 'safe center' | 'unsafe start' | 'unsafe end' | 'unsafe center' | string;
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'first baseline' | 'last baseline' | 'safe start' | 'safe end' | 'safe center' | 'unsafe start' | 'unsafe end' | 'unsafe center' | string;
  placeContent?: string;
  placeItems?: string;
  placeSelf?: string;
}

/**
 * Parser Context - 모든 파서가 공유하는 컨텍스트
 * Tailwind v4 스타일의 통합 설정 및 유틸리티 시스템
 */
export interface ParserContext {
  config: Config;
  preset: DesignPreset;
  utils: {
    color: (name: string) => string;
    unit: (name: string) => string;
    spacing: (name: string) => string;
    typography: (name: string) => string;
  };
}

/**
 * 유틸리티 클래스들의 인터페이스 정의
 */
export interface ColorUtils {
  getColorValue(colorName: string, preset: DesignPreset, config: Config): string;
  oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number };
  oklchToHex(l: number, c: number, h: number): string;
  hexToOklch(hex: string): OKLCHColor;
  parseColorValue(value: string): string;
  generateCSSVariables(colors: ColorPalette): Record<string, string>;
}

export interface UnitUtils {
  pxToRem(px: number): string;
  remToPx(rem: string): number;
  parseSpacing(value: string, preset: DesignPreset): string;
  parseFontSize(value: string | number, preset: DesignPreset): string;
  parseLineHeight(value: string | number): string | number;
  convertArbitraryValue(value: string, unit?: 'px' | 'rem' | 'em'): string;
}

export interface SpacingUtils {
  getSpacingValue(key: string, preset: DesignPreset): string;
  parseSpacingDirection(property: string, value: string): Record<string, string>;
  convertSpacingToCSS(spacing: any): Record<string, string>;
}

export interface TypographyUtils {
  getFontSize(size: string, preset: DesignPreset): { fontSize: string; lineHeight?: number };
  getFontFamily(family: string, preset: DesignPreset): string;
  parseTextTransform(value: string): string;
  parseTextAlign(value: string): string;
}

/**
 * 표준화된 파서 인터페이스
 * 모든 파서가 이 인터페이스를 구현해야 함
 */
export interface StandardParserInterface {
  isValidClass(className: string): boolean;
  parseValue(className: string): ParseResult | null;
  applyStyle(parsedClass: ParsedClass, styles: Partial<ParsedStyles>, context: ParserContext): void;
}

/**
 * 파서 적용 결과
 */
export interface ParseResult {
  property: string;
  value: any;
  isArbitrary?: boolean;
  modifier?: string;
} 
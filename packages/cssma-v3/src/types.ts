/**
 * Core type definitions for CSSMA-V3
 */

/**
 * Individual parsed style result (used by individual parsers)
 */
export interface ParsedStyle {
  property: string;
  value: string;
  variant: 'preset' | 'arbitrary';
  additionalProperties?: Array<{
    property: string;
    value: string;
  }>;
}

/**
 * 기본 설정 타입
 */
export interface Config {
  prefix: string;
  separator: string;
  important: boolean;
  enableArbitraryValues: boolean;
  enableStateModifiers: boolean;
  enableResponsiveModifiers: boolean;
}

/**
 * 색상 타입
 */
export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * 간격 타입 (상하좌우)
 */
export interface BoxSpacing {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * 그리드 간격 타입
 */
export interface GridGap {
  row?: number;
  column?: number;
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
 * 디자인 프리셋 타입
 */
export interface DesignPreset {
  name: string;
  version: string;
  colors: Record<string, Record<string, Color>>;
  spacing: Record<string, number>;
  screens?: Record<string, string>;
  typography: {
    fontSize: Record<string, number>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, number>;
    letterSpacing: Record<string, number>;
    fontFamily: Record<string, string>;
  };
  effects: {
    borderRadius: Record<string, number>;
    boxShadow: Record<string, string>;
    opacity: Record<string, number>;
    blur: Record<string, number>;
    textShadow?: Record<string, string>;
  };
  layout: {
    width: Record<string, number | string>;
    height: Record<string, number | string>;
    maxWidth: Record<string, number | string>;
    maxHeight: Record<string, number | string>;
    minWidth: Record<string, number | string>;
    minHeight: Record<string, number | string>;
  };
  animation?: {
    presets: Record<string, AnimationPreset>;
    durations: Record<string, number>;
    easings: Record<string, string>;
  };
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
  | 'blend-modes';

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
  | 'first-line' | 'first-letter' | 'backdrop' | 'file';

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
export interface BreakpointModifier {
  type: 'min-width' | 'max-width';
  value: string;
}

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
 * 파싱된 클래스 정보 타입
 */
export interface ParsedClass {
  original: string;
  className: string;
  baseClassName: string;
  category: StyleCategory;
  property: string;
  value: string;
  isArbitrary?: boolean;
  stateModifier?: StateModifier;
  breakpointModifier?: BreakpointModifier;
  containerQueryModifier?: ContainerQueryModifier;
  stateModifiers?: StateModifier[];
  // 복합 브레이크포인트 지원
  breakpointModifiers?: BreakpointModifier[];
  specialSelector?: {
    type: 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type';
    value: string;
  };
  // 단일 모디파이어 대신 모디파이어 배열 사용
  modifiers?: {
    state?: StateModifier[];
    breakpoint?: string;
    container?: string;
    special?: {
      type: 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type';
      value: string;
    };
  };
  modifier?: string;
  breakpoint?: string;
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
  gap?: GridGap | number;
}

/**
 * 색상 스타일 타입
 */
export interface ColorStyles {
  text?: Color;
  background?: Color;
  border?: Color;
  fill?: Color;
  stroke?: Color;
}

/**
 * 타이포그래피 스타일 타입
 */
export interface TypographyStyles {
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: number;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textDecoration?: 'none' | 'underline' | 'line-through' | 'overline';
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

/**
 * 레이아웃 스타일 타입
 */
export interface LayoutStyles {
  display?: 'flex' | 'block' | 'inline' | 'grid' | 'none';
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
  aspectRatio?: string;
  columns?: string | number;
  breakAfter?: 'auto' | 'avoid' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'column';
  breakBefore?: 'auto' | 'avoid' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'column';
  breakInside?: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column';
  boxDecorationBreak?: 'clone' | 'slice';
  boxSizing?: 'border-box' | 'content-box';
  float?: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end';
  clear?: 'left' | 'right' | 'both' | 'none' | 'inline-start' | 'inline-end';
  isolation?: 'isolate' | 'auto';
}

/**
 * 효과 스타일 타입
 */
export interface EffectsStyles {
  borderRadius?: number;
  borderWidth?: BoxSpacing;
  boxShadow?: string[];
  textShadow?: string;
  opacity?: number;
  blur?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  saturate?: number;
  filter?: string;
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
  position?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
  type?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky'; // 테스트 호환성
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
  rotate?: number | string;
  translateX?: number | string;
  translateY?: number | string;
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
  // 메타 정보
  meta?: StyleMeta;
  // 단일 상태 변형자 - Record<string, ...>로 변경
  states?: Record<string, Partial<ParsedStyles>>;
  // 중첩된 상태 변형자 (예: hover:focus:)
  nestedStates?: Record<string, Partial<ParsedStyles>>;
  // 의사 요소
  pseudoElements?: Record<string, Partial<ParsedStyles>>;
  // 특수 선택자 (nth-child 등)
  specialSelectors?: Record<string, Partial<ParsedStyles>>;
  // 반응형 중단점 - 문자열 키로 변경, 중첩 브레이크포인트 지원
  breakpoints?: Record<string, Partial<ParsedStyles> & { 
    states?: Record<string, Partial<ParsedStyles>>;
    nestedStates?: Record<string, Partial<ParsedStyles>>;
    specialSelectors?: Record<string, Partial<ParsedStyles>>;
    breakpoints?: Record<string, Partial<ParsedStyles>>;
  }>;
  // 컨테이너 쿼리 - 문자열 키로 변경
  containers?: Record<string, Partial<ParsedStyles> & { 
    states?: Record<string, Partial<ParsedStyles>>;
    nestedStates?: Record<string, Partial<ParsedStyles>>;
    specialSelectors?: Record<string, Partial<ParsedStyles>>;
  }>;
  transitions: TransitionsStyles;
  backgrounds: BackgroundsStyles;
  borders: BordersStyles;
  overflow: OverflowStyles;
  accessibility: AccessibilityStyles;
  blendModes: BlendModesStyles;
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
  backgroundColor?: string;
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
  borderColor?: string;
  borderTopColor?: string;
  borderRightColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomRightRadius?: string;
  borderBottomLeftRadius?: string;
  divideXWidth?: string;
  divideYWidth?: string;
  divideStyle?: string;
  divideColor?: string;
  divideReverse?: string;
  ringWidth?: string;
  ringColor?: string;
  ringOffsetWidth?: string;
  ringOffsetColor?: string;
  ringInset?: string;
  outlineWidth?: string;
  outlineStyle?: string;
  outlineColor?: string;
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
}

/**
 * 블렌드 모드 스타일 타입
 */
export interface BlendModesStyles {
  mixBlendMode?: string;
  backgroundBlendMode?: string;
  isolation?: string;
} 
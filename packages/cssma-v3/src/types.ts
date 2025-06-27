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
 * 🎯 Tailwind CSS v4.1 순서 보장 Modifier 시스템
 * 
 * Modifier는 다음 순서로 적용됩니다:
 * 1. At-rules (@media, @supports, @container)
 * 2. Arbitrary variants ([&...])
 * 3. Responsive breakpoints (sm:, md:, lg:, xl:, 2xl:)
 * 4. Dark mode (dark:, light:)
 * 5. Motion preferences (motion-reduce:, motion-safe:)
 * 6. Group/Peer modifiers (group-hover:, peer-focus:)
 * 7. State modifiers (hover:, focus:, active:, etc.)
 * 8. Pseudo-elements (before:, after:, etc.)
 */

/**
 * 통합 Modifier 타입 - 모든 modifier의 기본 인터페이스
 */
export interface BaseModifier {
  type: ModifierType;
  raw: string;           // 원본 modifier 문자열 (예: "md", "hover", "group-focus")
  priority: number;      // 적용 우선순위 (낮을수록 높은 우선순위)
  cssSelector?: string;  // 생성된 CSS 선택자
}

/**
 * Modifier 타입 열거형
 */
export enum ModifierType {
  // At-rules (최고 우선순위)
  MEDIA_QUERY = 'media-query',
  CONTAINER_QUERY = 'container-query', 
  SUPPORTS_QUERY = 'supports-query',
  
  // Arbitrary variants
  ARBITRARY_VARIANT = 'arbitrary-variant',
  ARBITRARY_ATTRIBUTE = 'arbitrary-attribute',
  
  // Responsive breakpoints
  RESPONSIVE = 'responsive',
  
  // Theme preferences
  COLOR_SCHEME = 'color-scheme',      // dark, light
  MOTION = 'motion',                  // motion-safe, motion-reduce
  CONTRAST = 'contrast',              // contrast-more, contrast-less
  
  // Group/Peer modifiers
  GROUP = 'group',
  PEER = 'peer',
  
  // State modifiers
  PSEUDO_CLASS = 'pseudo-class',      // hover, focus, active, etc.
  
  // Pseudo-elements
  PSEUDO_ELEMENT = 'pseudo-element',  // before, after, placeholder, etc.
  
  // Attribute selectors
  ARIA = 'aria',
  DATA = 'data',
  
  // Complex selectors
  NOT = 'not',
  HAS = 'has',
  NTH_CHILD = 'nth-child',
  NTH_OF_TYPE = 'nth-of-type',
  
  // Special modifiers
  STARTING = 'starting',
  NOSCRIPT = 'noscript',
  PRINT = 'print',
  SCRIPTING = 'scripting'
}

/**
 * 반응형 Modifier
 */
export interface ResponsiveModifier extends BaseModifier {
  type: ModifierType.RESPONSIVE;
  breakpoint: BreakpointModifier;
}

/**
 * 컨테이너 쿼리 Modifier
 */
export interface ContainerQueryModifier extends BaseModifier {
  type: ModifierType.CONTAINER_QUERY;
  container: ContainerQueryConfig;
}

export interface ContainerQueryConfig {
  type: 'min-width' | 'max-width' | 'named-container';
  value: string;
  containerName?: string;
}

/**
 * 미디어 쿼리 Modifier
 */
export interface MediaQueryModifier extends BaseModifier {
  type: ModifierType.MEDIA_QUERY;
  mediaQuery: string;
}

/**
 * Supports 쿼리 Modifier
 */
export interface SupportsQueryModifier extends BaseModifier {
  type: ModifierType.SUPPORTS_QUERY;
  supportsQuery: string;
}

/**
 * Arbitrary Variant Modifier
 */
export interface ArbitraryVariantModifier extends BaseModifier {
  type: ModifierType.ARBITRARY_VARIANT;
  selector: string;
}

/**
 * Arbitrary Attribute Modifier
 */
export interface ArbitraryAttributeModifier extends BaseModifier {
  type: ModifierType.ARBITRARY_ATTRIBUTE;
  attribute: string;
  value?: string;
}

/**
 * 색상 스킴 Modifier
 */
export interface ColorSchemeModifier extends BaseModifier {
  type: ModifierType.COLOR_SCHEME;
  scheme: 'dark' | 'light';
}

/**
 * 모션 Modifier
 */
export interface MotionModifier extends BaseModifier {
  type: ModifierType.MOTION;
  preference: 'safe' | 'reduce';
}

/**
 * 대비 Modifier
 */
export interface ContrastModifier extends BaseModifier {
  type: ModifierType.CONTRAST;
  level: 'more' | 'less';
}

/**
 * Group Modifier
 */
export interface GroupModifier extends BaseModifier {
  type: ModifierType.GROUP;
  state?: string;
}

/**
 * Peer Modifier
 */
export interface PeerModifier extends BaseModifier {
  type: ModifierType.PEER;
  state?: string;
}

/**
 * Pseudo-class Modifier
 */
export interface PseudoClassModifier extends BaseModifier {
  type: ModifierType.PSEUDO_CLASS;
  pseudoClass: string;
}

/**
 * Pseudo-element Modifier
 */
export interface PseudoElementModifier extends BaseModifier {
  type: ModifierType.PSEUDO_ELEMENT;
  pseudoElement: string;
}

/**
 * ARIA Modifier
 */
export interface AriaModifier extends BaseModifier {
  type: ModifierType.ARIA;
  attribute: string;
  value?: string;
}

/**
 * Data Modifier
 */
export interface DataModifier extends BaseModifier {
  type: ModifierType.DATA;
  attribute: string;
  value?: string;
}

/**
 * Not Modifier
 */
export interface NotModifier extends BaseModifier {
  type: ModifierType.NOT;
  negatedSelector: string;
}

/**
 * Has Modifier
 */
export interface HasModifier extends BaseModifier {
  type: ModifierType.HAS;
  selector: string;
}

/**
 * Nth-child Modifier
 */
export interface NthChildModifier extends BaseModifier {
  type: ModifierType.NTH_CHILD;
  nthType: 'nth-child' | 'nth-last-child';
  formula: string;
}

/**
 * Nth-of-type Modifier
 */
export interface NthOfTypeModifier extends BaseModifier {
  type: ModifierType.NTH_OF_TYPE;
  nthType: 'nth-of-type' | 'nth-last-of-type';
  formula: string;
}

/**
 * 특수 Modifier
 */
export interface SpecialModifier extends BaseModifier {
  type: ModifierType.STARTING | ModifierType.NOSCRIPT | ModifierType.PRINT | ModifierType.SCRIPTING;
  condition?: string;
}

/**
 * 통합 Modifier Union Type
 */
export type ParsedModifier = 
  | ResponsiveModifier
  | ContainerQueryModifier
  | MediaQueryModifier
  | SupportsQueryModifier
  | ArbitraryVariantModifier
  | ArbitraryAttributeModifier
  | ColorSchemeModifier
  | MotionModifier
  | ContrastModifier
  | GroupModifier
  | PeerModifier
  | PseudoClassModifier
  | PseudoElementModifier
  | AriaModifier
  | DataModifier
  | NotModifier
  | HasModifier
  | NthChildModifier
  | NthOfTypeModifier
  | SpecialModifier;


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
 * Tailwind/CSSMA 유틸리티 파서의 표준 파싱 결과 타입
 */
export interface ParsedUtility {
  type: string; // 유틸리티 종류 (예: 'margin', 'brightness', ...)
  raw: string;  // 원본 클래스명
  value?: string | number; // 값(숫자/문자열)
  preset?: string;         // 프리셋명(있는 경우)
  direction?: string;      // 방향성(있는 경우)
  axis?: string;           // 축(있는 경우)
  negative?: boolean;      // 음수 여부(있는 경우)
  arbitrary?: boolean;     // 임의 값 여부
  customProperty?: boolean;// 커스텀 프로퍼티 여부
  important?: boolean;     // !important 플래그
  [key: string]: any;      // 유틸리티별 확장 필드 허용
} 

export interface ParsedClass {
  original: string;
  modifiers: ParsedModifier[];
  utility: ParsedUtility | null;
}
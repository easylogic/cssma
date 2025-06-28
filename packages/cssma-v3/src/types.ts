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


// Modifier interfaces matching src/parser/modifiers/*.ts
export interface PseudoModifier { type: 'pseudo'; name: string; }
export interface PseudoElementModifier { type: 'pseudo-element'; name: string; }
export interface GroupModifier { type: 'group'; state: string; }
export interface PeerModifier { type: 'peer'; state: string; }
export interface AttributeModifier { type: 'attribute'; attr: string; value?: string; }
export interface AriaModifier { type: 'aria'; attr: string; value?: string; }
export interface DataModifier { type: 'data'; attr: string; value?: string; }
export interface StateModifier { type: 'state'; attr?: string; value?: string; }
export interface LogicalModifier { type: 'logical'; op: 'has' | 'not'; value: any; }
export interface NthModifier { type: 'nth'; value: string; }
export interface NthOfTypeModifier { type: 'nth-of-type'; value: string; }
export interface NthLastOfTypeModifier { type: 'nth-last-of-type'; value: string; }
export interface ContainerModifier { type: 'container'; variant?: string; name?: string; value?: string; }
export interface MotionModifier { type: 'motion'; mode: string; }
export interface DirectionModifier { type: 'direction'; value: string; }
export interface BreakpointModifier { type: 'breakpoint'; name: string; }
export interface ResponsiveModifier { type: 'responsive'; variant: string; value?: string; }
export interface MediaModifier { type: 'media'; name: string; }
export interface SupportsModifier { type: 'supports'; query?: string; state?: string; feature?: string; }
export interface DarkModeModifier { type: 'darkmode'; mode: string; }
export interface ArbitraryModifier { type: 'arbitrary'; selector: string; }
export interface UnknownModifier { type: 'unknown'; raw: string; }

// Union type
export type ParsedModifier =
  | PseudoModifier
  | PseudoElementModifier
  | GroupModifier
  | PeerModifier
  | AttributeModifier
  | AriaModifier
  | DataModifier
  | StateModifier
  | LogicalModifier
  | NthModifier
  | NthOfTypeModifier
  | NthLastOfTypeModifier
  | ContainerModifier
  | MotionModifier
  | DirectionModifier
  | BreakpointModifier
  | ResponsiveModifier
  | MediaModifier
  | SupportsModifier
  | DarkModeModifier
  | ArbitraryModifier
  | UnknownModifier;

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
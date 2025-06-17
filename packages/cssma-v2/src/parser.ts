/**
 * CSSMA v2 Unified Parser
 * 모든 CSS 클래스를 preset 기반으로 파싱
 */

import type {
  CSSMAPreset,
  ParsedStyles,
  SpacingStyles,
  ColorStyles,
  TypographyStyles,
  LayoutStyles,
  EffectStyles,
  FigmaColor,
  BoxSpacing,
  ClassNameMatch,
  StyleCategory,
  AnimationStyles,
  AnimationDirection,
  AnimationFillMode,
  AnimationPlayState,
  PositionStyles,
  TransformStyles,
  StateModifier,
  BreakpointModifier,
  StyleMeta,
  Color,
  ParserConfig,
  ClassMatchResult
} from './types';

// ============================================================================
// 🔍 Class Name Pattern Definitions
// ============================================================================

interface ClassNamePattern {
  regex: RegExp;
  category: StyleCategory;
  property?: string;
  valueIndex?: number; // 값을 추출할 캡처 그룹 인덱스
  defaultValue?: string; // 기본값
  specialHandler?: (match: RegExpMatchArray, className: string) => ClassNameMatch | null; // 특수 케이스 핸들러
}

// 스타일 카테고리별 패턴 정의
const SPACING_PATTERNS: ClassNamePattern[] = [
  { regex: /^(p|pt|pr|pb|pl|px|py|m|mt|mr|mb|ml|mx|my)-(.+)$/, category: 'spacing', valueIndex: 2 },
  { regex: /^(gap|gap-x|gap-y)-(.+)$/, category: 'spacing', valueIndex: 2 },
];

const COLOR_PATTERNS: ClassNamePattern[] = [
  { regex: /^(bg|text|border|fill|stroke)-(.+)$/, category: 'colors', valueIndex: 2 },
];

const TYPOGRAPHY_PATTERNS: ClassNamePattern[] = [
  { regex: /^text-(.+)$/, category: 'typography', valueIndex: 1 },
  { regex: /^font-(.+)$/, category: 'typography', valueIndex: 1 },
  { regex: /^(leading|tracking)-(.+)$/, category: 'typography', valueIndex: 2 },
  { 
    regex: /^(text-left|text-center|text-right|text-justify|underline|line-through|no-underline)$/, 
    category: 'typography', 
    defaultValue: 'default' 
  },
];

const LAYOUT_PATTERNS: ClassNamePattern[] = [
  { regex: /^(w|h|max-w|max-h|min-w|min-h)-(.+)$/, category: 'layout', valueIndex: 2 },
  { regex: /^(flex|block|inline|hidden)$/, category: 'layout', defaultValue: 'default' },
  { 
    regex: /^(flex-row|flex-col|justify-start|justify-center|justify-end|justify-between|items-start|items-center|items-end|items-stretch)$/, 
    category: 'layout', 
    defaultValue: 'default' 
  },
];

// 그리드 시스템 패턴 추가
const GRID_PATTERNS: ClassNamePattern[] = [
  { regex: /^grid$/, category: 'layout', property: 'display', defaultValue: 'grid' },
  { regex: /^grid-cols-(.+)$/, category: 'layout', property: 'gridTemplateColumns', valueIndex: 1 },
  { regex: /^grid-rows-(.+)$/, category: 'layout', property: 'gridTemplateRows', valueIndex: 1 },
  { regex: /^col-span-(.+)$/, category: 'layout', property: 'gridColumn', valueIndex: 1 },
  { regex: /^row-span-(.+)$/, category: 'layout', property: 'gridRow', valueIndex: 1 },
  { regex: /^col-start-(.+)$/, category: 'layout', property: 'gridColumnStart', valueIndex: 1 },
  { regex: /^col-end-(.+)$/, category: 'layout', property: 'gridColumnEnd', valueIndex: 1 },
  { regex: /^row-start-(.+)$/, category: 'layout', property: 'gridRowStart', valueIndex: 1 },
  { regex: /^row-end-(.+)$/, category: 'layout', property: 'gridRowEnd', valueIndex: 1 },
  { regex: /^grid-flow-(.+)$/, category: 'layout', property: 'gridAutoFlow', valueIndex: 1 },
];

// 위치 속성 패턴 추가
const POSITION_PATTERNS: ClassNamePattern[] = [
  { regex: /^(static|fixed|absolute|relative|sticky)$/, category: 'position', property: 'position', defaultValue: 'default' },
  { regex: /^(top|right|bottom|left)-(.+)$/, category: 'position', valueIndex: 2 },
  { regex: /^inset-(.+)$/, category: 'position', property: 'inset', valueIndex: 1 },
  { regex: /^z-(.+)$/, category: 'position', property: 'zIndex', valueIndex: 1 },
];

const EFFECTS_PATTERNS: ClassNamePattern[] = [
  { regex: /^rounded-(.+)$/, category: 'effects', valueIndex: 1 },
  { regex: /^(shadow|opacity|blur)-(.+)$/, category: 'effects', valueIndex: 2 },
  { regex: /^rounded$/, category: 'effects', defaultValue: 'default' },
];

// 변형(Transform) 패턴 추가
const TRANSFORM_PATTERNS: ClassNamePattern[] = [
  { regex: /^scale-(.+)$/, category: 'transform', property: 'scale', valueIndex: 1 },
  { regex: /^scale-x-(.+)$/, category: 'transform', property: 'scaleX', valueIndex: 1 },
  { regex: /^scale-y-(.+)$/, category: 'transform', property: 'scaleY', valueIndex: 1 },
  { regex: /^rotate-(.+)$/, category: 'transform', property: 'rotate', valueIndex: 1 },
  { regex: /^translate-x-(.+)$/, category: 'transform', property: 'translateX', valueIndex: 1 },
  { regex: /^translate-y-(.+)$/, category: 'transform', property: 'translateY', valueIndex: 1 },
  { regex: /^skew-x-(.+)$/, category: 'transform', property: 'skewX', valueIndex: 1 },
  { regex: /^skew-y-(.+)$/, category: 'transform', property: 'skewY', valueIndex: 1 },
  { regex: /^origin-(.+)$/, category: 'transform', property: 'transformOrigin', valueIndex: 1 },
];

// 애니메이션 특수 케이스 핸들러
const handleTransitionSpecial = (match: RegExpMatchArray, className: string): ClassNameMatch => {
  const parts = className.split('-');
  if (parts.length >= 3) {
    const property = parts[1];
    const value = parts.slice(2).join('-');
    return {
      className,
      category: 'animation',
      property: `transition-${property}`,
      value,
    };
  }
  return {
    className,
    category: 'animation',
    property: 'transition',
    value: match[1] || 'default',
  };
};

const ANIMATION_PATTERNS: ClassNamePattern[] = [
  { regex: /^animate-(.+)$/, category: 'animation', property: 'animate', valueIndex: 1 },
  { regex: /^duration-(.+)$/, category: 'animation', property: 'duration', valueIndex: 1 },
  { regex: /^delay-(.+)$/, category: 'animation', property: 'delay', valueIndex: 1 },
  { regex: /^ease-(.+)$/, category: 'animation', property: 'ease', valueIndex: 1 },
  { regex: /^iteration-(.+)$/, category: 'animation', property: 'iteration', valueIndex: 1 },
  { regex: /^direction-(.+)$/, category: 'animation', property: 'direction', valueIndex: 1 },
  { 
    regex: /^fill-(.+)$/, 
    category: 'animation', 
    property: 'fill', 
    valueIndex: 1,
    specialHandler: (match, className) => {
      // fill-current는 색상 속성이므로 null 반환
      if (className === 'fill-current') return null;
      return {
        className,
        category: 'animation',
        property: 'fill',
        value: match[1] || '',
      };
    }
  },
  { regex: /^play-(.+)$/, category: 'animation', property: 'play', valueIndex: 1 },
  { regex: /^transition$/, category: 'animation', property: 'transition', defaultValue: 'default' },
  { regex: /^transition-([^-]+)$/, category: 'animation', property: 'transition', valueIndex: 1 },
  { 
    regex: /^transition-([^-]+)-(.+)$/, 
    category: 'animation',
    specialHandler: handleTransitionSpecial
  },
];

// 모든 패턴을 하나의 배열로 통합
const CLASS_NAME_PATTERNS: ClassNamePattern[] = [
  ...SPACING_PATTERNS,
  ...COLOR_PATTERNS,
  ...TYPOGRAPHY_PATTERNS,
  ...LAYOUT_PATTERNS,
  ...GRID_PATTERNS,
  ...POSITION_PATTERNS,
  ...EFFECTS_PATTERNS,
  ...TRANSFORM_PATTERNS,
  ...ANIMATION_PATTERNS,
];

// 기본 파서 설정
const defaultConfig: ParserConfig = {
  enableArbitraryValues: true,
  enableStateModifiers: true,
  enableResponsiveModifiers: true,
};

export class UnifiedParser {
  private config: ParserConfig;
  private preset: CSSMAPreset;

  constructor(config: ParserConfig = defaultConfig, preset?: CSSMAPreset) {
    this.config = config;
    
    // 기본 프리셋 설정 (실제로는 외부에서 주입해야 함)
    this.preset = preset || {
      name: 'default',
      version: '1.0.0',
      spacing: {},
      colors: {},
      typography: {
        fontSize: {},
        fontWeight: {},
        lineHeight: {},
        letterSpacing: {},
        fontFamily: {}
      },
      effects: {
        borderRadius: {},
        boxShadow: {},
        opacity: {},
        blur: {}
      },
      layout: {
        width: {},
        height: {},
        maxWidth: {},
        maxHeight: {},
        minWidth: {},
        minHeight: {}
      }
    };
  }

  // 디버깅용 메서드
  debugMatchClassName(className: string): ClassNameMatch | null {
    return this.matchClassName(className);
  }

  // ============================================================================
  // 🎯 Main Parse Method
  // ============================================================================

  parse(input: string): ParsedStyles {
    const startTime = performance.now();
    
    // 입력 문자열을 토큰으로 분리
    const classNames = this.tokenizeInput(input);
    
    // 결과 스타일 객체 초기화
    const result = this.createEmptyStyles();
    result.meta.originalInput = input;
    
    // 상태 변형자 스타일을 위한 객체
    const stateStyles: Record<string, Partial<ParsedStyles>> = {
      hover: {},
      focus: {},
      active: {},
      disabled: {},
      visited: {},
      checked: {},
      'group-hover': {},
      dark: {},
    };
    
    // 반응형 미디어 쿼리 스타일을 위한 객체
    const breakpointStyles: Record<BreakpointModifier, Partial<ParsedStyles>> = {
      sm: {},
      md: {},
      lg: {},
      xl: {},
      '2xl': {},
    };
    
    // 중첩 변형자 스타일을 위한 객체 (breakpoint + state)
    const nestedStyles: Record<BreakpointModifier, Record<string, Partial<ParsedStyles>>> = {
      sm: {
        hover: {}, focus: {}, active: {}, disabled: {}, visited: {}, checked: {}, 'group-hover': {}, dark: {}
      },
      md: {
        hover: {}, focus: {}, active: {}, disabled: {}, visited: {}, checked: {}, 'group-hover': {}, dark: {}
      },
      lg: {
        hover: {}, focus: {}, active: {}, disabled: {}, visited: {}, checked: {}, 'group-hover': {}, dark: {}
      },
      xl: {
        hover: {}, focus: {}, active: {}, disabled: {}, visited: {}, checked: {}, 'group-hover': {}, dark: {}
      },
      '2xl': {
        hover: {}, focus: {}, active: {}, disabled: {}, visited: {}, checked: {}, 'group-hover': {}, dark: {}
      },
    };

    // 각 클래스명을 파싱
    for (const className of classNames) {
      try {
        // 1. 먼저 모디파이어 추출
        const { modifiers, baseClass } = this.extractModifiers(className);
        
        // 2. 기본 클래스 파싱
        const classResult = this.parseBaseClass(baseClass);
        
        if (classResult) {
          // 3. 결과에 모디파이어 정보 추가
          classResult.modifiers = modifiers;
          
          // 4. 결과를 스타일 객체에 적용
          this.applyClassResultToStyles(result, classResult);
          result.meta.classNames.push(className);
        }
      } catch (error) {
        result.meta.warnings.push(`Failed to parse "${className}": ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    
    // 상태 변형자 스타일 병합
    result.states = {};
    for (const [modifier, styles] of Object.entries(stateStyles)) {
      if (Object.keys(styles).length > 0) {
        // group-hover를 groupHover로 변환
        const key = modifier === 'group-hover' ? 'groupHover' : modifier;
        result.states[key as keyof typeof result.states] = styles;
      }
    }
    
    // 반응형 미디어 쿼리 스타일 병합
    result.breakpoints = {};
    for (const [breakpoint, styles] of Object.entries(breakpointStyles)) {
      if (Object.keys(styles).length > 0) {
        // 중첩 변형자 스타일 병합
        const nestedModifiers = nestedStyles[breakpoint as BreakpointModifier];
        const states: Record<string, Partial<ParsedStyles>> = {};
        
        if (nestedModifiers) {
          for (const [modifier, nestedStyle] of Object.entries(nestedModifiers)) {
            if (Object.keys(nestedStyle).length > 0) {
              states[modifier] = nestedStyle;
            }
          }
        }
        
        // 상태 변형자가 있으면 추가
        if (Object.keys(states).length > 0) {
          styles.states = states;
        }
        
        result.breakpoints[breakpoint as BreakpointModifier] = styles;
      }
    }

    result.meta.parseTime = performance.now() - startTime;
    return result;
  }

  // ============================================================================
  // 🔍 Individual Class Parser
  // ============================================================================

  parseClassName(className: string): Partial<ParsedStyles> {
    const match = this.matchClassName(className);
    if (!match) return {};

    // 임의 값 처리
    if (match.isArbitrary) {
      return this.parseArbitraryValue(match);
    }

    // 일반 클래스 처리
    switch (match.category) {
      case 'spacing':
        return { spacing: this.parseSpacing(match) };
      case 'colors':
        return { colors: this.parseColor(match) };
      case 'typography':
        return { typography: this.parseTypography(match) };
      case 'layout':
        return { layout: this.parseLayout(match) };
      case 'effects':
        return { effects: this.parseEffects(match) };
      case 'animation':
        return { animation: this.parseAnimation(match) };
      case 'position':
        return { position: this.parsePosition(match) };
      case 'transform':
        return { transform: this.parseTransform(match) };
      default:
        return {};
    }
  }

  // ============================================================================
  // 🎨 Category Parsers
  // ============================================================================

  private parseSpacing(match: ClassNameMatch): SpacingStyles {
    const { property, value } = match;
    const numericValue = this.resolveSpacingValue(value);

    const result: SpacingStyles = {};

    switch (property) {
      case 'p': // padding
        result.padding = { top: numericValue, right: numericValue, bottom: numericValue, left: numericValue };
        break;
      case 'pt': // padding-top
        result.padding = { ...result.padding, top: numericValue };
        break;
      case 'pr': // padding-right
        result.padding = { ...result.padding, right: numericValue };
        break;
      case 'pb': // padding-bottom
        result.padding = { ...result.padding, bottom: numericValue };
        break;
      case 'pl': // padding-left
        result.padding = { ...result.padding, left: numericValue };
        break;
      case 'px': // padding horizontal
        result.padding = { ...result.padding, left: numericValue, right: numericValue };
        break;
      case 'py': // padding vertical
        result.padding = { ...result.padding, top: numericValue, bottom: numericValue };
        break;
      case 'm': // margin
        result.margin = { top: numericValue, right: numericValue, bottom: numericValue, left: numericValue };
        break;
      case 'mt': // margin-top
        result.margin = { ...result.margin, top: numericValue };
        break;
      case 'mr': // margin-right
        result.margin = { ...result.margin, right: numericValue };
        break;
      case 'mb': // margin-bottom
        result.margin = { ...result.margin, bottom: numericValue };
        break;
      case 'ml': // margin-left
        result.margin = { ...result.margin, left: numericValue };
        break;
      case 'mx': // margin horizontal
        result.margin = { ...result.margin, left: numericValue, right: numericValue };
        break;
      case 'my': // margin vertical
        result.margin = { ...result.margin, top: numericValue, bottom: numericValue };
        break;
      case 'gap':
        result.gap = { row: numericValue, column: numericValue };
        break;
      case 'gap-x':
        result.gap = { ...result.gap, column: numericValue };
        break;
      case 'gap-y':
        result.gap = { ...result.gap, row: numericValue };
        break;
    }

    return result;
  }

  private parseColor(match: ClassNameMatch): ColorStyles {
    const { property, value } = match;
    const color = this.resolveColorValue(value);

    const result: ColorStyles = {};

    switch (property) {
      case 'bg':
        result.background = color;
        break;
      case 'text':
        result.text = color;
        break;
      case 'border':
        result.border = color;
        break;
      case 'fill':
        result.fill = color;
        break;
      case 'stroke':
        result.stroke = color;
        break;
    }

    return result;
  }

  private parseTypography(match: ClassNameMatch): TypographyStyles {
    const { property, value } = match;
    const result: TypographyStyles = {};

    switch (property) {
      case 'text':
        // text-lg, text-sm 등
        if (this.preset.typography.fontSize[value]) {
          result.fontSize = this.preset.typography.fontSize[value];
        }
        break;
      case 'font':
        if (this.preset.typography.fontWeight[value]) {
          result.fontWeight = this.preset.typography.fontWeight[value];
        } else if (this.preset.typography.fontFamily[value]) {
          result.fontFamily = this.preset.typography.fontFamily[value];
        }
        break;
      case 'leading':
        if (this.preset.typography.lineHeight[value]) {
          result.lineHeight = this.preset.typography.lineHeight[value];
        }
        break;
      case 'tracking':
        if (this.preset.typography.letterSpacing[value]) {
          result.letterSpacing = this.preset.typography.letterSpacing[value];
        }
        break;
      case 'text-left':
        result.textAlign = 'left';
        break;
      case 'text-center':
        result.textAlign = 'center';
        break;
      case 'text-right':
        result.textAlign = 'right';
        break;
      case 'text-justify':
        result.textAlign = 'justify';
        break;
      case 'underline':
        result.textDecoration = 'underline';
        break;
      case 'line-through':
        result.textDecoration = 'line-through';
        break;
      case 'no-underline':
        result.textDecoration = 'none';
        break;
    }

    return result;
  }

  private parseLayout(match: ClassNameMatch): LayoutStyles {
    const { property, value } = match;
    const result: LayoutStyles = {};

    // 디스플레이 속성 처리
    if (['flex', 'block', 'inline', 'hidden', 'grid'].includes(property)) {
      result.display = property as 'flex' | 'block' | 'inline' | 'grid' | 'none';
      return result;
    }

    // 너비/높이 처리
    if (['w', 'h', 'max-w', 'max-h', 'min-w', 'min-h'].includes(property)) {
      const sizeProperty = this.getFullSizeProperty(property);
      const sizeValue = this.resolveSizeValue(value, property.includes('w') ? 'width' : 'height');
      
      // Type-safe assignment
      switch(sizeProperty) {
        case 'width':
          result.width = sizeValue;
          break;
        case 'height':
          result.height = sizeValue;
          break;
        case 'maxWidth':
          result.maxWidth = sizeValue;
          break;
        case 'maxHeight':
          result.maxHeight = sizeValue;
          break;
        case 'minWidth':
          result.minWidth = sizeValue;
          break;
        case 'minHeight':
          result.minHeight = sizeValue;
          break;
      }
      
      return result;
    }

    // Flex 속성 처리
    if (property === 'flex-row') {
      result.flexDirection = 'row';
      return result;
    }
    if (property === 'flex-col') {
      result.flexDirection = 'column';
      return result;
    }

    // Justify 속성 처리
    if (property.startsWith('justify-')) {
      result.justifyContent = value;
      return result;
    }

    // Items 속성 처리
    if (property.startsWith('items-')) {
      result.alignItems = value;
      return result;
    }

    // 그리드 속성 처리
    if (property === 'gridTemplateColumns') {
      // grid-cols-3 -> gridTemplateColumns: repeat(3, minmax(0, 1fr))
      result.gridTemplateColumns = `repeat(${value}, minmax(0, 1fr))`;
      return result;
    }

    if (property === 'gridTemplateRows') {
      // grid-rows-3 -> gridTemplateRows: repeat(3, minmax(0, 1fr))
      result.gridTemplateRows = `repeat(${value}, minmax(0, 1fr))`;
      return result;
    }

    if (property === 'gridColumn') {
      // col-span-2 -> gridColumn: span 2 / span 2
      result.gridColumn = `span ${value} / span ${value}`;
      return result;
    }

    if (property === 'gridRow') {
      // row-span-2 -> gridRow: span 2 / span 2
      result.gridRow = `span ${value} / span ${value}`;
      return result;
    }

    if (property === 'gridColumnStart') {
      result.gridColumnStart = value;
      return result;
    }

    if (property === 'gridColumnEnd') {
      result.gridColumnEnd = value;
      return result;
    }

    if (property === 'gridRowStart') {
      result.gridRowStart = value;
      return result;
    }

    if (property === 'gridRowEnd') {
      result.gridRowEnd = value;
      return result;
    }

    if (property === 'gridAutoFlow') {
      result.gridAutoFlow = value;
      return result;
    }

    return result;
  }

  private parseEffects(match: ClassNameMatch): EffectStyles {
    const { property, value } = match;
    const result: EffectStyles = {};

    switch (property) {
      case 'rounded':
        result.borderRadius = this.preset.effects.borderRadius[value] || 0;
        break;
      case 'shadow':
        const shadowValue = this.preset.effects.boxShadow[value];
        if (shadowValue) {
          result.boxShadow = [shadowValue];
        }
        break;
      case 'opacity':
        result.opacity = this.preset.effects.opacity[value] || 1;
        break;
      case 'blur':
        result.blur = this.preset.effects.blur[value] || 0;
        break;
    }

    return result;
  }

  // ============================================================================
  // 🎬 Animation Parser
  // ============================================================================

  private parseAnimation(match: ClassNameMatch): AnimationStyles {
    const { property, value } = match;
    const result: AnimationStyles = {};

    // 애니메이션 프리셋 처리
    if (property === 'animate') {
      if (this.preset.animation?.presets && this.preset.animation.presets[value]) {
        const preset = this.preset.animation.presets[value];
        result.name = preset.name;
        result.duration = preset.duration;
        result.timingFunction = preset.timingFunction;
        result.delay = preset.delay || 0;
        result.iterationCount = preset.iterationCount || 1;
        result.direction = preset.direction || 'normal';
        result.fillMode = preset.fillMode || 'forwards';
        result.keyframes = preset.keyframes;
        return result;
      } else {
        // 커스텀 애니메이션 이름
        result.name = value;
      }
    }
    // 트랜지션 속성 처리
    else if (property === 'transition') {
      // 기본 트랜지션
      result.transition = {
        property: 'all',
        duration: 300,
        timingFunction: 'ease',
        delay: 0
      };
    }
    else if (property.startsWith('transition-')) {
      // transition-duration, transition-delay 등
      const transitionProperty = property.substring(11); // 'transition-' 제거
      
      // 트랜지션 객체 초기화
      if (!result.transition) {
        result.transition = {
          property: 'all',
          duration: 300,
          timingFunction: 'ease',
          delay: 0
        };
      }
      
      // 각 트랜지션 속성 처리
      switch (transitionProperty) {
        case 'duration':
          result.transition.duration = this.resolveAnimationDuration(value);
          break;
        case 'delay':
          result.transition.delay = this.resolveAnimationDuration(value);
          break;
        case 'property':
          result.transition.property = value;
          break;
        case 'timing':
        case 'easing':
          result.transition.timingFunction = this.resolveAnimationEasing(value);
          break;
      }
    }
    // 개별 애니메이션 속성 처리
    else {
      switch (property) {
        case 'duration':
          // 지속 시간 (ms)
          result.duration = this.resolveAnimationDuration(value);
          break;
        case 'delay':
          // 지연 시간 (ms)
          result.delay = this.resolveAnimationDuration(value);
          break;
        case 'ease':
          // 타이밍 함수
          result.timingFunction = this.resolveAnimationEasing(value);
          break;
        case 'iteration':
          // 반복 횟수
          result.iterationCount = value === 'infinite' ? 'infinite' : parseInt(value, 10) || 1;
          break;
        case 'direction':
          // 애니메이션 방향
          if (['normal', 'reverse', 'alternate', 'alternate-reverse'].includes(value)) {
            result.direction = value as AnimationDirection;
          }
          break;
        case 'fill':
          // 애니메이션 채우기 모드
          if (['none', 'forwards', 'backwards', 'both'].includes(value)) {
            result.fillMode = value as AnimationFillMode;
          }
          break;
        case 'play':
          // 애니메이션 실행 상태
          if (['running', 'paused'].includes(value)) {
            result.playState = value as AnimationPlayState;
          }
          break;
      }
    }

    return result;
  }

  // 애니메이션 지속 시간 해석
  private resolveAnimationDuration(value: string): number {
    // Preset에서 값 찾기
    if (this.preset.animation?.durations && this.preset.animation.durations[value]) {
      return this.preset.animation.durations[value];
    }

    // Arbitrary value 처리 [300ms]
    const arbitraryMatch = value.match(/^\[(.+)\]$/);
    if (arbitraryMatch && arbitraryMatch[1]) {
      const arbitraryValue = arbitraryMatch[1];
      if (arbitraryValue.endsWith('ms')) {
        return parseInt(arbitraryValue.replace('ms', ''), 10);
      }
      if (arbitraryValue.endsWith('s')) {
        return parseFloat(arbitraryValue.replace('s', '')) * 1000;
      }
      // 숫자만 있는 경우 (ms로 가정)
      const numValue = parseFloat(arbitraryValue);
      if (!isNaN(numValue)) {
        return numValue;
      }
    }

    // 숫자만 있는 경우 (ms로 가정)
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return numValue;
    }

    // 기본값
    return 300;
  }

  // 애니메이션 이징 해석
  private resolveAnimationEasing(value: string): string {
    // Preset에서 값 찾기
    if (this.preset.animation?.easings && this.preset.animation.easings[value]) {
      return this.preset.animation.easings[value];
    }

    // Arbitrary value 처리 [cubic-bezier(0.4,0,0.2,1)]
    const arbitraryMatch = value.match(/^\[(.+)\]$/);
    if (arbitraryMatch && arbitraryMatch[1]) {
      return arbitraryMatch[1];
    }

    // 기본 이징 값
    switch (value) {
      case 'linear':
        return 'linear';
      case 'in':
        return 'ease-in';
      case 'out':
        return 'ease-out';
      case 'in-out':
        return 'ease-in-out';
      default:
        return 'ease';
    }
  }

  // ============================================================================
  // 🔍 Class Name Matching
  // ============================================================================

  private matchClassName(className: string): ClassNameMatch | null {
    // 임의 값 패턴 처리 (예: w-[200px], text-[#FF0000])
    const arbitraryMatch = className.match(/^([a-z-]+(?:\/[a-z-]+)?)-\[(.*?)\]$/);
    if (arbitraryMatch) {
      const property = arbitraryMatch[1];
      const value = arbitraryMatch[2];
      
      // 속성에 따라 카테고리 결정
      const category = this.getCategoryFromProperty(property || '');
      if (category) {
        return {
          className,
          category,
          property: property || '',
          value: value || '',
          isArbitrary: true,
        };
      }
    }
    
    // 중첩된 변형자 처리 (예: md:hover:bg-blue-500)
    const nestedMatch = className.match(/^(sm|md|lg|xl|2xl):(hover|focus|active|disabled|visited|checked|group-hover|dark):(.+)$/);
    if (nestedMatch) {
      const breakpoint = nestedMatch[1] as BreakpointModifier;
      const modifier = nestedMatch[2] as StateModifier;
      const baseClassName = nestedMatch[3] || '';
      
      // 기본 클래스명 매칭
      const baseMatch = this.matchClassName(baseClassName);
      if (baseMatch) {
        return {
          ...baseMatch,
          className,
          breakpoint,
          modifier,
        };
      }
      return null;
    }
    
    // 반응형 미디어 쿼리 변형자 처리
    const breakpointMatch = className.match(/^(sm|md|lg|xl|2xl):(.+)$/);
    if (breakpointMatch) {
      const breakpoint = breakpointMatch[1] as BreakpointModifier;
      const baseClassName = breakpointMatch[2] || '';
      
      // 기본 클래스명 매칭
      const baseMatch = this.matchClassName(baseClassName);
      if (baseMatch) {
        return {
          ...baseMatch,
          className,
          breakpoint,
        };
      }
      return null;
    }
    
    // 상태 변형자 처리
    const stateModifierMatch = className.match(/^(hover|focus|active|disabled|visited|checked|group-hover|dark):(.+)$/);
    if (stateModifierMatch) {
      const modifier = stateModifierMatch[1] as StateModifier;
      const baseClassName = stateModifierMatch[2] || '';
      
      // 기본 클래스명 매칭
      const baseMatch = this.matchClassName(baseClassName);
      if (baseMatch) {
        return {
          ...baseMatch,
          className,
          modifier,
        };
      }
      return null;
    }

    // 일반 패턴 매칭
    for (const pattern of CLASS_NAME_PATTERNS) {
      const match = className.match(pattern.regex);
      if (match) {
        // 특수 핸들러가 있으면 사용
        if (pattern.specialHandler) {
          return pattern.specialHandler(match, className);
        }
        
        // 일반 패턴 처리
        return {
          className,
          category: pattern.category,
          property: pattern.property || match[1] || className,
          value: pattern.valueIndex ? (match[pattern.valueIndex] || '') : (pattern.defaultValue || 'default'),
        };
      }
    }

    return null;
  }

  // 속성명으로 카테고리 결정
  private getCategoryFromProperty(property: string): StyleCategory | null {
    // 간격 관련 속성
    if (['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'gap', 'space'].includes(property)) {
      return 'spacing';
    }
    
    // 색상 관련 속성
    if (['text', 'bg', 'border', 'outline', 'ring', 'shadow', 'accent', 'caret', 'fill', 'stroke'].includes(property)) {
      return 'colors';
    }
    
    // 타이포그래피 관련 속성
    if (['text', 'font', 'tracking', 'leading', 'indent', 'whitespace', 'break', 'hyphens', 'content'].includes(property)) {
      return 'typography';
    }
    
    // 레이아웃 관련 속성
    if (['w', 'h', 'min-w', 'min-h', 'max-w', 'max-h', 'aspect', 'container', 'columns', 'grid', 'flex'].includes(property)) {
      return 'layout';
    }
    
    // 효과 관련 속성
    if (['opacity', 'shadow', 'blur', 'brightness', 'contrast', 'grayscale', 'invert', 'saturate', 'sepia', 'backdrop'].includes(property)) {
      return 'effects';
    }
    
    // 애니메이션 관련 속성
    if (['animate', 'transition', 'duration', 'delay', 'ease', 'motion'].includes(property)) {
      return 'animation';
    }
    
    // 위치 관련 속성
    if (['static', 'fixed', 'absolute', 'relative', 'sticky', 'top', 'right', 'bottom', 'left', 'z', 'float'].includes(property)) {
      return 'position';
    }
    
    // 변형 관련 속성
    if (['scale', 'rotate', 'translate', 'skew', 'origin', 'transform'].includes(property)) {
      return 'transform';
    }
    
    return null;
  }

  // ============================================================================
  // 🔧 Value Resolvers
  // ============================================================================

  private resolveSpacingValue(value: string): number {
    // Preset에서 값 찾기
    if (this.preset.spacing[value]) {
      return this.preset.spacing[value];
    }

    // Arbitrary value 처리 [16px]
    const arbitraryMatch = value.match(/^\[(.+)\]$/);
    if (arbitraryMatch && arbitraryMatch[1]) {
      const arbitraryValue = arbitraryMatch[1];
      if (arbitraryValue.endsWith('px')) {
        return parseInt(arbitraryValue.replace('px', ''), 10);
      }
      if (arbitraryValue.endsWith('rem')) {
        return parseFloat(arbitraryValue.replace('rem', '')) * 16;
      }
      // 숫자만 있는 경우
      const numValue = parseFloat(arbitraryValue);
      if (!isNaN(numValue)) {
        return numValue;
      }
    }

    // 기본값
    return 0;
  }

  private resolveColorValue(value: string): FigmaColor {
    // Preset에서 색상 찾기
    const colorParts = value.split('-');
    const colorName = colorParts[0];
    const shade = colorParts[1] || '500'; // 기본 shade

    if (colorName && this.preset.colors[colorName]) {
      const colorGroup = this.preset.colors[colorName];
      
      // 단일 색상인지 shade 그룹인지 확인
      if ('r' in colorGroup && 'g' in colorGroup && 'b' in colorGroup) {
        return colorGroup as FigmaColor;
      }

      // Shade 그룹에서 찾기
      const shadeGroup = colorGroup as { [shade: string]: FigmaColor };
      return shadeGroup[shade] || shadeGroup['500'] || { r: 0, g: 0, b: 0 };
    }

    // Arbitrary color 처리 [#FF0000]
    const arbitraryMatch = value.match(/^\[(.+)\]$/);
    if (arbitraryMatch && arbitraryMatch[1]) {
      return this.parseHexToFigmaColor(arbitraryMatch[1]);
    }
    
    // 기본 색상
    return { r: 0, g: 0, b: 0 };
  }

  private parseHexToFigmaColor(hexColor: string): FigmaColor {
    // Remove # if present
    hexColor = hexColor.replace(/^#/, '');
    
    // Parse hex values
    let r = 0, g = 0, b = 0, a = 1;
    
    try {
      if (hexColor.length === 3) {
        // #RGB format
        r = parseInt(hexColor[0] + hexColor[0], 16) / 255;
        g = parseInt(hexColor[1] + hexColor[1], 16) / 255;
        b = parseInt(hexColor[2] + hexColor[2], 16) / 255;
      } else if (hexColor.length === 6) {
        // #RRGGBB format
        r = parseInt(hexColor.substring(0, 2), 16) / 255;
        g = parseInt(hexColor.substring(2, 4), 16) / 255;
        b = parseInt(hexColor.substring(4, 6), 16) / 255;
      } else if (hexColor.length === 8) {
        // #RRGGBBAA format
        r = parseInt(hexColor.substring(0, 2), 16) / 255;
        g = parseInt(hexColor.substring(2, 4), 16) / 255;
        b = parseInt(hexColor.substring(4, 6), 16) / 255;
        a = parseInt(hexColor.substring(6, 8), 16) / 255;
      } else {
        // Handle named colors
        switch (hexColor.toLowerCase()) {
          case 'red':
            return { r: 1, g: 0, b: 0 };
          case 'green':
            return { r: 0, g: 1, b: 0 };
          case 'blue':
            return { r: 0, g: 0, b: 1 };
          case 'yellow':
            return { r: 1, g: 1, b: 0 };
          case 'cyan':
          case 'aqua':
            return { r: 0, g: 1, b: 1 };
          case 'magenta':
          case 'fuchsia':
            return { r: 1, g: 0, b: 1 };
          case 'white':
            return { r: 1, g: 1, b: 1 };
          case 'black':
            return { r: 0, g: 0, b: 0 };
          case 'gray':
          case 'grey':
            return { r: 0.5, g: 0.5, b: 0.5 };
          default:
            // Default to black if color can't be parsed
            return { r: 0, g: 0, b: 0 };
        }
      }
    } catch (error) {
      console.warn(`Failed to parse color: ${hexColor}`, error);
      return { r: 0, g: 0, b: 0 };
    }
    
    return { r, g, b, a };
  }

  private parseArbitraryColorValue(property: string, value: string): Partial<ParsedStyles> {
    const result: Partial<ParsedStyles> = { colors: {} };
    
    // Extract the color value from the arbitrary syntax [#FF0000]
    const colorMatch = value.match(/^\[(.*?)\]$/);
    const colorValue = colorMatch ? colorMatch[1] : '';
    
    // Convert to FigmaColor
    const figmaColor = this.parseHexToFigmaColor(colorValue);
    
    // 속성에 따른 처리
    if (property === 'bg' || property === 'background') {
      result.colors = {
        background: figmaColor,
      };
    } else if (property === 'text') {
      result.colors = {
        text: figmaColor,
      };
    } else if (property === 'border') {
      result.colors = {
        border: figmaColor,
      };
    } else if (property === 'fill') {
      result.colors = {
        fill: figmaColor,
      };
    } else if (property === 'stroke') {
      result.colors = {
        stroke: figmaColor,
      };
    }
    
    return result;
  }

  private resolveSizeValue(value: string, category: keyof typeof this.preset.layout): number | string {
    const scale = this.preset.layout[category];
    
    // Preset에서 값 찾기
    if (scale && scale[value]) {
      return scale[value];
    }

    // Arbitrary value 처리
    const arbitraryMatch = value.match(/^\[(.+)\]$/);
    if (arbitraryMatch && arbitraryMatch[1]) {
      const arbitraryValue = arbitraryMatch[1];
      if (arbitraryValue.endsWith('px')) {
        return parseInt(arbitraryValue.replace('px', ''), 10);
      }
      if (arbitraryValue.endsWith('%')) {
        return arbitraryValue;
      }
      if (arbitraryValue === 'auto') {
        return 'auto';
      }
      // 숫자만 있는 경우
      const numValue = parseFloat(arbitraryValue);
      if (!isNaN(numValue)) {
        return numValue;
      }
    }

    // 기본값
    return 'auto';
  }

  // 위치 속성 파싱
  private parsePosition(match: ClassNameMatch): PositionStyles {
    const { property, value } = match;
    const result: PositionStyles = {};

    // 위치 타입 처리
    if (property === 'position') {
      result.position = value as 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
      return result;
    }

    // top, right, bottom, left 처리
    if (['top', 'right', 'bottom', 'left'].includes(property)) {
      const posValue = this.resolvePositionValue(value);
      if (typeof posValue === 'number') {
        result[property as 'top' | 'right' | 'bottom' | 'left'] = posValue;
      } else {
        // 문자열 값은 그대로 할당 (예: auto, 100% 등)
        (result as any)[property] = posValue;
      }
      return result;
    }

    // inset 처리
    if (property === 'inset') {
      const posValue = this.resolvePositionValue(value);
      result.inset = posValue.toString();
      return result;
    }

    // z-index 처리
    if (property === 'zIndex') {
      const numValue = parseInt(value, 10);
      result.zIndex = isNaN(numValue) ? 0 : numValue;
      return result;
    }

    return result;
  }

  // 변형(Transform) 속성 파싱
  private parseTransform(match: ClassNameMatch): TransformStyles {
    const { property, value } = match;
    const result: TransformStyles = {};

    // scale 처리
    if (property.startsWith('scale')) {
      const scaleValue = this.resolveTransformValue(value);
      if (typeof scaleValue === 'number') {
        (result as any)[property] = scaleValue;
      }
      return result;
    }

    // rotate 처리
    if (property === 'rotate') {
      result.rotate = this.resolveRotationValue(value);
      return result;
    }

    // translate 처리
    if (property.startsWith('translate')) {
      const translateValue = this.resolveTransformValue(value);
      if (typeof translateValue === 'number') {
        (result as any)[property] = `${translateValue}px`;
      } else {
        (result as any)[property] = translateValue;
      }
      return result;
    }

    // skew 처리
    if (property.startsWith('skew')) {
      const skewValue = this.resolveRotationValue(value);
      (result as any)[property] = skewValue;
      return result;
    }

    // transform-origin 처리
    if (property === 'transformOrigin') {
      result.transformOrigin = value;
      return result;
    }

    return result;
  }

  // 위치값 리졸버
  private resolvePositionValue(value: string): number | string {
    // Arbitrary value 처리 [16px], [50%] 등
    const arbitraryMatch = value.match(/^\[(.+)\]$/);
    if (arbitraryMatch && arbitraryMatch[1]) {
      const arbitraryValue = arbitraryMatch[1];
      if (arbitraryValue.endsWith('px')) {
        return parseInt(arbitraryValue.replace('px', ''), 10);
      }
      if (arbitraryValue.endsWith('%') || arbitraryValue === 'auto') {
        return arbitraryValue;
      }
      // 숫자만 있는 경우
      const numValue = parseFloat(arbitraryValue);
      if (!isNaN(numValue)) {
        return numValue;
      }
    }

    // 숫자 값 처리 (예: top-4)
    if (!isNaN(parseFloat(value))) {
      return parseFloat(value) * 4; // Tailwind 기본 단위는 0.25rem (4px)
    }

    // 특수값 처리
    if (value === 'full') return '100%';
    if (value === 'auto') return 'auto';

    // 기본값
    return 0;
  }

  // 변형값 리졸버
  private resolveTransformValue(value: string): number | string {
    // Arbitrary value 처리
    const arbitraryMatch = value.match(/^\[(.+)\]$/);
    if (arbitraryMatch && arbitraryMatch[1]) {
      const arbitraryValue = arbitraryMatch[1];
      if (arbitraryValue.endsWith('%')) {
        return arbitraryValue;
      }
      // 숫자만 있는 경우
      const numValue = parseFloat(arbitraryValue);
      if (!isNaN(numValue)) {
        return numValue;
      }
    }

    // 숫자 값 처리 (예: scale-105 -> 1.05)
    if (!isNaN(parseFloat(value))) {
      return parseFloat(value) / 100;
    }

    // 특수값 처리
    if (value === 'full') return 1;
    if (value === 'half') return 0.5;

    // 기본값
    return 1;
  }

  // 회전값 리졸버
  private resolveRotationValue(value: string): number | string {
    // Arbitrary value 처리
    const arbitraryMatch = value.match(/^\[(.+)\]$/);
    if (arbitraryMatch && arbitraryMatch[1]) {
      const arbitraryValue = arbitraryMatch[1];
      if (arbitraryValue.endsWith('deg')) {
        return arbitraryValue;
      }
      // 숫자만 있는 경우
      const numValue = parseFloat(arbitraryValue);
      if (!isNaN(numValue)) {
        return `${numValue}deg`;
      }
    }

    // 숫자 값 처리 (예: rotate-45 -> 45deg)
    if (!isNaN(parseFloat(value))) {
      return `${parseFloat(value)}deg`;
    }

    // 기본값
    return '0deg';
  }

  // ============================================================================
  // 🔧 Utility Methods
  // ============================================================================

  private tokenizeInput(input: string): string[] {
    return input
      .trim()
      .split(/\s+/)
      .filter(className => className.length > 0);
  }

  private mergeStyles(target: ParsedStyles, source: Partial<ParsedStyles>): void {
    // Spacing 병합
    if (source.spacing) {
      target.spacing = this.mergeSpacing(target.spacing, source.spacing);
    }

    // Colors 병합
    if (source.colors) {
      target.colors = { ...target.colors, ...source.colors };
    }

    // Typography 병합
    if (source.typography) {
      target.typography = { ...target.typography, ...source.typography };
    }

    // Layout 병합
    if (source.layout) {
      target.layout = { ...target.layout, ...source.layout };
    }

    // Effects 병합
    if (source.effects) {
      target.effects = { ...target.effects, ...source.effects };
    }

    // Animation 병합
    if (source.animation) {
      target.animation = this.mergeAnimation(target.animation, source.animation);
    }

    // Position 병합
    if (source.position) {
      target.position = { ...target.position, ...source.position };
    }

    // Transform 병합
    if (source.transform) {
      target.transform = { ...target.transform, ...source.transform };
    }
  }

  private mergeSpacing(target: SpacingStyles, source: SpacingStyles): SpacingStyles {
    const result = { ...target };

    if (source.padding) {
      result.padding = { ...result.padding, ...source.padding };
    }

    if (source.margin) {
      result.margin = { ...result.margin, ...source.margin };
    }

    if (source.gap) {
      result.gap = { ...result.gap, ...source.gap };
    }

    return result;
  }

  // 애니메이션 속성 병합
  private mergeAnimation(target: AnimationStyles = {}, source: AnimationStyles): AnimationStyles {
    const result = { ...target };

    // 기본 애니메이션 속성 병합
    if (source.name) result.name = source.name;
    if (source.duration !== undefined) result.duration = source.duration;
    if (source.timingFunction) result.timingFunction = source.timingFunction;
    if (source.delay !== undefined) result.delay = source.delay;
    if (source.iterationCount !== undefined) result.iterationCount = source.iterationCount;
    if (source.direction) result.direction = source.direction;
    if (source.fillMode) result.fillMode = source.fillMode;
    if (source.playState) result.playState = source.playState;
    
    // 키프레임 병합
    if (source.keyframes) result.keyframes = source.keyframes;
    
    // 트랜지션 병합
    if (source.transition) {
      result.transition = { ...result.transition, ...source.transition };
    }

    return result;
  }

  // 빈 스타일 객체 생성
  private createEmptyStyles(): ParsedStyles {
    return {
      spacing: {},
      colors: {},
      typography: {},
      layout: {},
      effects: {},
      animation: {},
      position: {},
      transform: {},
      meta: {
        originalClasses: [],
        originalInput: '',
        preset: this.preset.name,
        parseTime: 0,
        warnings: [],
        classNames: [],
      },
    };
  }

  // 약식 속성명을 전체 속성명으로 변환
  private getFullSizeProperty(shortProperty: string): keyof LayoutStyles {
    const propertyMap: Record<string, keyof LayoutStyles> = {
      'w': 'width',
      'h': 'height',
      'max-w': 'maxWidth',
      'max-h': 'maxHeight',
      'min-w': 'minWidth',
      'min-h': 'minHeight',
    };
    return propertyMap[shortProperty] || shortProperty as keyof LayoutStyles;
  }

  // 상태 변형자 스타일 병합
  private mergeStateStyles(target: Partial<ParsedStyles>, source: Partial<ParsedStyles>): void {
    // 각 카테고리별 병합
    for (const category of Object.keys(source) as Array<keyof Partial<ParsedStyles>>) {
      if (category === 'meta') continue;
      
      if (!target[category]) {
        target[category] = { ...source[category] };
      } else {
        target[category] = { ...target[category], ...source[category] };
      }
    }
  }

  // 임의 값 파싱
  private parseArbitraryValue(match: ClassNameMatch): Partial<ParsedStyles> {
    const { property, value, category } = match;
    
    // 카테고리별 임의 값 처리
    switch (category) {
      case 'spacing':
        return this.parseArbitrarySpacing(property, value);
      case 'colors':
        return this.parseArbitraryColorValue(property, value);
      case 'typography':
        return this.parseArbitraryTypography(property, value);
      case 'layout':
        return this.parseArbitraryLayout(property, value);
      case 'effects':
        return this.parseArbitraryEffects(property, value);
      case 'animation':
        return this.parseArbitraryAnimation(property, value);
      case 'position':
        return this.parseArbitraryPosition(property, value);
      case 'transform':
        return this.parseArbitraryTransform(property, value);
      default:
        return {};
    }
  }

  // 임의 간격 값 파싱
  private parseArbitrarySpacing(property: string, value: string): Partial<ParsedStyles> {
    const result: Partial<ParsedStyles> = { spacing: {} };
    
    // 단위 정규화
    const normalizedValue = this.normalizeArbitraryValue(value);
    const numericValue = this.parseNumericValue(normalizedValue);
    
    // 속성에 따른 처리
    if (property === 'm' || property === 'margin') {
      result.spacing = {
        margin: {
          top: numericValue,
          right: numericValue,
          bottom: numericValue,
          left: numericValue,
        },
      };
    } else if (property === 'p' || property === 'padding') {
      result.spacing = {
        padding: {
          top: numericValue,
          right: numericValue,
          bottom: numericValue,
          left: numericValue,
        },
      };
    } else if (property === 'gap') {
      result.spacing = {
        gap: {
          row: numericValue,
          column: numericValue,
        },
      };
    }
    // 추가 속성 처리...
    
    return result;
  }

  // 문자열에서 숫자 값 추출
  private parseNumericValue(value: string): number {
    if (value.endsWith('px')) {
      return parseFloat(value.replace('px', ''));
    }
    if (value.endsWith('rem')) {
      return parseFloat(value.replace('rem', '')) * 16;
    }
    if (value.endsWith('em')) {
      return parseFloat(value.replace('em', '')) * 16;
    }
    if (value.endsWith('%')) {
      return parseFloat(value.replace('%', ''));
    }
    
    // 숫자만 있는 경우
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return numValue;
    }
    
    return 0;
  }

  // 임의 타이포그래피 값 파싱 (간략화)
  private parseArbitraryTypography(property: string, value: string): Partial<ParsedStyles> {
    return { typography: {} };
  }

  // 임의 효과 값 파싱 (간략화)
  private parseArbitraryEffects(property: string, value: string): Partial<ParsedStyles> {
    return { effects: {} };
  }

  // 임의 애니메이션 값 파싱 (간략화)
  private parseArbitraryAnimation(property: string, value: string): Partial<ParsedStyles> {
    return { animation: {} };
  }

  // 임의 위치 값 파싱 (간략화)
  private parseArbitraryPosition(property: string, value: string): Partial<ParsedStyles> {
    return { position: {} };
  }

  // 임의 변형 값 파싱 (간략화)
  private parseArbitraryTransform(property: string, value: string): Partial<ParsedStyles> {
    return { transform: {} };
  }

  // 임의 레이아웃 값 파싱
  private parseArbitraryLayout(property: string, value: string): Partial<ParsedStyles> {
    const result: Partial<ParsedStyles> = { layout: {} };
    
    // 값 정규화
    const normalizedValue = this.normalizeArbitraryValue(value);
    
    // 속성에 따른 처리
    if (property === 'w' || property === 'width') {
      result.layout = {
        width: normalizedValue,
      };
    } else if (property === 'h' || property === 'height') {
      result.layout = {
        height: normalizedValue,
      };
    } else if (property === 'max-w') {
      result.layout = {
        maxWidth: normalizedValue,
      };
    } else if (property === 'max-h') {
      result.layout = {
        maxHeight: normalizedValue,
      };
    }
    
    return result;
  }

  // 임의 값 정규화 (단위 처리)
  private normalizeArbitraryValue(value: string): string {
    // 이미 단위가 있는 경우 그대로 반환
    if (/^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|vmin|vmax|ch|ex)$/.test(value)) {
      return value;
    }
    
    // 숫자만 있는 경우 px 단위 추가
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return `${value}px`;
    }
    
    // calc, var 등 CSS 함수는 그대로 반환
    if (/^(calc|var|min|max|clamp)\(.*\)$/.test(value)) {
      return value;
    }
    
    return value;
  }

  /**
   * 기본 클래스(모디파이어 제외)를 파싱합니다.
   * @param baseClass 기본 클래스 이름
   * @returns 클래스 매칭 결과 또는 null
   */
  private parseBaseClass(baseClass: string): ClassMatchResult | null {
    // 임의값 구문 처리
    let isArbitrary = false;
    let value: string | undefined;
    let property: string | undefined;
    
    if (this.config.enableArbitraryValues) {
      const arbitraryMatch = /^([a-zA-Z0-9_-]+)-\[(.*?)\]$/.exec(baseClass);
      if (arbitraryMatch) {
        property = arbitraryMatch[1];
        value = arbitraryMatch[2];
        isArbitrary = true;
      }
    }

    // 표준 클래스 이름 처리
    if (!isArbitrary) {
      const standardMatch = /^([a-zA-Z0-9_-]+)-([a-zA-Z0-9_-]+)$/.exec(baseClass);
      if (standardMatch) {
        property = standardMatch[1];
        value = standardMatch[2];
      } else {
        // 값이 없는 클래스 (예: hidden, block 등)
        property = baseClass;
        value = "true";
      }
    }

    // 속성이 있고 값이 있으면 결과 반환
    if (property && value !== undefined) {
      return {
        property,
        value,
        isArbitrary
      };
    }

    return null;
  }

  /**
   * 클래스 매칭 결과를 스타일 객체에 적용합니다.
   * @param styles 스타일 객체
   * @param classResult 클래스 매칭 결과
   */
  private applyClassResultToStyles(styles: any, classResult: ClassMatchResult): void {
    const { property, value, modifiers = [], isArbitrary } = classResult;
    
    // CSS 속성 이름 매핑
    const cssProperty = this.mapPropertyToCss(property);
    if (!cssProperty) {
      if (!styles.warnings) styles.warnings = [];
      styles.warnings.push(`Unknown property: ${property}`);
      return;
    }
    
    // CSS 값 처리
    const cssValue = isArbitrary ? value : this.mapValueToCss(property, value);
    
    // 모디파이어가 없는 경우 (기본 스타일)
    if (modifiers.length === 0) {
      styles[cssProperty] = cssValue;
      return;
    }
    
    // 모디파이어가 있는 경우
    // 1. 상태 모디파이어만 있는 경우
    const stateModifiers = modifiers.filter(mod => this.isStateModifier(mod));
    const responsiveModifiers = modifiers.filter(mod => this.isResponsiveModifier(mod));
    
    if (responsiveModifiers.length === 0 && stateModifiers.length > 0) {
      // states 객체가 없으면 생성
      if (!styles.states) styles.states = {};
      
      // 첫 번째 상태 모디파이어에 대한 스타일 객체 생성
      const firstState = stateModifiers[0];
      if (!styles.states[firstState]) styles.states[firstState] = {};
      
      // 중첩된 상태 모디파이어 처리
      let currentObj = styles.states[firstState];
      
      // 두 번째 이후의 상태 모디파이어 처리
      for (let i = 1; i < stateModifiers.length; i++) {
        const state = stateModifiers[i];
        if (!currentObj.states) currentObj.states = {};
        if (!currentObj.states[state]) currentObj.states[state] = {};
        currentObj = currentObj.states[state];
      }
      
      // 최종 스타일 설정
      currentObj[cssProperty] = cssValue;
    }
    // 2. 반응형 모디파이어만 있는 경우
    else if (responsiveModifiers.length > 0 && stateModifiers.length === 0) {
      // responsive 객체가 없으면 생성
      if (!styles.responsive) styles.responsive = {};
      
      // 첫 번째 반응형 모디파이어에 대한 스타일 객체 생성
      const firstBreakpoint = responsiveModifiers[0];
      if (!styles.responsive[firstBreakpoint]) styles.responsive[firstBreakpoint] = {};
      
      // 중첩된 반응형 모디파이어 처리
      let currentObj = styles.responsive[firstBreakpoint];
      
      // 두 번째 이후의 반응형 모디파이어 처리
      for (let i = 1; i < responsiveModifiers.length; i++) {
        const breakpoint = responsiveModifiers[i];
        if (!currentObj.responsive) currentObj.responsive = {};
        if (!currentObj.responsive[breakpoint]) currentObj.responsive[breakpoint] = {};
        currentObj = currentObj.responsive[breakpoint];
      }
      
      // 최종 스타일 설정
      currentObj[cssProperty] = cssValue;
    }
    // 3. 반응형과 상태 모디파이어가 모두 있는 경우
    else if (responsiveModifiers.length > 0 && stateModifiers.length > 0) {
      // responsive 객체가 없으면 생성
      if (!styles.responsive) styles.responsive = {};
      
      // 첫 번째 반응형 모디파이어에 대한 스타일 객체 생성
      const firstBreakpoint = responsiveModifiers[0];
      if (!styles.responsive[firstBreakpoint]) styles.responsive[firstBreakpoint] = {};
      
      // 중첩된 반응형 모디파이어 처리
      let currentObj = styles.responsive[firstBreakpoint];
      
      // 두 번째 이후의 반응형 모디파이어 처리
      for (let i = 1; i < responsiveModifiers.length; i++) {
        const breakpoint = responsiveModifiers[i];
        if (!currentObj.responsive) currentObj.responsive = {};
        if (!currentObj.responsive[breakpoint]) currentObj.responsive[breakpoint] = {};
        currentObj = currentObj.responsive[breakpoint];
      }
      
      // 상태 모디파이어 처리
      if (!currentObj.states) currentObj.states = {};
      
      // 첫 번째 상태 모디파이어에 대한 스타일 객체 생성
      const firstState = stateModifiers[0];
      if (!currentObj.states[firstState]) currentObj.states[firstState] = {};
      
      // 중첩된 상태 모디파이어 처리
      let stateObj = currentObj.states[firstState];
      
      // 두 번째 이후의 상태 모디파이어 처리
      for (let i = 1; i < stateModifiers.length; i++) {
        const state = stateModifiers[i];
        if (!stateObj.states) stateObj.states = {};
        if (!stateObj.states[state]) stateObj.states[state] = {};
        stateObj = stateObj.states[state];
      }
      
      // 최종 스타일 설정
      stateObj[cssProperty] = cssValue;
    }
  }

  /**
   * CSS 클래스 속성을 실제 CSS 속성으로 매핑합니다.
   * @param property CSS 클래스 속성
   * @returns CSS 속성 이름
   */
  private mapPropertyToCss(property: string): string | null {
    // 간단한 매핑 예시 (실제로는 더 많은 매핑이 필요)
    const propertyMap: Record<string, string> = {
      'w': 'width',
      'h': 'height',
      'bg': 'backgroundColor',
      'text': 'color',
      'p': 'padding',
      'm': 'margin',
      'flex': 'display',
      'grid': 'display',
      'block': 'display',
      'inline': 'display',
      'hidden': 'display',
      'border': 'borderWidth',
      'rounded': 'borderRadius',
      'font': 'fontFamily',
      'items': 'alignItems',
      'justify': 'justifyContent',
      'gap': 'gap',
      'opacity': 'opacity',
      'shadow': 'boxShadow',
      'transition': 'transition',
      'transform': 'transform',
      'rotate': 'transform',
      'scale': 'transform',
      'translate': 'transform',
      'skew': 'transform',
      'z': 'zIndex',
      'top': 'top',
      'right': 'right',
      'bottom': 'bottom',
      'left': 'left',
      'overflow': 'overflow',
      'object': 'objectFit',
      'aspect': 'aspectRatio',
      'max-w': 'maxWidth',
      'min-w': 'minWidth',
      'max-h': 'maxHeight',
      'min-h': 'minHeight',
    };

    return propertyMap[property] || property;
  }

  /**
   * CSS 클래스 값을 실제 CSS 값으로 매핑합니다.
   * @param property CSS 클래스 속성
   * @param value CSS 클래스 값
   * @returns CSS 값
   */
  private mapValueToCss(property: string, value: string): string {
    // 속성별 값 매핑 예시
    switch (property) {
      case 'w':
      case 'h':
      case 'max-w':
      case 'min-w':
      case 'max-h':
      case 'min-h':
        // 숫자 값을 픽셀로 변환
        if (/^\d+$/.test(value)) {
          return `${value}px`;
        }
        // 분수 값을 백분율로 변환
        if (/^\d+\/\d+$/.test(value)) {
          const parts = value.split('/');
          const numerator = parseInt(parts[0], 10);
          const denominator = parseInt(parts[1], 10);
          return `${(numerator / denominator) * 100}%`;
        }
        // 특수 값 처리
        if (value === 'full') return '100%';
        if (value === 'screen') return '100vh';
        if (value === 'auto') return 'auto';
        break;
        
      case 'bg':
        // 색상 값 처리
        if (value === 'transparent') return 'transparent';
        if (value === 'current') return 'currentColor';
        // 색상 값을 HEX 또는 RGB로 변환 (간단한 예시)
        if (value === 'red') return '#FF0000';
        if (value === 'blue') return '#0000FF';
        if (value === 'green') return '#00FF00';
        break;
        
      case 'flex':
        if (value === 'true') return 'flex';
        return value;
        
      case 'grid':
        if (value === 'true') return 'grid';
        return value;
        
      case 'block':
        return 'block';
        
      case 'inline':
        return 'inline';
        
      case 'hidden':
        return 'none';
        
      // 기타 속성에 대한 매핑...
    }
    
    // 기본적으로 값을 그대로 반환
    return value;
  }

  // 수정된 extractModifiers 함수
  private extractModifiers(className: string): { modifiers: string[], baseClass: string } {
    const modifiers: string[] = [];
    let currentClass = className;
    
    // 모든 모디파이어를 추출 (순서대로)
    while (true) {
      const modifierMatch = /^([a-zA-Z0-9_-]+):(.+)$/.exec(currentClass);
      if (!modifierMatch) break;
      
      const modifier = modifierMatch[1];
      const remainingClass = modifierMatch[2];
      
      if (remainingClass) {
        currentClass = remainingClass;
        
        // 유효한 모디파이어인지 확인
        if (this.isValidModifier(modifier)) {
          modifiers.push(modifier);
        } else {
          // 유효하지 않은 모디파이어면 원래 클래스로 되돌림
          currentClass = className;
          modifiers.length = 0;
          break;
        }
      } else {
        break;
      }
    }
    
    return { modifiers, baseClass: currentClass };
  }

  // 수정된 isValidModifier 함수
  private isValidModifier(modifier: string): boolean {
    // 상태 모디파이어 확인
    if (this.config.enableStateModifiers && this.isStateModifier(modifier)) {
      return true;
    }
    
    // 반응형 모디파이어 확인
    if (this.config.enableResponsiveModifiers && this.isResponsiveModifier(modifier)) {
      return true;
    }
    
    return false;
  }

  // 수정된 isStateModifier 함수
  private isStateModifier(modifier: string): boolean {
    return ['hover', 'focus', 'active', 'disabled', 'visited', 'focus-within', 'focus-visible', 'group-hover', 'peer-hover', 'dark'].includes(modifier);
  }

  // 수정된 isResponsiveModifier 함수
  private isResponsiveModifier(modifier: string): boolean {
    return ['sm', 'md', 'lg', 'xl', '2xl'].includes(modifier);
  }

  private matchArbitraryValue(className: string): ClassNameMatch | null {
    // 임의 값 패턴 매칭: w-[200px], bg-[#FF0000]
    const arbitraryMatch = className.match(/^([a-z0-9_-]+)-\[(.*?)\]$/);
    if (!arbitraryMatch) return null;

    const property = arbitraryMatch[1];
    const value = arbitraryMatch[2];

    // 카테고리 결정
    let category: StyleCategory = 'layout'; // 기본값
    
    // 속성에 따른 카테고리 결정
    if (['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'gap'].includes(property)) {
      category = 'spacing';
    } else if (['w', 'h', 'min-w', 'min-h', 'max-w', 'max-h'].includes(property)) {
      category = 'layout';
    } else if (['text', 'bg', 'background', 'border', 'fill', 'stroke'].includes(property)) {
      category = 'colors';
    } else if (['font', 'text'].includes(property)) {
      category = 'typography';
    } else if (['rounded', 'shadow', 'opacity', 'blur'].includes(property)) {
      category = 'effects';
    } else if (['top', 'right', 'bottom', 'left', 'inset'].includes(property)) {
      category = 'position';
    } else if (['rotate', 'scale', 'translate', 'skew'].includes(property)) {
      category = 'transform';
    } else if (['animate', 'transition', 'duration', 'delay', 'ease'].includes(property)) {
      category = 'animation';
    }

    return {
      className,
      category,
      property,
      value,
      isArbitrary: true
    };
  }
} 
/**
 * CSSParser - CSS 클래스 파서 (리팩토링된 버전)
 *
 * 이 클래스는 CSS 클래스를 파싱하여 구조화된 데이터로 변환합니다.
 * 모든 기능(반응형, 상태 모디파이어, 임의 값 등)을 지원합니다.
 *
 * 개별 파서들로 책임을 분리하여 유지보수성을 향상시켰습니다.
 */

import {
  Config,
  ParsedClass,
  ParsedStyles,
  DesignPreset,
  StyleCategory,
  ParserContext,
} from "../types";
import {
  LayoutParser,
  AnimationParser,
  SpacingParser,
  TypographyParser,
  EffectsParser,
  PositionParser,
  TransformParser,
  SizingParser,
  FlexboxGridParser,
  InteractivityParser,
  TablesParser,
  SVGParser,
  TransitionsParser,
  BackgroundsParser,
  BordersParser,
  OverflowParser,
  AccessibilityParser,
  BlendModesParser,
  MaskParser,
} from "./parsers";
import { ModifierParser } from "./parsers/modifiers";
import { createParserContext } from "../utils";

/**
 * 파서 정보 인터페이스
 */
interface ParserInfo {
  parser: any;
  category: StyleCategory;
}

// 파서 맵핑 (우선순위 순서로 정렬)
const PARSER_MAP: ParserInfo[] = [
  // v4.1 배경 시스템 최우선 처리 (다른 파서들이 가로채지 못하도록)
  { parser: BackgroundsParser, category: "backgrounds" },
  
  // 특수 케이스들 우선 처리
  { parser: AccessibilityParser, category: "accessibility" },
  { parser: TypographyParser, category: "typography" },
  { parser: SpacingParser, category: "spacing" },

  // 테이블 관련 (border-collapse가 borders와 겹치므로 우선 처리)
  { parser: TablesParser, category: "tables" },

  // 애니메이션 관련 (transition이 layout과 겹치므로 우선 처리)
  // SVG보다 먼저 처리하여 'fill-forwards' 같은 클래스를 올바르게 파싱
  { parser: AnimationParser, category: "animation" },

  // SVG 관련 (fill-* 클래스가 animation과 겹치므로 우선 처리)
  { parser: SVGParser, category: "svg" },

  // 상호작용 관련 (snap-* 클래스가 layout과 겹치므로 우선 처리)
  { parser: InteractivityParser, category: "interactivity" },

  // 애니메이션 관련 (transition이 layout과 겹치므로 우선 처리)
  { parser: TransitionsParser, category: "transitions" },
  { parser: TransformParser, category: "transform" },

  // 레이아웃 관련
  { parser: FlexboxGridParser, category: "flexbox-grid" },
  { parser: SizingParser, category: "sizing" },
  { parser: PositionParser, category: "position" },
  { parser: LayoutParser, category: "layout" },
  { parser: OverflowParser, category: "overflow" },

  // 시각적 효과 (각자 색상 포함, Filters 통합)
  { parser: BordersParser, category: "borders" },
  { parser: EffectsParser, category: "effects" },
  { parser: BlendModesParser, category: "blend-modes" },
  { parser: MaskParser, category: "mask" },

  // ColorParser 제거: 각 개별 파서가 자신의 색상을 처리
];

const createEmptyStyles = (): Partial<ParsedStyles> => ({
  spacing: { padding: {}, margin: {}, gap: {} },
  colors: {},
  typography: {},
  layout: {},
  effects: {},
  animation: {},
  position: {},
  transform: {},
  sizing: {},
  flexboxGrid: {},
  filters: {},
  interactivity: {},
  tables: {},
  svg: {},
  transitions: {},
  backgrounds: {},
  borders: {},
  overflow: {},
  accessibility: {},
  blendModes: {},
  mask: {},
  states: {},
  pseudoElements: {},
  breakpoints: {},
  containers: {},
  motion: {},
  attributes: {},
  complexSelectors: {},
  groupStates: {},
  peerStates: {},
  contrast: {},
  colorScheme: {},
  orientation: {},
  print: {},
  scripting: {},
  pointer: {},
  noscript: {},
  userValidation: {},
  invertedColors: {},
  detailsContent: {},
  starting: {},
  nthSelectors: {},
});

const applyStyleByCategory = (
  parsedClass: ParsedClass,
  styles: Partial<ParsedStyles>,
  context: ParserContext
): void => {
  const category = parsedClass.category;

  switch (category) {
    case "spacing":
      SpacingParser.applySpacingStyle(parsedClass, styles, context);
      break;
    case "typography":
      TypographyParser.applyTypographyStyle(parsedClass, styles, context);
      break;
    case "layout":
      LayoutParser.applyLayoutStyle(parsedClass, styles, context);
      break;
    case "effects":
      EffectsParser.applyEffectStyle(parsedClass, styles, context);
      break;
    case "animation":
      AnimationParser.applyAnimationStyle(parsedClass, styles, context);
      break;
    case "position":
      PositionParser.applyPositionStyle(parsedClass, styles, context);
      break;
    case "transform":
      TransformParser.applyTransformStyle(parsedClass, styles, context);
      break;
    case "sizing":
      SizingParser.applySizingStyle(parsedClass, styles, context);
      break;
    case "flexbox-grid":
      FlexboxGridParser.applyFlexboxGridStyle(
        parsedClass,
        styles,
        context
      );
      break;
    case "interactivity":
      InteractivityParser.applyInteractivityStyle(
        parsedClass,
        styles,
        context
      );
      break;
    case "tables":
      TablesParser.applyTablesStyle(parsedClass, styles, context);
      break;
    case "svg":
      SVGParser.applySVGStyle(parsedClass, styles, context);
      break;
    case "transitions":
      TransitionsParser.applyTransitionsStyle(
        parsedClass,
        styles,
        context
      );
      break;
    case "backgrounds":
      BackgroundsParser.applyBackgroundsStyle(
        parsedClass,
        styles,
        context
      );
      break;
    case "borders":
      BordersParser.applyBordersStyle(parsedClass, styles, context);
      break;
    case "overflow":
      OverflowParser.applyOverflowStyle(parsedClass, styles, context);
      break;
    case "accessibility":
      AccessibilityParser.applyAccessibilityStyle(
        parsedClass,
        styles,
        context
      );
      break;
    case "blend-modes":
      BlendModesParser.applyBlendModesStyle(parsedClass, styles, context);
      break;
    case "mask":
      MaskParser.applyMaskStyle(parsedClass, styles, context);
      break;
    case "colors":
      // Colors are now handled by individual parsers (Typography, Backgrounds, Borders, etc.)
      // This case should not occur since ColorParser was removed from PARSER_MAP
      console.warn(`Color category should be handled by individual parsers, not as separate category. Class: ${parsedClass.original}`);
      break;
    default:
      console.warn(`Unknown category: ${category} for class: ${parsedClass.original}`);
      break;
  }
};

const getOrCreateStateStyles = (
  styles: Partial<ParsedStyles>,
  modifiers: ParsedClass['modifiers']
): Partial<ParsedStyles> => {
  let currentStyles = styles;
  const createEmpty = (): Partial<ParsedStyles> => ({
    spacing: { padding: {}, margin: {}, gap: {} },
    colors: {},
    typography: {},
    layout: {},
    effects: {},
    animation: {},
    position: {},
    transform: {},
    sizing: {},
    flexboxGrid: {},
    filters: {},
    interactivity: {},
    tables: {},
    svg: {},
    transitions: {},
    backgrounds: {},
    borders: {},
    overflow: {},
    accessibility: {},
    blendModes: {},
    mask: {},
    states: {},
    pseudoElements: {},
    breakpoints: {},
    containers: {},
    motion: {},
    attributes: {},
    complexSelectors: {},
    groupStates: {},
    peerStates: {},
    contrast: {},
    colorScheme: {},
    orientation: {},
    print: {},
    scripting: {},
    pointer: {},
    noscript: {},
    userValidation: {},
    invertedColors: {},
    detailsContent: {},
    starting: {},
    nthSelectors: {},
  });

  // If no modifiers, return current styles
  if (!modifiers || !modifiers.hasModifiers()) {
    return currentStyles;
  }

  // Process modifiers in priority order (already sorted in ParsedModifiers)
  const sortedModifiers = modifiers.sortByPriority();

  for (const modifier of sortedModifiers) {
    switch (modifier.type) {
      case 'responsive': {
        const responsiveModifier = modifier as any; // ResponsiveModifier
        const key = responsiveModifier.raw;
      if (!currentStyles.breakpoints) currentStyles.breakpoints = {};
      if (!currentStyles.breakpoints[key]) currentStyles.breakpoints[key] = createEmpty();
      currentStyles = currentStyles.breakpoints[key];
        break;
  }

      case 'container-query': {
        const containerModifier = modifier as any; // ContainerQueryModifier
        const key = containerModifier.raw;
      if (!currentStyles.containers) currentStyles.containers = {};
      if (!currentStyles.containers[key]) currentStyles.containers[key] = createEmpty();
      currentStyles = currentStyles.containers[key];
        break;
  }
  
      case 'motion': {
        const motionModifier = modifier as any; // MotionModifier
        const key = motionModifier.raw;
    if (!currentStyles.motion) currentStyles.motion = {};
        if (!currentStyles.motion[key]) currentStyles.motion[key] = createEmpty();
        currentStyles = currentStyles.motion[key];
        break;
  }

      case 'pseudo-class': {
        const pseudoClassModifier = modifier as any; // PseudoClassModifier
        const key = pseudoClassModifier.raw;
    if (!currentStyles.states) currentStyles.states = {};
        if (!currentStyles.states[key]) currentStyles.states[key] = createEmpty();
        currentStyles = currentStyles.states[key];
        break;
  }
  
      case 'pseudo-element': {
        const pseudoElementModifier = modifier as any; // PseudoElementModifier
        const key = pseudoElementModifier.raw;
    if (!currentStyles.pseudoElements) currentStyles.pseudoElements = {};
        if (!currentStyles.pseudoElements[key]) currentStyles.pseudoElements[key] = createEmpty();
        currentStyles = currentStyles.pseudoElements[key];
        break;
      }

      case 'group': {
        const groupModifier = modifier as any; // GroupModifier
        const key = groupModifier.raw;
        if (!currentStyles.groupStates) currentStyles.groupStates = {};
        if (!currentStyles.groupStates[key]) currentStyles.groupStates[key] = createEmpty();
        currentStyles = currentStyles.groupStates[key];
        break;
      }

      case 'peer': {
        const peerModifier = modifier as any; // PeerModifier
        const key = peerModifier.raw;
        if (!currentStyles.peerStates) currentStyles.peerStates = {};
        if (!currentStyles.peerStates[key]) currentStyles.peerStates[key] = createEmpty();
        currentStyles = currentStyles.peerStates[key];
        break;
      }

      case 'aria': {
        const ariaModifier = modifier as any; // AriaModifier
        const key = ariaModifier.raw;
        if (!currentStyles.attributes) currentStyles.attributes = {};
        if (!currentStyles.attributes[key]) currentStyles.attributes[key] = createEmpty();
        currentStyles = currentStyles.attributes[key];
        break;
      }

      case 'data': {
        const dataModifier = modifier as any; // DataModifier
        const key = dataModifier.raw;
        if (!currentStyles.attributes) currentStyles.attributes = {};
        if (!currentStyles.attributes[key]) currentStyles.attributes[key] = createEmpty();
        currentStyles = currentStyles.attributes[key];
        break;
      }

      case 'not': {
        const notModifier = modifier as any; // NotModifier
        const key = notModifier.raw;
        if (!currentStyles.complexSelectors) currentStyles.complexSelectors = {};
        if (!currentStyles.complexSelectors[key]) currentStyles.complexSelectors[key] = createEmpty();
        currentStyles = currentStyles.complexSelectors[key];
        break;
      }

      case 'nth-child':
      case 'nth-of-type': {
        const nthModifier = modifier as any; // NthChildModifier | NthOfTypeModifier
        const key = nthModifier.raw;
        if (!currentStyles.nthSelectors) currentStyles.nthSelectors = {};
        if (!currentStyles.nthSelectors[key]) currentStyles.nthSelectors[key] = createEmpty();
        currentStyles = currentStyles.nthSelectors[key];
        break;
      }

      case 'arbitrary-variant':
      case 'arbitrary-attribute': {
        const arbitraryModifier = modifier as any; // ArbitraryVariantModifier | ArbitraryAttributeModifier
        const key = arbitraryModifier.raw;
        if (!currentStyles.complexSelectors) currentStyles.complexSelectors = {};
        if (!currentStyles.complexSelectors[key]) currentStyles.complexSelectors[key] = createEmpty();
        currentStyles = currentStyles.complexSelectors[key];
        break;
      }

      // Handle special modifiers
      case 'starting':
      case 'noscript':
      case 'print':
      case 'scripting': {
        const specialModifier = modifier as any; // SpecialModifier
        const key = specialModifier.raw;
        const categoryMap = {
          'starting': 'starting',
          'noscript': 'noscript', 
          'print': 'print',
          'scripting': 'scripting'
        };
        const category = categoryMap[modifier.type as keyof typeof categoryMap];
        if (category) {
          if (!currentStyles[category as keyof ParsedStyles]) {
            (currentStyles as any)[category] = {};
          }
          if (!(currentStyles as any)[category][key]) {
            (currentStyles as any)[category][key] = createEmpty();
          }
          currentStyles = (currentStyles as any)[category][key];
        }
        break;
      }

      default:
        // Handle any other modifier types
        console.warn(`Unhandled modifier type: ${modifier.type}`);
        break;
    }
  }

  return currentStyles;
};

const applyParsedClassToStyles = (
  parsedClass: ParsedClass,
  styles: Partial<ParsedStyles>,
  context: ParserContext
): void => {
  const hasModifiers = parsedClass.modifiers && parsedClass.modifiers.hasModifiers();
  
  if (hasModifiers) {
    const targetStyles = getOrCreateStateStyles(styles, parsedClass.modifiers);

    const newParsedClass: ParsedClass = {
      ...parsedClass,
      modifiers: undefined, // Remove modifiers for the recursive call
    };
    
    applyParsedClassToStyles(newParsedClass, targetStyles, context);
  } else {
    applyStyleByCategory(parsedClass, styles, context);
  }
};

/**
 * CSS 클래스 파서
 */
export class CSSParser {
  private config: Config;
  private preset: DesignPreset;
  private parserContext: ParserContext;

  /**
   * 파서를 초기화합니다.
   * @param config 설정
   * @param preset 디자인 프리셋
   */
  constructor(config: Config, preset: DesignPreset) {
    this.config = config;
    this.preset = preset;
    this.parserContext = createParserContext(config, preset);
  }

  /**
   * 빈 스타일 구조를 생성합니다.
   */
  private createEmptyStylesStructure(): any {
    return {
      spacing: { padding: {}, margin: {}, gap: {} },
      colors: {},
      typography: {},
      layout: {},
      effects: {},
      animation: {},
      position: {},
      transform: {},
      sizing: {},
      flexboxGrid: {},
      filters: {},
      interactivity: {},
      tables: {},
      svg: {},
      transitions: {},
      backgrounds: {},
      borders: {},
      overflow: {},
      accessibility: {},
      blendModes: {},
      mask: {},
      
      // v4.1 Modifier 구조
      states: {} as Record<string, Partial<ParsedStyles>>,
      pseudoElements: {},
      breakpoints: {},
      containers: {},
      motion: {},
      attributes: {},
      complexSelectors: {},
      groupStates: {},
      peerStates: {},
      contrast: {},
      colorScheme: {},
      orientation: {},
      print: {},
      scripting: {},
      pointer: {},
      noscript: {},
      userValidation: {},
      invertedColors: {},
      detailsContent: {},
      starting: {},
      nthSelectors: {},
    };
  }

  /**
   * CSS 클래스 문자열을 파싱합니다.
   * @param classString CSS 클래스 문자열
   * @returns 파싱된 스타일 객체
   */
  parse(classString: string): ParsedStyles {
    const startTime = Date.now();
    const tokens = this.tokenizeInput(classString);

    const result: ParsedStyles = {
      spacing: {
        padding: {},
        margin: {},
        gap: {},
      },
      colors: {},
      typography: {},
      layout: {},
      effects: {},
      animation: {},
      position: {},
      transform: {},
      sizing: {},
      flexboxGrid: {},
      filters: {},
      interactivity: {},
      tables: {},
      svg: {},
      transitions: {},
      backgrounds: {},
      borders: {},
      overflow: {},
      accessibility: {},
      blendModes: {},
      mask: {},
      
      // v4.1 Modifier 구조
      breakpoints: {},
      containers: {},
      states: {} as Record<string, Partial<ParsedStyles>>,
      pseudoElements: {},
      motion: {},
      attributes: {},
      complexSelectors: {},
      groupStates: {},
      peerStates: {},
      contrast: {},
      colorScheme: {},
      orientation: {},
      print: {},
      scripting: {},
      pointer: {},
      noscript: {},
      userValidation: {},
      invertedColors: {},
      detailsContent: {},
      starting: {},
      nthSelectors: {},
      
      meta: {
        originalClasses: tokens,
        originalInput: classString,
        preset: this.preset.name || "default",
        parseTime: 0,
        warnings: [],
      },
    };

    // 각 토큰 처리
    for (const token of tokens) {
      const parsedClass = this.parseClassName(token);
      if (parsedClass) {
        applyParsedClassToStyles(parsedClass, result, this.parserContext);
      }
    }

    // 파싱 시간 기록
    result.meta!.parseTime = Date.now() - startTime;

    return result;
  }

  /**
   * 클래스명을 파싱합니다. (테스트 호환 메서드)
   * @param className 클래스명
   * @returns 파싱된 클래스 객체
   */
  parseClass(className: string): ParsedClass | undefined {
    return this.parseClassName(className);
  }

  /**
   * 입력 문자열을 토큰으로 분리합니다.
   * @param input 입력 문자열
   * @returns 토큰 배열
   */
  private tokenizeInput(input: string): string[] {
    return input
      .trim()
      .split(/\s+/)
      .filter((token) => token.length > 0);
  }

  /**
   * 클래스명을 파싱합니다.
   * @param className 클래스명
   * @returns 파싱된 클래스 객체
   */
  parseClassName(className: string): ParsedClass | undefined {
    if (!className || className.trim() === "") {
      return undefined;
    }

    // Prefix 제거 (설정된 경우)
    let processedClassName = className;
    if (this.config.prefix && className.startsWith(this.config.prefix)) {
      processedClassName = className.slice(this.config.prefix.length);
    }

    // Parse modifiers using Tailwind CSS v4.1 approach
    const modifierResult = ModifierParser.parseModifiers(processedClassName);
    const modifiers = modifierResult ? modifierResult.modifiers : undefined;
    const baseClassName = modifierResult ? modifierResult.baseClassName : processedClassName;

    // 각 파서에게 baseClassName 인식을 요청 (우선순위 순서)
    for (const { parser, category } of PARSER_MAP) {
      if (className.startsWith('bg-linear-')) {
        console.log(`[parseClassName] Trying parser: ${parser.name} for category: ${category} with class: ${className}`);
      }
      
      if (parser.isValidClass && parser.isValidClass(baseClassName, this.parserContext)) {
        // 해당 파서가 클래스를 인식했으므로 파싱 진행
        const parseResult = parser.parseValue
          ? parser.parseValue(baseClassName, this.parserContext)
          : null;

        if (parseResult) {
          
          // 🎨 색상 클래스에 대한 특별 처리
          let finalValue = parseResult.value;
          
          // Accent color 변환
          if (parseResult.property === 'accent' && !parseResult.isArbitrary) {
            // 'current' 키워드는 그대로 유지
            if (parseResult.value === 'current') {
              finalValue = 'current';
            } else {
              const colorValue = this.parserContext.utils.color(parseResult.value);
              if (colorValue) {
                finalValue = colorValue;
              }
            }
          }
          
          // Caret color 변환
          if (parseResult.property === 'caret' && !parseResult.isArbitrary) {
            // 'current' 키워드는 그대로 유지
            if (parseResult.value === 'current') {
              finalValue = 'current';
            } else {
              const colorValue = this.parserContext.utils.color(parseResult.value);
              if (colorValue) {
                finalValue = colorValue;
              }
            }
          }
          
          // 크기/간격 값 변환 (scroll-margin, scroll-padding 등)
          const scrollSpacingProperties = [
            'scroll-m', 'scroll-mx', 'scroll-my', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml',
            'scroll-p', 'scroll-px', 'scroll-py', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'
          ];
          if (scrollSpacingProperties.includes(parseResult.property) && !parseResult.isArbitrary) {
            finalValue = this.convertSpacingValue(parseResult.value);
          }
          
          // 🎯 Interactivity 카테고리: property 이름을 camelCase로 변환
          let finalProperty = parseResult.property;
          if (category === 'interactivity') {
            const propertyMap: Record<string, string> = {
              'accent': 'accentColor',
              'caret': 'caretColor',
              'pointer-events': 'pointerEvents',
              'scroll-behavior': 'scrollBehavior',
              'scroll-m': 'scrollMargin',
              'scroll-mx': 'scrollMarginLeft',
              'scroll-my': 'scrollMarginTop',
              'scroll-mt': 'scrollMarginTop',
              'scroll-mr': 'scrollMarginRight',
              'scroll-mb': 'scrollMarginBottom',
              'scroll-ml': 'scrollMarginLeft',
              'scroll-p': 'scrollPadding',
              'scroll-px': 'scrollPaddingLeft',
              'scroll-py': 'scrollPaddingTop',
              'scroll-pt': 'scrollPaddingTop',
              'scroll-pr': 'scrollPaddingRight',
              'scroll-pb': 'scrollPaddingBottom',
              'scroll-pl': 'scrollPaddingLeft',
              'touch-action': 'touchAction',
              'select': 'userSelect',
              'will-change': 'willChange'
            };
            
            if (propertyMap[parseResult.property]) {
              finalProperty = propertyMap[parseResult.property];
            }
          }
          
          const finalResult = {
            original: className,
            className: processedClassName,
            baseClassName: baseClassName,
            property: finalProperty || baseClassName,
            value: finalValue,
            category: category,
            isArbitrary: (modifierResult ? modifierResult.isArbitrary : false) || parseResult.isArbitrary || false,
            
            // 🎯 Tailwind CSS v4.1 방식의 modifier 정보
            modifiers: modifiers,
          };
          
          if (className.startsWith('bg-linear-')) {
            console.log(`[parseClassName] Final result:`, finalResult);
          }
          
          return finalResult;
        } else {
          if (className.startsWith('bg-linear-')) {
            console.log(`[parseClassName] parseResult is null from parser: ${parser.name}`);
          }
        }
      }
    }

    // 🎯 Fallback: Arbitrary selectors, properties, 또는 알려지지 않은 클래스 처리
    // Tailwind CSS v4.1에서는 모든 클래스를 유효하다고 간주하고 CSS로 출력
    if (baseClassName) {
      // Arbitrary selector 감지 ([...])
      const isArbitrarySelector = baseClassName.startsWith('[') && baseClassName.endsWith(']');
      
      return {
        original: className,
        className: processedClassName,
        baseClassName: baseClassName,
        property: isArbitrarySelector ? 'arbitrary-selector' : baseClassName,
        value: isArbitrarySelector ? baseClassName : "",
        category: isArbitrarySelector ? "accessibility" : "layout", // 임시 카테고리
        isArbitrary: isArbitrarySelector || (modifierResult ? modifierResult.isArbitrary : false),
        
        // 🎯 Tailwind CSS v4.1 방식의 modifier 정보
        modifiers: modifiers,
      };
    }

    return undefined;
  }

  /**
   * 크기 값을 변환합니다.
   * @param value 크기 값
   * @returns 변환된 크기 값
   */
  private convertSizeValue(value: string): string {
    // 임의 값 처리
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1);
    }

    // 기본 값 처리
    if (value === '0') return '0px';
    if (value === 'px') return '1px';
    if (value === 'auto') return 'auto';
    if (value === 'full') return '100%';

    // 분수 처리
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/');
      const percentage = (parseFloat(numerator) / parseFloat(denominator)) * 100;
      return `${percentage}%`;
    }

    // 소수점 처리
    if (value.includes('.')) {
      const numValue = parseFloat(value);
      return `${numValue * 0.25}rem`;
    }

    // 정수 처리
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      return `${numValue * 0.25}rem`;
    }

    return value;
  }

  /**
   * 간격 값을 변환합니다.
   * @param value 간격 값
   * @returns 변환된 간격 값
   */
  private convertSpacingValue(value: string): string {
    // 임의 값 처리
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1);
    }

    // 기본 값 처리
    if (value === '0') return '0px';
    if (value === 'px') return '1px';
    if (value === 'auto') return 'auto';

    // 소수점 처리 (0.5, 1.5, 2.5 등)
    if (value.includes('.')) {
      const numValue = parseFloat(value);
      return `${numValue * 0.25}rem`;
    }

    // 정수 처리 (1, 2, 3, 4 등)
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      return `${numValue * 0.25}rem`;
    }

    return value;
  }

  /**
   * 화면 크기를 가져옵니다.
   * @param size 화면 크기
   * @returns 화면 크기 값
   */
  private getScreenSize(size: string): string {
    const defaultScreens = {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    };

    const screens = this.preset.screens || defaultScreens;
    return (screens as Record<string, string>)[size] || size;
  }

  /**
   * 브레이크포인트 이름을 가져옵니다.
   * @param breakpoint 브레이크포인트
   * @returns 브레이크포인트 이름
   */
  private getBreakpointName(
    breakpoint: any | undefined
  ): string {
    if (!breakpoint) return "";

    // 임의 브레이크포인트인 경우 원래 형태 유지
    if ((breakpoint as any).isArbitrary) {
      return breakpoint.type === "max-width"
        ? `max-[${breakpoint.value}]`
        : `min-[${breakpoint.value}]`;
    }

    const screens = this.preset.screens || {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    };

    // 알려진 화면 크기인지 확인
    const screenKey = Object.keys(screens).find(
      (key) => screens[key] === breakpoint.value
    );

    if (screenKey) {
      return breakpoint.type === "max-width" ? `max-${screenKey}` : screenKey;
    }

    // 임의 값인 경우
    return breakpoint.type === "max-width"
      ? `max-[${breakpoint.value}]`
      : `min-[${breakpoint.value}]`;
  }

  /**
   * 컨테이너 이름을 가져옵니다.
   * @param container 컨테이너
   * @returns 컨테이너 이름
   */
  private getContainerName(
    container: any | undefined
  ): string {
    if (!container) return "";

    // 명명된 컨테이너인 경우 (예: md/sidebar)
    if (container.value.includes("/")) {
      return `@${container.value}`;
    }

    const screens = this.preset.screens || {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    };

    // 알려진 화면 크기인지 확인
    const screenKey = Object.keys(screens).find(
      (key) => (screens as Record<string, string>)[key] === container.value
    );

    if (screenKey) {
      return container.type === "max-width"
        ? `@max-${screenKey}`
        : `@${screenKey}`;
    }

    // 임의 값인 경우
    return container.type === "max-width"
      ? `@max-[${container.value}]`
      : `@min-[${container.value}]`;
  }
}

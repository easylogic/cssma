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
  ColorParser,
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
  { parser: AnimationParser, category: "animation" },
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

  // 상호작용 관련
  { parser: InteractivityParser, category: "interactivity" },

  // 기타
  { parser: SVGParser, category: "svg" },
  // ColorParser 제거: 각 개별 파서가 자신의 색상을 처리
];

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
        this.applyParsedClassToStyles(parsedClass, result);
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
    const modifiers = modifierResult ? modifierResult.modifiers : {};
    const baseClassName = modifierResult ? modifierResult.baseClassName : processedClassName;

    // 각 파서에게 baseClassName 인식을 요청 (우선순위 순서)
    for (const { parser, category } of PARSER_MAP) {
      if (parser.isValidClass && parser.isValidClass(baseClassName)) {
        // 해당 파서가 클래스를 인식했으므로 파싱 진행
        const parseResult = parser.parseValue
          ? parser.parseValue(baseClassName)
          : null;

        if (parseResult) {
          return {
            original: className,
            className: processedClassName,
            baseClassName: baseClassName,
            property: parseResult.property || baseClassName,
            value: parseResult.value || "",
            category: category,
            isArbitrary: (modifierResult ? modifierResult.isArbitrary : false) || parseResult.isArbitrary || false,
            
            // 🎯 Tailwind CSS v4.1 방식의 modifier 정보
            modifiers: modifiers,
          };
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
   * 파싱된 클래스를 스타일에 적용합니다.
   * 
   * 💡 Tailwind CSS v4.1 modifier 처리 방식:
   * 
   * 1. 단일 modifier 체인: "md:hover:bg-blue-500" → responsive + state
   * 2. 우선순위: responsive → container → motion → state → pseudo-elements → attributes
   * 3. 새로운 v4.1 modifiers: noscript, user-valid, inverted-colors, etc.
   * 
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   */
  private applyParsedClassToStyles(
    parsedClass: ParsedClass,
    styles: ParsedStyles
  ): void {
    const { modifiers } = parsedClass;

    // Modifier가 없는 경우: 기본 스타일 적용
    if (!modifiers || Object.keys(modifiers).length === 0) {
      this.applyStyleByCategory(parsedClass, styles);
      return;
    }

    // Responsive modifier 처리 (최우선)
    if (modifiers.responsive) {
      // responsive는 Record<string, string> 형태이므로 첫 번째 키를 사용
      const breakpointKeys = Object.keys(modifiers.responsive);
      if (breakpointKeys.length > 0) {
        const breakpointKey = breakpointKeys[0];

        if (!styles.breakpoints) {
          styles.breakpoints = {};
        }

        if (!styles.breakpoints[breakpointKey]) {
          styles.breakpoints[breakpointKey] = this.createEmptyStylesStructure();
        }

        // 추가 modifier들을 재귀적으로 처리
        const remainingModifiers = { ...modifiers };
        delete remainingModifiers.responsive;
        
        if (Object.keys(remainingModifiers).length > 0) {
          const nestedClass = { ...parsedClass, modifiers: remainingModifiers };
          this.applyParsedClassToStyles(nestedClass, styles.breakpoints[breakpointKey] as ParsedStyles);
        } else {
          this.applyStyleByCategory(parsedClass, styles.breakpoints[breakpointKey] as Partial<ParsedStyles>);
        }
      }
      return;
    }

    // Container query 처리
    if (modifiers.container) {
      // container는 Record<string, string> 형태이므로 첫 번째 키를 사용
      const containerKeys = Object.keys(modifiers.container);
      if (containerKeys.length > 0) {
        const containerKey = containerKeys[0];

        if (!styles.containers) {
          styles.containers = {};
        }

        if (!styles.containers[containerKey]) {
          styles.containers[containerKey] = this.createEmptyStylesStructure();
        }

        // 추가 modifier들을 재귀적으로 처리
        const remainingModifiers = { ...modifiers };
        delete remainingModifiers.container;
        
        if (Object.keys(remainingModifiers).length > 0) {
          const nestedClass = { ...parsedClass, modifiers: remainingModifiers };
          this.applyParsedClassToStyles(nestedClass, styles.containers[containerKey] as ParsedStyles);
        } else {
          this.applyStyleByCategory(parsedClass, styles.containers[containerKey] as Partial<ParsedStyles>);
        }
      }
      return;
    }

    // Motion modifier 처리
    if (modifiers.motion) {
      const motionKey = modifiers.motion;

      if (!styles.motion) {
        styles.motion = {};
      }

      if (!styles.motion[motionKey]) {
        styles.motion[motionKey] = this.createEmptyStylesStructure();
      }

      // 추가 modifier들을 재귀적으로 처리
      const remainingModifiers = { ...modifiers };
      delete remainingModifiers.motion;
      
      if (Object.keys(remainingModifiers).length > 0) {
        const nestedClass = { ...parsedClass, modifiers: remainingModifiers };
        this.applyParsedClassToStyles(nestedClass, styles.motion[motionKey] as ParsedStyles);
      } else {
        this.applyStyleByCategory(parsedClass, styles.motion[motionKey] as Partial<ParsedStyles>);
      }
      return;
    }

    // State modifier 처리 (v4.1: 배열 지원)
    if (modifiers.state && modifiers.state.length > 0) {
      // state가 string이면 배열로 변환
      const stateArr = Array.isArray(modifiers.state) ? modifiers.state : [modifiers.state];
      // 여러 상태를 조합하여 복합 키 생성 (예: "@media (any-pointer: fine) and :hover")
      const stateKey = stateArr.join(' and ');
      
      if (!styles.states) {
        styles.states = {} as Record<string, Partial<ParsedStyles>>;
      }
      
      if (!styles.states[stateKey]) {
        styles.states[stateKey] = this.createEmptyStylesStructure();
      }
      
      // 추가 modifier들을 재귀적으로 처리
      const remainingModifiers = { ...modifiers };
      delete remainingModifiers.state;
      
      if (Object.keys(remainingModifiers).length > 0) {
        const nestedClass = { ...parsedClass, modifiers: remainingModifiers };
        this.applyParsedClassToStyles(nestedClass, styles.states[stateKey] as ParsedStyles);
      } else {
        this.applyStyleByCategory(parsedClass, styles.states[stateKey] as Partial<ParsedStyles>);
      }
      return;
    }

    // Pseudo-element modifier 처리
    if (modifiers.pseudoElement) {
      const pseudoKey = modifiers.pseudoElement;
      
      if (!styles.pseudoElements) {
        styles.pseudoElements = {};
      }
      
      if (!styles.pseudoElements[pseudoKey]) {
        styles.pseudoElements[pseudoKey] = this.createEmptyStylesStructure();
      }
      
      // 추가 modifier들을 재귀적으로 처리
      const remainingModifiers = { ...modifiers };
      delete remainingModifiers.pseudoElement;
      
      if (Object.keys(remainingModifiers).length > 0) {
        const nestedClass = { ...parsedClass, modifiers: remainingModifiers };
        this.applyParsedClassToStyles(nestedClass, styles.pseudoElements[pseudoKey] as ParsedStyles);
      } else {
        this.applyStyleByCategory(parsedClass, styles.pseudoElements[pseudoKey] as Partial<ParsedStyles>);
      }
      return;
    }

    // Attribute modifier 처리 (aria, data 등)
    const attributeModifiers = ['aria', 'data', 'not', 'starting', 'pointer', 'noscript', 'userValid', 'invertedColors', 'detailsContent'] as const;
    
    for (const attrType of attributeModifiers) {
      const modifierValue = (modifiers as any)[attrType];
      if (modifierValue) {
        const attrKey = `${attrType}:${modifierValue}`;
        
        if (!styles.attributes) {
          styles.attributes = {};
        }
        
        if (!styles.attributes[attrKey]) {
          styles.attributes[attrKey] = this.createEmptyStylesStructure();
        }
        
        // 추가 modifier들을 재귀적으로 처리
        const remainingModifiers = { ...modifiers };
        delete (remainingModifiers as any)[attrType];
        
        if (Object.keys(remainingModifiers).length > 0) {
          const nestedClass = { ...parsedClass, modifiers: remainingModifiers };
          this.applyParsedClassToStyles(nestedClass, styles.attributes[attrKey] as ParsedStyles);
        } else {
          this.applyStyleByCategory(parsedClass, styles.attributes[attrKey] as Partial<ParsedStyles>);
        }
        return;
      }
    }

    // 모든 modifier 처리가 완료된 경우: 기본 스타일 적용
    this.applyStyleByCategory(parsedClass, styles);
  }

  /**
   * 스타일 카테고리에 따라 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   */
  private applyStyleByCategory(
    parsedClass: ParsedClass,
    styles: Partial<ParsedStyles>
  ): void {
    const { category } = parsedClass;

    switch (category) {
      case "spacing":
        SpacingParser.applySpacingStyle(parsedClass, styles, this.parserContext);
        break;
      case "colors":
        ColorParser.applyColorStyle(parsedClass, styles, this.parserContext);
        break;
      case "typography":
        TypographyParser.applyTypographyStyle(parsedClass, styles, this.parserContext);
        break;
      case "layout":
        LayoutParser.applyLayoutStyle(parsedClass, styles, this.parserContext);
        break;
      case "effects":
        EffectsParser.applyEffectStyle(parsedClass, styles, this.parserContext);
        break;
      case "animation":
        AnimationParser.applyAnimationStyle(parsedClass, styles, this.parserContext);
        break;
      case "position":
        PositionParser.applyPositionStyle(parsedClass, styles, this.parserContext);
        break;
      case "transform":
        TransformParser.applyTransformStyle(parsedClass, styles, this.parserContext);
        break;
      case "sizing":
        SizingParser.applySizingStyle(parsedClass, styles, this.parserContext);
        break;
      case "flexbox-grid":
        FlexboxGridParser.applyFlexboxGridStyle(
          parsedClass,
          styles,
          this.parserContext
        );
        break;
      case "interactivity":
        InteractivityParser.applyInteractivityStyle(
          parsedClass,
          styles,
          this.parserContext
        );
        break;
      case "tables":
        TablesParser.applyTablesStyle(parsedClass, styles, this.parserContext);
        break;
      case "svg":
        SVGParser.applySVGStyle(parsedClass, styles, this.parserContext);
        break;
      case "transitions":
        TransitionsParser.applyTransitionsStyle(
          parsedClass,
          styles,
          this.parserContext
        );
        break;
      case "backgrounds":
        BackgroundsParser.applyBackgroundsStyle(
          parsedClass,
          styles,
          this.parserContext
        );
        break;
      case "borders":
        BordersParser.applyBordersStyle(parsedClass, styles, this.parserContext);
        break;
      case "overflow":
        OverflowParser.applyOverflowStyle(parsedClass, styles, this.parserContext);
        break;
      case "accessibility":
        AccessibilityParser.applyAccessibilityStyle(
          parsedClass,
          styles,
          this.parserContext
        );
        break;
      case "blend-modes":
        BlendModesParser.applyBlendModesStyle(parsedClass, styles, this.parserContext);
        break;
      case "mask":
        MaskParser.applyMaskStyle(parsedClass, styles, this.parserContext);
        break;
    }
  }

  /**
   * 크기 값을 변환합니다.
   * @param value 크기 값
   * @returns 변환된 크기 값
   */
  private convertSizeValue(value: string): string {
    // 분수 값 처리 (예: w-1/2 => 50%)
    if (value.includes("/")) {
      const [numerator, denominator] = value.split("/").map(Number);
      return `${(numerator / denominator) * 100}%`;
    }

    // 프리셋 값 처리
    if (value in this.preset.spacing) {
      return `${this.preset.spacing[value]}px`;
    }

    // 특수 값 처리
    if (value === "auto") return "auto";
    if (value === "full") return "100%";
    if (value === "screen") return "100vw";
    if (value === "min") return "min-content";
    if (value === "max") return "max-content";
    if (value === "fit") return "fit-content";

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

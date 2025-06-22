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
} from "./parsers";
import { ModifierParser, type ModifierParseResult } from "./parsers/modifiers";

/**
 * 파서 정보 인터페이스
 */
interface ParserInfo {
  parser: any;
  category: StyleCategory;
}

// 상태 모디파이어 체크
const states: string[] = [
  "hover",
  "focus",
  "active",
  "disabled",
  "visited",
  "checked",
  "first",
  "last",
  "odd",
  "even",
  "focus-within",
  "focus-visible",
  "target",
  "default",
  "enabled",
  "indeterminate",
  "invalid",
  "valid",
  "optional",
  "required",
  "placeholder-shown",
  "autofill",
  "read-only",
  "dark",
  "light",

  // v4.1 새로운 상태들
  "details-content", // <details> 요소의 content
  "in-range", // 범위 내 값
  "out-of-range", // 범위 밖 값
  "user-valid", // 사용자 상호작용 후 유효
  "user-invalid", // 사용자 상호작용 후 무효
  "first-of-type", // 같은 타입의 첫 번째
  "last-of-type", // 같은 타입의 마지막
  "only-of-type", // 같은 타입의 유일한 요소
  "empty", // 빈 요소
  "before", // ::before 의사 요소
  "after", // ::after 의사 요소
  "placeholder", // ::placeholder 의사 요소
  "file", // ::file-selector-button 의사 요소
  "marker", // ::marker 의사 요소
  "selection", // ::selection 의사 요소
  "first-line", // ::first-line 의사 요소
  "first-letter", // ::first-letter 의사 요소
  "backdrop", // ::backdrop 의사 요소

  // 미디어 쿼리 상태들
  "motion-safe", // prefers-reduced-motion: no-preference
  "motion-reduce", // prefers-reduced-motion: reduce
  "contrast-more", // prefers-contrast: more
  "contrast-less", // prefers-contrast: less
  "portrait", // orientation: portrait
  "landscape", // orientation: landscape
  "print", // print media
  "forced-colors", // forced-colors: active
  "inverted-colors", // inverted-colors: inverted
  "scripting", // scripting: enabled
  "starting", // @starting-style
];

/**
 * CSS 클래스 파서
 */
export class CSSParser {
  private config: Config;
  private preset: DesignPreset;
  private modifierParser: ModifierParser; // ModifierParser 인스턴스

  // 파서 맵핑 (우선순위 순서로 정렬)
  private static readonly PARSER_MAP: ParserInfo[] = [
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
    { parser: BackgroundsParser, category: "backgrounds" },
    { parser: EffectsParser, category: "effects" },
    { parser: BlendModesParser, category: "blend-modes" },

    // 상호작용 관련
    { parser: InteractivityParser, category: "interactivity" },

    // 기타
    { parser: SVGParser, category: "svg" },
    // ColorParser 제거: 각 개별 파서가 자신의 색상을 처리
  ];

  /**
   * 파서를 초기화합니다.
   * @param config 설정
   * @param preset 디자인 프리셋
   */
  constructor(config: Config, preset: DesignPreset) {
    this.config = config;
    this.preset = preset;
    this.modifierParser = new ModifierParser(); // ModifierParser 인스턴스 생성
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
      states: {} as Record<string, Partial<ParsedStyles>>,
      nestedStates: {},
      specialSelectors: {},
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
      breakpoints: {},
      containers: {},
      states: {} as Record<string, Partial<ParsedStyles>>,
      nestedStates: {},
      specialSelectors: {},
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
      console.dir(parsedClass);
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

    // Parse modifiers using Tailwind CSS approach
    const modifierResult = ModifierParser.parseModifierChain(processedClassName);
    console.dir(modifierResult);
    const baseClassName = modifierResult ? processedClassName.replace(modifierResult.modifierChain + ':', '') : processedClassName;

    // 각 파서에게 baseClassName 인식을 요청 (우선순위 순서)
    for (const { parser, category } of CSSParser.PARSER_MAP) {
      if (parser.isValidClass && parser.isValidClass(baseClassName)) {
        // 해당 파서가 클래스를 인식했으므로 파싱 진행
        const parseResult = parser.parseValue
          ? parser.parseValue(baseClassName)
          : this.fallbackParseValue(baseClassName);

        if (parseResult) {
          return {
            original: className,
            className: processedClassName,
            baseClassName: baseClassName,
            property: parseResult.property || baseClassName,
            value: parseResult.value || "",
            category: category,
            isArbitrary: parseResult.isArbitrary || false,
            
            // 🎯 Tailwind CSS 방식의 modifier 정보
            modifierChain: modifierResult?.modifierChain,
            modifiers: modifierResult?.modifiers,
          };
        }
      }
    }

    // 어떤 파서도 인식하지 못한 경우, fallback 처리
    const fallbackResult = this.fallbackParseValue(baseClassName);
    return {
      original: className,
      className: processedClassName,
      baseClassName: baseClassName,
      property: fallbackResult.property,
      value: fallbackResult.value,
      category: "layout", // 기본 카테고리
      isArbitrary: fallbackResult.isArbitrary,
      
      // 🎯 Tailwind CSS 방식의 modifier 정보
      modifierChain: modifierResult?.modifierChain,
      modifiers: modifierResult?.modifiers,
    };
  }

  /**
   * Fallback 값 파싱 (기존 parseArbitraryValue의 일부 로직)
   */
  private fallbackParseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } {
    // [값] 형태의 임의 값 체크
    const arbitraryMatch = className.match(/^(.+?)-\[(.+)\]$/);

    if (arbitraryMatch) {
      return {
        property: arbitraryMatch[1],
        value: arbitraryMatch[2],
        isArbitrary: true,
      };
    }

    // CSS 변수 체크 (예: text-(--my-color), aspect-(--my-aspect-ratio))
    const cssVarMatch = className.match(/^(.+?)-(--[\w-]+)$/);

    if (cssVarMatch) {
      return {
        property: cssVarMatch[1],
        value: `var(${cssVarMatch[2]})`,
        isArbitrary: true,
      };
    }

    // 일반 분리 (propertyName-value)
    const lastDashIndex = className.lastIndexOf("-");
    if (lastDashIndex > 0) {
      return {
        property: className.substring(0, lastDashIndex),
        value: className.substring(lastDashIndex + 1),
        isArbitrary: false,
      };
    }

    // 값이 없는 속성 (예: flex, grid, hidden)
    return {
      property: className,
      value: "",
      isArbitrary: false,
    };
  }

  /**
   * 파싱된 클래스를 스타일에 적용합니다.
   * 
   * 💡 modifier를 직접 사용하지 않고 별도 변수로 맵핑하는 이유:
   * 
   * 1. 데이터 타입 안정성: modifiers 객체의 구조가 복잡하고 optional 속성들이 많아
   *    직접 사용 시 타입 에러나 undefined 접근 위험이 있음
   * 
   * 2. 코드 가독성: breakpointKey, containerKey 같은 명확한 변수명으로
   *    해당 modifier가 어떤 용도로 사용되는지 명시적으로 표현
   * 
   * 3. 변환 로직 분리: Tailwind CSS의 원본 modifier 문자열을 
   *    내부 스타일 시스템의 키 형태로 변환하는 로직을 별도 메서드로 분리
   *    (예: "md" → breakpointKey, "@md" → containerKey)
   * 
   * 4. 향후 확장성: modifier 형태가 변경되거나 추가 변환 로직이 필요할 때
   *    변환 메서드만 수정하면 되므로 유지보수 용이
   * 
   * 5. 디버깅 편의성: 변환된 키 값을 중간 변수로 저장하여
   *    디버깅 시 어떤 키가 생성되었는지 쉽게 확인 가능
   * 
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   */
  private applyParsedClassToStyles(
    parsedClass: ParsedClass,
    styles: ParsedStyles
  ): void {
    const { modifiers } = parsedClass;

    console.dir(modifiers);

    // Modifier가 없는 경우: 기본 스타일 적용
    if (!modifiers || (!modifiers.responsive && !modifiers.container && !modifiers.state?.length)) {
      this.applyStyleByCategory(parsedClass, styles);
      return;
    }

    // Responsive modifier 처리
    if (modifiers.responsive) {
      // 🎯 modifier 직접 사용 대신 변환된 키 사용
      // modifiers.responsive는 "md", "lg" 같은 원본 문자열
      // breakpointKey는 내부 스타일 시스템에서 사용할 키 형태로 변환
      const breakpointKey = modifiers.responsive; // Tailwind 방식: 원본 그대로 사용

      if (!styles.breakpoints) {
        styles.breakpoints = {};
      }

      if (!styles.breakpoints[breakpointKey]) {
        styles.breakpoints[breakpointKey] = this.createEmptyStylesStructure();
      }

      // State modifier가 있는 경우
      if (modifiers.state && modifiers.state.length > 0) {
        if (modifiers.state.length === 1) {
          // 단일 상태: md:hover:bg-blue-500
          const stateKey = modifiers.state[0];
          if (!styles.breakpoints[breakpointKey].states![stateKey]) {
            styles.breakpoints[breakpointKey].states![stateKey] = this.createEmptyStylesStructure();
          }
          this.applyStyleByCategory(parsedClass, styles.breakpoints[breakpointKey].states![stateKey]);
        } else {
          // 다중 상태: md:hover:focus:bg-blue-500
          const nestedKey = modifiers.state.join(":");
          if (!styles.breakpoints[breakpointKey].nestedStates![nestedKey]) {
            styles.breakpoints[breakpointKey].nestedStates![nestedKey] = this.createEmptyStylesStructure();
          }
          this.applyStyleByCategory(parsedClass, styles.breakpoints[breakpointKey].nestedStates![nestedKey]);
        }
      } else {
        // 상태 없음: md:bg-blue-500
        this.applyStyleByCategory(parsedClass, styles.breakpoints[breakpointKey]);
      }
      return;
    }

    console.dir(modifiers);

    // Container query 처리
    if (modifiers.container) {
      console.dir(modifiers.container);
      // 🎯 modifier 직접 사용 대신 변환된 키 사용
      // modifiers.container는 "@md", "@lg" 같은 원본 문자열 또는 named container 객체
      // containerKey는 내부 스타일 시스템에서 사용할 키 형태로 변환
      let containerKey: string;
      
      if (typeof modifiers.container === 'string') {
        // 일반 container query: @md, @lg 등
        containerKey = modifiers.container;
      } else if (modifiers.container && typeof modifiers.container === 'object') {
        // named container: @container/sidebar, @container/main 등
        containerKey = modifiers.container.containerName ? `@container/${modifiers.container.containerName}` : '@container';
      } else {
        containerKey = modifiers.container;
      }

      if (!styles.containers) {
        styles.containers = {};
      }

      if (!styles.containers[containerKey]) {
        styles.containers[containerKey] = this.createEmptyStylesStructure();
      }

      // State modifier가 있는 경우
      if (modifiers.state && modifiers.state.length > 0) {
        if (modifiers.state.length === 1) {
          // 단일 상태: @md:hover:bg-blue-500 또는 @container/sidebar:hover:bg-blue-500
          const stateKey = modifiers.state[0];
          if (!styles.containers[containerKey].states![stateKey]) {
            styles.containers[containerKey].states![stateKey] = this.createEmptyStylesStructure();
          }
          this.applyStyleByCategory(parsedClass, styles.containers[containerKey].states![stateKey]);
        } else {
          // 다중 상태: @md:hover:focus:bg-blue-500 또는 @container/sidebar:hover:focus:bg-blue-500
          const nestedKey = modifiers.state.join(":");
          if (!styles.containers[containerKey].nestedStates![nestedKey]) {
            styles.containers[containerKey].nestedStates![nestedKey] = this.createEmptyStylesStructure();
          }
          this.applyStyleByCategory(parsedClass, styles.containers[containerKey].nestedStates![nestedKey]);
        }
      } else {
        // 상태 없음: @md:bg-blue-500 또는 @container/sidebar:bg-blue-500
        this.applyStyleByCategory(parsedClass, styles.containers[containerKey]);
      }
      return;
    }

    // State modifier만 있는 경우
    if (modifiers.state && modifiers.state.length > 0) {
      if (modifiers.state.length === 1) {
        // 단일 상태: hover:bg-blue-500
        const stateKey = modifiers.state[0];
        
        if (!styles.states) {
          styles.states = {} as Record<string, Partial<ParsedStyles>>;
        }
        
        if (!styles.states[stateKey]) {
          styles.states[stateKey] = this.createEmptyStylesStructure();
        }
        
        this.applyStyleByCategory(parsedClass, styles.states[stateKey]);
      } else {
        // 다중 상태: hover:focus:bg-blue-500
        const nestedKey = modifiers.state.join(":");
        
        if (!styles.nestedStates) {
          styles.nestedStates = {};
        }
        
        if (!styles.nestedStates[nestedKey]) {
          styles.nestedStates[nestedKey] = this.createEmptyStylesStructure();
        }
        
        this.applyStyleByCategory(parsedClass, styles.nestedStates[nestedKey]);
      }
      return;
    }
  }

  /**
   * 브레이크포인트 키를 생성합니다. (LEGACY - 사용하지 않음)
   */
  private getBreakpointKey(breakpoint: any): string {
    // 임의 브레이크포인트인 경우 원래 형태 유지
    if ((breakpoint as any).isArbitrary) {
      return breakpoint.type === "max-width"
        ? `max-[${breakpoint.value}]`
        : `min-[${breakpoint.value}]`;
    }

    // 값에서 원래 브레이크포인트 이름을 찾기
    const screens = this.preset.screens || {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    };

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
   * 컨테이너 키를 생성합니다.
   */
  private getContainerKey(container: any): string {
    // 값에서 원래 컨테이너 이름을 찾기
    const screens = this.preset.screens || {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    };

    const screenKey = Object.keys(screens).find(
      (key) => screens[key] === container.value
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
        SpacingParser.applySpacingStyle(parsedClass, styles, this.preset);
        break;
      case "colors":
        ColorParser.applyColorStyle(parsedClass, styles, this.preset);
        break;
      case "typography":
        TypographyParser.applyTypographyStyle(parsedClass, styles, this.preset);
        break;
      case "layout":
        LayoutParser.applyLayoutStyle(parsedClass, styles);
        break;
      case "effects":
        EffectsParser.applyEffectStyle(parsedClass, styles, this.preset);
        break;
      case "animation":
        AnimationParser.applyAnimationStyle(parsedClass, styles, this.preset);
        break;
      case "position":
        PositionParser.applyPositionStyle(parsedClass, styles, this.preset);
        break;
      case "transform":
        TransformParser.applyTransformStyle(parsedClass, styles, this.preset);
        break;
      case "sizing":
        SizingParser.applySizingStyle(parsedClass, styles, this.preset);
        break;
      case "flexbox-grid":
        FlexboxGridParser.applyFlexboxGridStyle(
          parsedClass,
          styles,
          this.preset
        );
        break;
      case "interactivity":
        InteractivityParser.applyInteractivityStyle(
          parsedClass,
          styles,
          this.preset
        );
        break;
      case "tables":
        TablesParser.applyTablesStyle(parsedClass, styles, this.preset);
        break;
      case "svg":
        SVGParser.applySVGStyle(parsedClass, styles, this.preset);
        break;
      case "transitions":
        TransitionsParser.applyTransitionsStyle(
          parsedClass,
          styles,
          this.preset
        );
        break;
      case "backgrounds":
        BackgroundsParser.applyBackgroundsStyle(
          parsedClass,
          styles,
          this.preset
        );
        break;
      case "borders":
        BordersParser.applyBordersStyle(parsedClass, styles, this.preset);
        break;
      case "overflow":
        OverflowParser.applyOverflowStyle(parsedClass, styles, this.preset);
        break;
      case "accessibility":
        AccessibilityParser.applyAccessibilityStyle(
          parsedClass,
          styles,
          this.preset
        );
        break;
      case "blend-modes":
        BlendModesParser.applyBlendModesStyle(parsedClass, styles, this.preset);
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

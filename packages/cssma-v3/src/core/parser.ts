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
  StateModifier,
  BreakpointModifier,
  ContainerQueryModifier,
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
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   */
  private applyParsedClassToStyles(
    parsedClass: ParsedClass,
    styles: ParsedStyles
  ): void {
    const {
      breakpointModifier,
      breakpointModifiers,
      containerQueryModifier,
      stateModifier,
      stateModifiers,
      specialSelector,
    } = parsedClass;

    // 복합 브레이크포인트 처리 (md:max-lg:flex)
    if (breakpointModifiers && breakpointModifiers.length > 1) {
      let currentLevel = styles;

      // 각 브레이크포인트를 순차적으로 중첩 적용
      for (let i = 0; i < breakpointModifiers.length; i++) {
        const breakpoint = breakpointModifiers[i];
        const breakpointKey = this.getBreakpointKey(breakpoint);

        // 최상위 레벨에서는 breakpoints 객체 사용
        if (i === 0) {
          if (!currentLevel.breakpoints) {
            currentLevel.breakpoints = {};
          }

          if (!currentLevel.breakpoints[breakpointKey]) {
            currentLevel.breakpoints[breakpointKey] = {
              spacing: { padding: {}, margin: {}, gap: {} },
              colors: {},
              typography: {},
              layout: {},
              effects: {},
              animation: {},
              position: {},
              transform: {},
              sizing: {},
              states: {} as Record<string, Partial<ParsedStyles>>,
              nestedStates: {},
              specialSelectors: {},
            };
          }

          currentLevel = currentLevel.breakpoints[breakpointKey] as any;
        }
        // 중첩 레벨에서는 breakpoints 필드에 추가
        else {
          if (!currentLevel.breakpoints) {
            currentLevel.breakpoints = {};
          }

          if (!currentLevel.breakpoints[breakpointKey]) {
            currentLevel.breakpoints[breakpointKey] = {
              spacing: { padding: {}, margin: {}, gap: {} },
              colors: {},
              typography: {},
              layout: {},
              effects: {},
              animation: {},
              position: {},
              transform: {},
              sizing: {},
            };
          }

          // 마지막 브레이크포인트가 아니면 계속 중첩
          if (i < breakpointModifiers.length - 1) {
            currentLevel = currentLevel.breakpoints[breakpointKey] as any;
          } else {
            // 마지막 브레이크포인트에서는 스타일 적용
            this.applyStyleByCategory(
              parsedClass,
              currentLevel.breakpoints[breakpointKey]
            );
          }
        }
      }
    }
    // 단일 반응형 처리 (브레이크포인트)
    else if (breakpointModifier) {
      // 브레이크포인트 키를 테스트에서 기대하는 형식으로 생성
      const breakpointKey = this.getBreakpointKey(breakpointModifier);

      if (!styles.breakpoints) {
        styles.breakpoints = {};
      }

      if (!styles.breakpoints[breakpointKey]) {
        styles.breakpoints[breakpointKey] = {
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
          states: {} as Record<string, Partial<ParsedStyles>>,
          nestedStates: {},
          specialSelectors: {},
        };
      }

      // 특수 선택자 처리
      if (specialSelector) {
        const selectorKey = `${specialSelector.type}-${specialSelector.value}`;
        if (!styles.breakpoints[breakpointKey].specialSelectors![selectorKey]) {
          styles.breakpoints[breakpointKey].specialSelectors![selectorKey] = {
            spacing: {},
            colors: {},
            typography: {},
            layout: {},
            effects: {},
            animation: {},
            position: {},
            transform: {},
            sizing: {},
          };
        }
        this.applyStyleByCategory(
          parsedClass,
          styles.breakpoints[breakpointKey].specialSelectors![selectorKey]
        );
      }
      // 다중 상태 모디파이어 처리 (중첩 상태)
      else if (stateModifiers && stateModifiers.length > 1) {
        const nestedKey = stateModifiers.join(":");
        if (!styles.breakpoints[breakpointKey].nestedStates![nestedKey]) {
          styles.breakpoints[breakpointKey].nestedStates![nestedKey] = {
            spacing: {},
            colors: {},
            typography: {},
            layout: {},
            effects: {},
            animation: {},
            position: {},
            transform: {},
            sizing: {},
          };
        }
        this.applyStyleByCategory(
          parsedClass,
          styles.breakpoints[breakpointKey].nestedStates![nestedKey]
        );
      }
      // 단일 상태 모디파이어 처리
      else if (
        stateModifier ||
        (stateModifiers && stateModifiers.length === 1)
      ) {
        const stateKey = stateModifier || stateModifiers![0];

        if (!styles.breakpoints[breakpointKey].states![stateKey]) {
          styles.breakpoints[breakpointKey].states![stateKey] = {
            spacing: {},
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
          };
        }

        this.applyStyleByCategory(
          parsedClass,
          styles.breakpoints[breakpointKey].states![stateKey]
        );
      } else {
        this.applyStyleByCategory(
          parsedClass,
          styles.breakpoints[breakpointKey]
        );
      }
    }
    // 컨테이너 쿼리 처리
    else if (containerQueryModifier) {
      const containerKey = this.getContainerKey(containerQueryModifier);

      if (!styles.containers) {
        styles.containers = {};
      }

      if (!styles.containers[containerKey]) {
        styles.containers[containerKey] = {
          spacing: {},
          colors: {},
          typography: {},
          layout: {},
          effects: {},
          animation: {},
          position: {},
          transform: {},
          sizing: {},
          states: {} as Record<string, Partial<ParsedStyles>>,
          nestedStates: {},
          specialSelectors: {},
        };
      }

      // 특수 선택자나 중첩 상태 처리는 브레이크포인트와 동일
      if (specialSelector) {
        const selectorKey = `${specialSelector.type}-${specialSelector.value}`;
        if (!styles.containers[containerKey].specialSelectors![selectorKey]) {
          styles.containers[containerKey].specialSelectors![selectorKey] = {
            spacing: {},
            colors: {},
            typography: {},
            layout: {},
            effects: {},
            animation: {},
            position: {},
            transform: {},
            sizing: {},
          };
        }
        this.applyStyleByCategory(
          parsedClass,
          styles.containers[containerKey].specialSelectors![selectorKey]
        );
      } else if (stateModifiers && stateModifiers.length > 1) {
        const nestedKey = stateModifiers.join(":");
        if (!styles.containers[containerKey].nestedStates![nestedKey]) {
          styles.containers[containerKey].nestedStates![nestedKey] = {
            spacing: {},
            colors: {},
            typography: {},
            layout: {},
            effects: {},
            animation: {},
            position: {},
            transform: {},
            sizing: {},
          };
        }
        this.applyStyleByCategory(
          parsedClass,
          styles.containers[containerKey].nestedStates![nestedKey]
        );
      } else if (
        stateModifier ||
        (stateModifiers && stateModifiers.length === 1)
      ) {
        const stateKey = stateModifier || stateModifiers![0];

        if (!styles.containers[containerKey].states![stateKey]) {
          styles.containers[containerKey].states![stateKey] = {
            spacing: {},
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
          };
        }

        this.applyStyleByCategory(
          parsedClass,
          styles.containers[containerKey].states![stateKey]
        );
      } else {
        this.applyStyleByCategory(parsedClass, styles.containers[containerKey]);
      }
    }
    // 특수 선택자만 있는 경우
    else if (specialSelector) {
      const selectorKey = `${specialSelector.type}-${specialSelector.value}`;

      if (!styles.specialSelectors) {
        styles.specialSelectors = {};
      }

      if (!styles.specialSelectors[selectorKey]) {
        styles.specialSelectors[selectorKey] = {
          spacing: {},
          colors: {},
          typography: {},
          layout: {},
          effects: {},
          animation: {},
          position: {},
          transform: {},
          sizing: {},
        };
      }

      this.applyStyleByCategory(
        parsedClass,
        styles.specialSelectors[selectorKey]
      );
    }
    // 다중 상태 모디파이어만 있는 경우 (중첩 상태)
    else if (stateModifiers && stateModifiers.length > 1) {
      const nestedKey = stateModifiers.join(":");

      if (!styles.nestedStates) {
        styles.nestedStates = {};
      }

      if (!styles.nestedStates[nestedKey]) {
        styles.nestedStates[nestedKey] = {
          spacing: {},
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
        };
      }

      this.applyStyleByCategory(parsedClass, styles.nestedStates[nestedKey]);
    }
    // 단일 상태 모디파이어만 있는 경우
    else if (stateModifier || (stateModifiers && stateModifiers.length === 1)) {
      const stateKey = stateModifier || stateModifiers![0];

      if (!styles.states) {
        styles.states = {} as Record<string, Partial<ParsedStyles>>;
      }

      if (!styles.states[stateKey]) {
        styles.states[stateKey] = {
          spacing: {},
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
        };
      }

      this.applyStyleByCategory(parsedClass, styles.states[stateKey]);
    }
    // 기본 스타일
    else {
      this.applyStyleByCategory(parsedClass, styles);
    }
  }

  /**
   * 브레이크포인트 키를 생성합니다.
   */
  private getBreakpointKey(breakpoint: BreakpointModifier): string {
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
  private getContainerKey(container: ContainerQueryModifier): string {
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
    breakpoint: BreakpointModifier | undefined
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
    container: ContainerQueryModifier | undefined
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

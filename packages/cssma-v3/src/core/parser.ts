/**
 * CSSParser - CSS 클래스 파서 (리팩토링된 버전)
 * 
 * 이 클래스는 CSS 클래스를 파싱하여 구조화된 데이터로 변환합니다.
 * 모든 기능(반응형, 상태 모디파이어, 임의 값 등)을 지원합니다.
 * 
 * 개별 파서들로 책임을 분리하여 유지보수성을 향상시켰습니다.
 */

import { Config, ParsedClass, ParsedStyles, DesignPreset, StyleCategory, StateModifier, BreakpointModifier, ContainerQueryModifier } from '../types';
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
  FiltersParser,
  InteractivityParser,
  TablesParser,
  SVGParser,
  TransitionsParser,
  BackgroundsParser,
  BordersParser,
  OverflowParser,
  AccessibilityParser,
  BlendModesParser
} from './parsers';

/**
 * CSS 클래스 파서
 */
export class CSSParser {
  private config: Config;
  private preset: DesignPreset;

  /**
   * 파서를 초기화합니다.
   * @param config 설정
   * @param preset 디자인 프리셋
   */
  constructor(config: Config, preset: DesignPreset) {
    this.config = config;
    this.preset = preset;
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
        gap: {}
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
        preset: this.preset.name || 'default',
        parseTime: 0,
        warnings: []
      }
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
      .filter(token => token.length > 0);
  }

  /**
   * 클래스명을 파싱합니다.
   * @param className 클래스명
   * @returns 파싱된 클래스 객체
   */
  parseClassName(className: string): ParsedClass | undefined {
    if (!className || className.trim() === '') {
      return undefined;
    }

    // Prefix 제거 (설정된 경우)
    let processedClassName = className;
    if (this.config.prefix && className.startsWith(this.config.prefix)) {
      processedClassName = className.slice(this.config.prefix.length);
    }

    // 모디파이어를 파싱합니다.
    const modifierResult = this.parseModifiers(processedClassName);
    const { baseClassName } = modifierResult;

    // 임의 값을 파싱합니다.
    const arbitraryResult = this.parseArbitraryValue(baseClassName);
    const { isArbitrary, propertyName, value, category } = arbitraryResult;

    // 카테고리와 속성 결정 (이미 카테고리가 결정된 경우 우회)
    const categoryResult = category 
      ? { category, property: propertyName }
      : this.determineCategoryAndProperty(propertyName, value);

    return {
      original: className,
      className: processedClassName,
      baseClassName: baseClassName,
      property: categoryResult.property,
      value: value,
      category: categoryResult.category,
      isArbitrary: isArbitrary,
      stateModifier: modifierResult.stateModifier,
      breakpointModifier: modifierResult.breakpointModifier,
      containerQueryModifier: modifierResult.containerQueryModifier,
      stateModifiers: modifierResult.stateModifiers,
      breakpointModifiers: modifierResult.breakpointModifiers,
      specialSelector: modifierResult.specialSelector,
      modifier: modifierResult.modifier,
      breakpoint: this.getBreakpointName(modifierResult.breakpointModifier),
      modifiers: {
        state: modifierResult.stateModifiers,
        breakpoint: this.getBreakpointName(modifierResult.breakpointModifier),
        container: this.getContainerName(modifierResult.containerQueryModifier),
        special: modifierResult.specialSelector
      }
    };
  }

  /**
   * 모디파이어를 파싱합니다.
   * @param className 클래스명
   * @returns 파싱 결과
   */
  private parseModifiers(className: string): { 
    baseClassName: string; 
    stateModifier?: StateModifier; 
    breakpointModifier?: BreakpointModifier;
    containerQueryModifier?: ContainerQueryModifier;
    stateModifiers?: StateModifier[];
    specialSelector?: {
      type: 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type';
      value: string;
    };
    // 복합 브레이크포인트를 위한 필드 추가
    breakpointModifiers?: BreakpointModifier[];
    modifier?: string;
  } {
    let baseClassName = className;
    let stateModifier: StateModifier | undefined;
    let breakpointModifier: BreakpointModifier | undefined;
    let containerQueryModifier: ContainerQueryModifier | undefined;
    let stateModifiers: StateModifier[] = [];
    let breakpointModifiers: BreakpointModifier[] = [];
    let specialSelector: { type: 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type'; value: string } | undefined;

    // 콜론으로 분리
    const parts = className.split(':');
    baseClassName = parts[parts.length - 1]; // 마지막 부분이 실제 클래스

    // 모디파이어들 처리
    for (let i = 0; i < parts.length - 1; i++) {
      const modifier = parts[i];

      // 컨테이너 쿼리 모디파이어 체크 (@로 시작)
      if (modifier.startsWith('@')) {
        const containerQuery = modifier.slice(1); // @ 제거
        
        // max- 접두사 체크
        if (containerQuery.startsWith('max-')) {
          const size = containerQuery.slice(4);
          // 임의 값 ([...]) 직접 처리
          if (size.startsWith('[') && size.endsWith(']')) {
            containerQueryModifier = {
              type: 'max-width',
              value: size.slice(1, -1) // [] 제거
            };
          } else {
            containerQueryModifier = {
              type: 'max-width',
              value: this.getScreenSize(size)
            };
          }
        } else {
          // min- 또는 일반 컨테이너 쿼리
          let actualQuery = containerQuery;
          
          // min- 접두사 제거 (있는 경우)
          if (containerQuery.startsWith('min-')) {
            actualQuery = containerQuery.slice(4);
          }
          
          // 임의 값 ([...]) 직접 처리
          if (actualQuery.startsWith('[') && actualQuery.endsWith(']')) {
            containerQueryModifier = {
              type: 'min-width',
              value: actualQuery.slice(1, -1) // [] 제거
            };
          } else if (actualQuery.includes('/')) {
            // 명명된 컨테이너 쿼리 (예: md/sidebar)
            containerQueryModifier = {
              type: 'min-width',
              value: actualQuery // 그대로 유지
            };
          } else {
            containerQueryModifier = {
              type: 'min-width',
              value: this.getScreenSize(actualQuery)
            };
          }
        }
        continue;
      }

      // 반응형 모디파이어 체크
      const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];
      const maxBreakpoints = ['max-sm', 'max-md', 'max-lg', 'max-xl', 'max-2xl'];
      
      if (breakpoints.includes(modifier)) {
        const newBreakpoint = {
          type: 'min-width' as const,
          value: this.getScreenSize(modifier)
        };
        
        if (!breakpointModifier) {
          breakpointModifier = newBreakpoint;
        }
        breakpointModifiers.push(newBreakpoint);
        continue;
      }
      
      if (maxBreakpoints.includes(modifier)) {
        const size = modifier.replace('max-', '');
        const newBreakpoint = {
          type: 'max-width' as const,
          value: this.getScreenSize(size)
        };
        
        if (!breakpointModifier) {
          breakpointModifier = newBreakpoint;
        }
        breakpointModifiers.push(newBreakpoint);
        continue;
      }

      // 임의 브레이크포인트 체크 (min-[...], max-[...])
      if (modifier.startsWith('min-[') && modifier.endsWith(']')) {
        const value = modifier.slice(5, -1);
        const newBreakpoint = {
          type: 'min-width' as const,
          value: value,
          // 임의 브레이크포인트 표시용 플래그
          isArbitrary: true
        } as any;
        
        if (!breakpointModifier) {
          breakpointModifier = newBreakpoint;
        }
        breakpointModifiers.push(newBreakpoint);
        continue;
      }
      
      if (modifier.startsWith('max-[') && modifier.endsWith(']')) {
        const value = modifier.slice(5, -1);
        const newBreakpoint = {
          type: 'max-width' as const,
          value: value,
          // 임의 브레이크포인트 표시용 플래그
          isArbitrary: true
        } as any;
        
        if (!breakpointModifier) {
          breakpointModifier = newBreakpoint;
        }
        breakpointModifiers.push(newBreakpoint);
        continue;
      }

      // 특수 선택자 체크
      // nth-[expression]: 패턴 (nth-[3n+1]:)
      if (modifier.startsWith('nth-[') && modifier.endsWith(']')) {
        const value = modifier.slice(5, -1);
        specialSelector = {
          type: 'nth-child',
          value: value
        };
        continue;
      }

      // nth-{number}: 패턴 (nth-3:)
      const nthMatch = modifier.match(/^nth-(\d+)$/);
      if (nthMatch) {
        specialSelector = {
          type: 'nth-child',
          value: nthMatch[1]
        };
        continue;
      }

      // nth-of-type-{number}: 패턴 (nth-of-type-3:)
      const nthOfTypeMatch = modifier.match(/^nth-of-type-(\d+)$/);
      if (nthOfTypeMatch) {
        specialSelector = {
          type: 'nth-of-type',
          value: nthOfTypeMatch[1]
        };
        continue;
      }

      // 기존 괄호 패턴 (nth-child(3):) - 후위 호환성
      if (modifier.includes('(') && modifier.includes(')')) {
        const match = modifier.match(/^(nth-child|nth-last-child|nth-of-type|nth-last-of-type)\((.+)\)$/);
        if (match) {
          specialSelector = {
            type: match[1] as any,
            value: match[2]
          };
          continue;
        }
      }

      // 상태 모디파이어 체크
      const states: string[] = [
        'hover', 'focus', 'active', 'disabled', 'visited', 'checked',
        'first', 'last', 'odd', 'even', 'focus-within', 'focus-visible',
        'target', 'default', 'enabled', 'indeterminate', 'invalid',
        'valid', 'optional', 'required', 'placeholder-shown', 'autofill',
        'read-only', 'dark', 'light'
      ];
      
      if (states.includes(modifier)) {
        if (!stateModifier) {
          stateModifier = modifier as StateModifier;
        }
        stateModifiers.push(modifier as StateModifier);
      }
    }

    // Modifier 필드 설정 (테스트 호환성)
    let modifierValue: string | undefined;
    
    // 복합 모디파이어 (예: md:hover)의 경우 상태 부분만 반환
    if (breakpointModifier && stateModifier) {
      // 다중 상태의 경우 마지막 상태만 사용
      modifierValue = stateModifiers.length > 0 ? stateModifiers[stateModifiers.length - 1] : stateModifier;
    }
    // 상태 모디파이어만 있는 경우
    else if (stateModifier || stateModifiers.length > 0) {
      // 다중 상태의 경우 마지막 상태만 반환 (테스트 호환성)
      modifierValue = stateModifiers.length > 0 ? stateModifiers[stateModifiers.length - 1] : stateModifier;
    } else if (breakpointModifier) {
      // 브레이크포인트 모디파이어만 있는 경우 - 브레이크포인트 이름 사용
      const screens = this.preset.screens || {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      };
      
      // 브레이크포인트 이름 찾기
      const screenKey = Object.keys(screens).find(key => (screens as Record<string, string>)[key] === breakpointModifier.value);
      
      if (screenKey) {
        modifierValue = breakpointModifier.type === 'max-width' ? `max-${screenKey}` : screenKey;
      } else if (breakpointModifier.value.startsWith('[') && breakpointModifier.value.endsWith(']')) {
        // 임의 브레이크포인트
        const arbitraryValue = breakpointModifier.value.slice(1, -1);
        modifierValue = breakpointModifier.type === 'max-width' ? `max-[${arbitraryValue}]` : `min-[${arbitraryValue}]`;
      } else {
        modifierValue = breakpointModifier.value;
      }
    }

    return {
      baseClassName,
      stateModifier,
      breakpointModifier,
      containerQueryModifier,
      stateModifiers: stateModifiers.length > 0 ? stateModifiers : undefined,
      specialSelector,
      breakpointModifiers: breakpointModifiers.length > 0 ? breakpointModifiers : undefined,
      modifier: modifierValue
    };
  }

  /**
   * 임의 값을 파싱합니다.
   * @param className 클래스명
   * @returns 파싱 결과
   */
  private parseArbitraryValue(className: string): { 
    isArbitrary: boolean; 
    propertyName: string; 
    value: string;
    category?: StyleCategory; // 카테고리가 이미 결정된 경우
  } {
    // Typography 클래스인지 먼저 확인 (임의 값 포함)
    if (TypographyParser.isTypographyClass(className)) {
      const parsed = TypographyParser.parseTypography(className);
      if (parsed) {
        // CSS 속성명을 Tailwind 접두사로 매핑
        const cssToTailwindMap: Record<string, string> = {
          'font-size': 'text',
          'font-weight': 'font',
          'font-family': 'font',
          'letter-spacing': 'tracking',
          'line-height': 'leading',
          'text-align': 'text',
          'text-decoration-line': parsed.property, // underline, line-through 등은 그대로
          'text-decoration-style': 'decoration',
          'text-decoration-thickness': 'decoration',
          'text-underline-offset': 'underline-offset',
          'text-indent': 'indent',
          'text-transform': parsed.property, // uppercase, lowercase 등은 그대로
          'font-style': parsed.property, // italic 등은 그대로
        };

        const mappedProperty = cssToTailwindMap[parsed.property] || parsed.property;

        return {
          isArbitrary: parsed.isArbitrary || false,
          propertyName: mappedProperty,
          value: parsed.value,
          category: 'typography' // 카테고리를 명시적으로 설정
        };
      }
    }

    // [값] 형태의 임의 값 체크
    const arbitraryMatch = className.match(/^(.+?)-\[(.+)\]$/);
    
    if (arbitraryMatch) {
      return {
        isArbitrary: true,
        propertyName: arbitraryMatch[1],
        value: arbitraryMatch[2]
      };
    }

    // Spacing 클래스인지 확인하고 SpacingParser에게 위임
    if (SpacingParser.isSpacingClass(className)) {
      const parsed = SpacingParser.parseSpacing(className);
      if (parsed) {
        // 임의 값인지 확인 (대괄호로 감싸진 값)
        const isArbitrary = parsed.value.startsWith('[') && parsed.value.endsWith(']');
        return {
          isArbitrary,
          propertyName: parsed.property,
          value: isArbitrary ? parsed.value.slice(1, -1) : parsed.value // 대괄호 제거
        };
      }
    }

    // 색상 클래스 특별 처리 (text-blue-500, bg-gray-100 등)
    const colorPropertyRegex = /^(text|bg|border|ring|outline|accent|caret|decoration|divide|from|via|to|fill|stroke)-(.+)$/;
    const colorMatch = className.match(colorPropertyRegex);
    
    if (colorMatch) {
      const property = colorMatch[1];
      const colorValue = colorMatch[2];
      
      // 색상 값인지 확인 (색상명-강도 패턴)
      if (colorValue.match(/^[a-z]+-\d+$|^[a-z]+$|^current$|^transparent$|^inherit$|^initial$|^unset$/)) {
        return {
          isArbitrary: false,
          propertyName: property,
          value: colorValue
        };
      }
    }

    // CSS 변수 체크 (예: text-(--my-color), aspect-(--my-aspect-ratio))
    const cssVarMatch = className.match(/^(.+?)-(--[\w-]+)$/);
    
    if (cssVarMatch) {
      return {
        isArbitrary: true,
        propertyName: cssVarMatch[1],
        value: `var(${cssVarMatch[2]})`
      };
    }

    // 일반 분리 (propertyName-value)
    const lastDashIndex = className.lastIndexOf('-');
    if (lastDashIndex > 0) {
      return {
        isArbitrary: false,
        propertyName: className.substring(0, lastDashIndex),
        value: className.substring(lastDashIndex + 1)
      };
    }

    // 값이 없는 속성 (예: flex, grid, hidden)
    return {
      isArbitrary: false,
      propertyName: className,
      value: ''
    };
  }

  /**
   * 카테고리와 속성을 결정합니다.
   * @param propertyName 속성명
   * @param value 값
   * @returns 카테고리와 속성
   */
  private determineCategoryAndProperty(propertyName: string, value: string): { category: StyleCategory, property: string } {
    // 먼저 전체 클래스명으로 spacing 체크 (음수, 논리적 속성 등 포함)
    const fullClassName = value ? `${propertyName}-${value}` : propertyName;
    if (SpacingParser.isSpacingClass(fullClassName) || SpacingParser.isSpacingClass(propertyName)) {
      return { category: 'spacing', property: propertyName };
    }

    // Tables 관련 (우선 처리 - border-collapse 등이 borders와 겹치므로)
    if (['border-collapse', 'border-separate', 'border-spacing', 'table-auto', 'table-fixed', 'caption'].includes(propertyName) ||
        propertyName.startsWith('border-spacing-') || propertyName.startsWith('caption-')) {
      return { category: 'tables', property: propertyName };
    }

    // Borders 관련 (새로 추가)
    if (['border-solid', 'border-dashed', 'border-dotted', 'border-double', 'border-hidden', 'border-none',
         'rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl',
         'rounded-full', 'ring-inset'].includes(propertyName) ||
        propertyName.startsWith('border') || propertyName.startsWith('rounded') ||
        propertyName.startsWith('divide-') || propertyName === 'ring' || propertyName.startsWith('ring-') ||
        propertyName === 'outline' || propertyName.startsWith('outline-')) {
      return { category: 'borders', property: propertyName };
    }

    // Transitions 관련 (새로 추가)
    if (['transition', 'duration', 'delay', 'ease-linear', 'ease-in', 'ease-out', 'ease-in-out'].includes(propertyName) ||
        propertyName.startsWith('transition-') || propertyName.startsWith('duration-') || 
        propertyName.startsWith('delay-') || propertyName.startsWith('ease-')) {
      return { category: 'transitions', property: propertyName };
    }

    // Backgrounds 관련 (새로 추가)
    if (['bg-auto', 'bg-cover', 'bg-contain', 'bg-repeat', 'bg-no-repeat', 'bg-repeat-x', 'bg-repeat-y',
         'bg-repeat-round', 'bg-repeat-space', 'bg-fixed', 'bg-local', 'bg-scroll', 'bg-clip-border',
         'bg-clip-padding', 'bg-clip-content', 'bg-clip-text', 'bg-origin-border', 'bg-origin-padding',
         'bg-origin-content'].includes(propertyName) ||
        propertyName.startsWith('bg-gradient-') || propertyName.startsWith('from-') || 
        propertyName.startsWith('via-') || propertyName.startsWith('to-') ||
        propertyName === 'bg' || // Include bg color classes
        (propertyName.startsWith('bg-') && !propertyName.match(/^bg-\d/)) ||
        propertyName.match(/^bg-(bottom|center|left|right|top)/)) {
      return { category: 'backgrounds', property: propertyName };
    }

    // Overflow 관련 (새로 추가)
    if (['overflow-auto', 'overflow-hidden', 'overflow-clip', 'overflow-visible', 'overflow-scroll',
         'overscroll-auto', 'overscroll-contain', 'overscroll-none', 'visible', 'invisible', 'collapse',
         'truncate', 'text-ellipsis', 'text-clip', 'whitespace-normal', 'whitespace-nowrap', 'whitespace-pre',
         'break-normal', 'break-words', 'break-all', 'break-keep'].includes(propertyName) ||
        propertyName.startsWith('overflow-') || propertyName.startsWith('overscroll-') ||
        propertyName.startsWith('object-') || propertyName.startsWith('whitespace-') ||
        (propertyName.startsWith('break-') && !['break-after', 'break-before', 'break-inside'].includes(propertyName)) || propertyName.startsWith('hyphens-')) {
      return { category: 'overflow', property: propertyName };
    }

    // Accessibility 관련 (새로 추가)
    if (['sr-only', 'not-sr-only', 'forced-color-adjust-auto', 'forced-color-adjust-none'].includes(propertyName) ||
        propertyName.startsWith('focus:') || propertyName.startsWith('focus-visible:') ||
        propertyName.startsWith('focus-within:')) {
      return { category: 'accessibility', property: propertyName };
    }

    // Blend modes 관련 (새로 추가)
    if (propertyName.startsWith('mix-blend-') || propertyName.startsWith('bg-blend-')) {
      return { category: 'blend-modes', property: propertyName };
    }

    // Flexbox & Grid 관련 (display, flex, grid 등)
    if (['flex', 'flex-row', 'flex-col', 'flex-wrap', 'flex-nowrap', 'flex-1', 'flex-auto', 'flex-initial', 'flex-none',
         'flex-grow', 'flex-shrink', 'basis', 'order', 'grid-cols', 'col', 'grid-rows', 'row', 'grid-flow',
         'justify', 'items', 'self', 'content', 'place-content', 'place-items', 'place-self'].includes(propertyName) ||
        propertyName.startsWith('col-') || propertyName.startsWith('row-') || propertyName.startsWith('grid-') ||
        propertyName.startsWith('flex-') || propertyName.startsWith('basis-') || propertyName.startsWith('order-') ||
        propertyName.startsWith('justify-') || propertyName.startsWith('items-') || propertyName.startsWith('self-') ||
        propertyName.startsWith('content-') || propertyName.startsWith('place-')) {
      return { category: 'flexbox-grid', property: propertyName };
    }

    // Display 관련 (Flexbox/Grid 파서에서 처리)
    if (['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden', 'table'].includes(propertyName)) {
      return { category: 'flexbox-grid', property: propertyName };
    }

    // Filters 관련
    if (['blur', 'brightness', 'contrast', 'drop-shadow', 'grayscale', 'hue-rotate', 'invert', 'saturate', 'sepia',
         'backdrop-blur', 'backdrop-brightness', 'backdrop-contrast', 'backdrop-grayscale', 'backdrop-hue-rotate',
         'backdrop-invert', 'backdrop-opacity', 'backdrop-saturate', 'backdrop-sepia'].includes(propertyName) ||
        propertyName.startsWith('blur-') || propertyName.startsWith('brightness-') || propertyName.startsWith('contrast-') ||
        propertyName.startsWith('backdrop-')) {
      return { category: 'filters', property: propertyName };
    }

    // Interactivity 관련
    if (['accent', 'appearance', 'cursor', 'caret', 'pointer-events', 'resize', 'scroll', 'snap', 'touch', 'select', 'will-change'].includes(propertyName) ||
        propertyName.startsWith('accent-') || propertyName.startsWith('appearance-') || propertyName.startsWith('cursor-') ||
        propertyName.startsWith('caret-') || propertyName.startsWith('pointer-events-') || propertyName.startsWith('resize-') ||
        propertyName.startsWith('scroll-') || propertyName.startsWith('snap-') || propertyName.startsWith('touch-') ||
        propertyName.startsWith('select-') || propertyName.startsWith('will-change-')) {
      return { category: 'interactivity', property: propertyName };
    }

    // SVG 관련
    if (['fill', 'stroke'].includes(propertyName) || propertyName.startsWith('fill-') || propertyName.startsWith('stroke-')) {
      return { category: 'svg', property: propertyName };
    }

    // 타이포그래피 관련 - TypographyParser 사용 (우선 처리)
    if (TypographyParser.isTypographyClass(propertyName) || TypographyParser.isTypographyClass(`${propertyName}-${value}`)) {
      // TypographyParser에서 반환한 CSS 속성명을 Tailwind 접두사로 매핑
      const cssToTailwindMap: Record<string, string> = {
        'font-size': 'text',
        'font-weight': 'font',
        'font-family': 'font',
        'letter-spacing': 'tracking',
        'line-height': 'leading',
        'text-align': 'text',
        'text-decoration-line': propertyName, // underline, line-through 등은 그대로
        'text-decoration-style': 'decoration',
        'text-decoration-thickness': 'decoration',
        'text-underline-offset': 'underline-offset',
        'text-indent': 'indent',
        'text-transform': propertyName, // uppercase, lowercase 등은 그대로
        'font-style': propertyName, // italic 등은 그대로
      };

      // Typography 클래스를 파싱해서 실제 CSS 속성 확인
      const fullClassName = value ? `${propertyName}-${value}` : propertyName;
      const parsed = TypographyParser.parseTypography(fullClassName);
      
      if (parsed && cssToTailwindMap[parsed.property]) {
        return { category: 'typography', property: cssToTailwindMap[parsed.property] };
      }
      
      return { category: 'typography', property: propertyName };
    }

    // 타이포그래피 관련 (text는 크기일 수도 색상일 수도 있으므로 값으로 판단)
    if (propertyName === 'text') {
      // 폰트 크기 값들
      const fontSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
      // 텍스트 정렬 값들
      const textAligns = ['left', 'center', 'right', 'justify', 'start', 'end'];
      
      if (fontSizes.includes(value) || textAligns.includes(value)) {
        return { category: 'typography', property: propertyName };
      } else {
        return { category: 'colors', property: propertyName };
      }
    }

    // 타이포그래피 속성명으로 체크 (TypographyParser가 파싱한 CSS 속성들)
    if (['font-size', 'font-weight', 'font-family', 'letter-spacing', 'line-height', 
         'text-decoration-style', 'text-decoration-thickness', 'text-underline-offset', 
         'text-indent'].includes(propertyName)) {
      return { category: 'typography', property: propertyName };
    }

    // 사이징 관련 (모든 width/height 관련 속성들)
    if (['w', 'h', 'min-w', 'min-h', 'max-w', 'max-h', 'size'].includes(propertyName)) {
      return { category: 'sizing', property: propertyName };
    }

    // 레이아웃 관련 (기존에 flexbox-grid로 이동된 것들 제외)
    if (['aspect', 'columns', 'break-after', 'break-before', 'break-inside', 'box-decoration', 'box-border', 'box-content', 'float', 'clear', 'isolate', 'isolation'].includes(propertyName)) {
      return { category: 'layout', property: propertyName };
    }

    // 효과 관련 (rounded, outline은 이제 borders 파서에서 처리)
    if (['shadow', 'text-shadow', 'opacity'].includes(propertyName)) {
      return { category: 'effects', property: propertyName };
    }

    // 애니메이션 관련 (transition, duration, delay, ease는 이제 transitions 파서에서 처리)
    if (['animate', 'repeat', 'direction', 'fill'].includes(propertyName)) {
      return { category: 'animation', property: propertyName };
    }

    // 위치 관련
    if (['static', 'fixed', 'absolute', 'relative', 'sticky', 'top', 'right', 'bottom', 'left', 'inset', 'z'].includes(propertyName)) {
      return { category: 'position', property: propertyName };
    }

    // 변형 관련
    if (['scale', 'scale-x', 'scale-y', 'rotate', 'translate-x', 'translate-y', 'skew-x', 'skew-y', 'origin'].includes(propertyName)) {
      return { category: 'transform', property: propertyName };
    }

    // 기본값은 레이아웃으로 처리
    return { category: 'layout', property: propertyName };
  }

  /**
   * 파싱된 클래스를 스타일에 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   */
  private applyParsedClassToStyles(parsedClass: ParsedClass, styles: ParsedStyles): void {
    const { breakpointModifier, breakpointModifiers, containerQueryModifier, stateModifier, stateModifiers, specialSelector } = parsedClass;

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
              specialSelectors: {}
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
              sizing: {}
            };
          }
          
          // 마지막 브레이크포인트가 아니면 계속 중첩
          if (i < breakpointModifiers.length - 1) {
            currentLevel = currentLevel.breakpoints[breakpointKey] as any;
          } else {
            // 마지막 브레이크포인트에서는 스타일 적용
            this.applyStyleByCategory(parsedClass, currentLevel.breakpoints[breakpointKey]);
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
            gap: {}
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
          specialSelectors: {}
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
            sizing: {}
          };
        }
        this.applyStyleByCategory(parsedClass, styles.breakpoints[breakpointKey].specialSelectors![selectorKey]);
      }
      // 다중 상태 모디파이어 처리 (중첩 상태)
      else if (stateModifiers && stateModifiers.length > 1) {
        const nestedKey = stateModifiers.join(':');
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
            sizing: {}
          };
        }
        this.applyStyleByCategory(parsedClass, styles.breakpoints[breakpointKey].nestedStates![nestedKey]);
      }
      // 단일 상태 모디파이어 처리
      else if (stateModifier || (stateModifiers && stateModifiers.length === 1)) {
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
            svg: {}
          };
        }
        
        this.applyStyleByCategory(parsedClass, styles.breakpoints[breakpointKey].states![stateKey]);
      } else {
        this.applyStyleByCategory(parsedClass, styles.breakpoints[breakpointKey]);
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
          specialSelectors: {}
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
            sizing: {}
          };
        }
        this.applyStyleByCategory(parsedClass, styles.containers[containerKey].specialSelectors![selectorKey]);
      }
      else if (stateModifiers && stateModifiers.length > 1) {
        const nestedKey = stateModifiers.join(':');
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
            sizing: {}
          };
        }
        this.applyStyleByCategory(parsedClass, styles.containers[containerKey].nestedStates![nestedKey]);
      }
      else if (stateModifier || (stateModifiers && stateModifiers.length === 1)) {
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
            svg: {}
          };
        }
        
        this.applyStyleByCategory(parsedClass, styles.containers[containerKey].states![stateKey]);
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
          sizing: {}
        };
      }
      
      this.applyStyleByCategory(parsedClass, styles.specialSelectors[selectorKey]);
    }
    // 다중 상태 모디파이어만 있는 경우 (중첩 상태)
    else if (stateModifiers && stateModifiers.length > 1) {
      const nestedKey = stateModifiers.join(':');
      
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
          svg: {}
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
          svg: {}
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
      return breakpoint.type === 'max-width' ? `max-[${breakpoint.value}]` : `min-[${breakpoint.value}]`;
    }

    // 값에서 원래 브레이크포인트 이름을 찾기
    const screens = this.preset.screens || {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };

    const screenKey = Object.keys(screens).find(key => screens[key] === breakpoint.value);
    
    if (screenKey) {
      return breakpoint.type === 'max-width' ? `max-${screenKey}` : screenKey;
    }
    
    // 임의 값인 경우
    return breakpoint.type === 'max-width' ? `max-[${breakpoint.value}]` : `min-[${breakpoint.value}]`;
  }

  /**
   * 컨테이너 키를 생성합니다.
   */
  private getContainerKey(container: ContainerQueryModifier): string {
    // 값에서 원래 컨테이너 이름을 찾기
    const screens = this.preset.screens || {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };

    const screenKey = Object.keys(screens).find(key => screens[key] === container.value);
    
    if (screenKey) {
      return container.type === 'max-width' ? `@max-${screenKey}` : `@${screenKey}`;
    }
    
    // 임의 값인 경우
    return container.type === 'max-width' ? `@max-[${container.value}]` : `@min-[${container.value}]`;
  }

  /**
   * 스타일 카테고리에 따라 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   */
  private applyStyleByCategory(parsedClass: ParsedClass, styles: Partial<ParsedStyles>): void {
    const { category } = parsedClass;
    
    switch (category) {
      case 'spacing':
        SpacingParser.applySpacingStyle(parsedClass, styles, this.preset);
        break;
      case 'colors':
        ColorParser.applyColorStyle(parsedClass, styles, this.preset);
        break;
      case 'typography':
        TypographyParser.applyTypographyStyle(parsedClass, styles, this.preset);
        break;
      case 'layout':
        LayoutParser.applyLayoutStyle(parsedClass, styles);
        break;
      case 'effects':
        EffectsParser.applyEffectStyle(parsedClass, styles, this.preset);
        break;
      case 'animation':
        AnimationParser.applyAnimationStyle(parsedClass, styles, this.preset);
        break;
      case 'position':
        PositionParser.applyPositionStyle(parsedClass, styles, this.preset);
        break;
      case 'transform':
        TransformParser.applyTransformStyle(parsedClass, styles, this.preset);
        break;
      case 'sizing':
        SizingParser.applySizingStyle(parsedClass, styles, this.preset);
        break;
      case 'flexbox-grid':
        FlexboxGridParser.applyFlexboxGridStyle(parsedClass, styles, this.preset);
        break;
      case 'filters':
        FiltersParser.applyFiltersStyle(parsedClass, styles, this.preset);
        break;
      case 'interactivity':
        InteractivityParser.applyInteractivityStyle(parsedClass, styles, this.preset);
        break;
      case 'tables':
        TablesParser.applyTablesStyle(parsedClass, styles, this.preset);
        break;
      case 'svg':
        SVGParser.applySVGStyle(parsedClass, styles, this.preset);
        break;
      case 'transitions':
        TransitionsParser.applyTransitionsStyle(parsedClass, styles, this.preset);
        break;
      case 'backgrounds':
        BackgroundsParser.applyBackgroundsStyle(parsedClass, styles, this.preset);
        break;
      case 'borders':
        BordersParser.applyBordersStyle(parsedClass, styles, this.preset);
        break;
      case 'overflow':
        OverflowParser.applyOverflowStyle(parsedClass, styles, this.preset);
        break;
      case 'accessibility':
        AccessibilityParser.applyAccessibilityStyle(parsedClass, styles, this.preset);
        break;
      case 'blend-modes':
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
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/').map(Number);
      return `${(numerator / denominator) * 100}%`;
    }
    
    // 프리셋 값 처리
    if (value in this.preset.spacing) {
      return `${this.preset.spacing[value]}px`;
    }
    
    // 특수 값 처리
    if (value === 'auto') return 'auto';
    if (value === 'full') return '100%';
    if (value === 'screen') return '100vw';
    if (value === 'min') return 'min-content';
    if (value === 'max') return 'max-content';
    if (value === 'fit') return 'fit-content';
    
    return value;
  }

  /**
   * 화면 크기를 가져옵니다.
   * @param size 화면 크기
   * @returns 화면 크기 값
   */
  private getScreenSize(size: string): string {
    const defaultScreens = {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };
    
    const screens = this.preset.screens || defaultScreens;
    return (screens as Record<string, string>)[size] || size;
  }

  /**
   * 브레이크포인트 이름을 가져옵니다.
   * @param breakpoint 브레이크포인트
   * @returns 브레이크포인트 이름
   */
  private getBreakpointName(breakpoint: BreakpointModifier | undefined): string {
    if (!breakpoint) return '';

    // 임의 브레이크포인트인 경우 원래 형태 유지
    if ((breakpoint as any).isArbitrary) {
      return breakpoint.type === 'max-width' ? `max-[${breakpoint.value}]` : `min-[${breakpoint.value}]`;
    }

    const screens = this.preset.screens || {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };

    // 알려진 화면 크기인지 확인
    const screenKey = Object.keys(screens).find(key => screens[key] === breakpoint.value);
    
    if (screenKey) {
      return breakpoint.type === 'max-width' ? `max-${screenKey}` : screenKey;
    }

    // 임의 값인 경우
    return breakpoint.type === 'max-width' ? `max-[${breakpoint.value}]` : `min-[${breakpoint.value}]`;
  }

  /**
   * 컨테이너 이름을 가져옵니다.
   * @param container 컨테이너
   * @returns 컨테이너 이름
   */
  private getContainerName(container: ContainerQueryModifier | undefined): string {
    if (!container) return '';

    // 명명된 컨테이너인 경우 (예: md/sidebar)
    if (container.value.includes('/')) {
      return `@${container.value}`;
    }

    const screens = this.preset.screens || {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };

    // 알려진 화면 크기인지 확인
    const screenKey = Object.keys(screens).find(key => (screens as Record<string, string>)[key] === container.value);
    
    if (screenKey) {
      return container.type === 'max-width' ? `@max-${screenKey}` : `@${screenKey}`;
    }

    // 임의 값인 경우
    return container.type === 'max-width' ? `@max-[${container.value}]` : `@min-[${container.value}]`;
  }
}
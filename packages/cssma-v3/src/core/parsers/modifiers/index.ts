/**
 * Unified modifier parser for CSSMA-V3
 * Following Tailwind CSS architecture: single modifier chain parsing
 * Example: "md:motion-safe:before:hover:bg-blue-500" → CSS selectors
 */

// Tailwind CSS modifier priority order (나중에 처리될수록 높은 우선순위)
const MODIFIER_PRIORITY = {
  // 1. Media queries (최상위)
  responsive: 1,
  container: 2, 
  motion: 3,
  
  // 2. Pseudo-classes
  state: 4,
  
  // 3. Pseudo-elements  
  pseudoElement: 5,
  
  // 4. Attributes (최하위)
  aria: 6,
  data: 7
} as const;

// Tailwind responsive breakpoints
const RESPONSIVE_BREAKPOINTS: Record<string, string> = {
  'sm': '@media (min-width: 640px)',
  'md': '@media (min-width: 768px)',  
  'lg': '@media (min-width: 1024px)',
  'xl': '@media (min-width: 1280px)',
  '2xl': '@media (min-width: 1536px)',
  'max-sm': '@media (max-width: 639px)',
  'max-md': '@media (max-width: 767px)',
  'max-lg': '@media (max-width: 1023px)',
  'max-xl': '@media (max-width: 1279px)',
  'max-2xl': '@media (max-width: 1535px)'
};

// Container query breakpoints
const CONTAINER_BREAKPOINTS: Record<string, string> = {
  '@3xs': '@container (min-width: 16rem)',
  '@2xs': '@container (min-width: 18rem)', 
  '@xs': '@container (min-width: 20rem)',
  '@sm': '@container (min-width: 24rem)',
  '@md': '@container (min-width: 28rem)',
  '@lg': '@container (min-width: 32rem)',
  '@xl': '@container (min-width: 36rem)',
  '@2xl': '@container (min-width: 42rem)'
};

// Motion preferences
const MOTION_PREFERENCES: Record<string, string> = {
  'motion-safe': '@media (prefers-reduced-motion: no-preference)',
  'motion-reduce': '@media (prefers-reduced-motion: reduce)'
};

// State pseudo-classes
const STATE_PSEUDO_CLASSES: Record<string, string> = {
  'hover': ':hover',
  'focus': ':focus', 
  'active': ':active',
  'visited': ':visited',
  'disabled': ':disabled',
  'checked': ':checked',
  'focus-visible': ':focus-visible',
  'focus-within': ':focus-within'
};

// Pseudo-elements
const PSEUDO_ELEMENTS: Record<string, string> = {
  'before': '::before',
  'after': '::after',
  'placeholder': '::placeholder',
  'selection': '::selection',
  'marker': '::marker',
  'file': '::file-selector-button',
  'backdrop': '::backdrop'
};

// ARIA attributes
const ARIA_ATTRIBUTES: Record<string, string> = {
  'aria-checked': '[aria-checked="true"]',
  'aria-disabled': '[aria-disabled="true"]', 
  'aria-expanded': '[aria-expanded="true"]',
  'aria-hidden': '[aria-hidden="true"]',
  'aria-selected': '[aria-selected="true"]'
};

// Data attributes  
const DATA_ATTRIBUTES: Record<string, string> = {
  'data-active': '[data-active]',
  'data-loading': '[data-loading]',
  'data-disabled': '[data-disabled]'
};

/**
 * Tailwind CSS 스타일 modifier 파싱 결과
 */
export interface ModifierParseResult {
  modifierChain: string;
  modifiers: {
    responsive?: string;
    container?: string; 
    motion?: string;
    state?: string[];
    pseudoElement?: string;
    aria?: string;
    data?: string;
    selector: {
      mediaQueries: string[];
      pseudoClasses: string[];
      pseudoElements: string[];
      attributes: string[];
    };
  };
}

/**
 * Unified Modifier Parser - Tailwind CSS 방식
 */
export class ModifierParser {
  /**
   * Tailwind modifier 체인 파싱
   * 예: "md:motion-safe:before:hover" → CSS 선택자 정보
   */
  static parseModifierChain(className: string): ModifierParseResult | null {
    const parts = className.split(':');
    if (parts.length === 1) {
      // modifier가 없는 경우
      return null;
    }

    const baseClass = parts.pop()!; // 마지막 부분이 실제 클래스
    const modifierChain = parts.join(':');
    
    const result: ModifierParseResult = {
      modifierChain,
      modifiers: {
        state: [],
        selector: {
          mediaQueries: [],
          pseudoClasses: [],
          pseudoElements: [],
          attributes: []
        }
      }
    };

    // Modifier 체인을 우선순위에 따라 파싱
    for (const modifier of parts) {
      this.parseIndividualModifier(modifier, result);
    }

    return result;
  }

  /**
   * 개별 modifier 파싱 및 분류
   */
  private static parseIndividualModifier(modifier: string, result: ModifierParseResult): void {
    // 1. Responsive breakpoints
    if (RESPONSIVE_BREAKPOINTS[modifier]) {
      result.modifiers.responsive = modifier;
      result.modifiers.selector.mediaQueries.push(RESPONSIVE_BREAKPOINTS[modifier]);
      return;
    }

    // 2. Container queries
    if (CONTAINER_BREAKPOINTS[modifier]) {
      result.modifiers.container = modifier;
      result.modifiers.selector.mediaQueries.push(CONTAINER_BREAKPOINTS[modifier]);
      return;
    }

    // 3. Motion preferences
    if (MOTION_PREFERENCES[modifier]) {
      result.modifiers.motion = modifier;
      result.modifiers.selector.mediaQueries.push(MOTION_PREFERENCES[modifier]);
      return;
    }

    // 4. State pseudo-classes
    if (STATE_PSEUDO_CLASSES[modifier]) {
      result.modifiers.state!.push(modifier);
      result.modifiers.selector.pseudoClasses.push(STATE_PSEUDO_CLASSES[modifier]);
      return;
    }

    // 5. Pseudo-elements
    if (PSEUDO_ELEMENTS[modifier]) {
      result.modifiers.pseudoElement = modifier;
      result.modifiers.selector.pseudoElements.push(PSEUDO_ELEMENTS[modifier]);
      return;
    }

    // 6. ARIA attributes
    if (ARIA_ATTRIBUTES[modifier]) {
      result.modifiers.aria = modifier;
      result.modifiers.selector.attributes.push(ARIA_ATTRIBUTES[modifier]);
      return;
    }

    // 7. Data attributes
    if (DATA_ATTRIBUTES[modifier]) {
      result.modifiers.data = modifier;
      result.modifiers.selector.attributes.push(DATA_ATTRIBUTES[modifier]);
      return;
    }

    // 8. Arbitrary modifiers
    this.parseArbitraryModifier(modifier, result);
  }

  /**
   * 임의값 modifier 파싱
   * 예: "aria-[checked]", "data-[size=large]" 등
   */
  private static parseArbitraryModifier(modifier: string, result: ModifierParseResult): void {
    // aria-[...] 패턴
    if (modifier.startsWith('aria-[') && modifier.endsWith(']')) {
      const value = modifier.slice(5, -1); // "aria-[label]" -> "[label"
      result.modifiers.aria = modifier;
      result.modifiers.selector.attributes.push(`[aria-${value.slice(1)}]`); // "[label" -> "label"
      return;
    }

    // data-[...] 패턴  
    if (modifier.startsWith('data-[') && modifier.endsWith(']')) {
      const value = modifier.slice(5, -1); // "data-[size=large]" -> "[size=large"
      result.modifiers.data = modifier;
      result.modifiers.selector.attributes.push(`[data-${value.slice(1)}]`); // "[size=large" -> "size=large"
      return;
    }

    // min-[...], max-[...] 반응형 임의값
    if (modifier.startsWith('min-[') && modifier.endsWith(']')) {
      const value = modifier.slice(4, -1); // "min-[768px]" -> "[768px"
      result.modifiers.responsive = modifier;
      result.modifiers.selector.mediaQueries.push(`@media (min-width: ${value.slice(1)})`); // "[768px" -> "768px"
      return;
    }

    if (modifier.startsWith('max-[') && modifier.endsWith(']')) {
      const value = modifier.slice(4, -1); // "max-[768px]" -> "[768px"
      result.modifiers.responsive = modifier;
      result.modifiers.selector.mediaQueries.push(`@media (max-width: ${value.slice(1)})`); // "[768px" -> "768px"
      return;
    }
  }

  /**
   * CSS 선택자 생성
   * Tailwind CSS 우선순위 순서: Media Queries → Pseudo-classes → Pseudo-elements → Attributes
   */
  static generateCSSSelector(parseResult: ModifierParseResult, baseSelector: string): string {
    const { selector } = parseResult.modifiers;
    
    // Base selector 구성
    let cssSelector = baseSelector;
    
    // Pseudo-classes 추가
    cssSelector += selector.pseudoClasses.join('');
    
    // Pseudo-elements 추가  
    cssSelector += selector.pseudoElements.join('');
    
    // Attributes 추가
    if (selector.attributes.length > 0) {
      cssSelector += selector.attributes.join('');
    }

    // Media queries로 감싸기 (선언 순서대로 중첩)
    if (selector.mediaQueries.length > 0) {
      for (const mediaQuery of selector.mediaQueries) { 
        cssSelector = `${mediaQuery} { ${cssSelector} }`;
      }
    }

    return cssSelector;
  }

  /**
   * 호환성을 위한 parseClassNameModifier (기존 API 유지)
   */
  static parseClassNameModifier(className: string): ModifierParseResult | null {
    return this.parseModifierChain(className);
  }
} 
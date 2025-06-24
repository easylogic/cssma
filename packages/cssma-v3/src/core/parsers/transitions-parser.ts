import { ParsedStyle, ParsedClass, ParsedStyles, ParserContext } from '../../types';

export class TransitionsParser {
  private static readonly TRANSITION_PROPERTIES: Record<string, string> = {
    'transition': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    'transition-none': 'none',
    'transition-all': 'all',
    'transition-colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
    'transition-opacity': 'opacity',
    'transition-shadow': 'box-shadow',
    'transition-transform': 'transform'
  };

  private static readonly DURATION_VALUES: Record<string, string> = {
    '0': '0s',
    '75': '75ms',
    '100': '100ms',
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
    '500': '500ms',
    '700': '700ms',
    '1000': '1000ms'
  };

  private static readonly TIMING_FUNCTIONS: Record<string, string> = {
    'ease-linear': 'linear',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
  };

  /**
   * 클래스명이 트랜지션 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns 트랜지션 관련 클래스 여부
   */
  static isValidClass(className: string): boolean {
    // transition properties
    if (this.TRANSITION_PROPERTIES[className]) return true;
    
    // duration classes
    if (className.startsWith('duration-')) return true;
    
    // delay classes
    if (className.startsWith('delay-')) return true;
    
    // timing function classes
    if (this.TIMING_FUNCTIONS[className]) return true;
    
    return false;
  }

  /**
   * 클래스명을 파싱하여 속성과 값을 추출합니다.
   * @param className 클래스명
   * @returns 파싱된 결과
   */
  static parseValue(className: string): { property: string; value: string; isArbitrary: boolean } | null {
    // transition properties
    if (this.TRANSITION_PROPERTIES[className]) {
      return {
        property: 'transitionProperty',
        value: this.TRANSITION_PROPERTIES[className],
        isArbitrary: false
      };
    }

    // duration classes
    if (className.startsWith('duration-')) {
      const value = className.slice('duration-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'transitionDuration',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // delay classes
    if (className.startsWith('delay-')) {
      const value = className.slice('delay-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'transitionDelay',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // timing function classes
    if (this.TIMING_FUNCTIONS[className]) {
      return {
        property: 'transitionTimingFunction',
        value: this.TIMING_FUNCTIONS[className],
        isArbitrary: false
      };
    }

    return null;
  }

  static parse(className: string): ParsedStyle | null {
    // Transition properties
    if (this.TRANSITION_PROPERTIES[className]) {
      return {
        property: 'transitionProperty',
        value: this.TRANSITION_PROPERTIES[className],
        variant: 'preset'
      };
    }

    // Duration classes
    if (className.startsWith('duration-')) {
      return this.parseDuration(className);
    }

    // Delay classes
    if (className.startsWith('delay-')) {
      return this.parseDelay(className);
    }

    // Timing function classes
    if (this.TIMING_FUNCTIONS[className]) {
      return {
        property: 'transitionTimingFunction',
        value: this.TIMING_FUNCTIONS[className],
        variant: 'preset'
      };
    }

    return null;
  }

  private static parseDuration(className: string): ParsedStyle | null {
    const value = className.replace('duration-', '');

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const duration = value.slice(1, -1);
      
      if (!duration || !/^[\d\.]+(?:ms|s)?$/.test(duration)) {
        return null;
      }
      
      return {
        property: 'transitionDuration',
        value: duration.includes('ms') || duration.includes('s') ? duration : `${duration}ms`,
        variant: 'arbitrary'
      };
    }

    // Handle preset values
    if (this.DURATION_VALUES[value]) {
      return {
        property: 'transitionDuration',
        value: this.DURATION_VALUES[value],
        variant: 'preset'
      };
    }

    return null;
  }

  private static parseDelay(className: string): ParsedStyle | null {
    const value = className.replace('delay-', '');

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const delay = value.slice(1, -1);
      
      if (!delay || !/^[\d\.]+(?:ms|s)?$/.test(delay)) {
        return null;
      }
      
      return {
        property: 'transitionDelay',
        value: delay.includes('ms') || delay.includes('s') ? delay : `${delay}ms`,
        variant: 'arbitrary'
      };
    }

    // Handle preset values
    if (this.DURATION_VALUES[value]) {
      return {
        property: 'transitionDelay',
        value: this.DURATION_VALUES[value],
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * Context Pattern을 사용한 새로운 스타일 적용 메서드
   */
  static applyTransitionsStyle(
    parsedClass: ParsedClass,
    styles: Partial<ParsedStyles>,
    context: ParserContext
  ): void {
    if (!styles.transitions) {
      styles.transitions = {};
    }

    const { property, value, isArbitrary } = parsedClass;
    
    // Context에서 preset 추출
    const preset = context.preset;

    // 속성별 처리
    switch (property) {
      // Transition property
      case 'transitionProperty':
        this.handleTransitionProperty(value, isArbitrary, styles.transitions);
        break;
        
      // Transition duration
      case 'transitionDuration':
        this.handleTransitionDuration(value, isArbitrary, styles.transitions);
        break;
        
      // Transition delay
      case 'transitionDelay':
        this.handleTransitionDelay(value, isArbitrary, styles.transitions);
        break;
        
      // Transition timing function
      case 'transitionTimingFunction':
        this.handleTransitionTimingFunction(value, isArbitrary, styles.transitions);
        break;
        
      default:
        // Generic property 처리
        styles.transitions[property] = isArbitrary ? value : this.convertTransitionValue(property, value);
        break;
    }
  }

  /**
   * Transition property 처리 헬퍼 메서드
   */
  private static handleTransitionProperty(value: string, isArbitrary: boolean, transitionStyles: any): void {
    if (isArbitrary) {
      transitionStyles.transitionProperty = value;
    } else {
      transitionStyles.transitionProperty = value;
    }
  }

  /**
   * Transition duration 처리 헬퍼 메서드
   */
  private static handleTransitionDuration(value: string, isArbitrary: boolean, transitionStyles: any): void {
    if (isArbitrary) {
      // 임의값은 이미 올바른 형태로 파싱됨
      transitionStyles.transitionDuration = value;
    } else {
      // 표준 duration 값 매핑
      const durationMap: Record<string, string> = {
        '0': '0s',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms'
      };
      
      transitionStyles.transitionDuration = durationMap[value] || `${value}ms`;
    }
  }

  /**
   * Transition delay 처리 헬퍼 메서드
   */
  private static handleTransitionDelay(value: string, isArbitrary: boolean, transitionStyles: any): void {
    if (isArbitrary) {
      // 임의값은 이미 올바른 형태로 파싱됨
      transitionStyles.transitionDelay = value;
    } else {
      // 표준 delay 값 매핑 (duration과 동일)
      const delayMap: Record<string, string> = {
        '0': '0s',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms'
      };
      
      transitionStyles.transitionDelay = delayMap[value] || `${value}ms`;
    }
  }

  /**
   * Transition timing function 처리 헬퍼 메서드
   */
  private static handleTransitionTimingFunction(value: string, isArbitrary: boolean, transitionStyles: any): void {
    if (isArbitrary) {
      transitionStyles.transitionTimingFunction = value;
    } else {
      transitionStyles.transitionTimingFunction = value;
    }
  }

  /**
   * Transition 값 변환 헬퍼 메서드
   */
  private static convertTransitionValue(property: string, value: string): string {
    // 특정 property에 따른 값 변환 로직
    return value;
  }
} 
import { ParsedStyle } from '../../types';

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

  static applyTransitionsStyle(parsedClass: { property: string; value: any; baseClassName: string }, styles: Record<string, any>, preset: any): void {
    const parsed = this.parse(parsedClass.baseClassName);
    if (!parsed) return;

    if (!styles.transitions) {
      styles.transitions = {};
    }

    styles.transitions[parsed.property] = parsed.value;
  }
} 
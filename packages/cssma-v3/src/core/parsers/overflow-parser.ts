import { ParsedStyle } from '../../types';

export class OverflowParser {
  private static readonly OVERFLOW_VALUES: Record<string, string> = {
    'overflow-auto': 'auto',
    'overflow-hidden': 'hidden',
    'overflow-visible': 'visible',
    'overflow-scroll': 'scroll',
    'overflow-clip': 'clip'
  };

  private static readonly OVERFLOW_X_VALUES: Record<string, string> = {
    'overflow-x-auto': 'auto',
    'overflow-x-hidden': 'hidden',
    'overflow-x-visible': 'visible',
    'overflow-x-scroll': 'scroll',
    'overflow-x-clip': 'clip'
  };

  private static readonly OVERFLOW_Y_VALUES: Record<string, string> = {
    'overflow-y-auto': 'auto',
    'overflow-y-hidden': 'hidden',
    'overflow-y-visible': 'visible',
    'overflow-y-scroll': 'scroll',
    'overflow-y-clip': 'clip'
  };

  private static readonly OVERSCROLL_VALUES: Record<string, string> = {
    'overscroll-auto': 'auto',
    'overscroll-contain': 'contain',
    'overscroll-none': 'none'
  };

  private static readonly OVERSCROLL_X_VALUES: Record<string, string> = {
    'overscroll-x-auto': 'auto',
    'overscroll-x-contain': 'contain',
    'overscroll-x-none': 'none'
  };

  private static readonly OVERSCROLL_Y_VALUES: Record<string, string> = {
    'overscroll-y-auto': 'auto',
    'overscroll-y-contain': 'contain',
    'overscroll-y-none': 'none'
  };

  private static readonly VISIBILITY_VALUES: Record<string, string> = {
    'visible': 'visible',
    'invisible': 'hidden',
    'collapse': 'collapse'
  };

  /**
   * 표준 인터페이스: 클래스가 overflow 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // 정확한 매치 우선 확인
    const exactMatches = [
      ...Object.keys(this.OVERFLOW_VALUES),
      ...Object.keys(this.OVERFLOW_X_VALUES),
      ...Object.keys(this.OVERFLOW_Y_VALUES),
      ...Object.keys(this.OVERSCROLL_VALUES),
      ...Object.keys(this.OVERSCROLL_X_VALUES),
      ...Object.keys(this.OVERSCROLL_Y_VALUES),
      ...Object.keys(this.VISIBILITY_VALUES),
      // 추가 텍스트 관련 유틸리티들
      'truncate', 'text-ellipsis', 'text-clip',
      'whitespace-normal', 'whitespace-nowrap', 'whitespace-pre', 'whitespace-pre-line', 'whitespace-pre-wrap', 'whitespace-break-spaces',
      'break-normal', 'break-words', 'break-all', 'break-keep'
    ];
    
    if (exactMatches.includes(className)) {
      return true;
    }

    // 패턴 매치
    const patterns = [
      /^overflow-/, // overflow-auto, overflow-hidden, overflow-visible, overflow-scroll, overflow-clip
      /^overflow-[xy]-/, // overflow-x-auto, overflow-y-hidden
      /^overscroll-/, // overscroll-auto, overscroll-contain, overscroll-none
      /^overscroll-[xy]-/, // overscroll-x-auto, overscroll-y-contain
    ];

    return patterns.some(pattern => pattern.test(className));
  }

  /**
   * 표준 인터페이스: overflow 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    if (!this.isValidClass(className)) {
      return null;
    }

    // Overflow-x (overflow-x-)
    const overflowXMatch = className.match(/^overflow-x-(.+)$/);
    if (overflowXMatch) {
      const value = overflowXMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'overflow-x',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Overflow-y (overflow-y-)
    const overflowYMatch = className.match(/^overflow-y-(.+)$/);
    if (overflowYMatch) {
      const value = overflowYMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'overflow-y',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Overflow (overflow-)
    const overflowMatch = className.match(/^overflow-(.+)$/);
    if (overflowMatch) {
      const value = overflowMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'overflow',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Overscroll-x (overscroll-x-)
    const overscrollXMatch = className.match(/^overscroll-x-(.+)$/);
    if (overscrollXMatch) {
      const value = overscrollXMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'overscroll-x',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Overscroll-y (overscroll-y-)
    const overscrollYMatch = className.match(/^overscroll-y-(.+)$/);
    if (overscrollYMatch) {
      const value = overscrollYMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'overscroll-y',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Overscroll (overscroll-)
    const overscrollMatch = className.match(/^overscroll-(.+)$/);
    if (overscrollMatch) {
      const value = overscrollMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'overscroll',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    return null;
  }

  static parse(className: string): ParsedStyle | null {
    // Overflow utilities
    if (this.OVERFLOW_VALUES[className]) {
      return {
        property: 'overflow',
        value: this.OVERFLOW_VALUES[className],
        variant: 'preset'
      };
    }

    // Overflow X utilities
    if (this.OVERFLOW_X_VALUES[className]) {
      return {
        property: 'overflowX',
        value: this.OVERFLOW_X_VALUES[className],
        variant: 'preset'
      };
    }

    // Overflow Y utilities
    if (this.OVERFLOW_Y_VALUES[className]) {
      return {
        property: 'overflowY',
        value: this.OVERFLOW_Y_VALUES[className],
        variant: 'preset'
      };
    }

    // Overscroll utilities
    if (this.OVERSCROLL_VALUES[className]) {
      return {
        property: 'overscrollBehavior',
        value: this.OVERSCROLL_VALUES[className],
        variant: 'preset'
      };
    }

    // Overscroll X utilities
    if (this.OVERSCROLL_X_VALUES[className]) {
      return {
        property: 'overscrollBehaviorX',
        value: this.OVERSCROLL_X_VALUES[className],
        variant: 'preset'
      };
    }

    // Overscroll Y utilities
    if (this.OVERSCROLL_Y_VALUES[className]) {
      return {
        property: 'overscrollBehaviorY',
        value: this.OVERSCROLL_Y_VALUES[className],
        variant: 'preset'
      };
    }

    // Visibility utilities
    if (this.VISIBILITY_VALUES[className]) {
      return {
        property: 'visibility',
        value: this.VISIBILITY_VALUES[className],
        variant: 'preset'
      };
    }

    // 임의값 및 사용자 정의값 처리 (parseValue 사용)
    const parsed = this.parseValue(className);
    if (parsed) {
      const propertyMap: Record<string, string> = {
        'overflow': 'overflow',
        'overflow-x': 'overflowX',
        'overflow-y': 'overflowY',
        'overscroll': 'overscrollBehavior',
        'overscroll-x': 'overscrollBehaviorX',
        'overscroll-y': 'overscrollBehaviorY'
      };

      const mappedProperty = propertyMap[parsed.property] || parsed.property;
      
      return {
        property: mappedProperty,
        value: parsed.value,
        variant: parsed.isArbitrary ? 'arbitrary' : 'custom'
      };
    }

    // Text overflow utilities
    if (this.isTextOverflowUtility(className)) {
      return this.parseTextOverflowUtility(className);
    }

    // Whitespace utilities
    if (this.isWhitespaceUtility(className)) {
      return this.parseWhitespaceUtility(className);
    }

    // Word break utilities
    if (this.isWordBreakUtility(className)) {
      return this.parseWordBreakUtility(className);
    }

    return null;
  }

  private static isTextOverflowUtility(className: string): boolean {
    return ['truncate', 'text-ellipsis', 'text-clip'].includes(className);
  }

  private static parseTextOverflowUtility(className: string): ParsedStyle | null {
    switch (className) {
      case 'truncate':
        return {
          property: 'overflow',
          value: 'hidden',
          variant: 'preset',
          additionalProperties: [
            { property: 'textOverflow', value: 'ellipsis' },
            { property: 'whiteSpace', value: 'nowrap' }
          ]
        };
      case 'text-ellipsis':
        return {
          property: 'textOverflow',
          value: 'ellipsis',
          variant: 'preset'
        };
      case 'text-clip':
        return {
          property: 'textOverflow',
          value: 'clip',
          variant: 'preset'
        };
      default:
        return null;
    }
  }

  private static isWhitespaceUtility(className: string): boolean {
    return [
      'whitespace-normal',
      'whitespace-nowrap',
      'whitespace-pre',
      'whitespace-pre-line',
      'whitespace-pre-wrap',
      'whitespace-break-spaces'
    ].includes(className);
  }

  private static parseWhitespaceUtility(className: string): ParsedStyle | null {
    const whitespaceMap: Record<string, string> = {
      'whitespace-normal': 'normal',
      'whitespace-nowrap': 'nowrap',
      'whitespace-pre': 'pre',
      'whitespace-pre-line': 'pre-line',
      'whitespace-pre-wrap': 'pre-wrap',
      'whitespace-break-spaces': 'break-spaces'
    };

    return {
      property: 'whiteSpace',
      value: whitespaceMap[className],
      variant: 'preset'
    };
  }

  private static isWordBreakUtility(className: string): boolean {
    return [
      'break-normal',
      'break-words',
      'break-all',
      'break-keep',
      'hyphens-none',
      'hyphens-manual',
      'hyphens-auto'
    ].includes(className);
  }

  private static parseWordBreakUtility(className: string): ParsedStyle | null {
    if (className.startsWith('break-')) {
      const breakMap: Record<string, { property: string; value: string }> = {
        'break-normal': { property: 'overflowWrap', value: 'normal' },
        'break-words': { property: 'overflowWrap', value: 'break-word' },
        'break-all': { property: 'wordBreak', value: 'break-all' },
        'break-keep': { property: 'wordBreak', value: 'keep-all' }
      };

      const mapping = breakMap[className];
      if (mapping) {
        return {
          property: mapping.property,
          value: mapping.value,
          variant: 'preset'
        };
      }
    }

    if (className.startsWith('hyphens-')) {
      const hyphensMap: Record<string, string> = {
        'hyphens-none': 'none',
        'hyphens-manual': 'manual',
        'hyphens-auto': 'auto'
      };

      const value = hyphensMap[className];
      if (value) {
        return {
          property: 'hyphens',
          value,
          variant: 'preset'
        };
      }
    }

    return null;
  }

  static applyOverflowStyle(parsedClass: { property: string; value: any; baseClassName: string }, styles: Record<string, any>, preset: any): void {
    const parsed = this.parse(parsedClass.baseClassName);
    if (!parsed) return;

    if (!styles.overflow) {
      styles.overflow = {};
    }

    // Apply main property
    styles.overflow[parsed.property] = parsed.value;

    // Apply additional properties if they exist
    if ('additionalProperties' in parsed && parsed.additionalProperties) {
      for (const additional of parsed.additionalProperties) {
        styles.overflow[additional.property] = additional.value;
      }
    }
  }
} 
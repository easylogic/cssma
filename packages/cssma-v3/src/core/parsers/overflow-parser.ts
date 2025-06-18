import { ParsedStyle } from '../../types';

export class OverflowParser {
  private static readonly OVERFLOW_VALUES: Record<string, string> = {
    'overflow-auto': 'auto',
    'overflow-hidden': 'hidden',
    'overflow-clip': 'clip',
    'overflow-visible': 'visible',
    'overflow-scroll': 'scroll'
  };

  private static readonly OVERFLOW_X_VALUES: Record<string, string> = {
    'overflow-x-auto': 'auto',
    'overflow-x-hidden': 'hidden',
    'overflow-x-clip': 'clip',
    'overflow-x-visible': 'visible',
    'overflow-x-scroll': 'scroll'
  };

  private static readonly OVERFLOW_Y_VALUES: Record<string, string> = {
    'overflow-y-auto': 'auto',
    'overflow-y-hidden': 'hidden',
    'overflow-y-clip': 'clip',
    'overflow-y-visible': 'visible',
    'overflow-y-scroll': 'scroll'
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

  private static readonly OBJECT_FIT_VALUES: Record<string, string> = {
    'object-contain': 'contain',
    'object-cover': 'cover',
    'object-fill': 'fill',
    'object-none': 'none',
    'object-scale-down': 'scale-down'
  };

  private static readonly OBJECT_POSITION_VALUES: Record<string, string> = {
    'object-bottom': 'bottom',
    'object-center': 'center',
    'object-left': 'left',
    'object-left-bottom': 'left bottom',
    'object-left-top': 'left top',
    'object-right': 'right',
    'object-right-bottom': 'right bottom',
    'object-right-top': 'right top',
    'object-top': 'top'
  };

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

    // Object fit utilities
    if (this.OBJECT_FIT_VALUES[className]) {
      return {
        property: 'objectFit',
        value: this.OBJECT_FIT_VALUES[className],
        variant: 'preset'
      };
    }

    // Object position utilities
    if (this.OBJECT_POSITION_VALUES[className]) {
      return {
        property: 'objectPosition',
        value: this.OBJECT_POSITION_VALUES[className],
        variant: 'preset'
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

    // Handle multi-property cases
    if (parsed.property.includes(',')) {
      const properties = parsed.property.split(', ');
      const values = Array.isArray(parsed.value) ? parsed.value : [parsed.value];
      
      properties.forEach((prop, index) => {
        styles.overflow[prop.trim()] = values[index] || values[0];
      });
    } else {
      styles.overflow[parsed.property] = parsed.value;
    }
  }
} 
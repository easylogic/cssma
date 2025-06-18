import { ParsedStyle } from '../../types';

export class AccessibilityParser {
  private static readonly SCREEN_READER_VALUES: Record<string, string> = {
    'sr-only': 'sr-only',
    'not-sr-only': 'not-sr-only'
  };

  private static readonly FORCED_COLOR_ADJUST_VALUES: Record<string, string> = {
    'forced-color-adjust-auto': 'auto',
    'forced-color-adjust-none': 'none'
  };

  static parse(className: string): ParsedStyle | null {
    // Screen reader utilities
    if (className in this.SCREEN_READER_VALUES) {
      return {
        property: 'srOnly',
        value: className,
        variant: 'preset'
      };
    }

    // Forced color adjust utilities
    if (this.FORCED_COLOR_ADJUST_VALUES[className]) {
      return {
        property: 'forcedColorAdjust',
        value: this.FORCED_COLOR_ADJUST_VALUES[className],
        variant: 'preset'
      };
    }

    // Focus utilities
    if (this.isFocusUtility(className)) {
      return this.parseFocusUtility(className);
    }

    // Focus-visible utilities
    if (this.isFocusVisibleUtility(className)) {
      return this.parseFocusVisibleUtility(className);
    }

    // Focus-within utilities
    if (this.isFocusWithinUtility(className)) {
      return this.parseFocusWithinUtility(className);
    }

    return null;
  }

  private static isFocusUtility(className: string): boolean {
    return (
      className === 'focus:outline-none' ||
      className.startsWith('focus:outline-') ||
      className.startsWith('focus:ring-') ||
      className === 'focus-visible:outline-none' ||
      className.startsWith('focus-visible:outline-') ||
      className.startsWith('focus-visible:ring-')
    );
  }

  private static parseFocusUtility(className: string): ParsedStyle | null {
    // Handle focus outline utilities
    if (className === 'focus:outline-none') {
      return {
        property: 'focusOutline',
        value: 'none',
        variant: 'preset'
      };
    }

    if (className.startsWith('focus:outline-')) {
      const outlineValue = className.replace('focus:outline-', '');
      
      // Handle outline style
      if (['solid', 'dashed', 'dotted', 'double'].includes(outlineValue)) {
        return {
          property: 'focusOutlineStyle',
          value: outlineValue,
          variant: 'preset'
        };
      }

      // Handle outline width
      if (outlineValue.match(/^\d+$/)) {
        return {
          property: 'focusOutlineWidth',
          value: `${outlineValue}px`,
          variant: 'preset'
        };
      }

      // Handle outline color
      return {
        property: 'focusOutlineColor',
        value: this.parseColorValue(outlineValue),
        variant: this.isArbitraryValue(outlineValue) ? 'arbitrary' : 'preset'
      };
    }

    // Handle focus ring utilities
    if (className.startsWith('focus:ring-')) {
      const ringValue = className.replace('focus:ring-', '');
      
      // Handle ring width
      if (ringValue.match(/^\d+$/)) {
        return {
          property: 'focusRingWidth',
          value: `${ringValue}px`,
          variant: 'preset'
        };
      }

      // Handle ring color
      return {
        property: 'focusRingColor',
        value: this.parseColorValue(ringValue),
        variant: this.isArbitraryValue(ringValue) ? 'arbitrary' : 'preset'
      };
    }

    return null;
  }

  private static isFocusVisibleUtility(className: string): boolean {
    return className.startsWith('focus-visible:');
  }

  private static parseFocusVisibleUtility(className: string): ParsedStyle | null {
    const baseClass = className.replace('focus-visible:', '');
    
    if (baseClass === 'outline-none') {
      return {
        property: 'focusVisibleOutline',
        value: 'none',
        variant: 'preset'
      };
    }

    if (baseClass.startsWith('outline-')) {
      const outlineValue = baseClass.replace('outline-', '');
      return {
        property: 'focusVisibleOutlineColor',
        value: this.parseColorValue(outlineValue),
        variant: this.isArbitraryValue(outlineValue) ? 'arbitrary' : 'preset'
      };
    }

    if (baseClass.startsWith('ring-')) {
      const ringValue = baseClass.replace('ring-', '');
      
      if (ringValue.match(/^\d+$/)) {
        return {
          property: 'focusVisibleRingWidth',
          value: `${ringValue}px`,
          variant: 'preset'
        };
      }

      return {
        property: 'focusVisibleRingColor',
        value: this.parseColorValue(ringValue),
        variant: this.isArbitraryValue(ringValue) ? 'arbitrary' : 'preset'
      };
    }

    return null;
  }

  private static isFocusWithinUtility(className: string): boolean {
    return className.startsWith('focus-within:');
  }

  private static parseFocusWithinUtility(className: string): ParsedStyle | null {
    const baseClass = className.replace('focus-within:', '');
    
    if (baseClass.startsWith('ring-')) {
      const ringValue = baseClass.replace('ring-', '');
      
      if (ringValue.match(/^\d+$/)) {
        return {
          property: 'focusWithinRingWidth',
          value: `${ringValue}px`,
          variant: 'preset'
        };
      }

      return {
        property: 'focusWithinRingColor',
        value: this.parseColorValue(ringValue),
        variant: this.isArbitraryValue(ringValue) ? 'arbitrary' : 'preset'
      };
    }

    if (baseClass.startsWith('outline-')) {
      const outlineValue = baseClass.replace('outline-', '');
      return {
        property: 'focusWithinOutlineColor',
        value: this.parseColorValue(outlineValue),
        variant: this.isArbitraryValue(outlineValue) ? 'arbitrary' : 'preset'
      };
    }

    return null;
  }

  private static parseColorValue(colorValue: string): string {
    // Handle transparent and current
    if (colorValue === 'transparent') return 'transparent';
    if (colorValue === 'current') return 'currentColor';

    // Handle arbitrary values
    if (colorValue.startsWith('[') && colorValue.endsWith(']')) {
      return colorValue.slice(1, -1);
    }

    // Handle color palette
    if (this.isValidColor(colorValue)) {
      return this.getColorValue(colorValue);
    }

    return colorValue;
  }

  private static isValidColor(colorName: string): boolean {
    const colorPattern = /^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}$/;
    const basicColors = ['black', 'white'];
    return colorPattern.test(colorName) || basicColors.includes(colorName);
  }

  private static getColorValue(colorName: string): string {
    if (colorName === 'black') return '#000000';
    if (colorName === 'white') return '#ffffff';
    return `var(--color-${colorName.replace('-', '-')})`;
  }

  private static isArbitraryValue(value: string): boolean {
    return value.startsWith('[') && value.endsWith(']');
  }

  static applyAccessibilityStyle(parsedClass: { property: string; value: any; baseClassName: string }, styles: Record<string, any>, preset: any): void {
    const parsed = this.parse(parsedClass.baseClassName);
    if (!parsed) return;

    if (!styles.accessibility) {
      styles.accessibility = {};
    }

    // Handle multi-property cases (like sr-only with multiple properties)
    if (parsed.property.includes(',')) {
      const properties = parsed.property.split(', ');
      const values = Array.isArray(parsed.value) ? parsed.value : [parsed.value];
      
      properties.forEach((prop, index) => {
        styles.accessibility[prop.trim()] = values[index] || values[0];
      });
    } else if (typeof parsed.value === 'object' && !Array.isArray(parsed.value)) {
      // Handle cases where parsed.value is an object (like sr-only)
      Object.entries(parsed.value).forEach(([prop, val]) => {
        styles.accessibility[prop] = val;
      });
    } else {
      styles.accessibility[parsed.property] = parsed.value;
    }
  }
} 
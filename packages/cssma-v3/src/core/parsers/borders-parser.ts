import { ParsedStyle } from '../../types';

export class BordersParser {
  private static readonly BORDER_WIDTH_VALUES: Record<string, string> = {
    'border-0': '0px',
    'border-2': '2px',
    'border-4': '4px',
    'border-8': '8px',
    'border': '1px'
  };

  private static readonly BORDER_STYLE_VALUES: Record<string, string> = {
    'border-solid': 'solid',
    'border-dashed': 'dashed',
    'border-dotted': 'dotted',
    'border-double': 'double',
    'border-hidden': 'hidden',
    'border-none': 'none'
  };

  private static readonly BORDER_RADIUS_VALUES: Record<string, string> = {
    'rounded-none': '0px',
    'rounded-sm': '2px',
    'rounded': '4px',
    'rounded-md': '6px',
    'rounded-lg': '8px',
    'rounded-xl': '12px',
    'rounded-2xl': '16px',
    'rounded-3xl': '24px',
    'rounded-full': '9999px'
  };

  private static readonly DIVIDE_WIDTH_VALUES: Record<string, string> = {
    'divide-x-0': '0px',
    'divide-x-2': '2px',
    'divide-x-4': '4px',
    'divide-x-8': '8px',
    'divide-x': '1px',
    'divide-y-0': '0px',
    'divide-y-2': '2px',
    'divide-y-4': '4px',
    'divide-y-8': '8px',
    'divide-y': '1px'
  };

  private static readonly DIVIDE_STYLE_VALUES: Record<string, string> = {
    'divide-solid': 'solid',
    'divide-dashed': 'dashed',
    'divide-dotted': 'dotted',
    'divide-double': 'double',
    'divide-none': 'none'
  };

  private static readonly RING_WIDTH_VALUES: Record<string, string> = {
    'ring-0': '0px',
    'ring-1': '1px',
    'ring-2': '2px',
    'ring-4': '4px',
    'ring-8': '8px',
    'ring': '3px'
  };

  private static readonly RING_OFFSET_VALUES: Record<string, string> = {
    'ring-offset-0': '0px',
    'ring-offset-1': '1px',
    'ring-offset-2': '2px',
    'ring-offset-4': '4px',
    'ring-offset-8': '8px'
  };

  static parse(className: string): ParsedStyle | null {
    // Border width (including directional)
    if (this.isBorderWidth(className)) {
      return this.parseBorderWidth(className);
    }

    // Border style
    if (this.BORDER_STYLE_VALUES[className]) {
      return {
        property: 'borderStyle',
        value: this.BORDER_STYLE_VALUES[className],
        variant: 'preset'
      };
    }

    // Border color (including directional)
    if (this.isBorderColor(className)) {
      return this.parseBorderColor(className);
    }

    // Border radius (including directional)
    if (this.isBorderRadius(className)) {
      return this.parseBorderRadius(className);
    }

    // Divide utilities
    if (this.isDivideUtility(className)) {
      return this.parseDivideUtility(className);
    }

    // Ring utilities
    if (this.isRingUtility(className)) {
      return this.parseRingUtility(className);
    }

    // Outline utilities
    if (this.isOutlineUtility(className)) {
      return this.parseOutlineUtility(className);
    }

    return null;
  }

  private static isBorderWidth(className: string): boolean {
    return !!(
      this.BORDER_WIDTH_VALUES[className] ||
      className.match(/^border-[trblxy](-\d+)?$/) ||
      className.match(/^border-\[\d+px\]$/)
    );
  }

  private static parseBorderWidth(className: string): ParsedStyle | null {
    // Handle preset values
    if (this.BORDER_WIDTH_VALUES[className]) {
      return {
        property: 'borderWidth',
        value: this.BORDER_WIDTH_VALUES[className],
        variant: 'preset'
      };
    }

    // Handle directional borders
    const directionalMatch = className.match(/^border-([trblxy])(-(\d+))?$/);
    if (directionalMatch) {
      const [, direction, , width] = directionalMatch;
      const value = width ? `${width}px` : '1px';
      
      const propertyMap: Record<string, string> = {
        't': 'borderTopWidth',
        'r': 'borderRightWidth',
        'b': 'borderBottomWidth',
        'l': 'borderLeftWidth',
        'x': 'borderInlineWidth',
        'y': 'borderBlockWidth'
      };

      return {
        property: propertyMap[direction],
        value,
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    const arbitraryMatch = className.match(/^border-\[(\d+)px\]$/);
    if (arbitraryMatch) {
      return {
        property: 'borderWidth',
        value: `${arbitraryMatch[1]}px`,
        variant: 'arbitrary'
      };
    }

    return null;
  }

  private static isBorderColor(className: string): boolean {
    return (
      className.startsWith('border-') &&
      !className.match(/^border-\d/) &&
      !this.BORDER_STYLE_VALUES[className] &&
      !this.BORDER_WIDTH_VALUES[className]
    );
  }

  private static parseBorderColor(className: string): ParsedStyle | null {
    const value = className.replace(/^border-/, '');

    // Handle directional border colors
    if (value.match(/^[trbl]-/)) {
      const [direction, ...colorParts] = value.split('-');
      const color = colorParts.join('-');
      
      const propertyMap: Record<string, string> = {
        't': 'borderTopColor',
        'r': 'borderRightColor',
        'b': 'borderBottomColor',
        'l': 'borderLeftColor'
      };

      return {
        property: propertyMap[direction],
        value: this.parseColorValue(color),
        variant: this.isArbitraryValue(color) ? 'arbitrary' : 'preset'
      };
    }

    // Handle standard border color
    return {
      property: 'borderColor',
      value: this.parseColorValue(value),
      variant: this.isArbitraryValue(value) ? 'arbitrary' : 'preset'
    };
  }

  private static isBorderRadius(className: string): boolean {
    return !!(
      this.BORDER_RADIUS_VALUES[className] ||
      className.match(/^rounded-[trbl]{1,2}(-\w+)?$/) ||
      className.match(/^rounded-\[\d+px\]$/)
    );
  }

  private static parseBorderRadius(className: string): ParsedStyle | null {
    // Handle preset values
    if (this.BORDER_RADIUS_VALUES[className]) {
      return {
        property: 'borderRadius',
        value: this.BORDER_RADIUS_VALUES[className],
        variant: 'preset'
      };
    }

    // Handle directional border radius
    const directionalMatch = className.match(/^rounded-([trbl]{1,2})(-(\w+))?$/);
    if (directionalMatch) {
      const [, direction, , size] = directionalMatch;
      const value = size ? this.BORDER_RADIUS_VALUES[`rounded-${size}`] || '4px' : '4px';
      
      const propertyMap: Record<string, string> = {
        't': 'borderTopLeftRadius, borderTopRightRadius',
        'r': 'borderTopRightRadius, borderBottomRightRadius',
        'b': 'borderBottomLeftRadius, borderBottomRightRadius',
        'l': 'borderTopLeftRadius, borderBottomLeftRadius',
        'tl': 'borderTopLeftRadius',
        'tr': 'borderTopRightRadius',
        'br': 'borderBottomRightRadius',
        'bl': 'borderBottomLeftRadius'
      };

      return {
        property: propertyMap[direction] || 'borderRadius',
        value,
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    const arbitraryMatch = className.match(/^rounded-\[(\d+)px\]$/);
    if (arbitraryMatch) {
      return {
        property: 'borderRadius',
        value: `${arbitraryMatch[1]}px`,
        variant: 'arbitrary'
      };
    }

    return null;
  }

  private static isDivideUtility(className: string): boolean {
    return !!(
      this.DIVIDE_WIDTH_VALUES[className] ||
      this.DIVIDE_STYLE_VALUES[className] ||
      className.startsWith('divide-') ||
      className === 'divide-reverse'
    );
  }

  private static parseDivideUtility(className: string): ParsedStyle | null {
    // Handle divide width
    if (this.DIVIDE_WIDTH_VALUES[className]) {
      const isX = className.includes('-x');
      return {
        property: isX ? 'divideXWidth' : 'divideYWidth',
        value: this.DIVIDE_WIDTH_VALUES[className],
        variant: 'preset'
      };
    }

    // Handle divide style
    if (this.DIVIDE_STYLE_VALUES[className]) {
      return {
        property: 'divideStyle',
        value: this.DIVIDE_STYLE_VALUES[className],
        variant: 'preset'
      };
    }

    // Handle divide color
    if (className.startsWith('divide-') && !className.includes('-x') && !className.includes('-y')) {
      const color = className.replace('divide-', '');
      return {
        property: 'divideColor',
        value: this.parseColorValue(color),
        variant: this.isArbitraryValue(color) ? 'arbitrary' : 'preset'
      };
    }

    // Handle divide reverse
    if (className === 'divide-reverse') {
      return {
        property: 'divideReverse',
        value: 'reverse',
        variant: 'preset'
      };
    }

    return null;
  }

  private static isRingUtility(className: string): boolean {
    return !!(
      this.RING_WIDTH_VALUES[className] ||
      this.RING_OFFSET_VALUES[className] ||
      className.startsWith('ring-') ||
      className === 'ring-inset'
    );
  }

  private static parseRingUtility(className: string): ParsedStyle | null {
    // Handle ring width
    if (this.RING_WIDTH_VALUES[className]) {
      return {
        property: 'ringWidth',
        value: this.RING_WIDTH_VALUES[className],
        variant: 'preset'
      };
    }

    // Handle ring offset width
    if (this.RING_OFFSET_VALUES[className]) {
      return {
        property: 'ringOffsetWidth',
        value: this.RING_OFFSET_VALUES[className],
        variant: 'preset'
      };
    }

    // Handle ring color
    if (className.startsWith('ring-') && !className.includes('offset') && !className.includes('inset')) {
      const color = className.replace('ring-', '');
      if (color !== 'inset') {
        return {
          property: 'ringColor',
          value: this.parseColorValue(color),
          variant: this.isArbitraryValue(color) ? 'arbitrary' : 'preset'
        };
      }
    }

    // Handle ring offset color
    if (className.startsWith('ring-offset-')) {
      const color = className.replace('ring-offset-', '');
      return {
        property: 'ringOffsetColor',
        value: this.parseColorValue(color),
        variant: this.isArbitraryValue(color) ? 'arbitrary' : 'preset'
      };
    }

    // Handle ring inset
    if (className === 'ring-inset') {
      return {
        property: 'ringInset',
        value: 'inset',
        variant: 'preset'
      };
    }

    return null;
  }

  private static isOutlineUtility(className: string): boolean {
    return className.startsWith('outline-');
  }

  private static parseOutlineUtility(className: string): ParsedStyle | null {
    const value = className.replace('outline-', '');

    // Handle outline width
    if (value.match(/^\d+$/)) {
      return {
        property: 'outlineWidth',
        value: `${value}px`,
        variant: 'preset'
      };
    }

    // Handle outline style
    const outlineStyles = ['none', 'solid', 'dashed', 'dotted', 'double'];
    if (outlineStyles.includes(value)) {
      return {
        property: 'outlineStyle',
        value,
        variant: 'preset'
      };
    }

    // Handle outline color
    return {
      property: 'outlineColor',
      value: this.parseColorValue(value),
      variant: this.isArbitraryValue(value) ? 'arbitrary' : 'preset'
    };
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

  static applyBordersStyle(parsedClass: { property: string; value: any; baseClassName: string }, styles: Record<string, any>, preset: any): void {
    const parsed = this.parse(parsedClass.baseClassName);
    if (!parsed) return;

    if (!styles.borders) {
      styles.borders = {};
    }

    styles.borders[parsed.property] = parsed.value;
  }
} 
import { ParsedStyle, ParsedClass, ParsedStyles, ParserContext } from '../../types';

const BORDER_CLASSES = {
  'border-solid': 'solid',
  'border-dashed': 'dashed',
  'border-dotted': 'dotted',
  'border-double': 'double',
  'border-hidden': 'hidden',
  'border-none': 'none',
  'rounded-none': '0px',
  'rounded-sm': '2px',
  'rounded': '4px',
  'rounded-md': '6px',
  'rounded-lg': '8px',
  'rounded-xl': '12px',
  'rounded-2xl': '16px',
  'rounded-3xl': '24px',
  'rounded-full': '9999px',
  'ring-inset': 'inset',
  'ring-0': '0px',
  'ring-1': '1px',
  'ring-2': '2px',
  'ring-4': '4px',
  'ring-8': '8px',
  'ring': '3px',
  'ring-offset-0': '0px',
};
const PREFIX_CLASSES = [
  'border-spacing-',
  'caption-',
  'border-', 
  'rounded-', 
  'divide-', 
  'ring-', 
  'outline-',
  'ring-offset-',
  'ring-inset',
  'ring-offset-',
  'ring-inset'
];

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

  /**
   * 표준 인터페이스: 클래스가 border 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // Border patterns (색상 포함)
    const patterns = [
      /^border(-[tlbr])?(-[xy])?(-\d+)?$/, // border, border-t, border-x, border-2, border-t-4
      /^border(-[tlbr])?(-[xy])?-\[/, // border-[1px], border-t-[2px]
      /^border(-[tlbr])?(-[xy])?-\w+/, // border-red-500, border-t-blue-300
      /^rounded(-[tlbr])?(-[xy])?/, // rounded, rounded-t, rounded-tl, rounded-[10px]
      /^divide-[xy]/, // divide-x, divide-y
      /^divide-\w+/, // divide-red-500, divide-solid
      /^ring/, // ring, ring-2, ring-red-500, ring-offset-2
      /^outline/, // outline, outline-2, outline-red-500, outline-offset-2
    ];

    return patterns.some(pattern => pattern.test(className));
  }

  /**
   * 표준 인터페이스: border 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    if (!this.isValidClass(className)) {
      return null;
    }

    // Border width patterns (border, border-2, border-t-4, border-x-[1px])
    const borderWidthMatch = className.match(/^border(-[tlbr])?(-[xy])?(-(.+))?$/);
    if (borderWidthMatch) {
      const direction = (borderWidthMatch[1] || '') + (borderWidthMatch[2] || '');
      const valueStr = borderWidthMatch[4] || '';
      
      // Arbitrary value [...]
      if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
        const value = valueStr.slice(1, -1);
        return {
          property: `border${direction}`,
          value,
          isArbitrary: true
        };
      }
      
      // Color values (border-red-500, border-t-blue-300)
      if (valueStr && isNaN(Number(valueStr))) {
        return {
          property: `border${direction}`,
          value: valueStr,
          isArbitrary: false
        };
      }
      
      // Width values (border-2, border-t-4) or default
      return {
        property: `border${direction}`,
        value: valueStr || '1', // Default border width
        isArbitrary: false
      };
    }

    // Rounded patterns (rounded, rounded-t, rounded-tl, rounded-[10px])
    const roundedMatch = className.match(/^rounded(-[tlbr]{1,2})?(-(.+))?$/);
    if (roundedMatch) {
      const direction = roundedMatch[1] || '';
      const valueStr = roundedMatch[3] || '';
      
      // Arbitrary value [...]
      if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
        const value = valueStr.slice(1, -1);
        return {
          property: `rounded${direction}`,
          value,
          isArbitrary: true
        };
      }
      
      return {
        property: `rounded${direction}`,
        value: valueStr || 'default',
        isArbitrary: false
      };
    }

    // Divide patterns (divide-x-2, divide-y-4, divide-red-500)
    if (className.startsWith('divide-')) {
      const parts = className.split('-');
      if (parts.length >= 2) {
        const direction = parts[1]; // x, y, or color
        const value = parts.slice(2).join('-') || '';
        
        return {
          property: `divide-${direction}`,
          value: value || 'default',
          isArbitrary: false
        };
      }
    }

    // Ring patterns (ring, ring-2, ring-red-500, ring-offset-2)
    if (className.startsWith('ring')) {
      const parts = className.split('-');
      const property = parts[0] + (parts[1] === 'offset' ? '-offset' : '');
      const value = parts.slice(property === 'ring-offset' ? 2 : 1).join('-') || '';
      
      return {
        property,
        value: value || 'default',
        isArbitrary: false
      };
    }

    // Outline patterns (outline, outline-2, outline-red-500, outline-offset-2)
    if (className.startsWith('outline')) {
      const parts = className.split('-');
      const property = parts[0] + (parts[1] === 'offset' ? '-offset' : '');
      const value = parts.slice(property === 'outline-offset' ? 2 : 1).join('-') || '';
      
      return {
        property,
        value: value || 'default',
        isArbitrary: false
      };
    }

    return null;
  }

  static isBorderClass(className: string): boolean {
    if (className in BORDER_CLASSES || PREFIX_CLASSES.some(prefix => className.startsWith(prefix))) {
      return true;
    }

    return false;
  }

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

  /**
   * Context Pattern을 사용한 새로운 스타일 적용 메서드
   */
  static applyBordersStyle(
    parsedClass: ParsedClass, 
    styles: Partial<ParsedStyles>, 
    context: ParserContext
  ): void {
    if (!styles.borders) {
      styles.borders = {};
    }

    const { property, value, isArbitrary } = parsedClass;
    
    // Context에서 preset 추출
    const preset = context.preset;

    // 속성별 처리
    switch (property) {
      // Border width (border, border-t, border-x, etc.)
      case 'border':
      case 'border-t':
      case 'border-r':
      case 'border-b':
      case 'border-l':
      case 'border-x':
      case 'border-y':
        this.handleBorderWidth(property, value, isArbitrary, styles.borders);
        break;
        
      // Border radius (rounded, rounded-t, rounded-tl, etc.)
      case 'rounded':
      case 'rounded-t':
      case 'rounded-r':
      case 'rounded-b':
      case 'rounded-l':
      case 'rounded-tl':
      case 'rounded-tr':
      case 'rounded-bl':
      case 'rounded-br':
        this.handleBorderRadius(property, value, isArbitrary, styles.borders);
        break;
        
      // Ring utilities
      case 'ring':
      case 'ringWidth':
      case 'ringOffset':
      case 'ringOffsetWidth':
        this.handleRingUtility(property, value, isArbitrary, styles.borders);
        break;
        
      // Outline utilities
      case 'outline':
      case 'outlineWidth':
      case 'outlineStyle':
        this.handleOutlineUtility(property, value, isArbitrary, styles.borders);
        break;
        
      // Divide utilities
      case 'divideX':
      case 'divideY':
      case 'divideXWidth':
      case 'divideYWidth':
        this.handleDivideUtility(property, value, isArbitrary, styles.borders);
        break;
        
      // Border style
      case 'borderStyle':
        this.handleBorderStyle(value, styles.borders);
        break;
        
      default:
        // Generic property 처리
        styles.borders[property] = isArbitrary ? value : this.convertBorderValue(property, value);
        break;
    }
  }

  /**
   * Borders 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns Borders 관련 클래스 여부
   */
  static isBordersClass(className: string): boolean {
    return this.isValidClass(className);
  }

  /**
   * Border width 처리 헬퍼 메서드
   */
  private static handleBorderWidth(property: string, value: string, isArbitrary: boolean, borderStyles: any): void {
    if (isArbitrary) {
      borderStyles[this.convertPropertyName(property)] = value;
    } else {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        borderStyles[this.convertPropertyName(property)] = `${numericValue}px`;
      } else {
        borderStyles[this.convertPropertyName(property)] = value;
      }
    }
  }

  /**
   * Border radius 처리 헬퍼 메서드
   */
  private static handleBorderRadius(property: string, value: string, isArbitrary: boolean, borderStyles: any): void {
    if (isArbitrary) {
      borderStyles[this.convertPropertyName(property)] = value;
    } else {
      const presetValue = this.BORDER_RADIUS_VALUES[`${property}-${value}`] || 
                         this.BORDER_RADIUS_VALUES[property] ||
                         (value === 'default' ? '4px' : `${value}px`);
      borderStyles[this.convertPropertyName(property)] = presetValue;
    }
  }

  /**
   * Ring utility 처리 헬퍼 메서드
   */
  private static handleRingUtility(property: string, value: string, isArbitrary: boolean, borderStyles: any): void {
    if (isArbitrary) {
      borderStyles[property] = value;
    } else {
      const presetValue = this.RING_WIDTH_VALUES[`ring-${value}`] || 
                         this.RING_OFFSET_VALUES[`ring-offset-${value}`] ||
                         value;
      borderStyles[property] = presetValue;
    }
  }

  /**
   * Outline utility 처리 헬퍼 메서드
   */
  private static handleOutlineUtility(property: string, value: string, isArbitrary: boolean, borderStyles: any): void {
    if (isArbitrary) {
      borderStyles[property] = value;
    } else {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        borderStyles[property] = `${numericValue}px`;
      } else {
        borderStyles[property] = value;
      }
    }
  }

  /**
   * Divide utility 처리 헬퍼 메서드
   */
  private static handleDivideUtility(property: string, value: string, isArbitrary: boolean, borderStyles: any): void {
    if (isArbitrary) {
      borderStyles[property] = value;
    } else {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        borderStyles[property] = `${numericValue}px`;
      } else {
        borderStyles[property] = value;
      }
    }
  }

  /**
   * Border style 처리 헬퍼 메서드
   */
  private static handleBorderStyle(value: string, borderStyles: any): void {
    borderStyles.borderStyle = value;
  }

  /**
   * Property 이름 변환 헬퍼 메서드
   */
  private static convertPropertyName(property: string): string {
    const mappings = {
      'border': 'borderWidth',
      'border-t': 'borderTopWidth',
      'border-r': 'borderRightWidth',
      'border-b': 'borderBottomWidth',
      'border-l': 'borderLeftWidth',
      'border-x': 'borderLeftWidth', // X는 left와 right 모두 적용되어야 하지만 일단 left로
      'border-y': 'borderTopWidth', // Y는 top과 bottom 모두 적용되어야 하지만 일단 top으로
      'rounded': 'borderRadius',
      'rounded-t': 'borderTopLeftRadius',
      'rounded-r': 'borderTopRightRadius',
      'rounded-b': 'borderBottomRightRadius',
      'rounded-l': 'borderBottomLeftRadius',
      'rounded-tl': 'borderTopLeftRadius',
      'rounded-tr': 'borderTopRightRadius',
      'rounded-bl': 'borderBottomLeftRadius',
      'rounded-br': 'borderBottomRightRadius'
    };
    
    return mappings[property] || property;
  }

  /**
   * Border 값 변환 헬퍼 메서드
   */
  private static convertBorderValue(property: string, value: string): string {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return `${numericValue}px`;
    }
    return value;
  }
} 
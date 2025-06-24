import { ParsedStyle } from '../../types';

const BACKGROUND_CLASSES = {
  'bg-none': 'none',
  'bg-image-none': 'none',
  'bg-image-transparent': 'transparent',
  'bg-image-current': 'currentColor',
  'bg-image-inherit': 'inherit',
  'bg-image-initial': 'initial',
  'bg-image-unset': 'unset',
  'bg-auto': 'auto',
  'bg-cover': 'cover',
  'bg-contain': 'contain',
  'bg-repeat': 'repeat',
  'bg-no-repeat': 'no-repeat',
  'bg-repeat-x': 'repeat-x',
  'bg-repeat-y': 'repeat-y',
  'bg-repeat-round': 'round',
  'bg-repeat-space': 'space',
  'bg-fixed': 'fixed',
  'bg-local': 'local',
  'bg-scroll': 'scroll',
  'bg-clip-border': 'border-box',
  'bg-clip-padding': 'padding-box',
  'bg-clip-content': 'content-box',
  'bg-clip-text': 'text',
  'bg-origin-border': 'border-box',
  'bg-origin-padding': 'padding-box',
  'bg-origin-content': 'content-box'
};

const PREFIX_CLASSES = [
  'bg-',
  'from-',
  'via-',
  'to-'
];

export class BackgroundsParser {

  private static readonly BACKGROUND_SIZE_VALUES: Record<string, string> = {
    'bg-auto': 'auto',
    'bg-cover': 'cover',
    'bg-contain': 'contain'
  };

  private static readonly BACKGROUND_POSITION_VALUES: Record<string, string> = {
    'bg-bottom': 'bottom',
    'bg-center': 'center',
    'bg-left': 'left',
    'bg-left-bottom': 'left bottom',
    'bg-left-top': 'left top',
    'bg-right': 'right',
    'bg-right-bottom': 'right bottom',
    'bg-right-top': 'right top',
    'bg-top': 'top'
  };

  private static readonly BACKGROUND_REPEAT_VALUES: Record<string, string> = {
    'bg-repeat': 'repeat',
    'bg-no-repeat': 'no-repeat',
    'bg-repeat-x': 'repeat-x',
    'bg-repeat-y': 'repeat-y',
    'bg-repeat-round': 'round',
    'bg-repeat-space': 'space'
  };

  private static readonly BACKGROUND_ATTACHMENT_VALUES: Record<string, string> = {
    'bg-fixed': 'fixed',
    'bg-local': 'local',
    'bg-scroll': 'scroll'
  };

  private static readonly BACKGROUND_CLIP_VALUES: Record<string, string> = {
    'bg-clip-border': 'border-box',
    'bg-clip-padding': 'padding-box',
    'bg-clip-content': 'content-box',
    'bg-clip-text': 'text'
  };

  private static readonly BACKGROUND_ORIGIN_VALUES: Record<string, string> = {
    'bg-origin-border': 'border-box',
    'bg-origin-padding': 'padding-box',
    'bg-origin-content': 'content-box'
  };

  private static readonly GRADIENT_DIRECTIONS: Record<string, string> = {
    'bg-gradient-to-t': 'to top',
    'bg-gradient-to-tr': 'to top right',
    'bg-gradient-to-r': 'to right',
    'bg-gradient-to-br': 'to bottom right',
    'bg-gradient-to-b': 'to bottom',
    'bg-gradient-to-bl': 'to bottom left',
    'bg-gradient-to-l': 'to left',
    'bg-gradient-to-tl': 'to top left'
  };

  private static readonly BACKGROUND_IMAGE_VALUES: Record<string, string> = {
    'bg-image-none': 'none',
    'bg-none': 'none',
    'bg-image-transparent': 'transparent',
    'bg-image-current': 'currentColor',
    'bg-image-inherit': 'inherit',
    'bg-image-initial': 'initial',
    'bg-image-unset': 'unset'
  };

  /**
   * 표준 인터페이스: 클래스가 background 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // Background patterns (색상 포함)
    const patterns = [
      /^bg-/, // bg-red-500, bg-transparent, bg-gradient-to-r, bg-fixed, etc.
      /^from-/, // from-red-500 (gradient start)
      /^via-/, // via-blue-500 (gradient middle)
      /^to-/, // to-green-500 (gradient end)
    ];

    return patterns.some(pattern => pattern.test(className));
  }

  /**
   * 표준 인터페이스: background 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    if (!this.isValidClass(className)) {
      return null;
    }

    // Gradient directions
    if (className.startsWith('bg-gradient-')) {
      const direction = this.GRADIENT_DIRECTIONS[className];
      if (direction) {
        return {
          property: 'bg-gradient',
          value: direction,
          isArbitrary: false
        };
      }
    }

    // Background color patterns
    if (className.startsWith('bg-') && !className.includes('-to-') && !className.includes('-via-') && !className.includes('gradient')) {
      // bg-red-500, bg-[#ff0000], bg-transparent, bg-current
      if (className.startsWith('bg-[') && className.endsWith(']')) {
        const value = className.slice(4, -1); // Remove 'bg-[' and ']'
        return {
          property: 'bg',
          value,
          isArbitrary: true
        };
      }
      
      const value = className.substring(3); // Remove 'bg-'
      return {
        property: 'bg',
        value,
        isArbitrary: false
      };
    }

    // Gradient start color (from-)
    if (className.startsWith('from-')) {
      if (className.startsWith('from-[') && className.endsWith(']')) {
        const value = className.slice(6, -1); // Remove 'from-[' and ']'
        return {
          property: 'from',
          value,
          isArbitrary: true
        };
      }
      
      const value = className.substring(5); // Remove 'from-'
      return {
        property: 'from',
        value,
        isArbitrary: false
      };
    }

    // Gradient middle color (via-)
    if (className.startsWith('via-')) {
      if (className.startsWith('via-[') && className.endsWith(']')) {
        const value = className.slice(5, -1); // Remove 'via-[' and ']'
        return {
          property: 'via',
          value,
          isArbitrary: true
        };
      }
      
      const value = className.substring(4); // Remove 'via-'
      return {
        property: 'via',
        value,
        isArbitrary: false
      };
    }

    // Gradient end color (to-)
    if (className.startsWith('to-')) {
      if (className.startsWith('to-[') && className.endsWith(']')) {
        const value = className.slice(4, -1); // Remove 'to-[' and ']'
        return {
          property: 'to',
          value,
          isArbitrary: true
        };
      }
      
      const value = className.substring(3); // Remove 'to-'
      return {
        property: 'to',
        value,
        isArbitrary: false
      };
    }

    return null;
  }

  static isBackgroundClass(className: string): boolean {
    if (className in BACKGROUND_CLASSES || PREFIX_CLASSES.some(prefix => className.startsWith(prefix))) {
      return true;
    }

    return false;
  }

  static parse(className: string): ParsedStyle | null {
    // Background size
    if (this.BACKGROUND_SIZE_VALUES[className]) {
      return {
        property: 'backgroundSize',
        value: this.BACKGROUND_SIZE_VALUES[className],
        variant: 'preset'
      };
    }

    // Background position
    if (this.BACKGROUND_POSITION_VALUES[className]) {
      return {
        property: 'backgroundPosition',
        value: this.BACKGROUND_POSITION_VALUES[className],
        variant: 'preset'
      };
    }

    // Background repeat
    if (this.BACKGROUND_REPEAT_VALUES[className]) {
      return {
        property: 'backgroundRepeat',
        value: this.BACKGROUND_REPEAT_VALUES[className],
        variant: 'preset'
      };
    }

    // Background attachment
    if (this.BACKGROUND_ATTACHMENT_VALUES[className]) {
      return {
        property: 'backgroundAttachment',
        value: this.BACKGROUND_ATTACHMENT_VALUES[className],
        variant: 'preset'
      };
    }

    // Background clip
    if (this.BACKGROUND_CLIP_VALUES[className]) {
      return {
        property: 'backgroundClip',
        value: this.BACKGROUND_CLIP_VALUES[className],
        variant: 'preset'
      };
    }

    // Background origin
    if (this.BACKGROUND_ORIGIN_VALUES[className]) {
      return {
        property: 'backgroundOrigin',
        value: this.BACKGROUND_ORIGIN_VALUES[className],
        variant: 'preset'
      };
    }

    if (this.BACKGROUND_IMAGE_VALUES[className]) {
      return {
        property: 'backgroundImage',
        value: this.BACKGROUND_IMAGE_VALUES[className],
        variant: 'preset'
      };
    }

    // Background gradients
    if (className.startsWith('bg-gradient-')) {
      return this.parseGradient(className);
    }

    // Gradient color stops
    if (className.startsWith('from-') || className.startsWith('via-') || className.startsWith('to-')) {
      return this.parseGradientColorStop(className);
    }

    // Background colors (check this last among bg- patterns)
    if (className.startsWith('bg-') && !className.includes('gradient') && !className.includes('clip') && !className.includes('origin')) {
      return this.parseBackgroundColor(className);
    }

    return null;
  }

  private static parseBackgroundColor(className: string): ParsedStyle | null {
    const value = className.replace('bg-', '');

    // Handle transparent and current
    if (value === 'transparent') {
      return {
        property: 'backgroundColor',
        value: 'transparent',
        variant: 'preset'
      };
    }

    if (value === 'current') {
      return {
        property: 'backgroundColor',
        value: 'currentColor',
        variant: 'preset'
      };
    }

    // Handle inherit, initial, unset
    if (['inherit', 'initial', 'unset'].includes(value)) {
      return {
        property: 'backgroundColor',
        value: value,
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const color = value.slice(1, -1);
      
      // Check if it's a URL - should be backgroundImage
      if (color.startsWith('url(')) {
        return {
          property: 'backgroundImage',
          value: color,
          variant: 'arbitrary'
        };
      }
      
      // Otherwise it's a color - should be backgroundColor
      return {
        property: 'backgroundColor',
        value: color,
        variant: 'arbitrary'
      };
    }

    // Handle color palette with opacity
    if (value.includes('/')) {
      const [colorPart, opacityPart] = value.split('/');
      const opacity = parseInt(opacityPart) / 100;
      
      if (this.isValidColor(colorPart)) {
        return {
          property: 'backgroundColor',
          value: `${this.getColorValue(colorPart)}`,
          variant: 'preset'
        };
      }
    }

    // Handle standard color palette
    if (this.isValidColor(value)) {
      return {
        property: 'backgroundColor',
        value: this.getColorValue(value),
        variant: 'preset'
      };
    }

    return null;
  }

  private static parseGradient(className: string): ParsedStyle | null {
    if (this.GRADIENT_DIRECTIONS[className]) {
      return {
        property: 'backgroundImage',
        value: `linear-gradient(${this.GRADIENT_DIRECTIONS[className]}, var(--tw-gradient-stops))`,
        variant: 'preset'
      };
    }

    return null;
  }

  private static parseGradientColorStop(className: string): ParsedStyle | null {
    const prefix = className.split('-')[0];
    const value = className.substring(prefix.length + 1);

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const color = value.slice(1, -1);
      return {
        property: `--tw-gradient-${prefix}`,
        value: color,
        variant: 'arbitrary'
      };
    }

    // Handle color palette
    if (this.isValidColor(value)) {
      return {
        property: `--tw-gradient-${prefix}`,
        value: this.getColorValue(value),
        variant: 'preset'
      };
    }

    return null;
  }

  private static isValidColor(colorName: string): boolean {
    // Check for color-scale pattern (e.g., red-500)
    const colorPattern = /^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}$/;
    
    // Check for basic color names
    const basicColors = ['black', 'white'];
    
    return colorPattern.test(colorName) || basicColors.includes(colorName);
  }

  private static getColorValue(colorName: string): string {
    if (colorName === 'black') return '#000000';
    if (colorName === 'white') return '#ffffff';
    
    // For color palette, return CSS custom property reference
    return `var(--color-${colorName.replace('-', '-')})`;
  }

  static applyBackgroundsStyle(parsedClass: { property: string; value: any; baseClassName: string }, styles: Record<string, any>, preset: any): void {
    console.log('parsedClass', parsedClass);

    const parsed = this.parse(parsedClass.baseClassName);
    console.log('parsed', parsed);
    if (!parsed) return;

    if (!styles.backgrounds) {
      styles.backgrounds = {};
    }

    styles.backgrounds[parsed.property] = parsed.value;
  }
} 
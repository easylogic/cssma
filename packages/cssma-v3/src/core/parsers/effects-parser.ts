/**
 * Effects Parser - 효과 관련 CSS 속성 파서 (Filters 통합)
 * 
 * shadow, opacity, blur 와 모든 filter 속성을 통합 처리합니다.
 * CSS filter, backdrop-filter, box-shadow, text-shadow, opacity 등의 시각적 효과를 포함합니다.
 */

import { ParsedClass, EffectsStyles, DesignPreset, ParsedStyles, ParserContext } from '../../types';

export class EffectsParser {
  /**
   * 표준 인터페이스: 클래스가 effects 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // 정확한 매치 (Filters 통합)
    const exactMatches = [
      'shadow', 'shadow-none', 'opacity-0', 'opacity-100',
      'text-shadow', // 기본 text-shadow 클래스
      'grayscale', 'invert', 'sepia',
      'backdrop-grayscale', 'backdrop-invert', 'backdrop-sepia',
      'backdrop-blur', 'backdrop-brightness', 'backdrop-contrast', 'backdrop-hue-rotate', 'backdrop-opacity', 'backdrop-saturate',
    ];
    
    if (exactMatches.includes(className)) {
      return true;
    }

    // 패턴 매치 (Filters와 Effects 통합)
    const patterns = [
      /^shadow-/, // box shadow (shadow-sm, shadow-lg, shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)])
      /^text-shadow-(xs|sm|md|lg|xl|2xl|3xl|none|\[.*?\])$/, // text shadow sizes and arbitrary values
      /^text-shadow-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/, // text shadow colors (text-shadow-red-500, text-shadow-blue-500)
      /^text-shadow-(black|white|transparent|current)$/, // text shadow special colors
      /^text-shadow-(xs|sm|md|lg|xl|2xl|3xl|(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)|black|white|transparent|current)\/\d+$/, // opacity modifiers
      /^opacity-/, // opacity (opacity-50, opacity-[0.5])
      
      // Filter 속성들 (통합) - 값이 반드시 필요한 클래스들
      /^blur-/, // blur (blur-sm, blur-[10px]) - 'blur' 단독은 불가
      /^brightness-/, // brightness (brightness-50, brightness-[1.5])
      /^contrast-/, // contrast (contrast-50, contrast-[1.5])
      /^drop-shadow-(xs|sm|md|lg|xl|2xl|none|\[.*?\])$/, // drop shadow sizes and arbitrary values
      /^drop-shadow-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/, // drop shadow colors (drop-shadow-red-500, drop-shadow-blue-500)
      /^drop-shadow-(black|white|transparent|current)$/, // drop shadow special colors
      /^drop-shadow-(xs|sm|md|lg|xl|2xl|(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)|black|white|transparent|current)\/\d+$/, // drop shadow opacity modifiers
      /^drop-shadow-(xs|sm|md|lg|xl|2xl|none)-(black|white|transparent|current)$/, // drop shadow size + special color
      /^drop-shadow-(xs|sm|md|lg|xl|2xl|none)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/, // drop shadow size + color
      /^drop-shadow-(xs|sm|md|lg|xl|2xl|none)-(black|white|transparent|current|(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950))\/\d+$/, // drop shadow size + color + opacity
      /^hue-rotate-/, // hue-rotate (hue-rotate-15, hue-rotate-[30deg])
      /^-hue-rotate-/, // negative hue-rotate (-hue-rotate-15)
      /^saturate-/, // saturate (saturate-50, saturate-[1.5])
      
      // 값이 있거나 없어도 되는 Filter 클래스들
      /^grayscale($|-[0-9]|-\[)/, // grayscale, grayscale-0, grayscale-[0.5]
      /^invert($|-[0-9]|-\[)/, // invert, invert-0, invert-[0.5] 
      /^sepia($|-[0-9]|-\[)/, // sepia, sepia-0, sepia-[0.5]
      
      // Backdrop Filters - 값이 반드시 필요한 클래스들
      /^backdrop-blur-/, // backdrop-blur (backdrop-blur-sm, backdrop-blur-[10px])
      /^backdrop-brightness-/, // backdrop-brightness (backdrop-brightness-50)
      /^backdrop-contrast-/, // backdrop-contrast (backdrop-contrast-125)
      /^backdrop-hue-rotate-/, // backdrop-hue-rotate (backdrop-hue-rotate-15)
      /^-backdrop-hue-rotate-/, // negative backdrop-hue-rotate
      /^backdrop-opacity-/, // backdrop-opacity (backdrop-opacity-50)
      /^backdrop-saturate-/, // backdrop-saturate (backdrop-saturate-150)
      
      // 값이 없어도 되는 Backdrop Filter 클래스들
      /^backdrop-grayscale$/, // backdrop-grayscale (단독만)
      /^backdrop-invert$/, // backdrop-invert (단독만)
      /^backdrop-sepia$/ // backdrop-sepia (단독만)
    ];

    return patterns.some(pattern => pattern.test(className));
  }

  /**
   * 표준 인터페이스: effects 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    // 먼저 유효한 클래스인지 확인
    if (!this.isValidClass(className)) {
      return null;
    }

    // 임의 값 매치
    const arbitraryMatch = className.match(/^(.+?)-\[(.+)\]$/);
    if (arbitraryMatch) {
      return {
        property: arbitraryMatch[1],
        value: arbitraryMatch[2],
        isArbitrary: true
      };
    }

    // 음수 hue-rotate 처리
    if (className.startsWith('-hue-rotate-') || className.startsWith('-backdrop-hue-rotate-')) {
      const isBackdrop = className.startsWith('-backdrop-');
      const baseProperty = isBackdrop ? 'backdrop-hue-rotate' : 'hue-rotate';
      const value = className.slice(isBackdrop ? '-backdrop-hue-rotate-'.length : '-hue-rotate-'.length);
      return {
        property: baseProperty,
        value: `-${value}`,
        isArbitrary: false
      };
    }

    // backdrop filter 처리
    if (className.startsWith('backdrop-')) {
      // 값이 없는 backdrop 필터들 특별 처리
      if (className === 'backdrop-grayscale') {
        return {
          property: 'backdrop-grayscale',
          value: '',
          isArbitrary: false
        };
      }
      
      if (className === 'backdrop-invert') {
        return {
          property: 'backdrop-invert',
          value: '',
          isArbitrary: false
        };
      }
      
      if (className === 'backdrop-sepia') {
        return {
          property: 'backdrop-sepia',
          value: '',
          isArbitrary: false
        };
      }
      
      const parts = className.split('-');
      const filterType = parts.slice(1, -1).join('-'); // brightness, blur, contrast, etc.
      const valueStr = parts[parts.length - 1];
      
      return {
        property: `backdrop-${filterType}`,
        value: valueStr,
        isArbitrary: false
      };
    }

    // text-shadow 특별 처리
    if (className === 'text-shadow') {
      return {
        property: 'text-shadow',
        value: 'DEFAULT',
        isArbitrary: false
      };
    }
    
    if (className.startsWith('text-shadow-')) {
      const value = className.slice('text-shadow-'.length);
      
      // text-shadow with opacity modifier (e.g., text-shadow-lg/50, text-shadow-red-500/25)
      if (value.includes('/')) {
        return {
          property: 'text-shadow',
          value: value,
          isArbitrary: false
        };
      }
      
      // text-shadow colors (e.g., text-shadow-red-500, text-shadow-blue-500)
      const colorMatch = value.match(/^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/);
      if (colorMatch) {
        return {
          property: 'text-shadow',
          value: `${colorMatch[1]}-${colorMatch[2]}`,
          isArbitrary: false
        };
      }
      
      // text-shadow special colors (black, white, transparent, current)
      if (['black', 'white', 'transparent', 'current'].includes(value)) {
        return {
          property: 'text-shadow',
          value: value,
          isArbitrary: false
        };
      }
      
      return {
        property: 'text-shadow',
        value: value,
        isArbitrary: false
      };
    }

    // drop-shadow 특별 처리
    if (className.startsWith('drop-shadow-')) {
      const value = className.slice('drop-shadow-'.length);
      
      // drop-shadow with opacity modifier (e.g., drop-shadow-lg/50, drop-shadow-red-500/25)
      if (value.includes('/')) {
        return {
          property: 'drop-shadow',
          value: value,
          isArbitrary: false
        };
      }
      
      // drop-shadow colors (e.g., drop-shadow-red-500, drop-shadow-blue-500)
      const colorMatch = value.match(/^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/);
      if (colorMatch) {
        return {
          property: 'drop-shadow',
          value: `${colorMatch[1]}-${colorMatch[2]}`,
          isArbitrary: false
        };
      }
      
      // drop-shadow special colors (black, white, transparent, current)
      if (['black', 'white', 'transparent', 'current'].includes(value)) {
        return {
          property: 'drop-shadow',
          value: value,
          isArbitrary: false
        };
      }
      
      // drop-shadow size + color combinations (e.g., drop-shadow-lg-red-500, drop-shadow-sm-blue-300)
      const sizeColorMatch = value.match(/^(xs|sm|md|lg|xl|2xl|none)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/);
      if (sizeColorMatch) {
        return {
          property: 'drop-shadow',
          value: `${sizeColorMatch[1]}-${sizeColorMatch[2]}-${sizeColorMatch[3]}`,
          isArbitrary: false
        };
      }
      
      // drop-shadow size + special color combinations (e.g., drop-shadow-lg-black, drop-shadow-sm-white)
      const sizeSpecialColorMatch = value.match(/^(xs|sm|md|lg|xl|2xl|none)-(black|white|transparent|current)$/);
      if (sizeSpecialColorMatch) {
        return {
          property: 'drop-shadow',
          value: `${sizeSpecialColorMatch[1]}-${sizeSpecialColorMatch[2]}`,
          isArbitrary: false
        };
      }
      
      return {
        property: 'drop-shadow',
        value: value,
        isArbitrary: false
      };
    }

    // 나머지 속성들 처리 (shadow, opacity, blur 등)
    const lastDashIndex = className.lastIndexOf('-');
    if (lastDashIndex === -1) {
      // 값이 없는 경우 (예: shadow, grayscale)
      return {
        property: className,
        value: 'DEFAULT',
        isArbitrary: false
      };
    }

    const property = className.slice(0, lastDashIndex);
    const value = className.slice(lastDashIndex + 1);

    return {
      property: property,
      value: value,
      isArbitrary: false
    };
  }

  /**
   * Context Pattern을 사용한 새로운 스타일 적용 메서드
   */
  static applyEffectStyle(
    parsedClass: ParsedClass, 
    styles: Partial<ParsedStyles>, 
    context: ParserContext
  ): void {
    if (!styles.effects) {
      styles.effects = {};
    }

    const { property, value, isArbitrary } = parsedClass;
    
    // Context에서 preset 추출
    const preset = context.preset;

    if (property === 'shadow') {
      // 그림자
      this.handleBoxShadow(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'opacity') {
      // 불투명도
      this.handleOpacity(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'text-shadow') {
      // 텍스트 그림자
      this.handleTextShadow(value, isArbitrary || false, styles.effects, preset);
    } 
    // Filter 속성들
    else if (property === 'blur') {
      this.handleBlur(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'brightness') {
      this.handleBrightness(value, isArbitrary || false, styles.effects);
    } else if (property === 'contrast') {
      this.handleContrast(value, isArbitrary || false, styles.effects);
    } else if (property === 'drop-shadow') {
      this.handleDropShadow(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'grayscale') {
      this.handleGrayscale(value, isArbitrary || false, styles.effects);
    } else if (property === 'hue-rotate') {
      this.handleHueRotate(value, isArbitrary || false, styles.effects);
    } else if (property === 'invert') {
      this.handleInvert(value, isArbitrary || false, styles.effects);
    } else if (property === 'saturate') {
      this.handleSaturate(value, isArbitrary || false, styles.effects);
    } else if (property === 'sepia') {
      this.handleSepia(value, isArbitrary || false, styles.effects);
    }
    // Backdrop Filter 속성들
    else if (property.startsWith('backdrop-')) {
      this.handleBackdropFilter(property, value, isArbitrary || false, styles.effects, preset);
    }
  }

  /**
   * Effects 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns Effects 관련 클래스 여부
   */
  static isEffectClass(className: string): boolean {
    return this.isValidClass(className);
  }

  /**
   * 박스 그림자를 처리합니다.
   */
  private static handleBoxShadow(
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles, 
    preset: DesignPreset
  ): void {
    if (!isArbitrary && value in preset.effects.boxShadow) {
      effects.boxShadow = preset.effects.boxShadow[value];
    } else if (isArbitrary) {
      effects.boxShadow = value;
    } else {
      effects.boxShadow = value;
    }
  }

  /**
   * 불투명도를 처리합니다.
   */
  private static handleOpacity(
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles, 
    preset: DesignPreset
  ): void {
    if (isArbitrary) {
      effects.opacity = parseFloat(value);
    } else {
      const numericValue = parseInt(value, 10);
      effects.opacity = numericValue / 100;
    }
  }

  /**
   * 흐림 효과를 처리합니다.
   */
  private static handleBlur(
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles, 
    preset: DesignPreset
  ): void {
    const blurMap: Record<string, string> = {
      'none': 'blur(0)',
      'xs': 'blur(1px)',
      'sm': 'blur(4px)',
      'DEFAULT': 'blur(8px)',
      'md': 'blur(12px)',
      'lg': 'blur(16px)',
      'xl': 'blur(24px)',
      '2xl': 'blur(40px)',
      '3xl': 'blur(64px)'
    };

    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      const filterValue = `blur(${value})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else if (value in blurMap) {
      const filterValue = blurMap[value];
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * 밝기를 처리합니다.
   */
  private static handleBrightness(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      const filterValue = `brightness(${value})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else {
      const numericValue = parseInt(value, 10);
      const brightnessValue = numericValue / 100;
      const filterValue = `brightness(${brightnessValue})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * 대비를 처리합니다.
   */
  private static handleContrast(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      const filterValue = `contrast(${value})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else {
      const numericValue = parseInt(value, 10);
      const contrastValue = numericValue / 100;
      const filterValue = `contrast(${contrastValue})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * Drop Shadow를 처리합니다.
   */
  private static handleDropShadow(
    value: string,
    isArbitrary: boolean,
    effects: EffectsStyles,
    preset: DesignPreset
  ): void {
    const dropShadowMap: Record<string, string> = {
      'xs': 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
      'sm': 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))',
      'DEFAULT': 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
      'md': 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      'lg': 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
      'xl': 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
      '2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
      'none': 'drop-shadow(0 0 #0000)'
    };

    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      // 임의값에서 underscore를 공백으로 변환
      const shadowValue = value.replace(/_/g, ' ');
      const filterValue = `drop-shadow(${shadowValue})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
      return;
    }

    // opacity modifier 처리 (e.g., lg/50, red-500/25)
    if (value.includes('/')) {
      const [baseValue, opacityStr] = value.split('/');
      const opacity = parseInt(opacityStr, 10) / 100;
      
      // size + color + opacity (e.g., lg-red-500/25)
      const sizeColorMatch = baseValue.match(/^(xs|sm|md|lg|xl|2xl|none)-([a-z]+)-(50|100|200|300|400|500|600|700|800|900|950)$/);
      if (sizeColorMatch) {
        const [, size, colorName, weightStr] = sizeColorMatch;
        const weight = parseInt(weightStr, 10);
        const resolvedColor = this.resolveDropShadowColor(colorName, weight, preset);
        if (resolvedColor && size in dropShadowMap) {
          let shadowValue = dropShadowMap[size];
          shadowValue = this.applyColorToDropShadow(shadowValue, resolvedColor, opacity);
          effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
        }
        return;
      }
      
      // size + special color + opacity (e.g., lg-black/50)
      const sizeSpecialColorMatch = baseValue.match(/^(xs|sm|md|lg|xl|2xl|none)-(black|white|transparent|current)$/);
      if (sizeSpecialColorMatch) {
        const [, size, color] = sizeSpecialColorMatch;
        const resolvedColor = this.resolveSpecialDropShadowColor(color);
        if (resolvedColor && size in dropShadowMap) {
          let shadowValue = dropShadowMap[size];
          shadowValue = this.applyDropShadowOpacity(shadowValue, opacity);
          shadowValue = this.applyColorToDropShadow(shadowValue, resolvedColor, 1);
          effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
        }
        return;
      }
      
      // size only + opacity (e.g., lg/50)
      if (baseValue in dropShadowMap) {
        let shadowValue = dropShadowMap[baseValue];
        shadowValue = this.applyDropShadowOpacity(shadowValue, opacity);
        effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
        return;
      }
      
      // color only + opacity (e.g., red-500/25)
      const colorMatch = baseValue.match(/^([a-z]+)-(50|100|200|300|400|500|600|700|800|900|950)$/);
      if (colorMatch) {
        const [, colorName, weightStr] = colorMatch;
        const weight = parseInt(weightStr, 10);
        const resolvedColor = this.resolveDropShadowColor(colorName, weight, preset);
        if (resolvedColor) {
          let shadowValue = dropShadowMap['DEFAULT']; // default size
          shadowValue = this.applyColorToDropShadow(shadowValue, resolvedColor, opacity);
          effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
        }
        return;
      }
      
      // special color only + opacity (e.g., black/50)
      if (['black', 'white', 'transparent', 'current'].includes(baseValue)) {
        const resolvedColor = this.resolveSpecialDropShadowColor(baseValue);
        if (resolvedColor) {
          let shadowValue = dropShadowMap['DEFAULT']; // default size
          shadowValue = this.applyDropShadowOpacity(shadowValue, opacity);
          shadowValue = this.applyColorToDropShadow(shadowValue, resolvedColor, 1);
          effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
        }
        return;
      }
    }

    // size + color combinations (e.g., lg-red-500)
    const sizeColorMatch = value.match(/^(xs|sm|md|lg|xl|2xl|none)-([a-z]+)-(50|100|200|300|400|500|600|700|800|900|950)$/);
    if (sizeColorMatch) {
      const [, size, colorName, weightStr] = sizeColorMatch;
      const weight = parseInt(weightStr, 10);
      const resolvedColor = this.resolveDropShadowColor(colorName, weight, preset);
      if (resolvedColor && size in dropShadowMap) {
        let shadowValue = dropShadowMap[size];
        shadowValue = this.applyColorToDropShadow(shadowValue, resolvedColor, 1);
        effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
      }
      return;
    }
    
    // size + special color combinations (e.g., lg-black, sm-white)
    const sizeSpecialColorMatch = value.match(/^(xs|sm|md|lg|xl|2xl|none)-(black|white|transparent|current)$/);
    if (sizeSpecialColorMatch) {
      const [, size, color] = sizeSpecialColorMatch;
      const resolvedColor = this.resolveSpecialDropShadowColor(color);
      if (resolvedColor && size in dropShadowMap) {
        let shadowValue = dropShadowMap[size];
        shadowValue = this.applyColorToDropShadow(shadowValue, resolvedColor, 1);
        effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
      }
      return;
    }

    // color only (e.g., red-500)
    const colorMatch = value.match(/^([a-z]+)-(50|100|200|300|400|500|600|700|800|900|950)$/);
    if (colorMatch) {
      const [, colorName, weightStr] = colorMatch;
      const weight = parseInt(weightStr, 10);
      const resolvedColor = this.resolveDropShadowColor(colorName, weight, preset);
      if (resolvedColor) {
        let shadowValue = dropShadowMap['DEFAULT']; // default size
        shadowValue = this.applyColorToDropShadow(shadowValue, resolvedColor, 1);
        effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
      }
      return;
    }
    
    // special color only (e.g., black, white)
    if (['black', 'white', 'transparent', 'current'].includes(value)) {
      const resolvedColor = this.resolveSpecialDropShadowColor(value);
      if (resolvedColor) {
        let shadowValue = dropShadowMap['DEFAULT']; // default size
        shadowValue = this.applyColorToDropShadow(shadowValue, resolvedColor, 1);
        effects.filter = effects.filter ? `${effects.filter} ${shadowValue}` : shadowValue;
      }
      return;
    }

    // standard size values (e.g., lg, sm, xl)
    if (value in dropShadowMap) {
      const filterValue = dropShadowMap[value];
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * 그레이스케일을 처리합니다.
   */
  private static handleGrayscale(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      const filterValue = `grayscale(${value})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else if (value === 'DEFAULT' || value === '') {
      const filterValue = 'grayscale(100%)';
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else if (value === '0') {
      const filterValue = 'grayscale(0)';
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * Hue Rotate를 처리합니다.
   */
  private static handleHueRotate(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      const filterValue = `hue-rotate(${value})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else {
      const numericValue = value.startsWith('-') ? parseInt(value, 10) : parseInt(value, 10);
      const filterValue = `hue-rotate(${numericValue}deg)`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * Invert를 처리합니다.
   */
  private static handleInvert(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      const filterValue = `invert(${value})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else if (value === 'DEFAULT' || value === '') {
      const filterValue = 'invert(100%)';
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else if (value === '0') {
      const filterValue = 'invert(0)';
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * Saturate를 처리합니다.
   */
  private static handleSaturate(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      const filterValue = `saturate(${value})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else {
      const numericValue = parseInt(value, 10);
      const saturateValue = numericValue / 100;
      const filterValue = `saturate(${saturateValue})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * Sepia를 처리합니다.
   */
  private static handleSepia(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (!effects.filter) effects.filter = '';
    
    if (isArbitrary) {
      const filterValue = `sepia(${value})`;
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else if (value === 'DEFAULT' || value === '') {
      const filterValue = 'sepia(100%)';
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    } else if (value === '0') {
      const filterValue = 'sepia(0)';
      effects.filter = effects.filter ? `${effects.filter} ${filterValue}` : filterValue;
    }
  }

  /**
   * Backdrop Filter를 처리합니다.
   */
  private static handleBackdropFilter(
    property: string,
    value: string,
    isArbitrary: boolean,
    effects: EffectsStyles,
    preset: DesignPreset
  ): void {
    if (!effects.backdropFilter) effects.backdropFilter = '';
    
    const filterType = property.replace('backdrop-', '');
    
    let filterValue = '';
    
    switch (filterType) {
      case 'blur':
        const blurMap: Record<string, string> = {
          'none': 'blur(0)',
          'xs': 'blur(1px)',
          'sm': 'blur(4px)',
          'DEFAULT': 'blur(8px)',
          'md': 'blur(12px)',
          'lg': 'blur(16px)',
          'xl': 'blur(24px)',
          '2xl': 'blur(40px)',
          '3xl': 'blur(64px)'
        };
        
        if (isArbitrary) {
          filterValue = `blur(${value})`;
        } else if (value in blurMap) {
          filterValue = blurMap[value];
        }
        break;
        
      case 'brightness':
        if (isArbitrary) {
          filterValue = `brightness(${value})`;
        } else {
          const numericValue = parseInt(value, 10);
          const brightnessValue = numericValue / 100;
          filterValue = `brightness(${brightnessValue})`;
        }
        break;
        
      case 'contrast':
        if (isArbitrary) {
          filterValue = `contrast(${value})`;
        } else {
          const numericValue = parseInt(value, 10);
          const contrastValue = numericValue / 100;
          filterValue = `contrast(${contrastValue})`;
        }
        break;
        
      case 'grayscale':
        if (isArbitrary) {
          filterValue = `grayscale(${value})`;
        } else if (value === 'DEFAULT' || value === '') {
          filterValue = 'grayscale(100%)';
        } else if (value === '0') {
          filterValue = 'grayscale(0)';
        }
        break;
        
      case 'hue-rotate':
        if (isArbitrary) {
          filterValue = `hue-rotate(${value})`;
        } else {
          const numericValue = value.startsWith('-') ? parseInt(value, 10) : parseInt(value, 10);
          filterValue = `hue-rotate(${numericValue}deg)`;
        }
        break;
        
      case 'invert':
        if (isArbitrary) {
          filterValue = `invert(${value})`;
        } else if (value === 'DEFAULT' || value === '') {
          filterValue = 'invert(100%)';
        } else if (value === '0') {
          filterValue = 'invert(0)';
        }
        break;
        
      case 'opacity':
        if (isArbitrary) {
          filterValue = `opacity(${value})`;
        } else {
          const numericValue = parseInt(value, 10);
          const opacityValue = numericValue / 100;
          filterValue = `opacity(${opacityValue})`;
        }
        break;
        
      case 'saturate':
        if (isArbitrary) {
          filterValue = `saturate(${value})`;
        } else {
          const numericValue = parseInt(value, 10);
          const saturateValue = numericValue / 100;
          filterValue = `saturate(${saturateValue})`;
        }
        break;
        
      case 'sepia':
        if (isArbitrary) {
          filterValue = `sepia(${value})`;
        } else if (value === 'DEFAULT' || value === '') {
          filterValue = 'sepia(100%)';
        } else if (value === '0') {
          filterValue = 'sepia(0)';
        }
        break;
    }
    
    if (filterValue) {
      effects.backdropFilter = effects.backdropFilter ? `${effects.backdropFilter} ${filterValue}` : filterValue;
    }
  }

  /**
   * 텍스트 그림자를 처리합니다.
   */
  private static handleTextShadow(
    value: string,
    isArbitrary: boolean,
    effects: EffectsStyles,
    preset: DesignPreset
  ): void {
    const textShadowMap: Record<string, string> = {
      '2xs': '0 1px 2px rgb(0 0 0 / 0.05)',
      'xs': '0 1px 2px rgb(0 0 0 / 0.1)',
      'sm': '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
      'DEFAULT': '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
      'md': '0 4px 6px rgb(0 0 0 / 0.07), 0 2px 4px rgb(0 0 0 / 0.06)',
      'lg': '0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)',
      'xl': '0 20px 25px rgb(0 0 0 / 0.1), 0 10px 10px rgb(0 0 0 / 0.04)',
      '2xl': '0 25px 50px rgb(0 0 0 / 0.25)',
      'none': 'none'
    };

    if (isArbitrary) {
      // 임의값에서 underscore를 공백으로 변환
      effects.textShadow = value.replace(/_/g, ' ');
      return;
    }
    
    // Handle opacity modifiers (e.g., lg/50, red-500/25)
    if (value.includes('/')) {
      const [baseValue, opacityStr] = value.split('/');
      const opacity = parseInt(opacityStr, 10) / 100;
      
      // Check if baseValue is a color (e.g., red-500/25)
      const colorMatch = baseValue.match(/^([a-z]+)-(\d+)$/);
      if (colorMatch) {
        const colorName = colorMatch[1];
        const colorWeight = parseInt(colorMatch[2], 10);
        const colorValue = this.resolveTextShadowColor(colorName, colorWeight, preset);
        
        if (colorValue) {
          // Apply default shadow with custom color and opacity
          const shadowValue = textShadowMap['DEFAULT'] || '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)';
          effects.textShadow = this.applyColorToShadow(shadowValue, colorValue, opacity);
          return;
        }
      }
      
      // Handle size with opacity (e.g., lg/50)
      if (baseValue in textShadowMap) {
        const shadowValue = textShadowMap[baseValue];
        if (shadowValue && shadowValue !== 'none') {
          effects.textShadow = this.applyShadowOpacity(shadowValue, opacity);
          return;
        }
      }
    }
    
    // Handle text-shadow colors (e.g., text-shadow-red-500, text-shadow-blue-500)
    const colorMatch = value.match(/^([a-z]+)-(\d+)$/);
    if (colorMatch) {
      const colorName = colorMatch[1];
      const colorWeight = parseInt(colorMatch[2], 10);
      const colorValue = this.resolveTextShadowColor(colorName, colorWeight, preset);
      
      if (colorValue) {
        // Apply default shadow with custom color
        const shadowValue = textShadowMap['DEFAULT'] || '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)';
        effects.textShadow = this.applyColorToShadow(shadowValue, colorValue, 1.0);
        return;
      }
    }
    
    // Handle special colors (black, white, transparent, current)
    if (['black', 'white', 'transparent', 'current'].includes(value)) {
      const colorValue = this.resolveSpecialTextShadowColor(value);
      if (colorValue) {
        const shadowValue = textShadowMap['DEFAULT'] || '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)';
        effects.textShadow = this.applyColorToShadow(shadowValue, colorValue, 1.0);
        return;
      }
    }
    
    // Standard size handling
    if (value in textShadowMap) {
      effects.textShadow = textShadowMap[value];
    }
  }

  /**
   * 텍스트 그림자 색상을 해결합니다.
   */
  private static resolveTextShadowColor(colorName: string, weight: number, preset: DesignPreset): string | null {
    // Tailwind CSS color palette
    const colors: Record<string, Record<number, string>> = {
      slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
      gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
      zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
      red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
      orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' },
      amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
      yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
      lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#365314', 900: '#1a2e05', 950: '#0c1302' },
      green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
      emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
      teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
      cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
      sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
      blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
      indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
      violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
      purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
      fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
      pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' },
      rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' }
    };

    if (colors[colorName] && colors[colorName][weight]) {
      return colors[colorName][weight];
    }

    return null;
  }

  /**
   * 특수 텍스트 그림자 색상을 해결합니다.
   */
  private static resolveSpecialTextShadowColor(color: string): string | null {
    const specialColors: Record<string, string> = {
      'black': '#000000',
      'white': '#ffffff',
      'transparent': 'transparent',
      'current': 'currentColor'
    };

    return specialColors[color] || null;
  }

  /**
   * 그림자에 색상을 적용합니다.
   */
  private static applyColorToShadow(shadowValue: string, color: string, opacity: number): string {
    // Shadow value 형태: "0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)"
    return shadowValue.replace(/rgb\([^)]+\)/g, () => {
      if (color === 'transparent') return 'transparent';
      if (color === 'currentColor') return 'currentColor';
      
      // Convert hex to rgb
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `rgb(${r} ${g} ${b} / ${opacity})`;
    });
  }

  /**
   * 그림자에 투명도를 적용합니다.
   */
  private static applyShadowOpacity(shadowValue: string, opacity: number): string {
    // 기존 alpha 값에 새로운 opacity를 곱합니다
    return shadowValue.replace(/\/\s*([\d.]+)\)/g, (match, existingOpacity) => {
      const newOpacity = parseFloat(existingOpacity) * opacity;
      return ` / ${newOpacity})`;
    });
  }

  /**
   * Tailwind 색상 이름과 가중치를 실제 drop-shadow 색상 값으로 변환합니다.
   */
  private static resolveDropShadowColor(colorName: string, weight: number, preset: DesignPreset): string | null {
    // text-shadow와 같은 색상 시스템 사용
    return this.resolveTextShadowColor(colorName, weight, preset);
  }

  /**
   * 특수 drop-shadow 색상을 해석합니다.
   */
  private static resolveSpecialDropShadowColor(color: string): string | null {
    // text-shadow와 같은 특수 색상 시스템 사용
    return this.resolveSpecialTextShadowColor(color);
  }

  /**
   * 주어진 색상을 drop-shadow 값에 적용합니다.
   */
  private static applyColorToDropShadow(shadowValue: string, color: string, opacity: number): string {
    // drop-shadow는 rgb() 형식을 사용
    return shadowValue.replace(/rgb\([^)]+\)/g, () => {
      if (color === 'transparent') return 'transparent';
      if (color === 'currentColor') return 'currentColor';
      
      if (color.startsWith('#')) {
        // hex 색상을 rgb로 변환
        const hex = color.slice(1);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgb(${r} ${g} ${b} / ${opacity.toFixed(3)})`;
      } else if (color.startsWith('rgba(')) {
        // rgba를 rgb()로 변환
        const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^)]+)\)/);
        if (rgbaMatch) {
          const [, r, g, b, alpha] = rgbaMatch;
          const finalOpacity = parseFloat(alpha) * opacity;
          return `rgb(${r} ${g} ${b} / ${finalOpacity.toFixed(3)})`;
        }
      } else if (color.startsWith('rgb(')) {
        // 기존 rgb() 형식 사용
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          const [, r, g, b] = rgbMatch;
          return `rgb(${r} ${g} ${b} / ${opacity.toFixed(3)})`;
        }
      }
      return color;
    });
  }

  /**
   * 주어진 투명도를 drop-shadow 값에 적용합니다.
   */
  private static applyDropShadowOpacity(shadowValue: string, opacity: number): string {
    return shadowValue.replace(/rgb\([^)]+\s*\/\s*[^)]+\)/g, (match) => {
      const rgbSpaceMatch = match.match(/rgb\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([^)]+)\)/);
      if (rgbSpaceMatch) {
        const [, r, g, b, existingAlpha] = rgbSpaceMatch;
        const currentAlpha = parseFloat(existingAlpha);
        const newAlpha = currentAlpha * opacity;
        return `rgb(${r} ${g} ${b} / ${newAlpha.toFixed(3)})`;
      }
      return match;
    });
  }
} 
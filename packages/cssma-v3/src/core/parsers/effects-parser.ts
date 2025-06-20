/**
 * Effects Parser - 효과 관련 CSS 속성 파서 (Filters 통합)
 * 
 * shadow, opacity, blur, border-radius와 모든 filter 속성을 통합 처리합니다.
 * CSS filter, backdrop-filter, box-shadow, text-shadow, opacity 등의 시각적 효과를 포함합니다.
 */

import { ParsedClass, EffectsStyles, DesignPreset } from '../../types';

export class EffectsParser {
  /**
   * 표준 인터페이스: 클래스가 effects 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // 정확한 매치 (Filters 통합)
    const exactMatches = [
      'shadow', 'shadow-none', 'opacity-0', 'opacity-100',
      'grayscale', 'invert', 'sepia'
    ];
    
    if (exactMatches.includes(className)) {
      return true;
    }

    // 패턴 매치 (Filters와 Effects 통합)
    const patterns = [
      /^rounded(-\w+)*(-\d+|\[.+\])?$/, // border-radius (rounded, rounded-t, rounded-[10px])
      /^(border|border-[tbrlxy])(-\d+|\[.+\])?$/, // border width
      /^shadow-/, // box shadow (shadow-sm, shadow-lg, shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)])
      /^text-shadow-/, // text shadow (text-shadow-sm, text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)])
      /^opacity-/, // opacity (opacity-50, opacity-[0.5])
      
      // Filter 속성들 (통합) - 값이 반드시 필요한 클래스들
      /^blur-/, // blur (blur-sm, blur-[10px]) - 'blur' 단독은 불가
      /^brightness-/, // brightness (brightness-50, brightness-[1.5])
      /^contrast-/, // contrast (contrast-50, contrast-[1.5])
      /^drop-shadow-/, // drop-shadow (drop-shadow-lg, drop-shadow-[0_10px_8px_rgba(0,0,0,0.04)])
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
      const parts = className.split('-');
      const filterType = parts.slice(1, -1).join('-'); // brightness, blur, contrast, etc.
      const valueStr = parts[parts.length - 1];

      if (className.startsWith('backdrop-grayscale')) {
        return {
          property: 'backdrop-grayscale',
          value: '',
          isArbitrary: false
        };
      }
      
      return {
        property: `backdrop-${filterType}`,
        value: valueStr,
        isArbitrary: false
      };
    }

    // text-shadow 특별 처리
    if (className.startsWith('text-shadow-')) {
      const value = className.slice('text-shadow-'.length);
      return {
        property: 'text-shadow',
        value: value,
        isArbitrary: false
      };
    }

    // rounded 처리
    if (className.startsWith('rounded')) {
      const value = className === 'rounded' ? 'DEFAULT' : className.slice('rounded-'.length);
      return {
        property: 'rounded',
        value: value,
        isArbitrary: false
      };
    }

    // border 처리
    if (className.startsWith('border')) {
      if (className === 'border') {
        return {
          property: 'border',
          value: '1',
          isArbitrary: false
        };
      }
      
      const borderMatch = className.match(/^(border-[tbrlxy]?)(?:-(\w+))?$/);
      if (borderMatch) {
        return {
          property: borderMatch[1],
          value: borderMatch[2] || '1',
          isArbitrary: false
        };
      }
    }

    // drop-shadow 특별 처리
    if (className.startsWith('drop-shadow-')) {
      const value = className.slice('drop-shadow-'.length);
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
   * 효과 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋
   */
  static applyEffectStyle(
    parsedClass: ParsedClass, 
    styles: { effects?: EffectsStyles }, 
    preset: DesignPreset
  ): void {
    if (!styles.effects) {
      styles.effects = {};
    }

    const { property, value, isArbitrary } = parsedClass;

    if (property.startsWith('rounded')) {
      // 테두리 반경
      this.handleBorderRadius(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'border' || property.startsWith('border-')) {
      // 테두리 너비
      this.handleBorderWidth(property, value, isArbitrary || false, styles.effects);
    } else if (property === 'shadow') {
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
   * 테두리 반경을 처리합니다.
   */
  private static handleBorderRadius(
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles, 
    preset: DesignPreset
  ): void {
    if (!isArbitrary && value in preset.effects.borderRadius) {
      effects.borderRadius = preset.effects.borderRadius[value];
    } else if (isArbitrary) {
      effects.borderRadius = parseInt(value, 10) || 0;
    } else {
      // 숫자 값 처리 (예: rounded-8 => 8px)
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue)) {
        effects.borderRadius = numericValue;
      }
    }
  }

  /**
   * 테두리 너비를 처리합니다.
   */
  private static handleBorderWidth(
    property: string,
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles
  ): void {
    const borderValue = isArbitrary ? parseInt(value, 10) : parseInt(value, 10);
    
    if (!effects.borderWidth) {
      effects.borderWidth = {};
    }
    
    switch (property) {
      case 'border':
        effects.borderWidth = {
          top: borderValue,
          right: borderValue,
          bottom: borderValue,
          left: borderValue,
        };
        break;
      case 'border-t':
        effects.borderWidth.top = borderValue;
        break;
      case 'border-r':
        effects.borderWidth.right = borderValue;
        break;
      case 'border-b':
        effects.borderWidth.bottom = borderValue;
        break;
      case 'border-l':
        effects.borderWidth.left = borderValue;
        break;
      case 'border-x':
        effects.borderWidth.left = borderValue;
        effects.borderWidth.right = borderValue;
        break;
      case 'border-y':
        effects.borderWidth.top = borderValue;
        effects.borderWidth.bottom = borderValue;
        break;
    }
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
    } else if (value in dropShadowMap) {
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
    } else if (value in textShadowMap) {
      effects.textShadow = textShadowMap[value];
    }
  }
} 
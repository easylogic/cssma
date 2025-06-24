/**
 * Sizing Parser - 크기 관련 CSS 속성 파서
 * 
 * min-width, max-width, min-height, max-height, size 등의 크기 관련 속성을 처리합니다.
 */

import { ParsedClass, ParsedStyle, ParsedStyles, DesignPreset, ParserContext } from '../../types';

export class SizingParser {
  /**
   * 표준 인터페이스: 클래스가 sizing 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // Width patterns (w-)
    if (/^w-/.test(className)) {
      return true;
    }
    
    // Height patterns (h-)
    if (/^h-/.test(className)) {
      return true;
    }
    
    // Min/Max width patterns
    if (/^(min-w|max-w)-/.test(className)) {
      return true;
    }
    
    // Min/Max height patterns
    if (/^(min-h|max-h)-/.test(className)) {
      return true;
    }
    
    // Size pattern (size-)
    if (/^size-/.test(className)) {
      return true;
    }
    
    return false;
  }

  /**
   * 표준 인터페이스: sizing 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    if (!this.isValidClass(className)) {
      return null;
    }

    // Width (w-)
    const widthMatch = className.match(/^w-(.+)$/);
    if (widthMatch) {
      const value = widthMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'w',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Height (h-)
    const heightMatch = className.match(/^h-(.+)$/);
    if (heightMatch) {
      const value = heightMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'h',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Min-width (min-w-)
    const minWidthMatch = className.match(/^min-w-(.+)$/);
    if (minWidthMatch) {
      const value = minWidthMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'min-w',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Max-width (max-w-)
    const maxWidthMatch = className.match(/^max-w-(.+)$/);
    if (maxWidthMatch) {
      const value = maxWidthMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'max-w',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Min-height (min-h-)
    const minHeightMatch = className.match(/^min-h-(.+)$/);
    if (minHeightMatch) {
      const value = minHeightMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'min-h',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Max-height (max-h-)
    const maxHeightMatch = className.match(/^max-h-(.+)$/);
    if (maxHeightMatch) {
      const value = maxHeightMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'max-h',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    // Size (size-)
    const sizeMatch = className.match(/^size-(.+)$/);
    if (sizeMatch) {
      const value = sizeMatch[1];
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'size',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }

    return null;
  }

  /**
   * 크기 관련 클래스를 파싱합니다.
   * @param className 클래스명
   * @returns 파싱된 스타일 또는 null
   */
  static parse(className: string): ParsedStyle | null {
    const sizeStyles = this.parseSizing(className);
    if (!sizeStyles) return null;

    // Record<string, string>을 ParsedStyle로 변환
    const [property, value] = Object.entries(sizeStyles)[0];
    return {
      property,
      value,
      variant: 'preset'
    };
  }

  /**
   * 크기 관련 클래스를 파싱합니다.
   * @param className 클래스명
   * @returns 크기 스타일 객체 또는 null
   */
  static parseSizing(className: string): Record<string, string> | null {
    // Width
    if (className.startsWith('w-')) {
      const value = className.substring(2);
      if (value.includes('/')) {
        // Fraction values like w-1/2
        const [numerator, denominator] = value.split('/');
        const percentage = (parseInt(numerator) / parseInt(denominator)) * 100;
        return { width: `${percentage}%` };
      }
      return { width: this.getWidthValue(value) };
    }

    // Height
    if (className.startsWith('h-')) {
      const value = className.substring(2);
      if (value.includes('/')) {
        // Fraction values like h-1/2
        const [numerator, denominator] = value.split('/');
        const percentage = (parseInt(numerator) / parseInt(denominator)) * 100;
        return { height: `${percentage}%` };
      }
      return { height: this.getSizeValue(value) };
    }

    // Min Width
    if (className.startsWith('min-w-')) {
      const value = className.substring(6);
      return { minWidth: this.getSizeValue(value) };
    }

    // Max Width
    if (className.startsWith('max-w-')) {
      const value = className.substring(6);
      if (value.startsWith('screen-')) {
        const screen = value.substring(7);
        return { maxWidth: this.getScreenValue(screen) };
      }
      return { maxWidth: this.getMaxWidthValue(value) };
    }

    // Min Height
    if (className.startsWith('min-h-')) {
      const value = className.substring(6);
      return { minHeight: this.getSizeValue(value) };
    }

    // Max Height
    if (className.startsWith('max-h-')) {
      const value = className.substring(6);
      return { maxHeight: this.getSizeValue(value) };
    }

    // Size (Tailwind v3.4+)
    if (className.startsWith('size-')) {
      const value = className.substring(5);
      return { size: this.getSizeValue(value) };
    }

    return null;
  }

  /**
   * 크기 값을 변환합니다.
   * @param value 크기 값
   * @returns CSS 크기 값
   */
  private static getSizeValue(value: string): string {
    // Arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1);
    }

    // Named values
    switch (value) {
      case '0': return '0px';
      case 'px': return '1px';
      case '0.5': return '0.125rem';
      case '1': return '0.25rem';
      case '1.5': return '0.375rem';
      case '2': return '0.5rem';
      case '2.5': return '0.625rem';
      case '3': return '0.75rem';
      case '3.5': return '0.875rem';
      case '4': return '1rem';
      case '5': return '1.25rem';
      case '6': return '1.5rem';
      case '7': return '1.75rem';
      case '8': return '2rem';
      case '9': return '2.25rem';
      case '10': return '2.5rem';
      case '11': return '2.75rem';
      case '12': return '3rem';
      case '14': return '3.5rem';
      case '16': return '4rem';
      case '20': return '5rem';
      case '24': return '6rem';
      case '28': return '7rem';
      case '32': return '8rem';
      case '36': return '9rem';
      case '40': return '10rem';
      case '44': return '11rem';
      case '48': return '12rem';
      case '52': return '13rem';
      case '56': return '14rem';
      case '60': return '15rem';
      case '64': return '16rem';
      case '72': return '18rem';
      case '80': return '20rem';
      case '96': return '24rem';
      case 'auto': return 'auto';
      case 'full': return '100%';
      case 'screen': return '100vh';
      case 'svh': return '100svh';
      case 'lvh': return '100lvh';
      case 'dvh': return '100dvh';
      case 'min': return 'min-content';
      case 'max': return 'max-content';
      case 'fit': return 'fit-content';
      case 'none': return 'none';
      default:
        // Handle numeric values
        if (/^\d+$/.test(value)) {
          const num = parseInt(value);
          if (num === 0) return '0px';
          if (num <= 96 && num % 4 === 0) {
            return `${num / 4}rem`;
          }
        }
        return value;
    }
  }

  /**
   * Width 값을 변환합니다.
   * @param value Width 값
   * @returns CSS Width 값
   */
  private static getWidthValue(value: string): string {
    // Special width values
    switch (value) {
      case 'auto': return 'auto';
      case 'screen': return '100vw';
      default:
        return this.getSizeValue(value);
    }
  }

  /**
   * Max Width 값을 변환합니다.
   * @param value Max Width 값
   * @returns CSS Max Width 값
   */
  private static getMaxWidthValue(value: string): string {
    // Special max-width values
    switch (value) {
      case 'none': return 'none';
      case 'xs': return '20rem';
      case 'sm': return '24rem';
      case 'md': return '28rem';
      case 'lg': return '32rem';
      case 'xl': return '36rem';
      case '2xl': return '42rem';
      case '3xl': return '48rem';
      case '4xl': return '56rem';
      case '5xl': return '64rem';
      case '6xl': return '72rem';
      case '7xl': return '80rem';
      case 'full': return '100%';
      case 'min': return 'min-content';
      case 'max': return 'max-content';
      case 'fit': return 'fit-content';
      case 'prose': return '65ch';
      default:
        return this.getSizeValue(value);
    }
  }

  /**
   * Screen 값을 변환합니다.
   * @param screen Screen 값
   * @returns CSS Screen 값
   */
  private static getScreenValue(screen: string): string {
    switch (screen) {
      case 'sm': return '640px';
      case 'md': return '768px';
      case 'lg': return '1024px';
      case 'xl': return '1280px';
      case '2xl': return '1536px';
      default: return screen;
    }
  }

  /**
   * Context Pattern을 사용한 새로운 스타일 적용 메서드
   */
  static applySizingStyle(
    parsedClass: ParsedClass,
    styles: Partial<ParsedStyles>,
    context: ParserContext
  ): void {
    const { property, value } = parsedClass;
    const isArbitrary = Boolean(parsedClass.isArbitrary);
    
    if (!styles.sizing) {
      styles.sizing = {};
    }
    
    // Context에서 preset 추출
    const preset = context.preset;
    
    // 속성별 처리 - Context의 UnitUtils 사용
    switch (property) {
      case 'w':
        styles.sizing.width = this.convertSizeValue(value, isArbitrary, context, 'w');
        break;
        
      case 'h':
        styles.sizing.height = this.convertSizeValue(value, isArbitrary, context, 'h');
        break;
        
      case 'min-w':
        styles.sizing.minWidth = this.convertSizeValue(value, isArbitrary, context, 'min-w');
        break;
        
      case 'max-w':
        styles.sizing.maxWidth = this.convertMaxWidthValue(value, isArbitrary, context);
        break;
        
      case 'min-h':
        styles.sizing.minHeight = this.convertSizeValue(value, isArbitrary, context, 'min-h');
        break;
        
      case 'max-h':
        styles.sizing.maxHeight = this.convertSizeValue(value, isArbitrary, context, 'max-h');
        break;
        
      case 'size':
        const sizeValue = this.convertSizeValue(value, isArbitrary, context, 'size');
        styles.sizing.size = sizeValue;
        // size는 width와 height 모두 설정
        styles.sizing.width = sizeValue;
        styles.sizing.height = sizeValue;
        break;
    }
  }

  /**
   * Legacy 호환성을 위한 기존 메서드 (테스트 호환)
   */
  static applySizingStyleLegacy(
    parsedClass: ParsedClass,
    styles: Partial<ParsedStyles>,
    preset: DesignPreset
  ): void {
    // Legacy 호출을 Context Pattern으로 변환
    const context: ParserContext = {
      config: {} as any, // 임시 - 필요시 추가
      preset,
      utils: {
        color: null as any,
        unit: null as any,
        spacing: null as any,
        typography: null as any
      }
    };
    
    this.applySizingStyle(parsedClass, styles, context);
  }

  /**
   * 크기 값을 변환합니다. (Context Pattern 버전)
   */
  private static convertSizeValue(value: string, isArbitrary: boolean, context: ParserContext, property?: string): string {
    if (isArbitrary) {
      return value; // 임의값은 그대로 반환
    }
    
    // 분수 처리 (예: 1/2)
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/');
      const percentage = (parseInt(numerator) / parseInt(denominator)) * 100;
      return `${percentage}%`;
    }
    
    // 특수 값들
    switch (value) {
      case '0': return '0px';
      case 'px': return '1px';
      case 'auto': return 'auto';
      case 'full': return '100%';
      case 'screen':
        // width인 경우 viewport width, height인 경우 viewport height
        if (property === 'w' || property === 'min-w' || property === 'max-w') {
          return '100vw';
        }
        return '100vh';
      case 'svh': return '100svh';
      case 'lvh': return '100lvh';
      case 'dvh': return '100dvh';
      case 'min': return 'min-content';
      case 'max': return 'max-content';
      case 'fit': return 'fit-content';
      case 'none': return 'none';
    }
    
    // 숫자 값을 rem으로 변환 (Tailwind 표준: 4 = 1rem)
    if (/^\d+(\.\d+)?$/.test(value)) {
      const numValue = parseFloat(value);
      if (numValue === 0) return '0px';
      return `${numValue / 4}rem`;
    }
    
    return value;
  }

  /**
   * Max Width 값을 변환합니다. (Context Pattern 버전)
   */
  private static convertMaxWidthValue(value: string, isArbitrary: boolean, context: ParserContext): string {
    if (isArbitrary) {
      return value;
    }
    
    // Max Width 특수 값들
    switch (value) {
      case 'none': return 'none';
      case 'xs': return '20rem';
      case 'sm': return '24rem';
      case 'md': return '28rem';
      case 'lg': return '32rem';
      case 'xl': return '36rem';
      case '2xl': return '42rem';
      case '3xl': return '48rem';
      case '4xl': return '56rem';
      case '5xl': return '64rem';
      case '6xl': return '72rem';
      case '7xl': return '80rem';
      case 'full': return '100%';
      case 'min': return 'min-content';
      case 'max': return 'max-content';
      case 'fit': return 'fit-content';
      case 'prose': return '65ch';
      default:
        return this.convertSizeValue(value, isArbitrary, context);
    }
  }

  /**
   * 주어진 클래스가 크기 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns 크기 관련 클래스 여부
   */
  static isSizingClass(className: string): boolean {
    return (
      className.startsWith('w-') ||
      className.startsWith('h-') ||
      className.startsWith('min-w-') ||
      className.startsWith('max-w-') ||
      className.startsWith('min-h-') ||
      className.startsWith('max-h-') ||
      className.startsWith('size-')
    );
  }

  /**
   * CSS 속성으로 변환합니다.
   * @param styles 크기 스타일
   * @returns CSS 속성
   */
  static toCSSProperties(styles: Record<string, any>): Record<string, string> {
    const css: Record<string, string> = {};

    if (styles.width) css['width'] = styles.width;
    if (styles.height) css['height'] = styles.height;
    if (styles.minWidth) css['min-width'] = styles.minWidth;
    if (styles.maxWidth) css['max-width'] = styles.maxWidth;
    if (styles.minHeight) css['min-height'] = styles.minHeight;
    if (styles.maxHeight) css['max-height'] = styles.maxHeight;
    
    // size property sets both width and height
    if (styles.size) {
      css['width'] = styles.size;
      css['height'] = styles.size;
    }

    return css;
  }
} 
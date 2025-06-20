/**
 * Color Parser - 색상 관련 CSS 속성 파서
 * 
 * text, background, border 등의 색상 관련 속성을 처리합니다.
 */

import { ParsedClass, ColorStyles, DesignPreset } from '../../types';

export class ColorParser {
  /**
   * 표준 인터페이스: 클래스가 color 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // text-[색상값] 패턴 (typography가 아닌 색상)
    const textArbitraryMatch = className.match(/^text-\[(.+)\]$/);
    if (textArbitraryMatch) {
      return this.isColorValue(textArbitraryMatch[1]);
    }

    // bg-[색상값] 패턴
    const bgArbitraryMatch = className.match(/^bg-\[(.+)\]$/);
    if (bgArbitraryMatch) {
      return this.isColorValue(bgArbitraryMatch[1]);
    }

    // border-[색상값] 패턴 (단순 색상만, border-width는 제외)
    const borderArbitraryMatch = className.match(/^border-\[(.+)\]$/);
    if (borderArbitraryMatch) {
      return this.isColorValue(borderArbitraryMatch[1]);
    }

    // 색상 관련 접두사 패턴
    const patterns = [
      /^text-[a-z]+-\d+$/, // text-blue-500, text-red-300
      /^text-(black|white|transparent|current)$/, // 기본 색상
      /^bg-[a-z]+-\d+$/, // bg-red-500, bg-blue-300
      /^bg-(black|white|transparent|current)$/, // 기본 배경 색상
      /^border-[a-z]+-\d+$/, // border-red-500, border-blue-300 (색상만)
      /^border-(black|white|transparent|current)$/, // 기본 테두리 색상
      /^(accent|caret|decoration|divide|fill|outline|placeholder|ring|shadow|stroke)-/, // 다른 색상 속성들
    ];

    return patterns.some(pattern => pattern.test(className));
  }

  /**
   * 표준 인터페이스: color 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    // 임의 값 처리
    const arbitraryMatch = className.match(/^(.+?)-\[(.+)\]$/);
    if (arbitraryMatch) {
      return {
        property: arbitraryMatch[1],
        value: arbitraryMatch[2],
        isArbitrary: true
      };
    }

    // border-색상 특수 처리 (border-green-500 -> property: border, value: green-500)
    if (className.startsWith('border-')) {
      const borderMatch = className.match(/^border(-[tlbr])?(-[xy])?-(.+)$/);
      if (borderMatch) {
        const direction = (borderMatch[1] || '') + (borderMatch[2] || '');
        const colorValue = borderMatch[3];
        return {
          property: `border${direction}`,
          value: colorValue,
          isArbitrary: false
        };
      }
    }

    // 일반 색상 클래스 처리 (text-blue-500, bg-red-500)
    if (className.startsWith('text-')) {
      const value = className.substring(5); // Remove 'text-'
      return {
        property: 'text',
        value: value,
        isArbitrary: false
      };
    }

    if (className.startsWith('bg-')) {
      const value = className.substring(3); // Remove 'bg-'
      return {
        property: 'bg',
        value: value,
        isArbitrary: false
      };
    }

    // 기타 색상 클래스 처리
    const lastDashIndex = className.lastIndexOf('-');
    if (lastDashIndex === -1) {
      return null;
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
   * 값이 색상 값인지 확인합니다.
   */
  private static isColorValue(value: string): boolean {
    // HEX 색상 (#FF0000, #F00)
    if (/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value)) {
      return true;
    }
    
    // RGB/RGBA 함수
    if (/^rgba?\(/.test(value)) {
      return true;
    }
    
    // HSL/HSLA 함수
    if (/^hsla?\(/.test(value)) {
      return true;
    }
    
    // 색상 키워드
    const colorKeywords = [
      'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'gray', 'grey', 'black', 'white',
      'transparent', 'current', 'inherit', 'initial', 'unset'
    ];
    
    return colorKeywords.includes(value.toLowerCase());
  }

  /**
   * 색상 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋
   */
  static applyColorStyle(
    parsedClass: ParsedClass, 
    styles: { colors?: ColorStyles }, 
    preset: DesignPreset
  ): void {
    const { property, value, isArbitrary } = parsedClass;
    
    if (!styles.colors) {
      styles.colors = {};
    }
    
    // 속성명 매핑
    let colorProperty: keyof ColorStyles;
    switch (property) {
      case 'text':
        colorProperty = 'text';
        break;
      case 'bg':
        colorProperty = 'background';
        break;
      case 'border':
        colorProperty = 'border';
        break;
      default:
        colorProperty = property as keyof ColorStyles;
    }
    
    // 임의 값 처리
    if (isArbitrary) {
      // 임의 색상 값 처리 (예: text-[#FF0000])
      const color = this.parseArbitraryColor(value);
      if (color) {
        styles.colors[colorProperty] = color;
      }
      return;
    }
    
    // 프리셋 색상 처리 (예: text-blue-500)
    if (value.includes('-')) {
      const [colorName, shade] = value.split('-');
      const colorPalette = preset.colors[colorName];
      
      if (colorPalette && colorPalette[shade]) {
        styles.colors[colorProperty] = colorPalette[shade];
      }
    } else {
      // 단일 색상 이름 처리 (예: red, blue, brand)
      const colorData = preset.colors[value];
      if (colorData) {
        // 색상 팔레트인 경우 (예: { '500': { r: 0.1, g: 0.2, b: 0.8 } })
        if (colorData['500']) {
          styles.colors[colorProperty] = colorData['500'];
        }
        // 직접 색상 객체인 경우 (예: { r: 0.1, g: 0.2, b: 0.8 })
        else if (typeof colorData === 'object' && 'r' in colorData && 'g' in colorData && 'b' in colorData) {
          styles.colors[colorProperty] = colorData as unknown as { r: number; g: number; b: number; a?: number };
        }
      }
    }
  }

  /**
   * 임의 색상 값을 파싱합니다.
   * @param value 임의 색상 값
   * @returns 색상 객체
   */
  private static parseArbitraryColor(value: string): { r: number; g: number; b: number; a?: number } | undefined {
    // HEX 색상 처리
    if (value.startsWith('#')) {
      return this.hexToRgb(value);
    }
    
    // RGB/RGBA 색상 처리
    if (value.startsWith('rgb')) {
      return this.rgbToColor(value);
    }
    
    return undefined;
  }

  /**
   * HEX 색상을 RGB 색상으로 변환합니다.
   * @param hex HEX 색상
   * @returns RGB 색상 객체
   */
  private static hexToRgb(hex: string): { r: number; g: number; b: number; a?: number } {
    // #RGB 또는 #RGBA 형식
    if (hex.length === 4 || hex.length === 5) {
      const r = parseInt(hex[1] + hex[1], 16) / 255;
      const g = parseInt(hex[2] + hex[2], 16) / 255;
      const b = parseInt(hex[3] + hex[3], 16) / 255;
      const a = hex.length === 5 ? parseInt(hex[4] + hex[4], 16) / 255 : undefined;
      
      return { r, g, b, ...(a !== undefined && { a }) };
    }
    
    // #RRGGBB 또는 #RRGGBBAA 형식
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const a = hex.length >= 9 ? parseInt(hex.slice(7, 9), 16) / 255 : undefined;
    
    return { r, g, b, ...(a !== undefined && { a }) };
  }

  /**
   * RGB/RGBA 색상 문자열을 색상 객체로 변환합니다.
   * @param rgb RGB/RGBA 색상 문자열
   * @returns 색상 객체
   */
  private static rgbToColor(rgb: string): { r: number; g: number; b: number; a?: number } {
    // 괄호 안의 값만 추출
    const values = rgb.match(/\(([^)]+)\)/)?.[1].split(',').map(v => parseFloat(v.trim()));
    
    if (!values || values.length < 3) {
      return { r: 0, g: 0, b: 0 };
    }
    
    const r = values[0] / 255;
    const g = values[1] / 255;
    const b = values[2] / 255;
    const a = values.length > 3 ? values[3] : undefined;
    
    return { r, g, b, ...(a !== undefined && { a }) };
  }
} 
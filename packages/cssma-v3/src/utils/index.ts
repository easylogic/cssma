/**
 * CSSMA-V3 통합 유틸리티 시스템
 * Tailwind CSS v4 스타일의 표준화된 처리 로직
 */

import { Config, DesignPreset, OKLCHColor, ColorPalette } from '../types';

/**
 * 색상 처리 유틸리티
 * OKLCH 색상 공간과 Tailwind v4 표준 지원
 */
export class ColorUtils {
  /**
   * 색상 이름을 실제 색상 값으로 변환
   */
  static getColorValue(colorName: string, preset: DesignPreset, config: Config): string {
    // CSS 함수나 hex 값인 경우 그대로 반환
    if (colorName.startsWith('#') || 
        colorName.startsWith('rgb(') || 
        colorName.startsWith('rgba(') ||
        colorName.startsWith('hsl(') ||
        colorName.startsWith('oklch(')) {
      return colorName;
    }

    // 기본 색상들
    if (colorName === 'transparent') return 'transparent';
    if (colorName === 'current') return 'currentColor';
    if (colorName === 'inherit') return 'inherit';
    if (colorName === 'black') return '#000000';
    if (colorName === 'white') return '#ffffff';

    // Tailwind 색상 패턴 파싱 (e.g., blue-500, red-200)
    const colorMatch = colorName.match(/^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\\d{2,3})$/);
    
    if (colorMatch && preset?.colors) {
      const [, colorFamily, shade] = colorMatch;
      const colorData = preset.colors[colorFamily]?.[shade];
      
      if (colorData) {
        if (typeof colorData === 'string') {
          return colorData;
        }
        // OKLCH 색상 데이터인 경우 변환
        if (typeof colorData === 'object' && 'l' in colorData) {
          return this.oklchToHex(colorData.l, colorData.c, colorData.h);
        }
      }
    }

    // 단일 색상명 (blue, red 등)
    if (preset?.colors?.[colorName]) {
      const colorData = preset.colors[colorName];
      if (typeof colorData === 'string') {
        return colorData;
      }
      // 기본 색조(500) 사용
      if (typeof colorData === 'object' && colorData['500']) {
        const defaultShade = colorData['500'];
        if (typeof defaultShade === 'string') {
          return defaultShade;
        }
        if (typeof defaultShade === 'object' && 'l' in defaultShade) {
          return this.oklchToHex(defaultShade.l, defaultShade.c, defaultShade.h);
        }
      }
    }

    // fallback: 원본 반환
    return colorName;
  }

  /**
   * OKLCH를 RGB로 변환
   */
  static oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
    // 간단한 OKLCH → RGB 변환 구현
    const radH = (h * Math.PI) / 180;
    const a = c * Math.cos(radH);
    const b = c * Math.sin(radH);
    
    // LAB → XYZ → sRGB 변환 (근사치)
    let r = l + 0.0778 * a - 0.0153 * b;
    let g = l - 0.1775 * a + 0.1484 * b;
    let blue = l - 0.1843 * a - 0.8404 * b;
    
    // 0-1 범위로 클램프
    r = Math.max(0, Math.min(1, r));
    g = Math.max(0, Math.min(1, g));
    blue = Math.max(0, Math.min(1, blue));
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(blue * 255)
    };
  }

  /**
   * OKLCH를 HEX로 변환
   */
  static oklchToHex(l: number, c: number, h: number): string {
    const { r, g, b } = this.oklchToRgb(l, c, h);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  /**
   * HEX를 OKLCH로 변환
   */
  static hexToOklch(hex: string): OKLCHColor {
    // 간단한 RGB → OKLCH 변환 (근사치)
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    // sRGB → LAB 변환 (근사치)
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const a = 0.5 * (r - g);
    const bb = 0.5 * (g - b);
    
    const c = Math.sqrt(a * a + bb * bb);
    const h = Math.atan2(bb, a) * (180 / Math.PI);
    
    return { l, c, h: h < 0 ? h + 360 : h };
  }

  /**
   * 색상 값 파싱
   */
  static parseColorValue(value: string): string {
    // 이미 처리된 색상 값인지 확인
    if (value.startsWith('#') || 
        value.startsWith('rgb') || 
        value.startsWith('hsl') ||
        value.startsWith('oklch') ||
        value === 'transparent' ||
        value === 'currentColor' ||
        value === 'inherit') {
      return value;
    }
    
    return value;
  }

  /**
   * CSS 변수 생성
   */
  static generateCSSVariables(colors: ColorPalette): Record<string, string> {
    const variables: Record<string, string> = {};
    
    Object.entries(colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'string') {
        variables[`--color-${colorName}`] = colorValue;
      } else if (typeof colorValue === 'object') {
        Object.entries(colorValue).forEach(([shade, shadeValue]) => {
          if (typeof shadeValue === 'string') {
            variables[`--color-${colorName}-${shade}`] = shadeValue;
          } else if (typeof shadeValue === 'object' && 'l' in shadeValue) {
            variables[`--color-${colorName}-${shade}`] = this.oklchToHex(shadeValue.l, shadeValue.c, shadeValue.h);
          }
        });
      }
    });
    
    return variables;
  }
}

/**
 * 단위 변환 유틸리티
 * px, rem, em 등의 단위 변환과 표준화
 */
export class UnitUtils {
  private static readonly PX_TO_REM_RATIO = 16; // 1rem = 16px

  /**
   * px를 rem으로 변환
   */
  static pxToRem(px: number): string {
    return `${px / this.PX_TO_REM_RATIO}rem`;
  }

  /**
   * rem을 px로 변환
   */
  static remToPx(rem: string): number {
    const value = parseFloat(rem.replace('rem', ''));
    return value * this.PX_TO_REM_RATIO;
  }

  /**
   * 간격 값 파싱
   */
  static parseSpacing(value: string, preset: DesignPreset): string {
    // 숫자인 경우 preset에서 조회
    if (/^\d+$/.test(value)) {
      const spacing = preset.spacing?.[value];
      if (spacing !== undefined) {
        return this.pxToRem(spacing);
      }
    }

    // 특수 값들
    if (value === 'auto') return 'auto';
    if (value === 'px') return '1px';
    
    // 분수 값 (예: 1/2, 3/4)
    if (value.includes('/')) {
      const [num, den] = value.split('/').map(Number);
      return `${(num / den) * 100}%`;
    }

    // 이미 단위가 있는 경우
    if (/\d+(px|rem|em|%|vh|vw)$/.test(value)) {
      // px인 경우 rem으로 변환
      if (value.endsWith('px')) {
        const pxValue = parseFloat(value);
        return this.pxToRem(pxValue);
      }
      return value;
    }

    return value;
  }

  /**
   * 폰트 크기 파싱
   */
  static parseFontSize(value: string | number, preset: DesignPreset): string {
    if (typeof value === 'number') {
      return this.pxToRem(value);
    }

    // preset에서 조회
    if (preset.typography?.fontSize?.[value]) {
      const fontSize = preset.typography.fontSize[value];
      if (typeof fontSize === 'number') {
        return this.pxToRem(fontSize);
      }
      if (typeof fontSize === 'object' && fontSize.fontSize) {
        return typeof fontSize.fontSize === 'number' 
          ? this.pxToRem(fontSize.fontSize)
          : fontSize.fontSize;
      }
    }

    // 직접 값인 경우
    if (typeof value === 'string') {
      if (value.endsWith('px')) {
        return this.pxToRem(parseFloat(value));
      }
      return value;
    }

    return value.toString();
  }

  /**
   * 행 높이 파싱
   */
  static parseLineHeight(value: string | number): string | number {
    if (typeof value === 'number') {
      return value; // 숫자는 비율로 그대로 사용
    }

    if (typeof value === 'string') {
      // 픽셀 값인 경우 rem으로 변환
      if (value.endsWith('px')) {
        return this.pxToRem(parseFloat(value));
      }
      
      // 숫자 문자열인 경우 숫자로 변환
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        return numValue;
      }
    }

    return value;
  }

  /**
   * 임의값 변환
   */
  static convertArbitraryValue(value: string, unit: 'px' | 'rem' | 'em' = 'rem'): string {
    // 이미 단위가 있는 경우 그대로 반환
    if (/\d+(px|rem|em|%|vh|vw|ch|ex)$/.test(value)) {
      return value;
    }

    // 숫자만 있는 경우 지정된 단위 추가
    if (/^\d+(\.\d+)?$/.test(value)) {
      const numValue = parseFloat(value);
      switch (unit) {
        case 'rem':
          return this.pxToRem(numValue);
        case 'px':
          return `${numValue}px`;
        case 'em':
          return `${numValue}em`;
        default:
          return value;
      }
    }

    return value;
  }
}

/**
 * 간격 처리 유틸리티
 * padding, margin, gap 등의 간격 관련 처리
 */
export class SpacingUtils {
  /**
   * 간격 값 조회
   */
  static getSpacingValue(key: string, preset: DesignPreset): string {
    return UnitUtils.parseSpacing(key, preset);
  }

  /**
   * 간격 방향성 파싱
   */
  static parseSpacingDirection(property: string, value: string): Record<string, string> {
    const spacingValue = value;
    
    // 방향성 접두사 파싱
    if (property.endsWith('t')) { // top
      return { top: spacingValue };
    }
    if (property.endsWith('r')) { // right
      return { right: spacingValue };
    }
    if (property.endsWith('b')) { // bottom
      return { bottom: spacingValue };
    }
    if (property.endsWith('l')) { // left
      return { left: spacingValue };
    }
    if (property.endsWith('x')) { // horizontal
      return { left: spacingValue, right: spacingValue };
    }
    if (property.endsWith('y')) { // vertical
      return { top: spacingValue, bottom: spacingValue };
    }
    if (property.endsWith('s')) { // start (logical)
      return { inlineStart: spacingValue };
    }
    if (property.endsWith('e')) { // end (logical)
      return { inlineEnd: spacingValue };
    }
    
    // 전체 방향
    return {
      top: spacingValue,
      right: spacingValue,
      bottom: spacingValue,
      left: spacingValue
    };
  }

  /**
   * 간격을 CSS 속성으로 변환
   */
  static convertSpacingToCSS(spacing: any): Record<string, string> {
    const css: Record<string, string> = {};
    
    if (spacing.padding) {
      Object.entries(spacing.padding).forEach(([key, value]) => {
        css[`padding-${key}`] = value as string;
      });
    }
    
    if (spacing.margin) {
      Object.entries(spacing.margin).forEach(([key, value]) => {
        css[`margin-${key}`] = value as string;
      });
    }
    
    if (spacing.gap) {
      if (spacing.gap.row) css['row-gap'] = spacing.gap.row;
      if (spacing.gap.column) css['column-gap'] = spacing.gap.column;
      if (spacing.gap.all) css['gap'] = spacing.gap.all;
    }
    
    if (spacing.space) {
      Object.entries(spacing.space).forEach(([key, value]) => {
        css[`--space-${key}`] = value as string;
      });
    }
    
    return css;
  }
}

/**
 * 타이포그래피 처리 유틸리티
 * 폰트 크기, 행 높이, 폰트 패밀리 등 텍스트 관련 처리
 */
export class TypographyUtils {
  /**
   * 폰트 크기 조회
   */
  static getFontSize(size: string, preset: DesignPreset): { fontSize: string; lineHeight?: number } {
    const fontSize = UnitUtils.parseFontSize(size, preset);
    
    // preset에서 lineHeight도 함께 조회
    if (preset.typography?.fontSize?.[size]) {
      const fontConfig = preset.typography.fontSize[size];
      if (typeof fontConfig === 'object' && fontConfig.lineHeight) {
        return {
          fontSize,
          lineHeight: typeof fontConfig.lineHeight === 'number'
            ? fontConfig.lineHeight
            : parseFloat(fontConfig.lineHeight.toString())
        };
      }
    }
    
    return { fontSize };
  }

  /**
   * 폰트 패밀리 조회
   */
  static getFontFamily(family: string, preset: DesignPreset): string {
    if (preset.typography?.fontFamily?.[family]) {
      const fontFamily = preset.typography.fontFamily[family];
      if (Array.isArray(fontFamily)) {
        return fontFamily.join(', ');
      }
      return fontFamily;
    }
    
    return family;
  }

  /**
   * 텍스트 변환 파싱
   */
  static parseTextTransform(value: string): string {
    const transforms: Record<string, string> = {
      'uppercase': 'uppercase',
      'lowercase': 'lowercase',
      'capitalize': 'capitalize',
      'normal-case': 'none'
    };
    
    return transforms[value] || value;
  }

  /**
   * 텍스트 정렬 파싱
   */
  static parseTextAlign(value: string): string {
    const alignments: Record<string, string> = {
      'left': 'left',
      'center': 'center',
      'right': 'right',
      'justify': 'justify',
      'start': 'start',
      'end': 'end'
    };
    
    return alignments[value] || value;
  }
}

/**
 * 파서 컨텍스트 생성 헬퍼
 */
export function createParserContext(config: Config, preset: DesignPreset) {
  return {
    config,
    preset,
    utils: {
      color: ColorUtils,
      unit: UnitUtils,
      spacing: SpacingUtils,
      typography: TypographyUtils
    }
  };
} 
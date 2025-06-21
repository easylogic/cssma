/**
 * Unified Color Parser - 통합 색상 파서
 * 
 * Tailwind CSS v4.1의 완전한 색상 시스템을 지원합니다:
 * - 완전한 색상 팔레트 (17개 색상 + 5개 중성색)
 * - 11단계 색상 스케일 (50-950)
 * - 투명도 지원 (/50, /75 등)
 * - 임의 색상 값 ([#FF0000], [rgb(255,0,0)] 등)
 * - 모든 색상 유틸리티 (text, bg, border, ring, outline, accent, caret 등)
 */

import { 
  ParsedClass, 
  ParsedStyles, 
  DesignPreset,
  ColorValue
} from '../../types';

// Tailwind CSS v4.1 기본 색상 팔레트
const TAILWIND_COLORS = {
  // 중성색
  slate: true, gray: true, zinc: true, neutral: true, stone: true,
  // 크로매틱 색상  
  red: true, orange: true, amber: true, yellow: true, lime: true,
  green: true, emerald: true, teal: true, cyan: true, sky: true,
  blue: true, indigo: true, violet: true, purple: true, fuchsia: true,
  pink: true, rose: true,
  // 특수 색상
  black: true, white: true, transparent: true, current: true
};

// 색상 스케일 (50-950)
const COLOR_SCALES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

// 투명도 값 매핑
const OPACITY_VALUES: Record<string, number> = {
  '0': 0, '5': 0.05, '10': 0.1, '20': 0.2, '25': 0.25, '30': 0.3,
  '40': 0.4, '50': 0.5, '60': 0.6, '70': 0.7, '75': 0.75, '80': 0.8,
  '90': 0.9, '95': 0.95, '100': 1
};

export class ColorParser {
  /**
   * 클래스가 색상 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // 투명도가 포함된 색상 클래스 처리
    const opacityMatch = className.match(/^(.+)\/(\d+)$/);
    if (opacityMatch) {
      const baseClass = opacityMatch[1];
      const opacity = opacityMatch[2];
      
      // 투명도 값이 유효한지 확인
      if (!OPACITY_VALUES[opacity]) return false;
      
      // 기본 클래스가 색상 클래스인지 확인
      return this.isBaseColorClass(baseClass);
    }

    return this.isBaseColorClass(className);
  }

  /**
   * 기본 색상 클래스인지 확인합니다 (투명도 제외).
   */
  private static isBaseColorClass(className: string): boolean {
    // 임의 색상 값 패턴
    const arbitraryPatterns = [
      /^(text|bg|border|ring|outline|accent|caret|decoration|divide|fill|stroke|shadow)-\[(.+)\]$/,
      /^border-([trblxy])-\[(.+)\]$/, // border-t-[#ff0000]
      /^border-([trbl])-([xy])-\[(.+)\]$/ // border-t-x-[#ff0000] (미래 확장)
    ];

    for (const pattern of arbitraryPatterns) {
      const match = className.match(pattern);
      if (match) {
        const value = match[match.length - 1]; // 마지막 캡처 그룹이 색상 값
        return this.isColorValue(value);
      }
    }

    // 프리셋 색상 패턴들
    const presetPatterns = [
      // 기본 색상 유틸리티
      /^(text|bg|border|ring|outline|accent|caret|decoration|divide|fill|stroke|shadow)-([a-z]+)-(\d+)$/,
      /^(text|bg|border|ring|outline|accent|caret|decoration|divide|fill|stroke|shadow)-(black|white|transparent|current)$/,
      
      // 방향성 border 색상
      /^border-([trbl])-([a-z]+)-(\d+)$/,
      /^border-([trbl])-(black|white|transparent|current)$/,
      /^border-([xy])-([a-z]+)-(\d+)$/,
      /^border-([xy])-(black|white|transparent|current)$/,
      
      // Ring 색상 (focus states)
      /^ring-offset-([a-z]+)-(\d+)$/,
      /^ring-offset-(black|white|transparent|current)$/,
      
      // Placeholder 색상
      /^placeholder-([a-z]+)-(\d+)$/,
      /^placeholder-(black|white|transparent|current)$/,
      
      // Selection 색상
      /^selection-([a-z]+)-(\d+)$/,
      /^selection-(black|white|transparent|current)$/
    ];

    for (const pattern of presetPatterns) {
      const match = className.match(pattern);
      if (match) {
        const colorName = match[match.length - 2]; // 색상 이름
        const scaleOrSpecial = match[match.length - 1]; // 스케일이나 특수값
        
        // 특수 색상인 경우 (black, white, transparent, current)
        if (['black', 'white', 'transparent', 'current'].includes(scaleOrSpecial)) {
          return true;
        }
        
        // 일반 색상인 경우 색상명과 스케일 검증
        return TAILWIND_COLORS[colorName as keyof typeof TAILWIND_COLORS] && 
               COLOR_SCALES.includes(scaleOrSpecial);
      }
    }

    return false;
  }

  /**
   * 색상 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
    opacity?: number;
  } | null {
    // 투명도가 포함된 클래스 처리
    const opacityMatch = className.match(/^(.+)\/(\d+)$/);
    let baseClassName = className;
    let opacity: number | undefined;
    
    if (opacityMatch) {
      baseClassName = opacityMatch[1];
      opacity = OPACITY_VALUES[opacityMatch[2]];
      if (!opacity && opacity !== 0) return null; // 유효하지 않은 투명도
    }

    // 임의 값 처리
    const arbitraryMatch = baseClassName.match(/^(.+?)-\[(.+)\]$/);
    if (arbitraryMatch) {
      const property = arbitraryMatch[1];
      const value = arbitraryMatch[2];
      
      // 방향성 속성 처리 (border-t, border-x 등)
      const directionMatch = property.match(/^(border)-([trblxy])$/);
      if (directionMatch) {
        return {
          property: `${directionMatch[1]}-${directionMatch[2]}`,
          value: value,
          isArbitrary: true,
          opacity
        };
      }
      
      return {
        property: property,
        value: value,
        isArbitrary: true,
        opacity
      };
    }

    // 프리셋 색상 처리
    const patterns = [
      // 기본 패턴: text-blue-500, bg-red-300
      /^(text|bg|border|ring|outline|accent|caret|decoration|divide|fill|stroke|shadow)-(.+)$/,
      // 방향성 border: border-t-blue-500, border-x-red-300
      /^(border)-([trblxy])-(.+)$/,
      // Ring offset: ring-offset-blue-500
      /^(ring-offset)-(.+)$/,
      // Placeholder: placeholder-gray-400
      /^(placeholder)-(.+)$/,
      // Selection: selection-blue-200
      /^(selection)-(.+)$/
    ];

    for (const pattern of patterns) {
      const match = baseClassName.match(pattern);
      if (match) {
        let property: string;
        let value: string;
        
        if (match[3]) {
          // 3개 그룹 매치 (방향성 속성)
          property = `${match[1]}-${match[2]}`;
          value = match[3];
        } else {
          // 2개 그룹 매치 (기본 속성)
          property = match[1];
          value = match[2];
        }
        
        return {
          property: property,
          value: value,
          isArbitrary: false,
          opacity
        };
      }
    }

    return null;
  }

  /**
   * 값이 유효한 색상 값인지 확인합니다.
   */
  private static isColorValue(value: string): boolean {
    // HEX 색상 (#FF0000, #F00, #FF000080)
    if (/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value)) {
      return true;
    }
    
    // RGB/RGBA 함수
    if (/^rgba?\([\d\s,.%]+\)$/.test(value)) {
      return true;
    }
    
    // HSL/HSLA 함수  
    if (/^hsla?\([\d\s,.%deg]+\)$/.test(value)) {
      return true;
    }

    // OKLCH 함수 (Tailwind v4.1)
    if (/^oklch\([\d\s,.%]+\)$/.test(value)) {
      return true;
    }

    // P3 색상 (Tailwind v4.1)
    if (/^color\(display-p3[\d\s,.]+\)$/.test(value)) {
      return true;
    }
    
    // CSS 색상 키워드
    const colorKeywords = [
      'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black',
      'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
      'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue',
      'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki',
      'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon',
      'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise',
      'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick',
      'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod',
      'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo',
      'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue',
      'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey',
      'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray',
      'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen',
      'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
      'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise',
      'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
      'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
      'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink',
      'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon',
      'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
      'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle',
      'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen',
      'transparent', 'current', 'inherit', 'initial', 'unset'
    ];
    
    return colorKeywords.includes(value.toLowerCase());
  }

  /**
   * 색상 스타일을 적용합니다.
   */
  static applyColorStyle(
    parsedClass: ParsedClass, 
    styles: Partial<ParsedStyles>, 
    preset: DesignPreset
  ): void {
    const result = this.parseValue(parsedClass.original);
    if (!result) return;

    const { property, value, isArbitrary, opacity } = result;
    
    // 색상 값 처리
    let colorValue: ColorValue;
    
    if (isArbitrary) {
      // 임의 색상 값 처리
      colorValue = this.parseArbitraryColor(value, opacity);
    } else {
      // 프리셋 색상 처리
      colorValue = this.parsePresetColor(value, preset, opacity);
    }

    if (!colorValue) return;

    // 속성별로 적절한 스타일 카테고리에 적용
    this.applyColorToCategory(property, colorValue, styles);
  }

  /**
   * 색상을 적절한 카테고리에 적용합니다.
   */
  private static applyColorToCategory(
    property: string, 
    color: ColorValue, 
    styles: Partial<ParsedStyles>
  ): void {
    // Text 색상
    if (property === 'text') {
      if (!styles.typography) styles.typography = {};
      styles.typography.color = color;
      return;
    }

    // Background 색상
    if (property === 'bg') {
      if (!styles.backgrounds) styles.backgrounds = {};
      styles.backgrounds.backgroundColor = color;
      return;
    }

    // Border 색상
    if (property.startsWith('border')) {
      if (!styles.borders) styles.borders = {};
      
      // 방향성 border 처리
      const directionMatch = property.match(/^border-([trblxy])$/);
      if (directionMatch) {
        const direction = directionMatch[1];
        switch (direction) {
          case 't': styles.borders.borderTopColor = color; break;
          case 'r': styles.borders.borderRightColor = color; break;
          case 'b': styles.borders.borderBottomColor = color; break;
          case 'l': styles.borders.borderLeftColor = color; break;
          case 'x': 
            styles.borders.borderLeftColor = color;
            styles.borders.borderRightColor = color;
            break;
          case 'y':
            styles.borders.borderTopColor = color;
            styles.borders.borderBottomColor = color;
            break;
        }
      } else {
        // 전체 border 색상
        styles.borders.borderColor = color;
      }
      return;
    }

    // Ring 색상 (focus outlines)
    if (property === 'ring') {
      if (!styles.effects) styles.effects = {};
      styles.effects.ringColor = color;
      return;
    }

    // Ring offset 색상
    if (property === 'ring-offset') {
      if (!styles.effects) styles.effects = {};
      styles.effects.ringOffsetColor = color;
      return;
    }

    // Outline 색상
    if (property === 'outline') {
      if (!styles.effects) styles.effects = {};
      styles.effects.outlineColor = color;
      return;
    }

    // Accent 색상 (form controls)
    if (property === 'accent') {
      if (!styles.effects) styles.effects = {};
      styles.effects.accentColor = color;
      return;
    }

    // Caret 색상 (text cursor)
    if (property === 'caret') {
      if (!styles.effects) styles.effects = {};
      styles.effects.caretColor = color;
      return;
    }

    // 기타 색상 속성들을 effects에 추가
    if (!styles.effects) styles.effects = {};
    (styles.effects as any)[`${property}Color`] = color;
  }

  /**
   * 임의 색상 값을 파싱합니다.
   */
  private static parseArbitraryColor(value: string, opacity?: number): ColorValue {
    // HEX 색상 처리
    if (value.startsWith('#')) {
      const color = this.hexToRgb(value);
      if (opacity !== undefined) {
        return { ...color, a: opacity };
      }
      return color;
    }

    // RGB/RGBA 처리
    if (value.startsWith('rgb')) {
      const color = this.rgbStringToColor(value);
      if (opacity !== undefined && color && typeof color === 'object') {
        return { ...color, a: opacity };
      }
      return color;
    }

    // HSL 처리
    if (value.startsWith('hsl')) {
      // HSL을 RGB로 변환 (기본 구현)
      return value; // 문자열로 반환 (나중에 CSS로 처리)
    }

    // 기타 CSS 색상 함수들 (OKLCH, P3 등)
    if (value.includes('(') && value.includes(')')) {
      return value; // CSS 함수 그대로 반환
    }

    // 색상 키워드
    return value;
  }

  /**
   * 프리셋 색상을 파싱합니다.
   */
  private static parsePresetColor(
    value: string, 
    preset: DesignPreset, 
    opacity?: number
  ): ColorValue {
    // 특수 색상 처리
    const specialColors: Record<string, ColorValue> = {
      'black': { r: 0, g: 0, b: 0 },
      'white': { r: 1, g: 1, b: 1 },
      'transparent': { r: 0, g: 0, b: 0, a: 0 },
      'current': 'currentColor'
    };

    if (specialColors[value]) {
      const color = specialColors[value];
      if (opacity !== undefined && typeof color === 'object' && 'r' in color) {
        return { ...color, a: opacity };
      }
      return color;
    }

    // 색상-스케일 형태 처리 (blue-500, red-300 등)
    const dashIndex = value.lastIndexOf('-');
    if (dashIndex === -1) {
      // 단일 색상 이름인 경우 기본 500 스케일 사용
      const colorData = preset.colors[value];
      if (colorData && typeof colorData === 'object' && '500' in colorData) {
        const color = colorData['500'];
        if (opacity !== undefined && typeof color === 'object' && 'r' in color) {
          return { ...color, a: opacity };
        }
        return color;
      }
      return value; // 문자열로 반환
    }

    const colorName = value.slice(0, dashIndex);
    const scale = value.slice(dashIndex + 1);
    
    const colorPalette = preset.colors[colorName];
    if (colorPalette && typeof colorPalette === 'object' && scale in colorPalette) {
      const color = colorPalette[scale];
      if (opacity !== undefined && typeof color === 'object' && 'r' in color) {
        return { ...color, a: opacity };
      }
      return color;
    }

    // 프리셋에 없는 경우 문자열로 반환 (CSS 변수 등)
    return value;
  }

  /**
   * HEX 색상을 RGB로 변환합니다.
   */
  private static hexToRgb(hex: string): { r: number; g: number; b: number; a?: number } {
    // #을 제거
    hex = hex.replace('#', '');
    
    // 3자리 HEX를 6자리로 변환
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    
    // 8자리 HEX (알파 포함)
    if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      const a = parseInt(hex.slice(6, 8), 16) / 255;
      return { r, g, b, a };
    }
    
    // 6자리 HEX
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      return { r, g, b };
    }
    
    // 잘못된 형식인 경우 검은색 반환
    return { r: 0, g: 0, b: 0 };
  }

  /**
   * RGB 문자열을 색상 객체로 변환합니다.
   */
  private static rgbStringToColor(rgb: string): { r: number; g: number; b: number; a?: number } | string {
    const match = rgb.match(/rgba?\(([^)]+)\)/);
    if (!match) return rgb;
    
    const values = match[1].split(',').map(v => v.trim());
    
    if (values.length >= 3) {
      const r = parseInt(values[0]) / 255;
      const g = parseInt(values[1]) / 255;
      const b = parseInt(values[2]) / 255;
      
      if (values.length === 4) {
        const a = parseFloat(values[3]);
        return { r, g, b, a };
      }
      
      return { r, g, b };
    }
    
    return rgb; // 파싱 실패시 원본 반환
  }
} 
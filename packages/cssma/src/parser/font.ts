import { ParsedStyle } from '../types';

const FONT_FAMILY_MAP = {
  'sans': 'Inter',
  'serif': 'Georgia',
  'mono': 'Roboto Mono'
} as const;

const FONT_WEIGHT_MAP = {
  'thin': 100,
  'extralight': 200,
  'light': 300,
  'normal': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700,
  'extrabold': 800,
  'black': 900
} as const;

const FONT_STYLE_MAP = {
  'italic': 'italic',
  'not-italic': 'normal'
} as const;

// 현재 폰트 상태를 추적하는 클래스
export class FontState {
  private family: string = 'Inter';
  private style: string = 'Regular';

  setFamily(family: string) {
    this.family = family;
  }

  setStyle(style: string) {
    this.style = style;
  }

  getFontName() {
    return {
      family: this.family,
      style: this.style
    };
  }
}

export function parseFontStyleValue(className: string): ParsedStyle | null {
  // 임의값 처리 ([...] 형식)
  if (className.includes('[') && className.includes(']')) {
    const match = className.match(/^([a-z-]+)-\[(.*?)\]$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // 폰트 패밀리 처리
    if (type === 'font') {
      if (!value.trim()) {
        return null;
      }
      return {
        property: 'fontFamily',
        value: value,
        variant: 'arbitrary'
      };
    }
  }

  // 프리셋 값 처리
  if (className.startsWith('font-')) {
    const value = className.replace('font-', '');

    // 빈 값 체크
    if (!value) {
      return null;
    }

    // Font weight
    if (value in FONT_WEIGHT_MAP) {
      return {
        property: 'fontWeight',
        value: FONT_WEIGHT_MAP[value as keyof typeof FONT_WEIGHT_MAP],
        variant: 'preset'
      };
    }

    // Font family
    if (value in FONT_FAMILY_MAP) {
      return {
        property: 'fontFamily',
        value: FONT_FAMILY_MAP[value as keyof typeof FONT_FAMILY_MAP],
        variant: 'preset'
      };
    }

    // 임의의 폰트 패밀리 처리 (font-roboto 등)
    const firstChar = value.charAt(0).toUpperCase();
    const restChars = value.slice(1);
    const fontFamily = firstChar + restChars;
    return {
      property: 'fontFamily',
      value: fontFamily,
      variant: 'preset'
    };
  }

  // Font style
  if (className in FONT_STYLE_MAP) {
    return {
      property: 'fontStyle',
      value: FONT_STYLE_MAP[className as keyof typeof FONT_STYLE_MAP],
      variant: 'preset'
    };
  }

  return null;
} 
import { ParsedStyle } from '../types';

const FONT_FAMILY_MAP = {
  'sans': { family: 'Inter', style: 'Regular' },
  'serif': { family: 'Georgia', style: 'Regular' },
  'mono': { family: 'Roboto Mono', style: 'Regular' }
} as const;

const FONT_WEIGHT_MAP = {
  'thin': { family: 'Inter', style: 'Thin' },
  'extralight': { family: 'Inter', style: 'ExtraLight' },
  'light': { family: 'Inter', style: 'Light' },
  'normal': { family: 'Inter', style: 'Regular' },
  'medium': { family: 'Inter', style: 'Medium' },
  'semibold': { family: 'Inter', style: 'SemiBold' },
  'bold': { family: 'Inter', style: 'Bold' },
  'extrabold': { family: 'Inter', style: 'ExtraBold' },
  'black': { family: 'Inter', style: 'Black' }
} as const;

const FONT_STYLE_MAP = {
  'italic': { family: 'Inter', style: 'Italic' },
  'not-italic': { family: 'Inter', style: 'Regular' }
} as const;

export function parseFontStyleValue(className: string): ParsedStyle | null {
  // 임의값 처리 ([...] 형식)
  if (className.includes('[') && className.includes(']')) {
    const match = className.match(/^([a-z-]+)-\[(.*?)\]$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // 폰트 패밀리 처리
    if (type === 'font') {
      // 빈 폰트 이름 체크
      if (!value.trim()) {
        return null;
      }
      return {
        property: 'fontName',
        value: { family: value, style: 'Regular' },
        variant: 'arbitrary'
      };
    }
  }

  // 프리셋 값 처리
  if (className.startsWith('font-')) {
    const value = className.replace('font-', '');

    // Font weight
    if (FONT_WEIGHT_MAP[value as keyof typeof FONT_WEIGHT_MAP]) {
      return {
        property: 'fontName',
        value: FONT_WEIGHT_MAP[value as keyof typeof FONT_WEIGHT_MAP],
        variant: 'preset'
      };
    }

    // Font family
    if (FONT_FAMILY_MAP[value as keyof typeof FONT_FAMILY_MAP]) {
      return {
        property: 'fontName',
        value: FONT_FAMILY_MAP[value as keyof typeof FONT_FAMILY_MAP],
        variant: 'preset'
      };
    }
  }

  // Font style
  if (FONT_STYLE_MAP[className as keyof typeof FONT_STYLE_MAP]) {
    return {
      property: 'fontName',
      value: FONT_STYLE_MAP[className as keyof typeof FONT_STYLE_MAP],
      variant: 'preset'
    };
  }

  return null;
} 
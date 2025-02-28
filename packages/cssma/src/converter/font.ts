import { ParsedStyle, FigmaStyleProperties } from '../types';
import { FONT_WEIGHTS, FONT_FAMILIES, VALID_FONT_STYLES } from '../constants';
import { isValidNumber } from '../utils/validators';

const DEFAULT_FONT_FAMILY = 'Inter';

interface FontState {
  family: string;
  weight: string;
  isItalic: boolean;
}

function getWeightName(weight: number): string {
  const weightMap: Record<number, string> = {
    100: 'Thin',
    200: 'ExtraLight',
    300: 'Light',
    400: 'Regular',
    500: 'Medium',
    600: 'SemiBold',
    700: 'Bold',
    800: 'ExtraBold',
    900: 'Black'
  };
  return weightMap[weight] || 'Regular';
}

function combineFontStyle(weight: string, isItalic: boolean): string {
  return `${weight}${isItalic ? ' Italic' : ''}`;
}

/**
 * Font 스타일을 Figma 스타일로 변환합니다.
 */
export function convertFontToFigma(styles: ParsedStyle | ParsedStyle[]): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};
  const styleArray = Array.isArray(styles) ? styles : [styles];

  // 단일 속성 처리
  if (styleArray.length === 1) {
    const style = styleArray[0];
    
    // fontName 단독 처리
    if (style.property === 'fontName') {
      if (typeof style.value === 'object' && style.value !== null) {
        const { family, style: fontStyle } = style.value as { family: string; style: string };
        return {
          fontName: { family, style: fontStyle }
        };
      }
      return {};
    }

    // fontWeight 단독 처리
    if (style.property === 'fontWeight') {
      if (typeof style.value === 'number' && isValidNumber(style.value, { min: 100, max: 900 })) {
        return { fontWeight: style.value };
      }
      return {};
    }
    
    // fontStyle 단독 처리
    if (style.property === 'fontStyle') {
      if (typeof style.value === 'string') {
        const normalizedStyle = style.value.toLowerCase();
        if (normalizedStyle === 'italic' || normalizedStyle === 'normal') {
          return { 
            fontStyle: normalizedStyle === 'italic' ? 'ITALIC' : 'NORMAL'
          };
        }
      }
      return {};
    }
  }

  const fontState: FontState = {
    family: DEFAULT_FONT_FAMILY,
    weight: 'Regular',
    isItalic: false
  };

  // 먼저 fontSize를 처리 (결합이 필요없는 속성)
  const fontSize = styleArray.find(s => s.property === 'fontSize');
  if (fontSize && typeof fontSize.value === 'number' && fontSize.value > 0) {
    result.fontSize = fontSize.value;
  }

  // fontName 속성이 있는지 먼저 확인
  const fontName = styleArray.find(s => s.property === 'fontName');
  if (fontName && typeof fontName.value === 'object' && fontName.value !== null) {
    const { family, style: fontStyle } = fontName.value as { family: string; style: string };
    result.fontName = { family, style: fontStyle };
    return result;
  }

  // 폰트 관련 속성들을 상태에 수집
  for (const style of styleArray) {
    switch (style.property) {
      case 'fontFamily':
        if (typeof style.value === 'string') {
          fontState.family = style.value in FONT_FAMILIES 
            ? FONT_FAMILIES[style.value as keyof typeof FONT_FAMILIES]
            : style.value;
        }
        break;

      case 'fontWeight':
        if (typeof style.value === 'number' && isValidNumber(style.value, { min: 100, max: 900 })) {
          fontState.weight = getWeightName(style.value);
        }
        break;

      case 'fontStyle':
        if (typeof style.value === 'string') {
          fontState.isItalic = style.value.toLowerCase() === 'italic';
        }
        break;
    }
  }

  // 수집된 상태를 바탕으로 fontName 객체 생성
  result.fontName = {
    family: fontState.family,
    style: combineFontStyle(fontState.weight, fontState.isItalic)
  };

  return result;
} 
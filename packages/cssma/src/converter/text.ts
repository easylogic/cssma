import { COLORS } from 'src/config/tokens';
import { ParsedStyle, FigmaStyleProperties, FigmaFontName, FigmaLineHeight, FigmaColor } from '../types';
import { parseColor } from 'src/utils/colors';

const TEXT_ALIGN_VALUES = ['LEFT', 'CENTER', 'RIGHT', 'JUSTIFIED'] as const;
type TextAlignValue = typeof TEXT_ALIGN_VALUES[number];

const TEXT_DECORATION_VALUES = ['UNDERLINE', 'STRIKETHROUGH', 'NONE'] as const;
type TextDecorationValue = typeof TEXT_DECORATION_VALUES[number];

/**
 * Text 스타일을 Figma 스타일로 변환합니다.
 */
export function convertTextToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  switch (style.property) {
    case 'color':
      if (typeof style.value === 'object') {
        result.fills = [{
          type: 'SOLID',
          color: style.value as FigmaColor
        }];
      } else if (typeof style.value === 'string') {
        const color = COLORS[style.value as keyof typeof COLORS] || parseColor(style.value);
        result.fills = [{
          type: 'SOLID',
          color: {
            r: color.r,
            g: color.g,
            b: color.b,
          },
          opacity: color.a
        }];
      }
    case 'fontSize':
      if (typeof style.value === 'number' && style.value > 0) {
        result.fontSize = style.value;
      }
      break;

    case 'fontName':
      if (typeof style.value === 'object' && 'family' in style.value) {
        const fontName = style.value as FigmaFontName;
        result.fontName = fontName;
      }
      break;

    case 'textAlignHorizontal':
      if (typeof style.value === 'string' && TEXT_ALIGN_VALUES.includes(style.value as TextAlignValue)) {
        result.textAlignHorizontal = style.value as TextAlignValue;
      }
      break;

    case 'textAlignVertical':
      if (typeof style.value === 'string') {
        result.textAlignVertical = style.value as 'TOP' | 'CENTER' | 'BOTTOM';
      }
      break;

    case 'letterSpacing':
      if (typeof style.value === 'number') {
        result.letterSpacing = style.value;
      } else if (typeof style.value === 'object' && 'value' in style.value && 'unit' in style.value) {
        result.letterSpacing = style.value;
      }
      break;

    case 'lineHeight':
      if (typeof style.value === 'object' && 'value' in style.value && 'unit' in style.value) {
        result.lineHeight = style.value;
      }
      break;

    case 'textDecoration':
      if (typeof style.value === 'string' && TEXT_DECORATION_VALUES.includes(style.value as TextDecorationValue)) {
        result.textDecoration = style.value as TextDecorationValue;
      }
      break;

    case 'textCase':
      if (typeof style.value === 'string') {
        result.textCase = style.value as 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
      }
      break;

    case 'textTransform':
      if (typeof style.value === 'string') {
        result.textTransform = style.value as 'NONE' | 'UPPER' | 'LOWER' | 'TITLE';
      }
      break;

    case 'fontStyle':
      if (typeof style.value === 'string') {
        result.fontStyle = style.value as 'NORMAL' | 'ITALIC';
      }
      break;

    case 'fontWeight':
      if (typeof style.value === 'number') {
        result.fontWeight = style.value;
      }
      break;
  }

  return result;
} 
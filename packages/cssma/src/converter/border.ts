import { ParsedStyle, FigmaStyleProperties, FigmaColor } from '../types';
import { BorderStyle, StrokeAlign } from '../types/constants';
import { isValidNumber } from '../utils/validators';
import { VALID_BORDER_STYLES, VALID_STROKE_ALIGN } from '../constants';
import { parseColor } from '../utils/colors';

/**
 * Border 스타일을 Figma 스타일로 변환합니다.
 */
export function convertBorderToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  switch (style.property) {
    case 'borderWidth':
      if (isValidNumber(style.value, { min: 0 })) {
        result.strokeWeight = style.value;
      }
      break;

    case 'borderColor':
      let color: FigmaColor | null = null;

      if (typeof style.value === 'string') {
        color = parseColor(style.value);
      } else if (typeof style.value === 'object' && style.value !== null) {
        const { r, g, b, a } = style.value as FigmaColor;
        if (isValidNumber(r, { min: 0, max: 1 }) && 
            isValidNumber(g, { min: 0, max: 1 }) && 
            isValidNumber(b, { min: 0, max: 1 }) &&
            (a === undefined || isValidNumber(a, { min: 0, max: 1 }))) {
          color = { r, g, b, a };
        }
      }

      if (color) {
        const stroke: any = {
          type: 'SOLID',
          color: { r: color.r, g: color.g, b: color.b }
        };

        if (isValidNumber(color.a)) {
          stroke.opacity = color.a;
        }

        result.strokes = [stroke];
      }
      break;

    case 'borderStyle':
      if (typeof style.value === 'string' && VALID_BORDER_STYLES.includes(style.value as BorderStyle)) {
        result.strokes = [{
          type: 'SOLID',  // Figma는 stroke type으로 'SOLID'만 지원
          color: { r: 0, g: 0, b: 0 }
        }];
      }
      break;

    case 'dashPattern':
      if (Array.isArray(style.value) && style.value.every(v => isValidNumber(v, { min: 0 }))) {
        result.dashPattern = style.value as number[];
      }
      break;

    case 'strokeAlign':
      if (typeof style.value === 'string' && VALID_STROKE_ALIGN.includes(style.value as StrokeAlign)) {
        result.strokeAlign = style.value as StrokeAlign;
      }
      break;

    case 'borderRadius':
      if (isValidNumber(style.value, { min: 0 })) {
        result.cornerRadius = style.value;
      }
      break;

    case 'borderRadiusTopLeft':
      if (isValidNumber(style.value, { min: 0 })) {
        result.topLeftRadius = style.value;
      }
      break;

    case 'borderRadiusTopRight':
      if (isValidNumber(style.value, { min: 0 })) {
        result.topRightRadius = style.value;
      }
      break;

    case 'borderRadiusBottomRight':
      if (isValidNumber(style.value, { min: 0 })) {
        result.bottomRightRadius = style.value;
      }
      break;

    case 'borderRadiusBottomLeft':
      if (isValidNumber(style.value, { min: 0 })) {
        result.bottomLeftRadius = style.value;
      }
      break;
  }

  return result;
} 
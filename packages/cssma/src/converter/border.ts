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
  const { property, value, variant, variableId } = style;

  switch (property) {
    case 'borderWidth':
      if (variant === 'figma-variable' && variableId) {
        result.strokeWeight = undefined;
        result.boundVariables = {
          strokeWeight: {
            type: 'VARIABLE_ALIAS',
            id: variableId
          }
        };
      } else if (isValidNumber(value, { min: 0 })) {
        result.strokeWeight = value;
      }
      break;

    case 'borderColor':
      if (variant === 'figma-variable' && variableId) {
        result.strokes = [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          boundVariables: {
            color: {
              type: 'VARIABLE_ALIAS',
              id: variableId
            }
          }
        }];
      } else {
        let color: FigmaColor | null = null;

        if (typeof value === 'string') {
          color = parseColor(value);
        } else if (typeof value === 'object' && value !== null) {
          const { r, g, b, a } = value as FigmaColor;
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
      }
      break;

    case 'borderRadius':
      if (variant === 'figma-variable' && variableId) {
        result.cornerRadius = undefined;
        result.boundVariables = {
          cornerRadius: {
            type: 'VARIABLE_ALIAS',
            id: variableId
          }
        };
      } else if (isValidNumber(value, { min: 0 })) {
        result.cornerRadius = value;
      }
      break;

    case 'borderRadiusTopLeft':
      if (variant === 'figma-variable' && variableId) {
        result.topLeftRadius = undefined;
        result.boundVariables = {
          topLeftRadius: {
            type: 'VARIABLE_ALIAS',
            id: variableId
          }
        };
      } else if (isValidNumber(value, { min: 0 })) {
        result.topLeftRadius = value;
      }
      break;

    case 'borderRadiusTopRight':
      if (isValidNumber(value, { min: 0 })) {
        result.topRightRadius = value;
      }
      break;

    case 'borderRadiusBottomRight':
      if (isValidNumber(value, { min: 0 })) {
        result.bottomRightRadius = value;
      }
      break;

    case 'borderRadiusBottomLeft':
      if (isValidNumber(value, { min: 0 })) {
        result.bottomLeftRadius = value;
      }
      break;

    case 'borderStyle':
      if (typeof value === 'string' && VALID_BORDER_STYLES.includes(value as BorderStyle)) {
        result.strokes = [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 }
        }];
      }
      break;

    case 'dashPattern':
      if (Array.isArray(value) && value.every(v => isValidNumber(v, { min: 0 }))) {
        result.dashPattern = value as number[];
      }
      break;

    case 'strokeAlign':
      if (typeof value === 'string' && VALID_STROKE_ALIGN.includes(value as StrokeAlign)) {
        result.strokeAlign = value as StrokeAlign;
      }
      break;
  }

  return result;
} 
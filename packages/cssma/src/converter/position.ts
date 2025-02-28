import { ParsedStyle, FigmaStyleProperties } from '../types';
import { PositionType } from '../types/constants';
import { VALID_POSITION_TYPES } from '../constants';
import { isValidNumber } from '../utils/validators';

/**
 * Position 스타일을 Figma 스타일로 변환합니다.
 */
export function convertPositionToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  switch (style.property) {
    case 'position':
      if (typeof style.value === 'string' && VALID_POSITION_TYPES.includes(style.value as PositionType)) {
        result.position = style.value as PositionType;
      }
      break;

    case 'x':
      if (isValidNumber(style.value)) {
        result.x = style.value;
        if (style.constraints?.horizontal) {
          result.constraints = {
            ...result.constraints,
            horizontal: style.constraints.horizontal
          };
        }
      }
      break;

    case 'y':
      if (isValidNumber(style.value)) {
        result.y = style.value;
        if (style.constraints?.vertical) {
          result.constraints = {
            ...result.constraints,
            vertical: style.constraints.vertical
          };
        }
      }
      break;

    case 'zIndex':
      if (isValidNumber(style.value) && style.value >= 0) {
        result.order = style.value;
      }
      break;
  }

  return result;
} 
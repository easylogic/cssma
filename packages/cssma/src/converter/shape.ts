import { ParsedStyle, FigmaStyleProperties } from '../types';
import { isValidNumber } from '../utils/validators';

export function convertShapeToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  switch (style.property) {
    case 'opacity':
      if (isValidNumber(style.value, { min: 0, max: 1 })) {
        result.opacity = style.value;
      }
      break;
  }

  return result;
} 
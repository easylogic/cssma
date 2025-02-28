import { ParsedStyle, FigmaStyleProperties } from '../types';
import { isValidNumber } from '../utils/validators';

/**
 * Filter 스타일을 Figma 스타일로 변환합니다.
 */
export function convertFilterToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  switch (style.property) {
    case 'blur':
      if (isValidNumber(style.value, { min: 0 })) {
        result.effects = [{
          type: 'LAYER_BLUR',
          radius: style.value,
          visible: true,
          blendMode: 'NORMAL'
        }];
      }
      break;

    case 'backdropBlur':
      if (isValidNumber(style.value, { min: 0 })) {
        result.effects = [{
          type: 'BACKGROUND_BLUR',
          radius: style.value,
          visible: true,
          blendMode: 'NORMAL'
        }];
      }
      break;
  }

  return result;
} 
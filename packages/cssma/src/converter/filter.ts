import { ParsedStyle, FigmaStyleProperties } from '../types';
import { isValidNumber } from '../utils/validators';
import { parseColor } from '../utils/colors';

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

    case 'dropShadow':
      if (typeof style.value === 'object' && style.value !== null) {
        const { offsetX, offsetY, blur, color } = style.value as any;
        
        if (isValidNumber(offsetX) && isValidNumber(offsetY) && isValidNumber(blur, { min: 0 })) {
          const parsedColor = parseColor(color);
          
          result.effects = [{
            type: 'DROP_SHADOW',
            offset: { x: offsetX, y: offsetY },
            radius: blur,
            color: parsedColor || { r: 0, g: 0, b: 0, a: 0.1 },
            visible: true,
            blendMode: 'NORMAL'
          }];
        }
      }
      break;
  }

  return result;
} 
import { ParsedStyle, FigmaStyleProperties } from '../types';
import { isValidNumber } from '../utils/validators';

export function convertAspectToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  if (style.property === 'aspectRatio' && 
      typeof style.value === 'number' && 
      isValidNumber(style.value, { min: 0.000001 })) { 
    
    result.layoutSizingHorizontal = 'FIXED';
    result.layoutSizingVertical = 'FIXED';
    result.width = 100; 
    result.height = 100 / style.value; 
  }

  return result;
} 
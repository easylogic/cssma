import { ParsedStyle, FigmaStyleProperties } from '../types';
import { isValidNumber } from '../utils/validators';

/**
 * Aspect ratio 스타일을 Figma 스타일로 변환합니다.
 */
export function convertAspectToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  if (style.property === 'aspectRatio' && 
      typeof style.value === 'number' && 
      isValidNumber(style.value, { min: 0.000001 })) { // 0이나 음수 제외
    // Figma에서는 width와 height의 비율로 처리
    result.layoutSizingHorizontal = 'FIXED';
    result.layoutSizingVertical = 'FIXED';
    result.width = 100; // 기본 너비
    result.height = 100 / style.value; // 비율에 따른 높이
  }

  return result;
} 
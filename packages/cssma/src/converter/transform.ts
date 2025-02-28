import { ParsedStyle, FigmaStyleProperties } from '../types';
import { degreesToRadians } from '../utils/converters';
import { isValidNumber } from '../utils/validators';
import { round } from '../utils/math';

/**
 * Transform 스타일을 Figma 스타일로 변환합니다.
 * 현재는 rotation만 지원합니다.
 */
export function convertTransformToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  if (style.property === 'rotation' && isValidNumber(style.value)) {
    const radians = degreesToRadians(style.value);
    if (isValidNumber(radians)) {
      result.rotation = round(radians);
    }
  }

  return result;
} 
import { FigmaPaint } from '../types';
import { parseColor } from '../utils/colors';

/**
 * Tailwind CSS 색상 값을 Figma 색상으로 변환합니다.
 */
export function convertColor(value: string): FigmaPaint {
  return {
    type: 'SOLID',
    color: parseColor(value)
  };
}

import { ParsedStyle, FigmaStyleProperties } from '../types';

/**
 * Overflow 스타일을 Figma 스타일로 변환합니다.
 */
export function convertOverflowToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  if (style.property === 'overflow' && typeof style.value === 'object') {
    const { clipsContent, scrollingEnabled } = style.value as { clipsContent: boolean; scrollingEnabled: boolean };
    result.clipsContent = clipsContent;
  }

  return result;
} 
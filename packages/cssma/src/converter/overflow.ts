import { ParsedStyle, FigmaStyleProperties } from '../types';

export function convertOverflowToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  if (style.property === 'overflow') {
    const { clipsContent, scrollingEnabled } = style;
    result.clipsContent = clipsContent;
    result.scrollingEnabled = scrollingEnabled;
  }

  return result;
} 
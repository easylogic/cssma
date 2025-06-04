import { ParsedStyle, FigmaStyleProperties } from '../types';

export function convertOverflowToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  if (style.property === 'overflow' && typeof style.value === 'object') {
    const overflowConfig = style.value as { clipsContent: boolean; scrollingEnabled?: boolean };
    if (overflowConfig.clipsContent !== undefined) {
      result.clipsContent = overflowConfig.clipsContent;
    }
    if (overflowConfig.scrollingEnabled !== undefined) {
      result.scrollingEnabled = overflowConfig.scrollingEnabled;
    }
  }

  return result;
} 
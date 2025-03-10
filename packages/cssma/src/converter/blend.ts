import { BLEND_MODE_MAP } from '../config/constants';
import { ParsedStyle } from '../types';

export function convertBlendToFigma(style: ParsedStyle) {
  if (style.property !== 'blendMode') {
    return {};
  }

  const blendMode = BLEND_MODE_MAP[style.value as keyof typeof BLEND_MODE_MAP];
  if (!blendMode) {
    return {};
  }

  return {
    blendMode
  };
} 
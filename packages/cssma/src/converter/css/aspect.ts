import { ParsedStyle } from '../../types';

export function convertAspectToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'aspectRatio':
      result['aspect-ratio'] = String(style.value);
      break;
  }

  return result;
} 
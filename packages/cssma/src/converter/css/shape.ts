import { ParsedStyle } from '../../types';

export function convertShapeToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'opacity':
      result.opacity = String(String(style.value));
      break;
  }

  return result;
} 
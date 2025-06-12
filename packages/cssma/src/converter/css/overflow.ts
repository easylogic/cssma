import { ParsedStyle } from '../../types';

export function convertOverflowToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'overflow':
      result.overflow = String(style.value);
      break;
    case 'overflowX':
      result['overflow-x'] = String(style.value);
      break;
    case 'overflowY':
      result['overflow-y'] = String(style.value);
      break;
  }

  return result;
} 
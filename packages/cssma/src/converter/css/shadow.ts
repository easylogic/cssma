import { ParsedStyle } from '../../types';

export function convertShadowToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'boxShadow':
      result['box-shadow'] = String(style.value);
      break;
    case 'dropShadow':
      result.filter = `drop-shadow(${String(style.value)})`;
      break;
  }

  return result;
} 
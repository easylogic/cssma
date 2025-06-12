import { ParsedStyle } from '../../types';

export function convertFilterToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'blur':
      result.filter = `blur(${String(style.value)}px)`;
      break;
    case 'dropShadow':
      result.filter = `drop-shadow(${String(style.value)})`;
      break;
  }

  return result;
} 
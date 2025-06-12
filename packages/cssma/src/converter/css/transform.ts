import { ParsedStyle } from '../../types';

export function convertTransformToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'rotation':
      result.transform = `rotate(${String(style.value)}deg)`;
      break;
  }

  return result;
} 
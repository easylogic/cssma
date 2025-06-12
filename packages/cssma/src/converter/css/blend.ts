import { ParsedStyle } from '../../types';

export function convertBlendToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'blendMode':
      result['mix-blend-mode'] = String(style.value);
      break;
    case 'backgroundBlendMode':
      result['background-blend-mode'] = String(style.value);
      break;
  }

  return result;
} 
import { ParsedStyle } from '../../types';

export function convertTextToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'color':
      result.color = String(style.value);
      break;
    case 'textAlign':
      result['text-align'] = String(style.value);
      break;
    case 'textDecoration':
      result['text-decoration'] = String(style.value);
      break;
    case 'letterSpacing':
      result['letter-spacing'] = typeof style.value === 'number' ? `${String(style.value)}px` : String(style.value);
      break;
    case 'lineHeight':
      result['line-height'] = String(style.value);
      break;
    case 'textTransform':
      result['text-transform'] = String(style.value);
      break;
  }

  return result;
} 
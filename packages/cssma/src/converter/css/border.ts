import { ParsedStyle } from '../../types';

export function convertBorderToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'borderWidth':
      result['border-width'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderColor':
      result['border-color'] = String(style.value);
      break;
    case 'borderStyle':
      result['border-style'] = String(style.value);
      break;
    case 'borderRadius':
      result['border-radius'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderTopWidth':
      result['border-top-width'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderRightWidth':
      result['border-right-width'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderBottomWidth':
      result['border-bottom-width'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderLeftWidth':
      result['border-left-width'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderTopLeftRadius':
      result['border-top-left-radius'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderTopRightRadius':
      result['border-top-right-radius'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderBottomRightRadius':
      result['border-bottom-right-radius'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'borderBottomLeftRadius':
      result['border-bottom-left-radius'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'strokeWeight':
      result['border-width'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'strokeColor':
      result['border-color'] = String(style.value);
      break;
    case 'dashPattern':
      if (Array.isArray(style.value)) {
        result['border-style'] = 'dashed';
      }
      break;
  }

  return result;
} 
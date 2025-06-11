import { ParsedStyle } from '../../types';

export function convertPositionToCss(styles: ParsedStyle[]): Record<string, string> {
  const result: Record<string, string> = {};

  for (const style of styles) {
    switch (style.property) {
      case 'position':
        result.position = String(style.value);
        break;
      case 'top':
        result.top = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
        break;
      case 'right':
        result.right = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
        break;
      case 'bottom':
        result.bottom = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
        break;
      case 'left':
        result.left = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
        break;
      case 'zIndex':
        result['z-index'] = String(style.value);
        break;
    }
  }

  return result;
} 
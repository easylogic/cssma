import { ParsedStyle } from '../../types';

export function convertFontToCss(styles: ParsedStyle[]): Record<string, string> {
  const result: Record<string, string> = {};

  for (const style of styles) {
    if (style.property === 'fontSize' || style.property === 'fontFamily' || 
        style.property === 'fontWeight' || style.property === 'fontStyle') {
      switch (style.property) {
        case 'fontSize':
          result['font-size'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
          break;
        case 'fontFamily':
          result['font-family'] = String(style.value);
          break;
        case 'fontWeight':
          result['font-weight'] = String(style.value);
          break;
        case 'fontStyle':
          result['font-style'] = String(style.value);
          break;
      }
    }
  }

  return result;
} 
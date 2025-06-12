import { ParsedStyle } from '../../types';

export function convertSpacingToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'padding':
      result.padding = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'paddingTop':
      result['padding-top'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'paddingRight':
      result['padding-right'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'paddingBottom':
      result['padding-bottom'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'paddingLeft':
      result['padding-left'] = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'paddingHorizontal':
      const horizontalValue = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      result['padding-left'] = horizontalValue;
      result['padding-right'] = horizontalValue;
      break;
    case 'paddingVertical':
      const verticalValue = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      result['padding-top'] = verticalValue;
      result['padding-bottom'] = verticalValue;
      break;
    case 'gap':
      result.gap = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'itemSpacing':
      result.gap = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
    case 'counterAxisSpacing':
      // This would need context about layout direction
      result.gap = typeof style.value === 'number' ? `${style.value}px` : String(style.value);
      break;
  }

  return result;
} 
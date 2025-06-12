import { ParsedStyle } from '../../types';

function toString(value: any): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  return String(value);
}

function toPxOrString(value: any): string {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') return value;
  return String(value);
}

export function convertLayoutToCss(style: ParsedStyle): Record<string, string> {
  const result: Record<string, string> = {};

  switch (style.property) {
    case 'width':
      result.width = toPxOrString(style.value);
      break;
    case 'height':
      result.height = toPxOrString(style.value);
      break;
    case 'min-width':
      result['min-width'] = toPxOrString(style.value);
      break;
    case 'min-height':
      result['min-height'] = toPxOrString(style.value);
      break;
    case 'max-width':
      result['max-width'] = toPxOrString(style.value);
      break;
    case 'max-height':
      result['max-height'] = toPxOrString(style.value);
      break;
    case 'flex-row':
    case 'flex-col':
      result.display = 'flex';
      result['flex-direction'] = style.property === 'flex-row' ? 'row' : 'column';
      break;
    case 'grid':
      result.display = 'grid';
      break;
    case 'layoutMode':
      if (String(style.value) === 'HORIZONTAL') {
        result.display = 'flex';
        result['flex-direction'] = 'row';
      } else if (String(style.value) === 'VERTICAL') {
        result.display = 'flex';
        result['flex-direction'] = 'column';
      }
      break;
    case 'counterAxisAlignItems':
      if (String(style.value) === 'MIN') {
        result['align-items'] = 'flex-start';
      } else if (String(style.value) === 'CENTER') {
        result['align-items'] = 'center';
      } else if (String(style.value) === 'MAX') {
        result['align-items'] = 'flex-end';
      }
      break;
    case 'primaryAxisAlignItems':
      if (String(style.value) === 'MIN') {
        result['justify-content'] = 'flex-start';
      } else if (String(style.value) === 'CENTER') {
        result['justify-content'] = 'center';
      } else if (String(style.value) === 'MAX') {
        result['justify-content'] = 'flex-end';
      } else if (String(style.value) === 'SPACE_BETWEEN') {
        result['justify-content'] = 'space-between';
      }
      break;
  }

  return result;
} 
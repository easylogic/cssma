import { isColorValue } from '../utils';
import { parseContextColorUtility } from '../utils/colorParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import type { CssmaContext } from '../../types';
// Tailwind background-color utility parser
// https://tailwindcss.com/docs/background-color

export function parseBackgroundColor(token: string, context?: CssmaContext): any | null {
  // 1. context-based palette lookup (with opacity)
  const result = parseContextColorUtility({ token, prefix: 'bg', type: 'background-color', context, allowOpacity: true });
  if (result) return result;

  // 2. bg-(--my-color) (custom property)
  const customProp = parseCustomPropertyUtility({ token, prefix: 'bg', type: 'background-color' });
  if (customProp) return customProp;

  // 3. bg-[arbitrary](/opacity)
  const arbVal = token.match(/^bg-\[(.+)\](?:\/(\d{1,3}))?$/);
  if (arbVal && isColorValue(arbVal[1])) {
    return {
      type: 'background-color',
      value: arbVal[1],
      raw: token,
      arbitrary: true,
      customProperty: false,
      ...(arbVal[2] ? { opacity: parseInt(arbVal[2], 10) } : {})
    };
  }

  return null;
} 
// Tailwind accent-color utility parser
// https://tailwindcss.com/docs/accent-color
import { isColorValue } from '../utils';
import { parseContextColorUtility } from '../utils/colorParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import type { CssmaContext } from '../../types';

// accentColor parser: context-based, supports opacity, custom property, arbitrary value
export function parseAccentColor(token: string, context?: CssmaContext): any | null {
  // 1. context-based palette lookup (with opacity)
  const result = parseContextColorUtility({ token, prefix: 'accent', type: 'accent-color', context, allowOpacity: true });
  if (result) return result;

  // 2. accent-(--my-color) (custom property)
  const customProp = parseCustomPropertyUtility({ token, prefix: 'accent', type: 'accent-color' });
  if (customProp) return customProp;

  // 3. accent-[arbitrary](/opacity)
  const arbVal = token.match(/^accent-\[(.+)\](?:\/(\d{1,3}))?$/);
  if (arbVal && isColorValue(arbVal[1])) {
    return {
      type: 'accent-color',
      value: arbVal[1],
      raw: token,
      arbitrary: true,
      customProperty: false,
      ...(arbVal[2] ? { opacity: parseInt(arbVal[2], 10) } : {})
    };
  }

  return null;
} 
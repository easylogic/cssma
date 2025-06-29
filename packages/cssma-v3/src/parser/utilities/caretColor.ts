// Tailwind caret-color utility parser
// https://tailwindcss.com/docs/caret-color
import { isColorValue } from '../utils';
import { parseContextColorUtility } from '../utils/colorParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import type { CssmaContext } from '../../types';

// caretColor parser: context-based, supports custom property, arbitrary value
export function parseCaretColor(token: string, context?: CssmaContext): any | null {
  // 1. context-based palette lookup (with opacity)
  const result = parseContextColorUtility({ token, prefix: 'caret', type: 'caret-color', context, allowOpacity: true });
  if (result) return result;

  // 2. caret-(--my-color) (custom property)
  const customProp = parseCustomPropertyUtility({ token, prefix: 'caret', type: 'caret-color' });
  if (customProp) return customProp;

  // 3. caret-[arbitrary](/opacity)
  const arbVal = token.match(/^caret-\[(.+)\](?:\/(\d{1,3}))?$/);
  if (arbVal && isColorValue(arbVal[1])) {
    return {
      type: 'caret-color',
      value: arbVal[1],
      raw: token,
      arbitrary: true,
      customProperty: false,
      ...(arbVal[2] ? { opacity: parseInt(arbVal[2], 10) } : {})
    };
  }

  return null;
} 
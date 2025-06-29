// Tailwind outline-color utility parser
// https://tailwindcss.com/docs/outline-color

import { isColorValue } from '../utils';
import { parseContextColorUtility } from '../utils/colorParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import type { CssmaContext } from '../../types';

// outlineColor parser: context-based, supports opacity, custom property, arbitrary value
export function parseOutlineColor(token: string, context?: CssmaContext): any | null {
  // 1. context-based palette lookup (with opacity)
  const result = parseContextColorUtility({ token, prefix: 'outline', type: 'outline-color', context, allowOpacity: true });
  if (result) return result;

  // 2. outline-(--my-color) (custom property)
  const customProp = parseCustomPropertyUtility({ token, prefix: 'outline', type: 'outline-color' });
  if (customProp) return customProp;

  // 3. outline-[arbitrary](/opacity)
  const arbVal = token.match(/^outline-\[(.+)\](?:\/(\d{1,3}))?$/);
  if (arbVal && isColorValue(arbVal[1])) {
    return {
      type: 'outline-color',
      value: arbVal[1],
      raw: token,
      arbitrary: true,
      customProperty: false,
      ...(arbVal[2] ? { opacity: parseInt(arbVal[2], 10) } : {})
    };
  }

  // 4. outline-inherit, outline-current, outline-transparent, outline-black, outline-white
  if (context?.theme) {
    const special = token.match(/^outline-(inherit|current|transparent|black|white)$/);
    if (special) {
      const themePath = `colors.${special[1]}`;
      const themeValue = context.theme(themePath);
      if (typeof themeValue === 'string') {
        return {
          type: 'outline-color',
          value: special[1],
          raw: token,
          arbitrary: false,
          customProperty: false,
          preset: themePath
        };
      }
    }
  }

  return null;
} 
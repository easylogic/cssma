// Tailwind border-color utility parser
// https://tailwindcss.com/docs/border-color

import { isColorValue } from '../utils';
import { parseContextColorUtility } from '../utils/colorParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import type { CssmaContext } from '../../types';

// borderColor parser: context-based, supports side, opacity, custom property, arbitrary value
export function parseBorderColor(token: string, context?: CssmaContext): any | null {
  // 1. side prefix 분리 (border-x-blue-200, border-t-red-500 등)
  const sideMatch = token.match(/^border-([trblse]|x)-(.*)$/);
  if (sideMatch) {
    const side = sideMatch[1];
    const rest = sideMatch[2];
    // 나머지 토큰에 대해 context-based palette lookup (with opacity)
    const result = parseContextColorUtility({ token: `border-${rest}`, prefix: 'border', type: 'border-color', context, allowOpacity: true });
    if (result) {
      return { ...result, side, raw: token };
    }
    // custom property, arbitrary 등은 기존 로직 활용
    // border-x-(--my-color) 및 border-x-(--my-color)/opacity
    const customProp = parseCustomPropertyUtility({ token: `border-${rest}`, prefix: 'border', type: 'border-color' });
    if (customProp) {
      return { ...customProp, side, raw: token };
    }
    // border-x-[arbitrary](/opacity)
    const arbVal = rest.match(/^\[(.+)\](?:\/(\d{1,3}))?$/);
    if (arbVal && isColorValue(arbVal[1])) {
      return {
        type: 'border-color',
        side,
        value: arbVal[1],
        raw: token,
        arbitrary: true,
        customProperty: false,
        ...(arbVal[2] ? { opacity: parseInt(arbVal[2], 10) } : {})
      };
    }
    return null;
  }

  // 2. context-based palette lookup (with opacity) (side 없는 경우)
  const result = parseContextColorUtility({ token, prefix: 'border', type: 'border-color', context, allowOpacity: true });
  if (result) return { ...result, side: 'all' };

  // 3. border-(--my-color) (custom property)
  const customProp = parseCustomPropertyUtility({ token, prefix: 'border', type: 'border-color' });
  if (customProp) return { ...customProp, side: 'all' };

  // 4. border-[arbitrary](/opacity)
  const arbVal = token.match(/^border-\[(.+)\](?:\/(\d{1,3}))?$/);
  if (arbVal && isColorValue(arbVal[1])) {
    return {
      type: 'border-color',
      side: 'all',
      value: arbVal[1],
      raw: token,
      arbitrary: true,
      customProperty: false,
      ...(arbVal[2] ? { opacity: parseInt(arbVal[2], 10) } : {})
    };
  }

  return null;
} 
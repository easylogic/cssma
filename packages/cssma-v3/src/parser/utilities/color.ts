// Tailwind text color utility parser
// https://tailwindcss.com/docs/color

import type { CssmaContext, ParsedUtility } from '../../types';
import { extractArbitraryValue, isColorValue } from '../utils';
import { parseContextColorUtility } from '../utils/colorParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';

export function parseTextColor(token: string, context?: CssmaContext): ParsedUtility | null {
  // 1. context 기반 preset lookup (opacity 지원 없음)
  const result = parseContextColorUtility({ token, prefix: 'text', type: 'color', context });
  if (result) return result;

  // 2. custom property 패턴: text-(--my-color)
  const customProp = parseCustomPropertyUtility({ token, prefix: 'text', type: 'color' });
  if (customProp) return customProp;

  // 3. text-[value] (arbitrary value, utils 사용)
  const arbitrary = extractArbitraryValue(token, 'text');
  if (arbitrary && isColorValue(arbitrary)) {
    return {
      type: 'color',
      value: arbitrary,
      raw: token,
      arbitrary: true,
      customProperty: false
    };
  }

  return null;
} 
// Tailwind z-index utility parser
// https://tailwindcss.com/docs/z-index

import type { CssmaContext } from '../../types';
import { extractArbitraryValue, isNumberValue, isVarFunction } from '../utils';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import { parseContextZIndexUtility } from '../utils/spacingParser';

export function parseZIndex(token: string, context?: CssmaContext): any | null {
  const originalToken = token;
  // 1. context 기반 preset (theme.zIndex)
  const preset = parseContextZIndexUtility({ token, context });
  if (preset) return { ...preset, raw: originalToken, negative: false, customProperty: false, arbitrary: false };

  // 2. custom property (z-(--foo))
  const custom = parseCustomPropertyUtility({ token, prefix: 'z', type: 'z-index' });
  if (custom) return { ...custom, raw: originalToken, negative: false, customProperty: true, arbitrary: false };

  // 3. arbitrary value (z-[999])
  const arb = extractArbitraryValue(token, 'z');
  if (arb && (isNumberValue(arb) || isVarFunction(arb))) {
    return { type: 'z-index', value: arb, raw: originalToken, arbitrary: true, customProperty: false, negative: false };
  }
  return null;
} 
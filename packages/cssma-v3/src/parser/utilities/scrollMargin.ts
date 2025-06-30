// Tailwind scroll-margin utility parser
// https://tailwindcss.com/docs/scroll-margin

import type { CssmaContext } from '../../types';
import { parseContextScrollMarginUtility } from '../utils/spacingParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import { extractArbitraryValue, isLengthValue, isVarFunction } from '../utils';

const propMap = {
  '': 'scroll-margin',
  'x': 'scroll-margin-inline',
  'y': 'scroll-margin-block',
  't': 'scroll-margin-top',
  'r': 'scroll-margin-right',
  'b': 'scroll-margin-bottom',
  'l': 'scroll-margin-left',
  's': 'scroll-margin-inline-start',
  'e': 'scroll-margin-inline-end',
};

export function parseScrollMargin(token: string, context?: CssmaContext): any | null {
  const originalToken = token;
  if (token.startsWith('--')) return null;
  let negative = false;
  if (token.startsWith('-')) {
    negative = true;
    token = token.slice(1);
  }

  // 1. context-based preset parsing
  const preset = parseContextScrollMarginUtility({ token, type: 'scroll-margin', context });
  if (preset) return { ...preset, raw: originalToken, negative };

  // 2. custom property (scroll-mt-(--foo))
  const mCustom = token.match(/^scroll-m([a-z]*)-\((--[\w-]+)\)$/);
  if (mCustom && mCustom[1] in propMap) {
    const dir = mCustom[1];
    const direction = dir || '';
    const property = propMap[dir];
    return {
      type: 'scroll-margin',
      property,
      value: `var(${mCustom[2]})`,
      direction,
      raw: originalToken,
      arbitrary: false,
      customProperty: true,
      negative,
    };
  }

  // 3. arbitrary value (scroll-mt-[value])
  const mArb = token.match(/^scroll-m([a-z]*)-\[(.+)\]$/);
  if (mArb && mArb[1] in propMap) {
    const dir = mArb[1];
    const direction = dir || '';
    const property = propMap[dir];
    return {
      type: 'scroll-margin',
      property,
      value: mArb[2],
      direction,
      raw: originalToken,
      arbitrary: true,
      customProperty: false,
      negative,
    };
  }
  return null;
} 
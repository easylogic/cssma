// Tailwind scroll-padding utility parser
// https://tailwindcss.com/docs/scroll-padding

import type { CssmaContext } from '../../types';
import { parseContextScrollPaddingUtility } from '../utils/spacingParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import { extractArbitraryValue, isLengthValue, isVarFunction } from '../utils';

const propMap = {
  '': 'scroll-padding',
  'x': 'scroll-padding-inline',
  'y': 'scroll-padding-block',
  't': 'scroll-padding-top',
  'r': 'scroll-padding-right',
  'b': 'scroll-padding-bottom',
  'l': 'scroll-padding-left',
  's': 'scroll-padding-inline-start',
  'e': 'scroll-padding-inline-end',
};

export function parseScrollPadding(token: string, context?: CssmaContext): any | null {
  const originalToken = token;
  if (token.startsWith('--')) return null;
  let negative = false;
  if (token.startsWith('-')) {
    negative = true;
    token = token.slice(1);
  }
  const result = parseScrollPaddingCore(token, context, originalToken, negative);
  if (result) return result;
  return null;
}

function parseScrollPaddingCore(token: string, context: CssmaContext | undefined, originalToken: string, negative: boolean): any | null {
  // 1. context-based preset parsing
  const preset = parseContextScrollPaddingUtility({ token, type: 'scroll-padding', context });
  if (preset) return { ...preset, raw: originalToken, negative };

  // 2. px, custom property, arbitrary value 등
  const t = token;
  const match = t.match(/^scroll-p([a-z]*)-(.+)$/);
  if (!match) {
    return null;
  }
  const [, dir, valRaw] = match;
  const val = valRaw.trim();
  const direction = dir || '';
  const property = propMap[dir as keyof typeof propMap];

  // custom property (scroll-p-(--foo))
  const customProp = parseCustomPropertyUtility({ token, prefix: `scroll-p${dir}`, type: 'scroll-padding' });
  if (customProp) return { ...customProp, property, direction, arbitrary: false, customProperty: true, raw: originalToken, negative };

  // arbitrary value (scroll-p-[value])
  const arbitraryValue = extractArbitraryValue(token, `scroll-p${dir}`);
  if (arbitraryValue !== null && (isLengthValue(arbitraryValue) || isVarFunction(arbitraryValue))) {
    return { type: 'scroll-padding', property, value: arbitraryValue, direction, raw: originalToken, arbitrary: true, customProperty: false, negative };
  }
  return null;
} 
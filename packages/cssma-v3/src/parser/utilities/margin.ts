// Tailwind margin utility parser
// https://tailwindcss.com/docs/margin

import type { CssmaContext } from '../../types';
import { parseContextSpacingUtility } from '../utils/spacingParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import { extractArbitraryValue, isLengthValue, isVarFunction } from '../utils';

const directions: { [key: string]: string } = {
  '': 'all',
  'x': 'inline',
  'y': 'block',
  's': 'inline-start',
  'e': 'inline-end',
  't': 'top',
  'r': 'right',
  'b': 'bottom',
  'l': 'left',
};

export function parseMargin(token: string, context?: CssmaContext): any | null {
  const originalToken = token; // 입력값 보관
  if (token.startsWith('--')) {
    return null;
  }
  let negative = false;
  if (token.startsWith('-')) {
    negative = true;
    token = token.slice(1);
  }
  const result = parseMarginCore(token, context, originalToken, negative);
  if (result) return result;
  return null;
}

function parseMarginCore(token: string, context: CssmaContext | undefined, originalToken: string, negative: boolean): any | null {
  // 1. spacing preset(숫자): context lookup
  const preset = parseContextSpacingUtility({ token, prefix: 'm', type: 'margin', context });
  if (preset) return { ...preset, raw: originalToken, negative };

  // 2. px, custom property, arbitrary value 등
  const t = token;
  const match = t.match(/^m([xysetrbl]?)-(.+)$/);
  if (!match) {
    return null;
  }
  const [, dir, valRaw] = match;
  const val = valRaw.trim();
  const direction = directions[dir] || 'all';

  // custom property (m-(--foo))
  const customProp = parseCustomPropertyUtility({ token, prefix: `m${dir}`, type: 'margin' });
  if (customProp) return { ...customProp, direction, arbitrary: false, customProperty: true, raw: originalToken, negative };

  // arbitrary value (m-[10px])
  const arbitraryValue = extractArbitraryValue(token, `m${dir}`);
  if (arbitraryValue !== null && (isLengthValue(arbitraryValue) || isVarFunction(arbitraryValue))) {
    return { type: 'margin', value: arbitraryValue, direction, raw: originalToken, arbitrary: true, customProperty: false, negative };
  }
  // spacing preset이 context에 없으면 null 반환 (fallback 제거)
  return null;
} 
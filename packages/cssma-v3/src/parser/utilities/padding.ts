import type { CssmaContext } from '../../types';
import { parseContextSpacingUtility } from '../utils/spacingParser';
import { extractArbitraryValue, isLengthValue, isVarFunction } from '../utils';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
// Tailwind padding utility parser
// https://tailwindcss.com/docs/padding

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

export function parsePadding(token: string, context?: CssmaContext): any | null {
  // 1. spacing preset(숫자/문자열): context lookup
  const preset = parseContextSpacingUtility({ token, prefix: 'p', type: 'padding', context });
  if (preset) return preset;

  // 2. px, custom property, arbitrary value 등
  const t = token;
  const match = t.match(/^p([xysetrbl]?)-(.+)$/);
  if (!match) {
    return null;
  }
  const [, dir, valRaw] = match;
  const val = valRaw.trim();
  const direction = directions[dir] || 'all';

  // custom property (p-(--foo))
  const customProp = parseCustomPropertyUtility({ token, prefix: `p${dir}`, type: 'padding' });
  if (customProp) return { ...customProp, direction, arbitrary: true, customProperty: true };

  // arbitrary value (p-[10px])
  const arbitraryValue = extractArbitraryValue(token, `p${dir}`);
  if (arbitraryValue !== null && (isLengthValue(arbitraryValue) || isVarFunction(arbitraryValue))) {
    return { type: 'padding', value: arbitraryValue, direction, raw: token, arbitrary: true, customProperty: false };
  }
  // spacing preset이 context에 없으면 null 반환 (fallback 제거)
  return null;
}
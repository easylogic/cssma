// Tailwind margin utility parser
// https://tailwindcss.com/docs/margin

import type { CssmaContext } from '../../types';
import { parseContextSpacingUtility } from '../utils/spacingParser';

const directions = {
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
  // 1. spacing preset(숫자): context lookup
  const preset = parseContextSpacingUtility({ token, prefix: 'm', type: 'margin', context });
  if (preset) return preset;

  // 2. px, custom property, arbitrary value 등
  const negative = token.startsWith('-');
  const t = negative ? token.slice(1) : token;
  const match = t.match(/^m([xysetrbl]?)\-(.+)$/);
  if (!match) return null;
  const [, dir, valRaw] = match;
  const val = valRaw.trim();
  const direction = directions[dir] || 'all';

  // px
  if (val === 'px') return { type: 'margin', preset: 'px', direction, raw: token, arbitrary: false, negative };
  // custom property (m-(--foo), m--foo)
  let custom = val.match(/^\(\s*(--[a-zA-Z0-9-_]+)\s*\)$/);
  if (!custom) custom = val.match(/^(--[a-zA-Z0-9-_]+)$/);
  if (custom) return { type: 'margin', value: `var(${custom[1]})`, direction, raw: token, arbitrary: false, negative };
  // arbitrary value (m-[10px])
  const arbitrary = val.match(/^\[(.*)\]$/);
  if (arbitrary) {
    if (!arbitrary[1]) return null;
    return { type: 'margin', value: arbitrary[1], direction, raw: token, arbitrary: true, negative };
  }
  // spacing preset이 context에 없으면 null 반환 (fallback 제거)
  return null;
} 
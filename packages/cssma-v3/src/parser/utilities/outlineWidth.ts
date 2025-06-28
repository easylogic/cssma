// Tailwind outline-width utility parser
// https://tailwindcss.com/docs/outline-width

import { extractArbitraryValue, isLengthValue } from '../utils';
import type { CssmaContext } from '../../types';

export function parseOutlineWidth(token: string, context?: CssmaContext): any | null {
  // outline (default 1px)
  if (token === 'outline') return { type: 'outline-width', value: '1px', raw: token, arbitrary: false };
  // outline-<number>
  const num = token.match(/^outline-(\d+)$/);
  if (num) return { type: 'outline-width', value: `${num[1]}px`, raw: token, arbitrary: false };
  // outline-(length:<custom-property>)
  const custom = token.match(/^outline-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (custom) return { type: 'outline-width', value: `var(${custom[1]})`, raw: token, arbitrary: true };
  // outline-[<value>] (arbitrary length only, not outline-[length:var(--foo)])
  const arb = extractArbitraryValue(token, 'outline');
  if (arb && isLengthValue(arb) && !arb.startsWith('length:')) return { type: 'outline-width', value: arb, raw: token, arbitrary: true };
  return null;
} 
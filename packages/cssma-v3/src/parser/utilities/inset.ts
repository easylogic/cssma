// Tailwind inset utility parser
// https://tailwindcss.com/docs/top-right-bottom-left

import type { CssmaContext } from '../../types';

const directions = [
  '', 'x', 'y', 'top', 'right', 'bottom', 'left'
];

export function parseInset(token: string, context?: CssmaContext): any | null {
  // 1. inset-[arbitrary]
  let m = token.match(/^inset-\[(.+)\]$/);
  if (m) return { type: 'inset', value: m[1], raw: token, arbitrary: true };
  // 2. inset-x-[arbitrary], inset-y-[arbitrary]
  m = token.match(/^inset-x-\[(.+)\]$/);
  if (m) return { type: 'inset', direction: 'x', value: m[1], raw: token, arbitrary: true };
  m = token.match(/^inset-y-\[(.+)\]$/);
  if (m) return { type: 'inset', direction: 'y', value: m[1], raw: token, arbitrary: true };
  // 3. top-[arbitrary], right-[arbitrary], bottom-[arbitrary], left-[arbitrary]
  m = token.match(/^top-\[(.+)\]$/);
  if (m) return { type: 'inset', direction: 'top', value: m[1], raw: token, arbitrary: true };
  m = token.match(/^right-\[(.+)\]$/);
  if (m) return { type: 'inset', direction: 'right', value: m[1], raw: token, arbitrary: true };
  m = token.match(/^bottom-\[(.+)\]$/);
  if (m) return { type: 'inset', direction: 'bottom', value: m[1], raw: token, arbitrary: true };
  m = token.match(/^left-\[(.+)\]$/);
  if (m) return { type: 'inset', direction: 'left', value: m[1], raw: token, arbitrary: true };
  // 4. inset-0, inset-x-0, inset-y-0, top-0, right-0, bottom-0, left-0
  if (token === 'inset-0') return { type: 'inset', value: 0, raw: token, arbitrary: false };
  if (token === 'inset-x-0') return { type: 'inset', direction: 'x', value: 0, raw: token, arbitrary: false };
  if (token === 'inset-y-0') return { type: 'inset', direction: 'y', value: 0, raw: token, arbitrary: false };
  if (token === 'top-0') return { type: 'inset', direction: 'top', value: 0, raw: token, arbitrary: false };
  if (token === 'right-0') return { type: 'inset', direction: 'right', value: 0, raw: token, arbitrary: false };
  if (token === 'bottom-0') return { type: 'inset', direction: 'bottom', value: 0, raw: token, arbitrary: false };
  if (token === 'left-0') return { type: 'inset', direction: 'left', value: 0, raw: token, arbitrary: false };
  // 5. inset-px, inset-x-px, inset-y-px, top-px, right-px, bottom-px, left-px
  if (token === 'inset-px') return { type: 'inset', value: 'px', raw: token, arbitrary: false };
  if (token === 'inset-x-px') return { type: 'inset', direction: 'x', value: 'px', raw: token, arbitrary: false };
  if (token === 'inset-y-px') return { type: 'inset', direction: 'y', value: 'px', raw: token, arbitrary: false };
  if (token === 'top-px') return { type: 'inset', direction: 'top', value: 'px', raw: token, arbitrary: false };
  if (token === 'right-px') return { type: 'inset', direction: 'right', value: 'px', raw: token, arbitrary: false };
  if (token === 'bottom-px') return { type: 'inset', direction: 'bottom', value: 'px', raw: token, arbitrary: false };
  if (token === 'left-px') return { type: 'inset', direction: 'left', value: 'px', raw: token, arbitrary: false };
  return null;
} 
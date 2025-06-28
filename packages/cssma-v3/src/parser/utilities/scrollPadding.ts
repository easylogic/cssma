// Tailwind scroll-padding utility parser
// https://tailwindcss.com/docs/scroll-padding

import type { CssmaContext } from '../../types';

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

export function parseScrollPadding(token: string, context?: CssmaContext) {
  // scroll-p-4, -scroll-p-4, scroll-px-2, -scroll-pt-6, etc.
  let m = token.match(/^(-?)scroll-p([a-z]*)-(\d+)$/);
  if (m && m[2] in propMap) {
    const negative = m[1] === '-';
    const dir = m[2];
    const value = `calc(var(--spacing) * ${negative ? '-' : ''}${m[3]})`;
    return { type: 'scroll-padding', property: propMap[dir], value, raw: token, negative };
  }
  // scroll-pt-(--foo), -scroll-pt-(--foo)
  m = token.match(/^(-?)scroll-p([a-z]*)-\((--[\w-]+)\)$/);
  if (m && m[2] in propMap) {
    const negative = m[1] === '-';
    const dir = m[2];
    const value = negative ? `calc(var(--spacing) * -1 * var(${m[3]}))` : `var(${m[3]})`;
    return { type: 'scroll-padding', property: propMap[dir], value, raw: token, customProperty: true, negative };
  }
  // scroll-pt-[value], -scroll-pt-[value]
  m = token.match(/^(-?)scroll-p([a-z]*)-\[(.+)\]$/);
  if (m && m[2] in propMap) {
    const negative = m[1] === '-';
    const dir = m[2];
    const value = negative ? `calc(-1 * ${m[3]})` : m[3];
    return { type: 'scroll-padding', property: propMap[dir], value, raw: token, arbitrary: true, negative };
  }
  return null;
} 
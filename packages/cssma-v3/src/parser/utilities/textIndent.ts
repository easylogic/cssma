// Tailwind text-indent utility parser
// https://tailwindcss.com/docs/text-indent

import { extractArbitraryValue } from '../utils';

export function parseTextIndent(token: string) {
  // indent-<number>
  let m = token.match(/^(-?)indent-(\d+)$/);
  if (m) {
    const negative = m[1] === '-';
    const value = parseInt(m[2], 10);
    return { type: 'text-indent', value: negative ? -value : value, raw: token, arbitrary: false };
  }
  // indent-px, -indent-px
  m = token.match(/^(-?)indent-px$/);
  if (m) {
    const negative = m[1] === '-';
    return { type: 'text-indent', value: negative ? '-1px' : '1px', raw: token, arbitrary: false };
  }
  // indent-(<custom-property>)
  m = token.match(/^indent-\((--[a-zA-Z0-9-_]+)\)$/);
  if (m) {
    return { type: 'text-indent', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  // indent-[<value>]
  const arb = extractArbitraryValue(token, 'indent');
  if (arb) {
    return { type: 'text-indent', value: arb, raw: token, arbitrary: true };
  }
  return null;
} 
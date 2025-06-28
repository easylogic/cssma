// Tailwind outline-offset utility parser
// https://tailwindcss.com/docs/outline-offset

import { extractArbitraryValue, isLengthValue } from '../utils';
import type { CssmaContext } from '../../types';

export function parseOutlineOffset(token: string, context?: CssmaContext): any | null {
  // outline-offset-<number> (e.g., outline-offset-2 => 2px)
  const m = token.match(/^(-?)outline-offset-(\d+)$/);
  if (m) {
    const negative = m[1] === '-';
    const value = parseInt(m[2], 10);
    return {
      type: 'outline-offset',
      value: negative ? `calc(${value}px * -1)` : `${value}px`,
      raw: token,
      arbitrary: false,
      negative,
    };
  }

  // outline-offset-(<custom-property>) => var(--foo)
  const custom = token.match(/^outline-offset-\((--[\w-]+)\)$/);
  if (custom) {
    return {
      type: 'outline-offset',
      value: `var(${custom[1]})`,
      raw: token,
      arbitrary: true,
      customProperty: true,
    };
  }

  // outline-offset-[<value>] (arbitrary value)
  const arb = extractArbitraryValue(token, 'outline-offset');
  if (arb && isLengthValue(arb)) {
    return {
      type: 'outline-offset',
      value: arb,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
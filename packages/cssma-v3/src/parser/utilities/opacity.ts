// Tailwind opacity utility parser
// https://tailwindcss.com/docs/opacity

import type { CssmaContext } from '../../types';

export function parseOpacity(token: string, context?: CssmaContext): any | null {
  let m;
  // 1. opacity-(<custom-property>)
  if ((m = token.match(/^opacity-\((.+)\)$/))) {
    return { type: 'opacity', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  // 2. opacity-[<value>]
  if ((m = token.match(/^opacity-\[(.+)\]$/))) {
    return { type: 'opacity', value: m[1], raw: token, arbitrary: true };
  }
  // 3. opacity-<number> (0~100)
  if ((m = token.match(/^opacity-(\d{1,3})$/))) {
    const num = Number(m[1]);
    if (num >= 0 && num <= 100) {
      return { type: 'opacity', value: num, raw: token, arbitrary: false };
    }
  }
  return null;
} 
// Tailwind filter utility parser
// https://tailwindcss.com/docs/filter

import type { CssmaContext } from '../../types';

const arbitraryRe = /^filter-\[(.+)\]$/;
const customVarRe = /^filter-\((--[\w-]+)\)$/;

export function parseFilter(token: string, context?: CssmaContext): any | null {
  if (token === 'filter-none') {
    return { type: 'filter', value: 'none', raw: token, arbitrary: false };
  }
  let m;
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'filter', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'filter', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
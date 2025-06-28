import type { CssmaContext } from '../../types';
// Tailwind invert utility parser
// https://tailwindcss.com/docs/filter-invert

const baseRe = /^invert$/;
const presetRe = /^invert-(\d{1,3})$/;
const arbitraryRe = /^invert-\[(.+)\]$/;
const customVarRe = /^invert-\((--[\w-]+)\)$/;

export function parseInvert(token: string, context?: CssmaContext): any | null {
  let m;
  if (baseRe.test(token)) {
    return { type: 'invert', value: '100', raw: token, arbitrary: false };
  }
  if ((m = presetRe.exec(token))) {
    return { type: 'invert', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'invert', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'invert', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
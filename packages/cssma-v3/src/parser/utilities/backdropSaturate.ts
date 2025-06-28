import type { CssmaContext } from '../../types';
// Tailwind backdrop-saturate utility parser
// https://tailwindcss.com/docs/backdrop-filter-saturate

const presetRe = /^backdrop-saturate-(\d{1,3})$/;
const arbitraryRe = /^backdrop-saturate-\[(.+)\]$/;
const customVarRe = /^backdrop-saturate-\((--[\w-]+)\)$/;

export function parseBackdropSaturate(token: string, context?: CssmaContext): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'backdrop-saturate', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-saturate', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-saturate', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
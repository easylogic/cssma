import type { CssmaContext } from '../../types';
// Tailwind backdrop-invert utility parser
// https://tailwindcss.com/docs/backdrop-filter-invert

const defaultRe = /^backdrop-invert$/;
const presetRe = /^backdrop-invert-(\d{1,3})$/;
const arbitraryRe = /^backdrop-invert-\[(.+)\]$/;
const customVarRe = /^backdrop-invert-\((--[\w-]+)\)$/;

export function parseBackdropInvert(token: string, context?: CssmaContext): any | null {
  let m;
  if (defaultRe.test(token)) {
    return { type: 'backdrop-invert', value: '100', raw: token, arbitrary: false, default: true };
  }
  if ((m = presetRe.exec(token))) {
    return { type: 'backdrop-invert', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-invert', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-invert', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
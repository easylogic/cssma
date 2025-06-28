import type { CssmaContext } from '../../types';
// Tailwind backdrop-contrast utility parser
// https://tailwindcss.com/docs/backdrop-filter-contrast

const presetRe = /^backdrop-contrast-(\d{2,3})$/;
const arbitraryRe = /^backdrop-contrast-\[(.+)\]$/;
const customVarRe = /^backdrop-contrast-\((--[\w-]+)\)$/;

export function parseBackdropContrast(token: string, context?: CssmaContext): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'backdrop-contrast', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-contrast', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-contrast', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
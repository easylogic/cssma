import type { CssmaContext } from '../../types';
// Tailwind backdrop-blur utility parser
// https://tailwindcss.com/docs/backdrop-filter-blur

const presetList = [
  'none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'
];

const presetRe = /^backdrop-blur-(none|2xs|xs|sm|md|lg|xl|2xl|3xl)$/;
const arbitraryRe = /^backdrop-blur-\[(.+)\]$/;
const customVarRe = /^backdrop-blur-\((--[\w-]+)\)$/;

export function parseBackdropBlur(token: string, context?: CssmaContext): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'backdrop-blur', preset: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-blur', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-blur', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
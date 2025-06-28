import type { CssmaContext } from '../../types';
// Tailwind backdrop-hue-rotate utility parser
// https://tailwindcss.com/docs/backdrop-filter-hue-rotate

const presetRe = /^(-?)backdrop-hue-rotate-(\d{1,3})$/;
const arbitraryRe = /^backdrop-hue-rotate-\[(.+)\]$/;
const customVarRe = /^backdrop-hue-rotate-\((--[\w-]+)\)$/;

export function parseBackdropHueRotate(token: string, context?: CssmaContext): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return {
      type: 'backdrop-hue-rotate',
      value: m[2],
      negative: !!m[1],
      raw: token,
      arbitrary: false,
    };
  }
  if ((m = arbitraryRe.exec(token))) {
    return {
      type: 'backdrop-hue-rotate',
      value: m[1],
      raw: token,
      arbitrary: true,
    };
  }
  if ((m = customVarRe.exec(token))) {
    return {
      type: 'backdrop-hue-rotate',
      value: `var(${m[1]})`,
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
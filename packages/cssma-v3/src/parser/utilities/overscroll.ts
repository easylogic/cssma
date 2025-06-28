import type { CssmaContext } from '../../types';
// Tailwind overscroll utility parser
// https://tailwindcss.com/docs/overscroll-behavior

const presets = [
  'auto', 'contain', 'none'
];

export function parseOverscroll(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === `overscroll-${preset}`) return { type: 'overscroll', preset, raw: token, arbitrary: false };
    if (token === `overscroll-x-${preset}`) return { type: 'overscroll', axis: 'x', preset, raw: token, arbitrary: false };
    if (token === `overscroll-y-${preset}`) return { type: 'overscroll', axis: 'y', preset, raw: token, arbitrary: false };
  }
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind object-fit utility parser
// https://tailwindcss.com/docs/object-fit

const presets = [
  'contain', 'cover', 'fill', 'none', 'scale-down'
];

export function parseObjectFit(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === `object-${preset}`) return { type: 'object-fit', preset, raw: token, arbitrary: false };
  }
  return null;
} 
// Tailwind position utility parser
// https://tailwindcss.com/docs/position

import type { CssmaContext } from '../../types';

const presets = [
  'static', 'fixed', 'absolute', 'relative', 'sticky'
];

export function parsePosition(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === preset) return { type: 'position', preset, raw: token, arbitrary: false };
  }
  return null;
} 
// Tailwind hyphens utility parser
// https://tailwindcss.com/docs/hyphens

import type { CssmaContext } from '../../types';

const presets = [
  'none', 'manual', 'auto',
];

export function parseHyphens(token: string, context?: CssmaContext): any | null {
  if (token.startsWith('hyphens-')) {
    const preset = token.slice(8);
    if (presets.includes(preset)) {
      return { type: 'hyphens', preset, raw: token, arbitrary: false };
    }
  }
  return null;
} 
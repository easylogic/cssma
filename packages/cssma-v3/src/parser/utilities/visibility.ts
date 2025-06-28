import type { CssmaContext } from '../../types';
// Tailwind visibility utility parser
// https://tailwindcss.com/docs/visibility

const presets = ['visible', 'invisible', 'collapse'];

export function parseVisibility(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === preset) return { type: 'visibility', preset, raw: token, arbitrary: false };
  }
  return null;
} 
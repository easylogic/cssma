// Tailwind forced-color-adjust utility parser
// https://tailwindcss.com/docs/forced-color-adjust

import type { CssmaContext } from '../../types';

const presets = ['auto', 'none'];

export function parseForcedColorAdjust(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === `forced-color-adjust-${preset}`) {
      return { type: 'forced-color-adjust', value: preset, raw: token };
    }
  }
  return null;
} 
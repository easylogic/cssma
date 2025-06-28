import type { CssmaContext } from '../../types';
// Tailwind background-blend-mode utility parser
// https://tailwindcss.com/docs/background-blend-mode

const presets = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
  'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
  'exclusion', 'hue', 'saturation', 'color', 'luminosity'
];

export function parseBackgroundBlendMode(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === `bg-blend-${preset}`) {
      return { type: 'background-blend-mode', value: preset, raw: token, arbitrary: false };
    }
  }
  return null;
} 
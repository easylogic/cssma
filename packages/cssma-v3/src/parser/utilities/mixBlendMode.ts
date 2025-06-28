import type { CssmaContext } from '../../types';
// Tailwind mix-blend-mode utility parser
// https://tailwindcss.com/docs/mix-blend-mode

const presets = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
  'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
  'exclusion', 'hue', 'saturation', 'color', 'luminosity',
  'plus-darker', 'plus-lighter'
];

export function parseMixBlendMode(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === `mix-blend-${preset}`) {
      return { type: 'mix-blend-mode', value: preset, raw: token, arbitrary: false };
    }
  }
  return null;
} 
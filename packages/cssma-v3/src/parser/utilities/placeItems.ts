import type { CssmaContext } from '../../types';
// Tailwind place-items utility parser
// https://tailwindcss.com/docs/place-items

export function parsePlaceItems(token: string, context?: CssmaContext): any | null {
  const presets = [
    'start',
    'end',
    'end-safe',
    'center',
    'center-safe',
    'baseline',
    'stretch'
  ];
  for (const preset of presets) {
    if (token === `place-items-${preset}`) {
      return {
        type: 'place-items',
        value: preset,
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset
      };
    }
  }
  return null;
} 
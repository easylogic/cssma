import type { CssmaContext } from '../../types';
// Tailwind place-self utility parser
// https://tailwindcss.com/docs/place-self

export function parsePlaceSelf(token: string, context?: CssmaContext): any | null {
  const presets = [
    'auto',
    'start',
    'end',
    'end-safe',
    'center',
    'center-safe',
    'stretch'
  ];
  for (const preset of presets) {
    if (token === `place-self-${preset}`) {
      return {
        type: 'place-self',
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
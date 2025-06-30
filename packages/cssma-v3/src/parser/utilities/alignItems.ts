import type { CssmaContext } from '../../types';
// Tailwind align-items utility parser
// https://tailwindcss.com/docs/align-items

export function parseAlignItems(token: string, context?: CssmaContext): any | null {
  const presets = [
    'start',
    'end',
    'end-safe',
    'center',
    'center-safe',
    'baseline',
    'baseline-last',
    'stretch'
  ];
  for (const preset of presets) {
    if (token === `items-${preset}`) {
      return {
        type: 'align-items',
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
import type { CssmaContext } from '../../types';
// Tailwind align-self utility parser
// https://tailwindcss.com/docs/align-self

export function parseAlignSelf(token: string, context?: CssmaContext): any | null {
  const presets = [
    'auto',
    'start',
    'end',
    'end-safe',
    'center',
    'center-safe',
    'stretch',
    'baseline',
    'baseline-last'
  ];
  for (const preset of presets) {
    if (token === `self-${preset}`) {
      return {
        type: 'align-self',
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
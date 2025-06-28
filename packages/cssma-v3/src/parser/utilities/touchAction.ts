import type { CssmaContext } from '../../types';
// Tailwind touch-action utility parser
// https://tailwindcss.com/docs/touch-action

const presets = [
  'auto', 'none', 'pan-x', 'pan-left', 'pan-right', 'pan-y', 'pan-up', 'pan-down', 'pinch-zoom', 'manipulation'
];

export function parseTouchAction(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === `touch-${preset}`) return { type: 'touch-action', value: preset, raw: token };
  }
  return null;
} 
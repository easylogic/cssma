// Tailwind text-transform utility parser
// https://tailwindcss.com/docs/text-transform

import type { CssmaContext } from '../../types';

const presets = [
  'uppercase',
  'lowercase',
  'capitalize',
  'normal-case',
];

export function parseTextTransform(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'text-transform', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: text-transform-[value]
  const arbitrary = token.match(/^text-transform-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-transform', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
// Tailwind text-overflow utility parser
// https://tailwindcss.com/docs/text-overflow

import type { CssmaContext } from '../../types';

const presets = [
  'truncate',
  'text-ellipsis',
  'text-clip',
];

export function parseTextOverflow(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'text-overflow', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: text-overflow-[value]
  const arbitrary = token.match(/^text-overflow-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-overflow', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind break-inside utility parser
// https://tailwindcss.com/docs/break-inside

const presets = [
  'auto', 'avoid', 'avoid-page', 'avoid-column'
];

export function parseBreakInside(token: string, context?: CssmaContext): any | null {
  for (const preset of presets) {
    if (token === `break-inside-${preset}`) return { type: 'break-inside', preset, raw: token, arbitrary: false };
  }
  const arbitrary = token.match(/^break-inside-\[(.+)\]$/);
  if (arbitrary) return { type: 'break-inside', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
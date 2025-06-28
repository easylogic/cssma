import type { CssmaContext } from '../../types';
// Tailwind grid-auto-rows utility parser
// https://tailwindcss.com/docs/grid-auto-rows

export function parseGridAutoRows(token: string, context?: CssmaContext): any | null {
  if (token === 'grid-auto-rows-auto') return { type: 'grid-auto-rows', preset: 'auto', raw: token, arbitrary: false };
  if (token === 'grid-auto-rows-min') return { type: 'grid-auto-rows', preset: 'min', raw: token, arbitrary: false };
  if (token === 'grid-auto-rows-max') return { type: 'grid-auto-rows', preset: 'max', raw: token, arbitrary: false };
  if (token === 'grid-auto-rows-fr') return { type: 'grid-auto-rows', preset: 'fr', raw: token, arbitrary: false };
  const arbitrary = token.match(/^grid-auto-rows-\[(.+)\]$/);
  if (arbitrary) return { type: 'grid-auto-rows', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind grid-auto-columns utility parser
// https://tailwindcss.com/docs/grid-auto-columns

export function parseGridAutoColumns(token: string, context?: CssmaContext): any | null {
  if (token === 'grid-auto-cols-auto') return { type: 'grid-auto-columns', preset: 'auto', raw: token, arbitrary: false };
  if (token === 'grid-auto-cols-min') return { type: 'grid-auto-columns', preset: 'min', raw: token, arbitrary: false };
  if (token === 'grid-auto-cols-max') return { type: 'grid-auto-columns', preset: 'max', raw: token, arbitrary: false };
  if (token === 'grid-auto-cols-fr') return { type: 'grid-auto-columns', preset: 'fr', raw: token, arbitrary: false };
  const arbitrary = token.match(/^grid-auto-cols-\[(.+)\]$/);
  if (arbitrary) return { type: 'grid-auto-columns', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
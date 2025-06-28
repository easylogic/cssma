import type { CssmaContext } from '../../types';
// Tailwind col-start utility parser
// https://tailwindcss.com/docs/col-start

export function parseColStart(token: string, context?: CssmaContext): any | null {
  if (token === 'col-start-auto') return { type: 'col-start', preset: 'auto', raw: token, arbitrary: false };
  const num = token.match(/^col-start-(\d+)$/);
  if (num) return { type: 'col-start', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^col-start-\[(.+)\]$/);
  if (arbitrary) return { type: 'col-start', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind col-span utility parser
// https://tailwindcss.com/docs/col-span

export function parseColSpan(token: string, context?: CssmaContext): any | null {
  if (token === 'col-span-full') return { type: 'col-span', preset: 'full', raw: token, arbitrary: false };
  const num = token.match(/^col-span-(\d+)$/);
  if (num) return { type: 'col-span', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^col-span-\[(.+)\]$/);
  if (arbitrary) return { type: 'col-span', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
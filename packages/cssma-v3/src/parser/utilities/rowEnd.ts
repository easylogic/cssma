import type { CssmaContext } from '../../types';
// Tailwind row-end utility parser
// https://tailwindcss.com/docs/row-end

export function parseRowEnd(token: string, context?: CssmaContext): any | null {
  if (token === 'row-end-auto') return { type: 'row-end', preset: 'auto', raw: token, arbitrary: false };
  const num = token.match(/^row-end-(\d+)$/);
  if (num) return { type: 'row-end', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^row-end-\[(.+)\]$/);
  if (arbitrary) return { type: 'row-end', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
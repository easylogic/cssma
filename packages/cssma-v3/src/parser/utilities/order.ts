import type { CssmaContext } from '../../types';
// Tailwind order utility parser
// https://tailwindcss.com/docs/order

export function parseOrder(token: string, context?: CssmaContext): any | null {
  if (token === 'order-first') return { type: 'order', preset: 'first', raw: token, arbitrary: false };
  if (token === 'order-last') return { type: 'order', preset: 'last', raw: token, arbitrary: false };
  if (token === 'order-none') return { type: 'order', preset: 'none', raw: token, arbitrary: false };
  const num = token.match(/^order-(\d+)$/);
  if (num) return { type: 'order', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^order-\[(.+)\]$/);
  if (arbitrary) return { type: 'order', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind flex-grow utility parser
// https://tailwindcss.com/docs/flex-grow

export function parseFlexGrow(token: string, context?: CssmaContext): any | null {
  if (token === 'grow') return { type: 'flex-grow', preset: '1', raw: token, arbitrary: false };
  if (token === 'grow-0') return { type: 'flex-grow', preset: '0', raw: token, arbitrary: false };
  const arbitrary = token.match(/^grow-\[(.+)\]$/);
  if (arbitrary) return { type: 'flex-grow', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
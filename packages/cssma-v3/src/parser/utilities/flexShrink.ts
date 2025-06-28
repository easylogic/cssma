import type { CssmaContext } from '../../types';
// Tailwind flex-shrink utility parser
// https://tailwindcss.com/docs/flex-shrink

export function parseFlexShrink(token: string, context?: CssmaContext): any | null {
  if (token === 'shrink') return { type: 'flex-shrink', preset: '1', raw: token, arbitrary: false };
  if (token === 'shrink-0') return { type: 'flex-shrink', preset: '0', raw: token, arbitrary: false };
  const arbitrary = token.match(/^shrink-\[(.+)\]$/);
  if (arbitrary) return { type: 'flex-shrink', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
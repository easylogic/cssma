import type { CssmaContext } from '../../types';
// Tailwind justify-items utility parser
// https://tailwindcss.com/docs/justify-items

export function parseJustifyItems(token: string, context?: CssmaContext): any | null {
  if (token === 'justify-items-start') return { type: 'justify-items', preset: 'start', raw: token, arbitrary: false };
  if (token === 'justify-items-end') return { type: 'justify-items', preset: 'end', raw: token, arbitrary: false };
  if (token === 'justify-items-center') return { type: 'justify-items', preset: 'center', raw: token, arbitrary: false };
  if (token === 'justify-items-stretch') return { type: 'justify-items', preset: 'stretch', raw: token, arbitrary: false };
  const arbitrary = token.match(/^justify-items-\[(.+)\]$/);
  if (arbitrary) return { type: 'justify-items', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
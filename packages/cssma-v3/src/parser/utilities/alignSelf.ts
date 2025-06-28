import type { CssmaContext } from '../../types';
// Tailwind align-self utility parser
// https://tailwindcss.com/docs/align-self

export function parseAlignSelf(token: string, context?: CssmaContext): any | null {
  if (token === 'self-auto') return { type: 'align-self', preset: 'auto', raw: token, arbitrary: false };
  if (token === 'self-start') return { type: 'align-self', preset: 'start', raw: token, arbitrary: false };
  if (token === 'self-end') return { type: 'align-self', preset: 'end', raw: token, arbitrary: false };
  if (token === 'self-center') return { type: 'align-self', preset: 'center', raw: token, arbitrary: false };
  if (token === 'self-stretch') return { type: 'align-self', preset: 'stretch', raw: token, arbitrary: false };
  if (token === 'self-baseline') return { type: 'align-self', preset: 'baseline', raw: token, arbitrary: false };
  const arbitrary = token.match(/^self-\[(.+)\]$/);
  if (arbitrary) return { type: 'align-self', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
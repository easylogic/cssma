import type { CssmaContext } from '../../types';
// Tailwind place-self utility parser
// https://tailwindcss.com/docs/place-self

export function parsePlaceSelf(token: string, context?: CssmaContext): any | null {
  if (token === 'place-self-auto') return { type: 'place-self', preset: 'auto', raw: token, arbitrary: false };
  if (token === 'place-self-start') return { type: 'place-self', preset: 'start', raw: token, arbitrary: false };
  if (token === 'place-self-end') return { type: 'place-self', preset: 'end', raw: token, arbitrary: false };
  if (token === 'place-self-center') return { type: 'place-self', preset: 'center', raw: token, arbitrary: false };
  if (token === 'place-self-stretch') return { type: 'place-self', preset: 'stretch', raw: token, arbitrary: false };
  const arbitrary = token.match(/^place-self-\[(.+)\]$/);
  if (arbitrary) return { type: 'place-self', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
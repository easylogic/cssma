import type { CssmaContext } from '../../types';
// Tailwind appearance utility parser
// https://tailwindcss.com/docs/appearance

export function parseAppearance(token: string, context?: CssmaContext): any | null {
  if (token === 'appearance-none') {
    return { type: 'appearance', value: 'none', raw: token, preset: 'none' };
  }
  if (token === 'appearance-auto') {
    return { type: 'appearance', value: 'auto', raw: token, preset: 'auto' };
  }
  return null;
} 
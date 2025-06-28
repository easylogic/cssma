import type { CssmaContext } from '../../types';
// Tailwind field-sizing utility parser
// https://tailwindcss.com/docs/field-sizing

export function parseFieldSizing(token: string, context?: CssmaContext): any | null {
  if (token === 'field-sizing-fixed') {
    return { type: 'field-sizing', value: 'fixed', raw: token, preset: 'fixed' };
  }
  if (token === 'field-sizing-content') {
    return { type: 'field-sizing', value: 'content', raw: token, preset: 'content' };
  }
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind resize utility parser
// https://tailwindcss.com/docs/resize

export function parseResize(token: string, context?: CssmaContext): any | null {
  if (token === 'resize') {
    return { type: 'resize', value: 'both', raw: token, preset: 'both' };
  }
  if (token === 'resize-x') {
    return { type: 'resize', value: 'horizontal', raw: token, preset: 'horizontal' };
  }
  if (token === 'resize-y') {
    return { type: 'resize', value: 'vertical', raw: token, preset: 'vertical' };
  }
  if (token === 'resize-none') {
    return { type: 'resize', value: 'none', raw: token, preset: 'none' };
  }
  return null;
} 
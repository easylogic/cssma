import type { CssmaContext } from '../../types';
// Tailwind box-border and box-content utility parser
// https://tailwindcss.com/docs/box-sizing

export function parseBox(token: string, context?: CssmaContext): any | null {
  if (token === 'box-border') return { type: 'box', preset: 'border', raw: token, arbitrary: false };
  if (token === 'box-content') return { type: 'box', preset: 'content', raw: token, arbitrary: false };
  return null;
} 
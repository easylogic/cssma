import type { CssmaContext } from '../../types';
// Tailwind background-origin utility parser
// https://tailwindcss.com/docs/background-origin

export function parseBackgroundOrigin(token: string, context?: CssmaContext): any | null {
  if (token === 'bg-origin-border') {
    return { type: 'background-origin', preset: 'border', raw: token, arbitrary: false };
  }
  if (token === 'bg-origin-padding') {
    return { type: 'background-origin', preset: 'padding', raw: token, arbitrary: false };
  }
  if (token === 'bg-origin-content') {
    return { type: 'background-origin', preset: 'content', raw: token, arbitrary: false };
  }
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind background-clip utility parser
// https://tailwindcss.com/docs/background-clip

export function parseBackgroundClip(token: string, context?: CssmaContext): any | null {
  if (token === 'bg-clip-border') {
    return { type: 'background-clip', preset: 'border', raw: token, arbitrary: false };
  }
  if (token === 'bg-clip-padding') {
    return { type: 'background-clip', preset: 'padding', raw: token, arbitrary: false };
  }
  if (token === 'bg-clip-content') {
    return { type: 'background-clip', preset: 'content', raw: token, arbitrary: false };
  }
  if (token === 'bg-clip-text') {
    return { type: 'background-clip', preset: 'text', raw: token, arbitrary: false };
  }
  return null;
} 
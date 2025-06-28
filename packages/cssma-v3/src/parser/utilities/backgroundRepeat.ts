import type { CssmaContext } from '../../types';
// Tailwind background-repeat utility parser
// https://tailwindcss.com/docs/background-repeat

export function parseBackgroundRepeat(token: string, context?: CssmaContext): any | null {
  if (token === 'bg-repeat') {
    return { type: 'background-repeat', preset: 'repeat', raw: token, arbitrary: false };
  }
  if (token === 'bg-repeat-x') {
    return { type: 'background-repeat', preset: 'repeat-x', raw: token, arbitrary: false };
  }
  if (token === 'bg-repeat-y') {
    return { type: 'background-repeat', preset: 'repeat-y', raw: token, arbitrary: false };
  }
  if (token === 'bg-repeat-space') {
    return { type: 'background-repeat', preset: 'space', raw: token, arbitrary: false };
  }
  if (token === 'bg-repeat-round') {
    return { type: 'background-repeat', preset: 'round', raw: token, arbitrary: false };
  }
  if (token === 'bg-no-repeat') {
    return { type: 'background-repeat', preset: 'no-repeat', raw: token, arbitrary: false };
  }
  return null;
} 
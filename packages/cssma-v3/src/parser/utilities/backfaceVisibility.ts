import type { CssmaContext } from '../../types';
// Tailwind backface-visibility utility parser
// https://tailwindcss.com/docs/backface-visibility

const presetMap: Record<string, string> = {
  'backface-hidden': 'hidden',
  'backface-visible': 'visible',
};

const presetRe = /^(backface-hidden|backface-visible)$/;

export function parseBackfaceVisibility(token: string, context?: CssmaContext): any | null {
  if (presetRe.test(token)) {
    return {
      type: 'backface-visibility',
      value: presetMap[token],
      raw: token,
      preset: token,
    };
  }
  return null;
} 
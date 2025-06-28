import type { CssmaContext } from '../../types';
// Tailwind overflow-wrap utility parser
// https://tailwindcss.com/docs/overflow-wrap

const presets = [
  'break-word', 'anywhere', 'normal',
];

export function parseOverflowWrap(token: string, context?: CssmaContext): any | null {
  if (token.startsWith('overflow-wrap-')) {
    const preset = token.slice(14);
    if (presets.includes(preset)) {
      return { type: 'overflow-wrap', preset, raw: token, arbitrary: false };
    }
  }
  return null;
} 
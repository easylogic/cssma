import type { CssmaContext } from '../../types';
// Tailwind text-wrap utility parser
// https://tailwindcss.com/docs/text-wrap

const presets = [
  'wrap',
  'nowrap',
  'balance',
  'pretty',
];

export function parseTextWrap(token: string, context?: CssmaContext) {
  if (token.startsWith('text-')) {
    const preset = token.slice(5);
    if (presets.includes(preset)) {
      return { type: 'text-wrap', preset, raw: token, arbitrary: false };
    }
  }
  return null;
} 
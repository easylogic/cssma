import type { CssmaContext } from '../../types';
// Tailwind word-break utility parser
// https://tailwindcss.com/docs/word-break

const presets = [
  'normal', 'all', 'keep',
];

export function parseWordBreak(token: string, context?: CssmaContext): any | null {
  if (token.startsWith('break-')) {
    const preset = token.slice(6);
    if (presets.includes(preset)) {
      return { type: 'word-break', preset, raw: token, arbitrary: false };
    }
  }
  return null;
} 
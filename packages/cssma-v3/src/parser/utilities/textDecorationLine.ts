import type { CssmaContext } from '../../types';
// Tailwind text-decoration-line utility parser
// https://tailwindcss.com/docs/text-decoration-line

const presets = [
  'underline',
  'overline',
  'line-through',
  'no-underline',
];

export function parseTextDecorationLine(token: string, context?: CssmaContext): any | null {
  if (presets.includes(token)) {
    let preset = token;
    if (token === 'no-underline') preset = 'none';
    return { type: 'text-decoration-line', preset, raw: token, arbitrary: false };
  }
  return null;
} 
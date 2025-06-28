// Tailwind mask-composite utility parser
// https://tailwindcss.com/docs/mask-composite

import type { CssmaContext } from '../../types';

const presetMap: Record<string, string> = {
  'mask-add': 'add',
  'mask-subtract': 'subtract',
  'mask-intersect': 'intersect',
  'mask-exclude': 'exclude',
};

export function parseMaskComposite(token: string, context?: CssmaContext): any | null {
  if (token in presetMap) {
    return { type: 'mask-composite', value: presetMap[token], raw: token, arbitrary: false };
  }
  return null;
} 
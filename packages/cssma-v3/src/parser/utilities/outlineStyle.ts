import type { CssmaContext } from '../../types';
// Tailwind outline-style utility parser
// https://tailwindcss.com/docs/outline-style

const stylePresets = [
  'solid', 'dashed', 'dotted', 'double', 'none', 'hidden'
];

export function parseOutlineStyle(token: string, context?: CssmaContext): any | null {
  for (const preset of stylePresets) {
    if (token === `outline-${preset}`) {
      // outline-hidden is a special case: outline: 2px solid transparent; outline-offset: 2px;
      if (preset === 'hidden') {
        return {
          type: 'outline-style',
          preset: 'hidden',
          raw: token,
          arbitrary: false,
          special: true,
          style: 'solid',
          width: '2px',
          color: 'transparent',
          offset: '2px',
        };
      }
      return { type: 'outline-style', preset, raw: token, arbitrary: false };
    }
  }
  return null;
} 
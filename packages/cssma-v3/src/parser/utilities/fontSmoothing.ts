import type { CssmaContext } from '../../types';
// Tailwind font-smoothing utility parser
// https://tailwindcss.com/docs/font-smoothing

export function parseFontSmoothing(token: string, context?: CssmaContext): any | null {
  if (token === 'antialiased') {
    return {
      type: 'font-smoothing',
      property: ['-webkit-font-smoothing', '-moz-osx-font-smoothing'],
      value: ['antialiased', 'grayscale'],
      raw: token,
    };
  }
  if (token === 'subpixel-antialiased') {
    return {
      type: 'font-smoothing',
      property: ['-webkit-font-smoothing', '-moz-osx-font-smoothing'],
      value: ['auto', 'auto'],
      raw: token,
    };
  }
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind border-collapse utility parser
// https://tailwindcss.com/docs/border-collapse

const collapseRe = /^border-collapse$/;
const separateRe = /^border-separate$/;

export function parseBorderCollapse(token: string, context?: CssmaContext): any | null {
  if (collapseRe.test(token)) {
    return { type: 'border-collapse', value: 'collapse', raw: token };
  }
  if (separateRe.test(token)) {
    return { type: 'border-collapse', value: 'separate', raw: token };
  }
  return null;
} 
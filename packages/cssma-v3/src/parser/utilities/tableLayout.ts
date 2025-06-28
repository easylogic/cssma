import type { CssmaContext } from '../../types';
// Tailwind table-layout utility parser
// https://tailwindcss.com/docs/table-layout

const autoRe = /^table-auto$/;
const fixedRe = /^table-fixed$/;

export function parseTableLayout(token: string, context?: CssmaContext): any | null {
  if (autoRe.test(token)) {
    return { type: 'table-layout', value: 'auto', raw: token };
  }
  if (fixedRe.test(token)) {
    return { type: 'table-layout', value: 'fixed', raw: token };
  }
  return null;
} 
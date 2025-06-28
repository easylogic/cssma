import type { CssmaContext } from '../../types';
// Tailwind isolation utility parser
// https://tailwindcss.com/docs/isolation

export function parseIsolation(token: string, context?: CssmaContext): any | null {
  if (token === 'isolation-auto') return { type: 'isolation', preset: 'auto' };
  if (token === 'isolation-isolate') return { type: 'isolation', preset: 'isolate' };
  return null;
} 
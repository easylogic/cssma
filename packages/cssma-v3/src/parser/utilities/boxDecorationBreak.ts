import type { CssmaContext } from '../../types';
// Tailwind box-decoration-break utility parser
// https://tailwindcss.com/docs/box-decoration-break

export function parseBoxDecorationBreak(token: string, context?: CssmaContext): any | null {
  if (token === 'box-decoration-clone') return { type: 'box-decoration-break', preset: 'clone', raw: token, arbitrary: false };
  if (token === 'box-decoration-slice') return { type: 'box-decoration-break', preset: 'slice', raw: token, arbitrary: false };
  return null;
} 
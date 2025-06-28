import type { CssmaContext } from '../../types';
// Tailwind grid-row utility parser
// https://tailwindcss.com/docs/grid-row

export function parseGridRow(token: string, context?: CssmaContext): any | null {
  if (token === 'grid-row-auto') return { type: 'grid-row', preset: 'auto', raw: token, arbitrary: false };
  const span = token.match(/^grid-row-span-(\d+)$/);
  if (span) return { type: 'grid-row-span', value: parseInt(span[1], 10), raw: token, arbitrary: false };
  const start = token.match(/^grid-row-start-(\d+)$/);
  if (start) return { type: 'grid-row-start', value: parseInt(start[1], 10), raw: token, arbitrary: false };
  const end = token.match(/^grid-row-end-(\d+)$/);
  if (end) return { type: 'grid-row-end', value: parseInt(end[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^grid-row-(span|start|end)?-?\[(.+)\]$/);
  if (arbitrary) {
    const kind = arbitrary[1] || '';
    return {
      type: kind ? `grid-row-${kind}` : 'grid-row',
      value: arbitrary[2],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
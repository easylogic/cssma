// Tailwind grid-column utility parser
// https://tailwindcss.com/docs/grid-column

export function parseGridColumnUtility(token: string): any | null {
  if (token === 'col-auto') return { type: 'grid-column', preset: 'auto', raw: token, arbitrary: false };
  const span = token.match(/^col-span-(\d+)$/);
  if (span) return { type: 'grid-column', span: parseInt(span[1], 10), raw: token, arbitrary: false };
  const start = token.match(/^col-start-(\d+)$/);
  if (start) return { type: 'grid-column', position: 'start', value: parseInt(start[1], 10), raw: token, arbitrary: false };
  const end = token.match(/^col-end-(\d+)$/);
  if (end) return { type: 'grid-column', position: 'end', value: parseInt(end[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^col-\[(.+)\]$/);
  if (arbitrary) return { type: 'grid-column', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
// Tailwind grid-auto-flow utility parser
// https://tailwindcss.com/docs/grid-auto-flow

export function parseGridAutoFlow(token: string): any | null {
  if (token === 'grid-auto-flow-row') return { type: 'grid-auto-flow', preset: 'row', raw: token, arbitrary: false };
  if (token === 'grid-auto-flow-col') return { type: 'grid-auto-flow', preset: 'col', raw: token, arbitrary: false };
  if (token === 'grid-auto-flow-dense') return { type: 'grid-auto-flow', preset: 'dense', raw: token, arbitrary: false };
  if (token === 'grid-auto-flow-row-dense') return { type: 'grid-auto-flow', preset: 'row-dense', raw: token, arbitrary: false };
  if (token === 'grid-auto-flow-col-dense') return { type: 'grid-auto-flow', preset: 'col-dense', raw: token, arbitrary: false };
  const arbitrary = token.match(/^grid-auto-flow-\[(.+)\]$/);
  if (arbitrary) return { type: 'grid-auto-flow', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
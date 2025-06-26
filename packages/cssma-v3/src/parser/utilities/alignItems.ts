// Tailwind align-items utility parser
// https://tailwindcss.com/docs/align-items

export function parseAlignItems(token: string): any | null {
  if (token === 'items-start') return { type: 'align-items', preset: 'start', raw: token, arbitrary: false };
  if (token === 'items-end') return { type: 'align-items', preset: 'end', raw: token, arbitrary: false };
  if (token === 'items-center') return { type: 'align-items', preset: 'center', raw: token, arbitrary: false };
  if (token === 'items-baseline') return { type: 'align-items', preset: 'baseline', raw: token, arbitrary: false };
  if (token === 'items-stretch') return { type: 'align-items', preset: 'stretch', raw: token, arbitrary: false };
  const arbitrary = token.match(/^items-\[(.+)\]$/);
  if (arbitrary) return { type: 'align-items', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
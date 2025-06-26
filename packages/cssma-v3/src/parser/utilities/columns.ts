// Tailwind columns utility parser
// https://tailwindcss.com/docs/columns

export function parseColumns(token: string): any | null {
  if (token === 'columns-auto') return { type: 'columns', preset: 'auto', raw: token, arbitrary: false };
  const num = token.match(/^columns-(\d+)$/);
  if (num) return { type: 'columns', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^columns-\[(.+)\]$/);
  if (arbitrary) return { type: 'columns', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
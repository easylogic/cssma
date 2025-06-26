// Tailwind grid-template-columns utility parser
// https://tailwindcss.com/docs/grid-template-columns

export function parseGridTemplateColumns(token: string): any | null {
  if (token === 'grid-cols-none') return { type: 'grid-template-columns', preset: 'none', raw: token, arbitrary: false };
  const num = token.match(/^grid-cols-(\d+)$/);
  if (num) return { type: 'grid-template-columns', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^grid-cols-\[(.+)\]$/);
  if (arbitrary) return { type: 'grid-template-columns', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
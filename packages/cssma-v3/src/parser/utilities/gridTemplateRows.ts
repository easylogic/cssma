// Tailwind grid-template-rows utility parser
// https://tailwindcss.com/docs/grid-template-rows

export function parseGridTemplateRows(token: string): any | null {
  if (token === 'grid-rows-none') return { type: 'grid-template-rows', preset: 'none', raw: token, arbitrary: false };
  const num = token.match(/^grid-rows-(\d+)$/);
  if (num) return { type: 'grid-template-rows', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^grid-rows-\[(.+)\]$/);
  if (arbitrary) return { type: 'grid-template-rows', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
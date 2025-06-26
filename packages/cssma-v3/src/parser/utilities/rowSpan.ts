// Tailwind row-span utility parser
// https://tailwindcss.com/docs/row-span

export function parseRowSpan(token: string): any | null {
  if (token === 'row-span-full') return { type: 'row-span', preset: 'full', raw: token, arbitrary: false };
  const num = token.match(/^row-span-(\d+)$/);
  if (num) return { type: 'row-span', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^row-span-\[(.+)\]$/);
  if (arbitrary) return { type: 'row-span', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
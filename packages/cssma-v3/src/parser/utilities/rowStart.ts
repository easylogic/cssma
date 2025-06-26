// Tailwind row-start utility parser
// https://tailwindcss.com/docs/row-start

export function parseRowStart(token: string): any | null {
  if (token === 'row-start-auto') return { type: 'row-start', preset: 'auto', raw: token, arbitrary: false };
  const num = token.match(/^row-start-(\d+)$/);
  if (num) return { type: 'row-start', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^row-start-\[(.+)\]$/);
  if (arbitrary) return { type: 'row-start', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
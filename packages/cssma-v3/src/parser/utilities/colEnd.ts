// Tailwind col-end utility parser
// https://tailwindcss.com/docs/col-end

export function parseColEndUtility(token: string): any | null {
  if (token === 'col-end-auto') return { type: 'col-end', preset: 'auto', raw: token, arbitrary: false };
  const num = token.match(/^col-end-(\d+)$/);
  if (num) return { type: 'col-end', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  const arbitrary = token.match(/^col-end-\[(.+)\]$/);
  if (arbitrary) return { type: 'col-end', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
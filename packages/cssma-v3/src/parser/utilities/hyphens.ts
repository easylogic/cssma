// Tailwind hyphens utility parser
// https://tailwindcss.com/docs/hyphens

const presets = [
  'hyphens-none',
  'hyphens-manual',
  'hyphens-auto',
];

export function parseHyphens(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'hyphens', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: hyphens-[value]
  const arbitrary = token.match(/^hyphens-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'hyphens', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
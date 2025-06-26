// Tailwind text-decoration-line utility parser
// https://tailwindcss.com/docs/text-decoration-line

const presets = [
  'underline',
  'overline',
  'line-through',
  'no-underline',
];

export function parseTextDecorationLine(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'text-decoration-line', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: text-decoration-line-[value]
  const arbitrary = token.match(/^text-decoration-line-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-decoration-line', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
// Tailwind text-decoration-style utility parser
// https://tailwindcss.com/docs/text-decoration-style

const presets = [
  'solid',
  'double',
  'dotted',
  'dashed',
  'wavy',
];

export function parseTextDecorationStyle(token: string): any | null {
  for (const preset of presets) {
    if (token === `decoration-${preset}`) {
      return { type: 'text-decoration-style', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: decoration-[value]
  const arbitrary = token.match(/^decoration-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-decoration-style', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
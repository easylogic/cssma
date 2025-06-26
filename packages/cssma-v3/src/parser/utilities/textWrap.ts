// Tailwind text-wrap utility parser
// https://tailwindcss.com/docs/text-wrap

const presets = [
  'text-wrap',
  'text-nowrap',
  'text-balance',
  'text-pretty',
];

export function parseTextWrap(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'text-wrap', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: text-wrap-[value]
  const arbitrary = token.match(/^text-wrap-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-wrap', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
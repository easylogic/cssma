// Tailwind white-space utility parser
// https://tailwindcss.com/docs/white-space

const presets = [
  'whitespace-normal',
  'whitespace-nowrap',
  'whitespace-pre',
  'whitespace-pre-line',
  'whitespace-pre-wrap',
  'whitespace-break-spaces',
];

export function parseWhiteSpace(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'white-space', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: whitespace-[value]
  const arbitrary = token.match(/^whitespace-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'white-space', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
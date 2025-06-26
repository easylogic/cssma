// Tailwind word-break utility parser
// https://tailwindcss.com/docs/word-break

const presets = [
  'break-normal',
  'break-all',
  'break-keep',
];

export function parseWordBreak(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'word-break', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: break-[value]
  const arbitrary = token.match(/^break-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'word-break', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
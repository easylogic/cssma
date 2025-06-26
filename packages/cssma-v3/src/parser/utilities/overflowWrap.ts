// Tailwind overflow-wrap utility parser
// https://tailwindcss.com/docs/overflow-wrap

const presets = [
  'wrap-break-word',
  'wrap-anywhere',
  'wrap-normal',
];

export function parseOverflowWrap(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'overflow-wrap', preset, raw: token, arbitrary: false };
    }
  }
  // 임의값: wrap-[value]
  const arbitrary = token.match(/^wrap-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'overflow-wrap', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
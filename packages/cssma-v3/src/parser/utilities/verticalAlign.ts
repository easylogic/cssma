// Tailwind vertical-align utility parser
// https://tailwindcss.com/docs/vertical-align

const presets = [
  'align-baseline',
  'align-top',
  'align-middle',
  'align-bottom',
  'align-text-top',
  'align-text-bottom',
  'align-sub',
  'align-super',
];

export function parseVerticalAlign(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) {
      return { type: 'vertical-align', preset, raw: token, arbitrary: false };
    }
  }
  // align-(<custom-property>)
  const customProp = token.match(/^align-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'vertical-align', preset: customProp[1], raw: token, arbitrary: true };
  }
  // align-[value]
  const arbitrary = token.match(/^align-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'vertical-align', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
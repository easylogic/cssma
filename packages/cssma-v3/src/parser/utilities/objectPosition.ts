// Tailwind object-position utility parser
// https://tailwindcss.com/docs/object-position

const presets = [
  'bottom', 'center', 'left', 'left-bottom', 'left-top',
  'right', 'right-bottom', 'right-top', 'top'
];

export function parseObjectPositionUtility(token: string): any | null {
  for (const preset of presets) {
    if (token === `object-${preset}`) return { type: 'object-position', preset, raw: token, arbitrary: false };
  }
  const arbitrary = token.match(/^object-\[(.+)\]$/);
  if (arbitrary) return { type: 'object-position', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
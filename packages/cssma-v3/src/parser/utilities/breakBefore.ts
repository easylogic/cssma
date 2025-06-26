// Tailwind break-before utility parser
// https://tailwindcss.com/docs/break-before

const presets = [
  'auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'
];

export function parseBreakBeforeUtility(token: string): any | null {
  for (const preset of presets) {
    if (token === `break-before-${preset}`) return { type: 'break-before', preset, raw: token, arbitrary: false };
  }
  const arbitrary = token.match(/^break-before-\[(.+)\]$/);
  if (arbitrary) return { type: 'break-before', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
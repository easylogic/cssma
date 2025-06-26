// Tailwind break-after utility parser
// https://tailwindcss.com/docs/break-after

const presets = [
  'auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'
];

export function parseBreakAfterUtility(token: string): any | null {
  for (const preset of presets) {
    if (token === `break-after-${preset}`) return { type: 'break-after', preset, raw: token, arbitrary: false };
  }
  const arbitrary = token.match(/^break-after-\[(.+)\]$/);
  if (arbitrary) return { type: 'break-after', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
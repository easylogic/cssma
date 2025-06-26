// Tailwind overflow utility parser
// https://tailwindcss.com/docs/overflow

const presets = [
  'auto', 'hidden', 'clip', 'visible', 'scroll'
];

export function parseOverflowUtility(token: string): any | null {
  for (const preset of presets) {
    if (token === `overflow-${preset}`) return { type: 'overflow', preset, raw: token, arbitrary: false };
    if (token === `overflow-x-${preset}`) return { type: 'overflow', axis: 'x', preset, raw: token, arbitrary: false };
    if (token === `overflow-y-${preset}`) return { type: 'overflow', axis: 'y', preset, raw: token, arbitrary: false };
  }
  return null;
} 
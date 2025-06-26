// Tailwind clear utility parser
// https://tailwindcss.com/docs/clear

const presets = [
  'left', 'right', 'both', 'none'
];

export function parseClear(token: string): any | null {
  for (const preset of presets) {
    if (token === `clear-${preset}`) return { type: 'clear', preset, raw: token, arbitrary: false };
  }
  return null;
} 
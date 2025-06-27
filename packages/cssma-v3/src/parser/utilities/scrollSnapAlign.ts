// Tailwind scroll-snap-align utility parser
// https://tailwindcss.com/docs/scroll-snap-align

const presets = [
  'start', 'end', 'center', 'align-none'
];

export function parseScrollSnapAlign(token: string): any | null {
  for (const preset of presets) {
    if (token === `snap-${preset}`) return { type: 'scroll-snap-align', value: preset === 'align-none' ? 'none' : preset, raw: token };
  }
  return null;
} 
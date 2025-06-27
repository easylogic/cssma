// Tailwind scroll-snap-stop utility parser
// https://tailwindcss.com/docs/scroll-snap-stop

const presets = [
  'normal', 'always'
];

export function parseScrollSnapStop(token: string): any | null {
  for (const preset of presets) {
    if (token === `snap-${preset}`) return { type: 'scroll-snap-stop', value: preset, raw: token };
  }
  return null;
} 
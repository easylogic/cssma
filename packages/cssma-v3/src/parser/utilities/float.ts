// Tailwind float utility parser
// https://tailwindcss.com/docs/float

const presets = [
  'right', 'left', 'none', 'start', 'end'
];

export function parseFloat(token: string): any | null {
  for (const preset of presets) {
    if (token === `float-${preset}`) return { type: 'float', preset, raw: token, arbitrary: false };
  }
  return null;
} 
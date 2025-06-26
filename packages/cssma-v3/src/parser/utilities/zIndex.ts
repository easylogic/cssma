// Tailwind z-index utility parser
// https://tailwindcss.com/docs/z-index

const presets = ['auto', '0', '10', '20', '30', '40', '50'];

export function parseZIndexUtility(token: string): any | null {
  for (const preset of presets) {
    if (token === `z-${preset}`) {
      if (preset === 'auto') return { type: 'z-index', preset: 'auto', raw: token, arbitrary: false };
      return { type: 'z-index', value: parseInt(preset, 10), raw: token, arbitrary: false };
    }
  }
  const arbitrary = token.match(/^z-\[(.+)\]$/);
  if (arbitrary) return { type: 'z-index', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
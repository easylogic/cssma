// Tailwind forced-color-adjust utility parser
// https://tailwindcss.com/docs/forced-color-adjust

const presets = ['auto', 'none'];

export function parseForcedColorAdjust(token: string): any | null {
  for (const preset of presets) {
    if (token === `forced-color-adjust-${preset}`) {
      return { type: 'forced-color-adjust', value: preset, raw: token };
    }
  }
  return null;
} 
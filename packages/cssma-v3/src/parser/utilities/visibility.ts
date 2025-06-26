// Tailwind visibility utility parser
// https://tailwindcss.com/docs/visibility

const presets = ['visible', 'invisible', 'collapse'];

export function parseVisibilityUtility(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) return { type: 'visibility', preset, raw: token, arbitrary: false };
  }
  return null;
} 
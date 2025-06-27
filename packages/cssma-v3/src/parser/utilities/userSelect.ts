// Tailwind user-select utility parser
// https://tailwindcss.com/docs/user-select

const presets = [
  'none', 'text', 'all', 'auto'
];

export function parseUserSelect(token: string): any | null {
  for (const preset of presets) {
    if (token === `select-${preset}`) return { type: 'user-select', value: preset, raw: token };
  }
  return null;
} 
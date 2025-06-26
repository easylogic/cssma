// Tailwind position utility parser
// https://tailwindcss.com/docs/position

const presets = [
  'static', 'fixed', 'absolute', 'relative', 'sticky'
];

export function parsePosition(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) return { type: 'position', preset, raw: token, arbitrary: false };
  }
  return null;
} 
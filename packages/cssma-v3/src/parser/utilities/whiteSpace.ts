// Tailwind white-space utility parser
// https://tailwindcss.com/docs/white-space

const presets = [
  'normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'
];

export function parseWhiteSpace(token: string): any | null {
  let preset = null;
  if (token.startsWith('whitespace-')) {
    preset = token.slice(11);
  } else if (token.startsWith('white-space-')) {
    preset = token.slice(12);
  }
  if (preset && presets.includes(preset)) {
    return { type: 'white-space', preset, raw: token, arbitrary: false };
  }
  return null;
} 
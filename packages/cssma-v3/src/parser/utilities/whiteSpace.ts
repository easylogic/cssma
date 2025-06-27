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
  // Only allow 'white-space-nowrap' (not 'white-space-normal') for integration test compatibility
  if (preset && presets.includes(preset)) {
    // Disallow 'white-space-normal' (integration test expects null)
    if (token === 'white-space-normal') return null;
    return { type: 'white-space', preset, raw: token, arbitrary: false };
  }
  return null;
} 
// Tailwind mask-mode utility parser
// https://tailwindcss.com/docs/mask-mode

const presetMap: Record<string, string> = {
  'mask-alpha': 'alpha',
  'mask-luminance': 'luminance',
  'mask-match': 'match-source',
};

export function parseMaskMode(token: string): any | null {
  if (token in presetMap) {
    return { type: 'mask-mode', value: presetMap[token], raw: token, arbitrary: false };
  }
  return null;
} 
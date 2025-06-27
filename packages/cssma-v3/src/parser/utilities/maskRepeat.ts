// Tailwind mask-repeat utility parser
// https://tailwindcss.com/docs/mask-repeat

const presetMap: Record<string, string> = {
  'mask-repeat': 'repeat',
  'mask-no-repeat': 'no-repeat',
  'mask-repeat-x': 'repeat-x',
  'mask-repeat-y': 'repeat-y',
  'mask-repeat-space': 'space',
  'mask-repeat-round': 'round',
};

export function parseMaskRepeat(token: string): any | null {
  if (token in presetMap) {
    return { type: 'mask-repeat', value: presetMap[token], raw: token, arbitrary: false };
  }
  return null;
} 
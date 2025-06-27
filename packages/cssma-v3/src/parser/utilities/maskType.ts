// Tailwind mask-type utility parser
// https://tailwindcss.com/docs/mask-type

const presetMap: Record<string, string> = {
  'mask-type-alpha': 'alpha',
  'mask-type-luminance': 'luminance',
};

export function parseMaskType(token: string): any | null {
  if (token in presetMap) {
    return { type: 'mask-type', value: presetMap[token], raw: token, arbitrary: false };
  }
  return null;
} 
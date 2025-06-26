// Tailwind text-decoration-color utility parser
// https://tailwindcss.com/docs/text-decoration-color

const presets = [
  'inherit', 'current', 'transparent', 'black', 'white',
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];

export function parseTextDecorationColor(token: string): any | null {
  if (token === 'decoration-inherit') return { type: 'text-decoration-color', preset: 'inherit', raw: token, arbitrary: false };
  if (token === 'decoration-current') return { type: 'text-decoration-color', preset: 'current', raw: token, arbitrary: false };
  if (token === 'decoration-transparent') return { type: 'text-decoration-color', preset: 'transparent', raw: token, arbitrary: false };
  if (token === 'decoration-black') return { type: 'text-decoration-color', preset: 'black', raw: token, arbitrary: false };
  if (token === 'decoration-white') return { type: 'text-decoration-color', preset: 'white', raw: token, arbitrary: false };

  // decoration-red-500, decoration-blue-600 등
  const palette = token.match(/^decoration-([a-z]+)-(\d{2,3})(?:\/(\d{1,3}))?$/);
  if (palette && presets.includes(palette[1])) {
    return {
      type: 'text-decoration-color',
      preset: `${palette[1]}-${palette[2]}` + (palette[3] ? `/${palette[3]}` : ''),
      raw: token,
      arbitrary: false
    };
  }

  // decoration-(--my-color) (custom property)
  const customProp = token.match(/^decoration-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'text-decoration-color', preset: customProp[1], raw: token, arbitrary: true };
  }

  // decoration-[value] (arbitrary value)
  const arbitrary = token.match(/^decoration-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-decoration-color', preset: arbitrary[1], raw: token, arbitrary: true };
  }

  return null;
} 
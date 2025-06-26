// Tailwind text color utility parser
// https://tailwindcss.com/docs/color

const presets = [
  'inherit', 'current', 'transparent', 'black', 'white',
  // 주요 색상 프리셋 (대표적으로 red, blue, green 등)
  // 실제 구현에서는 전체 팔레트가 필요하지만, 예시로 일부만 나열
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];

export function parseTextColor(token: string): any | null {
  if (token === 'text-inherit') return { type: 'color', preset: 'inherit', raw: token, arbitrary: false };
  if (token === 'text-current') return { type: 'color', preset: 'current', raw: token, arbitrary: false };
  if (token === 'text-transparent') return { type: 'color', preset: 'transparent', raw: token, arbitrary: false };
  if (token === 'text-black') return { type: 'color', preset: 'black', raw: token, arbitrary: false };
  if (token === 'text-white') return { type: 'color', preset: 'white', raw: token, arbitrary: false };

  // text-red-500, text-blue-600 등
  const palette = token.match(/^text-([a-z]+)-(\d{2,3})(?:\/(\d{1,3}))?$/);
  if (palette && presets.includes(palette[1])) {
    return {
      type: 'color',
      preset: `${palette[1]}-${palette[2]}` + (palette[3] ? `/${palette[3]}` : ''),
      raw: token,
      arbitrary: false
    };
  }

  // text-(--my-color) (custom property)
  const customProp = token.match(/^text-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'color', preset: customProp[1], raw: token, arbitrary: true };
  }

  // text-[value] (arbitrary value)
  const arbitrary = token.match(/^text-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'color', preset: arbitrary[1], raw: token, arbitrary: true };
  }

  return null;
} 
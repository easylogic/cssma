// Tailwind background-color utility parser
// https://tailwindcss.com/docs/background-color

export function parseBackgroundColor(token: string): any | null {
  // bg-[<arbitrary-value>]
  const arbitrary = token.match(/^bg-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'background-color', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  // bg-(--custom)
  const customProp = token.match(/^bg-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'background-color', preset: customProp[1], raw: token, arbitrary: true };
  }
  // bg-{color} or bg-{color}/{opacity}
  const color = token.match(/^bg-([a-zA-Z0-9-]+)(?:\/(\d{1,3}))?$/);
  if (color) {
    return {
      type: 'background-color',
      preset: color[1],
      opacity: color[2] ? Number(color[2]) : undefined,
      raw: token,
      arbitrary: false,
    };
  }
  return null;
} 
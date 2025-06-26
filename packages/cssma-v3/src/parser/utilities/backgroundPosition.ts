// Tailwind background-position utility parser
// https://tailwindcss.com/docs/background-position

const presets = [
  'top-left', 'top', 'top-right',
  'left', 'center', 'right',
  'bottom-left', 'bottom', 'bottom-right'
];

export function parseBackgroundPosition(token: string): any | null {
  if (presets.includes(token.replace('bg-', ''))) {
    return {
      type: 'background-position',
      preset: token.replace('bg-', ''),
      raw: token,
      arbitrary: false,
    };
  }
  // bg-position-(<custom-property>)
  const customProp = token.match(/^bg-position-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return {
      type: 'background-position',
      preset: `var(${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }
  // bg-position-[<value>]
  const arbitrary = token.match(/^bg-position-\[(.+)]$/);
  if (arbitrary) {
    return {
      type: 'background-position',
      preset: arbitrary[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
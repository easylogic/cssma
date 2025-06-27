// Tailwind border-style utility parser
// https://tailwindcss.com/docs/border-style

const stylePresets = [
  'solid', 'dashed', 'dotted', 'double', 'hidden', 'none'
];

export function parseBorderStyle(token: string): any | null {
  // border-style: border-solid, border-dashed, ...
  for (const preset of stylePresets) {
    if (token === `border-${preset}`) {
      return { type: 'border-style', preset, raw: token, arbitrary: false };
    }
  }
  // divide-style: divide-solid, divide-dashed, ...
  for (const preset of stylePresets) {
    if (token === `divide-${preset}`) {
      return { type: 'divide-style', preset, raw: token, arbitrary: false };
    }
  }
  return null;
} 
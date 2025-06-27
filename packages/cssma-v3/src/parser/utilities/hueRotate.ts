// Tailwind hue-rotate utility parser
// https://tailwindcss.com/docs/filter-hue-rotate

const presetRe = /^-?hue-rotate-(\d{1,3})$/;
const arbitraryRe = /^hue-rotate-\[(.+)\]$/;
const customVarRe = /^hue-rotate-\((--[\w-]+)\)$/;

export function parseHueRotate(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return {
      type: 'hue-rotate',
      value: Number(m[1]),
      negative: token.startsWith('-'),
      raw: token,
      arbitrary: false
    };
  }
  if ((m = arbitraryRe.exec(token))) {
    return {
      type: 'hue-rotate',
      value: m[1],
      negative: false,
      raw: token,
      arbitrary: true
    };
  }
  if ((m = customVarRe.exec(token))) {
    return {
      type: 'hue-rotate',
      value: `var(${m[1]})`,
      negative: false,
      raw: token,
      arbitrary: true
    };
  }
  return null;
} 
// Tailwind grayscale utility parser
// https://tailwindcss.com/docs/filter-grayscale

const baseRe = /^grayscale$/;
const presetRe = /^grayscale-(\d{1,3})$/;
const arbitraryRe = /^grayscale-\[(.+)\]$/;
const customVarRe = /^grayscale-\((--[\w-]+)\)$/;

export function parseGrayscale(token: string): any | null {
  let m;
  if (baseRe.test(token)) {
    return { type: 'grayscale', value: '100', raw: token, arbitrary: false };
  }
  if ((m = presetRe.exec(token))) {
    return { type: 'grayscale', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'grayscale', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'grayscale', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
// Tailwind backdrop-grayscale utility parser
// https://tailwindcss.com/docs/backdrop-filter-grayscale

const defaultRe = /^backdrop-grayscale$/;
const presetRe = /^backdrop-grayscale-(\d{1,3})$/;
const arbitraryRe = /^backdrop-grayscale-\[(.+)\]$/;
const customVarRe = /^backdrop-grayscale-\((--[\w-]+)\)$/;

export function parseBackdropGrayscale(token: string): any | null {
  let m;
  if (defaultRe.test(token)) {
    return { type: 'backdrop-grayscale', value: '100', raw: token, arbitrary: false, default: true };
  }
  if ((m = presetRe.exec(token))) {
    return { type: 'backdrop-grayscale', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-grayscale', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-grayscale', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
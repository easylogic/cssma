// Tailwind backdrop-brightness utility parser
// https://tailwindcss.com/docs/backdrop-filter-brightness

const presetRe = /^backdrop-brightness-(\d{2,3})$/;
const arbitraryRe = /^backdrop-brightness-\[(.+)\]$/;
const customVarRe = /^backdrop-brightness-\((--[\w-]+)\)$/;

export function parseBackdropBrightness(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'backdrop-brightness', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-brightness', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-brightness', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
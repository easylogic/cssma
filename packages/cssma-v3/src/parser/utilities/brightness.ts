// Tailwind brightness utility parser
// https://tailwindcss.com/docs/filter-brightness

const presetRe = /^brightness-(\d{2,3})$/;
const arbitraryRe = /^brightness-\[(.+)\]$/;
const customVarRe = /^brightness-\((--[\w-]+)\)$/;

export function parseBrightness(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'brightness', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'brightness', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'brightness', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
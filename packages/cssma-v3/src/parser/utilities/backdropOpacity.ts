// Tailwind backdrop-opacity utility parser
// https://tailwindcss.com/docs/backdrop-filter-opacity

const presetRe = /^backdrop-opacity-(\d{1,3})$/;
const arbitraryRe = /^backdrop-opacity-\[(.+)\]$/;
const customVarRe = /^backdrop-opacity-\((--[\w-]+)\)$/;

export function parseBackdropOpacity(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'backdrop-opacity', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-opacity', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-opacity', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
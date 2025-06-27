// Tailwind backdrop-filter utility parser
// https://tailwindcss.com/docs/backdrop-filter

const presetRe = /^backdrop-filter-none$/;
const arbitraryRe = /^backdrop-filter-\[(.+)\]$/;
const customVarRe = /^backdrop-filter-\((--[\w-]+)\)$/;

export function parseBackdropFilter(token: string): any | null {
  let m;
  if (presetRe.test(token)) {
    return { type: 'backdrop-filter', value: 'none', raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-filter', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-filter', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
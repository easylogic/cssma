// Tailwind backdrop-sepia utility parser
// https://tailwindcss.com/docs/backdrop-filter-sepia

const defaultRe = /^backdrop-sepia$/;
const presetRe = /^backdrop-sepia-(\d{1,3})$/;
const arbitraryRe = /^backdrop-sepia-\[(.+)\]$/;
const customVarRe = /^backdrop-sepia-\((--[\w-]+)\)$/;

export function parseBackdropSepia(token: string): any | null {
  let m;
  if (defaultRe.test(token)) {
    return { type: 'backdrop-sepia', value: '100', raw: token, arbitrary: false, default: true };
  }
  if ((m = presetRe.exec(token))) {
    return { type: 'backdrop-sepia', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'backdrop-sepia', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'backdrop-sepia', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
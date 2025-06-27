// Tailwind sepia utility parser
// https://tailwindcss.com/docs/filter-sepia

const baseRe = /^sepia$/;
const presetRe = /^sepia-(\d{1,3})$/;
const arbitraryRe = /^sepia-\[(.+)\]$/;
const customVarRe = /^sepia-\((--[\w-]+)\)$/;

export function parseSepia(token: string): any | null {
  let m;
  if (baseRe.test(token)) {
    return { type: 'sepia', value: '100', raw: token, arbitrary: false };
  }
  if ((m = presetRe.exec(token))) {
    return { type: 'sepia', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'sepia', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'sepia', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
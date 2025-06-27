// Tailwind contrast utility parser
// https://tailwindcss.com/docs/filter-contrast

const presetRe = /^contrast-(\d{1,3})$/;
const arbitraryRe = /^contrast-\[(.+)\]$/;
const customVarRe = /^contrast-\((--[\w-]+)\)$/;

export function parseContrast(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'contrast', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'contrast', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'contrast', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
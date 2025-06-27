// Tailwind saturate utility parser
// https://tailwindcss.com/docs/filter-saturate

const presetRe = /^saturate-(\d{1,3})$/;
const arbitraryRe = /^saturate-\[(.+)\]$/;
const customVarRe = /^saturate-\((--[\w-]+)\)$/;

export function parseSaturate(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'saturate', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'saturate', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'saturate', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
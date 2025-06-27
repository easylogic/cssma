// Tailwind drop-shadow utility parser
// https://tailwindcss.com/docs/filter-drop-shadow

const presetRe = /^drop-shadow-(none|xs|sm|md|lg|xl|2xl|3xl)$/;
const arbitraryRe = /^drop-shadow-\[(.+)\]$/;
const customVarRe = /^drop-shadow-\((--[\w-]+)\)$/;
const colorVarRe = /^drop-shadow-\(color:(--[\w-]+)\)$/;
const colorPresetRe = /^drop-shadow-(inherit|current|transparent|black|white|[a-z]+-\d{2,3}(?:\/\d{1,3})?)$/;

export function parseDropShadow(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'drop-shadow', preset: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'drop-shadow', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'drop-shadow', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  if ((m = colorVarRe.exec(token))) {
    return { type: 'drop-shadow-color', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  if ((m = colorPresetRe.exec(token))) {
    return { type: 'drop-shadow-color', preset: m[1], raw: token, arbitrary: false };
  }
  return null;
} 
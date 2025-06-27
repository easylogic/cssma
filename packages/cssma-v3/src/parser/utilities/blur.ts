// Tailwind blur utility parser
// https://tailwindcss.com/docs/filter-blur

const presetList = [
  'none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'
];

const presetRe = /^blur-(none|2xs|xs|sm|md|lg|xl|2xl|3xl)$/;
const arbitraryRe = /^blur-\[(.+)\]$/;
const customVarRe = /^blur-\((--[\w-]+)\)$/;

export function parseBlur(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'blur', preset: m[1], raw: token, arbitrary: false };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'blur', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'blur', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
import type { CssmaContext } from '../../types';
// Tailwind mask-size utility parser
// https://tailwindcss.com/docs/mask-size

const presetMap: Record<string, string> = {
  'mask-auto': 'auto',
  'mask-cover': 'cover',
  'mask-contain': 'contain',
};

const arbitraryRe = /^mask-size-\[(.+)\]$/;
const customVarRe = /^mask-size-\((--[\w-]+)\)$/;

export function parseMaskSize(token: string, context?: CssmaContext): any | null {
  if (token in presetMap) {
    return { type: 'mask-size', value: presetMap[token], raw: token, arbitrary: false };
  }
  let m;
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'mask-size', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'mask-size', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
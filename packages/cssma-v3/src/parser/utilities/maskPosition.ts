import type { CssmaContext } from '../../types';
// Tailwind mask-position utility parser
// https://tailwindcss.com/docs/mask-position

const presetMap: Record<string, string> = {
  'mask-top-left': 'top left',
  'mask-top': 'top',
  'mask-top-right': 'top right',
  'mask-left': 'left',
  'mask-center': 'center',
  'mask-right': 'right',
  'mask-bottom-left': 'bottom left',
  'mask-bottom': 'bottom',
  'mask-bottom-right': 'bottom right',
};

const arbitraryRe = /^mask-position-\[(.+)\]$/;
const customVarRe = /^mask-position-\((--[\w-]+)\)$/;

export function parseMaskPosition(token: string, context?: CssmaContext): any | null {
  if (token in presetMap) {
    return { type: 'mask-position', value: presetMap[token], raw: token, arbitrary: false };
  }
  let m;
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'mask-position', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'mask-position', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
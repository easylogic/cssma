import type { CssmaContext } from '../../types';
// Tailwind perspective-origin utility parser
// https://tailwindcss.com/docs/perspective-origin

const presetMap: Record<string, string> = {
  'perspective-origin-center': 'center',
  'perspective-origin-top': 'top',
  'perspective-origin-top-right': 'top right',
  'perspective-origin-right': 'right',
  'perspective-origin-bottom-right': 'bottom right',
  'perspective-origin-bottom': 'bottom',
  'perspective-origin-bottom-left': 'bottom left',
  'perspective-origin-left': 'left',
  'perspective-origin-top-left': 'top left',
};

const presetRe = /^(perspective-origin-center|perspective-origin-top|perspective-origin-top-right|perspective-origin-right|perspective-origin-bottom-right|perspective-origin-bottom|perspective-origin-bottom-left|perspective-origin-left|perspective-origin-top-left)$/;
const customPropRe = /^perspective-origin-\((--[\w-]+)\)$/;
const arbitraryRe = /^perspective-origin-\[(.+)\]$/;

export function parsePerspectiveOrigin(token: string, context?: CssmaContext): any | null {
  if (presetRe.test(token)) {
    return {
      type: 'perspective-origin',
      value: presetMap[token],
      raw: token,
      preset: token,
      arbitrary: false,
    };
  }
  const m1 = token.match(customPropRe);
  if (m1) {
    return {
      type: 'perspective-origin',
      value: `var(${m1[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  const m2 = token.match(arbitraryRe);
  if (m2) {
    return {
      type: 'perspective-origin',
      value: m2[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
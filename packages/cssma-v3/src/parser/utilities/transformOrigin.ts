import type { CssmaContext } from '../../types';
// Tailwind transform-origin utility parser
// https://tailwindcss.com/docs/transform-origin

const presetMap: Record<string, string> = {
  'origin-center': 'center',
  'origin-top': 'top',
  'origin-top-right': 'top right',
  'origin-right': 'right',
  'origin-bottom-right': 'bottom right',
  'origin-bottom': 'bottom',
  'origin-bottom-left': 'bottom left',
  'origin-left': 'left',
  'origin-top-left': 'top left',
};

const presetRe = /^(origin-center|origin-top|origin-top-right|origin-right|origin-bottom-right|origin-bottom|origin-bottom-left|origin-left|origin-top-left)$/;
const customPropRe = /^origin-\((--[\w-]+)\)$/;
const arbitraryRe = /^origin-\[(.+)\]$/;

export function parseTransformOrigin(token: string, context?: CssmaContext): any | null {
  if (presetRe.test(token)) {
    return {
      type: 'transform-origin',
      value: presetMap[token],
      raw: token,
      preset: token,
      arbitrary: false,
    };
  }
  let m;
  if ((m = customPropRe.exec(token))) {
    return {
      type: 'transform-origin',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = arbitraryRe.exec(token))) {
    return {
      type: 'transform-origin',
      value: m[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
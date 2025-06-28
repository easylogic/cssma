import type { CssmaContext } from '../../types';
// Tailwind transform-style utility parser
// https://tailwindcss.com/docs/transform-style

const transform3dRe = /^transform-3d$/;
const transformFlatRe = /^transform-flat$/;

export function parseTransformStyle(token: string, context?: CssmaContext): any | null {
  if (transform3dRe.test(token)) {
    return { type: 'transform-style', value: 'preserve-3d', raw: token, preset: '3d' };
  }
  if (transformFlatRe.test(token)) {
    return { type: 'transform-style', value: 'flat', raw: token, preset: 'flat' };
  }
  return null;
} 
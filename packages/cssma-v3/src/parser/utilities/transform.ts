import type { CssmaContext } from '../../types';
// Tailwind transform utility parser
// https://tailwindcss.com/docs/transform

const transformNoneRe = /^transform-none$/;
const transformGpuRe = /^transform-gpu$/;
const transformCpuRe = /^transform-cpu$/;
const transformCustomPropRe = /^transform-\((--[\w-]+)\)$/;
const transformArbitraryRe = /^transform-\[(.+)\]$/;

export function parseTransform(token: string, context?: CssmaContext): any | null {
  if (transformNoneRe.test(token)) {
    return { type: 'transform', value: 'none', raw: token, preset: 'none', arbitrary: false };
  }
  if (transformGpuRe.test(token)) {
    return { type: 'transform', value: 'translateZ(0) var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)', raw: token, preset: 'gpu', arbitrary: false };
  }
  if (transformCpuRe.test(token)) {
    return { type: 'transform', value: 'var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)', raw: token, preset: 'cpu', arbitrary: false };
  }
  let m;
  if ((m = transformCustomPropRe.exec(token))) {
    return {
      type: 'transform',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = transformArbitraryRe.exec(token))) {
    return {
      type: 'transform',
      value: m[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
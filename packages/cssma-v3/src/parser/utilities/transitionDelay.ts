import type { CssmaContext } from '../../types';
// Tailwind transition-delay utility parser
// https://tailwindcss.com/docs/transition-delay

const numberRe = /^delay-(\d+)$/;
const customPropRe = /^delay-\((--[\w-]+)\)$/;
const arbitraryRe = /^delay-\[(.+)\]$/;

export function parseTransitionDelay(token: string, context?: CssmaContext): any | null {
  const m1 = token.match(numberRe);
  if (m1) {
    return {
      type: 'transition-delay',
      value: `${m1[1]}ms`,
      raw: token,
      preset: true,
    };
  }
  const m2 = token.match(customPropRe);
  if (m2) {
    return {
      type: 'transition-delay',
      value: `var(${m2[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  const m3 = token.match(arbitraryRe);
  if (m3) {
    return {
      type: 'transition-delay',
      value: m3[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
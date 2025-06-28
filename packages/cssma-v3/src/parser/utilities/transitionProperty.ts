import type { CssmaContext } from '../../types';
// Tailwind transition-property utility parser
// https://tailwindcss.com/docs/transition-property

const presetMap: Record<string, string> = {
  'transition': 'color, background-color, border-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter',
  'transition-all': 'all',
  'transition-colors': 'color, background-color, border-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',
  'transition-opacity': 'opacity',
  'transition-shadow': 'box-shadow',
  'transition-transform': 'transform, translate, scale, rotate',
  'transition-none': 'none',
};

const presetRe = /^(transition|transition-all|transition-colors|transition-opacity|transition-shadow|transition-transform|transition-none)$/;
const arbitraryRe = /^transition-\[(.+)\]$/;
const customPropRe = /^transition-\((--[\w-]+)\)$/;

export function parseTransitionProperty(token: string, context?: CssmaContext): any | null {
  if (presetRe.test(token)) {
    return {
      type: 'transition-property',
      value: presetMap[token],
      raw: token,
      preset: token,
    };
  }
  const arbitrary = token.match(arbitraryRe);
  if (arbitrary) {
    return {
      type: 'transition-property',
      value: arbitrary[1],
      raw: token,
      arbitrary: true,
    };
  }
  const custom = token.match(customPropRe);
  if (custom) {
    return {
      type: 'transition-property',
      value: `var(${custom[1]})`,
      raw: token,
      arbitrary: false,
      customProperty: true,
    };
  }
  return null;
} 
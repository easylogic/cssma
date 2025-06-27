// Tailwind transition-timing-function utility parser
// https://tailwindcss.com/docs/transition-timing-function

const presetMap: Record<string, string> = {
  'ease-linear': 'linear',
  'ease-in': 'var(--ease-in)',
  'ease-out': 'var(--ease-out)',
  'ease-in-out': 'var(--ease-in-out)',
  'ease-initial': 'initial',
};

const presetRe = /^(ease-linear|ease-in|ease-out|ease-in-out|ease-initial)$/;
const customPropRe = /^ease-\((--[\w-]+)\)$/;
const arbitraryRe = /^ease-\[(.+)\]$/;

export function parseTransitionTimingFunction(token: string): any | null {
  if (presetRe.test(token)) {
    return {
      type: 'transition-timing-function',
      value: presetMap[token],
      raw: token,
      preset: token,
    };
  }
  const custom = token.match(customPropRe);
  if (custom) {
    return {
      type: 'transition-timing-function',
      value: `var(${custom[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  const arbitrary = token.match(arbitraryRe);
  if (arbitrary) {
    return {
      type: 'transition-timing-function',
      value: arbitrary[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
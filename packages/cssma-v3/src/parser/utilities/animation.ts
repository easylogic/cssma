// Tailwind animation utility parser
// https://tailwindcss.com/docs/animation

const presetMap: Record<string, string> = {
  'animate-spin': 'var(--animate-spin)',
  'animate-ping': 'var(--animate-ping)',
  'animate-pulse': 'var(--animate-pulse)',
  'animate-bounce': 'var(--animate-bounce)',
  'animate-none': 'none',
};

const presetRe = /^(animate-spin|animate-ping|animate-pulse|animate-bounce|animate-none)$/;
const customPropRe = /^animate-\((--[\w-]+)\)$/;
const arbitraryRe = /^animate-\[(.+)\]$/;

export function parseAnimation(token: string): any | null {
  if (presetRe.test(token)) {
    return {
      type: 'animation',
      value: presetMap[token],
      raw: token,
      preset: token,
    };
  }
  const m1 = token.match(customPropRe);
  if (m1) {
    return {
      type: 'animation',
      value: `var(${m1[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  const m2 = token.match(arbitraryRe);
  if (m2) {
    return {
      type: 'animation',
      value: m2[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
// Tailwind perspective utility parser
// https://tailwindcss.com/docs/perspective

const presetMap: Record<string, string> = {
  'perspective-dramatic': 'var(--perspective-dramatic)', // 100px
  'perspective-near': 'var(--perspective-near)',         // 300px
  'perspective-normal': 'var(--perspective-normal)',     // 500px
  'perspective-midrange': 'var(--perspective-midrange)', // 800px
  'perspective-distant': 'var(--perspective-distant)',  // 1200px
  'perspective-none': 'none',
};

const presetRe = /^(perspective-dramatic|perspective-near|perspective-normal|perspective-midrange|perspective-distant|perspective-none)$/;
const customPropRe = /^perspective-\((--[\w-]+)\)$/;
const arbitraryRe = /^perspective-\[(.+)\]$/;

export function parsePerspective(token: string): any | null {
  if (presetRe.test(token)) {
    return {
      type: 'perspective',
      value: presetMap[token],
      raw: token,
      preset: token,
    };
  }
  const m1 = token.match(customPropRe);
  if (m1) {
    return {
      type: 'perspective',
      value: `var(${m1[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  const m2 = token.match(arbitraryRe);
  if (m2) {
    return {
      type: 'perspective',
      value: m2[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
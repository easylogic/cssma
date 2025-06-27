// Tailwind transition-duration utility parser
// https://tailwindcss.com/docs/transition-duration

const numberRe = /^duration-(\d+)$/;
const initialRe = /^duration-initial$/;
const customPropRe = /^duration-\((--[\w-]+)\)$/;
const arbitraryRe = /^duration-\[(.+)\]$/;

export function parseTransitionDuration(token: string): any | null {
  const m1 = token.match(numberRe);
  if (m1) {
    return {
      type: 'transition-duration',
      value: `${m1[1]}ms`,
      raw: token,
      preset: true,
    };
  }
  if (initialRe.test(token)) {
    return {
      type: 'transition-duration',
      value: 'initial',
      raw: token,
      preset: true,
    };
  }
  const m2 = token.match(customPropRe);
  if (m2) {
    return {
      type: 'transition-duration',
      value: `var(${m2[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  const m3 = token.match(arbitraryRe);
  if (m3) {
    return {
      type: 'transition-duration',
      value: m3[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
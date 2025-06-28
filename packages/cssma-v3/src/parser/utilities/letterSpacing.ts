import type { CssmaContext } from '../../types';
// Tailwind v4.1 letter-spacing (tracking) parser
// https://tailwindcss.com/docs/letter-spacing

const PRESETS: Record<string, string> = {
  'tighter': 'var(--tracking-tighter)', // -0.05em
  'tight': 'var(--tracking-tight)',     // -0.025em
  'normal': 'var(--tracking-normal)',   // 0em
  'wide': 'var(--tracking-wide)',       // 0.025em
  'wider': 'var(--tracking-wider)',     // 0.05em
  'widest': 'var(--tracking-widest)',   // 0.1em
};

export function parseLetterSpacing(token: string, context?: CssmaContext) {
  // Named preset: tracking-tight, tracking-wide, etc.
  const preset = /^tracking-([a-z]+)$/.exec(token);
  if (preset && PRESETS[preset[1]]) {
    return {
      type: 'letter-spacing',
      value: PRESETS[preset[1]],
      raw: token,
      arbitrary: false,
    };
  }

  // Custom property: tracking-(--foo)
  const customProp = /^tracking-\(--([a-zA-Z0-9-_]+)\)$/.exec(token);
  if (customProp) {
    return {
      type: 'letter-spacing',
      value: `var(--${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }

  // Arbitrary value: tracking-[.25em], tracking-[var(--foo)], etc.
  const arbitrary = /^tracking-\[(.+)\]$/.exec(token);
  if (arbitrary) {
    const value = arbitrary[1].trim();
    if (!value) return null;
    return {
      type: 'letter-spacing',
      value,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
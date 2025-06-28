import type { CssmaContext } from '../../types';
// Tailwind v4.1 list-style-type parser
// https://tailwindcss.com/docs/list-style-type

const PRESETS: Record<string, string> = {
  'disc': 'disc',
  'decimal': 'decimal',
  'none': 'none',
};

export function parseListStyleType(token: string, context?: CssmaContext) {
  // Named presets
  const preset = /^list-(disc|decimal|none)$/.exec(token);
  if (preset) {
    return {
      type: 'list-style-type',
      value: PRESETS[preset[1]],
      raw: token,
      arbitrary: false,
    };
  }

  // Custom property: list-(--foo)
  const customProp = /^list-\(--([a-zA-Z0-9-_]+)\)$/.exec(token);
  if (customProp) {
    return {
      type: 'list-style-type',
      value: `var(--${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }

  // Arbitrary value: list-[<value>]
  const arbitrary = /^list-\[(.+)\]$/.exec(token);
  if (arbitrary) {
    const value = arbitrary[1].trim();
    if (!value) return null;
    return {
      type: 'list-style-type',
      value,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
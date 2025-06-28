import type { CssmaContext } from '../../types';
// Tailwind v4.1 height utility parser
// https://tailwindcss.com/docs/height

const PRESETS: Record<string, string> = {
  '0': '0rem',
  'px': '1px',
  'full': '100%',
  'screen': '100vh',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
};

export function parseHeight(token: string, context?: CssmaContext) {
  const match = /^h-(.+)$/.exec(token);
  if (!match) return null;
  const value = match[1];

  // Preset
  if (PRESETS[value]) {
    return {
      type: 'height',
      value: PRESETS[value],
      raw: token,
      arbitrary: false,
    };
  }

  // Custom property (e.g., h-(--foo))
  const customProp = /^\(\-\-([\w-]+)\)$/.exec(value);
  if (customProp) {
    return {
      type: 'height',
      value: `var(--${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }

  // Arbitrary value (e.g., h-[32rem])
  const arbitrary = /^\[(.+)\]$/.exec(value);
  if (arbitrary) {
    const v = arbitrary[1].trim();
    if (!v) return null;
    return {
      type: 'height',
      value: v,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
// Tailwind v4.1 max-width utility parser
// https://tailwindcss.com/docs/max-width

const PRESETS: Record<string, string> = {
  '0': '0rem',
  'px': '1px',
  'full': '100%',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
  'screen-sm': '640px',
  'screen-md': '768px',
  'screen-lg': '1024px',
  'screen-xl': '1280px',
  'screen-2xl': '1536px',
};

export function parseMaxWidth(token: string) {
  const match = /^max-w-(.+)$/.exec(token);
  if (!match) return null;
  const value = match[1];

  // Preset
  if (PRESETS[value]) {
    return {
      type: 'max-width',
      value: PRESETS[value],
      raw: token,
      arbitrary: false,
    };
  }

  // Screen (dynamic, e.g., max-w-screen-*)
  if (value.startsWith('screen-')) {
    return {
      type: 'max-width',
      value: PRESETS[value] || value.replace('screen-', ''),
      raw: token,
      arbitrary: false,
    };
  }

  // Custom property (e.g., max-w-(--foo))
  const customProp = /^\(\-\-([\w-]+)\)$/.exec(value);
  if (customProp) {
    return {
      type: 'max-width',
      value: `var(--${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }

  // Arbitrary value (e.g., max-w-[32rem])
  const arbitrary = /^\[(.+)\]$/.exec(value);
  if (arbitrary) {
    const v = arbitrary[1].trim();
    if (!v) return null;
    return {
      type: 'max-width',
      value: v,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
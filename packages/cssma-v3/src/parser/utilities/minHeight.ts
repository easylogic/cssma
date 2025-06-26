// Tailwind v4.1 min-height utility parser
// https://tailwindcss.com/docs/min-height

const PRESETS: Record<string, string> = {
  '0': '0rem',
  'px': '1px',
  'full': '100%',
  'screen': '100vh',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
};

export function parseMinHeight(token: string) {
  const match = /^min-h-(.+)$/.exec(token);
  if (!match) return null;
  const value = match[1];

  // Preset
  if (PRESETS[value]) {
    return {
      type: 'min-height',
      value: PRESETS[value],
      raw: token,
      arbitrary: false,
    };
  }

  // Custom property (e.g., min-h-(--foo))
  const customProp = /^\(\-\-([\w-]+)\)$/.exec(value);
  if (customProp) {
    return {
      type: 'min-height',
      value: `var(--${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }

  // Arbitrary value (e.g., min-h-[32rem])
  const arbitrary = /^\[(.+)\]$/.exec(value);
  if (arbitrary) {
    const v = arbitrary[1].trim();
    if (!v) return null;
    return {
      type: 'min-height',
      value: v,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
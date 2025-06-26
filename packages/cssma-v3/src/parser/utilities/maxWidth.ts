import { UtilityParserResult, UtilityParser } from '../core';

// Tailwind v4.1 max-width utilities:
// max-w-0, max-w-px, max-w-full, max-w-min, max-w-max, max-w-fit, max-w-screen-sm, max-w-screen-md, ...
// max-w-[value], max-w-[var(--custom)]

const presetMap: Record<string, string> = {
  '0': '0rem',
  'px': '1px',
  'full': '100%',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
  // Tailwind screens (example values, should match config if dynamic)
  'screen-sm': '640px',
  'screen-md': '768px',
  'screen-lg': '1024px',
  'screen-xl': '1280px',
  'screen-2xl': '1536px',
};

const maxWidthParser: UtilityParser = (input, meta) => {
  const match = input.match(/^max-w-(.+)$/);
  if (!match) return null;
  const value = match[1];

  // Preset
  if (presetMap[value]) {
    return {
      property: 'max-width',
      value: presetMap[value],
      raw: input,
      meta,
    };
  }

  // Screen (dynamic, e.g., max-w-screen-*)
  if (value.startsWith('screen-')) {
    return {
      property: 'max-width',
      value: presetMap[value] || value.replace('screen-', ''),
      raw: input,
      meta,
    };
  }

  // Custom property (e.g., max-w-[var(--foo)])
  const customProp = value.match(/^\[(var\(--[\w-]+\))\]$/);
  if (customProp) {
    return {
      property: 'max-width',
      value: customProp[1],
      raw: input,
      meta,
      arbitrary: true,
    };
  }

  // Arbitrary value (e.g., max-w-[32rem])
  const arbitrary = value.match(/^\[(.+)\]$/);
  if (arbitrary) {
    return {
      property: 'max-width',
      value: arbitrary[1],
      raw: input,
      meta,
      arbitrary: true,
    };
  }

  return null;
};

export default maxWidthParser; 
import { UtilityParserResult, UtilityParser } from '../core';

// Tailwind v4.1 height utilities:
// h-0, h-px, h-full, h-screen, h-min, h-max, h-fit, h-[value], h-[var(--custom)]

const presetMap: Record<string, string> = {
  '0': '0rem',
  'px': '1px',
  'full': '100%',
  'screen': '100vh',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
};

const heightParser: UtilityParser = (input, meta) => {
  const match = input.match(/^h-(.+)$/);
  if (!match) return null;
  const value = match[1];

  // Preset
  if (presetMap[value]) {
    return {
      property: 'height',
      value: presetMap[value],
      raw: input,
      meta,
    };
  }

  // Custom property (e.g., h-[var(--foo)])
  const customProp = value.match(/^\[(var\(--[\w-]+\))\]$/);
  if (customProp) {
    return {
      property: 'height',
      value: customProp[1],
      raw: input,
      meta,
      arbitrary: true,
    };
  }

  // Arbitrary value (e.g., h-[32rem])
  const arbitrary = value.match(/^\[(.+)\]$/);
  if (arbitrary) {
    return {
      property: 'height',
      value: arbitrary[1],
      raw: input,
      meta,
      arbitrary: true,
    };
  }

  return null;
};

export default heightParser; 
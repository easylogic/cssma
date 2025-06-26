import { UtilityParserResult, UtilityParser } from '../core';

// Tailwind v4.1 min-height utilities:
// min-h-0, min-h-px, min-h-full, min-h-screen, min-h-min, min-h-max, min-h-fit, min-h-[value], min-h-[var(--custom)]

const presetMap: Record<string, string> = {
  '0': '0rem',
  'px': '1px',
  'full': '100%',
  'screen': '100vh',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
};

const minHeightParser: UtilityParser = (input, meta) => {
  const match = input.match(/^min-h-(.+)$/);
  if (!match) return null;
  const value = match[1];

  // Preset
  if (presetMap[value]) {
    return {
      property: 'min-height',
      value: presetMap[value],
      raw: input,
      meta,
    };
  }

  // Custom property (e.g., min-h-[var(--foo)])
  const customProp = value.match(/^\[(var\(--[\w-]+\))\]$/);
  if (customProp) {
    return {
      property: 'min-height',
      value: customProp[1],
      raw: input,
      meta,
      arbitrary: true,
    };
  }

  // Arbitrary value (e.g., min-h-[32rem])
  const arbitrary = value.match(/^\[(.+)\]$/);
  if (arbitrary) {
    return {
      property: 'min-height',
      value: arbitrary[1],
      raw: input,
      meta,
      arbitrary: true,
    };
  }

  return null;
};

export default minHeightParser; 
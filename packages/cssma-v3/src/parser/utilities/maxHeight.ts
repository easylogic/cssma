import { UtilityParserResult, UtilityParser } from '../core';

// Tailwind v4.1 max-height utilities:
// max-h-0, max-h-px, max-h-full, max-h-screen, max-h-min, max-h-max, max-h-fit, max-h-[value], max-h-[var(--custom)]

const presetMap: Record<string, string> = {
  '0': '0rem',
  'px': '1px',
  'full': '100%',
  'screen': '100vh',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
};

const maxHeightParser: UtilityParser = (input, meta) => {
  const match = input.match(/^max-h-(.+)$/);
  if (!match) return null;
  const value = match[1];

  // Preset
  if (presetMap[value]) {
    return {
      property: 'max-height',
      value: presetMap[value],
      raw: input,
      meta,
    };
  }

  // Custom property (e.g., max-h-[var(--foo)])
  const customProp = value.match(/^\[(var\(--[\w-]+\))\]$/);
  if (customProp) {
    return {
      property: 'max-height',
      value: customProp[1],
      raw: input,
      meta,
      arbitrary: true,
    };
  }

  // Arbitrary value (e.g., max-h-[32rem])
  const arbitrary = value.match(/^\[(.+)\]$/);
  if (arbitrary) {
    return {
      property: 'max-height',
      value: arbitrary[1],
      raw: input,
      meta,
      arbitrary: true,
    };
  }

  return null;
};

export default maxHeightParser; 
// Tailwind v4.1 font-variant-numeric utilities:
// normal-nums, ordinal, slashed-zero, lining-nums, oldstyle-nums, proportional-nums, tabular-nums, diagonal-fractions, stacked-fractions

const presetMap = {
  'normal-nums': 'normal',
  'ordinal': 'ordinal',
  'slashed-zero': 'slashed-zero',
  'lining-nums': 'lining-nums',
  'oldstyle-nums': 'oldstyle-nums',
  'proportional-nums': 'proportional-nums',
  'tabular-nums': 'tabular-nums',
  'diagonal-fractions': 'diagonal-fractions',
  'stacked-fractions': 'stacked-fractions',
};

export function parseFontVariantNumeric(token: string): any | null {
  if (presetMap[token]) {
    return { type: 'font-variant-numeric', value: presetMap[token], raw: token };
  }
  return null;
}
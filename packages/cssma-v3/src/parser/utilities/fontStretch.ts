// Tailwind v4.1 font-stretch utilities:
// font-stretch-ultra-condensed, font-stretch-extra-condensed, ..., font-stretch-<percentage>, font-stretch-(<custom-property>), font-stretch-[<value>]

const presetMap: Record<string, string> = {
  'ultra-condensed': 'ultra-condensed',
  'extra-condensed': 'extra-condensed',
  'condensed': 'condensed',
  'semi-condensed': 'semi-condensed',
  'normal': 'normal',
  'semi-expanded': 'semi-expanded',
  'expanded': 'expanded',
  'extra-expanded': 'extra-expanded',
  'ultra-expanded': 'ultra-expanded',
};

export function parseFontStretch(token: string): any | null {
  // Named presets
  const preset = token.match(/^font-stretch-(ultra-condensed|extra-condensed|condensed|semi-condensed|normal|semi-expanded|expanded|extra-expanded|ultra-expanded)$/);
  if (preset) {
    return { type: 'font-stretch', value: presetMap[preset[1]], raw: token, arbitrary: false };
  }

  // Percentage: font-stretch-50%, font-stretch-125%, etc.
  const percent = token.match(/^font-stretch-(\d+%?)$/);
  if (percent) {
    return { type: 'font-stretch', value: percent[1], raw: token, arbitrary: true };
  }

  // Custom property: font-stretch-(--my-font-width)
  const customVar = token.match(/^font-stretch-\((--[\w-]+)\)$/);
  if (customVar) {
    return { type: 'font-stretch', value: `var(${customVar[1]})`, raw: token, arbitrary: true };
  }

  // Arbitrary value: font-stretch-[<value>]
  const arbitrary = token.match(/^font-stretch-\[(.+)\]$/);
  if (arbitrary) {
    return { type: 'font-stretch', value: arbitrary[1], raw: token, arbitrary: true };
  }

  return null;
}
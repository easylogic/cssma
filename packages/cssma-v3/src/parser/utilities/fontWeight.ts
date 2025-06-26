// Tailwind font-weight utility parser
// https://tailwindcss.com/docs/font-weight

const presetMap: Record<string, string> = {
  'thin': '100',
  'extralight': '200',
  'light': '300',
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700',
  'extrabold': '800',
  'black': '900',
};

export function parseFontWeight(token: string): any | null {
  // Preset: font-thin, font-bold, etc.
  const preset = token.match(/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/);
  if (preset) {
    return { type: 'font-weight', value: presetMap[preset[1]], raw: token, arbitrary: false };
  }

  // Custom property: font-(--my-font-weight)
  const customVar = token.match(/^font-\((--[\w-]+)\)$/);
  if (customVar) {
    return { type: 'font-weight', value: `var(${customVar[1]})`, raw: token, arbitrary: true };
  }

  // Arbitrary value: font-[<value>]
  const arbitrary = token.match(/^font-\[(.+)\]$/);
  if (arbitrary) {
    return { type: 'font-weight', value: arbitrary[1], raw: token, arbitrary: true };
  }

  return null;
}
// Tailwind v4.1 font-size utilities:
// text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, ..., text-[<value>], text-(length:<custom-property>), text-xs/6, text-[14px]/[20px]

const presetMap = {
  'xs': 'var(--text-xs)',
  'sm': 'var(--text-sm)',
  'base': 'var(--text-base)',
  'lg': 'var(--text-lg)',
  'xl': 'var(--text-xl)',
  '2xl': 'var(--text-2xl)',
  '3xl': 'var(--text-3xl)',
  '4xl': 'var(--text-4xl)',
  '5xl': 'var(--text-5xl)',
  '6xl': 'var(--text-6xl)',
  '7xl': 'var(--text-7xl)',
  '8xl': 'var(--text-8xl)',
  '9xl': 'var(--text-9xl)',
};

const lineHeightVar = (lh: string) => `var(--text-${lh})`;

export function parseFontSize(token: string): any | null {
  // text-xs/6, text-lg/7, etc.
  const presetWithLine = token.match(/^text-([a-z0-9]+)\/(\d+)$/);
  if (presetWithLine && presetMap[presetWithLine[1]]) {
    return { type: 'font-size', value: presetMap[presetWithLine[1]], lineHeight: lineHeightVar(presetWithLine[2]), raw: token, arbitrary: false };
  }
  // text-[<value>]/[<line-height>]
  const arbitraryWithLine = token.match(/^text-\[(.+)\]\/\[(.+)\]$/);
  if (arbitraryWithLine) {
    return { type: 'font-size', value: arbitraryWithLine[1], lineHeight: arbitraryWithLine[2], raw: token, arbitrary: true };
  }
  // text-xs, text-sm, ...
  const preset = token.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/);
  if (preset) {
    return { type: 'font-size', value: presetMap[preset[1]], raw: token, arbitrary: false };
  }
  // text-(length:<custom-property>)
  const customVar = token.match(/^text-\(length:([\w-]+)\)$/);
  if (customVar) {
    return { type: 'font-size', value: `var(--${customVar[1]})`, raw: token, arbitrary: true };
  }
  // text-[var(--foo)]
  const customProp = token.match(/^text-\[(var\(--[\w-]+\))\]$/);
  if (customProp) {
    return { type: 'font-size', value: customProp[1], raw: token, arbitrary: true };
  }
  // text-[<value>]
  const arbitrary = token.match(/^text-\[(.+)\]$/);
  if (arbitrary) {
    return { type: 'font-size', value: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
}
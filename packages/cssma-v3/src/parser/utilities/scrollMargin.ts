// Tailwind scroll-margin utility parser
// https://tailwindcss.com/docs/scroll-margin

const propMap = {
  '': 'scroll-margin',
  'x': 'scroll-margin-inline',
  'y': 'scroll-margin-block',
  't': 'scroll-margin-top',
  'r': 'scroll-margin-right',
  'b': 'scroll-margin-bottom',
  'l': 'scroll-margin-left',
  's': 'scroll-margin-inline-start',
  'e': 'scroll-margin-inline-end',
};

export function parseScrollMargin(token) {
  // scroll-m-4, -scroll-m-4, scroll-mx-2, -scroll-mt-6, etc.
  let m = token.match(/^(-?)scroll-m([a-z]*)-(\d+)$/);
  if (m && m[2] in propMap) {
    const negative = m[1] === '-';
    const dir = m[2];
    const value = `calc(var(--spacing) * ${negative ? '-' : ''}${m[3]})`;
    return { type: 'scroll-margin', property: propMap[dir], value, raw: token, negative };
  }
  // scroll-mt-(--foo), -scroll-mt-(--foo)
  m = token.match(/^(-?)scroll-m([a-z]*)-\((--[\w-]+)\)$/);
  if (m && m[2] in propMap) {
    const negative = m[1] === '-';
    const dir = m[2];
    const value = negative ? `calc(var(--spacing) * -1 * var(${m[3]}))` : `var(${m[3]})`;
    return { type: 'scroll-margin', property: propMap[dir], value, raw: token, customProperty: true, negative };
  }
  // scroll-mt-[value], -scroll-mt-[value]
  m = token.match(/^(-?)scroll-m([a-z]*)-\[(.+)\]$/);
  if (m && m[2] in propMap) {
    const negative = m[1] === '-';
    const dir = m[2];
    const value = negative ? `calc(-1 * ${m[3]})` : m[3];
    return { type: 'scroll-margin', property: propMap[dir], value, raw: token, arbitrary: true, negative };
  }
  return null;
} 
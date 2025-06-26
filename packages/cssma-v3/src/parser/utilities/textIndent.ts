// Tailwind text-indent utility parser
// https://tailwindcss.com/docs/text-indent

export function parseTextIndent(token: string): any | null {
  // indent-<number>
  const pos = token.match(/^indent-(\d+)$/);
  if (pos) {
    return { type: 'text-indent', preset: pos[1], raw: token, arbitrary: false };
  }
  // -indent-<number>
  const neg = token.match(/^\-indent-(\d+)$/);
  if (neg) {
    return { type: 'text-indent', preset: `-${neg[1]}`, raw: token, arbitrary: false };
  }
  // indent-px
  if (token === 'indent-px') {
    return { type: 'text-indent', preset: 'px', raw: token, arbitrary: false };
  }
  // -indent-px
  if (token === '-indent-px') {
    return { type: 'text-indent', preset: '-px', raw: token, arbitrary: false };
  }
  // indent-(<custom-property>)
  const customProp = token.match(/^indent-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'text-indent', preset: customProp[1], raw: token, arbitrary: true };
  }
  // indent-[value]
  const arbitrary = token.match(/^indent-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-indent', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
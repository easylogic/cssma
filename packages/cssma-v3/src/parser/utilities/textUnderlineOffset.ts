// Tailwind text-underline-offset utility parser
// https://tailwindcss.com/docs/text-underline-offset

export function parseTextUnderlineOffset(token: string): any | null {
  // underline-offset-<number>
  const pos = token.match(/^underline-offset-(\d+)$/);
  if (pos) {
    return { type: 'text-underline-offset', preset: pos[1], raw: token, arbitrary: false };
  }
  // -underline-offset-<number>
  const neg = token.match(/^\-underline-offset-(\d+)$/);
  if (neg) {
    return { type: 'text-underline-offset', preset: `-${neg[1]}`, raw: token, arbitrary: false };
  }
  // underline-offset-auto
  if (token === 'underline-offset-auto') {
    return { type: 'text-underline-offset', preset: 'auto', raw: token, arbitrary: false };
  }
  // underline-offset-(<custom-property>)
  const customProp = token.match(/^underline-offset-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'text-underline-offset', preset: customProp[1], raw: token, arbitrary: true };
  }
  // underline-offset-[value]
  const arbitrary = token.match(/^underline-offset-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-underline-offset', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
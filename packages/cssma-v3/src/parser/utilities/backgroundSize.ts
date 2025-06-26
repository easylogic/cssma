// Tailwind background-size utility parser
// https://tailwindcss.com/docs/background-size

export function parseBackgroundSize(token: string): any | null {
  if (token === 'bg-auto') {
    return { type: 'background-size', preset: 'auto', raw: token, arbitrary: false };
  }
  if (token === 'bg-cover') {
    return { type: 'background-size', preset: 'cover', raw: token, arbitrary: false };
  }
  if (token === 'bg-contain') {
    return { type: 'background-size', preset: 'contain', raw: token, arbitrary: false };
  }
  // bg-size-(<custom-property>)
  const customProp = token.match(/^bg-size-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'background-size', preset: `var(${customProp[1]})`, raw: token, arbitrary: true };
  }
  // bg-size-[<value>]
  const arbitrary = token.match(/^bg-size-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'background-size', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
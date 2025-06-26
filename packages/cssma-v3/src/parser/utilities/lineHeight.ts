// Tailwind v4.1 line-height parser
// https://tailwindcss.com/docs/line-height

export function parseLineHeight(token: string) {
  // leading-none
  if (token === 'leading-none') {
    return {
      type: 'line-height',
      value: '1',
      raw: token,
      arbitrary: false,
    };
  }

  // leading-<number>
  const number = /^leading-(\d+)$/.exec(token);
  if (number) {
    return {
      type: 'line-height',
      value: number[1],
      raw: token,
      arbitrary: false,
    };
  }

  // leading-(<custom-property>)
  const customProp = /^leading-\(--([a-zA-Z0-9-_]+)\)$/.exec(token);
  if (customProp) {
    return {
      type: 'line-height',
      value: `var(--${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }

  // leading-[<value>]
  const arbitrary = /^leading-\[(.+)\]$/.exec(token);
  if (arbitrary) {
    const value = arbitrary[1].trim();
    if (!value) return null;
    return {
      type: 'line-height',
      value,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
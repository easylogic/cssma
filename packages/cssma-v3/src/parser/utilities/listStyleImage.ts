// Tailwind v4.1 list-style-image parser
// https://tailwindcss.com/docs/list-style-image

export function parseListStyleImage(token: string) {
  // list-image-none
  if (token === 'list-image-none') {
    return {
      type: 'list-style-image',
      value: 'none',
      raw: token,
      arbitrary: false,
    };
  }

  // list-image-(<custom-property>)
  const customProp = /^list-image-\(--([a-zA-Z0-9-_]+)\)$/.exec(token);
  if (customProp) {
    return {
      type: 'list-style-image',
      value: `var(--${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }

  // list-image-[<value>]
  const arbitrary = /^list-image-\[(.+)\]$/.exec(token);
  if (arbitrary) {
    const value = arbitrary[1].trim();
    if (!value) return null;
    return {
      type: 'list-style-image',
      value,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
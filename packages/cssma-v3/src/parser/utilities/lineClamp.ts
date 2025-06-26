// Tailwind v4.1 line-clamp parser
// https://tailwindcss.com/docs/line-clamp

export function parseLineClamp(token: string) {
  // line-clamp-none
  if (token === 'line-clamp-none') {
    return {
      type: 'line-clamp',
      value: 'none',
      raw: token,
      arbitrary: false,
    };
  }

  // line-clamp-<number>
  const number = /^line-clamp-(\d+)$/.exec(token);
  if (number) {
    return {
      type: 'line-clamp',
      value: number[1],
      raw: token,
      arbitrary: false,
    };
  }

  // line-clamp-(<custom-property>)
  const customProp = /^line-clamp-\(--([a-zA-Z0-9-_]+)\)$/.exec(token);
  if (customProp) {
    return {
      type: 'line-clamp',
      value: `var(--${customProp[1]})`,
      raw: token,
      arbitrary: true,
    };
  }

  // line-clamp-[<value>]
  const arbitrary = /^line-clamp-\[(.+)\]$/.exec(token);
  if (arbitrary) {
    const value = arbitrary[1].trim();
    if (!value) return null;
    return {
      type: 'line-clamp',
      value,
      raw: token,
      arbitrary: true,
    };
  }

  return null;
} 
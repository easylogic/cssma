// Tailwind scroll-snap-type utility parser
// https://tailwindcss.com/docs/scroll-snap-type

const presets = [
  'none', 'x', 'y', 'both', 'mandatory', 'proximity'
];

export function parseScrollSnapType(token: string): any | null {
  if (token === 'snap-none') return { type: 'scroll-snap-type', value: 'none', raw: token };
  if (token === 'snap-x') return { type: 'scroll-snap-type', value: 'x', strictness: 'var(--tw-scroll-snap-strictness)', raw: token };
  if (token === 'snap-y') return { type: 'scroll-snap-type', value: 'y', strictness: 'var(--tw-scroll-snap-strictness)', raw: token };
  if (token === 'snap-both') return { type: 'scroll-snap-type', value: 'both', strictness: 'var(--tw-scroll-snap-strictness)', raw: token };
  if (token === 'snap-mandatory') return { type: 'scroll-snap-type-strictness', value: 'mandatory', property: '--tw-scroll-snap-strictness', raw: token };
  if (token === 'snap-proximity') return { type: 'scroll-snap-type-strictness', value: 'proximity', property: '--tw-scroll-snap-strictness', raw: token };
  return null;
} 
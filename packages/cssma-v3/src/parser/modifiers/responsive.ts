// Tailwind 4.1+ responsive variant 파서
// sm, md, lg, xl, 2xl, xs, 3xl, max-sm, min-[475px] 등 지원

const RESPONSIVE_PRESETS = [
  'sm', 'md', 'lg', 'xl', '2xl', 'xs', '3xl'
];

export function parseResponsiveModifier(token: string) {
  if (!token) return null;

  // min-[475px], max-[960px] 등 arbitrary value
  const minMaxArb = token.match(/^(min|max)-\[(.+)\]$/);
  if (minMaxArb) {
    if (!minMaxArb[2]) return null;
    return { type: 'responsive', variant: minMaxArb[1], value: minMaxArb[2] };
  }

  // max-lg 등
  const max = token.match(/^max-([a-z0-9]+)$/);
  if (max && RESPONSIVE_PRESETS.includes(max[1])) {
    return { type: 'responsive', variant: token };
  }

  // sm, md, ...
  if (RESPONSIVE_PRESETS.includes(token)) {
    return { type: 'responsive', variant: token };
  }

  return null;
} 
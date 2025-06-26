// Tailwind flex utility parser
// https://tailwindcss.com/docs/flex-direction
// https://tailwindcss.com/docs/flex-wrap
// https://tailwindcss.com/docs/flex

const presets = [
  'row', 'row-reverse', 'col', 'col-reverse',
  'wrap', 'wrap-reverse', 'nowrap',
  '1', 'auto', 'initial', 'none'
];

export function parseFlex(token: string): any | null {
  // Direction
  if (token === 'flex-row') return { type: 'flex-direction', preset: 'row', raw: token, arbitrary: false };
  if (token === 'flex-row-reverse') return { type: 'flex-direction', preset: 'row-reverse', raw: token, arbitrary: false };
  if (token === 'flex-col') return { type: 'flex-direction', preset: 'col', raw: token, arbitrary: false };
  if (token === 'flex-col-reverse') return { type: 'flex-direction', preset: 'col-reverse', raw: token, arbitrary: false };
  // Wrap
  if (token === 'flex-wrap') return { type: 'flex-wrap', preset: 'wrap', raw: token, arbitrary: false };
  if (token === 'flex-wrap-reverse') return { type: 'flex-wrap', preset: 'wrap-reverse', raw: token, arbitrary: false };
  if (token === 'flex-nowrap') return { type: 'flex-wrap', preset: 'nowrap', raw: token, arbitrary: false };
  // Flex
  if (token === 'flex-1') return { type: 'flex', preset: '1', raw: token, arbitrary: false };
  if (token === 'flex-auto') return { type: 'flex', preset: 'auto', raw: token, arbitrary: false };
  if (token === 'flex-initial') return { type: 'flex', preset: 'initial', raw: token, arbitrary: false };
  if (token === 'flex-none') return { type: 'flex', preset: 'none', raw: token, arbitrary: false };
  // Arbitrary
  const arbitrary = token.match(/^flex-\[(.+)\]$/);
  if (arbitrary) return { type: 'flex', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
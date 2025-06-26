// Tailwind place-items utility parser
// https://tailwindcss.com/docs/place-items

export function parsePlaceItemsUtility(token: string): any | null {
  if (token === 'place-items-start') return { type: 'place-items', preset: 'start', raw: token, arbitrary: false };
  if (token === 'place-items-end') return { type: 'place-items', preset: 'end', raw: token, arbitrary: false };
  if (token === 'place-items-center') return { type: 'place-items', preset: 'center', raw: token, arbitrary: false };
  if (token === 'place-items-stretch') return { type: 'place-items', preset: 'stretch', raw: token, arbitrary: false };
  const arbitrary = token.match(/^place-items-\[(.+)\]$/);
  if (arbitrary) return { type: 'place-items', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
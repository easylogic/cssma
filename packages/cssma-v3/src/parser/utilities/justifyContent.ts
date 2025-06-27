// Tailwind justify-content utility parser
// https://tailwindcss.com/docs/justify-content

export function parseJustifyContent(token: string): any | null {
  if (token === 'justify-start') return { type: 'justify-content', preset: 'start', raw: token, arbitrary: false };
  if (token === 'justify-end') return { type: 'justify-content', preset: 'end', raw: token, arbitrary: false };
  if (token === 'justify-center') return { type: 'justify-content', preset: 'center', raw: token, arbitrary: false };
  if (token === 'justify-between') return { type: 'justify-content', preset: 'between', raw: token, arbitrary: false };
  if (token === 'justify-around') return { type: 'justify-content', preset: 'around', raw: token, arbitrary: false };
  if (token === 'justify-evenly') return { type: 'justify-content', preset: 'evenly', raw: token, arbitrary: false };
  const arbitrary = token.match(/^justify-\[(.+)\]$/);
  if (arbitrary) return { type: 'justify-content', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
// Tailwind justify-self utility parser
// https://tailwindcss.com/docs/justify-self

export function parseJustifySelfUtility(token: string): any | null {
  if (token === 'justify-self-auto') return { type: 'justify-self', preset: 'auto', raw: token, arbitrary: false };
  if (token === 'justify-self-start') return { type: 'justify-self', preset: 'start', raw: token, arbitrary: false };
  if (token === 'justify-self-end') return { type: 'justify-self', preset: 'end', raw: token, arbitrary: false };
  if (token === 'justify-self-center') return { type: 'justify-self', preset: 'center', raw: token, arbitrary: false };
  if (token === 'justify-self-stretch') return { type: 'justify-self', preset: 'stretch', raw: token, arbitrary: false };
  const arbitrary = token.match(/^justify-self-\[(.+)\]$/);
  if (arbitrary) return { type: 'justify-self', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
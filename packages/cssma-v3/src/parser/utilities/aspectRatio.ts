// Tailwind aspect-ratio utility parser
// https://tailwindcss.com/docs/aspect-ratio

export function parseAspectRatioUtility(token: string): any | null {
  if (token === 'aspect-square') return { type: 'aspect-ratio', preset: 'square', value: '1/1', raw: token, arbitrary: false };
  if (token === 'aspect-video') return { type: 'aspect-ratio', preset: 'video', value: '16/9', raw: token, arbitrary: false };
  if (token === 'aspect-auto') return { type: 'aspect-ratio', preset: 'auto', value: 'auto', raw: token, arbitrary: false };
  // aspect-3/2 등
  const ratio = token.match(/^aspect-(\d+\/\d+)$/);
  if (ratio) return { type: 'aspect-ratio', value: ratio[1], raw: token, arbitrary: false };
  // aspect-(--my-aspect-ratio)
  const customVar = token.match(/^aspect-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customVar) return { type: 'aspect-ratio', customProperty: customVar[1], raw: token, arbitrary: false };
  // aspect-[calc(4*3+1)/3] 등 arbitrary value
  const arbitrary = token.match(/^aspect-\[(.+)\]$/);
  if (arbitrary) return { type: 'aspect-ratio', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
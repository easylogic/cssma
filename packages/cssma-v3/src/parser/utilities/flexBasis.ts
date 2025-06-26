// Tailwind flex-basis utility parser
// https://tailwindcss.com/docs/flex-basis

const containerPresets = [
  '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '4xs'
];

export function parseFlexBasisUtility(token: string): any | null {
  if (token === 'basis-0') return { type: 'flex-basis', preset: '0', raw: token, arbitrary: false };
  if (token === 'basis-full') return { type: 'flex-basis', preset: 'full', raw: token, arbitrary: false };
  if (token === 'basis-auto') return { type: 'flex-basis', preset: 'auto', raw: token, arbitrary: false };
  if (token === 'basis-px') return { type: 'flex-basis', preset: 'px', raw: token, arbitrary: false };
  // basis-<number> (spacing scale)
  const num = token.match(/^basis-(\d+)$/);
  if (num) return { type: 'flex-basis', value: parseInt(num[1], 10), raw: token, arbitrary: false };
  // basis-<fraction>
  const fraction = token.match(/^basis-(\d+\/\d+)$/);
  if (fraction) return { type: 'flex-basis', value: fraction[1], raw: token, arbitrary: false };
  // basis-3xs ~ basis-7xl, basis-4xs
  for (const preset of containerPresets) {
    if (token === `basis-${preset}`) return { type: 'flex-basis', preset, raw: token, arbitrary: false };
  }
  // basis-(<custom-property>)
  const customVar = token.match(/^basis-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customVar) return { type: 'flex-basis', customProperty: customVar[1], raw: token, arbitrary: false };
  // basis-[<arbitrary>]
  const arbitrary = token.match(/^basis-\[(.+)\]$/);
  if (arbitrary) return { type: 'flex-basis', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
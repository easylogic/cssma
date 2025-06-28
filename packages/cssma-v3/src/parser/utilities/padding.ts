import type { CssmaContext } from '../../types';
// Tailwind padding utility parser
// https://tailwindcss.com/docs/padding

const directions = {
  '': 'all',
  'x': 'inline',
  'y': 'block',
  's': 'inline-start',
  'e': 'inline-end',
  't': 'top',
  'r': 'right',
  'b': 'bottom',
  'l': 'left',
};

export function parsePadding(token: string, context?: CssmaContext): any | null {
  // p-*, px-*, py-*, ps-*, pe-*, pt-*, pr-*, pb-*, pl-*
  const match = token.match(/^p([xysetrbl]?)\-(.+)$/);
  if (!match) return null;
  const [, dir, valRaw] = match;
  const val = valRaw.trim();
  const direction = directions[dir] || 'all';

  // p-<number>
  if (/^\d+$/.test(val)) return { type: 'padding', value: parseInt(val, 10), direction, raw: token, arbitrary: false };
  // p-px
  if (val === 'px') return { type: 'padding', preset: 'px', direction, raw: token, arbitrary: false };
  // p-(<custom-property>) or pb-(--foo) etc. (allow whitespace, use RegExp literal with anchors)
  let custom = val.match(/^\(\s*(--[a-zA-Z0-9-_]+)\s*\)$/);
  if (custom) return { type: 'padding', value: `var(${custom[1]})`, direction, raw: token, arbitrary: false };
  custom = val.match(/^(--[a-zA-Z0-9-_]+)$/);
  if (custom) return { type: 'padding', value: `var(${custom[1]})`, direction, raw: token, arbitrary: false };
  // p-[<value>]
  const arbitrary = val.match(/^\[(.+)\]$/);
  if (arbitrary) return { type: 'padding', value: arbitrary[1], direction, raw: token, arbitrary: true };
  return null;
}
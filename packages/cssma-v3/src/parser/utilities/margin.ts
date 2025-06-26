// Tailwind margin utility parser
// https://tailwindcss.com/docs/margin

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

export function parseMargin(token: string): any | null {
  // Handle negative margin
  const negative = token.startsWith('-');
  const t = negative ? token.slice(1) : token;
  // m-*, mx-*, my-*, ms-*, me-*, mt-*, mr-*, mb-*, ml-*
  const match = t.match(/^m([xysetrbl]?)\-(.+)$/);
  if (!match) return null;
  const [, dir, valRaw] = match;
  const val = valRaw.trim();
  const direction = directions[dir] || 'all';

  // m-<number>
  if (/^\d+$/.test(val)) return { type: 'margin', value: parseInt(val, 10), direction, raw: token, arbitrary: false, negative };
  // m-px
  if (val === 'px') return { type: 'margin', preset: 'px', direction, raw: token, arbitrary: false, negative };
  // m-(<custom-property>) or mb-(--foo) etc. (allow whitespace)
  let custom = val.match(/^\(\s*(--[a-zA-Z0-9-_]+)\s*\)$/);
  if (!custom) custom = val.match(/^(--[a-zA-Z0-9-_]+)$/);
  if (custom) return { type: 'margin', value: `var(${custom[1]})`, direction, raw: token, arbitrary: false, negative };
  // m-[<value>]
  const arbitrary = val.match(/^\[(.+)\]$/);
  if (arbitrary) return { type: 'margin', value: arbitrary[1], direction, raw: token, arbitrary: true, negative };
  return null;
} 
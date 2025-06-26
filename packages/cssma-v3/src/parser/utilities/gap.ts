// Tailwind gap utility parser
// https://tailwindcss.com/docs/gap

export function parseGapUtility(token: string): any | null {
  // gap-*, gap-x-*, gap-y-*
  let match = token.match(/^gap(?:-([xy]))?-(.+)$/);
  if (!match) return null;
  const [, axis, valRaw] = match;
  const val = valRaw.trim();

  // gap-<number>
  if (/^\d+$/.test(val)) return { type: 'gap', value: parseInt(val, 10), axis: axis || 'both', raw: token, arbitrary: false };
  // gap-px
  if (val === 'px') return { type: 'gap', preset: 'px', axis: axis || 'both', raw: token, arbitrary: false };
  // gap-(<custom-property>)
  let custom = val.match(/^\(\s*(--[a-zA-Z0-9-_]+)\s*\)$/);
  if (!custom) custom = val.match(/^(--[a-zA-Z0-9-_]+)$/);
  if (custom) return { type: 'gap', value: `var(${custom[1]})`, axis: axis || 'both', raw: token, arbitrary: false };
  // gap-[<value>]
  const arbitrary = val.match(/^\[(.+)\]$/);
  if (arbitrary) return { type: 'gap', value: arbitrary[1], axis: axis || 'both', raw: token, arbitrary: true };
  return null;
} 
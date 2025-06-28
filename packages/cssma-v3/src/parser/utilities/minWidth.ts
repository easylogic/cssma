import type { CssmaContext } from '../../types';
// Tailwind min-width utility parser
// https://tailwindcss.com/docs/min-width

const presetMap = [
  '0','full','min','max','fit','px','screen','dvw','dvh','lvw','lvh','svw','svh'
];

export function parseMinWidth(token: string, context?: CssmaContext): any | null {
  // min-w-<preset>, min-w-(<custom-property>), min-w-[<value>]
  const match = token.match(/^min-w\-(.+)$/);
  if (!match) return null;
  const val = match[1].trim();

  // min-w-<preset>
  if (presetMap.includes(val)) return { type: 'min-width', preset: val, raw: token, arbitrary: false };
  // min-w-(<custom-property>)
  let custom = val.match(/^\(\s*(--[a-zA-Z0-9-_]+)\s*\)$/);
  if (!custom) custom = val.match(/^(--[a-zA-Z0-9-_]+)$/);
  if (custom) return { type: 'min-width', value: `var(${custom[1]})`, raw: token, arbitrary: false };
  // min-w-[<value>]
  const arbitrary = val.match(/^\[(.+)\]$/);
  if (arbitrary) return { type: 'min-width', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
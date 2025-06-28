import type { CssmaContext } from '../../types';
// Tailwind width utility parser
// https://tailwindcss.com/docs/width

const presetMap = [
  '3xs','2xs','xs','sm','md','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl',
  'auto','px','full','screen','dvw','dvh','lvw','lvh','svw','svh','min','max','fit'
];

export function parseWidth(token: string, context?: CssmaContext): any | null {
  // w-<number>, w-<fraction>, w-<preset>, w-(<custom-property>), w-[<value>]
  const match = token.match(/^w\-(.+)$/);
  if (!match) return null;
  const val = match[1].trim();

  // w-<number>
  if (/^\d+$/.test(val)) return { type: 'width', value: parseInt(val, 10), raw: token, arbitrary: false };
  // w-<fraction>
  if (/^\d+\/\d+$/.test(val)) return { type: 'width', value: val, raw: token, arbitrary: false };
  // w-<preset>
  if (presetMap.includes(val)) return { type: 'width', preset: val, raw: token, arbitrary: false };
  // w-(<custom-property>)
  let custom = val.match(/^\(\s*(--[a-zA-Z0-9-_]+)\s*\)$/);
  if (!custom) custom = val.match(/^(--[a-zA-Z0-9-_]+)$/);
  if (custom) return { type: 'width', value: `var(${custom[1]})`, raw: token, arbitrary: false };
  // w-[<value>]
  const arbitrary = val.match(/^\[(.+)\]$/);
  if (arbitrary) return { type: 'width', value: arbitrary[1], raw: token, arbitrary: true };
  return null;
} 
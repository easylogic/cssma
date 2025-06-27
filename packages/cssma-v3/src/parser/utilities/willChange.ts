// Tailwind will-change utility parser
// https://tailwindcss.com/docs/will-change

import { extractArbitraryValue } from '../utils';

const presets = [
  'auto',
  'scroll',
  'contents',
  'transform',
];

export function parseWillChange(token: string): any | null {
  if (token.startsWith('will-change-')) {
    const value = token.slice(12);
    // Preset
    if (presets.includes(value)) {
      return { type: 'will-change', preset: value, value, raw: token, arbitrary: false };
    }
    // Custom property: will-change-(--foo)
    if (value.startsWith('(--') && value.endsWith(')')) {
      const prop = value.slice(1, -1);
      if (/^--[a-zA-Z0-9-_]+$/.test(prop)) {
        return { type: 'will-change', value: `var(${prop})`, raw: token, customProperty: true };
      }
    }
    // Arbitrary value: will-change-[top,left]
    const arb = extractArbitraryValue(token, 'will-change');
    if (arb && arb.trim().length > 0) {
      return { type: 'will-change', value: arb.trim(), raw: token, arbitrary: true };
    }
  }
  return null;
} 
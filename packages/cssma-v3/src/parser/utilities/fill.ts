// Tailwind fill utility parser
// https://tailwindcss.com/docs/fill
import { extractArbitraryValue, isColorValue } from '../utils';

const presets = [
  'none',
  'inherit',
  'current',
  'transparent',
  'black',
  'white',
  // Add all Tailwind color tokens as needed, e.g. 'red-500', 'gray-900', etc.
];

function isCustomProperty(val: string): boolean {
  return val.startsWith('--') && /^[a-zA-Z0-9-_]+$/.test(val.slice(2));
}

export function parseFill(token: string): any | null {
  if (token.startsWith('fill-')) {
    const value = token.slice(5);
    // Preset
    if (presets.includes(value) || /^([a-z]+)-(\d{2,3}|[a-z]+)$/.test(value)) {
      return { type: 'fill', preset: value, raw: token, arbitrary: false };
    }
    // Custom property: fill-(--foo)
    if (value.startsWith('(--') && value.endsWith(')')) {
      const prop = value.slice(1, -1);
      if (isCustomProperty(prop)) {
        return { type: 'fill', value: `var(${prop})`, raw: token, customProperty: true };
      }
    }
    // Arbitrary value: fill-[<color>]
    const arb = extractArbitraryValue(token, 'fill');
    if (arb && (isColorValue(arb) || arb.startsWith('var('))) {
      return { type: 'fill', value: arb, raw: token, arbitrary: true };
    }
  }
  return null;
} 
// Tailwind stroke-width utility parser
// https://tailwindcss.com/docs/stroke-width
import { extractArbitraryValue, isLengthValue } from '../utils';
import type { CssmaContext } from '../../types';

export function parseStrokeWidth(token: string, context?: CssmaContext): any | null {
  if (token.startsWith('stroke-')) {
    const value = token.slice(7);
    // Numeric preset: stroke-1, stroke-2, etc.
    if (/^\d+(\.\d+)?$/.test(value)) {
      return { type: 'stroke-width', value, raw: token, arbitrary: false };
    }
    // Custom property: stroke-(length:--foo)
    if (value.startsWith('(length:--') && value.endsWith(')')) {
      const prop = value.slice(8, -1); // --foo
      if (/^--[a-zA-Z0-9-_]+$/.test(prop)) {
        return { type: 'stroke-width', value: `var(${prop})`, raw: token, customProperty: true };
      }
    }
    // Arbitrary value: stroke-[1.5], stroke-[length:var(--foo)]
    const arb = extractArbitraryValue(token, 'stroke');
    if (arb && (isLengthValue(arb) || arb.startsWith('length:var('))) {
      return { type: 'stroke-width', value: arb.replace(/^length:/, ''), raw: token, arbitrary: true };
    }
  }
  return null;
} 
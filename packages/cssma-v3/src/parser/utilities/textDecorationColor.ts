// Tailwind text-decoration-color utility parser
// https://tailwindcss.com/docs/text-decoration-color

import { extractArbitraryValue, isColorValue } from '../utils';
import type { CssmaContext } from '../../types';

const presetKeywords = [
  'inherit', 'current', 'transparent', 'black', 'white',
  // theme palette prefixes
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
  // custom theme color example
  'regal-blue'
];

export function parseTextDecorationColor(token: string, context?: CssmaContext): any | null {
  // decoration-inherit, decoration-current, etc.
  if (token.startsWith('decoration-')) {
    const rest = token.slice('decoration-'.length);
    if (presetKeywords.includes(rest)) {
      return { type: 'text-decoration-color', preset: rest, raw: token, arbitrary: false };
    }
    // palette: decoration-blue-500, decoration-red-100/75, etc.
    if (/^[a-z-]+-\d{2,3}(\/\d{1,3})?$/.test(rest)) {
      return { type: 'text-decoration-color', preset: rest, raw: token, arbitrary: false };
    }
    // custom property: decoration-(--my-color)
    const custom = rest.match(/^\((--[a-zA-Z0-9-_]+)\)$/);
    if (custom) {
      return { type: 'text-decoration-color', value: `var(${custom[1]})`, raw: token, arbitrary: true };
    }
    // arbitrary value: decoration-[#243c5a], decoration-[oklch(...)]
    const arb = extractArbitraryValue(token, 'decoration');
    if (arb && isColorValue(arb)) {
      return { type: 'text-decoration-color', value: arb, raw: token, arbitrary: true };
    }
  }
  return null;
} 
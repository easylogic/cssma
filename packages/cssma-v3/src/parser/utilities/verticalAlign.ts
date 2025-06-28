// Tailwind vertical-align utility parser
// https://tailwindcss.com/docs/vertical-align

import { extractArbitraryValue } from '../utils';
import type { CssmaContext } from '../../types';

const presets = [
  'baseline',
  'top',
  'middle',
  'bottom',
  'text-top',
  'text-bottom',
  'sub',
  'super',
];

export function parseVerticalAlign(token: string, context?: CssmaContext) {
  let preset = null;
  if (token.startsWith('align-')) {
    preset = token.slice(6);
    if (preset && presets.includes(preset)) {
      return { type: 'vertical-align', preset, raw: token, arbitrary: false };
    }
    // align-(<custom-property>)
    let m = token.match(/^align-\((--[a-zA-Z0-9-_]+)\)$/);
    if (m) {
      return { type: 'vertical-align', value: `var(${m[1]})`, raw: token, arbitrary: true };
    }
    // align-[<value>]
    const arb = extractArbitraryValue(token, 'align');
    if (arb) {
      return { type: 'vertical-align', value: arb, raw: token, arbitrary: true };
    }
    // For all other/invalid input, return null
    return null;
  }
  // Only align- prefix is allowed
  return null;
} 
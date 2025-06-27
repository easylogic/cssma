// Tailwind vertical-align utility parser
// https://tailwindcss.com/docs/vertical-align

import { extractArbitraryValue } from '../utils';

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

export function parseVerticalAlign(token: string) {
  if (token.startsWith('align-')) {
    const preset = token.slice(6);
    if (presets.includes(preset)) {
      return { type: 'vertical-align', preset, raw: token, arbitrary: false };
    }
    // align-(<custom-property>)
    const custom = token.match(/^align-\((--[a-zA-Z0-9-_]+)\)$/);
    if (custom) {
      return { type: 'vertical-align', value: `var(${custom[1]})`, raw: token, arbitrary: true };
    }
    // align-[<value>]
    const arb = extractArbitraryValue(token, 'align');
    if (arb) {
      return { type: 'vertical-align', value: arb, raw: token, arbitrary: true };
    }
  }
  return null;
} 
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
  let preset = null;
  if (token.startsWith('align-')) {
    preset = token.slice(6);
  } else if (token.startsWith('vertical-align-')) {
    preset = token.slice(15);
  }
  if (preset && presets.includes(preset)) {
    return { type: 'vertical-align', preset, raw: token, arbitrary: false };
  }
  // align-(<custom-property>) or vertical-align-(<custom-property>)
  let m = token.match(/^(align|vertical-align)-\((--[a-zA-Z0-9-_]+)\)$/);
  if (m) {
    return { type: 'vertical-align', value: `var(${m[2]})`, raw: token, arbitrary: true };
  }
  // align-[<value>] or vertical-align-[<value>]
  const arb = extractArbitraryValue(token, 'align') || extractArbitraryValue(token, 'vertical-align');
  if (arb) {
    return { type: 'vertical-align', value: arb, raw: token, arbitrary: true };
  }
  return null;
} 
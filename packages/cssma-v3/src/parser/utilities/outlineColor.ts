// Tailwind outline-color utility parser
// https://tailwindcss.com/docs/outline-color

import { extractArbitraryValue, isColorValue } from '../utils';
import type { CssmaContext } from '../../types';

const presets = [
  'inherit', 'current', 'transparent', 'black', 'white',
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
  // custom theme color example
  'regal-blue'
];

export function parseOutlineColor(token: string, context?: CssmaContext): any | null {
  // outline-inherit, outline-current, outline-transparent, outline-black, outline-white
  if (token === 'outline-inherit') return { type: 'outline-color', preset: 'inherit', raw: token, arbitrary: false };
  if (token === 'outline-current') return { type: 'outline-color', preset: 'current', raw: token, arbitrary: false };
  if (token === 'outline-transparent') return { type: 'outline-color', preset: 'transparent', raw: token, arbitrary: false };
  if (token === 'outline-black') return { type: 'outline-color', preset: 'black', raw: token, arbitrary: false };
  if (token === 'outline-white') return { type: 'outline-color', preset: 'white', raw: token, arbitrary: false };

  // outline-{color}-{shade}(/opacity)
  const palette = token.match(/^outline-([a-z-]+)-(\d{2,3})(?:\/(\d{1,3}))?$/);
  if (palette && presets.includes(palette[1])) {
    return {
      type: 'outline-color',
      preset: `${palette[1]}-${palette[2]}` + (palette[3] ? `/${palette[3]}` : ''),
      raw: token,
      arbitrary: false
    };
  }

  // outline-(--my-color) (custom property)
  const custom = token.match(/^outline-\((--[a-zA-Z0-9-_]+)\)$/);
  if (custom) return { type: 'outline-color', value: `var(${custom[1]})`, raw: token, arbitrary: true };

  // outline-[#243c5a] (arbitrary value)
  const arbVal = extractArbitraryValue(token, 'outline');
  if (arbVal && isColorValue(arbVal)) {
    return { type: 'outline-color', value: arbVal, raw: token, arbitrary: true };
  }

  return null;
} 
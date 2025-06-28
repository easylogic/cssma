// Tailwind background-size utility parser
// https://tailwindcss.com/docs/background-size
import { isLengthValue } from '../utils';
import type { CssmaContext } from '../../types';

export function parseBackgroundSize(token: string, context?: CssmaContext): any | null {
  if (token === 'bg-auto') {
    return { type: 'background-size', preset: 'auto', raw: token, arbitrary: false };
  }
  if (token === 'bg-cover') {
    return { type: 'background-size', preset: 'cover', raw: token, arbitrary: false };
  }
  if (token === 'bg-contain') {
    return { type: 'background-size', preset: 'contain', raw: token, arbitrary: false };
  }
  // bg-size-(<custom-property>)
  const customProp = token.match(/^bg-size-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'background-size', value: `var(${customProp[1]})`, raw: token, arbitrary: true };
  }
  // bg-size-[<value>]
  const arbitrary = token.match(/^bg-size-\[(.+)]$/);
  if (arbitrary) {
    const val = arbitrary[1].trim();
    if (isLengthValue(val) || val.startsWith('calc(') || val.startsWith('var(') || /^[a-zA-Z0-9_]+$/.test(val)) {
      return { type: 'background-size', preset: val, raw: token, arbitrary: true };
    }
    return null;
  }
  return null;
} 
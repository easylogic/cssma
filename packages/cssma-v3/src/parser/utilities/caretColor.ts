// Tailwind caret-color utility parser
// https://tailwindcss.com/docs/caret-color
import { isColorValue } from '../utils';
import type { CssmaContext } from '../../types';

const inheritRe = /^caret-inherit$/;
const currentRe = /^caret-current$/;
const transparentRe = /^caret-transparent$/;
const blackRe = /^caret-black$/;
const whiteRe = /^caret-white$/;
const colorShadeRe = /^caret-([a-z]+)-(\d{2,3})$/; // caret-red-500
const customPropRe = /^caret-\((--[\w-]+)\)$/;
const arbitraryRe = /^caret-\[(.+)\]$/;

export function parseCaretColor(token: string, context?: CssmaContext): any | null {
  let m;
  if (inheritRe.test(token)) {
    return { type: 'caret-color', value: 'inherit', raw: token, preset: 'inherit' };
  }
  if (currentRe.test(token)) {
    return { type: 'caret-color', value: 'currentColor', raw: token, preset: 'current' };
  }
  if (transparentRe.test(token)) {
    return { type: 'caret-color', value: 'transparent', raw: token, preset: 'transparent' };
  }
  if (blackRe.test(token)) {
    return { type: 'caret-color', value: 'var(--color-black)', raw: token, preset: 'black' };
  }
  if (whiteRe.test(token)) {
    return { type: 'caret-color', value: 'var(--color-white)', raw: token, preset: 'white' };
  }
  if ((m = colorShadeRe.exec(token))) {
    return {
      type: 'caret-color',
      value: `var(--color-${m[1]}-${m[2]})`,
      raw: token,
      color: m[1],
      shade: m[2]
    };
  }
  if ((m = customPropRe.exec(token))) {
    return {
      type: 'caret-color',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true
    };
  }
  if ((m = arbitraryRe.exec(token))) {
    const val = m[1].trim();
    if (isColorValue(val)) {
      return {
        type: 'caret-color',
        value: val,
        raw: token,
        arbitrary: true
      };
    }
    return null;
  }
  return null;
} 
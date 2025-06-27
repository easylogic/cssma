// Tailwind accent-color utility parser
// https://tailwindcss.com/docs/accent-color
import { isColorValue } from '../utils';

const inheritRe = /^accent-inherit$/;
const currentRe = /^accent-current$/;
const transparentRe = /^accent-transparent$/;
const blackRe = /^accent-black$/;
const whiteRe = /^accent-white$/;
const colorShadeOpacityRe = /^accent-([a-z]+)-(\d{2,3})(?:\/(\d{1,3}))?$/; // accent-red-500/75
const colorShadeRe = /^accent-([a-z]+)-(\d{2,3})$/; // accent-red-500
const customPropRe = /^accent-\((--[\w-]+)\)$/;
const arbitraryRe = /^accent-\[(.+)\]$/;
const customPropWithOpacityRe = /^accent-\((--[\w-]+)\)\/(\d{1,3})$/;
const arbitraryWithOpacityRe = /^accent-\[(.+)\]\/(\d{1,3})$/;

export function parseAccentColor(token: string): any | null {
  let m;
  if (inheritRe.test(token)) {
    return { type: 'accent-color', value: 'inherit', raw: token, preset: 'inherit' };
  }
  if (currentRe.test(token)) {
    return { type: 'accent-color', value: 'currentColor', raw: token, preset: 'current' };
  }
  if (transparentRe.test(token)) {
    return { type: 'accent-color', value: 'transparent', raw: token, preset: 'transparent' };
  }
  if (blackRe.test(token)) {
    return { type: 'accent-color', value: 'var(--color-black)', raw: token, preset: 'black' };
  }
  if (whiteRe.test(token)) {
    return { type: 'accent-color', value: 'var(--color-white)', raw: token, preset: 'white' };
  }
  if ((m = colorShadeOpacityRe.exec(token))) {
    return {
      type: 'accent-color',
      value: `var(--color-${m[1]}-${m[2]})`,
      raw: token,
      color: m[1],
      shade: m[2],
      opacity: m[3] ? Number(m[3]) : undefined
    };
  }
  if ((m = colorShadeRe.exec(token))) {
    return {
      type: 'accent-color',
      value: `var(--color-${m[1]}-${m[2]})`,
      raw: token,
      color: m[1],
      shade: m[2]
    };
  }
  if ((m = customPropWithOpacityRe.exec(token))) {
    if (!m[1] || !m[1].startsWith('--')) return null;
    return {
      type: 'accent-color',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true,
      opacity: Number(m[2])
    };
  }
  if ((m = customPropRe.exec(token))) {
    if (!m[1] || !m[1].startsWith('--')) return null;
    return {
      type: 'accent-color',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true
    };
  }
  if ((m = arbitraryWithOpacityRe.exec(token))) {
    if (!m[1] || m[1].trim() === '' || !isColorValue(m[1])) return null;
    return {
      type: 'accent-color',
      value: m[1],
      raw: token,
      arbitrary: true,
      opacity: Number(m[2])
    };
  }
  if ((m = arbitraryRe.exec(token))) {
    if (!m[1] || m[1].trim() === '' || !isColorValue(m[1])) return null;
    return {
      type: 'accent-color',
      value: m[1],
      raw: token,
      arbitrary: true
    };
  }
  return null;
} 
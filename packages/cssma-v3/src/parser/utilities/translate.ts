// Tailwind translate utility parser
// https://tailwindcss.com/docs/translate

import type { CssmaContext } from '../../types';

const noneRe = /^translate-none$/;
const fullRe = /^(-?)translate-full$/;
const pxRe = /^(-?)translate-px$/;
const numberRe = /^(-?)translate-(\d+)$/;
const fractionRe = /^(-?)translate-(\d+)\/(\d+)$/;
const customPropRe = /^translate-\((--[\w-]+)\)$/;
const arbitraryRe = /^translate-\[(.+)\]$/;

const xFullRe = /^(-?)translate-x-full$/;
const xPxRe = /^(-?)translate-x-px$/;
const xNumberRe = /^(-?)translate-x-(\d+)$/;
const xFractionRe = /^(-?)translate-x-(\d+)\/(\d+)$/;
const xCustomPropRe = /^translate-x-\((--[\w-]+)\)$/;
const xArbitraryRe = /^translate-x-\[(.+)\]$/;

const yFullRe = /^(-?)translate-y-full$/;
const yPxRe = /^(-?)translate-y-px$/;
const yNumberRe = /^(-?)translate-y-(\d+)$/;
const yFractionRe = /^(-?)translate-y-(\d+)\/(\d+)$/;
const yCustomPropRe = /^translate-y-\((--[\w-]+)\)$/;
const yArbitraryRe = /^translate-y-\[(.+)\]$/;

const zPxRe = /^(-?)translate-z-px$/;
const zNumberRe = /^(-?)translate-z-(\d+)$/;
const zCustomPropRe = /^translate-z-\((--[\w-]+)\)$/;
const zArbitraryRe = /^translate-z-\[(.+)\]$/;

export function parseTranslate(token: string, context?: CssmaContext): any | null {
  let m;
  if (noneRe.test(token)) {
    return { type: 'translate', value: 'none', raw: token, preset: 'none' };
  }
  if ((m = fullRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate', value: negative ? '-100% -100%' : '100% 100%', raw: token, negative, preset: 'full' };
  }
  if ((m = pxRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate', value: negative ? '-1px -1px' : '1px 1px', raw: token, negative, preset: 'px' };
  }
  if ((m = numberRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate', value: negative ? `calc(var(--spacing) * -${m[2]}) calc(var(--spacing) * -${m[2]})` : `calc(var(--spacing) * ${m[2]}) calc(var(--spacing) * ${m[2]})`, raw: token, negative };
  }
  if ((m = fractionRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate', value: negative ? `calc(${m[2]}/${m[3]} * -100%) calc(${m[2]}/${m[3]} * -100%)` : `calc(${m[2]}/${m[3]} * 100%) calc(${m[2]}/${m[3]} * 100%)`, raw: token, negative };
  }
  if ((m = customPropRe.exec(token))) {
    return { type: 'translate', value: `var(${m[1]}) var(${m[1]})`, raw: token, customProperty: true };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'translate', value: `${m[1]} ${m[1]}`, raw: token, arbitrary: true };
  }
  // translate-x
  if ((m = xFullRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-x', value: negative ? '-100% var(--tw-translate-y)' : '100% var(--tw-translate-y)', raw: token, negative, preset: 'full' };
  }
  if ((m = xPxRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-x', value: negative ? '-1px var(--tw-translate-y)' : '1px var(--tw-translate-y)', raw: token, negative, preset: 'px' };
  }
  if ((m = xNumberRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-x', value: negative ? `calc(var(--spacing) * -${m[2]}) var(--tw-translate-y)` : `calc(var(--spacing) * ${m[2]}) var(--tw-translate-y)`, raw: token, negative };
  }
  if ((m = xFractionRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-x', value: negative ? `calc(${m[2]}/${m[3]} * -100%) var(--tw-translate-y)` : `calc(${m[2]}/${m[3]} * 100%) var(--tw-translate-y)`, raw: token, negative };
  }
  if ((m = xCustomPropRe.exec(token))) {
    return { type: 'translate-x', value: `var(${m[1]}) var(--tw-translate-y)`, raw: token, customProperty: true };
  }
  if ((m = xArbitraryRe.exec(token))) {
    return { type: 'translate-x', value: `${m[1]} var(--tw-translate-y)`, raw: token, arbitrary: true };
  }
  // translate-y
  if ((m = yFullRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-y', value: negative ? 'var(--tw-translate-x) -100%' : 'var(--tw-translate-x) 100%', raw: token, negative, preset: 'full' };
  }
  if ((m = yPxRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-y', value: negative ? 'var(--tw-translate-x) -1px' : 'var(--tw-translate-x) 1px', raw: token, negative, preset: 'px' };
  }
  if ((m = yNumberRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-y', value: negative ? `var(--tw-translate-x) calc(var(--spacing) * -${m[2]})` : `var(--tw-translate-x) calc(var(--spacing) * ${m[2]})`, raw: token, negative };
  }
  if ((m = yFractionRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-y', value: negative ? `var(--tw-translate-x) calc(${m[2]}/${m[3]} * -100%)` : `var(--tw-translate-x) calc(${m[2]}/${m[3]} * 100%)`, raw: token, negative };
  }
  if ((m = yCustomPropRe.exec(token))) {
    return { type: 'translate-y', value: `var(--tw-translate-x) var(${m[1]})`, raw: token, customProperty: true };
  }
  if ((m = yArbitraryRe.exec(token))) {
    return { type: 'translate-y', value: `var(--tw-translate-x) ${m[1]}`, raw: token, arbitrary: true };
  }
  // translate-z
  if ((m = zPxRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-z', value: negative ? 'var(--tw-translate-x) var(--tw-translate-y) -1px' : 'var(--tw-translate-x) var(--tw-translate-y) 1px', raw: token, negative, preset: 'px' };
  }
  if ((m = zNumberRe.exec(token))) {
    const negative = m[1] === '-';
    return { type: 'translate-z', value: negative ? `var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * -${m[2]})` : `var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * ${m[2]})`, raw: token, negative };
  }
  if ((m = zCustomPropRe.exec(token))) {
    return { type: 'translate-z', value: `var(--tw-translate-x) var(--tw-translate-y) var(${m[1]})`, raw: token, customProperty: true };
  }
  if ((m = zArbitraryRe.exec(token))) {
    return { type: 'translate-z', value: `var(--tw-translate-x) var(--tw-translate-y) ${m[1]}`, raw: token, arbitrary: true };
  }
  return null;
} 
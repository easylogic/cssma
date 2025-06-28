import type { CssmaContext } from '../../types';
// Tailwind border-spacing utility parser
// https://tailwindcss.com/docs/border-spacing

const spacingRe = /^border-spacing-(\d+)$/;
const spacingArbRe = /^border-spacing-\[(.+)\]$/;
const spacingVarRe = /^border-spacing-\((--[\w-]+)\)$/;

const spacingXRe = /^border-spacing-x-(\d+)$/;
const spacingXArbRe = /^border-spacing-x-\[(.+)\]$/;
const spacingXVarRe = /^border-spacing-x-\((--[\w-]+)\)$/;

const spacingYRe = /^border-spacing-y-(\d+)$/;
const spacingYArbRe = /^border-spacing-y-\[(.+)\]$/;
const spacingYVarRe = /^border-spacing-y-\((--[\w-]+)\)$/;

export function parseBorderSpacing(token: string, context?: CssmaContext): any | null {
  let m;
  if ((m = spacingRe.exec(token))) {
    return { type: 'border-spacing', axis: 'both', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = spacingArbRe.exec(token))) {
    return { type: 'border-spacing', axis: 'both', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = spacingVarRe.exec(token))) {
    return { type: 'border-spacing', axis: 'both', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  if ((m = spacingXRe.exec(token))) {
    return { type: 'border-spacing', axis: 'x', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = spacingXArbRe.exec(token))) {
    return { type: 'border-spacing', axis: 'x', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = spacingXVarRe.exec(token))) {
    return { type: 'border-spacing', axis: 'x', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  if ((m = spacingYRe.exec(token))) {
    return { type: 'border-spacing', axis: 'y', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = spacingYArbRe.exec(token))) {
    return { type: 'border-spacing', axis: 'y', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = spacingYVarRe.exec(token))) {
    return { type: 'border-spacing', axis: 'y', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  return null;
} 
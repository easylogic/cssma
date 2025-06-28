import type { CssmaContext } from '../../types';
// Tailwind box-shadow utility parser
// https://tailwindcss.com/docs/box-shadow

export function parseBoxShadow(token: string, context?: CssmaContext): any | null {
  // 1. inset-shadow arbitrary (inset-shadow-[...])
  let m;
  if ((m = token.match(/^inset-shadow-\[(.+)\]$/))) {
    return { type: 'box-shadow', value: m[1], inset: true, raw: token, arbitrary: true };
  }
  // 2. inset-shadow (inset-shadow-none, inset-shadow-lg, ...)
  if ((m = token.match(/^inset-shadow-(none|2xs|xs|sm|md|lg|xl|2xl|[a-z0-9\-]+)$/))) {
    return { type: 'box-shadow', value: m[1], inset: true, raw: token };
  }
  // 3. shadow-(color:...)
  if ((m = token.match(/^shadow-\(color:(.+)\)$/))) {
    return { type: 'box-shadow', color: m[1], raw: token };
  }
  // 4. shadow-(...)
  if ((m = token.match(/^shadow-\((.+)\)$/))) {
    return { type: 'box-shadow', value: m[1], raw: token };
  }
  // 5. shadow arbitrary (shadow-[...])
  if ((m = token.match(/^shadow-\[(.+)\]$/))) {
    return { type: 'box-shadow', value: m[1], raw: token, arbitrary: true };
  }
  // 6. shadow-color/opacity
  if ((m = token.match(/^shadow-([a-z0-9\-]+)\/(\d{1,3})$/))) {
    return { type: 'box-shadow', color: m[1], opacity: Number(m[2]), raw: token };
  }
  // 7. shadow-color
  if ((m = token.match(/^shadow-([a-z0-9\-]+)$/))) {
    const presets = ['none','2xs','xs','sm','md','lg','xl','2xl'];
    if (presets.includes(m[1])) {
      return { type: 'box-shadow', value: m[1], raw: token };
    }
    return { type: 'box-shadow', color: m[1], raw: token };
  }
  // 8. shadow
  if (token === 'shadow') {
    return { type: 'box-shadow', value: 'DEFAULT', raw: token };
  }
  return null;
} 
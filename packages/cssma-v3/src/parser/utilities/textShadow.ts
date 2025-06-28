import type { CssmaContext } from '../../types';
// Tailwind text-shadow utility parser
// https://tailwindcss.com/docs/text-shadow

export function parseTextShadow(token: string, context?: CssmaContext): any | null {
  let m;
  // 1. text-shadow arbitrary (text-shadow-[...])
  if ((m = token.match(/^text-shadow-\[(.+)\]$/))) {
    return { type: 'text-shadow', value: m[1], raw: token, arbitrary: true };
  }
  // 2. text-shadow (text-shadow-none, text-shadow-lg, ...)
  if ((m = token.match(/^text-shadow-(none|2xs|xs|sm|md|lg)$/))) {
    return { type: 'text-shadow', value: m[1], raw: token };
  }
  // 3. text-shadow-(color:...)
  if ((m = token.match(/^text-shadow-\(color:(.+)\)$/))) {
    return { type: 'text-shadow', color: m[1], raw: token };
  }
  // 4. text-shadow-(...)
  if ((m = token.match(/^text-shadow-\((.+)\)$/))) {
    return { type: 'text-shadow', value: m[1], raw: token };
  }
  // 5. text-shadow-color/opacity
  if ((m = token.match(/^text-shadow-([a-z0-9\-]+)\/(\d{1,3})$/))) {
    return { type: 'text-shadow', color: m[1], opacity: Number(m[2]), raw: token };
  }
  // 6. text-shadow-color
  if ((m = token.match(/^text-shadow-([a-z0-9\-]+)$/))) {
    const presets = ['none','2xs','xs','sm','md','lg'];
    if (presets.includes(m[1])) {
      return { type: 'text-shadow', value: m[1], raw: token };
    }
    return { type: 'text-shadow', color: m[1], raw: token };
  }
  return null;
} 
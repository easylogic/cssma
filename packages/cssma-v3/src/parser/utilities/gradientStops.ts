import type { CssmaContext } from '../../types';
// Tailwind gradient stop utilities parser
// https://tailwindcss.com/docs/background-image

export function parseGradientStop(token: string, context?: CssmaContext): any | null {
  // from-<color> or from-<percentage>
  const from = token.match(/^from-([a-zA-Z0-9-]+|\d+%)$/);
  if (from) {
    return { type: 'gradient-stop', stop: 'from', preset: from[1], raw: token, arbitrary: false };
  }
  // from-(<custom-property>)
  const fromVar = token.match(/^from-\((--[a-zA-Z0-9-_]+)\)$/);
  if (fromVar) {
    return { type: 'gradient-stop', stop: 'from', preset: fromVar[1], raw: token, arbitrary: true };
  }
  // from-[<value>]
  const fromArb = token.match(/^from-\[(.+)]$/);
  if (fromArb) {
    return { type: 'gradient-stop', stop: 'from', preset: fromArb[1], raw: token, arbitrary: true };
  }
  // via-<color> or via-<percentage>
  const via = token.match(/^via-([a-zA-Z0-9-]+|\d+%)$/);
  if (via) {
    return { type: 'gradient-stop', stop: 'via', preset: via[1], raw: token, arbitrary: false };
  }
  // via-(<custom-property>)
  const viaVar = token.match(/^via-\((--[a-zA-Z0-9-_]+)\)$/);
  if (viaVar) {
    return { type: 'gradient-stop', stop: 'via', preset: viaVar[1], raw: token, arbitrary: true };
  }
  // via-[<value>]
  const viaArb = token.match(/^via-\[(.+)]$/);
  if (viaArb) {
    return { type: 'gradient-stop', stop: 'via', preset: viaArb[1], raw: token, arbitrary: true };
  }
  // to-<color> or to-<percentage>
  const to = token.match(/^to-([a-zA-Z0-9-]+|\d+%)$/);
  if (to) {
    return { type: 'gradient-stop', stop: 'to', preset: to[1], raw: token, arbitrary: false };
  }
  // to-(<custom-property>)
  const toVar = token.match(/^to-\((--[a-zA-Z0-9-_]+)\)$/);
  if (toVar) {
    return { type: 'gradient-stop', stop: 'to', preset: toVar[1], raw: token, arbitrary: true };
  }
  // to-[<value>]
  const toArb = token.match(/^to-\[(.+)]$/);
  if (toArb) {
    return { type: 'gradient-stop', stop: 'to', preset: toArb[1], raw: token, arbitrary: true };
  }
  return null;
} 
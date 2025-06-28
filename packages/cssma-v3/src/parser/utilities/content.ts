// Tailwind content utility parser
// https://tailwindcss.com/docs/content

import type { CssmaContext } from '../../types';

export function parseContent(token: string, context?: CssmaContext): any | null {
  // content-none
  if (token === 'content-none') {
    return { type: 'content', preset: 'none', raw: token, arbitrary: false };
  }
  // content-(<custom-property>)
  const customProp = token.match(/^content-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'content', preset: customProp[1], raw: token, arbitrary: true };
  }
  // content-[<value>]
  const arbitrary = token.match(/^content-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'content', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 
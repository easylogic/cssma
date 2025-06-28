import type { CssmaContext } from '../../types';
// Tailwind v4.1 list-style-position parser
// https://tailwindcss.com/docs/list-style-position

export function parseListStylePosition(token: string, context?: CssmaContext) {
  if (token === 'list-inside') {
    return {
      type: 'list-style-position',
      value: 'inside',
      raw: token,
    };
  }
  if (token === 'list-outside') {
    return {
      type: 'list-style-position',
      value: 'outside',
      raw: token,
    };
  }
  return null;
} 
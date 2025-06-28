import type { CssmaContext } from '../../types';
// Tailwind mask-origin utility parser
// https://tailwindcss.com/docs/mask-origin

const presetMap: Record<string, string> = {
  'mask-origin-border': 'border-box',
  'mask-origin-padding': 'padding-box',
  'mask-origin-content': 'content-box',
  'mask-origin-fill': 'fill-box',
  'mask-origin-stroke': 'stroke-box',
  'mask-origin-view': 'view-box',
};

export function parseMaskOrigin(token: string, context?: CssmaContext): any | null {
  if (token in presetMap) {
    return { type: 'mask-origin', value: presetMap[token], raw: token, arbitrary: false };
  }
  return null;
} 
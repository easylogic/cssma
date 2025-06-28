import type { CssmaContext } from '../../types';
// Tailwind mask-clip utility parser
// https://tailwindcss.com/docs/mask-clip

const presetMap: Record<string, string> = {
  'mask-clip-border': 'border-box',
  'mask-clip-padding': 'padding-box',
  'mask-clip-content': 'content-box',
  'mask-clip-fill': 'fill-box',
  'mask-clip-stroke': 'stroke-box',
  'mask-clip-view': 'view-box',
  'mask-no-clip': 'no-clip',
};

export function parseMaskClip(token: string, context?: CssmaContext): any | null {
  if (token in presetMap) {
    return { type: 'mask-clip', value: presetMap[token], raw: token, arbitrary: false };
  }
  return null;
} 
import { parseBaseToken } from "../utils";
import type { CssmaContext } from '../../types';
// Tailwind transform utility parser (통합)
// https://tailwindcss.com/docs/transform
// https://tailwindcss.com/docs/transform-origin
// https://tailwindcss.com/docs/transform-style
// https://tailwindcss.com/docs/skew
// https://tailwindcss.com/docs/perspective
// https://tailwindcss.com/docs/rotate
// https://tailwindcss.com/docs/backface-visibility

const transformPrefixes = [
  // Transform
  "transform-origin",
  "transform-style",
  "transform",
  "translate-x",
  "translate-y",
  "translate-z",
  "translate",
  "skew-x",
  "skew-y",
  "skew",
  "perspective-origin",
  "perspective",
  "rotate-x",
  "rotate-y",
  "rotate-z",
  "rotate",
  // Backface visibility
  "backface-hidden",
  "backface-visible",
  "backface-visibility",
];

export function parseTransform(token: string, context?: CssmaContext): any | null {
  return parseBaseToken(token, transformPrefixes, true, true);
} 
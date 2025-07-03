// Tailwind text color utility parser
// https://tailwindcss.com/docs/color

import { parseUtilityToken } from "../utils";

const colorPrefixes = [
  "decoration",
  "outline",
  "shadow",
  "stroke",
  "accent",
  "caret",
  "fill",
  "text",
];

export function parseColor(token: string) {
  return parseUtilityToken(token, colorPrefixes, true, true);
} 
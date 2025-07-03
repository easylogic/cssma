// Tailwind text color utility parser
// https://tailwindcss.com/docs/color

import { parseBaseToken } from "../utils";

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
  return parseBaseToken(token, colorPrefixes, true, true);
} 
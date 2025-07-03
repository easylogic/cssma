import { parseBaseToken } from "../utils";
// Tailwind sizing utility parser (통합)
// https://tailwindcss.com/docs/width
// https://tailwindcss.com/docs/field-sizing

const sizingPrefixes = [
  "min-w",
  "max-w",
  "min-h",
  "max-h",
  "aspect",
  "size",
  "w",
  "h",
  "field-sizing-fixed",
  "field-sizing-content",
  "field-sizing",
];

export function parseSizing(token: string) {
  return parseBaseToken(token, sizingPrefixes, true, true);
} 
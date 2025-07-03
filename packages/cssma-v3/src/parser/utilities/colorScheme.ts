// Tailwind color-scheme/forced-color-adjust utility parser (통합)
// https://tailwindcss.com/docs/color-scheme
// https://tailwindcss.com/docs/forced-color-adjust

import { parseBaseToken } from "../utils";

const colorSchemePrefixes = [
  "scheme-normal",
  "scheme-dark",
  "scheme-light",
  "scheme-light-dark",
  "scheme-only-dark",
  "scheme-only-light",
  "forced-color-adjust-auto",
  "forced-color-adjust-none",
  "forced-color-adjust",
];

export function parseColorScheme(token: string) {
  return parseBaseToken(token, colorSchemePrefixes, true, true);
} 
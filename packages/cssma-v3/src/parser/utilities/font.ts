import { parseBaseToken } from "../utils";

// Tailwind font utility parser (통합)
// https://tailwindcss.com/docs/font-variant-numeric
// https://tailwindcss.com/docs/font-style
// https://tailwindcss.com/docs/font-stretch
// https://tailwindcss.com/docs/font-smoothing

const fontPrefixes = [
  // font-variant-numeric
  "normal-nums",
  "ordinal",
  "slashed-zero",
  "lining-nums",
  "oldstyle-nums",
  "proportional-nums",
  "tabular-nums",
  "diagonal-fractions",
  "stacked-fractions",
  // font-style
  "italic",
  "not-italic",
  // font-stretch
  "font-stretch-ultra-condensed",
  "font-stretch-extra-condensed",
  "font-stretch-condensed",
  "font-stretch-semi-condensed",
  "font-stretch-normal",
  "font-stretch-semi-expanded",
  "font-stretch-expanded",
  "font-stretch-extra-expanded",
  "font-stretch-ultra-expanded",
  "font-stretch",
  // font-smoothing
  "antialiased",
  "subpixel-antialiased",
];

export function parseFont(token: string) {
  return parseBaseToken(token, fontPrefixes, true, true);
} 
import { parseUtilityToken } from "../utils";
// Tailwind typography utility parser (통합)
// https://tailwindcss.com/docs/font-size
// https://tailwindcss.com/docs/vertical-align

const typographyPrefixes = [
  "line-clamp",
  "decoration",
  "overline",
  "no-underline",
  "not-italic",
  "normal-case",
  "text-ellipsis",
  "text-clip",
  "uppercase",
  "lowercase",
  "capitalize",
  "truncate",
  "underline",
  "italic",
  "leading",
  "tracking",
  "font",
  "text",
  // vertical-align
  "align",
];

export function parseTypography(token: string) {
  return parseUtilityToken(token, typographyPrefixes, true, true);
} 
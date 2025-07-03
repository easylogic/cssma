import { parseBaseToken } from "../utils";
// Tailwind alignment utility parser (통합)
// https://tailwindcss.com/docs/justify-content

const alignmentPrefixes = [
  "place-content",
  "place-items",
  "place-self",
  "justify-items",
  "justify-self",
  "align-items",
  "align-self",
  "justify",
  "align",
];

export function parseAlignment(token: string) {
  return parseBaseToken(token, alignmentPrefixes, true, true);
} 
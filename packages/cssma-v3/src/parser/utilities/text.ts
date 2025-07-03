import { parseBaseToken } from "../utils";

// Tailwind text utility parser (통합)
// https://tailwindcss.com/docs/text-indent
// https://tailwindcss.com/docs/overflow-wrap
// https://tailwindcss.com/docs/word-break
// https://tailwindcss.com/docs/text-shadow

const textPrefixes = [
  "indent",
  "overflow-wrap-break-word",
  "overflow-wrap-anywhere",
  "overflow-wrap-normal",
  "overflow-wrap",
  "break-normal",
  "break-all",
  "break-keep",
  "word-break",
  "text-shadow",
];

export function parseText(token: string) {
  return parseBaseToken(token, textPrefixes, true, true);
} 
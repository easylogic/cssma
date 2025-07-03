import { parseBaseToken } from "../utils";

// Tailwind list utility parser (통합)
// https://tailwindcss.com/docs/list-style-type
// https://tailwindcss.com/docs/hyphens

const listPrefixes = [
  "list-disc",
  "list-decimal",
  "list-none",
  "list-style-type",
  "hyphens-none",
  "hyphens-manual",
  "hyphens-auto",
  "hyphens",
];

export function parseList(token: string) {
  return parseBaseToken(token, listPrefixes, true, true);
} 
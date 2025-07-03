import { parseBaseToken } from "../utils";
// Tailwind misc utility parser (통합)

const miscPrefixes = [
  "white-space",
  "display",
  "float",
  "clear",
  "order",
  "content",
  "filter",
];

export function parseMisc(token: string) {
  return parseBaseToken(token, miscPrefixes, true, true);
} 
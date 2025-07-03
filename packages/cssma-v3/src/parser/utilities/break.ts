import { parseBaseToken } from "../utils";
const breakPrefixes = [
  "break-inside",
  "break-before",
  "break-after",
  "box",
];
export function parseBreak(token: string) {
  return parseBaseToken(token, breakPrefixes, true, true);
} 
import { parseUtilityToken } from "../utils";
const breakPrefixes = [
  "break-inside",
  "break-before",
  "break-after",
  "box",
];
export function parseBreak(token: string) {
  return parseUtilityToken(token, breakPrefixes, true, true);
} 
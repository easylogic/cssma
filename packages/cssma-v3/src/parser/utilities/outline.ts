import { parseBaseToken } from "../utils";
const outlinePrefixes = [
  "outline-width",
  "outline-style",
  "outline-offset",
];
export function parseOutline(token: string) {
  return parseBaseToken(token, outlinePrefixes, true, true);
} 
import { parseUtilityToken } from "../utils";
const outlinePrefixes = [
  "outline-width",
  "outline-style",
  "outline-offset",
];
export function parseOutline(token: string) {
  return parseUtilityToken(token, outlinePrefixes, true, true);
} 
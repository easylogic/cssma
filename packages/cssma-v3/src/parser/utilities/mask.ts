import { parseBaseToken } from "../utils";
const maskPrefixes = [
  "mask-type",
  "mask-size",
  "mask-repeat",
  "mask-position",
  "mask-mode",
];
export function parseMask(token: string) {
  return parseBaseToken(token, maskPrefixes, true, true);
} 
import { parseUtilityToken } from "../utils";
const maskPrefixes = [
  "mask-type",
  "mask-size",
  "mask-repeat",
  "mask-position",
  "mask-mode",
];
export function parseMask(token: string) {
  return parseUtilityToken(token, maskPrefixes, true, true);
} 
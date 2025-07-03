import { parseUtilityToken } from "../utils";
// Tailwind object utility parser (통합)
// https://tailwindcss.com/docs/object-fit

const objectPrefixes = [
  "object-position",
  "object-fit",
  "object",
].sort((a, b) => b.length - a.length);

export function parseObject(token: string) {
  return parseUtilityToken(token, objectPrefixes, true, true);
} 
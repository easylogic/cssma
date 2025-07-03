import { parseBaseToken } from "../utils";
// Tailwind object utility parser (통합)
// https://tailwindcss.com/docs/object-fit

const objectPrefixes = [
  "object-position",
  "object-fit",
  "object",
].sort((a, b) => b.length - a.length);

export function parseObject(token: string) {
  return parseBaseToken(token, objectPrefixes, true, true);
} 
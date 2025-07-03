import { parseUtilityToken } from "../utils";
// Tailwind visibility/z-index utility parser (통합)
// https://tailwindcss.com/docs/visibility

const visibilityPrefixes = [
  "isolation",
  "visible",
  "invisible",
  "collapse",
  "z",
].sort((a, b) => b.length - a.length);

export function parseVisibility(token: string) {
  return parseUtilityToken(token, visibilityPrefixes, true, true);
} 
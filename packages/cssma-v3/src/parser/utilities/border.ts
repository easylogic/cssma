import { parseUtilityToken } from "../utils";
// Tailwind border utility parser (통합)
// https://tailwindcss.com/docs/border-radius

const borderPrefixes = [
  // Border
  "border-tl",
  "border-tr",
  "border-bl",
  "border-br",
  "border-t",
  "border-b",
  "border-l",
  "border-r",
  "border-x",
  "border-y",
  "border",
  "divide-x",
  "divide-y",
  "divide-t",
  "divide-b",
  "divide-l",
  "divide-r",
  "divide",
  "ring",

  // Border Radius (rounded)
  "rounded-tl",
  "rounded-tr",
  "rounded-bl",
  "rounded-br",
  "rounded-t",
  "rounded-b",
  "rounded-l",
  "rounded-r",
  "rounded-x",
  "rounded-y",
  "rounded-ss",
  "rounded-se",
  "rounded-es",
  "rounded-ee",
  "rounded-s",
  "rounded-e",
  "rounded",
].sort((a, b) => b.length - a.length);

export function parseBorder(token: string) {
  return parseUtilityToken(token, borderPrefixes, true, true);
} 
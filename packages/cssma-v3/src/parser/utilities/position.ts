import { parseBaseToken } from "../utils";
// Tailwind position utility parser (통합)
// https://tailwindcss.com/docs/top-right-bottom-left

const positionPrefixes = [
  "inset-x",
  "inset-y",
  "inset",
  "top",
  "right",
  "bottom",
  "left",
  "z",
];

export function parsePosition(token: string) {
  return parseBaseToken(token, positionPrefixes, true, true);
} 
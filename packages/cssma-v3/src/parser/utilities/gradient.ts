import { parseBaseToken } from "../utils";
// Tailwind gradient utility parser (통합)
// https://tailwindcss.com/docs/gradient-color-stops

const gradientPrefixes = [
  "bg-gradient-to",
  "bg-linear",
  "bg-radial",
  "bg-conic",
  "from",
  "via",
  "to",
  "gradient",
  // gradient stops
  "from-",
  "via-",
  "to-",
];

export function parseGradient(token: string) {
  return parseBaseToken(token, gradientPrefixes, true, true);
} 
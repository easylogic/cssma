import { parseUtilityToken } from "../utils";
// Tailwind SVG utility parser (통합)
// https://tailwindcss.com/docs/fill

const svgPrefixes = [
  "stroke-width",
  "stroke",
  "fill",
];

export function parseSVG(token: string) {
  return parseUtilityToken(token, svgPrefixes, true, true);
} 
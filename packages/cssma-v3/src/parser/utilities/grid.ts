import { parseUtilityToken } from "../utils";

// Tailwind grid utility parser (통합)
// https://tailwindcss.com/docs/grid-auto-columns
// https://tailwindcss.com/docs/columns
// https://tailwindcss.com/docs/col-end

const gridPrefixes = [
  "grid-auto-cols-auto",
  "grid-auto-cols-min",
  "grid-auto-cols-max",
  "grid-auto-cols-fr",
  "grid-auto-cols",
  "columns",
  "col-end-auto",
  "col-end",
];

export function parseGrid(token: string) {
  return parseUtilityToken(token, gridPrefixes, true, true);
} 
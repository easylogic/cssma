import { parseUtilityToken } from "../utils";
// Tailwind flex/grid utility parser (통합)
// https://tailwindcss.com/docs/flex

const flexGridPrefixes = [
  "inline-flex",
  "inline-grid",
  "flex-basis",
  "flex-direction",
  "flex-wrap",
  "flex-grow",
  "flex-shrink",
  "flex-auto",
  "flex-initial",
  "flex-none",
  "flex-1",
  "flex",
  "order",
  "grid-cols",
  "grid-rows",
  "grid-flow",
  "col-span",
  "col-start",
  "col-end",
  "row-span",
  "row-start",
  "row-end",
  "auto-cols",
  "auto-rows",
  "grid",
  "gap-x",
  "gap-y",
  "gap",
];

export function parseFlexGrid(token: string) {
  return parseUtilityToken(token, flexGridPrefixes, true, true);
} 
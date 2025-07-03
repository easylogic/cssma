import { parseUtilityToken } from "../utils";
// Tailwind layout utility parser (통합)
// https://tailwindcss.com/docs/flex

const layoutPrefixes = [
  "inline-flex",
  "inline-grid",
  "col-span",
  "row-span",
  "col-start",
  "col-end",
  "row-start",
  "row-end",
  "auto-cols",
  "auto-rows",
  "justify-items",
  "justify-self",
  "align-items",
  "align-self",
  "place-content",
  "place-items",
  "place-self",
  "flex",
  "grid",
  "order",
  "justify",
  "align",
  "gap-x",
  "gap-y",
  "gap",
];

export function parseLayout(token: string) {
  return parseUtilityToken(token, layoutPrefixes, true, true);
} 
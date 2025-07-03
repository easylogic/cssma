import { parseUtilityToken } from "../utils";
// Tailwind table utility parser (통합)
// https://tailwindcss.com/docs/table-layout

const tablePrefixes = [
  "table-caption",
  "table-header-group",
  "table-footer-group",
  "table-row-group",
  "table-column-group",
  "table-row",
  "table-cell",
  "table-column",
  "table-fixed",
  "table-auto",
  "border-collapse",
  "border-separate",
  "border-spacing",
  "caption-top",
  "caption-bottom",
  "table",
];

export function parseTable(token: string) {
  return parseUtilityToken(token, tablePrefixes, true, true);
} 
import { parseUtilityToken } from "../utils";

// Tailwind box utility parser (통합)
// https://tailwindcss.com/docs/box-decoration-break
// https://tailwindcss.com/docs/border-collapse
// https://tailwindcss.com/docs/filter-drop-shadow

const boxPrefixes = [
  "box-decoration-clone",
  "box-decoration-slice",
  "box-decoration-break",
  "border-collapse",
  "border-separate",
  "drop-shadow",
];

export function parseBox(token: string) {
  return parseUtilityToken(token, boxPrefixes, true, true);
} 
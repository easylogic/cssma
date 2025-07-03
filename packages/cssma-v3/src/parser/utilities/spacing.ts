import type { CssmaContext } from '../../types';
import { parseUtilityToken } from "../utils";
// Tailwind spacing utility parser (통합)
// https://tailwindcss.com/docs/margin

const spacingPrefixes = [
  "space-x",
  "space-y",
  "gap-x",
  "gap-y",
  "gap",
  "mx",
  "my",
  "mt",
  "mb",
  "ml",
  "mr",
  "px",
  "py",
  "pt",
  "pb",
  "pl",
  "pr",
  "m",
  "p",
];

export function parseSpacing(token: string, context?: CssmaContext) {
  return parseUtilityToken(token, spacingPrefixes, true, true);
} 
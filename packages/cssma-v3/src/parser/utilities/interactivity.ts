import { parseBaseToken } from "../utils";
// Tailwind interactivity utility parser (통합)
// https://tailwindcss.com/docs/cursor

const interactivityPrefixes = [
  "pointer-events",
  "user-select",
  "touch-action",
  "scroll-behavior",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "accent-color",
  "caret-color",
  "color-scheme",
  "will-change",
  "appearance",
  "resize",
  "cursor",
  "select",
];

export function parseInteractivity(token: string) {
  return parseBaseToken(token, interactivityPrefixes, true, true);
} 
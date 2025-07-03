import { parseBaseToken } from "../utils";
// Tailwind background utility parser (통합)
// https://tailwindcss.com/docs/backgrounds

export function parseBackground(token: string) {
  return parseBaseToken(token, [
    "bg",
    "bg-none",
    "bg-gradient-to",
    "bg-linear",
    "bg-radial",
    "bg-conic",
    "bg-blend",
    "bg-clip",
    "bg-origin",
    "bg-repeat",
    "bg-no-repeat",
    "bg-size",
    "bg-position",
    "bg-fixed",
    "bg-local",
    "bg-scroll",
  ]);
} 
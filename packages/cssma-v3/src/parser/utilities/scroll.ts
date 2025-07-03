import { parseBaseToken } from "../utils";

// Tailwind scroll utility parser (통합)
// https://tailwindcss.com/docs/scroll-padding
// https://tailwindcss.com/docs/scroll-margin
// https://tailwindcss.com/docs/scroll-behavior
// https://tailwindcss.com/docs/scroll-snap-align
// https://tailwindcss.com/docs/scroll-snap-stop
// https://tailwindcss.com/docs/scroll-snap-type

const scrollPrefixes = [
  "scroll-padding",
  "scroll-padding-inline",
  "scroll-padding-block",
  "scroll-padding-top",
  "scroll-padding-right",
  "scroll-padding-bottom",
  "scroll-padding-left",
  "scroll-padding-inline-start",
  "scroll-padding-inline-end",
  "scroll-margin",
  "scroll-margin-inline",
  "scroll-margin-block",
  "scroll-margin-top",
  "scroll-margin-right",
  "scroll-margin-bottom",
  "scroll-margin-left",
  "scroll-margin-inline-start",
  "scroll-margin-inline-end",
  "scroll-auto",
  "scroll-smooth",
  "snap-start",
  "snap-end",
  "snap-center",
  "snap-align-none",
  "snap-normal",
  "snap-always",
  "snap-none",
  "snap-x",
  "snap-y",
  "snap-both",
  "snap-mandatory",
  "snap-proximity",
];

export function parseScroll(token: string) {
  return parseBaseToken(token, scrollPrefixes, true, true);
} 
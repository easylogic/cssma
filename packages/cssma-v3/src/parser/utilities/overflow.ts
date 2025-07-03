import { parseBaseToken } from "../utils";
// Tailwind overflow/scroll utility parser (통합)
// https://tailwindcss.com/docs/overflow

const overflowPrefixes = [
  "overscroll-x",
  "overscroll-y",
  "overscroll",
  "overflow-x",
  "overflow-y",
  "overflow",
  "scroll-auto",
  "scroll-smooth",
  "scroll-mx",
  "scroll-my",
  "scroll-mt",
  "scroll-mb",
  "scroll-ml",
  "scroll-mr",
  "scroll-px",
  "scroll-py",
  "scroll-pt",
  "scroll-pb",
  "scroll-pl",
  "scroll-pr",
  "scroll-p",
  "scroll-m",
].sort((a, b) => b.length - a.length);

export function parseOverflow(token: string) {
  return parseBaseToken(token, overflowPrefixes, true, true);
} 
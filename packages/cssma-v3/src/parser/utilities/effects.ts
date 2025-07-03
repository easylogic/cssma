import { parseBaseToken } from "../utils";
// Tailwind effects & backdrop utility parser (통합)
// https://tailwindcss.com/docs/box-shadow
// https://tailwindcss.com/docs/backdrop-blur
// https://tailwindcss.com/docs/will-change

const effectsPrefixes = [
  // Filter/Effects
  "mix-blend",
  "shadow",
  "opacity",
  "blur",
  "brightness",
  "contrast",
  "grayscale",
  "hue-rotate",
  "invert",
  "saturate",
  "sepia",
  // Backdrop
  "backdrop-blur",
  "backdrop-brightness",
  "backdrop-contrast",
  "backdrop-grayscale",
  "backdrop-hue-rotate",
  "backdrop-invert",
  "backdrop-opacity",
  "backdrop-saturate",
  "backdrop-sepia",
  "backdrop",
  "will-change",
];

export function parseEffects(token: string) {
  return parseBaseToken(token, effectsPrefixes, true, true);
}
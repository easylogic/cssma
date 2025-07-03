import { parseUtilityToken } from "../utils";

// Tailwind transition/animation utility parser (통합)
// https://tailwindcss.com/docs/transition
// https://tailwindcss.com/docs/animation

const transitionAnimationPrefixes = [
  // Transition
  "transition-property",
  "transition-behavior",
  "transition-timing-function",
  "transition-duration",
  "transition-delay",
  "transition",
  "duration",
  "delay",
  "ease",
  // Animation
  "animation",
  "animate",
];

export function parseTransition(token: string) {
  return parseUtilityToken(token, transitionAnimationPrefixes, true, true);
} 
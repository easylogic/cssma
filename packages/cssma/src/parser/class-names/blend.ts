import { ParsedClassName } from "../../types";

const BLEND_MODE_MAP = {
  normal: "normal",
  multiply: "multiply",
  screen: "screen",
  overlay: "overlay",
  darken: "darken",
  lighten: "lighten",
  "color-dodge": "color-dodge",
  "color-burn": "color-burn",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  difference: "difference",
  exclusion: "exclusion",
  hue: "hue",
  saturation: "saturation",
  color: "color",
  luminosity: "luminosity",
} as const;

export function parseBlendClassName(className: string): ParsedClassName | null {
  // Handle mix-blend classes
  if (className.startsWith("mix-blend-")) {
    const mode = className.replace("mix-blend-", "");
    const blendMode = BLEND_MODE_MAP[mode as keyof typeof BLEND_MODE_MAP];

    if (blendMode) {
      return {
        className,
        property: "mix-blend-mode",
        value: blendMode,
        variant: "preset",
      };
    }
  }

  return null;
} 
import { ParsedClassName } from "../../types";
import { COLORS } from "../../config/tokens";

interface ShadowConfig {
  type: "outer" | "inner";
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

const SHADOW_PRESETS: Record<string, ShadowConfig[]> = {
  "shadow-sm": [
    {
      type: "outer",
      x: 0,
      y: 1,
      blur: 2,
      spread: 0,
      color: "rgba(0,0,0,0.05)",
    },
  ],
  shadow: [
    {
      type: "outer",
      x: 0,
      y: 2,
      blur: 4,
      spread: -1,
      color: "rgba(0,0,0,0.1)",
    },
  ],
  "shadow-md": [
    {
      type: "outer",
      x: 0,
      y: 4,
      blur: 6,
      spread: -2,
      color: "rgba(0,0,0,0.1)",
    },
  ],
  "shadow-lg": [
    {
      type: "outer",
      x: 0,
      y: 8,
      blur: 10,
      spread: -3,
      color: "rgba(0,0,0,0.1)",
    },
  ],
  "shadow-xl": [
    {
      type: "outer",
      x: 0,
      y: 12,
      blur: 14,
      spread: -4,
      color: "rgba(0,0,0,0.1)",
    },
  ],
  "shadow-2xl": [
    {
      type: "outer",
      x: 0,
      y: 16,
      blur: 20,
      spread: -5,
      color: "rgba(0,0,0,0.25)",
    },
  ],
  "shadow-inner": [
    {
      type: "inner",
      x: 0,
      y: 2,
      blur: 4,
      spread: 0,
      color: "rgba(0,0,0,0.06)",
    },
  ],
};

export function parseShadowClassName(className: string): ParsedClassName | null {
  // Handle shadow-none
  if (className === "shadow-none") {
    return {
      className,
      property: "box-shadow",
      value: [],
      variant: "preset",
    };
  }

  // Handle preset shadows
  if (className in SHADOW_PRESETS) {
    return {
      className,
      property: "box-shadow",
      value: className,
      variant: "preset",
    };
  }

  // Handle shadow colors
  if (className.startsWith("shadow-")) {
    const colorName = className.replace("shadow-", "");
    if (COLORS[colorName]) {
      return {
        className,
        property: "box-shadow-color",
        value: colorName as string,
        variant: "preset",
      };
    }
  }

  return null;
} 
import { ParsedClassName } from "../../types";

const OPACITY_MAP = {
  "0": 0,
  "5": 0.05,
  "10": 0.1,
  "20": 0.2,
  "25": 0.25,
  "30": 0.3,
  "40": 0.4,
  "50": 0.5,
  "60": 0.6,
  "70": 0.7,
  "75": 0.75,
  "80": 0.8,
  "90": 0.9,
  "95": 0.95,
  "100": 1,
} as const;

function parseOpacityValue(value: string): number | null {
  // Handle percentage values
  if (value.endsWith("%")) {
    const percent = parseFloat(value.slice(0, -1));
    if (!isNaN(percent)) {
      if (percent < 0) {
        return null;
      }

      if (percent > 100) {
        return null;
      }

      // Convert percentage to decimal
      return Math.max(0, Math.min(1, percent / 100));
    }
    return null;
  }

  // Handle decimal values
  const opacity = parseFloat(value);
  if (!isNaN(opacity)) {
    if (opacity < 0) {
      return null;
    }

    // Handle values between 1-100 as percentages
    if (opacity > 1 && opacity <= 100) {
      return opacity / 100;
    }

    return Math.max(0, Math.min(1, opacity));
  }
  return null;
}

export function parseShapeClassName(className: string): ParsedClassName | null {

  // Handle opacity classes
  if (className.startsWith("opacity-")) {
    // Handle preset opacity values
    const presetMatch = className.match(/^opacity-(\d+)$/);
    if (presetMatch) {
      const [, value] = presetMatch;
      const opacity = OPACITY_MAP[value as keyof typeof OPACITY_MAP];

      if (opacity !== undefined) {
        return {
          className,
          property: "opacity",
          value: opacity,
          variant: "preset",
        };
      }
    }

    // Handle arbitrary opacity values
    const arbitraryMatch = className.match(/^opacity-\[([\d.%]+(?:px)?)\]$/);
    if (arbitraryMatch) {
      const [, value] = arbitraryMatch;
      const cleanValue = value.replace("px", "");
      const opacity = parseOpacityValue(cleanValue);

      if (opacity !== null) {
        return {
          className,
          property: "opacity",
          value: opacity,
          variant: "arbitrary",
        };
      }
    }
  }

  return null;
} 
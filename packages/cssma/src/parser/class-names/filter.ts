import { ParsedClassName } from "../../types";

const BLUR_SIZES = {
  none: 0,
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 40,
  "3xl": 64,
} as const;

export function parseFilterClassName(className: string): ParsedClassName | null {
  // Layer Blur
  if (className === "blur" || className.startsWith("blur-")) {
    // Handle blur-none
    if (className === "blur-none") {
      return {
        className,
        property: "filter",
        value: "blur(0px)",
        variant: "preset",
      };
    }

    // Handle arbitrary blur values
    if (className.startsWith("blur-[") && className.endsWith("]")) {
      const value = className.slice(6, -1);
      const radius = parseInt(value);
      if (!isNaN(radius) && radius >= 0) {
        return {
          className,
          property: "filter",
          value: `blur(${radius}px)`,
          variant: "arbitrary",
        };
      }
      return null;
    }

    // Handle preset blur sizes
    const size = className === "blur" ? "DEFAULT" : className.replace("blur-", "");
    const radius = BLUR_SIZES[size as keyof typeof BLUR_SIZES];

    if (radius !== undefined) {
      return {
        className,
        property: "filter",
        value: `blur(${radius}px)`,
        variant: "preset",
      };
    }
  }

  // Backdrop Blur (Background Blur in Figma)
  if (className === "backdrop-blur" || className.startsWith("backdrop-blur-")) {
    // Handle backdrop-blur-none
    if (className === "backdrop-blur-none") {
      return {
        className,
        property: "backdrop-filter",
        value: "blur(0px)",
        variant: "preset",
      };
    }

    // Handle arbitrary backdrop blur values
    if (className.startsWith("backdrop-blur-[") && className.endsWith("]")) {
      const value = className.slice(15, -1); // 'backdrop-blur-[' = 15 chars
      const radius = parseInt(value);
      if (!isNaN(radius) && radius >= 0) {
        return {
          className,
          property: "backdrop-filter",
          value: `blur(${radius}px)`,
          variant: "arbitrary",
        };
      }
      return null;
    }

    // Handle preset backdrop blur sizes
    const size = className === "backdrop-blur" ? "DEFAULT" : className.replace("backdrop-blur-", "");
    const radius = BLUR_SIZES[size as keyof typeof BLUR_SIZES];

    if (radius !== undefined) {
      return {
        className,
        property: "backdrop-filter",
        value: `blur(${radius}px)`,
        variant: "preset",
      };
    }
  }

  return null;
} 
import { ParsedClassName } from "../../types";

const ASPECT_RATIOS = {
  square: 1,
  video: 16 / 9,
} as const;

function parseRatioValue(value: string): number | null {
  if (!/^\d+\/\d+$/.test(value)) return null;

  const parts = value.split("/");
  if (parts.length !== 2) return null;

  const [width, height] = parts.map(Number);
  if (isNaN(width) || isNaN(height)) return null;
  if (width <= 0 || height <= 0) return null;
  if (height === 0) return null;

  return width / height;
}

export function parseAspectClassName(className: string): ParsedClassName | null {
  // Handle aspect ratio classes
  if (className.startsWith("aspect-")) {
    // Handle aspect-auto
    if (className === "aspect-auto") {
      return {
        className,
        property: "aspect-ratio",
        value: "auto",
        variant: "preset",
      };
    }

    // Handle preset ratios
    const preset = className.replace("aspect-", "");
    const ratio = ASPECT_RATIOS[preset as keyof typeof ASPECT_RATIOS];

    if (ratio !== undefined) {
      return {
        className,
        property: "aspect-ratio",
        value: ratio,
        variant: "preset",
      };
    }

    // Handle arbitrary ratios
    if (preset.startsWith("[") && preset.endsWith("]")) {
      const value = preset.slice(1, -1);
      const ratio = parseRatioValue(value);

      if (ratio !== null) {
        return {
          className,
          property: "aspect-ratio",
          value: ratio,
          variant: "arbitrary",
        };
      }
    }
  }

  return null;
} 
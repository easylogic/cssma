import { ParsedClassName } from "../../types";
import { COLORS, RADIUS } from "../../config/tokens";
import { parseArbitraryValue } from "../../utils/converters";

const BORDER_STYLE_MAP = {
  solid: "solid",
  dashed: "dashed",
  dotted: "dotted",
} as const;

type RadiusPosition = "t" | "r" | "b" | "l" | "tl" | "tr" | "br" | "bl";

const RADIUS_POSITION_MAP: Record<RadiusPosition, string> = {
  t: "border-top-left-radius",
  r: "border-top-right-radius",
  b: "border-bottom-left-radius", 
  l: "border-bottom-right-radius",
  tl: "border-top-left-radius",
  tr: "border-top-right-radius", 
  br: "border-bottom-right-radius",
  bl: "border-bottom-left-radius",
};

export function parseBorderClassName(className: string): ParsedClassName | null {
  // Handle simple border
  if (className === "border") {
    return {
      className,
      property: "border-width",
      value: 1,
      variant: "preset",
    };
  }

  // Handle arbitrary and variable values
  if (className.includes("[") && className.includes("]")) {
    const match = className.match(/^([a-z-]+)-(\$?\[.*?\])$/);
    if (!match) return null;

    const [, type, value] = match;

    // Handle border-dashed with arrays
    if (type === "border-dashed") {
      // Handle dash pattern arrays
      const dashValues = value.slice(1, -1).split(",").map((v) => parseFloat(v.trim()));

      // Validate all values are numbers
      if (dashValues.every((v) => !isNaN(v))) {
        return {
          className,
          property: "border-dash-pattern",
          value: dashValues as number[],
          variant: "arbitrary",
        };
      }
      return null;
    }

    // Handle arbitrary values
    const parsedValue = parseArbitraryValue(value, {
      allowNegative: type.startsWith("rounded"),
      allowUnits: true,
      allowColors: type === "border-color" || type === "border",
      requireValidColor: type === "border-color" || type === "border",
      allowFigmaVariables: true,
    });

    if (parsedValue !== null) {
      let property: string;

      // Handle rounded classes
      if (type.startsWith("rounded")) {
        const position = type.replace("rounded-", "") as RadiusPosition;
        property = position && RADIUS_POSITION_MAP[position] ? RADIUS_POSITION_MAP[position] : "border-radius";
      }
      // Handle border-color
      else if (type === "border-color") {
        property = "border-color";
      }
              // Handle border-width
        else if (type === "border-width") {
          property = "border-width";
        }
      // Handle border (can be color or width)
      else if (type === "border") {
        if (parsedValue.variant === "figma-variable") {
          // For variables, default to width
          property = "border-width";
        } else {
          // For arbitrary values, determine by value type
          property =
            typeof parsedValue.value === "string" &&
            (parsedValue.value.startsWith("#") || parsedValue.value.startsWith("rgb"))
              ? "border-color"
              : "border-width";
        }
      } else {
        return null;
      }

      const result: ParsedClassName = {
        className,
        property,
        value: parsedValue.value as string,
        variant: parsedValue.variant as "arbitrary" | "preset",
      };

      return result;
    }
  }

  // Handle preset border values
  if (className.startsWith("border-")) {
    const value = className.replace("border-", "");

    // Border color presets
    if (COLORS[value]) {
      return {
        className,
        property: "border-color",
        value: value as string,
        variant: "preset",
      };
    }

    // Border style presets
    if (BORDER_STYLE_MAP[value as keyof typeof BORDER_STYLE_MAP]) {
      return {
        className,
        property: "border-style",
        value: BORDER_STYLE_MAP[value as keyof typeof BORDER_STYLE_MAP],
        variant: "preset",
      };
    }

    // Border width numeric presets
    const borderWidthMatch = value.match(/^(\d+)$/);
    if (borderWidthMatch) {
      const width = parseInt(borderWidthMatch[1], 10);
      return {
        className,
        property: "border-width",
        value: width,
        variant: "preset",
      };
    }
  }

  // Handle rounded preset values
  if (className.startsWith("rounded")) {
    if (className === "rounded") {
      return {
        className,
        property: "border-radius",
        value: RADIUS.DEFAULT,
        variant: "preset",
      };
    }

    const match = className.match(/^rounded-([a-z]{1,2})-?(.*)$/);
    if (match) {
      const [, position, value] = match;
      const property = RADIUS_POSITION_MAP[position as RadiusPosition] || "border-radius";

      if (value === "") {
        // Handle cases like "rounded-lg", "rounded-md"
        const sizeMatch = className.match(/^rounded-([a-z]+)$/);
        if (sizeMatch) {
          const size = sizeMatch[1];
          if (RADIUS[size.toUpperCase() as keyof typeof RADIUS]) {
            return {
              className,
              property: "border-radius",
              value: RADIUS[size.toUpperCase() as keyof typeof RADIUS],
              variant: "preset",
            };
          }
        }
      } else if (RADIUS[value.toUpperCase() as keyof typeof RADIUS]) {
        return {
          className,
          property,
          value: RADIUS[value.toUpperCase() as keyof typeof RADIUS],
          variant: "preset",
        };
      }
    }

    // Handle size-only rounded classes (rounded-lg, rounded-md, etc.)
    const sizeMatch = className.match(/^rounded-([a-z]+)$/);
    if (sizeMatch) {
      const size = sizeMatch[1];
      if (RADIUS[size.toUpperCase() as keyof typeof RADIUS]) {
        return {
          className,
          property: "border-radius",
          value: RADIUS[size.toUpperCase() as keyof typeof RADIUS],
          variant: "preset",
        };
      }
    }
  }

  return null;
} 
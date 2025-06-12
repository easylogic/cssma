import { ParsedClassName } from "../../types";
import { COLORS } from "../../config/tokens";
import { parseArbitraryValue } from "../../utils/converters";

export function parseBackgroundClassName(className: string): ParsedClassName | null {
  // Handle background color
  if (className.startsWith("bg-")) {
    const value = className.slice(3); // Remove "bg-" prefix

    // Handle preset colors
    if (COLORS[value]) {
      return {
        className,
        property: "background-color",
        value: value as string,
        variant: "preset",
      };
    }

    // Handle arbitrary values
    if (value.startsWith("[") && value.endsWith("]")) {
      const parsedValue = parseArbitraryValue(value, {
        allowColors: true,
        requireValidColor: true,
        allowFigmaVariables: true,
      });

      if (parsedValue) {
        const result: ParsedClassName = {
          className,
          property: "background-color",
          value: parsedValue.value as string,
          variant: parsedValue.variant as "arbitrary" | "preset",
        };

        return result;
      }
    }

    // Handle special background values
    if (value === "transparent") {
      return {
        className,
        property: "background-color",
        value: "transparent",
        variant: "preset",
      };
    }

    if (value === "current") {
      return {
        className,
        property: "background-color",
        value: "currentColor",
        variant: "preset",
      };
    }
  }

  // Handle background opacity
  if (className.startsWith("bg-opacity-")) {
    const value = className.slice(11); // Remove "bg-opacity-" prefix
    const opacity = parseInt(value, 10);

    if (!isNaN(opacity) && opacity >= 0 && opacity <= 100) {
      return {
        className,
        property: "background-opacity",
        value: opacity / 100,
        variant: "preset",
      };
    }
  }

  return null;
} 
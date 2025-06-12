import { ParsedClassName } from "../../types";

export function parseTransformClassName(className: string): ParsedClassName | null {
  // Handle rotation classes
  if (className.startsWith("rotate-") || className.startsWith("-rotate-")) {
    const isNegative = className.startsWith("-");
    const value = className.replace(/^-?rotate-/, "");

    // Handle arbitrary values
    if (value.startsWith("[") && value.endsWith("]")) {
      const angle = parseFloat(value.slice(1, -1));
      if (!isNaN(angle)) {
        return {
          className,
          property: "transform",
          value: `rotate(${isNegative ? -angle : angle}deg)`,
          variant: "arbitrary",
        };
      }
      return null;
    }

    // Handle preset values
    const presetAngle = parseInt(value);
    if (!isNaN(presetAngle)) {
      return {
        className,
        property: "transform",
        value: `rotate(${isNegative ? -presetAngle : presetAngle}deg)`,
        variant: "preset",
      };
    }
  }

  return null;
} 
import { ParsedClassName } from "../../types";
import { parseArbitraryValue } from "../../utils/converters";

const SPACING_MAP = {
  "0": 0,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "16": 64,
} as const;

export function parseSpacingClassName(className: string): ParsedClassName | null {
  // Handle gap classes
  if (className.startsWith("gap-")) {
    const presetMatch = className.match(/^gap-(x|y)?-?(\d+)$/);
    if (presetMatch) {
      const [, direction, value] = presetMatch;
      const size = SPACING_MAP[value as keyof typeof SPACING_MAP];

      if (size !== undefined) {
        if (direction === "x") {
          return {
            className,
            property: "column-gap",
            value: size,
            variant: "preset",
          };
        } else if (direction === "y") {
          return {
            className,
            property: "row-gap",
            value: size,
            variant: "preset",
          };
        } else {
          return {
            className,
            property: "gap",
            value: size,
            variant: "preset",
          };
        }
      }
    }

    // Handle arbitrary values and Figma variables
    const arbitraryMatch = className.match(/^gap-(x|y)?-?(\$?\[.*?\])$/);
    if (arbitraryMatch) {
      const [, direction = "", valueWithUnit] = arbitraryMatch;

      // Handle arbitrary values
      const parsedValue = parseArbitraryValue(valueWithUnit, {
        allowNegative: true,
        allowUnits: true,
        allowFigmaVariables: true,
        allowColors: false,
      });

      if (parsedValue !== null) {
        const result: ParsedClassName = {
          className,
          property: direction === "x" ? "gap-x" : direction === "y" ? "gap-y" : "gap",
          value: parsedValue.value as string,
          variant: parsedValue.variant as "arbitrary" | "preset",
        };

        return result;
      }
    }
  }

  // Handle padding classes
  if (className.startsWith("p")) {
    // Handle preset values
    const presetMatch = className.match(/^p([trbl]|[xy])?-?(\d+)$/);
    if (presetMatch) {
      const [, direction, value] = presetMatch;
      const size = SPACING_MAP[value as keyof typeof SPACING_MAP];

      if (size !== undefined) {
        switch (direction) {
          case "t":
            return { className, property: "padding-top", value: size, variant: "preset" };
          case "r":
            return { className, property: "padding-right", value: size, variant: "preset" };
          case "b":
            return { className, property: "padding-bottom", value: size, variant: "preset" };
          case "l":
            return { className, property: "padding-left", value: size, variant: "preset" };
          case "x":
            return { className, property: "padding-inline", value: size, variant: "preset" };
          case "y":
            return { className, property: "padding-block", value: size, variant: "preset" };
          default:
            return { className, property: "padding", value: size, variant: "preset" };
        }
      }
    }

    // Handle arbitrary values
    const arbitraryMatch = className.match(/^p([trbl]|[xy])?-?(\$?\[.*?\])$/);
    if (arbitraryMatch) {
      const [, direction = "", valueWithUnit] = arbitraryMatch;
      const parsedValue = parseArbitraryValue(valueWithUnit, {
        allowNegative: true,
        allowUnits: true,
        allowFigmaVariables: true,
        allowColors: false,
      });

      if (parsedValue !== null) {
        let property: string;
        switch (direction) {
          case "t":
            property = "padding-top";
            break;
          case "r":
            property = "padding-right";
            break;
          case "b":
            property = "padding-bottom";
            break;
          case "l":
            property = "padding-left";
            break;
          case "x":
            property = "padding-inline";
            break;
          case "y":
            property = "padding-block";
            break;
          default:
            property = "padding";
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
  }

  return null;
} 
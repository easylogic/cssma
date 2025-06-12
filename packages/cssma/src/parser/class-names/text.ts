import { ParsedClassName } from "../../types";
import { FONT_SIZES, COLORS } from "../../config/tokens";
import { parseArbitraryValue } from "../../utils/converters";

const TEXT_ALIGN_HORIZONTAL_MAP = {
  "text-left": "left",
  "text-center": "center",
  "text-right": "right",
  "text-justify": "justify",
} as const;

const TEXT_DECORATION_MAP = {
  underline: "underline",
  "line-through": "line-through",
  "no-underline": "none",
} as const;

const TEXT_TRANSFORM_MAP = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  "normal-case": "none",
} as const;

const TEXT_AUTO_RESIZE_MAP = {
  "text-fixed": "none",
  "text-auto": "width-and-height",
  "text-auto-h": "height",
  truncate: "truncate",
} as const;

export function parseTextClassName(className: string): ParsedClassName | null {
  // Handle text alignment
  if (className in TEXT_ALIGN_HORIZONTAL_MAP) {
    return {
      className,
              property: "text-align",
      value: TEXT_ALIGN_HORIZONTAL_MAP[className as keyof typeof TEXT_ALIGN_HORIZONTAL_MAP],
      variant: "preset",
    };
  }

  // Handle text decoration
  if (className in TEXT_DECORATION_MAP) {
    return {
      className,
              property: "text-decoration",
      value: TEXT_DECORATION_MAP[className as keyof typeof TEXT_DECORATION_MAP],
      variant: "preset",
    };
  }

  // Handle text transform
  if (className in TEXT_TRANSFORM_MAP) {
    return {
      className,
      property: "text-transform",
      value: TEXT_TRANSFORM_MAP[className as keyof typeof TEXT_TRANSFORM_MAP],
      variant: "preset",
    };
  }

  // Handle text auto resize
  if (className in TEXT_AUTO_RESIZE_MAP) {
    return {
      className,
      property: "text-auto-resize",
      value: TEXT_AUTO_RESIZE_MAP[className as keyof typeof TEXT_AUTO_RESIZE_MAP],
      variant: "preset",
    };
  }

  // Handle text color
  if (className.startsWith("text-")) {
    const value = className.slice(5); // Remove "text-" prefix

    // Handle preset colors
    if (COLORS[value]) {
      return {
        className,
        property: "color",
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
          property: "color",
          value: parsedValue.value as string,
          variant: parsedValue.variant as "arbitrary" | "preset",
        };

        return result;
      }
    }

    // Handle font sizes
    if (FONT_SIZES[value]) {
      return {
        className,
        property: "font-size",
        value: FONT_SIZES[value],
        variant: "preset",
      };
    }
  }

  // Handle font size with text- prefix for sizes
  const fontSizeMatch = className.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)$/);
  if (fontSizeMatch) {
    const size = fontSizeMatch[1];
    if (FONT_SIZES[size]) {
      return {
        className,
        property: "font-size",
        value: FONT_SIZES[size],
        variant: "preset",
      };
    }
  }

  // Handle font weight
  if (className.startsWith("font-")) {
    const value = className.slice(5); // Remove "font-" prefix

    // Font weight numeric values
    const weightMap: Record<string, number> = {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    };

    if (weightMap[value]) {
      return {
        className,
        property: "font-weight",
        value: weightMap[value],
        variant: "preset",
      };
    }

    // Handle arbitrary font weight
    if (value.startsWith("[") && value.endsWith("]")) {
      const weight = parseInt(value.slice(1, -1), 10);
      if (!isNaN(weight) && weight >= 100 && weight <= 900) {
        return {
          className,
          property: "font-weight",
          value: weight,
          variant: "arbitrary",
        };
      }
    }
  }

  // Handle line height
  if (className.startsWith("leading-")) {
    const value = className.slice(8); // Remove "leading-" prefix

    const lineHeightMap: Record<string, number> = {
      none: 100,
      tight: 125,
      snug: 137.5,
      normal: 150,
      relaxed: 165,
      loose: 200,
    };

    if (lineHeightMap[value]) {
      return {
        className,
        property: "line-height",
        value: lineHeightMap[value],
        variant: "preset",
      };
    }

    // Handle arbitrary line height
    if (value.startsWith("[") && value.endsWith("]")) {
      const parsedValue = parseArbitraryValue(value, {
        allowUnits: true,
        allowNumbers: true,
      });

      if (parsedValue) {
        return {
          className,
          property: "line-height",
          value: parsedValue.value as string,
          variant: "arbitrary",
        };
      }
    }
  }

  // Handle letter spacing
  if (className.startsWith("tracking-")) {
    const value = className.slice(9); // Remove "tracking-" prefix

    const letterSpacingMap: Record<string, number> = {
      tighter: -0.8,
      tight: -0.4,
      normal: 0,
      wide: 0.4,
      wider: 0.8,
      widest: 1.6,
    };

    if (letterSpacingMap[value]) {
      return {
        className,
        property: "letter-spacing",
        value: letterSpacingMap[value],
        variant: "preset",
      };
    }

    // Handle arbitrary letter spacing
    if (value.startsWith("[") && value.endsWith("]")) {
      const parsedValue = parseArbitraryValue(value, {
        allowUnits: true,
        allowNumbers: true,
        allowNegative: true,
      });

      if (parsedValue) {
        return {
          className,
          property: "letter-spacing",
          value: parsedValue.value as string,
          variant: "arbitrary",
        };
      }
    }
  }

  return null;
} 
import { ParsedClassName } from "../../types";

const FONT_FAMILY_MAP = {
  sans: "Inter",
  serif: "Georgia",
  mono: "Roboto Mono",
} as const;

const FONT_WEIGHT_MAP = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

const FONT_STYLE_MAP = {
  italic: "italic",
  "not-italic": "normal",
} as const;

export function parseFontClassName(className: string): ParsedClassName | null {
  // Handle arbitrary font families
  if (className.includes("[") && className.includes("]")) {
    const match = className.match(/^([a-z-]+)-\[(.*?)\]$/);
    if (!match) return null;

    const [, type, value] = match;

    // Handle font-[family name]
    if (type === "font") {
      if (!value.trim()) {
        return null;
      }
      return {
        className,
        property: "font-family",
        value: value,
        variant: "arbitrary",
      };
    }
  }

  // Handle font- prefixed classes
  if (className.startsWith("font-")) {
    const value = className.replace("font-", "");

    // Skip empty values
    if (!value) {
      return null;
    }

    // Font weight
    if (value in FONT_WEIGHT_MAP) {
      return {
        className,
        property: "font-weight",
        value: FONT_WEIGHT_MAP[value as keyof typeof FONT_WEIGHT_MAP],
        variant: "preset",
      };
    }

    // Font family presets
    if (value in FONT_FAMILY_MAP) {
      return {
        className,
        property: "font-family",
        value: FONT_FAMILY_MAP[value as keyof typeof FONT_FAMILY_MAP],
        variant: "preset",
      };
    }

    // Custom font family (capitalize first letter)
    const firstChar = value.charAt(0).toUpperCase();
    const restChars = value.slice(1);
    const fontFamily = firstChar + restChars;
    return {
      className,
      property: "font-family",
      value: fontFamily,
      variant: "preset",
    };
  }

  // Font style
  if (className in FONT_STYLE_MAP) {
    return {
      className,
      property: "font-style",
      value: FONT_STYLE_MAP[className as keyof typeof FONT_STYLE_MAP],
      variant: "preset",
    };
  }

  return null;
} 
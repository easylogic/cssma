import { ParsedClassName } from "../../types";

const LAYOUT_WRAP_MAP = {
  wrap: "WRAP",
  nowrap: "NO_WRAP",
} as const;

const PRIMARY_AXIS_ALIGN_MAP = {
  "justify-start": "flex-start",
  "justify-center": "center",
  "justify-end": "flex-end", 
  "justify-between": "space-between",
} as const;

const COUNTER_AXIS_ALIGN_MAP = {
  "items-start": "flex-start",
  "items-center": "center",
  "items-end": "flex-end",
  "items-baseline": "baseline",
} as const;

const SELF_ALIGN_MAP = {
  "self-start": "flex-start",
  "self-center": "center",
  "self-end": "flex-end",
  "self-stretch": "stretch",
} as const;

/**
 * Parse arbitrary numeric value from a string
 * @param value Value to parse
 * @param allowNegative Whether to allow negative values
 * @returns Parsed number or null if invalid
 */
function parseArbitraryValue(value: string, allowNegative: boolean = false): string | null {
  const match = value.match(/^\[(.+)\]$/);
  if (!match) return null;

  const content = match[1];
  
  // If it's a pure number without units, add px
  if (/^[-\d.]+$/.test(content)) {
    const num = parseFloat(content);
    if (isNaN(num)) return null;
    if (!allowNegative && num < 0) return null;
    return `${num}px`;
  }
  
  // If it already has units or is a percentage, return as-is
  return content;
}

/**
 * Parse layout-related class names
 */
export function parseLayoutClassName(className: string): ParsedClassName | null {
  // Handle grid
  if (className === "grid") {
    return {
      className,
      property: "display",
      value: "grid",
      variant: "preset",
    };
  }

  // Handle Flex direction
  if (className === "flex-row") {
    return {
      className,
      property: "flex-direction",
      value: "row",
      variant: "preset",
    };
  }

  if (className === "flex-col") {
    return {
      className,
      property: "flex-direction",
      value: "column",
      variant: "preset",
    };
  }

  // Handle Flex wrap
  if (className in LAYOUT_WRAP_MAP) {
    return {
      className,
              property: "flex-wrap",
      value: LAYOUT_WRAP_MAP[className as keyof typeof LAYOUT_WRAP_MAP],
      variant: "preset",
    };
  }

  // Handle Alignment
  if (className in COUNTER_AXIS_ALIGN_MAP) {
    return {
      className,
      property: "align-items",
      value: COUNTER_AXIS_ALIGN_MAP[className as keyof typeof COUNTER_AXIS_ALIGN_MAP],
      variant: "preset",
    };
  }

  if (className in PRIMARY_AXIS_ALIGN_MAP) {
    return {
      className,
      property: "justify-content",
      value: PRIMARY_AXIS_ALIGN_MAP[className as keyof typeof PRIMARY_AXIS_ALIGN_MAP],
      variant: "preset",
    };
  }

  // Handle Self Alignment (individual item alignment)
  if (className in SELF_ALIGN_MAP) {
    return {
      className,
              property: "align-self",
      value: SELF_ALIGN_MAP[className as keyof typeof SELF_ALIGN_MAP],
      variant: "preset",
    };
  }

  // Handle Width
  if (className.startsWith("w-")) {
    const value = className.slice(2);

    // Handle preset values
    if (value === "full") {
      return {
        className,
        property: "width",
        value: "100%",
        variant: "preset",
      };
    }

    if (value === "auto") {
      return {
        className,
        property: "width",
        value: "auto",
        variant: "preset",
      };
    }

    // Handle arbitrary values
    const size = parseArbitraryValue(value);
    if (size !== null) {
      return {
        className,
        property: "width",
        value: size,
        variant: "arbitrary",
      };
    }
  }

  // Handle Height
  if (className.startsWith("h-")) {
    const value = className.slice(2);

    // Handle preset values
    if (value === "full") {
      return {
        className,
        property: "height",
        value: "100%",
        variant: "preset",
      };
    }

    if (value === "auto") {
      return {
        className,
        property: "height",
        value: "auto",
        variant: "preset",
      };
    }

    // Handle arbitrary values
    const size = parseArbitraryValue(value);
    if (size !== null) {
      return {
        className,
        property: "height",
        value: size,
        variant: "arbitrary",
      };
    }
  }

  // Handle Gap
  if (className.startsWith("gap-")) {
    const match = className.match(/^gap-(x|y)?-?(.+)$/);
    if (!match) return null;

    const [, direction, value] = match;

    // Handle arbitrary values
    const size = parseArbitraryValue(value);
    if (size !== null) {
      const property = direction === "x" ? "column-gap" : direction === "y" ? "row-gap" : "gap";
      return {
        className,
        property,
        value: size,
        variant: "arbitrary",
      };
    }
  }

  return null;
} 
import { ParsedClassName } from "../../types";

const OVERFLOW_MAP = {
  visible: "visible",
  hidden: "hidden",
  scroll: "scroll",
  auto: "auto",
} as const;

export function parseOverflowClassName(className: string): ParsedClassName | null {
  // Handle overflow classes
  if (className.startsWith("overflow-")) {
    const value = className.replace("overflow-", "");
    const config = OVERFLOW_MAP[value as keyof typeof OVERFLOW_MAP];

    if (config) {
      return {
        className,
        property: "overflow",
        value: config as string,
        variant: "preset",
      };
    }
  }

  return null;
} 
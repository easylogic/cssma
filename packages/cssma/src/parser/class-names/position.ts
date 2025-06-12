import { parseArbitraryValue } from "../../utils/converters";
import { ParsedClassName } from "../../types";
import { extractFigmaVariableId } from "../../utils/variables";

const POSITION_VALUES = {
  static: "static",
  fixed: "fixed",
  absolute: "absolute",
  relative: "relative",
  sticky: "sticky",
} as const;

const INSET_VALUES = {
  auto: "auto",
  "0": "0px",
  "0.5": "2px",
  "1": "4px",
  "1.5": "6px",
  "2": "8px",
  "2.5": "10px",
  "3": "12px",
  "3.5": "14px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "7": "28px",
  "8": "32px",
  "9": "36px",
  "10": "40px",
  "11": "44px",
  "12": "48px",
  "14": "56px",
  "16": "64px",
  "20": "80px",
  "24": "96px",
  "28": "112px",
  "32": "128px",
  "36": "144px",
  "40": "160px",
  "44": "176px",
  "48": "192px",
  "52": "208px",
  "56": "224px",
  "60": "240px",
  "64": "256px",
  "72": "288px",
  "80": "320px",
  "96": "384px",
  "px": "1px",
  "full": "100%",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
} as const;

export function parsePositionClassName(className: string): ParsedClassName | null {
 
  // Handle position values (static, fixed, absolute, relative, sticky)
  if (POSITION_VALUES[className as keyof typeof POSITION_VALUES]) {
    return {
      className,
      property: "position",
      value: POSITION_VALUES[className as keyof typeof POSITION_VALUES],
      variant: "preset",
    };
  }

  // Handle inset shorthand
  const insetMatch = className.match(/^inset-(.+)$/);
  if (insetMatch) {
    const [, value] = insetMatch;
    
    if (value.startsWith("-")) {
      const positiveValue = value.slice(1);
      if (INSET_VALUES[positiveValue as keyof typeof INSET_VALUES]) {
        const insetValue = INSET_VALUES[positiveValue as keyof typeof INSET_VALUES];
        const negativeValue = insetValue === "auto" ? "auto" : `-${insetValue}`;
        return {
          className,
          property: "inset",
          value: negativeValue,
          variant: "preset",
        };
      }
    }
    
    if (INSET_VALUES[value as keyof typeof INSET_VALUES]) {
      return {
        className,
        property: "inset",
        value: INSET_VALUES[value as keyof typeof INSET_VALUES],
        variant: "preset",
      };
    }
    
    const arbitraryValue = parseArbitraryValue(value, {
      allowUnits: true,
      allowNumbers: true,
    });
    if (arbitraryValue) {
      return {
        className,
        property: "inset",
        value: arbitraryValue.value as string,
        variant: "arbitrary",
      };
    }
  }

  // Handle top-*
  const topMatch = className.match(/^top-(.+)$/);
  if (topMatch) {
    const [, value] = topMatch;
    
    if (value.startsWith("-")) {
      const positiveValue = value.slice(1);
      if (INSET_VALUES[positiveValue as keyof typeof INSET_VALUES]) {
        const insetValue = INSET_VALUES[positiveValue as keyof typeof INSET_VALUES];
        const negativeValue = insetValue === "auto" ? "auto" : `-${insetValue}`;
        return {
          className,
          property: "top",
          value: negativeValue,
          variant: "preset",
        };
      }
    }
    
    if (INSET_VALUES[value as keyof typeof INSET_VALUES]) {
      return {
        className,
        property: "top",
        value: INSET_VALUES[value as keyof typeof INSET_VALUES],
        variant: "preset",
      };
    }
    
    const arbitraryValue = parseArbitraryValue(value, {
      allowUnits: true,
      allowNumbers: true,
    });
    if (arbitraryValue) {
      return {
        className,
        property: "top",
        value: arbitraryValue.value as string,
        variant: "arbitrary",
      };
    }
  }

  // Handle right-*
  const rightMatch = className.match(/^right-(.+)$/);
  if (rightMatch) {
    const [, value] = rightMatch;
    
    if (value.startsWith("-")) {
      const positiveValue = value.slice(1);
      if (INSET_VALUES[positiveValue as keyof typeof INSET_VALUES]) {
        const insetValue = INSET_VALUES[positiveValue as keyof typeof INSET_VALUES];
        const negativeValue = insetValue === "auto" ? "auto" : `-${insetValue}`;
        return {
          className,
          property: "right",
          value: negativeValue,
          variant: "preset",
        };
      }
    }
    
    if (INSET_VALUES[value as keyof typeof INSET_VALUES]) {
      return {
        className,
        property: "right",
        value: INSET_VALUES[value as keyof typeof INSET_VALUES],
        variant: "preset",
      };
    }
    
    const arbitraryValue = parseArbitraryValue(value, {
      allowUnits: true,
      allowNumbers: true,
    });
    if (arbitraryValue) {
      return {
        className,
        property: "right",
        value: arbitraryValue.value as string,
        variant: "arbitrary",
      };
    }
  }

  // Handle bottom-*
  const bottomMatch = className.match(/^bottom-(.+)$/);
  if (bottomMatch) {
    const [, value] = bottomMatch;
    
    if (value.startsWith("-")) {
      const positiveValue = value.slice(1);
      if (INSET_VALUES[positiveValue as keyof typeof INSET_VALUES]) {
        const insetValue = INSET_VALUES[positiveValue as keyof typeof INSET_VALUES];
        const negativeValue = insetValue === "auto" ? "auto" : `-${insetValue}`;
        return {
          className,
          property: "bottom",
          value: negativeValue,
          variant: "preset",
        };
      }
    }
    
    if (INSET_VALUES[value as keyof typeof INSET_VALUES]) {
      return {
        className,
        property: "bottom",
        value: INSET_VALUES[value as keyof typeof INSET_VALUES],
        variant: "preset",
      };
    }
    
    const arbitraryValue = parseArbitraryValue(value, {
      allowUnits: true,
      allowNumbers: true,
    });
    if (arbitraryValue) {
      return {
        className,
        property: "bottom",
        value: arbitraryValue.value as string,
        variant: "arbitrary",
      };
    }
  }

  // Handle left-*
  const leftMatch = className.match(/^left-(.+)$/);
  if (leftMatch) {
    const [, value] = leftMatch;
    
    if (value.startsWith("-")) {
      const positiveValue = value.slice(1);
      if (INSET_VALUES[positiveValue as keyof typeof INSET_VALUES]) {
        const insetValue = INSET_VALUES[positiveValue as keyof typeof INSET_VALUES];
        const negativeValue = insetValue === "auto" ? "auto" : `-${insetValue}`;
        return {
          className,
          property: "left",
          value: negativeValue,
          variant: "preset",
        };
      }
    }
    
    if (INSET_VALUES[value as keyof typeof INSET_VALUES]) {
      return {
        className,
        property: "left",
        value: INSET_VALUES[value as keyof typeof INSET_VALUES],
        variant: "preset",
      };
    }
    
    const arbitraryValue = parseArbitraryValue(value, {
      allowUnits: true,
      allowNumbers: true,
    });
    if (arbitraryValue) {
      return {
        className,
        property: "left",
        value: arbitraryValue.value as string,
        variant: "arbitrary",
      };
    }
  }

  return null;
} 
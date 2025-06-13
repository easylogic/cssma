import { ParsedClassName } from "../../types";

export function parseAnimationClassName(className: string): ParsedClassName | null {
  // Handle transition classes
  if (className.startsWith("transition")) {
    if (className === "transition") {
      return {
        className,
        property: "transition-property",
        value: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        variant: "preset",
      };
    }

    if (className === "transition-none") {
      return {
        className,
        property: "transition-property",
        value: "none",
        variant: "preset",
      };
    }

    if (className === "transition-all") {
      return {
        className,
        property: "transition-property", 
        value: "all",
        variant: "preset",
      };
    }

    if (className === "transition-colors") {
      return {
        className,
        property: "transition-property",
        value: "color, background-color, border-color, text-decoration-color, fill, stroke",
        variant: "preset",
      };
    }

    if (className === "transition-opacity") {
      return {
        className,
        property: "transition-property",
        value: "opacity",
        variant: "preset",
      };
    }

    if (className === "transition-shadow") {
      return {
        className,
        property: "transition-property",
        value: "box-shadow",
        variant: "preset",
      };
    }

    if (className === "transition-transform") {
      return {
        className,
        property: "transition-property",
        value: "transform",
        variant: "preset",
      };
    }
  }

  // Handle duration classes
  if (className.startsWith("duration-")) {
    const value = className.replace("duration-", "");
    
    // Handle arbitrary values
    if (value.startsWith("[") && value.endsWith("]")) {
      const duration = value.slice(1, -1);
      return {
        className,
        property: "transition-duration",
        value: duration.includes("ms") || duration.includes("s") ? duration : `${duration}ms`,
        variant: "arbitrary",
      };
    }

    // Handle preset values
    const durationMap: Record<string, string> = {
      "0": "0s",
      "75": "75ms",
      "100": "100ms",
      "150": "150ms",
      "200": "200ms",
      "300": "300ms",
      "500": "500ms",
      "700": "700ms",
      "1000": "1000ms",
    };

    if (value in durationMap) {
      return {
        className,
        property: "transition-duration",
        value: durationMap[value],
        variant: "preset",
      };
    }
  }

  // Handle delay classes
  if (className.startsWith("delay-")) {
    const value = className.replace("delay-", "");
    
    // Handle arbitrary values
    if (value.startsWith("[") && value.endsWith("]")) {
      const delay = value.slice(1, -1);
      return {
        className,
        property: "transition-delay",
        value: delay.includes("ms") || delay.includes("s") ? delay : `${delay}ms`,
        variant: "arbitrary",
      };
    }

    // Handle preset values
    const delayMap: Record<string, string> = {
      "0": "0s",
      "75": "75ms",
      "100": "100ms",
      "150": "150ms",
      "200": "200ms",
      "300": "300ms",
      "500": "500ms",
      "700": "700ms",
      "1000": "1000ms",
    };

    if (value in delayMap) {
      return {
        className,
        property: "transition-delay",
        value: delayMap[value],
        variant: "preset",
      };
    }
  }

  // Handle easing classes
  if (className.startsWith("ease-")) {
    const easingMap: Record<string, string> = {
      "ease-linear": "linear",
      "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
      "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    };

    if (className in easingMap) {
      return {
        className,
        property: "transition-timing-function",
        value: easingMap[className],
        variant: "preset",
      };
    }
  }

  // Handle animate classes
  if (className.startsWith("animate-")) {
    const animationType = className.replace("animate-", "");

    if (animationType === "none") {
      return {
        className,
        property: "animation",
        value: "none",
        variant: "preset",
      };
    }

    const animationMap: Record<string, string> = {
      "spin": "spin 1s linear infinite",
      "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "bounce": "bounce 1s infinite",
    };

    if (animationType in animationMap) {
      return {
        className,
        property: "animation",
        value: animationMap[animationType],
        variant: "preset",
      };
    }
  }

  return null;
} 
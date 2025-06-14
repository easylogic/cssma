import { ParsedClassName } from "../../types";

export function parseAnimationClassName(className: string): ParsedClassName | null {
  // 🆕 Input validation and sanitization
  if (!className || typeof className !== 'string') {
    return null;
  }

  // Trim whitespace and check for empty string
  const trimmedClassName = className.trim();
  if (!trimmedClassName) {
    return null;
  }

  // 🆕 Validate class name format (basic safety check)
  if (trimmedClassName.length > 200 || /[^a-zA-Z0-9\-\[\]\.\_\:]/.test(trimmedClassName)) {
    return null;
  }

  // Handle transition classes
  if (trimmedClassName.startsWith("transition")) {
    if (trimmedClassName === "transition") {
      return {
        className: trimmedClassName,
        property: "transition-property",
        value: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        variant: "preset",
      };
    }

    if (trimmedClassName === "transition-none") {
      return {
        className: trimmedClassName,
        property: "transition-property",
        value: "none",
        variant: "preset",
      };
    }

    if (trimmedClassName === "transition-all") {
      return {
        className: trimmedClassName,
        property: "transition-property", 
        value: "all",
        variant: "preset",
      };
    }

    if (trimmedClassName === "transition-colors") {
      return {
        className: trimmedClassName,
        property: "transition-property",
        value: "color, background-color, border-color, text-decoration-color, fill, stroke",
        variant: "preset",
      };
    }

    if (trimmedClassName === "transition-opacity") {
      return {
        className: trimmedClassName,
        property: "transition-property",
        value: "opacity",
        variant: "preset",
      };
    }

    if (trimmedClassName === "transition-shadow") {
      return {
        className: trimmedClassName,
        property: "transition-property",
        value: "box-shadow",
        variant: "preset",
      };
    }

    if (trimmedClassName === "transition-transform") {
      return {
        className: trimmedClassName,
        property: "transition-property",
        value: "transform",
        variant: "preset",
      };
    }
  }

  // Handle duration classes
  if (trimmedClassName.startsWith("duration-")) {
    const value = trimmedClassName.replace("duration-", "");
    
    // 🆕 Enhanced validation for empty value
    if (!value) {
      return null;
    }
    
    // Handle arbitrary values
    if (value.startsWith("[") && value.endsWith("]")) {
      const duration = value.slice(1, -1);
      
      // 🆕 Validate arbitrary value is not empty
      if (!duration) {
        return null;
      }
      
      // 🆕 Enhanced validation for arbitrary duration values
      if (!/^[\d\.]+(?:ms|s)?$/.test(duration)) {
        return null;
      }
      
      return {
        className: trimmedClassName,
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
        className: trimmedClassName,
        property: "transition-duration",
        value: durationMap[value],
        variant: "preset",
      };
    }
  }

  // Handle delay classes
  if (trimmedClassName.startsWith("delay-")) {
    const value = trimmedClassName.replace("delay-", "");
    
    // 🆕 Enhanced validation for empty value
    if (!value) {
      return null;
    }
    
    // Handle arbitrary values
    if (value.startsWith("[") && value.endsWith("]")) {
      const delay = value.slice(1, -1);
      
      // 🆕 Validate arbitrary value is not empty
      if (!delay) {
        return null;
      }
      
      // 🆕 Enhanced validation for arbitrary delay values
      if (!/^[\d\.]+(?:ms|s)?$/.test(delay)) {
        return null;
      }
      
      return {
        className: trimmedClassName,
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
        className: trimmedClassName,
        property: "transition-delay",
        value: delayMap[value],
        variant: "preset",
      };
    }
  }

  // Handle easing classes
  if (trimmedClassName.startsWith("ease-")) {
    const easingMap: Record<string, string> = {
      "ease-linear": "linear",
      "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
      "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    };

    if (trimmedClassName in easingMap) {
      return {
        className: trimmedClassName,
        property: "transition-timing-function",
        value: easingMap[trimmedClassName],
        variant: "preset",
      };
    }
  }

  // Handle animate classes
  if (trimmedClassName.startsWith("animate-")) {
    const animationType = trimmedClassName.replace("animate-", "");

    // 🆕 Enhanced validation for empty animation type
    if (!animationType) {
      return null;
    }

    if (animationType === "none") {
      return {
        className: trimmedClassName,
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
        className: trimmedClassName,
        property: "animation",
        value: animationMap[animationType],
        variant: "preset",
      };
    }
  }

  return null;
} 
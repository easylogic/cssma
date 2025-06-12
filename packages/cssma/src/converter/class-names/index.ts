import { ParsedClassName } from "../../types";
import { parseClassNames } from "../../parser/class-names";
import { 
  convertGradientBackground, 
  convertGradientFromColor, 
  convertGradientViaColor, 
  convertGradientToColor 
} from "./gradient";
import { 
  convertSizeClasses, 
  convertArbitraryValues, 
  convertUtilityClasses 
} from "./utils";

export interface CSSConversion {
  className: string;
  cssProperty: string;
  cssValue: string;
}

export function convertClassNamesToCSS(classNames: string): CSSConversion[] {
  const parsedClassNames = parseClassNames(classNames);
  const cssConversions: CSSConversion[] = [];
  const classNameArray = classNames.split(/\s+/).filter(Boolean);
  
  // Create a Map for faster lookup of parsed class names
  const parsedClassNameMap = new Map(parsedClassNames.map(p => [p.className, p]));
  
  // Process all class names in original input order
  for (const className of classNameArray) {
    let cssProperties: Record<string, string> | null = null;
    
    // Check if this class was parsed
    const parsedClassName = parsedClassNameMap.get(className);
    if (parsedClassName) {
      // Use parsed result
      cssProperties = convertParsedClassNameToCSS(parsedClassName);
    } else {
      // Try direct conversion for unparsed classes
      cssProperties = convertClassNameDirectlyToCSS(className);
    }
    
    // Add to conversions if we got valid CSS properties
    if (cssProperties) {
      for (const [cssProperty, cssValue] of Object.entries(cssProperties)) {
        cssConversions.push({
          className,
          cssProperty,
          cssValue
        });
      }
    }
  }

  return cssConversions;
}

export function convertClassNamesToCSSObject(classNames: string): Record<string, string> {
  const conversions = convertClassNamesToCSS(classNames);
  const cssProperties: Record<string, string> = {};

  for (const conversion of conversions) {
    cssProperties[conversion.cssProperty] = conversion.cssValue;
  }

  return cssProperties;
}

function convertClassNameDirectlyToCSS(className: string): Record<string, string> | null {
  // Try size classes first
  const sizeResult = convertSizeClasses(className);
  if (sizeResult) return sizeResult;

  // Try gradient background
  const gradientBg = convertGradientBackground(className);
  if (gradientBg) return { [gradientBg.cssProperty]: gradientBg.cssValue };

  // Try gradient colors
  const gradientFrom = convertGradientFromColor(className);
  if (gradientFrom) return gradientFrom;

  const gradientVia = convertGradientViaColor(className);
  if (gradientVia) return gradientVia;

  const gradientTo = convertGradientToColor(className);
  if (gradientTo) return gradientTo;

  // Try arbitrary values
  const arbitraryResult = convertArbitraryValues(className);
  if (arbitraryResult) return arbitraryResult;

  // Try utility classes
  const utilityResult = convertUtilityClasses(className);
  if (utilityResult) return utilityResult;

  return null;
}

function convertParsedClassNameToCSS(parsedClassName: ParsedClassName): Record<string, string> | null {
  const { property, value } = parsedClassName;

  // For parsed class names, just use the property and value as-is
  // since they should already be in CSS format from the parsers
  return {
    [property]: String(value)
  };
}

 
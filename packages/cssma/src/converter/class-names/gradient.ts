import { parseArbitraryValue } from "../../utils/converters";
import { COLORS } from "../../config/tokens";
import { parseColor } from "../../utils/colors";

export interface GradientConversion {
  cssProperty: string;
  cssValue: string;
}

/**
 * Convert gradient background classes
 */
export function convertGradientBackground(className: string): GradientConversion | null {
  if (className.match(/^bg-linear-to-[a-z]+$/)) {
    const direction = className.replace('bg-linear-to-', '');
    const directionMap: Record<string, string> = {
      't': 'to top',
      'tr': 'to top right',
      'r': 'to right',
      'br': 'to bottom right',
      'b': 'to bottom',
      'bl': 'to bottom left',
      'l': 'to left',
      'tl': 'to top left'
    };
    
    return {
      cssProperty: 'background-image',
      cssValue: `linear-gradient(${directionMap[direction] || 'to right'}, var(--tw-gradient-stops))`
    };
  }

  return null;
}

/**
 * Convert gradient from color classes
 */
export function convertGradientFromColor(className: string): Record<string, string> | null {
  if (className.match(/^from-/)) {
    const color = className.replace('from-', '');
    const hexColor = convertColorToHex(color);
    
    if (hexColor) {
      const rgbColor = hexToRgb(hexColor);
      return {
        '--tw-gradient-from': hexColor,
        '--tw-gradient-to': `rgb(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0)`,
        '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'
      };
    }
  }

  return null;
}

/**
 * Convert gradient via color classes
 */
export function convertGradientViaColor(className: string): Record<string, string> | null {
  if (className.match(/^via-/)) {
    const color = className.replace('via-', '');
    const hexColor = convertColorToHex(color);
    
    if (hexColor) {
      const rgbColor = hexToRgb(hexColor);
      return {
        '--tw-gradient-to': `rgb(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0)`,
        '--tw-gradient-stops': `var(--tw-gradient-from), ${hexColor}, var(--tw-gradient-to)`
      };
    }
  }

  return null;
}

/**
 * Convert gradient to color classes
 */
export function convertGradientToColor(className: string): Record<string, string> | null {
  if (className.match(/^to-/)) {
    const color = className.replace('to-', '');
    const hexColor = convertColorToHex(color);
    
    if (hexColor) {
      return {
        '--tw-gradient-to': hexColor
      };
    }
  }

  return null;
}

/**
 * Convert color to hex using COLORS constant and parseArbitraryValue
 */
function convertColorToHex(color: string): string | null {
  // Handle arbitrary color values using parseArbitraryValue
  if (color.startsWith('[') && color.endsWith(']')) {
    const parsedValue = parseArbitraryValue(color, {
      allowColors: true,
      requireValidColor: true
    });
    
    if (parsedValue && typeof parsedValue.value === 'string') {
      return parsedValue.value;
    }
    return null;
  }

  // Use COLORS constant to get Figma color and convert to hex
  const figmaColor = COLORS[color];
  if (figmaColor) {
    return figmaColorToHex(figmaColor);
  }

  return null;
}

/**
 * Convert Figma color to hex
 */
function figmaColorToHex(color: { r: number; g: number; b: number; a?: number }): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
} 
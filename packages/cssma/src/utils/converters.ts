import { ParsedStyle, FigmaColor, FigmaFontName, FigmaLineHeight, Shadow } from '../types';
import { isValidHexColor, isValidRgbColor } from './validators';

export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export type ParsedValue = {
  value: number | string | FigmaColor | FigmaFontName | FigmaLineHeight | Shadow[];
  variant: 'preset' | 'arbitrary' | 'figma-variable';
  variableId?: string;
};

export function parseValue(value: string): ParsedValue | null {
  
  if (value.startsWith('$[') && value.endsWith(']')) {
    const variablePath = value.slice(2, -1);
    return {
      value: variablePath,
      variant: 'figma-variable',
      variableId: variablePath
    };
  }

  
  if (value.startsWith('[') && value.endsWith(']')) {
    const innerValue = value.slice(1, -1);
    return {
      value: innerValue,
      variant: 'arbitrary'
    };
  }

  return null;
}


export function parseArbitraryValue(value: string, options: { 
  allowNegative?: boolean;
  allowUnits?: boolean;
  allowColors?: boolean;
  allowUrls?: boolean;
  requireValidColor?: boolean;
  allowFigmaVariables?: boolean;
  allowNumbers?: boolean;
} = {}): ParsedValue | null {
  const { 
    allowNegative = false, 
    allowUnits = true, 
    allowColors = true,
    allowUrls = false,
    requireValidColor = false,
    allowFigmaVariables = false,
    allowNumbers = true
  } = options;

  
  if (allowFigmaVariables && value.startsWith('$[') && value.endsWith(']')) {
    const variablePath = value.slice(2, -1);
    
    if (!variablePath || 
        variablePath.startsWith('/') || 
        variablePath.endsWith('/') ||
        variablePath.includes('//')) {
      return null;
    }

    return {
      value: variablePath,
      variant: 'figma-variable',
      variableId: variablePath
    };
  }

  
  if (value.startsWith('[') && value.endsWith(']')) {
    const innerValue = value.slice(1, -1);
    
    // Return null for empty values
    if (!innerValue.trim()) {
      return null;
    }
    
    // Handle URLs first (before colors)
    if (allowUrls) {
      // Check for URL patterns
      if (innerValue.startsWith('url(') && innerValue.endsWith(')')) {
        return {
          value: innerValue,
          variant: 'arbitrary'
        };
      }
      
      // Check for direct URLs (http://, https://, data:, etc.)
      if (innerValue.includes('://') || innerValue.startsWith('data:')) {
        return {
          value: innerValue,
          variant: 'arbitrary'
        };
      }
      
      // Check for relative paths that might be images
      if (innerValue.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
        return {
          value: innerValue,
          variant: 'arbitrary'
        };
      }
    }
    
    
    if (allowColors) {
      const isHexColor = innerValue.startsWith('#');
      const isRgbColor = innerValue.startsWith('rgb');
      
      if (isHexColor || isRgbColor) {
        const isValidColor = isHexColor ? isValidHexColor(innerValue) : isValidRgbColor(innerValue);
        
        
        if (!isValidColor && requireValidColor) {
          return null;
        }

        if (isValidColor) {
          return {
            value: innerValue,
            variant: 'arbitrary'
          };
        }
      }
    }
    
    
    if (allowUnits && allowNumbers) {
      const unitMatch = innerValue.match(/^(-?\d*\.?\d+)(px|rem|em)?$/);
      if (unitMatch) {
        const [, num, unit = 'px'] = unitMatch;
        const numValue = parseFloat(num);
        
        if (!allowNegative && numValue < 0) return null;
        
        
        switch (unit) {
          case 'px':
            return { value: numValue, variant: 'arbitrary' };
          case 'rem':
          case 'em':
            return { value: numValue * 16, variant: 'arbitrary' };
        }
      }
    }
    
    
    const numValue = parseFloat(innerValue);
    if (!isNaN(numValue)) {
      if (!allowNegative && numValue < 0) return null;
      return { value: numValue, variant: 'arbitrary' };
    }

    
    // If we require valid colors and it looks like a color but failed validation, reject it
    if (requireValidColor && (innerValue.startsWith('#') || innerValue.startsWith('rgb'))) {
      return null;
    }

    // If we require valid colors but don't allow arbitrary strings, reject
    if (requireValidColor) {
      return null;
    }

    // If we only allow units and this isn't a unit, reject
    if (allowUnits && !allowColors) {
      return null;
    }

    return {
      value: innerValue,
      variant: 'arbitrary'
    };
  }

  return null;
}


export function parseRatioValue(value: string): number | null {
  if (!/^\d+\/\d+$/.test(value)) return null;

  const [width, height] = value.split('/').map(Number);
  if (isNaN(width) || isNaN(height)) return null;
  if (width <= 0 || height <= 0) return null;
  if (height === 0) return null;

  return width / height;
}


export function percentToDecimal(value: string): number | null {
  if (!value.endsWith('%')) return null;
  
  const num = parseFloat(value.slice(0, -1));
  if (isNaN(num)) return null;
  
  return num / 100;
} 
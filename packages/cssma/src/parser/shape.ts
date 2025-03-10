import { ParsedStyle } from '../types';
import { parseArbitraryValue } from '../utils/converters';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';

const OPACITY_MAP = {
  '0': 0,
  '5': 0.05,
  '10': 0.1,
  '20': 0.2,
  '25': 0.25,
  '30': 0.3,
  '40': 0.4,
  '50': 0.5,
  '60': 0.6,
  '70': 0.7,
  '75': 0.75,
  '80': 0.8,
  '90': 0.9,
  '95': 0.95,
  '100': 1
} as const;

function parseOpacityValue(value: string): number | null {
  
  if (value.endsWith('%')) {
    const percent = parseFloat(value.slice(0, -1));
    if (!isNaN(percent)) {
      if (percent < 0) {
        return null;
      }

      if (percent > 100) {
        return null;
      }

      
      return Math.max(0, Math.min(1, percent / 100));
    }
    return null;
  }

  
  const opacity = parseFloat(value);
  if (!isNaN(opacity)) {

    if (opacity < 0) {
      return null;
    }

    
    if (opacity > 1 && opacity <= 100) {
      return opacity / 100;
    }
    
    return Math.max(0, Math.min(1, opacity));
  }
  return null;
}


const isValidVariablePath = (path: string) => {
  return path !== '' && 
         !path.startsWith('/') && 
         !path.endsWith('/') && 
         !path.includes('//');
};

export function parseShapeStyleValue(className: string): ParsedStyle | null {
  // Handle Figma variables
  if (className.includes('$[')) {
    const match = className.match(/^opacity-\$\[(.*?)\]$/);
    if (!match) return null;

    const variableId = extractFigmaVariableId(`$[${match[1]}]`);
    if (!variableId) return null;

    return createFigmaVariableStyle('opacity', variableId);
  }

  
  if (className.startsWith('opacity-')) {
    
    const presetMatch = className.match(/^opacity-(\d+)$/);
    if (presetMatch) {
      const [, value] = presetMatch;
      const opacity = OPACITY_MAP[value as keyof typeof OPACITY_MAP];
      
      if (opacity !== undefined) {
        return {
          property: 'opacity',
          value: opacity,
          variant: 'preset'
        };
      }
    }

    
    const arbitraryMatch = className.match(/^opacity-\[([\d.%]+(?:px)?)\]$/);
    if (arbitraryMatch) {
      const [, value] = arbitraryMatch;
      const cleanValue = value.replace('px', '');
      const opacity = parseOpacityValue(cleanValue);
      
      if (opacity !== null) {
        return {
          property: 'opacity',
          value: opacity,
          variant: 'arbitrary'
        };
      }
    }
  }

  return null;
} 
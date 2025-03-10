import { ParsedStyle } from '../types';
import { parseArbitraryValue } from '../utils/converters';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';

const SPACING_MAP = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64
} as const;

export function parseSpacingValue(className: string): ParsedStyle | null {
  
  if (className.startsWith('gap-')) {
    const presetMatch = className.match(/^gap-(x|y)?-?(\d+)$/);
    if (presetMatch) {
      const [, direction, value] = presetMatch;
      const size = SPACING_MAP[value as keyof typeof SPACING_MAP];
      
      if (size !== undefined) {
        if (direction === 'x') {
          return {
            property: 'itemSpacing',
            value: size,
            variant: 'preset'
          };
        } else if (direction === 'y') {
          return {
            property: 'counterAxisSpacing',
            value: size,
            variant: 'preset'
          };
        } else {
          return {
            property: 'gap',
            value: size,
            variant: 'preset'
          };
        }
      }
    }

    // Handle arbitrary values and Figma variables
    const arbitraryMatch = className.match(/^gap-(x|y)?-?(\$?\[.*?\])$/);
    if (arbitraryMatch) {
      const [, direction = '', valueWithUnit] = arbitraryMatch;
      
      // Handle Figma variables
      if (valueWithUnit.startsWith('$[') && valueWithUnit.endsWith(']')) {
        const variableId = extractFigmaVariableId(valueWithUnit);
        if (!variableId) return null;
        
        return createFigmaVariableStyle(
          direction === 'x' ? 'itemSpacing' : 
          direction === 'y' ? 'counterAxisSpacing' : 
          'gap',
          variableId
        );
      }

      // Handle arbitrary values
      const parsedValue = parseArbitraryValue(valueWithUnit, {
        allowNegative: true,
        allowUnits: true,
        allowFigmaVariables: true,
        allowColors: false
      });
      
      if (parsedValue !== null) {
        const result: ParsedStyle = {
          property: direction === 'x' ? 'itemSpacing' : 
                   direction === 'y' ? 'counterAxisSpacing' : 
                   'gap',
          value: parsedValue.value,
          variant: parsedValue.variant
        };

        if (parsedValue.variant === 'figma-variable' && parsedValue.variableId) {
          result.variableId = parsedValue.variableId;
        }

        return result;
      }
    }
  }

  
  if (className.startsWith('p')) {
    
    const presetMatch = className.match(/^p([trbl]|[xy])?-?(\d+)$/);
    if (presetMatch) {
      const [, direction, value] = presetMatch;
      const size = SPACING_MAP[value as keyof typeof SPACING_MAP];
      
      if (size !== undefined) {
        switch (direction) {
          case 't':
            return { property: 'paddingTop', value: size, variant: 'preset' };
          case 'r':
            return { property: 'paddingRight', value: size, variant: 'preset' };
          case 'b':
            return { property: 'paddingBottom', value: size, variant: 'preset' };
          case 'l':
            return { property: 'paddingLeft', value: size, variant: 'preset' };
          case 'x':
            return { property: 'paddingX', value: size, variant: 'preset' };
          case 'y':
            return { property: 'paddingY', value: size, variant: 'preset' };
          default:
            return { property: 'padding', value: size, variant: 'preset' };
        }
      }
    }

    
    const arbitraryMatch = className.match(/^p([trbl]|[xy])?-?(\$?\[.*?\])$/);
    if (arbitraryMatch) {
      const [, direction = '', valueWithUnit] = arbitraryMatch;
      const parsedValue = parseArbitraryValue(valueWithUnit, {
        allowNegative: true,
        allowUnits: true,
        allowFigmaVariables: true,
        allowColors: false
      });
      
      if (parsedValue !== null) {
        let property: string;
        switch (direction) {
          case 't': property = 'paddingTop'; break;
          case 'r': property = 'paddingRight'; break;
          case 'b': property = 'paddingBottom'; break;
          case 'l': property = 'paddingLeft'; break;
          case 'x': property = 'paddingX'; break;
          case 'y': property = 'paddingY'; break;
          default: property = 'padding';
        }

        const result: ParsedStyle = {
          property,
          value: parsedValue.value,
          variant: parsedValue.variant
        };

        if (parsedValue.variant === 'figma-variable' && parsedValue.variableId) {
          result.variableId = parsedValue.variableId;
        }

        return result;
      }
    }
  }

  return null;
} 
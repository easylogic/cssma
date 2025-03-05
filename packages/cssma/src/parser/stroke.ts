import { ParsedStyle } from '../types';
import { parseArbitraryValue } from '../utils/converters';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';

const STROKE_WEIGHT_MAP = {
  't': 'strokeTopWeight',
  'r': 'strokeRightWeight',
  'b': 'strokeBottomWeight',
  'l': 'strokeLeftWeight'
} as const;

const PRESET_WEIGHTS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '4': 4
} as const;

export function parseStrokeStyleValue(className: string): ParsedStyle | null {
  // Handle individual stroke weights (stroke-t, stroke-r, stroke-b, stroke-l)
  for (const [direction, property] of Object.entries(STROKE_WEIGHT_MAP)) {
    const prefix = `stroke-${direction}`;
    if (className.startsWith(`${prefix}-`)) {
      const value = className.slice(prefix.length + 1);

      // Handle Figma variables
      if (value.startsWith('$[') && value.endsWith(']')) {
        const variableId = extractFigmaVariableId(value);
        if (!variableId) return null;
        
        return createFigmaVariableStyle(property, variableId);
      }

      // Handle arbitrary values
      if (value.startsWith('[') && value.endsWith(']')) {
        const parsedValue = parseArbitraryValue(value, {
          allowUnits: true,
          allowNumbers: true
        });

        if (parsedValue) {
          return {
            property,
            value: parsedValue.value,
            variant: 'arbitrary'
          };
        }
      }

      // Handle preset values
      if (value in PRESET_WEIGHTS) {
        return {
          property,
          value: PRESET_WEIGHTS[value as keyof typeof PRESET_WEIGHTS],
          variant: 'preset'
        };
      }
    }
  }

  return null;
} 
import { ParsedStyle } from '../types';
import { parseArbitraryValue } from '../utils/converters';

const SIZE_CONSTRAINT_MAP = {
  'min-w': 'minWidth',
  'max-w': 'maxWidth',
  'min-h': 'minHeight',
  'max-h': 'maxHeight'
} as const;

const PRESET_VALUES = {
  '0': 0,
  'full': '100%',
  'none': Infinity
} as const;

export function parseSizeStyleValue(className: string): ParsedStyle | null {
  // Handle size constraints (min-w, max-w, min-h, max-h)
  for (const [prefix, property] of Object.entries(SIZE_CONSTRAINT_MAP)) {
    if (className.startsWith(`${prefix}-`)) {
      const value = className.slice(prefix.length + 1);

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
      if (value in PRESET_VALUES) {
        return {
          property,
          value: PRESET_VALUES[value as keyof typeof PRESET_VALUES],
          variant: 'preset'
        };
      }
    }
  }

  return null;
} 
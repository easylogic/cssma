import { ParsedStyle } from '../types';
import { parseArbitraryValue } from '../utils/converters';

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
  // Gap 처리
  if (className.startsWith('gap-')) {
    // 프리셋 값 처리 (먼저 체크)
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

    // 임의값 처리
    const arbitraryMatch = className.match(/^gap-(x|y)?-?\[(.*?)\]$/);
    if (arbitraryMatch) {
      const [, direction = '', valueWithUnit] = arbitraryMatch;
      const value = parseArbitraryValue(`[${valueWithUnit}]`, {
        allowNegative: true,
      });
      
      if (value !== null) {
        if (direction === 'x') {
          return {
            property: 'itemSpacing',
            value: value,
            variant: 'arbitrary'
          };
        } else if (direction === 'y') {
          return {
            property: 'counterAxisSpacing',
            value: value,
            variant: 'arbitrary'
          };
        } else {
          return {
            property: 'gap',
            value: value,
            variant: 'arbitrary'
          };
        }
      }
    }
  }

  // Padding 처리
  if (className.startsWith('p')) {
    // 프리셋 값 처리 (먼저 체크)
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

    // 임의값 처리
    const arbitraryMatch = className.match(/^p([trbl]|[xy])?-?\[(.*?)\]$/);
    if (arbitraryMatch) {
      const [, direction = '', valueWithUnit] = arbitraryMatch;
      const value = parseArbitraryValue(`[${valueWithUnit}]`, {
        allowNegative: true,
      });
      
      if (value !== null) {
        switch (direction) {
          case 't':
            return { property: 'paddingTop', value: value, variant: 'arbitrary' };
          case 'r':
            return { property: 'paddingRight', value: value, variant: 'arbitrary' };
          case 'b':
            return { property: 'paddingBottom', value: value, variant: 'arbitrary' };
          case 'l':
            return { property: 'paddingLeft', value: value, variant: 'arbitrary' };
          case 'x':
            return { property: 'paddingX', value: value, variant: 'arbitrary' };
          case 'y':
            return { property: 'paddingY', value: value, variant: 'arbitrary' };
          default:
            return { property: 'padding', value: value, variant: 'arbitrary' };
        }
      }
    }
  }

  return null;
} 
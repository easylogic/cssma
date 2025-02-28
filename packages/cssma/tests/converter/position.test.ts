import { describe, it, expect } from 'vitest';
import { convertPositionToFigma } from '../../src/converter/position';
import { ParsedStyle } from '../../src/types';

describe('Position Converter', () => {
  describe('Position Type', () => {
    it('should convert position type values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'position',
            value: 'ABSOLUTE',
            variant: 'preset'
          },
          expected: {
            position: 'ABSOLUTE'
          }
        },
        {
          input: {
            property: 'position',
            value: 'RELATIVE',
            variant: 'preset'
          },
          expected: {
            position: 'RELATIVE'
          }
        },
        {
          input: {
            property: 'position',
            value: 'FIXED',
            variant: 'preset'
          },
          expected: {
            position: 'FIXED'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Position Values', () => {
    it('should convert x and y position values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'x',
            value: 100,
            variant: 'arbitrary'
          },
          expected: {
            x: 100
          }
        },
        {
          input: {
            property: 'y',
            value: 200,
            variant: 'arbitrary'
          },
          expected: {
            y: 200
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Z-Index', () => {
    it('should convert z-index values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'zIndex',
            value: 1,
            variant: 'preset'
          },
          expected: {
            order: 1
          }
        },
        {
          input: {
            property: 'zIndex',
            value: 10,
            variant: 'arbitrary'
          },
          expected: {
            order: 10
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Constraints', () => {
    it('should handle position with constraints', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'x',
            value: 100,
            variant: 'arbitrary',
            constraints: { horizontal: 'MIN' }
          },
          expected: {
            x: 100,
            constraints: { horizontal: 'MIN' }
          }
        },
        {
          input: {
            property: 'y',
            value: 200,
            variant: 'arbitrary',
            constraints: { vertical: 'MAX' }
          },
          expected: {
            y: 200,
            constraints: { vertical: 'MAX' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'position',
            value: 'INVALID',
            variant: 'preset'
          },
          expected: {}
        },
        {
          input: {
            property: 'x',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
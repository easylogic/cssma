import { describe, it, expect } from 'vitest';
import { parsePositionStyleValue } from '../../src/parser/position';

describe('Position Style Parser', () => {
  describe('Position Type', () => {
    it('should parse position type values', () => {
      const testCases = [
        { input: 'absolute', expected: 'ABSOLUTE' },
        { input: 'relative', expected: 'RELATIVE' },
        { input: 'fixed', expected: 'FIXED' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parsePositionStyleValue(input)).toEqual({
          property: 'position',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Z-Index', () => {
    it('should parse preset z-index values', () => {
      const testCases = [
        { input: 'z-0', expected: 0 },
        { input: 'z-10', expected: 10 },
        { input: 'z-20', expected: 20 },
        { input: 'z-30', expected: 30 },
        { input: 'z-40', expected: 40 },
        { input: 'z-50', expected: 50 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parsePositionStyleValue(input)).toEqual({
          property: 'zIndex',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary z-index values', () => {
      expect(parsePositionStyleValue('z-[100]')).toEqual({
        property: 'zIndex',
        value: 100,
        variant: 'arbitrary'
      });
    });

    it('should handle invalid z-index values', () => {
      const invalidCases = [
        'z-',
        'z-[]',
        'z-[invalid]',
        'z-[-1]'  // 음수는 허용되지 않음
      ];

      invalidCases.forEach(input => {
        expect(parsePositionStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Position Values', () => {
    it('should parse zero position values', () => {
      const testCases = [
        { 
          input: 'top-0',
          expected: {
            property: 'top',
            value: 0,
            variant: 'preset',
            constraints: { vertical: 'MIN' }
          }
        },
        { 
          input: 'right-0',
          expected: {
            property: 'right',
            value: 0,
            variant: 'preset',
            constraints: { horizontal: 'MAX' }
          }
        },
        { 
          input: 'bottom-0',
          expected: {
            property: 'bottom',
            value: 0,
            variant: 'preset',
            constraints: { vertical: 'MAX' }
          }
        },
        { 
          input: 'left-0',
          expected: {
            property: 'left',
            value: 0,
            variant: 'preset',
            constraints: { horizontal: 'MIN' }
          }
        },
        { 
          input: 'inset-0',
          expected: {
            property: 'position',
            value: 0,
            variant: 'preset',
            constraints: { horizontal: 'SCALE', vertical: 'SCALE' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parsePositionStyleValue(input)).toEqual(expected);
      });
    });

    it('should parse arbitrary pixel values', () => {
      const testCases = [
        { 
          input: 'top-[20px]',
          expected: {
            property: 'top',
            value: 20,
            variant: 'arbitrary',
            constraints: { vertical: 'MIN' }
          }
        },
        { 
          input: 'right-[30px]',
          expected: {
            property: 'right',
            value: 30,
            variant: 'arbitrary',
            constraints: { horizontal: 'MAX' }
          }
        },
        { 
          input: 'bottom-[40px]',
          expected: {
            property: 'bottom',
            value: 40,
            variant: 'arbitrary',
            constraints: { vertical: 'MAX' }
          }
        },
        { 
          input: 'left-[50px]',
          expected: {
            property: 'left',
            value: 50,
            variant: 'arbitrary',
            constraints: { horizontal: 'MIN' }
          }
        },
        { 
          input: 'inset-[10px]',
          expected: {
            property: 'position',
            value: 10,
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE', vertical: 'SCALE' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parsePositionStyleValue(input)).toEqual(expected);
      });
    });

    it('should parse arbitrary percentage values', () => {
      const testCases = [
        { 
          input: 'top-[50%]',
          expected: {
            property: 'top',
            value: 0.5,
            variant: 'arbitrary',
            constraints: { vertical: 'SCALE' }
          }
        },
        { 
          input: 'right-[75%]',
          expected: {
            property: 'right',
            value: 0.75,
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE' }
          }
        },
        { 
          input: 'bottom-[25%]',
          expected: {
            property: 'bottom',
            value: 0.25,
            variant: 'arbitrary',
            constraints: { vertical: 'SCALE' }
          }
        },
        { 
          input: 'left-[25%]',
          expected: {
            property: 'left',
            value: 0.25,
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE' }
          }
        },
        { 
          input: 'inset-[10%]',
          expected: {
            property: 'position',
            value: 0.1,
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE', vertical: 'SCALE' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parsePositionStyleValue(input)).toEqual(expected);
      });
    });

    it('should parse decimal values', () => {
      const testCases = [
        { 
          input: 'top-[20.5px]',
          expected: {
            property: 'top',
            value: 20.5,
            variant: 'arbitrary',
            constraints: { vertical: 'MIN' }
          }
        },
        { 
          input: 'left-[33.3%]',
          expected: {
            property: 'left',
            value: 0.333,
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parsePositionStyleValue(input)).toEqual(expected);
      });
    });

    it('should parse negative values', () => {
      const testCases = [
        { 
          input: 'top-[-20px]',
          expected: {
            property: 'top',
            value: -20,
            variant: 'arbitrary',
            constraints: { vertical: 'MIN' }
          }
        },
        { 
          input: 'right-[-30%]',
          expected: {
            property: 'right',
            value: -0.3,
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE' }
          }
        },
        { 
          input: 'bottom-[-40px]',
          expected: {
            property: 'bottom',
            value: -40,
            variant: 'arbitrary',
            constraints: { vertical: 'MAX' }
          }
        },
        { 
          input: 'left-[-50%]',
          expected: {
            property: 'left',
            value: -0.5,
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parsePositionStyleValue(input)).toEqual(expected);
      });
    });

    it('should handle invalid position values', () => {
      const invalidCases = [
        'top-',
        'right-[]',
        'bottom-[invalid]',
        'left-[abc]',
        'inset-[%]',
        'top-[px]',
        'right-[%px]',
        'bottom-[px%]',
        'left-[.]',
        'inset-[.%]',
        'top-[.px]'
      ];

      invalidCases.forEach(input => {
        expect(parsePositionStyleValue(input)).toBeNull();
      });
    });

    it('should handle mixed position and unit types', () => {
      const testCases = [
        { 
          input: 'inset-[10px_20%_30px_40%]',
          expected: {
            property: 'position',
            value: [10, 0.2, 30, 0.4],
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE', vertical: 'SCALE' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parsePositionStyleValue(input)).toEqual(expected);
      });
    });
  });
}); 
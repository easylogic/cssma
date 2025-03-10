import { describe, it, expect } from 'vitest';
import { convertPositionToFigma } from '../../src/converter/position';
import { ParsedStyle } from '../../src/types';

describe('Position Converter', () => {
  describe('Position Type', () => {
    it('should convert layoutPositioning values', () => {
      const testCases: { input: ParsedStyle[]; expected: any }[] = [
        {
          input: [{
            property: 'layoutPositioning',
            value: 'ABSOLUTE',
            variant: 'preset'
          }],
          expected: {
            layoutPositioning: 'ABSOLUTE',
            constraints: {}
          }
        },
        {
          input: [{
            property: 'layoutPositioning',
            value: 'AUTO',
            variant: 'preset'
          }],
          expected: {
            layoutPositioning: 'AUTO',
            constraints: {}
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Position Values', () => {
    it('should convert basic position values', () => {
      const testCases: { input: ParsedStyle[]; expected: any }[] = [
        {
          input: [{
            property: 'position',
            direction: 'left',
            value: 100,
            unit: 'px',
            variant: 'arbitrary',
            constraints: { horizontal: 'MIN' }
          }],
          expected: {
            position: {
              direction: 'left',
              value: 100,
              unit: 'px'
            },
            constraints: { horizontal: 'MIN' }
          }
        },
        {
          input: [{
            property: 'position',
            direction: 'right',
            value: 200,
            unit: '%',
            variant: 'arbitrary',
            constraints: { horizontal: 'MAX' }
          }],
          expected: {
            position: {
              direction: 'right',
              value: 200,
              unit: '%'
            },
            constraints: { horizontal: 'MAX' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });

    it('should merge multiple position values', () => {
      const input: ParsedStyle[] = [
        {
          property: 'position',
          direction: 'left',
          value: 100,
          unit: 'px',
          variant: 'arbitrary',
          constraints: { horizontal: 'MIN' }
        },
        {
          property: 'position',
          direction: 'top',
          value: 200,
          unit: 'px',
          variant: 'arbitrary',
          constraints: { vertical: 'MIN' }
        }
      ];

      expect(convertPositionToFigma(input)).toEqual({
        position: {
          direction: 'top',
          value: 200,
          unit: 'px'
        },
        constraints: {
          horizontal: 'MIN',
          vertical: 'MIN'
        }
      });
    });

    it('should convert center position values', () => {
      const testCases: { input: ParsedStyle[]; expected: any }[] = [
        {
          input: [{
            property: 'position',
            direction: 'center-x',
            value: 10,
            unit: 'px',
            variant: 'arbitrary',
            constraints: { horizontal: 'CENTER' }
          }],
          expected: {
            position: {
              direction: 'center-x',
              value: 10,
              unit: 'px'
            },
            constraints: { horizontal: 'CENTER' }
          }
        },
        {
          input: [{
            property: 'position',
            direction: 'center-y',
            value: 20,
            unit: '%',
            variant: 'arbitrary',
            constraints: { vertical: 'CENTER' }
          }],
          expected: {
            position: {
              direction: 'center-y',
              value: 20,
              unit: '%'
            },
            constraints: { vertical: 'CENTER' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });

    it('should convert stretch position values', () => {
      const testCases: { input: ParsedStyle[]; expected: any }[] = [
        {
          input: [{
            property: 'position',
            direction: 'stretch-x',
            value: 10,
            unit: 'px',
            variant: 'arbitrary',
            constraints: { horizontal: 'STRETCH' }
          }],
          expected: {
            position: {
              direction: 'stretch-x',
              value: 10,
              unit: 'px'
            },
            constraints: { horizontal: 'STRETCH' }
          }
        },
        {
          input: [{
            property: 'position',
            direction: 'stretch-y',
            value: 20,
            unit: '%',
            variant: 'arbitrary',
            constraints: { vertical: 'STRETCH' }
          }],
          expected: {
            position: {
              direction: 'stretch-y',
              value: 20,
              unit: '%'
            },
            constraints: { vertical: 'STRETCH' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Constraints', () => {
    it('should convert explicit constraints', () => {
      const testCases: { input: ParsedStyle[]; expected: any }[] = [
        {
          input: [{
            property: 'constraints',
            value: { horizontal: 'MIN' },
            variant: 'preset'
          }],
          expected: {
            constraints: { horizontal: 'MIN' }
          }
        },
        {
          input: [{
            property: 'constraints',
            value: { vertical: 'MAX' },
            variant: 'preset'
          }],
          expected: {
            constraints: { vertical: 'MAX' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertPositionToFigma(input)).toEqual(expected);
      });
    });

    it('should merge multiple constraints', () => {
      const input: ParsedStyle[] = [
        {
          property: 'constraints',
          value: { horizontal: 'MIN' },
          variant: 'preset'
        },
        {
          property: 'constraints',
          value: { vertical: 'MAX' },
          variant: 'preset'
        }
      ];

      expect(convertPositionToFigma(input)).toEqual({
        constraints: {
          horizontal: 'MIN',
          vertical: 'MAX'
        }
      });
    });
  });

  describe('Z-Index', () => {
    it('should convert z-index to order', () => {
      const input: ParsedStyle[] = [
        {
          property: 'zIndex',
          value: 100,
          variant: 'arbitrary'
        }
      ];

      expect(convertPositionToFigma(input)).toEqual({
        order: 100,
        constraints: {}
      });
    });
  });

  describe('Figma Variables', () => {
    it('should convert Figma variable references', () => {
      const input: ParsedStyle[] = [
        {
          property: 'position',
          direction: 'left',
          value: 'spacing/position',
          variant: 'figma-variable',
          variableId: 'spacing/position',
          constraints: { horizontal: 'MIN' }
        }
      ];

      expect(convertPositionToFigma(input)).toEqual({
        position: {
          direction: 'left',
          value: 'spacing/position',
          variableId: 'spacing/position'
        },
        constraints: { horizontal: 'MIN' }
      });
    });
  });
}); 
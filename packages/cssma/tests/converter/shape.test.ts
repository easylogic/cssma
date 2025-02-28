import { describe, it, expect } from 'vitest';
import { convertShapeToFigma } from '../../src/converter/shape';
import { ParsedStyle } from '../../src/types';

describe('Shape Converter', () => {
  describe('Opacity', () => {
    it('should convert preset opacity values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'opacity',
            value: 0,
            variant: 'preset'
          },
          expected: {
            opacity: 0
          }
        },
        {
          input: {
            property: 'opacity',
            value: 0.5,
            variant: 'preset'
          },
          expected: {
            opacity: 0.5
          }
        },
        {
          input: {
            property: 'opacity',
            value: 1,
            variant: 'preset'
          },
          expected: {
            opacity: 1
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertShapeToFigma(input)).toEqual(expected);
      });
    });

    it('should convert arbitrary opacity values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'opacity',
            value: 0.33,
            variant: 'arbitrary'
          },
          expected: {
            opacity: 0.33
          }
        },
        {
          input: {
            property: 'opacity',
            value: 0.67,
            variant: 'arbitrary'
          },
          expected: {
            opacity: 0.67
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertShapeToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'opacity',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'opacity',
            value: -1,
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'opacity',
            value: 2,
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertShapeToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
import { describe, it, expect } from 'vitest';
import { convertAspectToFigma } from '../../src/converter/aspect';
import { ParsedStyle } from '../../src/types';

describe('Aspect Converter', () => {
  describe('Aspect Ratio', () => {
    it('should convert aspect ratio values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'aspectRatio',
            value: 1,
            variant: 'preset'
          },
          expected: {
            layoutSizingHorizontal: 'FIXED',
            layoutSizingVertical: 'FIXED',
            width: 100,
            height: 100
          }
        },
        {
          input: {
            property: 'aspectRatio',
            value: 16/9,
            variant: 'preset'
          },
          expected: {
            layoutSizingHorizontal: 'FIXED',
            layoutSizingVertical: 'FIXED',
            width: 100,
            height: 100 * 9/16
          }
        },
        {
          input: {
            property: 'aspectRatio',
            value: 4/3,
            variant: 'arbitrary'
          },
          expected: {
            layoutSizingHorizontal: 'FIXED',
            layoutSizingVertical: 'FIXED',
            width: 100,
            height: 100 * 3/4
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertAspectToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'aspectRatio',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'aspectRatio',
            value: -1,
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'aspectRatio',
            value: 0,
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertAspectToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
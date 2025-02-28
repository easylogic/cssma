import { describe, it, expect } from 'vitest';
import { convertSpacingToFigma } from '../../src/converter/spacing';
import { ParsedStyle } from '../../src/types';

describe('Spacing Converter', () => {
  describe('Gap', () => {
    it('should convert gap values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'gap',
            value: 16,
            variant: 'preset'
          },
          expected: {
            itemSpacing: 16,
            counterAxisSpacing: 16
          }
        },
        {
          input: {
            property: 'itemSpacing',
            value: 24,
            variant: 'arbitrary'
          },
          expected: {
            itemSpacing: 24
          }
        },
        {
          input: {
            property: 'counterAxisSpacing',
            value: 32,
            variant: 'arbitrary'
          },
          expected: {
            counterAxisSpacing: 32
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertSpacingToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Padding', () => {
    it('should convert padding values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'padding',
            value: 16,
            variant: 'preset'
          },
          expected: {
            paddingTop: 16,
            paddingRight: 16,
            paddingBottom: 16,
            paddingLeft: 16
          }
        },
        {
          input: {
            property: 'paddingX',
            value: 24,
            variant: 'arbitrary'
          },
          expected: {
            paddingLeft: 24,
            paddingRight: 24
          }
        },
        {
          input: {
            property: 'paddingY',
            value: 32,
            variant: 'arbitrary'
          },
          expected: {
            paddingTop: 32,
            paddingBottom: 32
          }
        },
        {
          input: {
            property: 'paddingTop',
            value: 8,
            variant: 'arbitrary'
          },
          expected: {
            paddingTop: 8
          }
        },
        {
          input: {
            property: 'paddingRight',
            value: 12,
            variant: 'arbitrary'
          },
          expected: {
            paddingRight: 12
          }
        },
        {
          input: {
            property: 'paddingBottom',
            value: 16,
            variant: 'arbitrary'
          },
          expected: {
            paddingBottom: 16
          }
        },
        {
          input: {
            property: 'paddingLeft',
            value: 20,
            variant: 'arbitrary'
          },
          expected: {
            paddingLeft: 20
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertSpacingToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'gap',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'padding',
            value: -1,
            variant: 'arbitrary'
          },
          expected: {
            paddingTop: -1,
            paddingRight: -1,
            paddingBottom: -1,
            paddingLeft: -1
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertSpacingToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
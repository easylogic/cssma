import { describe, it, expect } from 'vitest';
import { convertOverflowToFigma } from '../../src/converter/overflow';
import { ParsedStyle } from '../../src/types';

describe('Overflow Converter', () => {
  describe('Overflow', () => {
    it('should convert overflow values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'overflow',
            value: { clipsContent: true, scrollingEnabled: false },
            variant: 'preset'
          },
          expected: {
            clipsContent: true
          }
        },
        {
          input: {
            property: 'overflow',
            value: { clipsContent: false, scrollingEnabled: false },
            variant: 'preset'
          },
          expected: {
            clipsContent: false
          }
        },
        {
          input: {
            property: 'overflow',
            value: { clipsContent: true, scrollingEnabled: true },
            variant: 'preset'
          },
          expected: {
            clipsContent: true
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertOverflowToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'overflow',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'overflow',
            value: {},
            variant: 'preset'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertOverflowToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
import { describe, it, expect } from 'vitest';
import { convertFontToFigma } from '../../src/converter/font';
import { ParsedStyle } from '../../src/types';

describe('Font Converter', () => {
  describe('Font Name', () => {
    it('should convert font family and style', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'fontName',
            value: { family: 'Inter', style: 'Regular' },
            variant: 'preset'
          },
          expected: {
            fontName: { family: 'Inter', style: 'Regular' }
          }
        },
        {
          input: {
            property: 'fontName',
            value: { family: 'Inter', style: 'Bold' },
            variant: 'preset'
          },
          expected: {
            fontName: { family: 'Inter', style: 'Bold' }
          }
        },
        {
          input: {
            property: 'fontName',
            value: { family: 'Roboto', style: 'Medium' },
            variant: 'arbitrary'
          },
          expected: {
            fontName: { family: 'Roboto', style: 'Medium' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertFontToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Font Style', () => {
    it('should convert font style values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'fontStyle',
            value: 'NORMAL',
            variant: 'preset'
          },
          expected: {
            fontStyle: 'NORMAL'
          }
        },
        {
          input: {
            property: 'fontStyle',
            value: 'ITALIC',
            variant: 'preset'
          },
          expected: {
            fontStyle: 'ITALIC'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertFontToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Font Weight', () => {
    it('should convert font weight values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'fontWeight',
            value: 400,
            variant: 'preset'
          },
          expected: {
            fontWeight: 400
          }
        },
        {
          input: {
            property: 'fontWeight',
            value: 700,
            variant: 'preset'
          },
          expected: {
            fontWeight: 700
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertFontToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'fontName',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'fontStyle',
            value: 'INVALID',
            variant: 'preset'
          },
          expected: {}
        },
        {
          input: {
            property: 'fontWeight',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertFontToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
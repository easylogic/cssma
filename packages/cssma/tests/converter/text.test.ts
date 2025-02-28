import { describe, it, expect } from 'vitest';
import { convertTextToFigma } from '../../src/converter/text';
import { ParsedStyle } from '../../src/types';

describe('Text Converter', () => {
  describe('Font Size', () => {
    it('should convert font size values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'fontSize',
            value: 12,
            variant: 'preset'
          },
          expected: {
            fontSize: 12
          }
        },
        {
          input: {
            property: 'fontSize',
            value: 16,
            variant: 'preset'
          },
          expected: {
            fontSize: 16
          }
        },
        {
          input: {
            property: 'fontSize',
            value: 20,
            variant: 'arbitrary'
          },
          expected: {
            fontSize: 20
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTextToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Text Alignment', () => {
    it('should convert text alignment values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'textAlignHorizontal',
            value: 'LEFT',
            variant: 'preset'
          },
          expected: {
            textAlignHorizontal: 'LEFT'
          }
        },
        {
          input: {
            property: 'textAlignHorizontal',
            value: 'CENTER',
            variant: 'preset'
          },
          expected: {
            textAlignHorizontal: 'CENTER'
          }
        },
        {
          input: {
            property: 'textAlignHorizontal',
            value: 'RIGHT',
            variant: 'preset'
          },
          expected: {
            textAlignHorizontal: 'RIGHT'
          }
        },
        {
          input: {
            property: 'textAlignHorizontal',
            value: 'JUSTIFIED',
            variant: 'preset'
          },
          expected: {
            textAlignHorizontal: 'JUSTIFIED'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTextToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Line Height', () => {
    it('should convert line height values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'lineHeight',
            value: { value: 100, unit: 'PERCENT' },
            variant: 'preset'
          },
          expected: {
            lineHeight: { value: 100, unit: 'PERCENT' }
          }
        },
        {
          input: {
            property: 'lineHeight',
            value: { value: 150, unit: 'PERCENT' },
            variant: 'preset'
          },
          expected: {
            lineHeight: { value: 150, unit: 'PERCENT' }
          }
        },
        {
          input: {
            property: 'lineHeight',
            value: { value: 24, unit: 'PIXELS' },
            variant: 'arbitrary'
          },
          expected: {
            lineHeight: { value: 24, unit: 'PIXELS' }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTextToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Letter Spacing', () => {
    it('should convert letter spacing values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'letterSpacing',
            value: -0.8,
            variant: 'preset'
          },
          expected: {
            letterSpacing: -0.8
          }
        },
        {
          input: {
            property: 'letterSpacing',
            value: 0,
            variant: 'preset'
          },
          expected: {
            letterSpacing: 0
          }
        },
        {
          input: {
            property: 'letterSpacing',
            value: 0.4,
            variant: 'arbitrary'
          },
          expected: {
            letterSpacing: 0.4
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTextToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Text Decoration', () => {
    it('should convert text decoration values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'textDecoration',
            value: 'UNDERLINE',
            variant: 'preset'
          },
          expected: {
            textDecoration: 'UNDERLINE'
          }
        },
        {
          input: {
            property: 'textDecoration',
            value: 'STRIKETHROUGH',
            variant: 'preset'
          },
          expected: {
            textDecoration: 'STRIKETHROUGH'
          }
        },
        {
          input: {
            property: 'textDecoration',
            value: 'NONE',
            variant: 'preset'
          },
          expected: {
            textDecoration: 'NONE'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTextToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'fontSize',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'textAlignHorizontal',
            value: 'INVALID',
            variant: 'preset'
          },
          expected: {}
        },
        {
          input: {
            property: 'lineHeight',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTextToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
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
            value: 100,
            unit: 'PERCENT',
            variant: 'preset'
          },
          expected: {
            lineHeight: { value: 100, unit: 'PERCENT' }
          }
        },
        {
          input: {
            property: 'lineHeight',
            value: 150,
            unit: 'PERCENT',
            variant: 'preset'
          },
          expected: {
            lineHeight: { value: 150, unit: 'PERCENT' }
          }
        },
        {
          input: {
            property: 'lineHeight',
            value: 24,
            unit: 'PIXELS',
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

  describe('Figma Variables', () => {
    it('should convert text color variables', () => {
      const input: ParsedStyle = {
        property: 'color',
        value: 'typography/color/primary',
        variant: 'figma-variable',
        variableId: 'typography/color/primary'
      };

      expect(convertTextToFigma(input)).toEqual({
        fills: [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          boundVariables: {
            color: {
              type: 'VARIABLE_ALIAS',
              id: 'typography/color/primary'
            }
          }
        }]
      });
    });

    it('should convert font size variables', () => {
      const input: ParsedStyle = {
        property: 'fontSize',
        value: 'typography/size/body',
        variant: 'figma-variable',
        variableId: 'typography/size/body'
      };

      expect(convertTextToFigma(input)).toEqual({
        fontSize: 0,
        boundVariables: {
          fontSize: {
            type: 'VARIABLE_ALIAS',
            id: 'typography/size/body'
          }
        }
      });
    });

    it('should convert line height variables', () => {
      const input: ParsedStyle = {
        property: 'lineHeight',
        value: 'typography/lineHeight/body',
        variant: 'figma-variable',
        variableId: 'typography/lineHeight/body'
      };

      expect(convertTextToFigma(input)).toEqual({
        lineHeight: { value: 0, unit: 'PIXELS' },
        boundVariables: {
          lineHeight: {
            type: 'VARIABLE_ALIAS',
            id: 'typography/lineHeight/body'
          }
        }
      });
    });

    it('should convert letter spacing variables', () => {
      const input: ParsedStyle = {
        property: 'letterSpacing',
        value: 'typography/letterSpacing/tight',
        variant: 'figma-variable',
        variableId: 'typography/letterSpacing/tight'
      };

      expect(convertTextToFigma(input)).toEqual({
        letterSpacing: {
          value: 0,
          unit: 'PIXELS'
        },
        boundVariables: {
          letterSpacing: {
            type: 'VARIABLE_ALIAS',
            id: 'typography/letterSpacing/tight'
          }
        }
      });
    });

    it('should handle opacity with text color variables', () => {
      const input: ParsedStyle = {
        property: 'color',
        value: 'typography/color/primary',
        variant: 'figma-variable',
        variableId: 'typography/color/primary',
        opacity: 0.5
      };

      expect(convertTextToFigma(input)).toEqual({
        fills: [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          opacity: 0.5,
          boundVariables: {
            color: {
              type: 'VARIABLE_ALIAS',
              id: 'typography/color/primary'
            }
          }
        }]
      });
    });
  });

  describe('Text Vertical Alignment', () => {
    it('should convert vertical alignment values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'textAlignVertical',
            value: 'TOP',
            variant: 'preset'
          },
          expected: {
            textAlignVertical: 'TOP'
          }
        },
        {
          input: {
            property: 'textAlignVertical',
            value: 'CENTER',
            variant: 'preset'
          },
          expected: {
            textAlignVertical: 'CENTER'
          }
        },
        {
          input: {
            property: 'textAlignVertical',
            value: 'BOTTOM',
            variant: 'preset'
          },
          expected: {
            textAlignVertical: 'BOTTOM'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTextToFigma(input)).toEqual(expected);
      });
    });

    it('should convert vertical alignment with Figma variables', () => {
      const input: ParsedStyle = {
        property: 'textAlignVertical',
        value: 'typography/vertical/default',
        variant: 'figma-variable',
        variableId: 'typography/vertical/default'
      };

      expect(convertTextToFigma(input)).toEqual({
        textAlignVertical: 'TOP',
        boundVariables: {
          textAlignVertical: {
            type: 'VARIABLE_ALIAS',
            id: 'typography/vertical/default'
          }
        }
      });
    });
  });
}); 
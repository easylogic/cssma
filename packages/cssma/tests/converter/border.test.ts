import { describe, it, expect } from 'vitest';
import { convertBorderToFigma } from '../../src/converter/border';
import { ParsedStyle } from '../../src/types';

describe('Border Converter', () => {
  describe('Border Width', () => {
    it('should convert border width values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'borderWidth',
            value: 1,
            variant: 'preset'
          },
          expected: {
            strokeWeight: 1
          }
        },
        {
          input: {
            property: 'borderWidth',
            value: 2,
            variant: 'arbitrary'
          },
          expected: {
            strokeWeight: 2
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBorderToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Border Color', () => {
    it('should convert border color values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'borderColor',
            value: '#FF0000',
            variant: 'arbitrary'
          },
          expected: {
            strokes: [{
              type: 'SOLID',
              color: { r: 1, g: 0, b: 0 }
            }]
          }
        },
        {
          input: {
            property: 'borderColor',
            value: '#00FF00',
            variant: 'arbitrary'
          },
          expected: {
            strokes: [{
              type: 'SOLID',
              color: { r: 0, g: 1, b: 0 },
            }]
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBorderToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Border Radius', () => {
    it('should convert border radius values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'borderRadius',
            value: 4,
            variant: 'preset'
          },
          expected: {
            cornerRadius: 4
          }
        },
        {
          input: {
            property: 'borderRadiusTopLeft',
            value: 8,
            variant: 'arbitrary'
          },
          expected: {
            topLeftRadius: 8
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBorderToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'borderWidth',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'borderColor',
            value: '#GGGGGG',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'borderRadius',
            value: -1,
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBorderToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Figma Variables', () => {
    it('should convert border width variables', () => {
      const input: ParsedStyle = {
        property: 'borderWidth',
        value: 'borders/width/medium',
        variant: 'figma-variable',
        variableId: 'borders/width/medium'
      };
      
      expect(convertBorderToFigma(input)).toEqual({
        strokeWeight: undefined,
        boundVariables: {
          strokeWeight: {
            type: 'VARIABLE_ALIAS',
            id: 'borders/width/medium'
          }
        }
      });
    });

    it('should convert border color variables', () => {
      const input: ParsedStyle = {
        property: 'borderColor',
        value: 'borders/color/primary',
        variant: 'figma-variable',
        variableId: 'borders/color/primary'
      };
      
      expect(convertBorderToFigma(input)).toEqual({
        strokes: [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          boundVariables: {
            color: {
              type: 'VARIABLE_ALIAS',
              id: 'borders/color/primary'
            }
          }
        }]
      });
    });

    it('should convert border radius variables', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'borderRadius',
            value: 'borders/radius/medium',
            variant: 'figma-variable',
            variableId: 'borders/radius/medium'
          },
          expected: {
            cornerRadius: undefined,
            boundVariables: {
              cornerRadius: {
                type: 'VARIABLE_ALIAS',
                id: 'borders/radius/medium'
              }
            }
          }
        },
        {
          input: {
            property: 'borderRadiusTopLeft',
            value: 'borders/radius/large',
            variant: 'figma-variable',
            variableId: 'borders/radius/large'
          },
          expected: {
            topLeftRadius: undefined,
            boundVariables: {
              topLeftRadius: {
                type: 'VARIABLE_ALIAS',
                id: 'borders/radius/large'
              }
            }
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBorderToFigma(input)).toEqual(expected);
      });
    });

    it('should handle invalid variable cases', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          // Missing variableId
          input: {
            property: 'borderWidth',
            value: 'borders/width/medium',
            variant: 'figma-variable'
          },
          expected: {}
        },
        {
          // Empty variableId
          input: {
            property: 'borderWidth',
            value: '',
            variant: 'figma-variable',
            variableId: ''
          },
          expected: {}
        },
        {
          // Invalid property for variables
          input: {
            property: 'borderStyle',
            value: 'borders/style/solid',
            variant: 'figma-variable',
            variableId: 'borders/style/solid'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBorderToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
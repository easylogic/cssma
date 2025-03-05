import { describe, it, expect } from 'vitest';
import { convertBackgroundToFigma, convertGradientToFigma } from '../../src/converter/background';
import { ParsedStyle } from '../../src/types';

describe('Background Converter', () => {
  describe('Solid Colors', () => {
    it('should convert solid background colors', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'backgroundColor',
            value: '#FF0000',
            variant: 'arbitrary'
          },
          expected: [{
            type: 'SOLID',
            color: { r: 1, g: 0, b: 0 }
          }]
        },
        {
          input: {
            property: 'backgroundColor',
            value: '#00FF00',
            variant: 'arbitrary'
          },
          expected: [{
            type: 'SOLID',
            color: { r: 0, g: 1, b: 0 },
          }]
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBackgroundToFigma(input)).toEqual(expected);
      });
    });

    it('should handle opacity in solid colors', () => {
      const input: ParsedStyle = {
        property: 'backgroundColor',
        value: '#FF0000',
        variant: 'arbitrary',
        opacity: 0.5
      };

      expect(convertBackgroundToFigma(input)).toEqual([{
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 },
        opacity: 0.5
      }]);
    });
  });

  describe('Figma Variables', () => {
    it('should convert background color variables', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'backgroundColor',
            value: 'colors/primary',
            variant: 'figma-variable',
            variableId: 'colors/primary'
          },
          expected: [{
            type: 'SOLID',
            color: { r: 0, g: 0, b: 0 },
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'colors/primary'
              }
            }
          }]
        },
        {
          input: {
            property: 'backgroundColor',
            value: 'colors/background',
            variant: 'figma-variable',
            variableId: 'colors/background',
            opacity: 0.5
          },
          expected: [{
            type: 'SOLID',
            color: { r: 0, g: 0, b: 0 },
            opacity: 0.5,
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'colors/background'
              }
            }
          }]
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBackgroundToFigma(input)).toEqual(expected);
      });
    });

    it('should convert gradient color variables', () => {
      const input: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'linear',
          direction: 'r',
          variant: 'preset'
        },
        {
          property: 'gradientFrom',
          value: 'colors/gradientStart',
          variant: 'figma-variable',
          variableId: 'colors/gradientStart'
        },
        {
          property: 'gradientTo',
          value: 'colors/gradientEnd',
          variant: 'figma-variable',
          variableId: 'colors/gradientEnd'
        }
      ];

      expect(convertGradientToFigma(input)).toEqual([{
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0, g: 0, b: 0 },
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'colors/gradientStart'
              }
            }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 0 },
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'colors/gradientEnd'
              }
            }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      }]);
    });

    it('should handle opacity in gradient color variables', () => {
      const input: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'linear',
          direction: 'r',
          variant: 'preset'
        },
        {
          property: 'gradientFrom',
          value: 'colors/gradientStart',
          variant: 'figma-variable',
          variableId: 'colors/gradientStart',
          opacity: 0.5
        },
        {
          property: 'gradientTo',
          value: 'colors/gradientEnd',
          variant: 'figma-variable',
          variableId: 'colors/gradientEnd',
          opacity: 0.75
        }
      ];

      expect(convertGradientToFigma(input)).toEqual([{
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0, g: 0, b: 0, a: 0.5 },
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'colors/gradientStart'
              }
            }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 0, a: 0.75 },
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'colors/gradientEnd'
              }
            }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      }]);
    });
  });

  describe('Gradients', () => {
    it('should convert linear gradients', () => {
      const input: ParsedStyle = {
        property: 'backgroundColor',
        value: 'linear',
        direction: 'r',
        variant: 'preset'
      };

      const fromGradient = {
        property: 'gradientFrom',
        value: '#FFFFFF',
        variant: 'arbitrary'
      };

      const toGradient = {
        property: 'gradientTo',
        value: '#000000',
        variant: 'arbitrary'
      };

      expect(convertGradientToFigma([input, fromGradient, toGradient])).toEqual(
        [{
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            { position: 0, color: { r: 1, g: 1, b: 1 } },
            { position: 1, color: { r: 0, g: 0, b: 0 } }
          ],
          gradientTransform: [[1, 0, 0], [0, 1, 0]]
        }]
      );
    });

    it('should handle mixed variable and solid color gradients', () => {
      const input: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'linear',
          direction: 'r',
          variant: 'preset'
        },
        {
          property: 'gradientFrom',
          value: 'colors/gradientStart',
          variant: 'figma-variable',
          variableId: 'colors/gradientStart'
        },
        {
          property: 'gradientTo',
          value: '#000000',
          variant: 'arbitrary'
        }
      ];

      expect(convertGradientToFigma(input)).toEqual([{
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0, g: 0, b: 0 },
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'colors/gradientStart'
              }
            }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 0 }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      }]);
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'backgroundColor',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: []
        },
        {
          input: {
            property: 'backgroundColor',
            value: '#GGGGGG',
            variant: 'arbitrary'
          },
          expected: []
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBackgroundToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
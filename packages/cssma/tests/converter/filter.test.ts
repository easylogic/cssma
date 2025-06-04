import { describe, it, expect } from 'vitest';
import { convertFilterToFigma } from '../../src/converter/filter';
import { ParsedStyle } from '../../src/types';

describe('Filter Converter', () => {
  describe('Layer Blur', () => {
    it('should convert blur values to LAYER_BLUR effects', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'blur',
            value: 0,
            variant: 'preset'
          },
          expected: {
            effects: [{
              type: 'LAYER_BLUR',
              radius: 0,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        },
        {
          input: {
            property: 'blur',
            value: 8,
            variant: 'preset'
          },
          expected: {
            effects: [{
              type: 'LAYER_BLUR',
              radius: 8,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        },
        {
          input: {
            property: 'blur',
            value: 20,
            variant: 'arbitrary'
          },
          expected: {
            effects: [{
              type: 'LAYER_BLUR',
              radius: 20,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertFilterToFigma(input)).toEqual(expected);
      });
    });

    it('should handle invalid blur values', () => {
      const invalidCases: ParsedStyle[] = [
        {
          property: 'blur',
          value: -5,
          variant: 'arbitrary'
        },
        {
          property: 'blur',
          value: 'invalid',
          variant: 'arbitrary'
        },
        {
          property: 'blur',
          value: NaN,
          variant: 'arbitrary'
        }
      ];

      invalidCases.forEach(input => {
        expect(convertFilterToFigma(input)).toEqual({});
      });
    });
  });

  describe('Backdrop Blur', () => {
    it('should convert backdrop-blur values to BACKGROUND_BLUR effects', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'backdropBlur',
            value: 0,
            variant: 'preset'
          },
          expected: {
            effects: [{
              type: 'BACKGROUND_BLUR',
              radius: 0,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        },
        {
          input: {
            property: 'backdropBlur',
            value: 12,
            variant: 'preset'
          },
          expected: {
            effects: [{
              type: 'BACKGROUND_BLUR',
              radius: 12,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        },
        {
          input: {
            property: 'backdropBlur',
            value: 30,
            variant: 'arbitrary'
          },
          expected: {
            effects: [{
              type: 'BACKGROUND_BLUR',
              radius: 30,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertFilterToFigma(input)).toEqual(expected);
      });
    });

    it('should handle invalid backdrop-blur values', () => {
      const invalidCases: ParsedStyle[] = [
        {
          property: 'backdropBlur',
          value: -10,
          variant: 'arbitrary'
        },
        {
          property: 'backdropBlur',
          value: 'invalid',
          variant: 'arbitrary'
        }
      ];

      invalidCases.forEach(input => {
        expect(convertFilterToFigma(input)).toEqual({});
      });
    });
  });

  describe('Drop Shadow', () => {
    it('should convert drop-shadow values to DROP_SHADOW effects', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'dropShadow',
            value: { offsetX: 0, offsetY: 1, blur: 2, color: 'rgba(0,0,0,0.1)' },
            variant: 'preset'
          },
          expected: {
            effects: [{
              type: 'DROP_SHADOW',
              offset: { x: 0, y: 1 },
              radius: 2,
              color: { r: 0, g: 0, b: 0, a: 0.1 },
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        },
        {
          input: {
            property: 'dropShadow',
            value: { offsetX: 2, offsetY: 4, blur: 8, color: 'rgba(255,0,0,0.2)' },
            variant: 'arbitrary'
          },
          expected: {
            effects: [{
              type: 'DROP_SHADOW',
              offset: { x: 2, y: 4 },
              radius: 8,
              color: { r: 1, g: 0, b: 0, a: 0.2 },
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        },
        {
          input: {
            property: 'dropShadow',
            value: { offsetX: -2, offsetY: -3, blur: 6, color: '#000000' },
            variant: 'arbitrary'
          },
          expected: {
            effects: [{
              type: 'DROP_SHADOW',
              offset: { x: -2, y: -3 },
              radius: 6,
              color: { r: 0, g: 0, b: 0 },
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertFilterToFigma(input)).toEqual(expected);
      });
    });

    it('should handle drop-shadow with transparent color', () => {
      const input: ParsedStyle = {
        property: 'dropShadow',
        value: { offsetX: 0, offsetY: 0, blur: 0, color: 'transparent' },
        variant: 'preset'
      };

      const expected = {
        effects: [{
          type: 'DROP_SHADOW',
          offset: { x: 0, y: 0 },
          radius: 0,
          color: { r: 0, g: 0, b: 0, a: 0 },
          visible: true,
          blendMode: 'NORMAL'
        }]
      };

      expect(convertFilterToFigma(input)).toEqual(expected);
    });

    it('should handle invalid drop-shadow values', () => {
      const invalidCases: ParsedStyle[] = [
        {
          property: 'dropShadow',
          value: 'invalid',
          variant: 'arbitrary'
        },
        {
          property: 'dropShadow',
          value: null,
          variant: 'arbitrary'
        },
        {
          property: 'dropShadow',
          value: { offsetX: 'invalid', offsetY: 1, blur: 2, color: 'red' },
          variant: 'arbitrary'
        },
        {
          property: 'dropShadow',
          value: { offsetX: 0, offsetY: 1, blur: -5, color: 'red' },
          variant: 'arbitrary'
        }
      ];

      invalidCases.forEach(input => {
        expect(convertFilterToFigma(input)).toEqual({});
      });
    });

    it('should use fallback color for invalid color values', () => {
      const input: ParsedStyle = {
        property: 'dropShadow',
        value: { offsetX: 0, offsetY: 1, blur: 2, color: 'invalid-color' },
        variant: 'arbitrary'
      };

      const result = convertFilterToFigma(input);
      
      expect(result.effects).toHaveLength(1);
      expect(result.effects![0]).toMatchObject({
        type: 'DROP_SHADOW',
        offset: { x: 0, y: 1 },
        radius: 2,
        color: { r: 0, g: 0, b: 0, a: 0.1 }, // fallback color
        visible: true,
        blendMode: 'NORMAL'
      });
    });
  });

  describe('Unknown Properties', () => {
    it('should handle unknown filter properties', () => {
      const unknownProperty: ParsedStyle = {
        property: 'unknownFilter',
        value: 10,
        variant: 'arbitrary'
      };

      expect(convertFilterToFigma(unknownProperty)).toEqual({});
    });
  });
}); 
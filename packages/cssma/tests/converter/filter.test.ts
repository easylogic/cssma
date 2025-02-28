import { describe, it, expect } from 'vitest';
import { convertFilterToFigma } from '../../src/converter/filter';
import { ParsedStyle } from '../../src/types';

describe('Filter Converter', () => {
  describe('Blur', () => {
    it('should convert blur values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'blur',
            value: 4,
            variant: 'preset'
          },
          expected: {
            effects: [{
              type: 'LAYER_BLUR',
              radius: 4,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        },
        {
          input: {
            property: 'blur',
            value: 8,
            variant: 'arbitrary'
          },
          expected: {
            effects: [{
              type: 'LAYER_BLUR',
              radius: 8,
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

    it('should convert backdrop blur values', () => {
      const input: ParsedStyle = {
        property: 'backdropBlur',
        value: 4,
        variant: 'preset'
      };

      expect(convertFilterToFigma(input)).toEqual({
        effects: [{
          type: 'BACKGROUND_BLUR',
          radius: 4,
          visible: true,
          blendMode: 'NORMAL'
        }]
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'blur',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'blur',
            value: -1,
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertFilterToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
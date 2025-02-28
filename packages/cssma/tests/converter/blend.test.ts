import { describe, it, expect } from 'vitest';
import { convertBlendToFigma } from '../../src/converter/blend';
import { ParsedStyle } from '../../src/types';

describe('Blend Mode Converter', () => {
  describe('Mix Blend Mode', () => {
    it('should convert mix-blend-mode values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'blendMode',
            value: 'normal',
            variant: 'preset'
          },
          expected: {
            blendMode: 'NORMAL'
          }
        },
        {
          input: {
            property: 'blendMode',
            value: 'multiply',
            variant: 'preset'
          },
          expected: {
            blendMode: 'MULTIPLY'
          }
        },
        {
          input: {
            property: 'blendMode',
            value: 'screen',
            variant: 'preset'
          },
          expected: {
            blendMode: 'SCREEN'
          }
        },
        {
          input: {
            property: 'blendMode',
            value: 'overlay',
            variant: 'preset'
          },
          expected: {
            blendMode: 'OVERLAY'
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBlendToFigma(input)).toEqual(expected);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid blend mode values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'mixBlendMode',
            value: 'invalid-mode',
            variant: 'preset'
          },
          expected: {}
        },
        {
          input: {
            property: 'mixBlendMode',
            value: '',
            variant: 'preset'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertBlendToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
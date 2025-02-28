import { describe, it, expect } from 'vitest';
import { convertTransformToFigma } from '../../src/converter/transform';
import { ParsedStyle } from '../../src/types';
import { round } from '../../src/utils/math';

describe('Transform Converter', () => {
  describe('Rotation', () => {
    it('should convert rotation values to radians', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'rotation',
            value: 90,
            variant: 'preset'
          },
          expected: {
            rotation: round(Math.PI / 2) // 90도는 π/2 라디안
          }
        },
        {
          input: {
            property: 'rotation',
            value: 180,
            variant: 'preset'
          },
          expected: {
            rotation: round(Math.PI) // 180도는 π 라디안
          }
        },
        {
          input: {
            property: 'rotation',
            value: 45,
            variant: 'arbitrary'
          },
          expected: {
            rotation: round(Math.PI / 4) // 45도는 π/4 라디안
          }
        },
        {
          input: {
            property: 'rotation',
            value: -90,
            variant: 'preset'
          },
          expected: {
            rotation: round(-Math.PI / 2) // -90도는 -π/2 라디안
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTransformToFigma(input)).toEqual(expected);
      });
    });

    it('should handle decimal degree values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'rotation',
            value: 22.5,
            variant: 'arbitrary'
          },
          expected: {
            rotation: Math.PI / 8 // 22.5도는 π/8 라디안
          }
        },
        {
          input: {
            property: 'rotation',
            value: -45.5,
            variant: 'arbitrary'
          },
          expected: {
            rotation: -Math.PI * 0.25277777777778 // -45.5도를 라디안으로 변환
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = convertTransformToFigma(input);
        expect(result.rotation).toBeCloseTo(expected.rotation);
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'rotation',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'rotation',
            value: NaN,
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'rotation',
            value: Infinity,
            variant: 'arbitrary'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertTransformToFigma(input)).toEqual(expected);
      });
    });
  });
}); 
import { parseColor } from 'src/utils/colors';
import { describe, it, expect } from 'vitest';
import { parseShadowStyleValue } from '../../src/parser/shadow';

describe('Shadow Style Parser', () => {
  describe('Preset Shadows', () => {
    it('should parse basic shadow values', () => {
      const testCases = [
        {
          input: 'shadow-sm',
          expected: {
            type: 'outer',
            color: "rgba(0,0,0,0.05)",
            x: 0,
            y: 1,
            blur: 2,
            spread: 0,
          }
        },
        {
          input: 'shadow',
          expected: {
            type: 'outer',
            color: "rgba(0,0,0,0.1)",
            x: 0,
            y: 2,
            blur: 4,
            spread: -1,
          }
        },
        {
          input: 'shadow-md',
          expected: {
            type: 'outer',
            color: "rgba(0,0,0,0.1)",
            x: 0,
            y: 4,
            blur: 6,
            spread: -2,
          }
        },
        {
          input: 'shadow-lg',
          expected: {
            type: 'outer',
            color: "rgba(0,0,0,0.1)",
            x: 0,
            y: 8,
            blur: 10,
            spread: -3,
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseShadowStyleValue(input)).toEqual({
          property: 'boxShadow',
          value: [expected],
          variant: 'preset'
        });
      });
    });

    it('should parse inner shadow', () => {
      expect(parseShadowStyleValue('shadow-inner')).toEqual({
        property: 'boxShadow',
        value: [{
          type: 'inner',
          color: "rgba(0,0,0,0.06)",
          x: 0,
          y: 2,
          blur: 4,
          spread: 0,
        }],
        variant: 'preset'
      });
    });

    it('should handle shadow-none', () => {
      expect(parseShadowStyleValue('shadow-none')).toBeNull();
    });
  });

  describe('Colored Shadows', () => {
    it('should parse colored shadows with opacity', () => {
      expect(parseShadowStyleValue('shadow-blue-500/50')).toEqual({
        property: 'boxShadow',
        value: [{
          type: 'outer',
          color: { r: 0.23, g: 0.51, b: 0.96, a: 0.5 },
          x: 0,
          y: 2,
          blur: 4,
          spread: -1,
        }],
        variant: 'preset'
      });
    });

    it('should handle different opacity values', () => {
      const testCases = [
        { input: 'shadow-blue-500/0', expected: 0 },
        { input: 'shadow-blue-500/25', expected: 0.25 },
        { input: 'shadow-blue-500/75', expected: 0.75 },
        { input: 'shadow-blue-500/100', expected: 1 }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parseShadowStyleValue(input);
        expect(result?.value[0].color).toHaveProperty('a', expected);
      });
    });
  });

  describe('Arbitrary Values', () => {
    it('should parse arbitrary shadow values', () => {
      expect(parseShadowStyleValue('shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]')).toEqual({
        property: 'boxShadow',
        value: [{
          type: 'outer',
          color: parseColor("rgba(0,0,0,0.1)"),
          x: 0,
          y: 4,
          blur: 6,
          spread: -1,
        }],
        variant: 'arbitrary'
      });
    });

    it('should parse arbitrary shadow with hex color', () => {
      expect(parseShadowStyleValue('shadow-[0_2px_4px_0_#00000020]')).toEqual({
        property: 'boxShadow',
        value: [{
          type: 'outer',
          color: parseColor("#00000020"),
          x: 0,
          y: 2,
          blur: 4,
          spread: 0,
        }],
        variant: 'arbitrary'
      });
    });

    it('should handle decimal values', () => {
      expect(parseShadowStyleValue('shadow-[0.5_2.5px_4.5px_-0.5_rgba(0,0,0,0.1)]')).toEqual({
        property: 'boxShadow',
        value: [{
          type: 'outer',
          color: parseColor("rgba(0,0,0,0.1)"),
          x: 0.5,
          y: 2.5,
          blur: 4.5,
          spread: -0.5,
        }],
        variant: 'arbitrary'
      });
    });

    it('should handle negative values', () => {
      expect(parseShadowStyleValue('shadow-[-2_-4px_6px_-1_rgba(0,0,0,0.1)]')).toEqual({
        property: 'boxShadow',
        value: [{
          type: 'outer',
          color: parseColor("rgba(0,0,0,0.1)"),
          x: -2,
          y: -4,
          blur: 6,
          spread: -1,
        }],
        variant: 'arbitrary'
      });
    });

    it('should handle different hex color formats', () => {
      const testCases = [
        { input: 'shadow-[0_0_0_0_#fff]', color: '#fff' },
        { input: 'shadow-[0_0_0_0_#ffff]', color: '#ffff' },
        { input: 'shadow-[0_0_0_0_#ffffff]', color: '#ffffff' },
        { input: 'shadow-[0_0_0_0_#ffffff80]', color: '#ffffff80' }
      ];

      testCases.forEach(({ input, color }) => {
        const result = parseShadowStyleValue(input);
        expect(result?.value[0].color).toEqual(parseColor(color));
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid values', () => {
      const invalidCases = [
        'shadow-invalid',
        'shadow-[invalid]',
        'shadow-[0_invalid_6px_-1px_rgba(0,0,0,0.1)]',
        'shadow-[0_0_0_0_invalid-color]',
        'shadow-[0_0_0]', // 파라미터 부족
        'shadow-[]', // 빈 값
        'shadow-[0_0_0_0_#gggggg]', // 잘못된 hex 색상
        'shadow-[0_0_0_0_rgb(256,0,0)]' // 잘못된 RGB 값
      ];

      invalidCases.forEach(input => {
        expect(parseShadowStyleValue(input)).toBeNull();
      });
    });
  });
}); 
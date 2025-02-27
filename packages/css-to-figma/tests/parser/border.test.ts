import { describe, it, expect } from 'vitest';
import { parseBorderStyleValue } from '../../src/parser/border';
import { round } from '../../src/config/tokens';

describe('Border Style Parser', () => {
  describe('Border Width', () => {
    it('should parse preset border widths', () => {
      const testCases = [
        { input: 'border-0', expected: 0 },
        { input: 'border', expected: 1 },
        { input: 'border-2', expected: 2 },
        { input: 'border-4', expected: 4 },
        { input: 'border-8', expected: 8 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseBorderStyleValue(input)).toEqual({
          property: 'borderWidth',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary border widths', () => {
      expect(parseBorderStyleValue('border-[3]')).toEqual({
        property: 'borderWidth',
        value: 3,
        variant: 'arbitrary'
      });

      expect(parseBorderStyleValue('border-[0.5]')).toEqual({
        property: 'borderWidth',
        value: 0.5,
        variant: 'arbitrary'
      });
    });
  });

  describe('Border Color', () => {
    it('should parse preset border colors', () => {
      const testCases = [
        { input: 'border-white', expected: { r: 1, g: 1, b: 1 } },
        { input: 'border-black', expected: { r: 0, g: 0, b: 0 } },
        { input: 'border-gray-100', expected: { r: round(243/255), g: round(244/255), b: round(246/255) } },
        { input: 'border-blue-500', expected: { r: round(59/255), g: round(130/255), b: round(246/255) } },
        { input: 'border-red-600', expected: { r: round(220/255), g: round(38/255), b: round(38/255) } }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseBorderStyleValue(input)).toEqual({
          property: 'borderColor',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary border colors', () => {
      expect(parseBorderStyleValue('border-[#FF0000]')).toEqual({
        property: 'borderColor',
        value: '#FF0000',
        variant: 'arbitrary'
      });

      expect(parseBorderStyleValue('border-[rgb(255,0,0)]')).toEqual({
        property: 'borderColor',
        value: 'rgb(255,0,0)',
        variant: 'arbitrary'
      });
    });
  });

  describe('Border Style', () => {
    it('should parse border styles', () => {
      const testCases = [
        { input: 'border-solid', expected: 'SOLID' },
        { input: 'border-dashed', expected: 'DASHED' },
        { input: 'border-dotted', expected: 'DOTTED' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseBorderStyleValue(input)).toEqual({
          property: 'borderStyle',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Border Radius', () => {
    it('should parse preset border radius', () => {
      const testCases = [
        { input: 'rounded-none', expected: 0 },
        { input: 'rounded-sm', expected: 2 },
        { input: 'rounded', expected: 4 },
        { input: 'rounded-md', expected: 6 },
        { input: 'rounded-lg', expected: 8 },
        { input: 'rounded-xl', expected: 12 },
        { input: 'rounded-2xl', expected: 16 },
        { input: 'rounded-3xl', expected: 24 },
        { input: 'rounded-full', expected: 9999 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseBorderStyleValue(input)).toEqual({
          property: 'borderRadius',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary border radius', () => {
      expect(parseBorderStyleValue('rounded-[8]')).toEqual({
        property: 'borderRadius',
        value: 8,
        variant: 'arbitrary'
      });
    });

    it('should parse individual corner radius', () => {
      const testCases = [
        { input: 'rounded-t-lg', property: 'borderRadiusTop', value: 8 },
        { input: 'rounded-r-lg', property: 'borderRadiusRight', value: 8 },
        { input: 'rounded-b-lg', property: 'borderRadiusBottom', value: 8 },
        { input: 'rounded-l-lg', property: 'borderRadiusLeft', value: 8 },
        { input: 'rounded-tl-lg', property: 'borderRadiusTopLeft', value: 8 },
        { input: 'rounded-tr-lg', property: 'borderRadiusTopRight', value: 8 },
        { input: 'rounded-br-lg', property: 'borderRadiusBottomRight', value: 8 },
        { input: 'rounded-bl-lg', property: 'borderRadiusBottomLeft', value: 8 }
      ];

      testCases.forEach(({ input, property, value }) => {
        expect(parseBorderStyleValue(input)).toEqual({
          property,
          value,
          variant: 'preset'
        });
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid values', () => {
      expect(parseBorderStyleValue('border-invalid')).toBeNull();
      expect(parseBorderStyleValue('border-[invalid]')).toBeNull();
      expect(parseBorderStyleValue('border-[#GGGGGG]')).toBeNull();
      expect(parseBorderStyleValue('border-[rgb(256,0,0)]')).toBeNull();
      expect(parseBorderStyleValue('rounded-[invalid]')).toBeNull();
    });
  });

  describe('Complex Cases', () => {
    it('should handle negative border radius', () => {
      expect(parseBorderStyleValue('rounded-[-8]')).toEqual({
        property: 'borderRadius',
        value: -8,
        variant: 'arbitrary'
      });
    });

    it('should handle decimal border widths', () => {
      expect(parseBorderStyleValue('border-[0.5]')).toEqual({
        property: 'borderWidth',
        value: 0.5,
        variant: 'arbitrary'
      });
    });
  });
}); 
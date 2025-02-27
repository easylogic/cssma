import { describe, it, expect } from 'vitest';
import { parseTextStyleValue } from '../../src/parser/text';

describe('Text Style Parser', () => {
  describe('Text Color', () => {
    it('should parse preset colors', () => {
      const testCases = [
        { input: 'text-white', expected: { r: 1, g: 1, b: 1 } },
        { input: 'text-black', expected: { r: 0, g: 0, b: 0 } },
        { input: 'text-gray-100', expected: { r: 0.95, g: 0.96, b: 0.96 } },
        { input: 'text-blue-500', expected: { r: 0.23, g: 0.51, b: 0.96 } },
        { input: 'text-red-600', expected: { r: 0.86, g: 0.15, b: 0.15 } }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'color',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary hex colors', () => {
      expect(parseTextStyleValue('text-[#FF0000]')).toEqual({
        property: 'color',
        value: '#FF0000',
        variant: 'arbitrary'
      });

      expect(parseTextStyleValue('text-[#00FF00]')).toEqual({
        property: 'color',
        value: '#00FF00',
        variant: 'arbitrary'
      });
    });

    it('should parse arbitrary rgb/rgba colors', () => {
      expect(parseTextStyleValue('text-[rgb(255,0,0)]')).toEqual({
        property: 'color',
        value: 'rgb(255,0,0)',
        variant: 'arbitrary'
      });

      expect(parseTextStyleValue('text-[rgba(255,0,0,0.5)]')).toEqual({
        property: 'color',
        value: 'rgba(255,0,0,0.5)',
        variant: 'arbitrary'
      });
    });
  });

  describe('Font Size', () => {
    it('should parse preset font sizes', () => {
      const testCases = [
        { input: 'text-xs', expected: 12 },
        { input: 'text-sm', expected: 14 },
        { input: 'text-base', expected: 16 },
        { input: 'text-lg', expected: 18 },
        { input: 'text-xl', expected: 20 },
        { input: 'text-2xl', expected: 24 },
        { input: 'text-3xl', expected: 30 },
        { input: 'text-4xl', expected: 36 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'fontSize',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary font sizes', () => {
      expect(parseTextStyleValue('text-[20]')).toEqual({
        property: 'fontSize',
        value: 20,
        variant: 'arbitrary'
      });
    });
  });

  describe('Text Alignment', () => {
    it('should parse text alignment', () => {
      const testCases = [
        { input: 'text-left', expected: 'LEFT' },
        { input: 'text-center', expected: 'CENTER' },
        { input: 'text-right', expected: 'RIGHT' },
        { input: 'text-justify', expected: 'JUSTIFIED' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTextStyleValue(input)).toEqual({
          property: 'textAlign',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Text Decoration', () => {
    it('should parse text decoration', () => {
      expect(parseTextStyleValue('underline')).toEqual({
        property: 'textDecoration',
        value: 'UNDERLINE',
        variant: 'preset'
      });

      expect(parseTextStyleValue('line-through')).toEqual({
        property: 'textDecoration',
        value: 'STRIKETHROUGH',
        variant: 'preset'
      });

      expect(parseTextStyleValue('no-underline')).toEqual({
        property: 'textDecoration',
        value: 'NONE',
        variant: 'preset'
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid values', () => {
      expect(parseTextStyleValue('text-invalid')).toBeNull();
      expect(parseTextStyleValue('text-[invalid]')).toBeNull();
      expect(parseTextStyleValue('text-[#GGGGGG]')).toBeNull();
      expect(parseTextStyleValue('text-[rgb(256,0,0)]')).toBeNull();
    });
  });
}); 
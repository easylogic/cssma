import { describe, it, expect } from 'vitest';
import { parseFontStyleValue } from '../../src/parser/font';

describe('Font Style Parser', () => {
  describe('Font Family', () => {
    it('should parse preset font families', () => {
      const testCases = [
        { 
          input: 'font-sans', 
          expected: { family: 'Inter', style: 'Regular' }
        },
        { 
          input: 'font-serif', 
          expected: { family: 'Georgia', style: 'Regular' }
        },
        { 
          input: 'font-mono', 
          expected: { family: 'Roboto Mono', style: 'Regular' }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFontStyleValue(input)).toEqual({
          property: 'fontName',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary font families', () => {
      expect(parseFontStyleValue('font-[Arial]')).toEqual({
        property: 'fontName',
        value: { family: 'Arial', style: 'Regular' },
        variant: 'arbitrary'
      });

      expect(parseFontStyleValue('font-[Helvetica Neue]')).toEqual({
        property: 'fontName',
        value: { family: 'Helvetica Neue', style: 'Regular' },
        variant: 'arbitrary'
      });
    });
  });

  describe('Font Weight', () => {
    it('should parse font weights', () => {
      const testCases = [
        { 
          input: 'font-thin', 
          expected: { family: 'Inter', style: 'Thin' }
        },
        { 
          input: 'font-extralight', 
          expected: { family: 'Inter', style: 'ExtraLight' }
        },
        { 
          input: 'font-light', 
          expected: { family: 'Inter', style: 'Light' }
        },
        { 
          input: 'font-normal', 
          expected: { family: 'Inter', style: 'Regular' }
        },
        { 
          input: 'font-medium', 
          expected: { family: 'Inter', style: 'Medium' }
        },
        { 
          input: 'font-semibold', 
          expected: { family: 'Inter', style: 'SemiBold' }
        },
        { 
          input: 'font-bold', 
          expected: { family: 'Inter', style: 'Bold' }
        },
        { 
          input: 'font-extrabold', 
          expected: { family: 'Inter', style: 'ExtraBold' }
        },
        { 
          input: 'font-black', 
          expected: { family: 'Inter', style: 'Black' }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFontStyleValue(input)).toEqual({
          property: 'fontName',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Font Style', () => {
    it('should parse font styles', () => {
      expect(parseFontStyleValue('italic')).toEqual({
        property: 'fontName',
        value: { family: 'Inter', style: 'Italic' },
        variant: 'preset'
      });

      expect(parseFontStyleValue('not-italic')).toEqual({
        property: 'fontName',
        value: { family: 'Inter', style: 'Regular' },
        variant: 'preset'
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid values', () => {
      expect(parseFontStyleValue('font-invalid')).toBeNull();
      expect(parseFontStyleValue('font-[123]')).toEqual({
        property: 'fontName',
        value: { family: '123', style: 'Regular' },
        variant: 'arbitrary'
      });
      expect(parseFontStyleValue('font-[]')).toBeNull();
    });
  });

  describe('Complex Cases', () => {
    it('should handle font families with spaces', () => {
      expect(parseFontStyleValue('font-[Noto Sans]')).toEqual({
        property: 'fontName',
        value: { family: 'Noto Sans', style: 'Regular' },
        variant: 'arbitrary'
      });
    });

    it('should handle font families with special characters', () => {
      expect(parseFontStyleValue('font-[Source_Code_Pro]')).toEqual({
        property: 'fontName',
        value: { family: 'Source_Code_Pro', style: 'Regular' },
        variant: 'arbitrary'
      });
    });
  });
}); 
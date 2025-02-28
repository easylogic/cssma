import { describe, it, expect } from 'vitest';
import { parseFontStyleValue } from '../../src/parser/font';

describe('Font Style Parser', () => {
  describe('Font Family', () => {
    it('should parse preset font families', () => {
      const testCases = [
        { 
          input: 'font-sans', 
          expected: 'Inter'
        },
        { 
          input: 'font-serif', 
          expected: 'Georgia'
        },
        { 
          input: 'font-mono', 
          expected: 'Roboto Mono'
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFontStyleValue(input)).toEqual({
          property: 'fontFamily',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary font families', () => {
      expect(parseFontStyleValue('font-[Arial]')).toEqual({
        property: 'fontFamily',
        value: 'Arial',
        variant: 'arbitrary'
      });

      expect(parseFontStyleValue('font-[Helvetica Neue]')).toEqual({
        property: 'fontFamily',
        value: 'Helvetica Neue',
        variant: 'arbitrary'
      });
    });

    it('should parse custom font families', () => {
      expect(parseFontStyleValue('font-roboto')).toEqual({
        property: 'fontFamily',
        value: 'Roboto',
        variant: 'preset'
      });

      expect(parseFontStyleValue('font-noto')).toEqual({
        property: 'fontFamily',
        value: 'Noto',
        variant: 'preset'
      });
    });
  });

  describe('Font Weight', () => {
    it('should parse font weights', () => {
      const testCases = [
        { input: 'font-thin', expected: 100 },
        { input: 'font-extralight', expected: 200 },
        { input: 'font-light', expected: 300 },
        { input: 'font-normal', expected: 400 },
        { input: 'font-medium', expected: 500 },
        { input: 'font-semibold', expected: 600 },
        { input: 'font-bold', expected: 700 },
        { input: 'font-extrabold', expected: 800 },
        { input: 'font-black', expected: 900 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFontStyleValue(input)).toEqual({
          property: 'fontWeight',
          value: expected,
          variant: 'preset'
        });
      });
    });
  });

  describe('Font Style', () => {
    it('should parse font styles', () => {
      expect(parseFontStyleValue('italic')).toEqual({
        property: 'fontStyle',
        value: 'italic',
        variant: 'preset'
      });

      expect(parseFontStyleValue('not-italic')).toEqual({
        property: 'fontStyle',
        value: 'normal',
        variant: 'preset'
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for invalid values', () => {
      expect(parseFontStyleValue('invalid-font')).toBeNull();
      expect(parseFontStyleValue('font-')).toBeNull();
      expect(parseFontStyleValue('font-[]')).toBeNull();
    });
  });

  describe('Complex Cases', () => {
    it('should handle font families with spaces', () => {
      expect(parseFontStyleValue('font-[Noto Sans]')).toEqual({
        property: 'fontFamily',
        value: 'Noto Sans',
        variant: 'arbitrary'
      });
    });

    it('should handle font families with special characters', () => {
      expect(parseFontStyleValue('font-[Source_Code_Pro]')).toEqual({
        property: 'fontFamily',
        value: 'Source_Code_Pro',
        variant: 'arbitrary'
      });
    });
  });
}); 
import { describe, it, expect } from 'vitest';
import { parseShapeStyleValue } from '../../src/parser/shape';

describe('Shape Style Parser', () => {
  describe('Opacity', () => {
    it('should parse preset opacity values', () => {
      const testCases = [
        { input: 'opacity-0', expected: 0 },
        { input: 'opacity-25', expected: 0.25 },
        { input: 'opacity-50', expected: 0.5 },
        { input: 'opacity-75', expected: 0.75 },
        { input: 'opacity-100', expected: 1 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseShapeStyleValue(input)).toEqual({
          property: 'opacity',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary opacity values', () => {
      expect(parseShapeStyleValue('opacity-[0.33]')).toEqual({
        property: 'opacity',
        value: 0.33,
        variant: 'arbitrary'
      });

      expect(parseShapeStyleValue('opacity-[0.67]')).toEqual({
        property: 'opacity',
        value: 0.67,
        variant: 'arbitrary'
      });
    });

    it('should handle percentage values', () => {
      expect(parseShapeStyleValue('opacity-[33%]')).toEqual({
        property: 'opacity',
        value: 0.33,
        variant: 'arbitrary'
      });

      expect(parseShapeStyleValue('opacity-[67%]')).toEqual({
        property: 'opacity',
        value: 0.67,
        variant: 'arbitrary'
      });
    });

    it('should handle invalid values', () => {
      expect(parseShapeStyleValue('opacity-invalid')).toBeNull();
      expect(parseShapeStyleValue('opacity-[invalid]')).toBeNull();
      expect(parseShapeStyleValue('opacity-[-1]')).toBeNull();
      expect(parseShapeStyleValue('opacity-[2]')).toBeNull();
      expect(parseShapeStyleValue('opacity-[101%]')).toBeNull();
    });
  });
}); 
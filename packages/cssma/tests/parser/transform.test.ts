import { describe, it, expect } from 'vitest';
import { parseTransformStyleValue } from '../../src/parser/transform';

describe('Transform Style Parser', () => {
  describe('Rotation', () => {
    it('should parse preset rotation values', () => {
      const testCases = [
        { input: 'rotate-0', expected: 0 },
        { input: 'rotate-45', expected: 45 },
        { input: 'rotate-90', expected: 90 },
        { input: 'rotate-180', expected: 180 },
        { input: '-rotate-45', expected: -45 },
        { input: '-rotate-90', expected: -90 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTransformStyleValue(input)).toEqual({
          property: 'rotation',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary rotation values', () => {
      const testCases = [
        { input: 'rotate-[30]', expected: 30 },
        { input: 'rotate-[22.5]', expected: 22.5 },
        { input: 'rotate-[-60]', expected: -60 },
        { input: '-rotate-[45]', expected: -45 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseTransformStyleValue(input)).toEqual({
          property: 'rotation',
          value: expected,
          variant: 'arbitrary'
        });
      });
    });

    it('should handle invalid rotation values', () => {
      const invalidCases = [
        'rotate-',
        'rotate-[]',
        'rotate-[invalid]',
        'rotate-[abc]',
        '-rotate-',
        '-rotate-[]'
      ];

      invalidCases.forEach(input => {
        expect(parseTransformStyleValue(input)).toBeNull();
      });
    });
  });
}); 
import { describe, it, expect } from 'vitest';
import { parseFilterStyleValue } from '../../src/parser/filter';

describe('Filter Style Parser', () => {
  describe('Blur Effect', () => {
    it('should parse preset blur values', () => {
      const testCases = [
        { input: 'blur-none', expected: 0 },
        { input: 'blur-sm', expected: 4 },
        { input: 'blur', expected: 8 },
        { input: 'blur-md', expected: 12 },
        { input: 'blur-lg', expected: 16 },
        { input: 'blur-xl', expected: 24 },
        { input: 'blur-2xl', expected: 40 },
        { input: 'blur-3xl', expected: 64 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFilterStyleValue(input)).toEqual({
          property: 'blur',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary blur values', () => {
      const testCases = [
        { input: 'blur-[4]', expected: 4 },
        { input: 'blur-[10]', expected: 10 },
        { input: 'blur-[20]', expected: 20 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFilterStyleValue(input)).toEqual({
          property: 'blur',
          value: expected,
          variant: 'arbitrary'
        });
      });
    });

    it('should handle invalid blur values', () => {
      const invalidCases = [
        'blur-',
        'blur-[]',
        'blur-[invalid]',
        'blur-[abc]',
        'blur-[-4]'  
      ];

      invalidCases.forEach(input => {
        expect(parseFilterStyleValue(input)).toBeNull();
      });
    });
  });
}); 
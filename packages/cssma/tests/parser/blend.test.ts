import { describe, it, expect } from 'vitest';
import { parseBlendStyleValue } from '../../src/parser/blend';

describe('Blend Style Parser', () => {
  describe('Blend Mode', () => {
    it('should parse blend mode values', () => {
      const testCases = [
        { input: 'mix-blend-normal', expected: 'NORMAL' },
        { input: 'mix-blend-multiply', expected: 'MULTIPLY' },
        { input: 'mix-blend-screen', expected: 'SCREEN' },
        { input: 'mix-blend-overlay', expected: 'OVERLAY' },
        { input: 'mix-blend-darken', expected: 'DARKEN' },
        { input: 'mix-blend-lighten', expected: 'LIGHTEN' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseBlendStyleValue(input)).toEqual({
          property: 'blendMode',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should handle invalid blend mode values', () => {
      const invalidCases = [
        'mix-blend-',
        'mix-blend-invalid',
        'blend-multiply',
        'mix-multiply'
      ];

      invalidCases.forEach(input => {
        expect(parseBlendStyleValue(input)).toBeNull();
      });
    });
  });
}); 
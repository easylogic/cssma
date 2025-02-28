import { describe, it, expect } from 'vitest';
import { parseAspectStyleValue } from '../../src/parser/aspect';

describe('Aspect Style Parser', () => {
  describe('Aspect Ratio', () => {
    it('should parse preset aspect ratios', () => {
      const testCases = [
        { input: 'aspect-auto', expected: 'auto' },
        { input: 'aspect-square', expected: 1 },
        { input: 'aspect-video', expected: 16/9 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseAspectStyleValue(input)).toEqual({
          property: 'aspectRatio',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should parse arbitrary aspect ratios', () => {
      const testCases = [
        { input: 'aspect-[4/3]', expected: 4/3 },
        { input: 'aspect-[16/10]', expected: 16/10 },
        { input: 'aspect-[2/1]', expected: 2 }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseAspectStyleValue(input)).toEqual({
          property: 'aspectRatio',
          value: expected,
          variant: 'arbitrary'
        });
      });
    });

    it('should handle invalid aspect ratios', () => {
      const invalidCases = [
        'aspect-',
        'aspect-[]',
        'aspect-[invalid]',
        'aspect-[4]',      // 분모 없음
        'aspect-[4/]',     // 분모 없음
        'aspect-[/3]',     // 분자 없음
        'aspect-[4/0]',    // 0으로 나누기
        'aspect-[-4/3]',   // 음수 분자
        'aspect-[4/-3]',   // 음수 분모
        'aspect-[0/3]',    // 0 분자
        'aspect-[abc/def]' // 숫자가 아님
      ];

      invalidCases.forEach(input => {
        expect(parseAspectStyleValue(input)).toBeNull();
      });
    });
  });
}); 
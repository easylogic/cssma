import { describe, it, expect } from 'vitest';
import { parseOverflowStyleValue } from '../../src/parser/overflow';

describe('Overflow Style Parser', () => {
  describe('Overflow', () => {
    it('should parse overflow values', () => {
      const testCases = [
        { 
          input: 'overflow-visible',
          expected: { clipsContent: false, scrollingEnabled: false }
        },
        { 
          input: 'overflow-hidden',
          expected: { clipsContent: true, scrollingEnabled: false }
        },
        { 
          input: 'overflow-scroll',
          expected: { clipsContent: true, scrollingEnabled: true }
        },
        { 
          input: 'overflow-auto',
          expected: { clipsContent: true, scrollingEnabled: true }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseOverflowStyleValue(input)).toEqual({
          property: 'overflow',
          value: expected,
          variant: 'preset'
        });
      });
    });

    it('should handle invalid overflow values', () => {
      const invalidCases = [
        'overflow-',
        'overflow-invalid',
        'overflow-both',
        'clip-content'
      ];

      invalidCases.forEach(input => {
        expect(parseOverflowStyleValue(input)).toBeNull();
      });
    });
  });
}); 
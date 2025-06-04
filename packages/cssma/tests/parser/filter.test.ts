import { describe, it, expect } from 'vitest';
import { parseFilterStyleValue } from '../../src/parser/filter';

describe('Filter Style Parser', () => {
  describe('Layer Blur', () => {
    it('should parse preset blur values', () => {
      const testCases = [
        { input: 'blur-none', expected: { property: 'blur', value: 0, variant: 'preset' } },
        { input: 'blur', expected: { property: 'blur', value: 8, variant: 'preset' } },
        { input: 'blur-sm', expected: { property: 'blur', value: 4, variant: 'preset' } },
        { input: 'blur-md', expected: { property: 'blur', value: 12, variant: 'preset' } },
        { input: 'blur-lg', expected: { property: 'blur', value: 16, variant: 'preset' } },
        { input: 'blur-xl', expected: { property: 'blur', value: 24, variant: 'preset' } },
        { input: 'blur-2xl', expected: { property: 'blur', value: 40, variant: 'preset' } },
        { input: 'blur-3xl', expected: { property: 'blur', value: 64, variant: 'preset' } }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFilterStyleValue(input)).toEqual(expected);
      });
    });

    it('should parse arbitrary blur values', () => {
      const testCases = [
        { input: 'blur-[4]', expected: { property: 'blur', value: 4, variant: 'arbitrary' } },
        { input: 'blur-[10]', expected: { property: 'blur', value: 10, variant: 'arbitrary' } },
        { input: 'blur-[20]', expected: { property: 'blur', value: 20, variant: 'arbitrary' } }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFilterStyleValue(input)).toEqual(expected);
      });
    });

    it('should handle invalid blur values', () => {
      const invalidCases = [
        'blur-',
        'blur-[]',
        'blur-[invalid]',
        'blur-[abc]',
        'blur-[-5]' // negative values should be rejected
      ];

      invalidCases.forEach(input => {
        expect(parseFilterStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Backdrop Blur', () => {
    it('should parse preset backdrop-blur values', () => {
      const testCases = [
        { input: 'backdrop-blur-none', expected: { property: 'backdropBlur', value: 0, variant: 'preset' } },
        { input: 'backdrop-blur', expected: { property: 'backdropBlur', value: 8, variant: 'preset' } },
        { input: 'backdrop-blur-sm', expected: { property: 'backdropBlur', value: 4, variant: 'preset' } },
        { input: 'backdrop-blur-md', expected: { property: 'backdropBlur', value: 12, variant: 'preset' } },
        { input: 'backdrop-blur-lg', expected: { property: 'backdropBlur', value: 16, variant: 'preset' } },
        { input: 'backdrop-blur-xl', expected: { property: 'backdropBlur', value: 24, variant: 'preset' } },
        { input: 'backdrop-blur-2xl', expected: { property: 'backdropBlur', value: 40, variant: 'preset' } },
        { input: 'backdrop-blur-3xl', expected: { property: 'backdropBlur', value: 64, variant: 'preset' } }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFilterStyleValue(input)).toEqual(expected);
      });
    });

    it('should parse arbitrary backdrop-blur values', () => {
      const testCases = [
        { input: 'backdrop-blur-[4]', expected: { property: 'backdropBlur', value: 4, variant: 'arbitrary' } },
        { input: 'backdrop-blur-[10]', expected: { property: 'backdropBlur', value: 10, variant: 'arbitrary' } },
        { input: 'backdrop-blur-[20]', expected: { property: 'backdropBlur', value: 20, variant: 'arbitrary' } }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFilterStyleValue(input)).toEqual(expected);
      });
    });

    it('should handle invalid backdrop-blur values', () => {
      const invalidCases = [
        'backdrop-blur-[]',
        'backdrop-blur-[invalid]',
        'backdrop-blur-[-5]'
      ];

      invalidCases.forEach(input => {
        expect(parseFilterStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Drop Shadow', () => {
    it('should parse preset drop-shadow values', () => {
      const testCases = [
        { 
          input: 'drop-shadow', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 0, offsetY: 1, blur: 2, color: 'rgba(0,0,0,0.1)' }, 
            variant: 'preset' 
          } 
        },
        { 
          input: 'drop-shadow-sm', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 0, offsetY: 1, blur: 1, color: 'rgba(0,0,0,0.05)' }, 
            variant: 'preset' 
          } 
        },
        { 
          input: 'drop-shadow-md', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 0, offsetY: 4, blur: 6, color: 'rgba(0,0,0,0.1)' }, 
            variant: 'preset' 
          } 
        },
        { 
          input: 'drop-shadow-lg', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 0, offsetY: 10, blur: 15, color: 'rgba(0,0,0,0.1)' }, 
            variant: 'preset' 
          } 
        },
        { 
          input: 'drop-shadow-xl', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 0, offsetY: 20, blur: 25, color: 'rgba(0,0,0,0.1)' }, 
            variant: 'preset' 
          } 
        },
        { 
          input: 'drop-shadow-2xl', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 0, offsetY: 25, blur: 50, color: 'rgba(0,0,0,0.25)' }, 
            variant: 'preset' 
          } 
        },
        { 
          input: 'drop-shadow-none', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 0, offsetY: 0, blur: 0, color: 'transparent' }, 
            variant: 'preset' 
          } 
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFilterStyleValue(input)).toEqual(expected);
      });
    });

    it('should parse arbitrary drop-shadow values', () => {
      const testCases = [
        { 
          input: 'drop-shadow-[0_4_8_rgba(0,0,0,0.1)]', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 0, offsetY: 4, blur: 8, color: 'rgba(0,0,0,0.1)' }, 
            variant: 'arbitrary' 
          } 
        },
        { 
          input: 'drop-shadow-[2_6_12_rgba(255,0,0,0.2)]', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: 2, offsetY: 6, blur: 12, color: 'rgba(255,0,0,0.2)' }, 
            variant: 'arbitrary' 
          } 
        },
        { 
          input: 'drop-shadow-[-2_-4_8_rgba(0,0,0,0.15)]', 
          expected: { 
            property: 'dropShadow', 
            value: { offsetX: -2, offsetY: -4, blur: 8, color: 'rgba(0,0,0,0.15)' }, 
            variant: 'arbitrary' 
          } 
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseFilterStyleValue(input)).toEqual(expected);
      });
    });

    it('should handle invalid drop-shadow values', () => {
      const invalidCases = [
        'drop-shadow-[]',
        'drop-shadow-[invalid]',
        'drop-shadow-[0_4]', // insufficient parts
        'drop-shadow-[abc_def_ghi_jkl]' // non-numeric values
      ];

      invalidCases.forEach(input => {
        expect(parseFilterStyleValue(input)).toBeNull();
      });
    });
  });

  describe('Invalid Values', () => {
    it('should return null for non-filter classes', () => {
      const nonFilterCases = [
        'text-red-500',
        'bg-blue-500',
        'w-full',
        'p-4',
        'unknown-class'
      ];

      nonFilterCases.forEach(input => {
        expect(parseFilterStyleValue(input)).toBeNull();
      });
    });
  });
}); 
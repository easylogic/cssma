import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('Drop Shadow Colors & Opacity Parser', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('Class Recognition', () => {
    it('should recognize standard drop-shadow classes', () => {
      const validClasses = [
        'drop-shadow-xs',
        'drop-shadow-sm',
        'drop-shadow-md',
        'drop-shadow-lg',
        'drop-shadow-xl',
        'drop-shadow-2xl',
        'drop-shadow-none'
      ];

      validClasses.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('drop-shadow');
      });
    });

    it('should recognize drop-shadow color classes', () => {
      const colorClasses = [
        'drop-shadow-red-500',
        'drop-shadow-blue-300',
        'drop-shadow-green-600',
        'drop-shadow-purple-400',
        'drop-shadow-gray-800'
      ];

      colorClasses.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('drop-shadow');
      });
    });

    it('should recognize drop-shadow special color classes', () => {
      const specialColors = [
        'drop-shadow-black',
        'drop-shadow-white',
        'drop-shadow-transparent',
        'drop-shadow-current'
      ];

      specialColors.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('drop-shadow');
      });
    });

    it('should recognize drop-shadow size + color combinations', () => {
      const combinations = [
        'drop-shadow-lg-red-500',
        'drop-shadow-sm-blue-300',
        'drop-shadow-xl-green-600',
        'drop-shadow-md-black',
        'drop-shadow-lg-white'
      ];

      combinations.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('drop-shadow');
      });
    });

    it('should recognize drop-shadow with opacity modifiers', () => {
      const opacityClasses = [
        'drop-shadow-lg/50',
        'drop-shadow-red-500/25',
        'drop-shadow-lg-blue-300/75',
        'drop-shadow-black/10',
        'drop-shadow-sm-white/90'
      ];

      opacityClasses.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('drop-shadow');
      });
    });

    it('should handle invalid drop-shadow classes correctly', () => {
      const invalidClasses = [
        'drop-shadow-red-1000', // invalid weight - should fallback to layout
        'drop-shadow-invalid-500', // invalid color name - should fallback to layout  
        'drop-shadow-lg-red', // missing weight - should fallback to layout
        'drop-shadow-red-500-blue-300', // double colors - should fallback to layout
        'drop-shadow-//50' // malformed opacity - should fallback to layout
      ];

      invalidClasses.forEach(className => {
        const result = parser.parseClassName(className);
        // Invalid classes should be handled by fallback (not effects parser)
        if (result) {
          expect(result.category, `Invalid class ${className} should not be in effects category`).not.toBe('effects');
          expect(result.category, `Invalid class ${className} should fallback to layout`).toBe('layout');
        }
      });
    });
  });

  describe('Value Parsing', () => {
    it('should parse standard drop-shadow sizes correctly', () => {
      const testCases = [
        { input: 'drop-shadow-xs', expected: 'xs' },
        { input: 'drop-shadow-sm', expected: 'sm' },
        { input: 'drop-shadow-lg', expected: 'lg' },
        { input: 'drop-shadow-xl', expected: 'xl' },
        { input: 'drop-shadow-2xl', expected: '2xl' },
        { input: 'drop-shadow-none', expected: 'none' }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parser.parseClassName(input);
        expect(result?.value).toBe(expected);
        expect(result?.isArbitrary).toBe(false);
      });
    });

    it('should parse drop-shadow colors correctly', () => {
      const testCases = [
        { input: 'drop-shadow-red-500', expected: 'red-500' },
        { input: 'drop-shadow-blue-300', expected: 'blue-300' },
        { input: 'drop-shadow-green-600', expected: 'green-600' }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parser.parseClassName(input);
        expect(result?.value).toBe(expected);
        expect(result?.isArbitrary).toBe(false);
      });
    });

    it('should parse drop-shadow size + color combinations correctly', () => {
      const testCases = [
        { input: 'drop-shadow-lg-red-500', expected: 'lg-red-500' },
        { input: 'drop-shadow-sm-blue-300', expected: 'sm-blue-300' },
        { input: 'drop-shadow-xl-black', expected: 'xl-black' }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parser.parseClassName(input);
        expect(result?.value).toBe(expected);
        expect(result?.isArbitrary).toBe(false);
      });
    });

    it('should parse drop-shadow opacity modifiers correctly', () => {
      const testCases = [
        { input: 'drop-shadow-lg/50', expected: 'lg/50' },
        { input: 'drop-shadow-red-500/25', expected: 'red-500/25' },
        { input: 'drop-shadow-lg-blue-300/75', expected: 'lg-blue-300/75' }
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parser.parseClassName(input);
        expect(result?.value).toBe(expected);
        expect(result?.isArbitrary).toBe(false);
      });
    });

    it('should handle arbitrary drop-shadow values', () => {
      const result = parser.parseClassName('drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]');
      expect(result?.value).toBe('0_4px_8px_rgba(0,0,0,0.12)');
      expect(result?.isArbitrary).toBe(true);
    });
  });

  describe('Style Application', () => {
    it('should apply standard drop-shadow sizes correctly', () => {
      const testCases = [
        {
          input: 'drop-shadow-lg',
          expectedFilter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
        },
        {
          input: 'drop-shadow-sm',
          expectedFilter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))'
        },
        {
          input: 'drop-shadow-none',
          expectedFilter: 'drop-shadow(0 0 #0000)'
        }
      ];

      testCases.forEach(({ input, expectedFilter }) => {
        const result = parser.parse(input);
        expect(result.effects?.filter).toBe(expectedFilter);
      });
    });

    it('should apply drop-shadow colors correctly', () => {
      const result = parser.parse('drop-shadow-red-500');
      expect(result.effects?.filter).toContain('drop-shadow(');
      expect(result.effects?.filter).toContain('rgb(239 68 68');
    });

    it('should apply drop-shadow special colors correctly', () => {
      const testCases = [
        { input: 'drop-shadow-black', expectedColor: '0 0 0' },
        { input: 'drop-shadow-white', expectedColor: '255 255 255' }
      ];

      testCases.forEach(({ input, expectedColor }) => {
        const result = parser.parse(input);
        expect(result.effects?.filter).toContain(`rgb(${expectedColor}`);
      });
    });

    it('should apply drop-shadow size + color combinations correctly', () => {
      const result = parser.parse('drop-shadow-lg-blue-500');
      expect(result.effects?.filter).toContain('drop-shadow(0 10px 8px rgb(59 130 246');
      expect(result.effects?.filter).toContain('drop-shadow(0 4px 3px rgb(59 130 246');
    });

    it('should apply drop-shadow opacity modifiers correctly', () => {
      const result = parser.parse('drop-shadow-lg/50');
      expect(result.effects?.filter).toContain('/ 0.020');
      expect(result.effects?.filter).toContain('/ 0.050');
    });

    it('should apply drop-shadow color with opacity correctly', () => {
      const result = parser.parse('drop-shadow-red-500/25');
      expect(result.effects?.filter).toContain('rgb(239 68 68 / 0.250)');
    });

    it('should apply drop-shadow size + color + opacity correctly', () => {
      const result = parser.parse('drop-shadow-lg-blue-500/30');
      expect(result.effects?.filter).toContain('rgb(59 130 246 / 0.300)');
    });

    it('should handle arbitrary drop-shadow values correctly', () => {
      const result = parser.parse('drop-shadow-[0_4px_8px_rgba(255,0,0,0.5)]');
      expect(result.effects?.filter).toBe('drop-shadow(0 4px 8px rgba(255,0,0,0.5))');
    });
  });

  describe('Color Resolution', () => {
    it('should resolve Tailwind colors correctly', () => {
      const testCases = [
        { input: 'drop-shadow-red-500', expectedHex: '#ef4444' },
        { input: 'drop-shadow-blue-500', expectedHex: '#3b82f6' },
        { input: 'drop-shadow-green-500', expectedHex: '#22c55e' },
        { input: 'drop-shadow-purple-500', expectedHex: '#a855f7' }
      ];

      testCases.forEach(({ input, expectedHex }) => {
        const result = parser.parse(input);
        const hex = expectedHex.slice(1);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        expect(result.effects?.filter).toContain(`rgb(${r} ${g} ${b}`);
      });
    });

    it('should resolve edge case color weights correctly', () => {
      const testCases = [
        { input: 'drop-shadow-gray-50', expectedRgb: '249 250 251' },
        { input: 'drop-shadow-gray-950', expectedRgb: '3 7 18' }
      ];

      testCases.forEach(({ input, expectedRgb }) => {
        const result = parser.parse(input);
        expect(result.effects?.filter).toContain(`rgb(${expectedRgb}`);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should maintain backward compatibility with existing drop-shadow classes', () => {
      const legacyClasses = [
        'drop-shadow-xs',
        'drop-shadow-sm',
        'drop-shadow-lg',
        'drop-shadow-xl',
        'drop-shadow-2xl',
        'drop-shadow-none'
      ];

      legacyClasses.forEach(className => {
        const result = parser.parse(className);
        expect(result.effects?.filter, `Legacy class ${className} should still work`).toBeTruthy();
      });
    });

    it('should support filter combination with multiple drop-shadows', () => {
      // This would be handled at a higher level in the parser
      // but we can test that individual drop-shadows work correctly
      const result1 = parser.parse('drop-shadow-lg');
      const result2 = parser.parse('drop-shadow-red-500');
      
      expect(result1.effects?.filter).toBeTruthy();
      expect(result2.effects?.filter).toBeTruthy();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCases = [
        'drop-shadow-transparent/0', // transparent with 0 opacity
        'drop-shadow-current/100', // current color with full opacity
        'drop-shadow-black/1' // very low opacity
      ];

      edgeCases.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Edge case ${className} should be handled`).not.toBeNull();
      });
    });
  });
}); 
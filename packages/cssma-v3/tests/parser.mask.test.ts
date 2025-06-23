import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('Mask Utilities Parser', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('Class Recognition', () => {
    it('should recognize basic mask classes', () => {
      const validClasses = [
        'mask-none',
        'mask-t-from-50%',
        'mask-b-to-80%',
        'mask-l-from-30%',
        'mask-r-to-70%'
      ];

      validClasses.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(['mask-linear', 'mask'].includes(result?.property!)).toBe(true);
      });
    });

    it('should recognize corner linear masks', () => {
      const cornerClasses = [
        'mask-tl-from-40%',
        'mask-tr-to-60%',
        'mask-bl-from-20%',
        'mask-br-to-90%'
      ];

      cornerClasses.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('mask-linear');
      });
    });

    it('should recognize radial mask classes', () => {
      const radialClasses = [
        'mask-radial-from-80%',
        'mask-radial-to-60%',
        'mask-radial-at-center',
        'mask-radial-at-top-left',
        'mask-radial-at-bottom-right'
      ];

      radialClasses.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('mask-radial');
      });
    });

    it('should recognize radial masks with position and percentage', () => {
      const complexRadialClasses = [
        'mask-radial-at-center-from-50%',
        'mask-radial-at-top-to-70%',
        'mask-radial-at-bottom-left-from-30%'
      ];

      complexRadialClasses.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('mask-radial');
      });
    });

    it('should recognize arbitrary mask values', () => {
      const arbitraryClasses = [
        'mask-[linear-gradient(to_right,black,transparent)]',
        'mask-[radial-gradient(circle,rgba(0,0,0,1)_50%,transparent)]'
      ];

      arbitraryClasses.forEach(className => {
        const result = parser.parseClassName(className);
        expect(result, `Failed for class: ${className}`).not.toBeNull();
        expect(result?.property).toBe('mask');
        expect(result?.isArbitrary).toBe(true);
      });
    });

    it('should reject invalid mask classes', () => {
      const invalidClasses = [
        'mask-invalid-from-50%',
        'mask-t-from-150%', // invalid percentage (should be 0-100)
        'mask-radial-at-invalid',
        'mask-diagonal-from-50%' // invalid direction
      ];

      invalidClasses.forEach(className => {
        const result = parser.parseClassName(className);
        // Should either be null or fallback to layout category (not mask)
        if (result) {
          expect(result.category).not.toBe('mask');
        }
      });
    });
  });

  describe('Value Parsing', () => {
    it('should parse linear mask directions correctly', () => {
      const cases = [
        { className: 'mask-t-from-50%', expectedValue: 't-from-50%' },
        { className: 'mask-b-to-80%', expectedValue: 'b-to-80%' },
        { className: 'mask-l-from-30%', expectedValue: 'l-from-30%' },
        { className: 'mask-r-to-70%', expectedValue: 'r-to-70%' },
        { className: 'mask-tl-from-40%', expectedValue: 'tl-from-40%' },
        { className: 'mask-br-to-60%', expectedValue: 'br-to-60%' }
      ];

      cases.forEach(({ className, expectedValue }) => {
        const result = parser.parseClassName(className);
        expect(result?.value).toBe(expectedValue);
        expect(result?.property).toBe('mask-linear');
      });
    });

    it('should parse radial mask values correctly', () => {
      const cases = [
        { className: 'mask-radial-from-80%', expectedValue: 'from-80%' },
        { className: 'mask-radial-to-60%', expectedValue: 'to-60%' },
        { className: 'mask-radial-at-center', expectedValue: 'at-center' },
        { className: 'mask-radial-at-top-left-from-50%', expectedValue: 'at-top-left-from-50%' }
      ];

      cases.forEach(({ className, expectedValue }) => {
        const result = parser.parseClassName(className);
        expect(result?.value).toBe(expectedValue);
        expect(result?.property).toBe('mask-radial');
      });
    });

    it('should parse mask-none correctly', () => {
      const result = parser.parseClassName('mask-none');
      expect(result?.property).toBe('mask');
      expect(result?.value).toBe('none');
      expect(result?.isArbitrary).toBe(false);
    });

    it('should parse arbitrary mask values correctly', () => {
      const className = 'mask-[linear-gradient(to_right,black,transparent)]';
      const result = parser.parseClassName(className);
      expect(result?.property).toBe('mask');
      expect(result?.value).toBe('linear-gradient(to_right,black,transparent)');
      expect(result?.isArbitrary).toBe(true);
    });
  });

  describe('Style Application', () => {
    it('should apply mask-none correctly', () => {
      const result = parser.parse('mask-none');
      expect(result.mask?.maskImage).toBe('none');
    });

    it('should apply linear masks correctly', () => {
      const testCases = [
        {
          className: 'mask-t-from-50%',
          expectedMask: 'linear-gradient(to top, transparent 0%, transparent 50%, rgba(0,0,0,1) 100%)'
        },
        {
          className: 'mask-b-to-80%',
          expectedMask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, transparent 100%)'
        },
        {
          className: 'mask-l-from-30%',
          expectedMask: 'linear-gradient(to left, transparent 0%, transparent 30%, rgba(0,0,0,1) 100%)'
        },
        {
          className: 'mask-r-to-70%',
          expectedMask: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, transparent 100%)'
        }
      ];

      testCases.forEach(({ className, expectedMask }) => {
        const result = parser.parse(className);
        expect(result.mask?.maskImage).toBe(expectedMask);
      });
    });

    it('should apply corner linear masks correctly', () => {
      const testCases = [
        {
          className: 'mask-tl-from-40%',
          expectedMask: 'linear-gradient(to top left, transparent 0%, transparent 40%, rgba(0,0,0,1) 100%)'
        },
        {
          className: 'mask-br-to-60%',
          expectedMask: 'linear-gradient(to bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, transparent 100%)'
        }
      ];

      testCases.forEach(({ className, expectedMask }) => {
        const result = parser.parse(className);
        expect(result.mask?.maskImage).toBe(expectedMask);
      });
    });

    it('should apply radial masks correctly', () => {
      const testCases = [
        {
          className: 'mask-radial-from-80%',
          expectedMask: 'radial-gradient(circle at center, transparent 0%, transparent 80%, rgba(0,0,0,1) 100%)'
        },
        {
          className: 'mask-radial-to-60%',
          expectedMask: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, transparent 100%)'
        },
        {
          className: 'mask-radial-at-center',
          expectedMask: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, transparent 70%)'
        },
        {
          className: 'mask-radial-at-top-left',
          expectedMask: 'radial-gradient(circle at top left, rgba(0,0,0,1) 0%, transparent 70%)'
        }
      ];

      testCases.forEach(({ className, expectedMask }) => {
        const result = parser.parse(className);
        expect(result.mask?.maskImage).toBe(expectedMask);
      });
    });

    it('should apply positioned radial masks correctly', () => {
      const testCases = [
        {
          className: 'mask-radial-at-center-from-50%',
          expectedMask: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,1) 100%)'
        },
        {
          className: 'mask-radial-at-top-to-70%',
          expectedMask: 'radial-gradient(circle at top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, transparent 100%)'
        },
        {
          className: 'mask-radial-at-bottom-left-from-30%',
          expectedMask: 'radial-gradient(circle at bottom left, transparent 0%, transparent 30%, rgba(0,0,0,1) 100%)'
        }
      ];

      testCases.forEach(({ className, expectedMask }) => {
        const result = parser.parse(className);
        expect(result.mask?.maskImage).toBe(expectedMask);
      });
    });

    it('should apply arbitrary mask values correctly', () => {
      const className = 'mask-[linear-gradient(to_right,black,transparent)]';
      const result = parser.parse(className);
      expect(result.mask?.maskImage).toBe('linear-gradient(to_right,black,transparent)');
    });

    it('should combine multiple mask layers correctly', () => {
      const result = parser.parse('mask-t-from-50% mask-radial-from-80%');
      const expectedMask = 'linear-gradient(to top, transparent 0%, transparent 50%, rgba(0,0,0,1) 100%), radial-gradient(circle at center, transparent 0%, transparent 80%, rgba(0,0,0,1) 100%)';
      expect(result.mask?.maskImage).toBe(expectedMask);
    });
  });

  describe('Integration Tests', () => {
    it('should work with modifiers', () => {
      const result = parser.parse('hover:mask-t-from-50% md:mask-radial-at-center');
      

      
      // hover 상태에서 linear mask 적용
      expect(result.states?.[':hover']?.mask?.maskImage).toBe(
        'linear-gradient(to top, transparent 0%, transparent 50%, rgba(0,0,0,1) 100%)'
      );
      
      // md 브레이크포인트에서 radial mask 적용
      expect(result.breakpoints?.md?.mask?.maskImage).toBe(
        'radial-gradient(circle at center, rgba(0,0,0,1) 0%, transparent 70%)'
      );
    });

    it('should maintain other styles when applying masks', () => {
      const result = parser.parse('mask-t-from-50% bg-red-500 p-4');
      
      // mask가 적용되어야 함
      expect(result.mask?.maskImage).toBe(
        'linear-gradient(to top, transparent 0%, transparent 50%, rgba(0,0,0,1) 100%)'
      );
      
      // 다른 스타일들도 유지되어야 함
      expect(result.backgrounds?.backgroundColor).toBeDefined();
      expect(result.spacing?.padding).toBeDefined();
    });

    it('should handle complex mask combinations', () => {
      const result = parser.parse('mask-t-from-30% mask-radial-at-bottom-right-to-70% mask-l-to-80%');
      
      const expectedMask = [
        'linear-gradient(to top, transparent 0%, transparent 30%, rgba(0,0,0,1) 100%)',
        'radial-gradient(circle at bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, transparent 100%)',
        'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, transparent 100%)'
      ].join(', ');
      
      expect(result.mask?.maskImage).toBe(expectedMask);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty or malformed input gracefully', () => {
      const result = parser.parse('');
      expect(result.mask?.maskImage).toBeUndefined();
    });

    it('should handle mask-none after other masks', () => {
      const result = parser.parse('mask-t-from-50% mask-none');
      // mask-none should override previous masks
      expect(result.mask?.maskImage).toBe('none');
    });

    it('should not interfere with similar classes', () => {
      // 다른 파서에서 처리되어야 하는 유사한 클래스들
      const result = parser.parse('opacity-50 filter blur-sm');
      expect(result.mask?.maskImage).toBeUndefined();
      expect(result.effects?.opacity).toBeDefined();
      expect(result.effects?.filter).toBeDefined();
    });
  });
}); 
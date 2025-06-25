import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { DEFAULT_CONFIG, DEFAULT_PRESET } from '../src/config';

const parser = new CSSParser(DEFAULT_CONFIG, DEFAULT_PRESET);

describe('Tables Parser', () => {
  describe('Class Recognition', () => {
    it('should recognize border collapse classes', () => {
      expect(parser.parseClassName('border-collapse')).toBeDefined();
      expect(parser.parseClassName('border-separate')).toBeDefined();
    });

    it('should recognize border spacing classes', () => {
      expect(parser.parseClassName('border-spacing-0')).toBeDefined();
      expect(parser.parseClassName('border-spacing-px')).toBeDefined();
      expect(parser.parseClassName('border-spacing-0.5')).toBeDefined();
      expect(parser.parseClassName('border-spacing-1')).toBeDefined();
      expect(parser.parseClassName('border-spacing-2')).toBeDefined();
      expect(parser.parseClassName('border-spacing-4')).toBeDefined();
      expect(parser.parseClassName('border-spacing-8')).toBeDefined();
      expect(parser.parseClassName('border-spacing-12')).toBeDefined();
      expect(parser.parseClassName('border-spacing-16')).toBeDefined();
      expect(parser.parseClassName('border-spacing-96')).toBeDefined();
      expect(parser.parseClassName('border-spacing-[10px]')).toBeDefined();
    });

    it('should recognize directional border spacing classes', () => {
      expect(parser.parseClassName('border-spacing-x-4')).toBeDefined();
      expect(parser.parseClassName('border-spacing-y-2')).toBeDefined();
      expect(parser.parseClassName('border-spacing-x-[5px]')).toBeDefined();
      expect(parser.parseClassName('border-spacing-y-[3rem]')).toBeDefined();
    });

    it('should recognize table layout classes', () => {
      expect(parser.parseClassName('table-auto')).toBeDefined();
      expect(parser.parseClassName('table-fixed')).toBeDefined();
    });

    it('should recognize caption side classes', () => {
      expect(parser.parseClassName('caption-top')).toBeDefined();
      expect(parser.parseClassName('caption-bottom')).toBeDefined();
    });
  });

  describe('Value Parsing', () => {
    it('should parse border collapse values', () => {
      const result1 = parser.parseClassName('border-collapse');
      expect(result1?.property).toBe('border-collapse');
      expect(result1?.value).toBe('collapse');
      expect(result1?.category).toBe('tables');

      const result2 = parser.parseClassName('border-separate');
      expect(result2?.property).toBe('border-separate');
      expect(result2?.value).toBe('separate');
      expect(result2?.category).toBe('tables');
    });

    it('should parse border spacing values', () => {
      const result1 = parser.parseClassName('border-spacing-0');
      expect(result1?.property).toBe('border-spacing');
      expect(result1?.value).toBe('0');
      expect(result1?.category).toBe('tables');

      const result2 = parser.parseClassName('border-spacing-px');
      expect(result2?.property).toBe('border-spacing');
      expect(result2?.value).toBe('px');

      const result3 = parser.parseClassName('border-spacing-4');
      expect(result3?.property).toBe('border-spacing');
      expect(result3?.value).toBe('4');

      const result4 = parser.parseClassName('border-spacing-[10px]');
      expect(result4?.property).toBe('border-spacing');
      expect(result4?.isArbitrary).toBe(true);
    });

    it('should parse directional border spacing values', () => {
      const result1 = parser.parseClassName('border-spacing-x-4');
      expect(result1?.property).toBe('border-spacing-x');
      expect(result1?.value).toBe('4');

      const result2 = parser.parseClassName('border-spacing-y-2');
      expect(result2?.property).toBe('border-spacing-y');
      expect(result2?.value).toBe('2');

      const result3 = parser.parseClassName('border-spacing-x-[5px]');
      expect(result3?.property).toBe('border-spacing-x');
      expect(result3?.isArbitrary).toBe(true);
    });

    it('should parse table layout values', () => {
      const result1 = parser.parseClassName('table-auto');
      expect(result1?.property).toBe('table-layout');
      expect(result1?.value).toBe('auto');
      expect(result1?.category).toBe('tables');

      const result2 = parser.parseClassName('table-fixed');
      expect(result2?.property).toBe('table-layout');
      expect(result2?.value).toBe('fixed');
      expect(result2?.category).toBe('tables');
    });

    it('should parse caption side values', () => {
      const result1 = parser.parseClassName('caption-top');
      expect(result1?.property).toBe('caption-side');
      expect(result1?.value).toBe('top');
      expect(result1?.category).toBe('tables');

      const result2 = parser.parseClassName('caption-bottom');
      expect(result2?.property).toBe('caption-side');
      expect(result2?.value).toBe('bottom');
      expect(result2?.category).toBe('tables');
    });

    it('should handle all spacing scale values', () => {
      const spacingValues = [
        '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', 
        '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', 
        '48', '52', '56', '60', '64', '72', '80', '96'
      ];

      spacingValues.forEach(value => {
        const result = parser.parseClassName(`border-spacing-${value}`);
        expect(result?.property).toBe('border-spacing');
        expect(result?.value).toBe(value);
      });
    });
  });

  describe('Responsive & States', () => {
    it('should handle responsive modifiers', () => {
      const result = parser.parseClassName('md:border-collapse');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('border-collapse');
      expect(result?.modifiers?.responsive).toBeDefined();
    });

    it('should handle state modifiers', () => {
      const result = parser.parseClassName('hover:table-fixed');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('table-fixed');
      expect(result?.modifiers?.state).toEqual([':hover']);
    });

    it('should handle combined modifiers', () => {
      const result = parser.parseClassName('lg:hover:border-spacing-4');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('border-spacing-4');
      expect(result?.modifiers?.responsive).toBeDefined();
      expect(result?.modifiers?.state).toEqual([':hover']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid classes', () => {
      expect(parser.parseClassName('invalid-table')).toBeDefined();
      expect(parser.parseClassName('border-spacing-')).toBeDefined(); // Falls back with empty value
      expect(parser.parseClassName('caption-')).toBeDefined(); // Falls back with empty value
    });

    it('should handle complex arbitrary values', () => {
      const result1 = parser.parseClassName('border-spacing-[calc(1rem+2px)]');
      expect(result1).toBeDefined();
      expect(result1?.isArbitrary).toBe(true);
      expect(result1?.property).toBe('border-spacing');

      const result2 = parser.parseClassName('border-spacing-x-[var(--spacing)]');
      expect(result2).toBeDefined();
      expect(result2?.isArbitrary).toBe(true);
      expect(result2?.property).toBe('border-spacing-x');
    });

    it('should handle decimal spacing values', () => {
      const result1 = parser.parseClassName('border-spacing-0.5');
      expect(result1?.property).toBe('border-spacing');
      expect(result1?.value).toBe('0.5');

      const result2 = parser.parseClassName('border-spacing-1.5');
      expect(result2?.property).toBe('border-spacing');
      expect(result2?.value).toBe('1.5');

      const result3 = parser.parseClassName('border-spacing-2.5');
      expect(result3?.property).toBe('border-spacing');
      expect(result3?.value).toBe('2.5');
    });
  });

  describe('CSS Value Mapping', () => {
    it('should map spacing values correctly', () => {
      // Test that the parser recognizes standard spacing values
      // The actual CSS value mapping is handled in the applyTablesStyle method
      const testCases = [
        { className: 'border-spacing-0', expectedValue: '0' },
        { className: 'border-spacing-px', expectedValue: 'px' },
        { className: 'border-spacing-1', expectedValue: '1' },
        { className: 'border-spacing-4', expectedValue: '4' },
        { className: 'border-spacing-8', expectedValue: '8' },
        { className: 'border-spacing-96', expectedValue: '96' }
      ];

      testCases.forEach(({ className, expectedValue }) => {
        const result = parser.parseClassName(className);
        expect(result?.value).toBe(expectedValue);
      });
    });

    it('should handle CSS custom properties', () => {
      const result1 = parser.parseClassName('border-spacing-[var(--border-spacing)]');
      expect(result1).toBeDefined();
      expect(result1?.isArbitrary).toBe(true);

      const result2 = parser.parseClassName('border-spacing-x-[var(--spacing-x)]');
      expect(result2).toBeDefined();
      expect(result2?.isArbitrary).toBe(true);
    });
  });

  describe('Table Display Integration', () => {
    it('should work with table display utilities', () => {
      // These are typically handled by layout parser, but should be recognized
      const tableDisplayClasses = [
        'table', 'table-caption', 'table-cell', 'table-column', 
        'table-column-group', 'table-footer-group', 'table-header-group', 
        'table-row', 'table-row-group'
      ];

      tableDisplayClasses.forEach(className => {
        const result = parser.parseClassName(className);
        // These should be handled by layout parser, not tables parser
        expect(result).toBeDefined();
      });
    });
  });
}); 
import { describe, it, expect } from 'vitest';
import { 
  generateDynamicStyle, 
  separateStaticAndDynamicClasses, 
  generateHybridStyles 
} from '../../src/dynamic/styleGenerator';

describe('Dynamic Style Generator', () => {
  describe('generateDynamicStyle', () => {
    it('should generate CSS class and content for dynamic Tailwind classes', () => {
      const result = generateDynamicStyle('w-[320] h-[240] bg-[#FF0000]');
      
      expect(result.className).toMatch(/^cssma-[a-z0-9]{8}$/);
      expect(result.hash).toHaveLength(8);
      expect(result.styleContent).toContain('width: 320px');
      expect(result.styleContent).toContain('height: 240px');
      expect(result.styleContent).toContain('background-color: #FF0000');
    });

    it('should return empty result for empty input', () => {
      const result = generateDynamicStyle('');
      
      expect(result.className).toBe('');
      expect(result.styleContent).toBe('');
      expect(result.hash).toBe('');
    });

    it('should generate consistent hash for same input', () => {
      const result1 = generateDynamicStyle('w-[320] h-[240]');
      const result2 = generateDynamicStyle('w-[320] h-[240]');
      
      expect(result1.hash).toBe(result2.hash);
      expect(result1.className).toBe(result2.className);
    });

    it('should generate different hash for different input', () => {
      const result1 = generateDynamicStyle('w-[320] h-[240]');
      const result2 = generateDynamicStyle('w-[400] h-[300]');
      
      expect(result1.hash).not.toBe(result2.hash);
      expect(result1.className).not.toBe(result2.className);
    });
  });

  describe('separateStaticAndDynamicClasses', () => {
    it('should separate static and dynamic classes correctly', () => {
      const result = separateStaticAndDynamicClasses('flex items-center w-[320] bg-[#FF0000] p-4');
      
      expect(result.staticClasses).toEqual(['flex', 'items-center', 'p-4']);
      expect(result.dynamicClasses).toEqual(['w-[320]', 'bg-[#FF0000]']);
    });

    it('should handle only static classes', () => {
      const result = separateStaticAndDynamicClasses('flex items-center justify-between');
      
      expect(result.staticClasses).toEqual(['flex', 'items-center', 'justify-between']);
      expect(result.dynamicClasses).toEqual([]);
    });

    it('should handle only dynamic classes', () => {
      const result = separateStaticAndDynamicClasses('w-[320] h-[240] bg-[#FF0000]');
      
      expect(result.staticClasses).toEqual([]);
      expect(result.dynamicClasses).toEqual(['w-[320]', 'h-[240]', 'bg-[#FF0000]']);
    });

    it('should handle empty input', () => {
      const result = separateStaticAndDynamicClasses('');
      
      expect(result.staticClasses).toEqual([]);
      expect(result.dynamicClasses).toEqual([]);
    });
  });

  describe('generateHybridStyles', () => {
    it('should generate hybrid styles with both static and dynamic classes', () => {
      const result = generateHybridStyles('flex items-center w-[320] bg-[#FF0000] p-4');
      
      expect(result.staticClassName).toBe('flex items-center p-4');
      expect(result.dynamicClassName).toMatch(/^cssma-[a-z0-9]{8}$/);
      expect(result.styleContent).toContain('width: 320px');
      expect(result.styleContent).toContain('background-color: #FF0000');
      expect(result.hash).toHaveLength(8);
    });

    it('should handle only static classes', () => {
      const result = generateHybridStyles('flex items-center justify-between');
      
      expect(result.staticClassName).toBe('flex items-center justify-between');
      expect(result.dynamicClassName).toBe('');
      expect(result.styleContent).toBe('');
      expect(result.hash).toBe('');
    });

    it('should handle only dynamic classes', () => {
      const result = generateHybridStyles('w-[320] h-[240]');
      
      expect(result.staticClassName).toBe('');
      expect(result.dynamicClassName).toMatch(/^cssma-[a-z0-9]{8}$/);
      expect(result.styleContent).toContain('width: 320px');
      expect(result.styleContent).toContain('height: 240px');
    });
  });

  describe('CSS formatting', () => {
    it('should format numeric values with px unit for size properties', () => {
      const result = generateDynamicStyle('w-[320] p-[16] opacity-[0.5]');
      
      expect(result.styleContent).toContain('width: 320px');
      expect(result.styleContent).toContain('padding: 16px');
      expect(result.styleContent).toContain('opacity: 0.5'); // unitless
    });

    it('should handle color values correctly', () => {
      const result = generateDynamicStyle('bg-[#FF0000] text-[#00FF00]');
      
      expect(result.styleContent).toContain('background-color: #FF0000');
      expect(result.styleContent).toContain('color: #00FF00');
    });

    it('should convert camelCase properties to kebab-case', () => {
      const result = generateDynamicStyle('bg-[#FF0000]');
      
      expect(result.styleContent).toContain('background-color:');
      expect(result.styleContent).not.toContain('backgroundColor:');
    });
  });
}); 
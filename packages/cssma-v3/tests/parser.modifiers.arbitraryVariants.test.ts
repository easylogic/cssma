import { ModifierParser } from '../src/core/parsers/modifiers';
import { ArbitraryVariantParser } from '../src/core/parsers/modifiers/arbitrary-variant-parser';

describe('ArbitraryVariantParser', () => {
  describe('Class Recognition', () => {
    test('should recognize arbitrary selector variants', () => {
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&:nth-child(3n+1)]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&:hover]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&::before]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&>li]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&+*]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&~div]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&_img]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&[aria-checked]]')).toBe(true);
    });

    test('should recognize arbitrary at-rule variants', () => {
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[@media(min-width:400px)]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[@supports(display:grid)]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[@container(min-width:400px)]')).toBe(true);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[@container/sidebar(min-width:400px)]')).toBe(true);
    });

    test('should reject invalid variants', () => {
      expect(ArbitraryVariantParser.isValidArbitraryVariant('hover')).toBe(false);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[invalid]')).toBe(false);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[@invalidrule]')).toBe(false);
      expect(ArbitraryVariantParser.isValidArbitraryVariant('[&invalid-selector]')).toBe(false);
    });
  });

  describe('Variant Parsing', () => {
    test('should parse selector variants correctly', () => {
      const result1 = ArbitraryVariantParser.parseArbitraryVariant('[&:nth-child(3n+1)]');
      expect(result1).toEqual({
        type: 'selector',
        raw: '[&:nth-child(3n+1)]',
        selector: '&:nth-child(3n+1)'
      });

      const result2 = ArbitraryVariantParser.parseArbitraryVariant('[&>li]');
      expect(result2).toEqual({
        type: 'selector',
        raw: '[&>li]',
        selector: '&>li'
      });

      const result3 = ArbitraryVariantParser.parseArbitraryVariant('[&_img]');
      expect(result3).toEqual({
        type: 'selector',
        raw: '[&_img]',
        selector: '&_img'
      });
    });

    test('should parse media query variants correctly', () => {
      const result = ArbitraryVariantParser.parseArbitraryVariant('[@media(min-width:400px)]');
      expect(result).toEqual({
        type: 'media',
        raw: '[@media(min-width:400px)]',
        mediaQuery: '@media (min-width:400px)'
      });
    });

    test('should parse supports query variants correctly', () => {
      const result = ArbitraryVariantParser.parseArbitraryVariant('[@supports(display:grid)]');
      expect(result).toEqual({
        type: 'supports',
        raw: '[@supports(display:grid)]',
        supportsQuery: '@supports (display:grid)'
      });
    });

    test('should parse container query variants correctly', () => {
      const result1 = ArbitraryVariantParser.parseArbitraryVariant('[@container(min-width:400px)]');
      expect(result1).toEqual({
        type: 'container',
        raw: '[@container(min-width:400px)]',
        containerQuery: '@container (min-width:400px)'
      });

      const result2 = ArbitraryVariantParser.parseArbitraryVariant('[@container/sidebar(min-width:400px)]');
      expect(result2).toEqual({
        type: 'container',
        raw: '[@container/sidebar(min-width:400px)]',
        containerQuery: '@container /sidebar(min-width:400px)'
      });
    });
  });

  describe('Integration with ModifierParser', () => {
    test('should handle arbitrary selector variants in class parsing', () => {
      const result = ModifierParser.parseModifiers('[&:nth-child(3n+1)]:bg-red-500');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('bg-red-500');
      expect(result.modifiers.arbitrary).toBe('&:nth-child(3n+1)');
    });

    test('should handle arbitrary media query variants', () => {
      const result = ModifierParser.parseModifiers('[@media(min-width:400px)]:block');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('block');
      expect(result.modifiers.responsive).toEqual({
        '[@media(min-width:400px)]': '@media (min-width:400px)'
      });
    });

    test('should handle arbitrary container query variants', () => {
      const result = ModifierParser.parseModifiers('[@container(min-width:400px)]:grid');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('grid');
      expect(result.modifiers.container).toEqual({
        '[@container(min-width:400px)]': '@container (min-width:400px)'
      });
    });

    test('should handle arbitrary supports query variants', () => {
      const result = ModifierParser.parseModifiers('[@supports(display:grid)]:grid');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('grid');
      expect(result.modifiers.supports).toBe('@supports (display:grid)');
    });

    test('should handle multiple arbitrary variants', () => {
      const result = ModifierParser.parseModifiers('[@media(min-width:400px)]:[&:nth-child(3n+1)]:bg-blue-500');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('bg-blue-500');
      expect(result.modifiers.responsive).toEqual({
        '[@media(min-width:400px)]': '@media (min-width:400px)'
      });
      expect(result.modifiers.arbitrary).toBe('&:nth-child(3n+1)');
    });
  });

  describe('Complex Real-World Cases', () => {
    test('should handle descendant selectors with Tailwind classes', () => {
      const result = ModifierParser.parseModifiers('[&_img]:rounded-lg');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('rounded-lg');
      expect(result.modifiers.arbitrary).toBe('&_img');
    });

    test('should handle sibling selectors', () => {
      const result = ModifierParser.parseModifiers('[&+*]:mt-4');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('mt-4');
      expect(result.modifiers.arbitrary).toBe('&+*');
    });

    test('should handle complex pseudo-selectors', () => {
      const result = ModifierParser.parseModifiers('[&:nth-child(3n+1)]:first-of-type:bg-gray-100');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('bg-gray-100');
      // Should prioritize arbitrary variant over simple state
    });

    test('should handle arbitrary media queries with complex conditions', () => {
      const result = ModifierParser.parseModifiers('[@media(min-width:640px)_and_(max-width:1024px)]:hidden');
      
      expect(result.hasModifiers).toBe(true);
      expect(result.baseClassName).toBe('hidden');
              expect(result.modifiers.responsive).toEqual({
          '[@media(min-width:640px)_and_(max-width:1024px)]': '@media (min-width:640px) and (max-width:1024px)'
        });
    });
  });

  describe('Normalization and Utilities', () => {
    test('should normalize descendant selectors', () => {
      const normalized = ArbitraryVariantParser.normalizeVariant('[&_img]');
      expect(normalized).toBe('[& img]');
    });

    test('should calculate specificity weights correctly', () => {
      const mediaVariant = ArbitraryVariantParser.parseArbitraryVariant('[@media(min-width:400px)]');
      const selectorVariant = ArbitraryVariantParser.parseArbitraryVariant('[&:hover]');
      const complexSelectorVariant = ArbitraryVariantParser.parseArbitraryVariant('[&[aria-checked]:hover]');

      expect(mediaVariant).not.toBeNull();
      expect(selectorVariant).not.toBeNull();
      expect(complexSelectorVariant).not.toBeNull();

      expect(ArbitraryVariantParser.getSpecificityWeight(mediaVariant!)).toBe(1000);
      expect(ArbitraryVariantParser.getSpecificityWeight(selectorVariant!)).toBe(110);
      expect(ArbitraryVariantParser.getSpecificityWeight(complexSelectorVariant!)).toBe(120);
    });

    test('should provide correct rule types', () => {
      const mediaVariant = ArbitraryVariantParser.parseArbitraryVariant('[@media(min-width:400px)]')!;
      const selectorVariant = ArbitraryVariantParser.parseArbitraryVariant('[&:hover]')!;

      expect(ArbitraryVariantParser.getRuleType(mediaVariant)).toBe('at-rule');
      expect(ArbitraryVariantParser.getRuleType(selectorVariant)).toBe('selector');
    });
  });

  describe('Selector Generation', () => {
    test('should generate correct selectors for various patterns', () => {
      const selectorVariant = ArbitraryVariantParser.parseArbitraryVariant('[&>li]')!;
      const generated = ArbitraryVariantParser.generateSelector(selectorVariant, '.my-class');
      
      expect(generated).toBe('.my-class>li');
    });

    test('should generate correct at-rules', () => {
      const mediaVariant = ArbitraryVariantParser.parseArbitraryVariant('[@media(min-width:400px)]')!;
      const generated = ArbitraryVariantParser.generateSelector(mediaVariant, '.my-class');
      
      expect(generated).toBe('@media (min-width:400px)');
    });
  });
}); 
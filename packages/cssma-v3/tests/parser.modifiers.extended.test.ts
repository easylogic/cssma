/**
 * Extended Modifier Parsers Test Suite
 * Tests for new modifier parsers: PseudoElement, Aria, Data, Motion
 */

import { ModifierParser } from '../src/core/parsers/modifiers';
import { PseudoElementModifierParser } from '../src/core/parsers/modifiers/pseudo-element-modifier-parser';
import { AriaModifierParser } from '../src/core/parsers/modifiers/aria-modifier-parser';
import { DataModifierParser } from '../src/core/parsers/modifiers/data-modifier-parser';
import { MotionModifierParser } from '../src/core/parsers/modifiers/motion-modifier-parser';

describe('Extended Modifier Parsers', () => {
  describe('PseudoElementModifierParser', () => {
    describe('Class Recognition', () => {
      test('should recognize pseudo-element modifiers', () => {
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('before')).toBe(true);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('after')).toBe(true);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('placeholder')).toBe(true);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('selection')).toBe(true);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('marker')).toBe(true);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('file')).toBe(true);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('backdrop')).toBe(true);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('first-line')).toBe(true);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('first-letter')).toBe(true);
      });

      test('should reject invalid pseudo-element modifiers', () => {
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('hover')).toBe(false);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('focus')).toBe(false);
        expect(PseudoElementModifierParser.isValidPseudoElementModifier('invalid-pseudo')).toBe(false);
      });
    });

    describe('Value Parsing', () => {
      test('should parse pseudo-element modifiers correctly', () => {
        const beforeModifier = PseudoElementModifierParser.parsePseudoElementModifier('before');
        expect(beforeModifier).toEqual({
          type: 'pseudo-element',
          element: 'before',
          priority: 50
        });

        const placeholderModifier = PseudoElementModifierParser.parsePseudoElementModifier('placeholder');
        expect(placeholderModifier).toEqual({
          type: 'pseudo-element',
          element: 'placeholder',
          priority: 40
        });
      });

      test('should return null for invalid modifiers', () => {
        expect(PseudoElementModifierParser.parsePseudoElementModifier('invalid')).toBeNull();
      });
    });

    describe('Selector Generation', () => {
      test('should generate correct CSS selectors', () => {
        const beforeModifier = PseudoElementModifierParser.parsePseudoElementModifier('before')!;
        expect(PseudoElementModifierParser.generatePseudoElementSelector(beforeModifier)).toBe('::before');

        const placeholderModifier = PseudoElementModifierParser.parsePseudoElementModifier('placeholder')!;
        expect(PseudoElementModifierParser.generatePseudoElementSelector(placeholderModifier)).toBe('::placeholder');
      });
    });
  });

  describe('AriaModifierParser', () => {
    describe('Class Recognition', () => {
      test('should recognize boolean aria modifiers', () => {
        expect(AriaModifierParser.isValidAriaModifier('aria-checked')).toBe(true);
        expect(AriaModifierParser.isValidAriaModifier('aria-disabled')).toBe(true);
        expect(AriaModifierParser.isValidAriaModifier('aria-expanded')).toBe(true);
        expect(AriaModifierParser.isValidAriaModifier('aria-hidden')).toBe(true);
      });

      test('should recognize enumerated aria modifiers', () => {
        expect(AriaModifierParser.isValidAriaModifier('aria-sort-ascending')).toBe(true);
        expect(AriaModifierParser.isValidAriaModifier('aria-orientation-horizontal')).toBe(true);
        expect(AriaModifierParser.isValidAriaModifier('aria-haspopup-menu')).toBe(true);
      });

      test('should recognize arbitrary aria modifiers', () => {
        expect(AriaModifierParser.isValidAriaModifier('aria-[label="Custom label"]')).toBe(true);
        expect(AriaModifierParser.isValidAriaModifier('aria-[customattr]')).toBe(true);
      });

      test('should reject invalid aria modifiers', () => {
        expect(AriaModifierParser.isValidAriaModifier('notaria-checked')).toBe(false);
        expect(AriaModifierParser.isValidAriaModifier('aria-invalidvalue')).toBe(false);
      });
    });

    describe('Value Parsing', () => {
      test('should parse boolean aria modifiers', () => {
        const modifier = AriaModifierParser.parseAriaModifier('aria-checked');
        expect(modifier).toEqual({
          type: 'aria',
          attribute: 'checked',
          value: 'true',
          priority: 25
        });
      });

      test('should parse enumerated aria modifiers', () => {
        const modifier = AriaModifierParser.parseAriaModifier('aria-sort-ascending');
        expect(modifier).toEqual({
          type: 'aria',
          attribute: 'sort',
          value: 'ascending',
          priority: 25
        });
      });

      test('should parse arbitrary aria modifiers', () => {
        const modifier = AriaModifierParser.parseAriaModifier('aria-[label="Custom"]');
        expect(modifier).toEqual({
          type: 'aria',
          attribute: 'label',
          value: 'Custom',
          priority: 25
        });
      });
    });
  });

  describe('DataModifierParser', () => {
    describe('Class Recognition', () => {
      test('should recognize boolean data modifiers', () => {
        expect(DataModifierParser.isValidDataModifier('data-active')).toBe(true);
        expect(DataModifierParser.isValidDataModifier('data-loading')).toBe(true);
        expect(DataModifierParser.isValidDataModifier('data-disabled')).toBe(true);
      });

      test('should recognize enumerated data modifiers', () => {
        expect(DataModifierParser.isValidDataModifier('data-state-loading')).toBe(true);
        expect(DataModifierParser.isValidDataModifier('data-size-lg')).toBe(true);
        expect(DataModifierParser.isValidDataModifier('data-theme-dark')).toBe(true);
      });

      test('should recognize arbitrary data modifiers', () => {
        expect(DataModifierParser.isValidDataModifier('data-[size="large"]')).toBe(true);
        expect(DataModifierParser.isValidDataModifier('data-[customattr]')).toBe(true);
      });
    });

    describe('Value Parsing', () => {
      test('should parse boolean data modifiers', () => {
        const modifier = DataModifierParser.parseDataModifier('data-active');
        expect(modifier).toEqual({
          type: 'data',
          attribute: 'active',
          priority: 20
        });
      });

      test('should parse enumerated data modifiers', () => {
        const modifier = DataModifierParser.parseDataModifier('data-state-loading');
        expect(modifier).toEqual({
          type: 'data',
          attribute: 'state',
          value: 'loading',
          priority: 20
        });
      });
    });
  });

  describe('MotionModifierParser', () => {
    describe('Class Recognition', () => {
      test('should recognize motion modifiers', () => {
        expect(MotionModifierParser.isValidMotionModifier('motion-safe')).toBe(true);
        expect(MotionModifierParser.isValidMotionModifier('motion-reduce')).toBe(true);
      });

      test('should reject invalid motion modifiers', () => {
        expect(MotionModifierParser.isValidMotionModifier('motion-invalid')).toBe(false);
        expect(MotionModifierParser.isValidMotionModifier('notmotion-safe')).toBe(false);
      });
    });

    describe('Value Parsing', () => {
      test('should parse motion modifiers correctly', () => {
        const safeModifier = MotionModifierParser.parseMotionModifier('motion-safe');
        expect(safeModifier).toEqual({
          type: 'motion',
          preference: 'safe',
          priority: 10
        });

        const reduceModifier = MotionModifierParser.parseMotionModifier('motion-reduce');
        expect(reduceModifier).toEqual({
          type: 'motion',
          preference: 'reduce',
          priority: 10
        });
      });
    });

    describe('Media Query Generation', () => {
      test('should generate correct media queries', () => {
        const safeModifier = MotionModifierParser.parseMotionModifier('motion-safe')!;
        expect(MotionModifierParser.generateMotionMediaQuery(safeModifier)).toBe('(prefers-reduced-motion: no-preference)');

        const reduceModifier = MotionModifierParser.parseMotionModifier('motion-reduce')!;
        expect(MotionModifierParser.generateMotionMediaQuery(reduceModifier)).toBe('(prefers-reduced-motion: reduce)');
      });
    });
  });

  describe('ModifierParser Integration', () => {
    const modifierParser = new ModifierParser();

    test('should handle pseudo-element modifiers in class names', () => {
      const result = modifierParser.parseClassNameModifiers('before:content-[""]');
      expect(result.pseudoElementModifier).toEqual({
        type: 'pseudo-element',
        element: 'before',
        priority: 50
      });
      expect(result.baseClassName).toBe('content-[""]');
    });

    test('should handle aria modifiers in class names', () => {
      const result = modifierParser.parseClassNameModifiers('aria-checked:bg-blue-500');
      expect(result.ariaModifier).toEqual({
        type: 'aria',
        attribute: 'checked',
        value: 'true',
        priority: 25
      });
      expect(result.baseClassName).toBe('bg-blue-500');
    });

    test('should handle data modifiers in class names', () => {
      const result = modifierParser.parseClassNameModifiers('data-active:text-green-500');
      expect(result.dataModifier).toEqual({
        type: 'data',
        attribute: 'active',
        priority: 20
      });
      expect(result.baseClassName).toBe('text-green-500');
    });

    test('should handle motion modifiers in class names', () => {
      const result = modifierParser.parseClassNameModifiers('motion-safe:animate-bounce');
      expect(result.motionModifier).toEqual({
        type: 'motion',
        preference: 'safe',
        priority: 10
      });
      expect(result.baseClassName).toBe('animate-bounce');
    });

    test('should handle complex modifier combinations', () => {
      const result = modifierParser.parseClassNameModifiers('md:motion-safe:before:hover:bg-blue-500');
      expect(result.breakpointModifier).toBeDefined();
      expect(result.motionModifier).toBeDefined();
      expect(result.pseudoElementModifier).toBeDefined();
      expect(result.stateModifier).toBe('hover');
      expect(result.baseClassName).toBe('bg-blue-500');
    });

    test('should collect new modifiers in newModifiers array', () => {
      const result = modifierParser.parseClassNameModifiers('before:aria-checked:data-active:motion-safe:text-blue-500');
      expect(result.newModifiers).toHaveLength(4);
      expect(result.newModifiers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'pseudo-element' }),
          expect.objectContaining({ type: 'aria' }),
          expect.objectContaining({ type: 'data' }),
          expect.objectContaining({ type: 'motion' })
        ])
      );
    });
  });
}); 
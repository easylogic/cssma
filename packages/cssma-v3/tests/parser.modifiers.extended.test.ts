/**
 * Extended Modifier Parsers Test Suite
 * Tests for new modifier parsers: PseudoElement, Aria, Data, Motion
 */
import { describe, test, expect } from 'vitest';
import { ModifierParser } from '../src/core/parsers/modifiers';
import { PseudoElementModifierParser } from '../src/core/parsers/modifiers/pseudo-element-modifier-parser';
import { AriaModifierParser } from '../src/core/parsers/modifiers/aria-modifier-parser';
import { DataModifierParser } from '../src/core/parsers/modifiers/data-modifier-parser';
import { MotionModifierParser } from '../src/core/parsers/modifiers/motion-modifier-parser';

describe('Extended Modifier Parsers', () => {
  describe('PseudoElementModifierParser', () => {
    describe('Class Recognition', () => {
      test('should recognize pseudo-element modifiers', () => {
        expect(PseudoElementModifierParser.isPseudoElementModifier('before')).toBe(true);
        expect(PseudoElementModifierParser.isPseudoElementModifier('after')).toBe(true);
        expect(PseudoElementModifierParser.isPseudoElementModifier('placeholder')).toBe(true);
        expect(PseudoElementModifierParser.isPseudoElementModifier('selection')).toBe(true);
        expect(PseudoElementModifierParser.isPseudoElementModifier('marker')).toBe(true);
        expect(PseudoElementModifierParser.isPseudoElementModifier('file')).toBe(true);
        expect(PseudoElementModifierParser.isPseudoElementModifier('backdrop')).toBe(true);
        expect(PseudoElementModifierParser.isPseudoElementModifier('first-line')).toBe(true);
        expect(PseudoElementModifierParser.isPseudoElementModifier('first-letter')).toBe(true);
      });

      test('should reject invalid pseudo-element modifiers', () => {
        expect(PseudoElementModifierParser.isPseudoElementModifier('hover')).toBe(false);
        expect(PseudoElementModifierParser.isPseudoElementModifier('focus')).toBe(false);
        expect(PseudoElementModifierParser.isPseudoElementModifier('invalid-pseudo')).toBe(false);
      });
    });

    describe('Value Parsing', () => {
      test('should parse pseudo-element modifiers correctly', () => {
        const beforeModifier = PseudoElementModifierParser.parse('before');
        expect(beforeModifier).toEqual({
          type: 'pseudo-element',
          element: 'before',
          priority: 50
        });

        const placeholderModifier = PseudoElementModifierParser.parse('placeholder');
        expect(placeholderModifier).toEqual({
          type: 'pseudo-element',
          element: 'placeholder',
          priority: 40
        });
      });

      test('should return null for invalid modifiers', () => {
        expect(PseudoElementModifierParser.parse('invalid')).toBeNull();
      });
    });

    describe('Selector Generation', () => {
      test('should generate correct CSS selectors', () => {
        const beforeModifier = PseudoElementModifierParser.parse('before')!;
        expect(PseudoElementModifierParser.generatePseudoElementSelector(beforeModifier)).toBe('::before');

        const placeholderModifier = PseudoElementModifierParser.parse('placeholder')!;
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
        expect(MotionModifierParser.isMotionModifier('motion-safe')).toBe(true);
        expect(MotionModifierParser.isMotionModifier('motion-reduce')).toBe(true);
      });

      test('should reject invalid motion modifiers', () => {
        expect(MotionModifierParser.isMotionModifier('motion-invalid')).toBe(false);
        expect(MotionModifierParser.isMotionModifier('notmotion-safe')).toBe(false);
      });
    });

    describe('Value Parsing', () => {
      test('should parse motion modifiers correctly', () => {
        const safeModifier = MotionModifierParser.parse('motion-safe');
        expect(safeModifier).toEqual({
          type: 'motion',
          preference: 'safe',
          priority: 10
        });

        const reduceModifier = MotionModifierParser.parse('motion-reduce');
        expect(reduceModifier).toEqual({
          type: 'motion',
          preference: 'reduce',
          priority: 10
        });
      });
    });

    describe('Media Query Generation', () => {
      test('should generate correct media queries', () => {
        const safeModifier = MotionModifierParser.parse('motion-safe')!;
        expect(MotionModifierParser.generateMotionMediaQuery(safeModifier)).toBe('(prefers-reduced-motion: no-preference)');

        const reduceModifier = MotionModifierParser.parse('motion-reduce')!;
        expect(MotionModifierParser.generateMotionMediaQuery(reduceModifier)).toBe('(prefers-reduced-motion: reduce)');
      });
    });
  });

}); 
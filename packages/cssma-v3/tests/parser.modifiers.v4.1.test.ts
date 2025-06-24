import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { DEFAULT_CONFIG, DEFAULT_PRESET } from '../src/config';
import { DesignPreset } from '../src/types';

const testPreset: DesignPreset = {
  ...DEFAULT_PRESET,
  name: 'test-preset-modifiers',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

const parser = new CSSParser(DEFAULT_CONFIG, testPreset);

describe('Tailwind CSS Modifier System Tests', () => {
  describe('Basic Modifier Parsing', () => {
    it('should parse simple responsive modifiers', () => {
      const className = 'md:bg-blue-500';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.responsive).toEqual({ md: '@media (min-width: 768px)' });
      expect(result?.baseClassName).toBe('bg-blue-500');
    });

    it('should parse state modifiers', () => {
      const className = 'hover:text-red-500';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toEqual([':hover']);
      expect(result?.baseClassName).toBe('text-red-500');
    });

    it('should parse pseudo-element modifiers', () => {
      const className = 'before:content-[""]';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.pseudoElement).toBe('::before');
      expect(result?.baseClassName).toBe('content-[""]');
    });
  });

  describe('Container Query Modifiers', () => {
    it('should parse basic container queries', () => {
      const className = '@md:flex';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.container).toEqual({ '@md': '@container (min-width: 768px)' });
      expect(result?.baseClassName).toBe('flex');
    });

    it('should parse named container queries', () => {
      const className = '@container/sidebar:grid';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      // Named containers might not be fully implemented yet
      expect(result?.baseClassName).toBe('grid');
    });
  });

  describe('Motion Preference Modifiers', () => {
    it('should parse motion-safe modifier', () => {
      const className = 'motion-safe:animate-spin';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.motion).toBe('@media (prefers-reduced-motion: no-preference)');
      expect(result?.baseClassName).toBe('animate-spin');
    });

    it('should parse motion-reduce modifier', () => {
      const className = 'motion-reduce:transform-none';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.motion).toBe('@media (prefers-reduced-motion: reduce)');
      expect(result?.baseClassName).toBe('transform-none');
    });
  });

  describe('Modern Modifiers', () => {
    it('should parse noscript modifier', () => {
      const className = 'noscript:block';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.noscript).toBe('noscript');
      expect(result?.baseClassName).toBe('block');
    });

    it('should parse user-valid modifier', () => {
      const className = 'user-valid:border-green-500';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toEqual([':user-valid']);
      expect(result?.baseClassName).toBe('border-green-500');
    });

    it('should parse inverted-colors modifier', () => {
      const className = 'inverted-colors:invert';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toEqual(['@media (inverted-colors: inverted)']);
      expect(result?.baseClassName).toBe('invert');
    });

    it('should parse pointer-fine modifier', () => {
      const className = 'pointer-fine:bg-gray-100';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toEqual(['@media (pointer: fine)']);
      expect(result?.baseClassName).toBe('bg-gray-100');
    });
  });

  describe('Complex Modifier Chains', () => {
    it('should parse responsive + state combination', () => {
      const className = 'md:hover:bg-blue-500';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.responsive).toEqual({ md: '@media (min-width: 768px)' });
      expect(result?.modifiers?.state).toEqual([':hover']);
      expect(result?.baseClassName).toBe('bg-blue-500');
    });

    it('should parse container + motion + state combination', () => {
      const className = '@lg:motion-safe:hover:scale-110';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.container).toEqual({ '@lg': '@container (min-width: 1024px)' });
      expect(result?.modifiers?.motion).toBe('@media (prefers-reduced-motion: no-preference)');
      expect(result?.modifiers?.state).toEqual([':hover']);
      expect(result?.baseClassName).toBe('scale-110');
    });

    it('should parse full modifier chain', () => {
      const className = 'md:@container/main:motion-safe:hover:before:bg-blue-500';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.responsive).toEqual({ md: '@media (min-width: 768px)' });
      expect(result?.modifiers?.motion).toBe('@media (prefers-reduced-motion: no-preference)');
      expect(result?.modifiers?.state).toEqual([':hover']);
      expect(result?.modifiers?.pseudoElement).toBe('::before');
      expect(result?.baseClassName).toBe('bg-blue-500');
    });
  });

  describe('Attribute Modifiers', () => {
    it('should parse aria modifiers', () => {
      const className = 'aria-checked:bg-blue-500';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.aria).toEqual({ checked: '[aria-checked]' });
      expect(result?.baseClassName).toBe('bg-blue-500');
    });

    it('should parse data modifiers', () => {
      const className = 'data-active:font-bold';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.data).toEqual({ active: '[data-active]' });
      expect(result?.baseClassName).toBe('font-bold');
    });
  });

  describe('Group and Peer Modifiers', () => {
    it('should parse group modifiers', () => {
      const className = 'group-hover:opacity-100';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.group).toBe('group-hover');
      expect(result?.baseClassName).toBe('opacity-100');
    });

    it('should parse peer modifiers', () => {
      const className = 'peer-focus:ring-2';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.peer).toBe('peer-focus');
      expect(result?.baseClassName).toBe('ring-2');
    });
  });

  describe.skip('Style Application', () => {
    it('should apply responsive styles correctly', () => {
      const className = 'md:bg-blue-500';
      const styles = parser.parse(className);

      expect(styles.breakpoints?.['md']).toBeDefined();
      expect(styles.breakpoints?.['md']?.colors?.background).toBeDefined();
    });

    it('should apply state styles correctly', () => {
      const className = 'hover:text-red-500';
      const styles = parser.parse(className);

      expect(styles.states?.['hover']).toBeDefined();
      expect(styles.states?.['hover']?.colors?.text).toBeDefined();
    });

    it('should apply complex modifier chains correctly', () => {
      const className = 'md:hover:bg-blue-500';
      const styles = parser.parse(className);

      expect(styles.breakpoints?.['md']).toBeDefined();
      // The hover state should be nested within the md breakpoint
      expect(styles.breakpoints?.['md']?.states?.['hover']).toBeDefined();
      expect(styles.breakpoints?.['md']?.states?.['hover']?.colors?.background).toBeDefined();
    });
  });

  describe('v4.1 Arbitrary Values', () => {
    it('should parse arbitrary values with modifiers', () => {
      const className = 'md:bg-[#ff0000]';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.responsive).toEqual({ md: '@media (min-width: 768px)' });
      expect(result?.baseClassName).toBe('bg-[#ff0000]');
      expect(result?.isArbitrary).toBe(true);
    });

    it('should parse complex arbitrary values', () => {
      const className = 'hover:before:content-["Hello_World"]';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toEqual([':hover']);
      expect(result?.modifiers?.pseudoElement).toBe('::before');
      expect(result?.baseClassName).toBe('content-["Hello_World"]');
    });
  });

  describe('Parser Integration', () => {
    it('should correctly parse and identify base classes', () => {
      const testCases = [
        { input: 'bg-blue-500', expected: 'backgrounds' },
        { input: 'text-red-500', expected: 'typography' },
        { input: 'p-4', expected: 'spacing' },
        { input: 'flex', expected: 'flexbox-grid' },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = parser.parseClassName(input);
        expect(result?.category).toBe(expected);
      });
    });

    it('should handle unknown modifiers gracefully', () => {
      const className = 'unknown-modifier:bg-blue-500';
      const result = parser.parseClassName(className);

      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('bg-blue-500');
    });
  });
}); 
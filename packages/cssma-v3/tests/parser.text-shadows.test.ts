/**
 * Text Shadow Parser Tests
 */

import { describe, test, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';
import { Config, DesignPreset } from '../src/types';

const mockConfig: Config = {
  prefix: '',
  separator: ':',
  important: false,
  enableArbitraryValues: true,
  enableStateModifiers: true,
  enableResponsiveModifiers: true
};

const mockPreset: DesignPreset = {
  name: 'test',
  version: '1.0.0',
  colors: {
    red: {
      '500': { r: 0.94, g: 0.27, b: 0.27, a: 1 }
    }
  },
  spacing: {
    '4': 16,
    '8': 32
  },
  typography: {
    fontSize: {
      'base': 16,
      'lg': 18
    },
    fontWeight: {
      'normal': 400,
      'bold': 700
    },
    lineHeight: {
      'normal': 1.5
    },
    letterSpacing: {
      'normal': 0
    },
    fontFamily: {
      'sans': 'sans-serif'
    }
  },
  effects: {
    borderRadius: {
      'lg': 8
    },
    boxShadow: {
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    opacity: {
      '50': 0.5
    },
    blur: {
      'sm': 4
    }
  },
  layout: {
    width: {},
    height: {},
    maxWidth: {},
    maxHeight: {},
    minWidth: {},
    minHeight: {}
  }
};

describe('Text Shadow Parser Tests', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());

  describe('Basic text-shadow utilities', () => {
    test('should parse text-shadow-sm', () => {
      const result = parser.parse('text-shadow-sm');
      expect(result.effects.textShadow).toBe('0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)');
    });

    test('should parse text-shadow (default)', () => {
      const result = parser.parse('text-shadow');
      expect(result.effects.textShadow).toBe('0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)');
    });

    test('should parse text-shadow-md', () => {
      const result = parser.parse('text-shadow-md');
      expect(result.effects.textShadow).toBe('0 4px 6px rgb(0 0 0 / 0.07), 0 2px 4px rgb(0 0 0 / 0.06)');
    });

    test('should parse text-shadow-lg', () => {
      const result = parser.parse('text-shadow-lg');
      expect(result.effects.textShadow).toBe('0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)');
    });

    test('should parse text-shadow-xl', () => {
      const result = parser.parse('text-shadow-xl');
      expect(result.effects.textShadow).toBe('0 20px 25px rgb(0 0 0 / 0.1), 0 10px 10px rgb(0 0 0 / 0.04)');
    });

    test('should parse text-shadow-2xl', () => {
      const result = parser.parse('text-shadow-2xl');
      expect(result.effects.textShadow).toBe('0 25px 50px rgb(0 0 0 / 0.25)');
    });

    test('should parse text-shadow-none', () => {
      const result = parser.parse('text-shadow-none');
      expect(result.effects.textShadow).toBe('none');
    });
  });

  describe('Arbitrary text-shadow values', () => {
    test('should parse arbitrary text-shadow values', () => {
      const result = parser.parse('text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]');
      expect(result.effects.textShadow).toBe('2px 2px 4px rgba(0,0,0,0.5)');
    });

    test('should parse simple arbitrary text-shadow', () => {
      const result = parser.parse('text-shadow-[1px_1px_2px_black]');
      expect(result.effects.textShadow).toBe('1px 1px 2px black');
    });
  });

  describe('State modifiers with text-shadow', () => {
    test('should parse hover:text-shadow-lg', () => {
      const result = parser.parse('hover:text-shadow-lg');
      expect(result.states?.hover?.effects?.textShadow).toBe('0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)');
    });

    test('should parse focus:text-shadow-md', () => {
      const result = parser.parse('focus:text-shadow-md');
      expect(result.states?.focus?.effects?.textShadow).toBe('0 4px 6px rgb(0 0 0 / 0.07), 0 2px 4px rgb(0 0 0 / 0.06)');
    });
  });

  describe('Responsive text-shadow', () => {
    test('should parse md:text-shadow-lg', () => {
      const result = parser.parse('md:text-shadow-lg');
      expect(result.breakpoints?.md?.effects?.textShadow).toBe('0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)');
    });

    test('should parse lg:text-shadow-xl', () => {
      const result = parser.parse('lg:text-shadow-xl');
      expect(result.breakpoints?.lg?.effects?.textShadow).toBe('0 20px 25px rgb(0 0 0 / 0.1), 0 10px 10px rgb(0 0 0 / 0.04)');
    });
  });

  describe('Combined modifiers', () => {
    test('should parse md:hover:text-shadow-lg', () => {
      const result = parser.parse('md:hover:text-shadow-lg');
      expect(result.breakpoints?.md?.states?.hover?.effects?.textShadow).toBe('0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)');
    });
  });
}); 
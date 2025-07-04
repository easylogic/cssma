import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (effects)', () => {
  describe('shadow', () => {
    it('should parse Tailwind v4 shadow classes', () => {
      expect(parseUtility('shadow')).toEqual(baseUtility({ prefix: 'shadow', raw: 'shadow' }));
      expect(parseUtility('shadow-md')).toEqual(baseUtility({ prefix: 'shadow', value: 'md', raw: 'shadow-md' }));
      expect(parseUtility('shadow-lg')).toEqual(baseUtility({ prefix: 'shadow', value: 'lg', raw: 'shadow-lg' }));
      expect(parseUtility('shadow-none')).toEqual(baseUtility({ prefix: 'shadow', value: 'none', raw: 'shadow-none' }));
      expect(parseUtility('shadow-[0_2px_8px_#0003]')).toEqual(baseUtility({ prefix: 'shadow', value: '[0_2px_8px_#0003]', raw: 'shadow-[0_2px_8px_#0003]' }));
      expect(parseUtility('shadow-lg!')).toEqual(baseUtility({ prefix: 'shadow', value: 'lg', raw: 'shadow-lg!', important: true }));
      expect(parseUtility('shadow-')).toEqual({ type: 'unknown', raw: 'shadow-' });
      expect(parseUtility('shadow-foo')).toEqual({ type: 'unknown', raw: 'shadow-foo' });
    });
  });

  describe('opacity', () => {
    it('should parse Tailwind v4 opacity classes', () => {
      expect(parseUtility('opacity-0')).toEqual(baseUtility({ prefix: 'opacity', value: '0', raw: 'opacity-0' }));
      expect(parseUtility('opacity-50')).toEqual(baseUtility({ prefix: 'opacity', value: '50', raw: 'opacity-50' }));
      expect(parseUtility('opacity-100')).toEqual(baseUtility({ prefix: 'opacity', value: '100', raw: 'opacity-100' }));
      expect(parseUtility('opacity-[.25]')).toEqual(baseUtility({ prefix: 'opacity', value: '[.25]', raw: 'opacity-[.25]' }));
      expect(parseUtility('opacity-')).toEqual({ type: 'unknown', raw: 'opacity-' });
      expect(parseUtility('opacity-foo')).toEqual({ type: 'unknown', raw: 'opacity-foo' });
    });
  });

  describe('mix-blend', () => {
    it('should parse Tailwind v4 mix-blend classes', () => {
      expect(parseUtility('mix-blend-normal')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'normal', raw: 'mix-blend-normal' }));
      expect(parseUtility('mix-blend-multiply')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'multiply', raw: 'mix-blend-multiply' }));
      expect(parseUtility('mix-blend-color')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'color', raw: 'mix-blend-color' }));
      expect(parseUtility('mix-blend-luminosity')).toEqual(baseUtility({ prefix: 'mix-blend', value: 'luminosity', raw: 'mix-blend-luminosity' }));
      expect(parseUtility('mix-blend-')).toEqual({ type: 'unknown', raw: 'mix-blend-' });
      expect(parseUtility('mix-blend-foo')).toEqual({ type: 'unknown', raw: 'mix-blend-foo' });
    });
  });

  describe('backdrop-blur', () => {
    it('should parse Tailwind v4 backdrop-blur classes', () => {
      expect(parseUtility('backdrop-blur')).toEqual(baseUtility({ prefix: 'backdrop-blur', raw: 'backdrop-blur' }));
      expect(parseUtility('backdrop-blur-sm')).toEqual(baseUtility({ prefix: 'backdrop-blur', value: 'sm', raw: 'backdrop-blur-sm' }));
      expect(parseUtility('backdrop-blur-lg')).toEqual(baseUtility({ prefix: 'backdrop-blur', value: 'lg', raw: 'backdrop-blur-lg' }));
      expect(parseUtility('backdrop-blur-none')).toEqual(baseUtility({ prefix: 'backdrop-blur', value: 'none', raw: 'backdrop-blur-none' }));
      expect(parseUtility('backdrop-blur-[2px]')).toEqual(baseUtility({ prefix: 'backdrop-blur', value: '[2px]', raw: 'backdrop-blur-[2px]' }));
      expect(parseUtility('backdrop-blur-')).toEqual({ type: 'unknown', raw: 'backdrop-blur-' });
      expect(parseUtility('backdrop-blur-foo')).toEqual({ type: 'unknown', raw: 'backdrop-blur-foo' });
    });
  });

  describe('backdrop-brightness', () => {
    it('should parse Tailwind v4 backdrop-brightness classes', () => {
      expect(parseUtility('backdrop-brightness-50')).toEqual(baseUtility({ prefix: 'backdrop-brightness', value: '50', raw: 'backdrop-brightness-50' }));
      expect(parseUtility('backdrop-brightness-200')).toEqual(baseUtility({ prefix: 'backdrop-brightness', value: '200', raw: 'backdrop-brightness-200' }));
      expect(parseUtility('backdrop-brightness-[.25]')).toEqual(baseUtility({ prefix: 'backdrop-brightness', value: '[.25]', raw: 'backdrop-brightness-[.25]' }));
      expect(parseUtility('backdrop-brightness-')).toEqual({ type: 'unknown', raw: 'backdrop-brightness-' });
      expect(parseUtility('backdrop-brightness-foo')).toEqual({ type: 'unknown', raw: 'backdrop-brightness-foo' });
    });
  });

  describe('backdrop-contrast', () => {
    it('should parse Tailwind v4 backdrop-contrast classes', () => {
      expect(parseUtility('backdrop-contrast-50')).toEqual(baseUtility({ prefix: 'backdrop-contrast', value: '50', raw: 'backdrop-contrast-50' }));
      expect(parseUtility('backdrop-contrast-200')).toEqual(baseUtility({ prefix: 'backdrop-contrast', value: '200', raw: 'backdrop-contrast-200' }));
      expect(parseUtility('backdrop-contrast-[.25]')).toEqual(baseUtility({ prefix: 'backdrop-contrast', value: '[.25]', raw: 'backdrop-contrast-[.25]' }));
      expect(parseUtility('backdrop-contrast-')).toEqual({ type: 'unknown', raw: 'backdrop-contrast-' });
      expect(parseUtility('backdrop-contrast-foo')).toEqual({ type: 'unknown', raw: 'backdrop-contrast-foo' });
    });
  });

  describe('backdrop-grayscale', () => {
    it('should parse Tailwind v4 backdrop-grayscale classes', () => {
      expect(parseUtility('backdrop-grayscale')).toEqual(baseUtility({ prefix: 'backdrop-grayscale', raw: 'backdrop-grayscale' }));
      expect(parseUtility('backdrop-grayscale-0')).toEqual(baseUtility({ prefix: 'backdrop-grayscale', value: '0', raw: 'backdrop-grayscale-0' }));
      expect(parseUtility('backdrop-grayscale-')).toEqual({ type: 'unknown', raw: 'backdrop-grayscale-' });
      expect(parseUtility('backdrop-grayscale-foo')).toEqual({ type: 'unknown', raw: 'backdrop-grayscale-foo' });
    });
  });

  describe('backdrop-hue-rotate', () => {
    it('should parse Tailwind v4 backdrop-hue-rotate classes', () => {
      expect(parseUtility('backdrop-hue-rotate-15')).toEqual(baseUtility({ prefix: 'backdrop-hue-rotate', value: '15', raw: 'backdrop-hue-rotate-15' }));
      expect(parseUtility('backdrop-hue-rotate-180')).toEqual(baseUtility({ prefix: 'backdrop-hue-rotate', value: '180', raw: 'backdrop-hue-rotate-180' }));
      expect(parseUtility('backdrop-hue-rotate-[270deg]')).toEqual(baseUtility({ prefix: 'backdrop-hue-rotate', value: '[270deg]', raw: 'backdrop-hue-rotate-[270deg]' }));
      expect(parseUtility('backdrop-hue-rotate-')).toEqual({ type: 'unknown', raw: 'backdrop-hue-rotate-' });
      expect(parseUtility('backdrop-hue-rotate-foo')).toEqual({ type: 'unknown', raw: 'backdrop-hue-rotate-foo' });
    });
  });

  describe('backdrop-invert', () => {
    it('should parse Tailwind v4 backdrop-invert classes', () => {
      expect(parseUtility('backdrop-invert')).toEqual(baseUtility({ prefix: 'backdrop-invert', raw: 'backdrop-invert' }));
      expect(parseUtility('backdrop-invert-0')).toEqual(baseUtility({ prefix: 'backdrop-invert', value: '0', raw: 'backdrop-invert-0' }));
      expect(parseUtility('backdrop-invert-')).toEqual({ type: 'unknown', raw: 'backdrop-invert-' });
      expect(parseUtility('backdrop-invert-foo')).toEqual({ type: 'unknown', raw: 'backdrop-invert-foo' });
    });
  });

  describe('backdrop-opacity', () => {
    it('should parse Tailwind v4 backdrop-opacity classes', () => {
      expect(parseUtility('backdrop-opacity-0')).toEqual(baseUtility({ prefix: 'backdrop-opacity', value: '0', raw: 'backdrop-opacity-0' }));
      expect(parseUtility('backdrop-opacity-50')).toEqual(baseUtility({ prefix: 'backdrop-opacity', value: '50', raw: 'backdrop-opacity-50' }));
      expect(parseUtility('backdrop-opacity-100')).toEqual(baseUtility({ prefix: 'backdrop-opacity', value: '100', raw: 'backdrop-opacity-100' }));
      expect(parseUtility('backdrop-opacity-[.25]')).toEqual(baseUtility({ prefix: 'backdrop-opacity', value: '[.25]', raw: 'backdrop-opacity-[.25]' }));
      expect(parseUtility('backdrop-opacity-')).toEqual({ type: 'unknown', raw: 'backdrop-opacity-' });
      expect(parseUtility('backdrop-opacity-foo')).toEqual({ type: 'unknown', raw: 'backdrop-opacity-foo' });
    });
  });

  describe('backdrop-saturate', () => {
    it('should parse Tailwind v4 backdrop-saturate classes', () => {
      expect(parseUtility('backdrop-saturate-50')).toEqual(baseUtility({ prefix: 'backdrop-saturate', value: '50', raw: 'backdrop-saturate-50' }));
      expect(parseUtility('backdrop-saturate-200')).toEqual(baseUtility({ prefix: 'backdrop-saturate', value: '200', raw: 'backdrop-saturate-200' }));
      expect(parseUtility('backdrop-saturate-[.25]')).toEqual(baseUtility({ prefix: 'backdrop-saturate', value: '[.25]', raw: 'backdrop-saturate-[.25]' }));
      expect(parseUtility('backdrop-saturate-')).toEqual({ type: 'unknown', raw: 'backdrop-saturate-' });
      expect(parseUtility('backdrop-saturate-foo')).toEqual({ type: 'unknown', raw: 'backdrop-saturate-foo' });
    });
  });

  describe('backdrop-sepia', () => {
    it('should parse Tailwind v4 backdrop-sepia classes', () => {
      expect(parseUtility('backdrop-sepia')).toEqual(baseUtility({ prefix: 'backdrop-sepia', raw: 'backdrop-sepia' }));
      expect(parseUtility('backdrop-sepia-0')).toEqual(baseUtility({ prefix: 'backdrop-sepia', value: '0', raw: 'backdrop-sepia-0' }));
      expect(parseUtility('backdrop-sepia-')).toEqual({ type: 'unknown', raw: 'backdrop-sepia-' });
      expect(parseUtility('backdrop-sepia-foo')).toEqual({ type: 'unknown', raw: 'backdrop-sepia-foo' });
    });
  });

  describe('backdrop-filter', () => {
    it('should parse Tailwind v4 backdrop-filter classes', () => {
      expect(parseUtility('backdrop-filter')).toEqual(baseUtility({ prefix: 'backdrop-filter', raw: 'backdrop-filter' }));
      expect(parseUtility('backdrop-filter-none')).toEqual(baseUtility({ prefix: 'backdrop-filter', value: 'none', raw: 'backdrop-filter-none' }));
      expect(parseUtility('backdrop-filter-')).toEqual({ type: 'unknown', raw: 'backdrop-filter-' });
      expect(parseUtility('backdrop-filter-foo')).toEqual({ type: 'unknown', raw: 'backdrop-filter-foo' });
    });
  });
}); 
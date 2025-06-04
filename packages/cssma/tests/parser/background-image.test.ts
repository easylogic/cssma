import { describe, test, expect } from 'vitest';
import { parseBackgroundStyleValue } from '../../src/parser/background';

describe('Background Image Parser', () => {
  
  describe('URL-based images', () => {
    test('should parse URL with quotes', () => {
      const result = parseBackgroundStyleValue('bg-[url("/assets/image.jpg")]');
      expect(result).toEqual({
        property: 'backgroundImage',
        value: '/assets/image.jpg',
        variant: 'arbitrary'
      });
    });

    test('should parse URL without quotes', () => {
      const result = parseBackgroundStyleValue('bg-[url(/assets/image.jpg)]');
      expect(result).toEqual({
        property: 'backgroundImage',
        value: '/assets/image.jpg',
        variant: 'arbitrary'
      });
    });

    test('should parse absolute URL', () => {
      const result = parseBackgroundStyleValue('bg-[url(https://example.com/image.png)]');
      expect(result).toEqual({
        property: 'backgroundImage',
        value: 'https://example.com/image.png',
        variant: 'arbitrary'
      });
    });

    test('should parse data URL', () => {
      const result = parseBackgroundStyleValue('bg-[data:image/png;base64,iVBORw0KGgoAAAA...]');
      expect(result).toEqual({
        property: 'backgroundImage',
        value: 'data:image/png;base64,iVBORw0KGgoAAAA...',
        variant: 'arbitrary'
      });
    });

    test('should parse direct image path', () => {
      const result = parseBackgroundStyleValue('bg-[/image.jpg]');
      expect(result).toEqual({
        property: 'backgroundImage',
        value: '/image.jpg',
        variant: 'arbitrary'
      });
    });
  });

  describe('Background size properties', () => {
    test('should parse bg-cover', () => {
      const result = parseBackgroundStyleValue('bg-cover');
      expect(result).toEqual({
        property: 'backgroundSize',
        value: 'COVER',
        variant: 'preset'
      });
    });

    test('should parse bg-contain', () => {
      const result = parseBackgroundStyleValue('bg-contain');
      expect(result).toEqual({
        property: 'backgroundSize',
        value: 'CONTAIN',
        variant: 'preset'
      });
    });

    test('should parse bg-auto', () => {
      const result = parseBackgroundStyleValue('bg-auto');
      expect(result).toEqual({
        property: 'backgroundSize',
        value: 'AUTO',
        variant: 'preset'
      });
    });
  });

  describe('Background repeat properties', () => {
    test('should parse bg-repeat', () => {
      const result = parseBackgroundStyleValue('bg-repeat');
      expect(result).toEqual({
        property: 'backgroundRepeat',
        value: 'REPEAT',
        variant: 'preset'
      });
    });

    test('should parse bg-no-repeat', () => {
      const result = parseBackgroundStyleValue('bg-no-repeat');
      expect(result).toEqual({
        property: 'backgroundRepeat',
        value: 'NO_REPEAT',
        variant: 'preset'
      });
    });
  });

  describe('Background position properties', () => {
    test('should parse bg-center', () => {
      const result = parseBackgroundStyleValue('bg-center');
      expect(result).toEqual({
        property: 'backgroundPosition',
        value: 'CENTER',
        variant: 'preset'
      });
    });

    test('should parse bg-top', () => {
      const result = parseBackgroundStyleValue('bg-top');
      expect(result).toEqual({
        property: 'backgroundPosition',
        value: 'TOP',
        variant: 'preset'
      });
    });

    test('should parse bg-bottom', () => {
      const result = parseBackgroundStyleValue('bg-bottom');
      expect(result).toEqual({
        property: 'backgroundPosition',
        value: 'BOTTOM',
        variant: 'preset'
      });
    });

    test('should parse bg-left', () => {
      const result = parseBackgroundStyleValue('bg-left');
      expect(result).toEqual({
        property: 'backgroundPosition',
        value: 'LEFT',
        variant: 'preset'
      });
    });

    test('should parse bg-right', () => {
      const result = parseBackgroundStyleValue('bg-right');
      expect(result).toEqual({
        property: 'backgroundPosition',
        value: 'RIGHT',
        variant: 'preset'
      });
    });
  });

  describe('Opacity support', () => {
    test('should parse background image with opacity', () => {
      const result = parseBackgroundStyleValue('bg-[url(/image.jpg)]/50');
      expect(result).toEqual({
        property: 'backgroundImage',
        value: '/image.jpg',
        variant: 'arbitrary',
        opacity: 0.5
      });
    });
  });

  describe('Edge cases', () => {
    test('should return null for invalid patterns', () => {
      expect(parseBackgroundStyleValue('bg-invalid')).toBeNull();
      expect(parseBackgroundStyleValue('not-bg-class')).toBeNull();
      expect(parseBackgroundStyleValue('bg-[]')).toBeNull();
    });

    test('should prioritize URL over color for mixed content', () => {
      const result = parseBackgroundStyleValue('bg-[url(/image.jpg)]');
      expect(result?.property).toBe('backgroundImage');
    });
  });
}); 
import { describe, test, expect } from 'vitest';
import { TransitionsParser } from '../../src/core/parsers/transitions-parser';

describe('TransitionsParser', () => {
  describe('parse method', () => {
    test('should parse transition properties', () => {
      expect(TransitionsParser.parse('transition')).toEqual({
        property: 'transitionProperty',
        value: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('transition-all')).toEqual({
        property: 'transitionProperty',
        value: 'all',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('transition-none')).toEqual({
        property: 'transitionProperty',
        value: 'none',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('transition-colors')).toEqual({
        property: 'transitionProperty',
        value: 'color, background-color, border-color, text-decoration-color, fill, stroke',
        variant: 'preset'
      });
    });

    test('should parse duration values', () => {
      expect(TransitionsParser.parse('duration-300')).toEqual({
        property: 'transitionDuration',
        value: '300ms',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('duration-1000')).toEqual({
        property: 'transitionDuration',
        value: '1000ms',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('duration-0')).toEqual({
        property: 'transitionDuration',
        value: '0s',
        variant: 'preset'
      });
    });

    test('should parse delay values', () => {
      expect(TransitionsParser.parse('delay-150')).toEqual({
        property: 'transitionDelay',
        value: '150ms',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('delay-700')).toEqual({
        property: 'transitionDelay',
        value: '700ms',
        variant: 'preset'
      });
    });

    test('should parse timing functions', () => {
      expect(TransitionsParser.parse('ease-linear')).toEqual({
        property: 'transitionTimingFunction',
        value: 'linear',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('ease-in')).toEqual({
        property: 'transitionTimingFunction',
        value: 'cubic-bezier(0.4, 0, 1, 1)',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('ease-out')).toEqual({
        property: 'transitionTimingFunction',
        value: 'cubic-bezier(0, 0, 0.2, 1)',
        variant: 'preset'
      });

      expect(TransitionsParser.parse('ease-in-out')).toEqual({
        property: 'transitionTimingFunction',
        value: 'cubic-bezier(0.4, 0, 0.2, 1)',
        variant: 'preset'
      });
    });

    test('should parse arbitrary duration values', () => {
      expect(TransitionsParser.parse('duration-[250ms]')).toEqual({
        property: 'transitionDuration',
        value: '250ms',
        variant: 'arbitrary'
      });

      expect(TransitionsParser.parse('duration-[2s]')).toEqual({
        property: 'transitionDuration',
        value: '2s',
        variant: 'arbitrary'
      });

      expect(TransitionsParser.parse('duration-[500]')).toEqual({
        property: 'transitionDuration',
        value: '500ms',
        variant: 'arbitrary'
      });
    });

    test('should parse arbitrary delay values', () => {
      expect(TransitionsParser.parse('delay-[100ms]')).toEqual({
        property: 'transitionDelay',
        value: '100ms',
        variant: 'arbitrary'
      });

      expect(TransitionsParser.parse('delay-[1.5s]')).toEqual({
        property: 'transitionDelay',
        value: '1.5s',
        variant: 'arbitrary'
      });
    });

    test('should return null for invalid classes', () => {
      expect(TransitionsParser.parse('invalid-class')).toBeNull();
      expect(TransitionsParser.parse('duration-invalid')).toBeNull();
      expect(TransitionsParser.parse('delay-[invalid]')).toBeNull();
    });
  });

  describe('applyTransitionsStyle method', () => {
    test('should apply transition property correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'transition-all',
        value: '',
        baseClassName: 'transition-all'
      };

      TransitionsParser.applyTransitionsStyle(parsedClass, styles, {});

      expect(styles.transitions).toEqual({
        transitionProperty: 'all'
      });
    });

    test('should apply duration correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'duration',
        value: '300',
        baseClassName: 'duration-300'
      };

      TransitionsParser.applyTransitionsStyle(parsedClass, styles, {});

      expect(styles.transitions).toEqual({
        transitionDuration: '300ms'
      });
    });

    test('should apply timing function correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'ease-in-out',
        value: '',
        baseClassName: 'ease-in-out'
      };

      TransitionsParser.applyTransitionsStyle(parsedClass, styles, {});

      expect(styles.transitions).toEqual({
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });
    });

    test('should accumulate multiple transition properties', () => {
      const styles: any = { transitions: {} };
      
      // Apply transition property
      TransitionsParser.applyTransitionsStyle({
        property: 'transition-all',
        value: '',
        baseClassName: 'transition-all'
      }, styles, {});

      // Apply duration
      TransitionsParser.applyTransitionsStyle({
        property: 'duration',
        value: '300',
        baseClassName: 'duration-300'
      }, styles, {});

      // Apply timing function
      TransitionsParser.applyTransitionsStyle({
        property: 'ease-in-out',
        value: '',
        baseClassName: 'ease-in-out'
      }, styles, {});

      expect(styles.transitions).toEqual({
        transitionProperty: 'all',
        transitionDuration: '300ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });
    });
  });
}); 
/**
 * BlendModesParser Tests
 */

import { BlendModesParser } from '../../src/core/parsers/blend-modes-parser';

describe('BlendModesParser', () => {
  describe('parse method', () => {
    test('should parse mix-blend-mode utilities', () => {
      expect(BlendModesParser.parse('mix-blend-normal')).toEqual({
        property: 'mixBlendMode',
        value: 'normal',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-multiply')).toEqual({
        property: 'mixBlendMode',
        value: 'multiply',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-screen')).toEqual({
        property: 'mixBlendMode',
        value: 'screen',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-overlay')).toEqual({
        property: 'mixBlendMode',
        value: 'overlay',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-darken')).toEqual({
        property: 'mixBlendMode',
        value: 'darken',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-lighten')).toEqual({
        property: 'mixBlendMode',
        value: 'lighten',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-color-dodge')).toEqual({
        property: 'mixBlendMode',
        value: 'color-dodge',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-color-burn')).toEqual({
        property: 'mixBlendMode',
        value: 'color-burn',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-hard-light')).toEqual({
        property: 'mixBlendMode',
        value: 'hard-light',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-soft-light')).toEqual({
        property: 'mixBlendMode',
        value: 'soft-light',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-difference')).toEqual({
        property: 'mixBlendMode',
        value: 'difference',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-exclusion')).toEqual({
        property: 'mixBlendMode',
        value: 'exclusion',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-hue')).toEqual({
        property: 'mixBlendMode',
        value: 'hue',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-saturation')).toEqual({
        property: 'mixBlendMode',
        value: 'saturation',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-color')).toEqual({
        property: 'mixBlendMode',
        value: 'color',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('mix-blend-luminosity')).toEqual({
        property: 'mixBlendMode',
        value: 'luminosity',
        variant: 'preset'
      });
    });

    test('should parse background-blend-mode utilities', () => {
      expect(BlendModesParser.parse('bg-blend-normal')).toEqual({
        property: 'backgroundBlendMode',
        value: 'normal',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-multiply')).toEqual({
        property: 'backgroundBlendMode',
        value: 'multiply',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-screen')).toEqual({
        property: 'backgroundBlendMode',
        value: 'screen',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-overlay')).toEqual({
        property: 'backgroundBlendMode',
        value: 'overlay',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-darken')).toEqual({
        property: 'backgroundBlendMode',
        value: 'darken',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-lighten')).toEqual({
        property: 'backgroundBlendMode',
        value: 'lighten',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-color-dodge')).toEqual({
        property: 'backgroundBlendMode',
        value: 'color-dodge',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-color-burn')).toEqual({
        property: 'backgroundBlendMode',
        value: 'color-burn',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-hard-light')).toEqual({
        property: 'backgroundBlendMode',
        value: 'hard-light',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-soft-light')).toEqual({
        property: 'backgroundBlendMode',
        value: 'soft-light',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-difference')).toEqual({
        property: 'backgroundBlendMode',
        value: 'difference',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-exclusion')).toEqual({
        property: 'backgroundBlendMode',
        value: 'exclusion',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-hue')).toEqual({
        property: 'backgroundBlendMode',
        value: 'hue',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-saturation')).toEqual({
        property: 'backgroundBlendMode',
        value: 'saturation',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-color')).toEqual({
        property: 'backgroundBlendMode',
        value: 'color',
        variant: 'preset'
      });

      expect(BlendModesParser.parse('bg-blend-luminosity')).toEqual({
        property: 'backgroundBlendMode',
        value: 'luminosity',
        variant: 'preset'
      });
    });

    test('should return null for non-blend classes', () => {
      expect(BlendModesParser.parse('text-red-500')).toBeNull();
      expect(BlendModesParser.parse('bg-blue-500')).toBeNull();
      expect(BlendModesParser.parse('p-4')).toBeNull();
      expect(BlendModesParser.parse('invalid-class')).toBeNull();
    });

    test('should return null for invalid blend modes', () => {
      expect(BlendModesParser.parse('mix-blend-invalid')).toBeNull();
      expect(BlendModesParser.parse('bg-blend-invalid')).toBeNull();
    });
  });

  describe('applyBlendModesStyle method', () => {
    test('should apply mix-blend-mode styles', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'mixBlendMode',
        value: 'multiply',
        baseClassName: 'mix-blend-multiply'
      };

      BlendModesParser.applyBlendModesStyle(parsedClass, styles, {});

      expect(styles.blendModes).toEqual({
        mixBlendMode: 'multiply'
      });
    });

    test('should apply background-blend-mode styles', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'backgroundBlendMode',
        value: 'screen',
        baseClassName: 'bg-blend-screen'
      };

      BlendModesParser.applyBlendModesStyle(parsedClass, styles, {});

      expect(styles.blendModes).toEqual({
        backgroundBlendMode: 'screen'
      });
    });

    test('should not overwrite existing blend mode styles', () => {
      const styles: any = {
        blendModes: {
          mixBlendMode: 'existing'
        }
      };
      const parsedClass = {
        property: 'backgroundBlendMode',
        value: 'overlay',
        baseClassName: 'bg-blend-overlay'
      };

      BlendModesParser.applyBlendModesStyle(parsedClass, styles, {});

      expect(styles.blendModes).toEqual({
        mixBlendMode: 'existing',
        backgroundBlendMode: 'overlay'
      });
    });

    test('should handle invalid base class names', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'invalid',
        value: 'invalid',
        baseClassName: 'invalid-class'
      };

      BlendModesParser.applyBlendModesStyle(parsedClass, styles, {});

      expect(styles.blendModes).toBeUndefined();
    });
  });
}); 
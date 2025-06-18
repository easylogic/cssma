import { describe, test, expect } from 'vitest';
import { BackgroundsParser } from '../../src/core/parsers/backgrounds-parser';

describe('BackgroundsParser', () => {
  describe('parse method', () => {
    test('should parse background size utilities', () => {
      expect(BackgroundsParser.parse('bg-auto')).toEqual({
        property: 'backgroundSize',
        value: 'auto',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-cover')).toEqual({
        property: 'backgroundSize',
        value: 'cover',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-contain')).toEqual({
        property: 'backgroundSize',
        value: 'contain',
        variant: 'preset'
      });
    });

    test('should parse background position utilities', () => {
      expect(BackgroundsParser.parse('bg-center')).toEqual({
        property: 'backgroundPosition',
        value: 'center',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-top')).toEqual({
        property: 'backgroundPosition',
        value: 'top',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-left-bottom')).toEqual({
        property: 'backgroundPosition',
        value: 'left bottom',
        variant: 'preset'
      });
    });

    test('should parse background repeat utilities', () => {
      expect(BackgroundsParser.parse('bg-repeat')).toEqual({
        property: 'backgroundRepeat',
        value: 'repeat',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-no-repeat')).toEqual({
        property: 'backgroundRepeat',
        value: 'no-repeat',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-repeat-x')).toEqual({
        property: 'backgroundRepeat',
        value: 'repeat-x',
        variant: 'preset'
      });
    });

    test('should parse background attachment utilities', () => {
      expect(BackgroundsParser.parse('bg-fixed')).toEqual({
        property: 'backgroundAttachment',
        value: 'fixed',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-local')).toEqual({
        property: 'backgroundAttachment',
        value: 'local',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-scroll')).toEqual({
        property: 'backgroundAttachment',
        value: 'scroll',
        variant: 'preset'
      });
    });

    test('should parse background clip utilities', () => {
      expect(BackgroundsParser.parse('bg-clip-border')).toEqual({
        property: 'backgroundClip',
        value: 'border-box',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-clip-padding')).toEqual({
        property: 'backgroundClip',
        value: 'padding-box',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-clip-text')).toEqual({
        property: 'backgroundClip',
        value: 'text',
        variant: 'preset'
      });
    });

    test('should parse gradient utilities', () => {
      expect(BackgroundsParser.parse('bg-gradient-to-r')).toEqual({
        property: 'backgroundImage',
        value: 'linear-gradient(to right, var(--tw-gradient-stops))',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-gradient-to-bl')).toEqual({
        property: 'backgroundImage',
        value: 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
        variant: 'preset'
      });
    });

    test('should parse gradient color stops', () => {
      expect(BackgroundsParser.parse('from-blue-500')).toEqual({
        property: '--tw-gradient-from',
        value: 'var(--color-blue-500)',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('via-purple-400')).toEqual({
        property: '--tw-gradient-via',
        value: 'var(--color-purple-400)',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('to-pink-400')).toEqual({
        property: '--tw-gradient-to',
        value: 'var(--color-pink-400)',
        variant: 'preset'
      });
    });

    test('should parse background colors', () => {
      expect(BackgroundsParser.parse('bg-blue-500')).toEqual({
        property: 'backgroundColor',
        value: 'var(--color-blue-500)',
        variant: 'preset'
      });

      expect(BackgroundsParser.parse('bg-transparent')).toEqual({
        property: 'backgroundColor',
        value: 'transparent',
        variant: 'preset'
      });
    });

    test('should parse arbitrary background values', () => {
      expect(BackgroundsParser.parse('bg-[url("/image.jpg")]')).toEqual({
        property: 'backgroundImage',
        value: 'url("/image.jpg")',
        variant: 'arbitrary'
      });

      expect(BackgroundsParser.parse('bg-[#ff6b35]')).toEqual({
        property: 'backgroundColor',
        value: '#ff6b35',
        variant: 'arbitrary'
      });
    });

    test('should return null for invalid classes', () => {
      expect(BackgroundsParser.parse('invalid-class')).toBeNull();
      expect(BackgroundsParser.parse('text-blue-500')).toBeNull();
    });
  });

  describe('applyBackgroundsStyle method', () => {
    test('should apply background size correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'bg-cover',
        value: '',
        baseClassName: 'bg-cover'
      };

      BackgroundsParser.applyBackgroundsStyle(parsedClass, styles, {});

      expect(styles.backgrounds).toEqual({
        backgroundSize: 'cover'
      });
    });

    test('should apply background position correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'bg-center',
        value: '',
        baseClassName: 'bg-center'
      };

      BackgroundsParser.applyBackgroundsStyle(parsedClass, styles, {});

      expect(styles.backgrounds).toEqual({
        backgroundPosition: 'center'
      });
    });

    test('should accumulate multiple background properties', () => {
      const styles: any = { backgrounds: {} };
      
      // Apply background size
      BackgroundsParser.applyBackgroundsStyle({
        property: 'bg-cover',
        value: '',
        baseClassName: 'bg-cover'
      }, styles, {});

      // Apply background position
      BackgroundsParser.applyBackgroundsStyle({
        property: 'bg-center',
        value: '',
        baseClassName: 'bg-center'
      }, styles, {});

      expect(styles.backgrounds).toEqual({
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      });
    });
  });
}); 
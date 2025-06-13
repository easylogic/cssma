import { parseAnimationClassName } from '../../src/parser/class-names/animation';

describe('parseAnimationClassName', () => {
  describe('transition classes', () => {
    test('parses transition', () => {
      const result = parseAnimationClassName('transition');
      expect(result).toEqual({
        className: 'transition',
        property: 'transition-property',
        value: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        variant: 'preset',
      });
    });

    test('parses transition-none', () => {
      const result = parseAnimationClassName('transition-none');
      expect(result).toEqual({
        className: 'transition-none',
        property: 'transition-property',
        value: 'none',
        variant: 'preset',
      });
    });

    test('parses transition-all', () => {
      const result = parseAnimationClassName('transition-all');
      expect(result).toEqual({
        className: 'transition-all',
        property: 'transition-property',
        value: 'all',
        variant: 'preset',
      });
    });

    test('parses transition-colors', () => {
      const result = parseAnimationClassName('transition-colors');
      expect(result).toEqual({
        className: 'transition-colors',
        property: 'transition-property',
        value: 'color, background-color, border-color, text-decoration-color, fill, stroke',
        variant: 'preset',
      });
    });

    test('parses transition-opacity', () => {
      const result = parseAnimationClassName('transition-opacity');
      expect(result).toEqual({
        className: 'transition-opacity',
        property: 'transition-property',
        value: 'opacity',
        variant: 'preset',
      });
    });

    test('parses transition-shadow', () => {
      const result = parseAnimationClassName('transition-shadow');
      expect(result).toEqual({
        className: 'transition-shadow',
        property: 'transition-property',
        value: 'box-shadow',
        variant: 'preset',
      });
    });

    test('parses transition-transform', () => {
      const result = parseAnimationClassName('transition-transform');
      expect(result).toEqual({
        className: 'transition-transform',
        property: 'transition-property',
        value: 'transform',
        variant: 'preset',
      });
    });
  });

  describe('duration classes', () => {
    test('parses duration-0', () => {
      const result = parseAnimationClassName('duration-0');
      expect(result).toEqual({
        className: 'duration-0',
        property: 'transition-duration',
        value: '0s',
        variant: 'preset',
      });
    });

    test('parses duration-75', () => {
      const result = parseAnimationClassName('duration-75');
      expect(result).toEqual({
        className: 'duration-75',
        property: 'transition-duration',
        value: '75ms',
        variant: 'preset',
      });
    });

    test('parses duration-300', () => {
      const result = parseAnimationClassName('duration-300');
      expect(result).toEqual({
        className: 'duration-300',
        property: 'transition-duration',
        value: '300ms',
        variant: 'preset',
      });
    });

    test('parses duration-1000', () => {
      const result = parseAnimationClassName('duration-1000');
      expect(result).toEqual({
        className: 'duration-1000',
        property: 'transition-duration',
        value: '1000ms',
        variant: 'preset',
      });
    });

    test('parses arbitrary duration with ms', () => {
      const result = parseAnimationClassName('duration-[250ms]');
      expect(result).toEqual({
        className: 'duration-[250ms]',
        property: 'transition-duration',
        value: '250ms',
        variant: 'arbitrary',
      });
    });

    test('parses arbitrary duration with s', () => {
      const result = parseAnimationClassName('duration-[2s]');
      expect(result).toEqual({
        className: 'duration-[2s]',
        property: 'transition-duration',
        value: '2s',
        variant: 'arbitrary',
      });
    });

    test('parses arbitrary duration without unit (adds ms)', () => {
      const result = parseAnimationClassName('duration-[400]');
      expect(result).toEqual({
        className: 'duration-[400]',
        property: 'transition-duration',
        value: '400ms',
        variant: 'arbitrary',
      });
    });
  });

  describe('delay classes', () => {
    test('parses delay-0', () => {
      const result = parseAnimationClassName('delay-0');
      expect(result).toEqual({
        className: 'delay-0',
        property: 'transition-delay',
        value: '0s',
        variant: 'preset',
      });
    });

    test('parses delay-150', () => {
      const result = parseAnimationClassName('delay-150');
      expect(result).toEqual({
        className: 'delay-150',
        property: 'transition-delay',
        value: '150ms',
        variant: 'preset',
      });
    });

    test('parses arbitrary delay', () => {
      const result = parseAnimationClassName('delay-[500ms]');
      expect(result).toEqual({
        className: 'delay-[500ms]',
        property: 'transition-delay',
        value: '500ms',
        variant: 'arbitrary',
      });
    });
  });

  describe('easing classes', () => {
    test('parses ease-linear', () => {
      const result = parseAnimationClassName('ease-linear');
      expect(result).toEqual({
        className: 'ease-linear',
        property: 'transition-timing-function',
        value: 'linear',
        variant: 'preset',
      });
    });

    test('parses ease-in', () => {
      const result = parseAnimationClassName('ease-in');
      expect(result).toEqual({
        className: 'ease-in',
        property: 'transition-timing-function',
        value: 'cubic-bezier(0.4, 0, 1, 1)',
        variant: 'preset',
      });
    });

    test('parses ease-out', () => {
      const result = parseAnimationClassName('ease-out');
      expect(result).toEqual({
        className: 'ease-out',
        property: 'transition-timing-function',
        value: 'cubic-bezier(0, 0, 0.2, 1)',
        variant: 'preset',
      });
    });

    test('parses ease-in-out', () => {
      const result = parseAnimationClassName('ease-in-out');
      expect(result).toEqual({
        className: 'ease-in-out',
        property: 'transition-timing-function',
        value: 'cubic-bezier(0.4, 0, 0.2, 1)',
        variant: 'preset',
      });
    });
  });

  describe('animate classes', () => {
    test('parses animate-none', () => {
      const result = parseAnimationClassName('animate-none');
      expect(result).toEqual({
        className: 'animate-none',
        property: 'animation',
        value: 'none',
        variant: 'preset',
      });
    });

    test('parses animate-spin', () => {
      const result = parseAnimationClassName('animate-spin');
      expect(result).toEqual({
        className: 'animate-spin',
        property: 'animation',
        value: 'spin 1s linear infinite',
        variant: 'preset',
      });
    });

    test('parses animate-ping', () => {
      const result = parseAnimationClassName('animate-ping');
      expect(result).toEqual({
        className: 'animate-ping',
        property: 'animation',
        value: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        variant: 'preset',
      });
    });

    test('parses animate-pulse', () => {
      const result = parseAnimationClassName('animate-pulse');
      expect(result).toEqual({
        className: 'animate-pulse',
        property: 'animation',
        value: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        variant: 'preset',
      });
    });

    test('parses animate-bounce', () => {
      const result = parseAnimationClassName('animate-bounce');
      expect(result).toEqual({
        className: 'animate-bounce',
        property: 'animation',
        value: 'bounce 1s infinite',
        variant: 'preset',
      });
    });
  });

  describe('invalid classes', () => {
    test('returns null for non-animation classes', () => {
      expect(parseAnimationClassName('text-red-500')).toBeNull();
      expect(parseAnimationClassName('bg-blue-200')).toBeNull();
      expect(parseAnimationClassName('p-4')).toBeNull();
    });

    test('returns null for invalid animation classes', () => {
      expect(parseAnimationClassName('transition-invalid')).toBeNull();
      expect(parseAnimationClassName('duration-invalid')).toBeNull();
      expect(parseAnimationClassName('animate-invalid')).toBeNull();
    });

    test('returns null for invalid duration values', () => {
      expect(parseAnimationClassName('duration-999')).toBeNull();
      expect(parseAnimationClassName('duration-abc')).toBeNull();
    });
  });
}); 
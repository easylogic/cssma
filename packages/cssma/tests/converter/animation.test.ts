import { convertAnimationToCSS, ANIMATION_KEYFRAMES } from '../../src/converter/css/animation';
import { ParsedClassName } from '../../src/types';

describe('convertAnimationToCSS', () => {
  describe('transition properties', () => {
    test('converts simple transition', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition',
          property: 'transition-property',
          value: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe(
        'transition: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;'
      );
    });

    test('converts transition with duration', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-all',
          property: 'transition-property',
          value: 'all',
          variant: 'preset',
        },
        {
          className: 'duration-300',
          property: 'transition-duration',
          value: '300ms',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s;');
    });

    test('converts animate-spin', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'animate-spin',
          property: 'animation',
          value: 'spin 1s linear infinite',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('animation: spin 1s linear infinite;');
    });

    test('returns empty string when no animation styles', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'text-red-500',
          property: 'color',
          value: '#ef4444',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('');
    });
  });
});

describe('ANIMATION_KEYFRAMES', () => {
  test('contains spin keyframe', () => {
    expect(ANIMATION_KEYFRAMES).toContain('@keyframes spin');
    expect(ANIMATION_KEYFRAMES).toContain('from { transform: rotate(0deg); }');
    expect(ANIMATION_KEYFRAMES).toContain('to { transform: rotate(360deg); }');
  });
}); 
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

    test('converts transition with all properties', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-colors',
          property: 'transition-property',
          value: 'color, background-color, border-color, text-decoration-color, fill, stroke',
          variant: 'preset',
        },
        {
          className: 'duration-500',
          property: 'transition-duration',
          value: '500ms',
          variant: 'preset',
        },
        {
          className: 'delay-100',
          property: 'transition-delay',
          value: '100ms',
          variant: 'preset',
        },
        {
          className: 'ease-in-out',
          property: 'transition-timing-function',
          value: 'cubic-bezier(0.4, 0, 0.2, 1)',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe(
        'transition: color, background-color, border-color, text-decoration-color, fill, stroke 500ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;'
      );
    });

    test('converts transition-none', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-none',
          property: 'transition-property',
          value: 'none',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('transition: none;');
    });

    test('converts multiple animations', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'animate-spin',
          property: 'animation',
          value: 'spin 1s linear infinite',
          variant: 'preset',
        },
        {
          className: 'animate-pulse',
          property: 'animation',
          value: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe(
        'animation: spin 1s linear infinite;\nanimation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;'
      );
    });

    test('converts animate-none', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'animate-none',
          property: 'animation',
          value: 'none',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('animation: none;');
    });

    test('handles arbitrary duration values', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-all',
          property: 'transition-property',
          value: 'all',
          variant: 'preset',
        },
        {
          className: 'duration-[250ms]',
          property: 'transition-duration',
          value: '250ms',
          variant: 'arbitrary',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;');
    });

    test('handles arbitrary delay values', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-opacity',
          property: 'transition-property',
          value: 'opacity',
          variant: 'preset',
        },
        {
          className: 'delay-[1.5s]',
          property: 'transition-delay',
          value: '1.5s',
          variant: 'arbitrary',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 1.5s;');
    });

    test('handles mixed transition and animation styles', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-transform',
          property: 'transition-property',
          value: 'transform',
          variant: 'preset',
        },
        {
          className: 'duration-300',
          property: 'transition-duration',
          value: '300ms',
          variant: 'preset',
        },
        {
          className: 'animate-bounce',
          property: 'animation',
          value: 'bounce 1s infinite',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe(
        'transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s;\nanimation: bounce 1s infinite;'
      );
    });

    test('handles multiple transition properties', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-colors',
          property: 'transition-property',
          value: 'color, background-color, border-color, text-decoration-color, fill, stroke',
          variant: 'preset',
        },
        {
          className: 'transition-transform',
          property: 'transition-property',
          value: 'transform',
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      // Should combine all transition properties with comma
      expect(result).toBe(
        'transition: color, background-color, border-color, text-decoration-color, fill, stroke, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;'
      );
    });

    test('handles different easing functions', () => {
      const easingTests = [
        { className: 'ease-linear', value: 'linear' },
        { className: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
        { className: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
        { className: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      ];

      easingTests.forEach(({ className, value }) => {
        const styles: ParsedClassName[] = [
          {
            className: 'transition-all',
            property: 'transition-property',
            value: 'all',
            variant: 'preset',
          },
          {
            className,
            property: 'transition-timing-function',
            value,
            variant: 'preset',
          },
        ];

        const result = convertAnimationToCSS(styles);
        expect(result).toBe(`transition: all 150ms ${value} 0s;`);
      });
    });
  });

  describe('edge cases and error handling', () => {
    test('handles empty styles array', () => {
      const result = convertAnimationToCSS([]);
      expect(result).toBe('');
    });

    test('handles non-string values', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-all',
          property: 'transition-property',
          value: 123 as any,
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('transition: 123 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;');
    });

    test('handles undefined values gracefully', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-all',
          property: 'transition-property',
          value: undefined as any,
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('transition: undefined 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;');
    });

    test('handles null values gracefully', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'transition-all',
          property: 'transition-property',
          value: null as any,
          variant: 'preset',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('transition: null 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;');
    });

    test('handles very long property values', () => {
      const longValue = 'property'.repeat(100);
      const styles: ParsedClassName[] = [
        {
          className: 'transition-custom',
          property: 'transition-property',
          value: longValue,
          variant: 'arbitrary',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toContain(longValue);
    });

    test('handles special characters in values', () => {
      const styles: ParsedClassName[] = [
        {
          className: 'animate-custom',
          property: 'animation',
          value: 'custom-animation 1s ease-in-out infinite',
          variant: 'arbitrary',
        },
      ];

      const result = convertAnimationToCSS(styles);
      expect(result).toBe('animation: custom-animation 1s ease-in-out infinite;');
    });
  });

  describe('performance tests', () => {
    test('handles large number of styles efficiently', () => {
      const styles: ParsedClassName[] = [];
      
      for (let i = 0; i < 1000; i++) {
        styles.push({
          className: `animate-spin-${i}`,
          property: 'animation',
          value: `spin-${i} 1s linear infinite`,
          variant: 'preset',
        });
      }

      const start = performance.now();
      const result = convertAnimationToCSS(styles);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100);
      expect(result.split('\n')).toHaveLength(1000);
    });

    test('handles complex transition combinations efficiently', () => {
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
        {
          className: 'delay-100',
          property: 'transition-delay',
          value: '100ms',
          variant: 'preset',
        },
        {
          className: 'ease-in-out',
          property: 'transition-timing-function',
          value: 'cubic-bezier(0.4, 0, 0.2, 1)',
          variant: 'preset',
        },
      ];

      const start = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        convertAnimationToCSS(styles);
      }
      
      const end = performance.now();
      expect(end - start).toBeLessThan(100);
    });
  });
});

describe('ANIMATION_KEYFRAMES', () => {
  test('contains spin keyframe', () => {
    expect(ANIMATION_KEYFRAMES).toContain('@keyframes spin');
    expect(ANIMATION_KEYFRAMES).toContain('from { transform: rotate(0deg); }');
    expect(ANIMATION_KEYFRAMES).toContain('to { transform: rotate(360deg); }');
  });

  test('contains ping keyframe', () => {
    expect(ANIMATION_KEYFRAMES).toContain('@keyframes ping');
    expect(ANIMATION_KEYFRAMES).toContain('75%, 100%');
    expect(ANIMATION_KEYFRAMES).toContain('transform: scale(2)');
    expect(ANIMATION_KEYFRAMES).toContain('opacity: 0');
  });

  test('contains pulse keyframe', () => {
    expect(ANIMATION_KEYFRAMES).toContain('@keyframes pulse');
    expect(ANIMATION_KEYFRAMES).toContain('50%');
    expect(ANIMATION_KEYFRAMES).toContain('opacity: .5');
  });

  test('contains bounce keyframe', () => {
    expect(ANIMATION_KEYFRAMES).toContain('@keyframes bounce');
    expect(ANIMATION_KEYFRAMES).toContain('0%, 100%');
    expect(ANIMATION_KEYFRAMES).toContain('transform: translateY(-25%)');
    expect(ANIMATION_KEYFRAMES).toContain('animation-timing-function: cubic-bezier(0.8,0,1,1)');
    expect(ANIMATION_KEYFRAMES).toContain('50%');
    expect(ANIMATION_KEYFRAMES).toContain('transform: none');
    expect(ANIMATION_KEYFRAMES).toContain('animation-timing-function: cubic-bezier(0,0,0.2,1)');
  });

  test('keyframes are properly formatted', () => {
    expect(ANIMATION_KEYFRAMES).not.toContain(';;');
    expect(ANIMATION_KEYFRAMES).not.toContain('{}');
    
    const openBraces = (ANIMATION_KEYFRAMES.match(/{/g) || []).length;
    const closeBraces = (ANIMATION_KEYFRAMES.match(/}/g) || []).length;
    expect(openBraces).toBe(closeBraces);
  });

  test('contains all required animations', () => {
    const requiredAnimations = ['spin', 'ping', 'pulse', 'bounce'];
    
    requiredAnimations.forEach(animation => {
      expect(ANIMATION_KEYFRAMES).toContain(`@keyframes ${animation}`);
    });
  });
}); 
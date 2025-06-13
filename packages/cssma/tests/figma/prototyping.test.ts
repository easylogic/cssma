import { 
  convertAnimationToFigmaReactions, 
  generatePrototypeSuggestions,
  FigmaReaction 
} from '../../src/figma/prototyping';
import { ParsedStyle } from '../../src/types';

describe('Figma Prototyping Integration', () => {
  describe('convertAnimationToFigmaReactions', () => {
    test('converts simple transition to hover reaction', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'transition-property',
          value: 'all',
          variant: 'preset'
        },
        {
          property: 'transition-duration',
          value: '300ms',
          variant: 'preset'
        },
        {
          property: 'transition-timing-function',
          value: 'ease-in-out',
          variant: 'preset'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      
      expect(reactions).toHaveLength(1);
      expect(reactions[0].trigger.type).toBe('ON_HOVER');
      expect(reactions[0].action?.transition?.duration).toBe(0.3);
      expect(reactions[0].action?.transition?.easing.type).toBe('EASE_IN_AND_OUT');
    });

    test('converts animation to click reaction', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'animation',
          value: 'spin 1s linear infinite',
          variant: 'preset'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      
      expect(reactions).toHaveLength(1);
      expect(reactions[0].trigger.type).toBe('ON_CLICK');
      expect(reactions[0].action?.transition?.duration).toBe(1);
      expect(reactions[0].action?.transition?.easing.type).toBe('LINEAR');
    });

    test('handles transition with delay', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'transition-property',
          value: 'opacity',
          variant: 'preset'
        },
        {
          property: 'transition-duration',
          value: '500ms',
          variant: 'preset'
        },
        {
          property: 'transition-delay',
          value: '200ms',
          variant: 'preset'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      
      expect(reactions).toHaveLength(1);
      expect(reactions[0].trigger.type).toBe('AFTER_TIMEOUT');
      expect(reactions[0].trigger.timeout).toBe(200);
    });

    test('chooses correct transition type based on properties', () => {
      const transformStyles: ParsedStyle[] = [
        {
          property: 'transition-property',
          value: 'transform',
          variant: 'preset'
        }
      ];

      const opacityStyles: ParsedStyle[] = [
        {
          property: 'transition-property',
          value: 'opacity',
          variant: 'preset'
        }
      ];

      const transformReactions = convertAnimationToFigmaReactions(transformStyles);
      const opacityReactions = convertAnimationToFigmaReactions(opacityStyles);

      expect(transformReactions[0].action?.transition?.type).toBe('SMART_ANIMATE');
      expect(opacityReactions[0].action?.transition?.type).toBe('DISSOLVE');
    });
  });

  describe('generatePrototypeSuggestions', () => {
    test('provides hover recommendations for transition styles', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'transition-property',
          value: 'all',
          variant: 'preset'
        }
      ];

      const { reactions, recommendations } = generatePrototypeSuggestions(styles);
      
      expect(recommendations).toContain('Use SMART_ANIMATE for element property changes');
      expect(recommendations).toContain('Test animations in Figma prototype mode for best results');
    });

    test('provides click recommendations for animation styles', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'animation',
          value: 'pulse 2s ease-in-out infinite',
          variant: 'preset'
        }
      ];

      const { recommendations } = generatePrototypeSuggestions(styles);
      
      expect(recommendations).toContain('Keyframe animations work best with ON_CLICK triggers');
    });

    test('suggests conditional logic for multiple animations', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'transition-property',
          value: 'opacity',
          variant: 'preset'
        },
        {
          property: 'animation',
          value: 'bounce 1s',
          variant: 'preset'
        }
      ];

      const { recommendations } = generatePrototypeSuggestions(styles);
      
      expect(recommendations).toContain('Multiple animations detected - consider using conditional logic');
    });
  });

  describe('Easing Functions', () => {
    test('converts CSS cubic-bezier to Figma custom easing', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'transition-timing-function',
          value: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
          variant: 'arbitrary'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      const easing = reactions[0].action?.transition?.easing;
      
      expect(easing?.type).toBe('CUSTOM_CUBIC_BEZIER');
      expect(easing?.easingFunctionCubicBezier).toEqual({
        x1: 0.4,
        y1: 0.0,
        x2: 0.2,
        y2: 1
      });
    });

    test('maps standard CSS easing functions', () => {
      const easingMappings = [
        { css: 'linear', figma: 'LINEAR' },
        { css: 'ease', figma: 'EASE_IN_AND_OUT' },
        { css: 'ease-in', figma: 'EASE_IN' },
        { css: 'ease-out', figma: 'EASE_OUT' },
        { css: 'ease-in-out', figma: 'EASE_IN_AND_OUT' }
      ];

      for (const mapping of easingMappings) {
        const styles: ParsedStyle[] = [
          {
            property: 'transition-timing-function',
            value: mapping.css,
            variant: 'preset'
          }
        ];

        const reactions = convertAnimationToFigmaReactions(styles);
        expect(reactions[0].action?.transition?.easing.type).toBe(mapping.figma);
      }
    });
  });

  describe('Duration Parsing', () => {
    test('converts milliseconds to seconds', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'transition-duration',
          value: '250ms',
          variant: 'preset'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      expect(reactions[0].action?.transition?.duration).toBe(0.25);
    });

    test('handles seconds correctly', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'transition-duration',
          value: '1.5s',
          variant: 'preset'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      expect(reactions[0].action?.transition?.duration).toBe(1.5);
    });
  });

  describe('Animation Name Mapping', () => {
    test('maps common animation names to transition types', () => {
      const animationMappings = [
        { name: 'fadeIn', type: 'DISSOLVE' },
        { name: 'slideInLeft', type: 'SLIDE_IN' },
        { name: 'slideOutRight', type: 'SLIDE_OUT' },
        { name: 'moveIn', type: 'MOVE_IN' },
        { name: 'push', type: 'PUSH' }
      ];

      for (const mapping of animationMappings) {
        const styles: ParsedStyle[] = [
          {
            property: 'animation',
            value: `${mapping.name} 1s ease`,
            variant: 'preset'
          }
        ];

        const reactions = convertAnimationToFigmaReactions(styles);
        expect(reactions[0].action?.transition?.type).toBe(mapping.type);
      }
    });

    test('defaults to SMART_ANIMATE for unknown animations', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'animation',
          value: 'unknownAnimation 1s ease',
          variant: 'preset'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      expect(reactions[0].action?.transition?.type).toBe('SMART_ANIMATE');
    });
  });

  describe('Edge Cases', () => {
    test('handles empty styles array', () => {
      const reactions = convertAnimationToFigmaReactions([]);
      expect(reactions).toHaveLength(0);
    });

    test('handles non-animation styles', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'color',
          value: 'red',
          variant: 'preset'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      expect(reactions).toHaveLength(0);
    });

    test('handles malformed animation values', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'animation',
          value: 123 as any, // Invalid non-string value
          variant: 'preset'
        }
      ];

      const reactions = convertAnimationToFigmaReactions(styles);
      expect(reactions).toHaveLength(0);
    });
  });
}); 
import { figmaLayoutToCss } from './layout';
import { figmaColorsToCss } from './colors';
import { figmaTypographyToCss } from './typography';
import { figmaEffectsToCss } from './effects';
import { figmaGeometryToCss } from './geometry';
import { figmaBorderToCss } from './border';
import { figmaShadowToCss } from './shadow';
import { figmaSpacingToCss } from './spacing';
import { figmaPositionToCss } from './position';
import { figmaSizeToCss } from './size';
import { figmaAnimationToCss, suggestTransitionClasses } from './animation';

// Re-export individual converter functions
export { figmaLayoutToCss } from './layout';
export { figmaColorsToCss } from './colors';
export { figmaTypographyToCss } from './typography';
export { figmaEffectsToCss } from './effects';
export { figmaGeometryToCss } from './geometry';
export { figmaBorderToCss } from './border';
export { figmaShadowToCss } from './shadow';
export { figmaSpacingToCss } from './spacing';
export { figmaPositionToCss } from './position';
export { figmaSizeToCss } from './size';
export { figmaAnimationToCss, suggestTransitionClasses } from './animation';

// Main conversion function that combines all modules
export function figmaToCss(styles: Record<string, any>): string {
    const classes: string[] = [
        ...figmaLayoutToCss(styles),
        ...figmaColorsToCss(styles),
        ...figmaTypographyToCss(styles),
        ...figmaEffectsToCss(styles),
        ...figmaGeometryToCss(styles),
        ...figmaBorderToCss(styles),
        ...figmaShadowToCss(styles),
        ...figmaSpacingToCss(styles),
        ...figmaPositionToCss(styles),
        ...figmaSizeToCss(styles),
        ...figmaAnimationToCss(styles)
    ];

    return classes.filter(Boolean).join(' ');
}

// Function to generate CSS with animation suggestions
export function figmaToCssWithAnimations(styles: Record<string, any>): { 
  classes: string; 
  suggestions: string; 
} {
    const baseClasses = figmaToCss(styles);
    const animationSuggestions = suggestTransitionClasses(styles);
    
    return {
        classes: baseClasses,
        suggestions: animationSuggestions.join(' ')
    };
} 
import { FigmaStyleProperties } from '../types';

export function figmaAnimationToCss(styles: FigmaStyleProperties): string[] {
  const classes: string[] = [];

  // Handle opacity for transitions (opacity is commonly animated)
  if (styles.opacity !== undefined && styles.opacity !== 1) {
    const opacityPercent = Math.round(styles.opacity * 100);
    
    // Common opacity values that might have transitions
    if (opacityPercent === 0) {
      classes.push('opacity-0');
    } else if (opacityPercent === 50) {
      classes.push('opacity-50');
    } else if (opacityPercent === 75) {
      classes.push('opacity-75');
    } else {
      classes.push(`opacity-[${opacityPercent}%]`);
    }
    
    // Add transition for opacity changes
    classes.push('transition-opacity');
  }

  // Handle transform-related properties that are commonly animated
  if (styles.rotation !== undefined && styles.rotation !== 0) {
    const degrees = Math.round(styles.rotation * (180 / Math.PI));
    if (degrees === 45) {
      classes.push('rotate-45');
    } else if (degrees === 90) {
      classes.push('rotate-90');
    } else if (degrees === 180) {
      classes.push('rotate-180');
    } else {
      classes.push(`rotate-[${degrees}deg]`);
    }
    classes.push('transition-transform');
  }

  // Handle scale (though Figma doesn't directly support scale, 
  // we can infer it from size changes)
  // This would be enhanced when Figma adds more animation support

  return classes;
}

// Helper to check if styles might benefit from transition classes
export function suggestTransitionClasses(styles: FigmaStyleProperties): string[] {
  const suggestions: string[] = [];

  // Suggest transitions based on properties that commonly animate
  if (styles.fills && styles.fills.length > 0) {
    suggestions.push('transition-colors');
  }

  if (styles.effects && styles.effects.length > 0) {
    const hasShadow = styles.effects.some(effect => 
      effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW'
    );
    if (hasShadow) {
      suggestions.push('transition-shadow');
    }
  }

  if (styles.opacity !== undefined) {
    suggestions.push('transition-opacity');
  }

  // Default duration and easing
  if (suggestions.length > 0) {
    suggestions.push('duration-300', 'ease-in-out');
  }

  return suggestions;
} 
import { ParsedStyle, FigmaStyleProperties } from '../types';

export function convertAnimationToFigma(styles: ParsedStyle[]): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  // Note: Figma doesn't natively support CSS animations/transitions
  // This converter will focus on properties that can be animated
  // and provide metadata for future animation support

  for (const style of styles) {
    switch (style.property) {
      case 'transition-property':
        // Store transition info as metadata (for future use)
        // Currently Figma doesn't support this directly
        break;
        
      case 'transition-duration':
        // Store duration info as metadata
        break;
        
      case 'transition-timing-function':
        // Store easing info as metadata
        break;
        
      case 'animation':
        // For keyframe animations, we can at least apply the end state
        if (typeof style.value === 'string') {
          const animationValue = style.value.trim();
          
          // Extract end state properties for known animations
          if (animationValue.includes('spin')) {
            // For spin animations, we don't change the static state
            // as it's a continuous animation
          } else if (animationValue.includes('pulse')) {
            // For pulse, we could reduce opacity slightly
            result.opacity = 0.8;
          } else if (animationValue.includes('bounce')) {
            // For bounce, the static state remains unchanged
          }
        }
        break;
    }
  }

  return result;
}

// Helper function to extract animation metadata for plugin use
export function extractAnimationMetadata(styles: ParsedStyle[]): {
  hasAnimations: boolean;
  animationTypes: string[];
  transitionProperties: string[];
  duration?: string;
  easing?: string;
} {
  const metadata = {
    hasAnimations: false,
    animationTypes: [] as string[],
    transitionProperties: [] as string[],
    duration: undefined as string | undefined,
    easing: undefined as string | undefined,
  };

  for (const style of styles) {
    switch (style.property) {
      case 'transition-property':
        metadata.hasAnimations = true;
        if (typeof style.value === 'string') {
          metadata.transitionProperties.push(style.value);
        }
        break;
        
      case 'transition-duration':
        if (typeof style.value === 'string') {
          metadata.duration = style.value;
        }
        break;
        
      case 'transition-timing-function':
        if (typeof style.value === 'string') {
          metadata.easing = style.value;
        }
        break;
        
      case 'animation':
        metadata.hasAnimations = true;
        if (typeof style.value === 'string') {
          const animationValue = style.value.trim();
          if (animationValue.includes('spin')) {
            metadata.animationTypes.push('spin');
          } else if (animationValue.includes('pulse')) {
            metadata.animationTypes.push('pulse');
          } else if (animationValue.includes('bounce')) {
            metadata.animationTypes.push('bounce');
          } else if (animationValue.includes('ping')) {
            metadata.animationTypes.push('ping');
          }
        }
        break;
    }
  }

  return metadata;
} 
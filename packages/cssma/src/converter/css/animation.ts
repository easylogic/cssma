import { ParsedClassName } from '../../types';

export function convertAnimationToCSS(styles: ParsedClassName[]): string {
  const animationStyles = styles.filter(style => 
    style.property.startsWith('transition') || 
    style.property === 'animation'
  );

  if (animationStyles.length === 0) {
    return '';
  }

  // Group transition properties
  const transitionProperties: string[] = [];
  const transitionDurations: string[] = [];
  const transitionDelays: string[] = [];
  const transitionTimingFunctions: string[] = [];
  const animations: string[] = [];

  for (const style of animationStyles) {
    const value = typeof style.value === 'string' ? style.value : String(style.value);
    
    switch (style.property) {
      case 'transition-property':
        transitionProperties.push(value);
        break;
      case 'transition-duration':
        transitionDurations.push(value);
        break;
      case 'transition-delay':
        transitionDelays.push(value);
        break;
      case 'transition-timing-function':
        transitionTimingFunctions.push(value);
        break;
      case 'animation':
        animations.push(value);
        break;
    }
  }

  const cssLines: string[] = [];

  // Build transition shorthand if we have transition properties
  if (transitionProperties.length > 0) {
    const property = transitionProperties.join(', ');
    const duration = transitionDurations.length > 0 ? transitionDurations[0] : '150ms';
    const timingFunction = transitionTimingFunctions.length > 0 ? transitionTimingFunctions[0] : 'cubic-bezier(0.4, 0, 0.2, 1)';
    const delay = transitionDelays.length > 0 ? transitionDelays[0] : '0s';

    if (property === 'none') {
      cssLines.push('transition: none;');
    } else {
      cssLines.push(`transition: ${property} ${duration} ${timingFunction} ${delay};`);
    }
  }

  // Add animations
  if (animations.length > 0) {
    for (const animation of animations) {
      cssLines.push(`animation: ${animation};`);
    }
  }

  return cssLines.join('\n');
}

// Keyframe definitions for built-in animations
export const ANIMATION_KEYFRAMES = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse {
  50% {
    opacity: .5;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8,0,1,1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0,0,0.2,1);
  }
}
`; 
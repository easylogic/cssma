import { ParsedStyle } from '../types';

// Figma Prototyping API Types
export interface FigmaReaction {
  trigger: FigmaTrigger;
  action?: FigmaAction;
  actions?: FigmaAction[];
}

export interface FigmaTrigger {
  type: 'ON_CLICK' | 'ON_HOVER' | 'ON_PRESS' | 'ON_KEY_DOWN' | 'AFTER_TIMEOUT' | 'MOUSE_ENTER' | 'MOUSE_LEAVE' | 'MOUSE_UP' | 'MOUSE_DOWN';
  timeout?: number; // for AFTER_TIMEOUT
  device?: 'KEYBOARD' | 'XBOX_ONE' | 'PS4' | 'SWITCH_PRO' | 'UNKNOWN_CONTROLLER';
  keyCodes?: number[];
}

export interface FigmaAction {
  type: 'NODE' | 'BACK' | 'CLOSE' | 'URL' | 'SET_VARIABLE' | 'CONDITIONAL';
  destinationId?: string;
  navigation?: 'NAVIGATE' | 'SWAP' | 'OVERLAY' | 'SCROLL_TO' | 'CHANGE_TO';
  transition?: FigmaTransition;
  preserveScrollPosition?: boolean;
  overlayRelativePosition?: { x: number; y: number };
  url?: string;
  variableId?: string;
  variableValue?: any;
  conditionalBlocks?: FigmaConditionalBlock[];
}

export interface FigmaTransition {
  type: 'DISSOLVE' | 'SMART_ANIMATE' | 'MOVE_IN' | 'MOVE_OUT' | 'PUSH' | 'SLIDE_IN' | 'SLIDE_OUT' | 'SCROLL_ANIMATE';
  duration: number; // in seconds
  easing: FigmaEasing;
  direction?: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM';
  matchLayers?: boolean;
}

export interface FigmaEasing {
  type: 'LINEAR' | 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'EASE_IN_BACK' | 'EASE_OUT_BACK' | 'EASE_IN_AND_OUT_BACK' | 'CUSTOM_CUBIC_BEZIER' | 'GENTLE' | 'QUICK' | 'BOUNCY' | 'SLOW' | 'CUSTOM_SPRING';
  easingFunctionCubicBezier?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  easingFunctionSpring?: {
    mass: number;
    stiffness: number;
    damping: number;
    initialVelocity: number;
  };
}

export interface FigmaConditionalBlock {
  condition?: any;
  actions: FigmaAction[];
}

/**
 * Convert CSS animation styles to Figma prototyping reactions
 */
export function convertAnimationToFigmaReactions(styles: ParsedStyle[]): FigmaReaction[] {
  const reactions: FigmaReaction[] = [];

  // Group styles by animation type
  const transitionStyles = styles.filter(s => s.property.startsWith('transition'));
  const animationStyles = styles.filter(s => s.property === 'animation');

  // Process transition styles
  if (transitionStyles.length > 0) {
    const transitionReaction = createTransitionReaction(transitionStyles);
    if (transitionReaction) {
      reactions.push(transitionReaction);
    }
  }

  // Process animation styles (keyframe animations)
  for (const animationStyle of animationStyles) {
    const animationReaction = createAnimationReaction(animationStyle);
    if (animationReaction) {
      reactions.push(animationReaction);
    }
  }

  return reactions;
}

/**
 * Create a Figma reaction for CSS transitions
 */
function createTransitionReaction(transitionStyles: ParsedStyle[]): FigmaReaction | null {
  let duration = 0.3; // default 300ms
  let easing: FigmaEasing = { type: 'EASE_IN_AND_OUT' };
  let delay = 0;
  let properties: string[] = [];

  for (const style of transitionStyles) {
    switch (style.property) {
      case 'transition-duration':
        duration = parseDuration(style.value as string);
        break;
      case 'transition-timing-function':
        easing = parseEasing(style.value as string);
        break;
      case 'transition-delay':
        delay = parseDuration(style.value as string);
        break;
      case 'transition-property':
        properties = parseTransitionProperties(style.value as string);
        break;
    }
  }

  // Determine best Figma transition type based on properties
  const transitionType = determineTransitionType(properties);

  const reaction: FigmaReaction = {
    trigger: { type: 'ON_HOVER' }, // Default to hover for transitions
    action: {
      type: 'NODE',
      navigation: 'NAVIGATE',
      transition: {
        type: transitionType,
        duration,
        easing,
        matchLayers: transitionType === 'SMART_ANIMATE'
      }
    }
  };

  // Add delay as a separate timeout trigger if needed
  if (delay > 0) {
    return {
      trigger: { type: 'AFTER_TIMEOUT', timeout: delay * 1000 }, // Convert to ms
      actions: [reaction.action!]
    };
  }

  return reaction;
}

/**
 * Create a Figma reaction for CSS keyframe animations
 */
function createAnimationReaction(animationStyle: ParsedStyle): FigmaReaction | null {
  if (typeof animationStyle.value !== 'string') return null;

  const animationValue = animationStyle.value.trim();
  
  // Parse animation shorthand: name duration timing-function delay iteration-count direction fill-mode
  const parts = animationValue.split(/\s+/);
  const animationName = parts[0];
  
  let duration = 0.3;
  let easing: FigmaEasing = { type: 'EASE_IN_AND_OUT' };
  let delay = 0;

  // Parse duration, timing function, and delay from parts
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    if (part.includes('s') || part.includes('ms')) {
      if (i === 1) {
        duration = parseDuration(part);
      } else if (i === 3) {
        delay = parseDuration(part);
      }
    } else if (isTimingFunction(part)) {
      easing = parseEasing(part);
    }
  }

  // Map common animation names to Figma transitions
  const transitionType = mapAnimationNameToTransition(animationName);

  const reaction: FigmaReaction = {
    trigger: { type: 'ON_CLICK' }, // Default to click for animations
    action: {
      type: 'NODE',
      navigation: 'NAVIGATE',
      transition: {
        type: transitionType,
        duration,
        easing,
        matchLayers: true // Enable smart animate for smoother animations
      }
    }
  };

  return reaction;
}

/**
 * Parse CSS duration values (300ms, 0.3s) to seconds
 */
function parseDuration(value: string): number {
  const numericValue = parseFloat(value);
  
  if (value.includes('ms')) {
    return numericValue / 1000; // Convert milliseconds to seconds
  } else if (value.includes('s')) {
    return numericValue; // Already in seconds
  }
  
  return 0.3; // Default 300ms
}

/**
 * Parse CSS timing functions to Figma easing
 */
function parseEasing(value: string): FigmaEasing {
  switch (value) {
    case 'linear':
      return { type: 'LINEAR' };
    case 'ease':
      return { type: 'EASE_IN_AND_OUT' };
    case 'ease-in':
      return { type: 'EASE_IN' };
    case 'ease-out':
      return { type: 'EASE_OUT' };
    case 'ease-in-out':
      return { type: 'EASE_IN_AND_OUT' };
    default:
      // Handle cubic-bezier and other custom functions
      if (value.startsWith('cubic-bezier(')) {
        const coords = value.match(/cubic-bezier\(([^)]+)\)/);
        if (coords) {
          const [x1, y1, x2, y2] = coords[1].split(',').map(parseFloat);
          return {
            type: 'CUSTOM_CUBIC_BEZIER',
            easingFunctionCubicBezier: { x1, y1, x2, y2 }
          };
        }
      }
      return { type: 'EASE_IN_AND_OUT' };
  }
}

/**
 * Parse transition-property values
 */
function parseTransitionProperties(value: string): string[] {
  return value.split(',').map(prop => prop.trim());
}

/**
 * Determine the best Figma transition type based on CSS properties
 */
function determineTransitionType(properties: string[]): FigmaTransition['type'] {
  // If transforming position or scale, use SMART_ANIMATE
  if (properties.some(prop => 
    prop.includes('transform') || 
    prop.includes('translate') || 
    prop.includes('scale') || 
    prop.includes('rotate')
  )) {
    return 'SMART_ANIMATE';
  }

  // If changing opacity or color, use DISSOLVE
  if (properties.some(prop => 
    prop.includes('opacity') || 
    prop.includes('color') || 
    prop.includes('background')
  )) {
    return 'DISSOLVE';
  }

  // Default to SMART_ANIMATE for most cases
  return 'SMART_ANIMATE';
}

/**
 * Map CSS animation names to Figma transition types
 */
function mapAnimationNameToTransition(animationName: string): FigmaTransition['type'] {
  switch (animationName) {
    case 'fadeIn':
    case 'fadeOut':
      return 'DISSOLVE';
    case 'slideInLeft':
    case 'slideOutLeft':
      return 'SLIDE_IN';
    case 'slideInRight':
    case 'slideOutRight':
      return 'SLIDE_OUT';
    case 'moveIn':
      return 'MOVE_IN';
    case 'moveOut':
      return 'MOVE_OUT';
    case 'push':
      return 'PUSH';
    default:
      return 'SMART_ANIMATE'; // Best general-purpose option
  }
}

/**
 * Check if a string is a CSS timing function
 */
function isTimingFunction(value: string): boolean {
  const timingFunctions = [
    'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out',
    'step-start', 'step-end', 'steps', 'cubic-bezier'
  ];
  
  return timingFunctions.some(func => value.startsWith(func));
}

/**
 * Generate Figma prototype suggestions based on CSS animations
 */
export function generatePrototypeSuggestions(styles: ParsedStyle[]): {
  reactions: FigmaReaction[];
  recommendations: string[];
} {
  const reactions = convertAnimationToFigmaReactions(styles);
  const recommendations: string[] = [];

  // Analyze the styles and provide recommendations
  const hasTransitions = styles.some(s => s.property.startsWith('transition'));
  const hasAnimations = styles.some(s => s.property === 'animation');
  const hasHover = styles.some(s => s.property.includes('hover'));

  if (hasTransitions && hasHover) {
    recommendations.push('Consider using ON_HOVER trigger for smooth interactions');
  }

  if (hasAnimations) {
    recommendations.push('Keyframe animations work best with ON_CLICK triggers');
  }

  if (reactions.length > 1) {
    recommendations.push('Multiple animations detected - consider using conditional logic');
  }

  recommendations.push('Use SMART_ANIMATE for element property changes');
  recommendations.push('Test animations in Figma prototype mode for best results');

  return { reactions, recommendations };
} 
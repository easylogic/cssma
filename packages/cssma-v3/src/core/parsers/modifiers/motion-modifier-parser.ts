/**
 * Motion modifier parser for CSSMA-V3
 * Handles motion preference modifiers
 * Following Tailwind CSS motion-safe/motion-reduce variant patterns
 */

export interface MotionModifier {
  type: 'motion';
  preference: 'safe' | 'reduce';
  priority: number;
}

export class MotionModifierParser {
  private static readonly MOTION_PREFERENCES: Record<string, { 
    mediaQuery: string; 
    priority: number;
    description: string;
  }> = {
    'motion-safe': {
      mediaQuery: '(prefers-reduced-motion: no-preference)',
      priority: 10,
      description: 'Apply when user has not requested reduced motion'
    },
    'motion-reduce': {
      mediaQuery: '(prefers-reduced-motion: reduce)',
      priority: 10,
      description: 'Apply when user has requested reduced motion'
    }
  };

  static isValidMotionModifier(modifier: string): boolean {
    return modifier in this.MOTION_PREFERENCES;
  }

  static parseMotionModifier(modifier: string): MotionModifier | null {
    if (!this.isValidMotionModifier(modifier)) {
      return null;
    }

    // Extract preference type
    const preference = modifier.replace('motion-', '') as 'safe' | 'reduce';
    const config = this.MOTION_PREFERENCES[modifier];

    return {
      type: 'motion',
      preference,
      priority: config.priority
    };
  }

  static generateMotionMediaQuery(modifier: MotionModifier): string {
    const modifierKey = `motion-${modifier.preference}`;
    const config = this.MOTION_PREFERENCES[modifierKey];
    return config.mediaQuery;
  }

  /**
   * Get all supported motion preferences
   */
  static getSupportedPreferences(): string[] {
    return Object.keys(this.MOTION_PREFERENCES);
  }

  /**
   * Get motion preference configuration
   */
  static getPreferenceConfig(preference: string): { 
    mediaQuery: string; 
    priority: number; 
    description: string;
  } | null {
    const config = this.MOTION_PREFERENCES[preference];
    return config ? { ...config } : null;
  }

  /**
   * Check if motion modifier should be applied (for runtime evaluation)
   */
  static shouldApplyMotionModifier(preference: 'safe' | 'reduce'): boolean {
    // This is a browser-side check for motion preferences
    if (typeof window === 'undefined') {
      return false; // Server-side, cannot determine
    }

    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (preference === 'reduce') {
        return prefersReducedMotion;
      } else if (preference === 'safe') {
        return !prefersReducedMotion;
      }
    } catch (error) {
      // Fallback for browsers that don't support matchMedia
      console.warn('matchMedia not supported, motion preferences unavailable');
    }

    return false;
  }

  /**
   * Generate CSS for motion preference media queries
   */
  static generateMotionCSS(selector: string, styles: string, preference: 'safe' | 'reduce'): string {
    const modifierKey = `motion-${preference}`;
    const config = this.MOTION_PREFERENCES[modifierKey];
    
    return `@media ${config.mediaQuery} { ${selector} { ${styles} } }`;
  }

  /**
   * Combine motion modifiers with other modifiers for complex selectors
   */
  static combineWithResponsive(
    motionPreference: 'safe' | 'reduce',
    breakpoint: string,
    selector: string
  ): string {
    const motionModifierKey = `motion-${motionPreference}`;
    const motionConfig = this.MOTION_PREFERENCES[motionModifierKey];
    
    // Combine media queries: responsive first, then motion
    return `@media (min-width: ${breakpoint}) and ${motionConfig.mediaQuery}`;
  }

  /**
   * Generate motion-aware animation utilities
   */
  static generateMotionAwareAnimationCSS(
    className: string,
    animationStyles: string,
    fallbackStyles?: string
  ): string {
    const safeConfig = this.MOTION_PREFERENCES['motion-safe'];
    const reduceConfig = this.MOTION_PREFERENCES['motion-reduce'];
    
    let css = '';
    
    // Apply animation when motion is safe
    css += `@media ${safeConfig.mediaQuery} { .${className} { ${animationStyles} } }\n`;
    
    // Apply fallback when motion is reduced
    if (fallbackStyles) {
      css += `@media ${reduceConfig.mediaQuery} { .${className} { ${fallbackStyles} } }\n`;
    }
    
    return css;
  }

  /**
   * Check if current environment prefers reduced motion
   */
  static prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') {
      return false; // Assume no preference on server-side
    }

    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }

  /**
   * Add motion preference listener for dynamic updates
   */
  static addMotionPreferenceListener(callback: (prefersReduced: boolean) => void): (() => void) | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = (e: MediaQueryListEvent) => callback(e.matches);
      
      mediaQuery.addEventListener('change', handler);
      
      // Return cleanup function
      return () => mediaQuery.removeEventListener('change', handler);
    } catch {
      return null;
    }
  }
} 
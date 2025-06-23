/**
 * Special modifier parser for CSSMA-V3
 * Handles special CSS selectors and conditions
 * Including noscript, starting, and other unique modifiers
 */

export interface SpecialModifier {
  type: 'noscript' | 'starting' | 'supports' | 'media-feature';
  condition?: string; // For supports() and media features
  raw: string;
  priority: number;
}

export class SpecialModifierParser {
  // Special modifiers that don't fit other categories
  private static readonly SPECIAL_MODIFIERS = [
    'noscript',
    'starting',
    // Pointer device variants
    'pointer-fine',
    'pointer-coarse', 
    'pointer-none',
    'any-pointer-fine',
    'any-pointer-coarse',
    'any-pointer-none',
    // Other v4.1 variants
    'user-valid',
    'user-invalid',
    'inverted-colors'
  ] as const;

  // Supported CSS features for @supports queries
  private static readonly SUPPORTS_FEATURES = [
    'display-grid',
    'display-flex',
    'backdrop-filter',
    'appearance-none',
    'scroll-behavior',
    'overscroll-behavior',
    'text-decoration-thickness'
  ];

  /**
   * Check if modifier is a special modifier
   */
  static isSpecialModifier(modifier: string): boolean {
    // Basic special modifiers
    if (this.SPECIAL_MODIFIERS.includes(modifier as any)) {
      return true;
    }

    // Supports queries: supports-[display:grid]
    if (modifier.startsWith('supports-[') && modifier.endsWith(']')) {
      return true;
    }

    // Named supports features: supports-grid
    if (modifier.startsWith('supports-')) {
      const feature = modifier.slice(9);
      return this.SUPPORTS_FEATURES.includes(feature);
    }

    return false;
  }

  /**
   * Parse special modifier
   */
  static parseSpecialModifier(modifier: string): SpecialModifier | null {
    if (!this.isSpecialModifier(modifier)) {
      return null;
    }

    // Basic special modifiers
    if (this.SPECIAL_MODIFIERS.includes(modifier as any)) {
      return this.parseBasicSpecialModifier(modifier as typeof this.SPECIAL_MODIFIERS[number]);
    }

    // Supports queries
    if (modifier.startsWith('supports-')) {
      return this.parseSupportsModifier(modifier);
    }

    return null;
  }

  /**
   * Parse basic special modifier
   */
  private static parseBasicSpecialModifier(
    modifier: typeof this.SPECIAL_MODIFIERS[number]
  ): SpecialModifier {
    const modifierConfig = {
      noscript: {
        type: 'noscript' as const,
        priority: 20
      },
      starting: {
        type: 'starting' as const,
        priority: 21
      },
      // Pointer device variants - all use media-feature type
      'pointer-fine': {
        type: 'media-feature' as const,
        priority: 15
      },
      'pointer-coarse': {
        type: 'media-feature' as const,
        priority: 15
      },
      'pointer-none': {
        type: 'media-feature' as const,
        priority: 15
      },
      'any-pointer-fine': {
        type: 'media-feature' as const,
        priority: 15
      },
      'any-pointer-coarse': {
        type: 'media-feature' as const,
        priority: 15
      },
      'any-pointer-none': {
        type: 'media-feature' as const,
        priority: 15
      },
      // Other v4.1 variants
      'user-valid': {
        type: 'media-feature' as const,
        priority: 16
      },
      'user-invalid': {
        type: 'media-feature' as const,
        priority: 16
      },
      'inverted-colors': {
        type: 'media-feature' as const,
        priority: 16
      }
    };

    const config = modifierConfig[modifier];
    
    return {
      type: config.type,
      raw: modifier,
      priority: config.priority,
      condition: this.getMediaFeatureCondition(modifier)
    };
  }

  /**
   * Parse supports modifier
   */
  private static parseSupportsModifier(modifier: string): SpecialModifier | null {
    // Arbitrary supports: supports-[display:grid]
    if (modifier.startsWith('supports-[') && modifier.endsWith(']')) {
      const condition = modifier.slice(10, -1); // Remove 'supports-[' and ']'
      if (condition) {
        return {
          type: 'supports',
          condition,
          raw: modifier,
          priority: 22
        };
      }
    }

    // Named supports features: supports-grid -> supports-(display:grid)
    if (modifier.startsWith('supports-')) {
      const feature = modifier.slice(9);
      const condition = this.getSupportsCondition(feature);
      if (condition) {
        return {
          type: 'supports',
          condition,
          raw: modifier,
          priority: 22
        };
      }
    }

    return null;
  }

  /**
   * Get CSS condition for named supports feature
   */
  private static getSupportsCondition(feature: string): string | null {
    const conditionMap: Record<string, string> = {
      'display-grid': 'display: grid',
      'display-flex': 'display: flex',
      'backdrop-filter': 'backdrop-filter: blur(1px)',
      'appearance-none': 'appearance: none',
      'scroll-behavior': 'scroll-behavior: smooth',
      'overscroll-behavior': 'overscroll-behavior: contain',
      'text-decoration-thickness': 'text-decoration-thickness: 2px'
    };

    return conditionMap[feature] || null;
  }

  /**
   * Get media feature condition for pointer and other v4.1 variants
   */
  private static getMediaFeatureCondition(modifier: string): string | null {
    const conditionMap: Record<string, string> = {
      // Pointer variants - all are media queries
      'pointer-fine': 'pointer: fine',
      'pointer-coarse': 'pointer: coarse', 
      'pointer-none': 'pointer: none',
      'any-pointer-fine': 'any-pointer: fine',
      'any-pointer-coarse': 'any-pointer: coarse',
      'any-pointer-none': 'any-pointer: none',
      // Other v4.1 variants
      'user-valid': ':user-valid',  // This is a pseudo-class, not media query
      'user-invalid': ':user-invalid',  // This is a pseudo-class, not media query
      'inverted-colors': 'inverted-colors: inverted'
    };

    return conditionMap[modifier] || null;
  }

  /**
   * Generate CSS selector for special modifier
   */
  static generateSpecialSelector(modifier: SpecialModifier, baseSelector: string): string {
    switch (modifier.type) {
      case 'noscript':
        return `html.no-js ${baseSelector}`;
      
      case 'starting':
        return `${baseSelector}:where(:not(:focus):not(:active):not(:hover))`;
      
      case 'supports':
        if (modifier.condition) {
          return `@supports (${modifier.condition}) { ${baseSelector} }`;
        }
        break;
      
      case 'media-feature':
        if (modifier.condition) {
          // Handle pseudo-classes differently than media queries
          if (modifier.condition.startsWith(':')) {
            return `${baseSelector}${modifier.condition}`;
          } else {
            return `@media (${modifier.condition}) { ${baseSelector} }`;
          }
        }
        break;
    }

    return baseSelector;
  }

  /**
   * Get all supported special modifiers
   */
  static getSupportedSpecialModifiers(): string[] {
    const modifiers: string[] = [...this.SPECIAL_MODIFIERS];
    
    // Add supports features
    this.SUPPORTS_FEATURES.forEach(feature => {
      modifiers.push(`supports-${feature}`);
    });

    return modifiers;
  }

  /**
   * Check if supports feature is valid
   */
  static isValidSupportsFeature(feature: string): boolean {
    return this.SUPPORTS_FEATURES.includes(feature);
  }

  /**
   * Validate supports condition syntax
   */
  static validateSupportsCondition(condition: string): boolean {
    // Basic validation for CSS property: value syntax
    const propertyValuePattern = /^[\w-]+\s*:\s*.+$/;
    return propertyValuePattern.test(condition);
  }

  /**
   * Get modifier priority
   */
  static getModifierPriority(modifier: SpecialModifier): number {
    return modifier.priority;
  }

  /**
   * Validate special modifier syntax
   */
  static validateSyntax(modifier: string): boolean {
    return this.parseSpecialModifier(modifier) !== null;
  }

  /**
   * Check if modifier requires wrapper context
   */
  static requiresWrapperContext(modifier: SpecialModifier): boolean {
    return modifier.type === 'supports' || modifier.type === 'media-feature';
  }

  /**
   * Get wrapper context for modifier
   */
  static getWrapperContext(modifier: SpecialModifier): string | null {
    switch (modifier.type) {
      case 'supports':
        return modifier.condition ? `@supports (${modifier.condition})` : null;
      case 'media-feature':
        return modifier.condition ? `@media (${modifier.condition})` : null;
      default:
        return null;
    }
  }

  /**
   * Get all special modifiers for comprehensive parsing
   */
  static getAllSpecialModifiers(): string[] {
    return this.getSupportedSpecialModifiers();
  }
} 
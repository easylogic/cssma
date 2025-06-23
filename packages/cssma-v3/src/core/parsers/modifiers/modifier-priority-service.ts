/**
 * Modifier Priority Service for CSSMA-V3
 * Implements Tailwind CSS v4.1 modifier stacking and priority rules
 * 
 * Priority Order (highest to lowest):
 * 1. At-rules (@media, @supports, @container)
 * 2. Arbitrary variants ([&...])
 * 3. Responsive (sm:, md:, lg:, xl:, 2xl:)
 * 4. Dark mode (dark:, light:)
 * 5. Motion (motion-reduce:, motion-safe:)
 * 6. Group/Peer modifiers
 * 7. State modifiers (hover:, focus:, active:, etc.)
 * 8. Pseudo-elements (before:, after:, etc.)
 */

export interface ModifierPriority {
  category: ModifierCategory;
  weight: number;
  subcategory?: string;
}

export enum ModifierCategory {
  AT_RULE = 'at-rule',
  ARBITRARY = 'arbitrary',
  RESPONSIVE = 'responsive', 
  DARK_MODE = 'dark-mode',
  MOTION = 'motion',
  GROUP_PEER = 'group-peer',
  STATE = 'state',
  PSEUDO_ELEMENT = 'pseudo-element',
  ATTRIBUTE = 'attribute',
  UNKNOWN = 'unknown'
}

export class ModifierPriorityService {
  
  /**
   * Base priority weights for each category
   */
  private static readonly CATEGORY_WEIGHTS: Record<ModifierCategory, number> = {
    [ModifierCategory.AT_RULE]: 1000,
    [ModifierCategory.ARBITRARY]: 900,
    [ModifierCategory.RESPONSIVE]: 800,
    [ModifierCategory.DARK_MODE]: 700,
    [ModifierCategory.MOTION]: 600,
    [ModifierCategory.GROUP_PEER]: 500,
    [ModifierCategory.STATE]: 400,
    [ModifierCategory.PSEUDO_ELEMENT]: 300,
    [ModifierCategory.ATTRIBUTE]: 200,
    [ModifierCategory.UNKNOWN]: 100
  };

  /**
   * Responsive breakpoint weights (larger screens have higher priority)
   */
  private static readonly RESPONSIVE_WEIGHTS: Record<string, number> = {
    'sm': 810,
    'md': 820,
    'lg': 830,
    'xl': 840,
    '2xl': 850
  };

  /**
   * State modifier weights (more specific states have higher priority)
   */
  private static readonly STATE_WEIGHTS: Record<string, number> = {
    'hover': 410,
    'focus': 420,
    'focus-within': 425,
    'focus-visible': 430,
    'active': 440,
    'visited': 405,
    'target': 435,
    'first': 450,
    'last': 455,
    'odd': 460,
    'even': 465,
    'first-of-type': 470,
    'last-of-type': 475,
    'empty': 480,
    'disabled': 490,
    'enabled': 485,
    'checked': 495,
    'indeterminate': 485,
    'default': 480,
    'required': 475,
    'valid': 470,
    'invalid': 485,
    'in-range': 465,
    'out-of-range': 470
  };

  /**
   * Get priority for a modifier
   */
  static getModifierPriority(modifier: string): ModifierPriority {
    const category = this.categorizeModifier(modifier);
    const baseWeight = this.CATEGORY_WEIGHTS[category];
    
    switch (category) {
      case ModifierCategory.RESPONSIVE:
        return {
          category,
          weight: this.RESPONSIVE_WEIGHTS[modifier] || baseWeight,
          subcategory: modifier
        };
        
      case ModifierCategory.STATE:
        return {
          category,
          weight: this.STATE_WEIGHTS[modifier] || baseWeight,
          subcategory: modifier
        };
        
      case ModifierCategory.AT_RULE:
        // At-rules get higher weight based on specificity
        if (modifier.includes('@container')) return { category, weight: baseWeight + 30 };
        if (modifier.includes('@supports')) return { category, weight: baseWeight + 20 };
        if (modifier.includes('@media')) return { category, weight: baseWeight + 10 };
        return { category, weight: baseWeight };
        
      case ModifierCategory.ARBITRARY:
        // Arbitrary variants get weight based on complexity
        const complexity = this.calculateArbitraryComplexity(modifier);
        return { category, weight: baseWeight + complexity };
        
      default:
        return { category, weight: baseWeight };
    }
  }

  /**
   * Sort modifiers by priority (highest to lowest)
   */
  static sortModifiersByPriority(modifiers: string[]): string[] {
    return modifiers
      .map(modifier => ({
        modifier,
        priority: this.getModifierPriority(modifier)
      }))
      .sort((a, b) => b.priority.weight - a.priority.weight)
      .map(item => item.modifier);
  }

  /**
   * Check if modifier A should come before modifier B in CSS output
   */
  static shouldComeFirst(modifierA: string, modifierB: string): boolean {
    const priorityA = this.getModifierPriority(modifierA);
    const priorityB = this.getModifierPriority(modifierB);
    
    return priorityA.weight > priorityB.weight;
  }

  /**
   * Get CSS cascade layer for modifier category
   */
  static getCascadeLayer(category: ModifierCategory): string {
    switch (category) {
      case ModifierCategory.AT_RULE:
        return 'at-rules';
      case ModifierCategory.ARBITRARY:
        return 'arbitrary';
      case ModifierCategory.RESPONSIVE:
        return 'responsive';
      case ModifierCategory.STATE:
        return 'states';
      default:
        return 'utilities';
    }
  }

  /**
   * Private: Categorize modifier into priority category
   */
  private static categorizeModifier(modifier: string): ModifierCategory {
    // At-rule modifiers
    if (modifier.startsWith('[@')) {
      return ModifierCategory.AT_RULE;
    }
    
    // Arbitrary variants
    if (modifier.startsWith('[&')) {
      return ModifierCategory.ARBITRARY;
    }
    
    // Responsive breakpoints
    if (['sm', 'md', 'lg', 'xl', '2xl'].includes(modifier)) {
      return ModifierCategory.RESPONSIVE;
    }
    
    // Dark mode
    if (['dark', 'light'].includes(modifier)) {
      return ModifierCategory.DARK_MODE;
    }
    
    // Motion preferences
    if (['motion-reduce', 'motion-safe'].includes(modifier)) {
      return ModifierCategory.MOTION;
    }
    
    // Group/Peer modifiers
    if (modifier.startsWith('group-') || modifier.startsWith('peer-')) {
      return ModifierCategory.GROUP_PEER;
    }
    
    // Pseudo-elements
    if (['before', 'after', 'first-line', 'first-letter', 'placeholder', 'selection', 'backdrop'].includes(modifier)) {
      return ModifierCategory.PSEUDO_ELEMENT;
    }
    
    // Attribute modifiers
    if (modifier.startsWith('[') && !modifier.startsWith('[&') && !modifier.startsWith('[@')) {
      return ModifierCategory.ATTRIBUTE;
    }
    
    // State modifiers (everything else that's not arbitrary)
    if (this.STATE_WEIGHTS[modifier]) {
      return ModifierCategory.STATE;
    }
    
    return ModifierCategory.UNKNOWN;
  }

  /**
   * Private: Calculate complexity weight for arbitrary variants
   */
  private static calculateArbitraryComplexity(modifier: string): number {
    let complexity = 0;
    
    // Count pseudo-classes (:) - but exclude the initial [& part
    const content = modifier.slice(2, -1); // Remove [& and ]
    const pseudoClassCount = (content.match(/:/g) || []).length;
    complexity += pseudoClassCount * 10;
    
    // Count attribute selectors within the variant
    // Look for patterns like [attr], [attr=value], [attr^=value], etc.
    const attributeMatches = content.match(/\[[^\]]*\]/g) || [];
    complexity += attributeMatches.length * 20; // Increased weight for attribute selectors
    
    // Add weight for combinators - but exclude those inside parentheses
    const contentWithoutParens = content.replace(/\([^)]*\)/g, ''); // Remove function contents
    if (/[>+~]/.test(contentWithoutParens)) complexity += 8;
    
    // Add weight for parentheses (function calls like nth-child())
    const parenthesesCount = (content.match(/\(/g) || []).length;
    complexity += parenthesesCount * 15;
    
    // Add weight for complex selectors (multiple parts) - but only split on real combinators
    const selectorParts = contentWithoutParens.split(/[>+~\s]+/).filter(Boolean);
    if (selectorParts.length > 1) complexity += selectorParts.length * 3;
    
    // Add extra weight for multiple pseudo-classes or attribute selectors
    if (pseudoClassCount > 1 || attributeMatches.length > 1) {
      complexity += 5; // Bonus for multiple selectors
    }
    
    return complexity;
  }

  /**
   * Generate CSS specificity value for modifier
   */
  static calculateCSSSpecificity(modifier: string): { a: number; b: number; c: number; d: number } {
    const category = this.categorizeModifier(modifier);
    
    // CSS specificity: (inline, ids, classes, elements)
    const specificity = { a: 0, b: 0, c: 1, d: 0 }; // Base class specificity
    
    switch (category) {
      case ModifierCategory.AT_RULE:
        // At-rules don't affect specificity directly
        break;
        
      case ModifierCategory.ARBITRARY:
        // Calculate based on selector content
        if (modifier.includes('[')) specificity.c += 1; // Attribute selector
        if (modifier.includes(':')) specificity.c += 1; // Pseudo-class
        break;
        
      case ModifierCategory.STATE:
        specificity.c += 1; // Pseudo-class
        break;
        
      case ModifierCategory.PSEUDO_ELEMENT:
        specificity.d += 1; // Pseudo-element
        break;
        
      default:
        // Other modifiers typically add class specificity
        specificity.c += 1;
        break;
    }
    
    return specificity;
  }

  /**
   * Compare two CSS specificity values
   */
  static compareSpecificity(
    a: { a: number; b: number; c: number; d: number },
    b: { a: number; b: number; c: number; d: number }
  ): number {
    if (a.a !== b.a) return a.a - b.a;
    if (a.b !== b.b) return a.b - b.b;
    if (a.c !== b.c) return a.c - b.c;
    return a.d - b.d;
  }

  /**
   * Get recommended CSS output order for modifiers
   */
  static getRecommendedCSSOrder(modifiers: string[]): string[] {
    // Group by category first
    const grouped = this.groupModifiersByCategory(modifiers);
    
    // Sort each group internally
    const ordered: string[] = [];
    
    // Output in priority order
    const categories = [
      ModifierCategory.AT_RULE,
      ModifierCategory.ARBITRARY,
      ModifierCategory.RESPONSIVE,
      ModifierCategory.DARK_MODE,
      ModifierCategory.MOTION,
      ModifierCategory.GROUP_PEER,
      ModifierCategory.STATE,
      ModifierCategory.PSEUDO_ELEMENT,
      ModifierCategory.ATTRIBUTE,
      ModifierCategory.UNKNOWN
    ];
    
    for (const category of categories) {
      if (grouped[category]) {
        ordered.push(...this.sortModifiersByPriority(grouped[category]));
      }
    }
    
    return ordered;
  }

  /**
   * Private: Group modifiers by category
   */
  private static groupModifiersByCategory(modifiers: string[]): Record<ModifierCategory, string[]> {
    const groups: Record<ModifierCategory, string[]> = {} as any;
    
    for (const modifier of modifiers) {
      const category = this.categorizeModifier(modifier);
      if (!groups[category]) groups[category] = [];
      groups[category].push(modifier);
    }
    
    return groups;
  }
} 
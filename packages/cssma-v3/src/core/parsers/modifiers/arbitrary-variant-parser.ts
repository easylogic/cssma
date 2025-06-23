/**
 * Arbitrary Variant Parser for CSSMA-V3
 * Handles complex arbitrary variants introduced in Tailwind CSS v4.1
 * 
 * Supported patterns:
 * - [&:nth-child(3n+1)] - Arbitrary pseudo-classes
 * - [&>li] - Direct child selectors
 * - [&+*] - Adjacent sibling selectors
 * - [&~*] - General sibling selectors
 * - [&_img] - Descendant selectors
 * - [@media(min-width:400px)] - Arbitrary media queries
 * - [@supports(display:grid)] - Arbitrary @supports queries
 * - [@container(min-width:400px)] - Arbitrary container queries
 */

export interface ArbitraryVariant {
  type: 'selector' | 'media' | 'supports' | 'container';
  raw: string;
  selector?: string;
  mediaQuery?: string;
  supportsQuery?: string;
  containerQuery?: string;
}

export class ArbitraryVariantParser {
  
  /**
   * Check if modifier is a valid arbitrary variant
   */
  static isValidArbitraryVariant(modifier: string): boolean {
    // Must start and end with square brackets
    if (!modifier.startsWith('[') || !modifier.endsWith(']')) {
      return false;
    }

    const content = modifier.slice(1, -1);
    
    // Arbitrary selector variants (start with &)
    if (content.startsWith('&')) {
      return this._isValidSelectorVariant(content);
    }
    
    // Arbitrary at-rule variants (start with @)
    if (content.startsWith('@')) {
      return this._isValidAtRuleVariant(content);
    }

    return false;
  }

  /**
   * Parse arbitrary variant modifier
   */
  static parseArbitraryVariant(modifier: string): ArbitraryVariant | null {
    if (!this.isValidArbitraryVariant(modifier)) {
      return null;
    }

    const content = modifier.slice(1, -1);

    // Selector variant
    if (content.startsWith('&')) {
      return {
        type: 'selector',
        raw: modifier,
        selector: content
      };
    }

    // At-rule variants
    if (content.startsWith('@media')) {
      const mediaQuery = content.slice(6).trim(); // Remove '@media'
      // Handle complex media queries like @media(min-width:640px)_and_(max-width:1024px)
      const formattedQuery = mediaQuery.replace(/_and_/g, ' and ');
      return {
        type: 'media',
        raw: modifier,
        mediaQuery: `@media ${formattedQuery}`
      };
    }

    if (content.startsWith('@supports')) {
      const supportsQuery = content.slice(9).trim(); // Remove '@supports'
      return {
        type: 'supports', 
        raw: modifier,
        supportsQuery: `@supports ${supportsQuery}`
      };
    }

    if (content.startsWith('@container')) {
      const containerQuery = content.slice(10).trim(); // Remove '@container'
      // Handle named containers: @container/name -> @container /name
      const formattedQuery = containerQuery.startsWith('/') 
        ? ` ${containerQuery}` 
        : ` ${containerQuery}`;
      return {
        type: 'container',
        raw: modifier,
        containerQuery: `@container${formattedQuery}`
      };
    }

    return null;
  }

  /**
   * Generate CSS selector from arbitrary variant
   */
  static generateSelector(variant: ArbitraryVariant, baseSelector: string): string {
    switch (variant.type) {
      case 'selector':
        // Replace & with the base selector
        return variant.selector!.replace(/&/g, baseSelector);
        
      case 'media':
        return variant.mediaQuery!;
        
      case 'supports':
        return variant.supportsQuery!;
        
      case 'container':
        return variant.containerQuery!;
        
      default:
        return baseSelector;
    }
  }

  /**
   * Get CSS rule type for variant
   */
  static getRuleType(variant: ArbitraryVariant): 'selector' | 'at-rule' {
    return variant.type === 'selector' ? 'selector' : 'at-rule';
  }

  /**
   * Private: Validate selector variant
   */
  private static _isValidSelectorVariant(content: string): boolean {
    // Basic validation for selector patterns
    // &:pseudo-class, &::pseudo-element, &>child, &+sibling, &~sibling, &_descendant
    
    const selectorPatterns = [
      /^&:[a-zA-Z-]+(\([^)]*\))?$/, // &:hover, &:nth-child(3n+1)
      /^&::[a-zA-Z-]+$/, // &::before, &::after
      /^&[>+~_]\s*[*a-zA-Z0-9._-]+$/, // &>li, &+*, &~div, &_img
      /^&\[[^\]]+\]$/, // &[aria-checked]
      /^&\s+[*a-zA-Z0-9._-]+$/, // & img (descendant with space)
      /^&\[[^\]]+\]:[a-zA-Z-]+$/, // &[aria-checked]:hover (complex attribute + pseudo)
      /^&:[a-zA-Z-]+(\([^)]*\))?:[a-zA-Z-]+$/, // &:hover:focus (multiple pseudo-classes)
    ];

    return selectorPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Private: Validate at-rule variant  
   */
  private static _isValidAtRuleVariant(content: string): boolean {
    // @media, @supports, @container with parentheses
    const atRulePatterns = [
      /^@media\s*\([^)]+\)$/, // @media(min-width:400px)
      /^@media\s*\([^)]+\)_and_\([^)]+\)$/, // @media(min-width:640px)_and_(max-width:1024px)
      /^@supports\s*\([^)]+\)$/, // @supports(display:grid)
      /^@container\s*\([^)]+\)$/, // @container(min-width:400px)
      /^@container\/[a-zA-Z0-9_-]+\s*\([^)]+\)$/, // @container/name(min-width:400px)
    ];

    return atRulePatterns.some(pattern => pattern.test(content));
  }

  /**
   * Get all supported arbitrary variant types
   */
  static getSupportedTypes(): string[] {
    return [
      // Selector variants
      '&:pseudo-class',
      '&::pseudo-element', 
      '&>child',
      '&+sibling',
      '&~sibling',
      '&_descendant',
      '&[attribute]',
      
      // At-rule variants
      '@media(query)',
      '@supports(feature)',
      '@container(query)',
      '@container/name(query)'
    ];
  }

  /**
   * Validate and normalize arbitrary variant syntax
   */
  static normalizeVariant(modifier: string): string {
    if (!this.isValidArbitraryVariant(modifier)) {
      return modifier;
    }

    const content = modifier.slice(1, -1);
    
    // Normalize descendant selectors: &_img -> & img
    if (content.includes('_') && content.startsWith('&')) {
      const normalized = content.replace('_', ' ');
      return `[${normalized}]`;
    }
    
    return modifier;
  }

  /**
   * Get specificity weight for ordering
   */
  static getSpecificityWeight(variant: ArbitraryVariant): number {
    switch (variant.type) {
      case 'media':
      case 'supports': 
      case 'container':
        return 1000; // At-rules have highest priority
        
      case 'selector':
        // Calculate based on selector complexity
        const selector = variant.selector!;
        let weight = 100;
        
        // Add weight for pseudo-classes
        if (selector.includes(':')) weight += 10;
        
        // Add weight for attribute selectors
        if (selector.includes('[')) weight += 10;
        
        // Add weight for combinators
        if (/[>+~]/.test(selector)) weight += 5;
        
        return weight;
        
      default:
        return 0;
    }
  }
} 
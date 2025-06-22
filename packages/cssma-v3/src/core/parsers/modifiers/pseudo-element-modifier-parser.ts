/**
 * Pseudo-element modifier parser for CSSMA-V3
 * Handles pseudo-element modifiers like ::before, ::after, ::placeholder
 * Following Tailwind CSS patterns
 */

export interface PseudoElementModifier {
  type: 'pseudo-element';
  element: string;
  priority: number;
}

export class PseudoElementModifierParser {
  private static readonly PSEUDO_ELEMENT_MAP: Record<string, { selector: string; priority: number }> = {
    // Pseudo-elements with content support
    'before': { selector: '::before', priority: 50 },
    'after': { selector: '::after', priority: 50 },
    
    // Form-related pseudo-elements
    'placeholder': { selector: '::placeholder', priority: 40 },
    'file': { selector: '::file-selector-button', priority: 40 },
    
    // Text and content pseudo-elements
    'selection': { selector: '::selection', priority: 35 },
    'marker': { selector: '::marker', priority: 35 },
    'first-line': { selector: '::first-line', priority: 35 },
    'first-letter': { selector: '::first-letter', priority: 35 },
    
    // Dialog and backdrop
    'backdrop': { selector: '::backdrop', priority: 30 },
  };

  static isValidPseudoElementModifier(modifier: string): boolean {
    return modifier in this.PSEUDO_ELEMENT_MAP;
  }

  static parsePseudoElementModifier(modifier: string): PseudoElementModifier | null {
    if (!this.isValidPseudoElementModifier(modifier)) {
      return null;
    }

    const config = this.PSEUDO_ELEMENT_MAP[modifier];
    
    return {
      type: 'pseudo-element',
      element: modifier,
      priority: config.priority
    };
  }

  static generatePseudoElementSelector(modifier: PseudoElementModifier): string {
    const config = this.PSEUDO_ELEMENT_MAP[modifier.element];
    return config.selector;
  }

  /**
   * Get all supported pseudo-element modifiers
   */
  static getSupportedModifiers(): string[] {
    return Object.keys(this.PSEUDO_ELEMENT_MAP);
  }

  /**
   * Check if pseudo-element requires content property
   */
  static requiresContent(element: string): boolean {
    return ['before', 'after'].includes(element);
  }

  /**
   * Get default content for pseudo-elements that require it
   */
  static getDefaultContent(element: string): string {
    if (this.requiresContent(element)) {
      return "''"; // Empty string content
    }
    return '';
  }
} 
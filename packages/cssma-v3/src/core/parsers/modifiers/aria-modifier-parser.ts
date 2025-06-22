/**
 * ARIA modifier parser for CSSMA-V3
 * Handles ARIA accessibility modifiers
 * Following Tailwind CSS aria-* variant patterns
 */

export interface AriaModifier {
  type: 'aria';
  attribute: string;
  value?: string;
  priority: number;
}

export class AriaModifierParser {
  // Boolean ARIA attributes (aria-checked="true")
  private static readonly BOOLEAN_ARIA_ATTRIBUTES = new Set([
    'busy',
    'checked',
    'disabled',
    'expanded',
    'hidden',
    'pressed',
    'readonly',
    'required',
    'selected',
    'invalid',
    'current',
    'grabbed',
    'dropeffect',
    'multiline',
    'multiselectable',
    'atomic',
    'live',
    'relevant'
  ]);

  // Enumerated ARIA attributes with specific values
  private static readonly ENUMERATED_ARIA_ATTRIBUTES: Record<string, string[]> = {
    'sort': ['ascending', 'descending', 'none', 'other'],
    'orientation': ['horizontal', 'vertical'],
    'autocomplete': ['inline', 'list', 'both', 'none'],
    'dropeffect': ['copy', 'execute', 'link', 'move', 'none', 'popup'],
    'haspopup': ['false', 'true', 'menu', 'listbox', 'tree', 'grid', 'dialog'],
    'live': ['assertive', 'off', 'polite'],
    'relevant': ['additions', 'removals', 'text', 'all'],
    'current': ['page', 'step', 'location', 'date', 'time', 'true', 'false']
  };

  static isValidAriaModifier(modifier: string): boolean {
    // Check for aria- prefix
    if (!modifier.startsWith('aria-')) {
      return false;
    }

    const ariaPart = modifier.slice(5); // Remove 'aria-' prefix

    // Check for boolean attributes (aria-checked, aria-disabled, etc.)
    if (this.BOOLEAN_ARIA_ATTRIBUTES.has(ariaPart)) {
      return true;
    }

    // Check for enumerated attributes with specific values (aria-sort-ascending)
    for (const [attribute, values] of Object.entries(this.ENUMERATED_ARIA_ATTRIBUTES)) {
      if (ariaPart.startsWith(attribute + '-')) {
        const value = ariaPart.slice(attribute.length + 1);
        if (values.includes(value)) {
          return true;
        }
      }
    }

    // Check for arbitrary values (aria-[label="Custom label"])
    if (ariaPart.startsWith('[') && ariaPart.endsWith(']')) {
      return this.isValidArbitraryAriaValue(ariaPart);
    }

    return false;
  }

  private static isValidArbitraryAriaValue(arbitraryValue: string): boolean {
    // Remove brackets
    const content = arbitraryValue.slice(1, -1);
    
    // Should contain an equals sign for attribute=value format
    if (!content.includes('=')) {
      // Simple attribute check (just attribute name)
      return /^[a-z]+[a-z0-9-]*$/.test(content);
    }

    // Parse attribute=value format
    const [attribute, ...valueParts] = content.split('=');
    const value = valueParts.join('=');

    // Validate attribute name (should be valid ARIA attribute)
    if (!/^[a-z]+[a-z0-9-]*$/.test(attribute)) {
      return false;
    }

    // Value should be quoted
    return /^["'][^"']*["']$/.test(value);
  }

  static parseAriaModifier(modifier: string): AriaModifier | null {
    if (!this.isValidAriaModifier(modifier)) {
      return null;
    }

    const ariaPart = modifier.slice(5); // Remove 'aria-' prefix

    // Handle boolean attributes
    if (this.BOOLEAN_ARIA_ATTRIBUTES.has(ariaPart)) {
      return {
        type: 'aria',
        attribute: ariaPart,
        value: 'true',
        priority: 25
      };
    }

    // Handle enumerated attributes
    for (const [attribute, values] of Object.entries(this.ENUMERATED_ARIA_ATTRIBUTES)) {
      if (ariaPart.startsWith(attribute + '-')) {
        const value = ariaPart.slice(attribute.length + 1);
        if (values.includes(value)) {
          return {
            type: 'aria',
            attribute,
            value,
            priority: 25
          };
        }
      }
    }

    // Handle arbitrary values
    if (ariaPart.startsWith('[') && ariaPart.endsWith(']')) {
      const content = ariaPart.slice(1, -1);
      
      if (!content.includes('=')) {
        // Simple attribute existence check
        return {
          type: 'aria',
          attribute: content,
          priority: 25
        };
      }

      const [attribute, ...valueParts] = content.split('=');
      const value = valueParts.join('=');

      return {
        type: 'aria',
        attribute,
        value: value.slice(1, -1), // Remove quotes
        priority: 25
      };
    }

    return null;
  }

  static generateAriaSelector(modifier: AriaModifier): string {
    if (modifier.value !== undefined) {
      return `[aria-${modifier.attribute}="${modifier.value}"]`;
    } else {
      return `[aria-${modifier.attribute}]`;
    }
  }

  /**
   * Get all supported boolean ARIA attributes
   */
  static getSupportedBooleanAttributes(): string[] {
    return Array.from(this.BOOLEAN_ARIA_ATTRIBUTES);
  }

  /**
   * Get all supported enumerated ARIA attributes
   */
  static getSupportedEnumeratedAttributes(): Record<string, string[]> {
    return { ...this.ENUMERATED_ARIA_ATTRIBUTES };
  }

  /**
   * Generate group and peer variants for ARIA modifiers
   */
  static generateGroupSelector(modifier: AriaModifier): string {
    const ariaSelector = this.generateAriaSelector(modifier);
    return `:where(.group)${ariaSelector}`;
  }

  static generatePeerSelector(modifier: AriaModifier): string {
    const ariaSelector = this.generateAriaSelector(modifier);
    return `:where(.peer)${ariaSelector}`;
  }
} 
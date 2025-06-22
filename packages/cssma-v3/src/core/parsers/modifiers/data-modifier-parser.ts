/**
 * Data modifier parser for CSSMA-V3
 * Handles data-* attribute modifiers
 * Following Tailwind CSS data-* variant patterns
 */

export interface DataModifier {
  type: 'data';
  attribute: string;
  value?: string;
  priority: number;
}

export class DataModifierParser {
  // Common data attributes that are used without values (existence check)
  private static readonly BOOLEAN_DATA_ATTRIBUTES = new Set([
    'active',
    'loading',
    'disabled',
    'selected',
    'open',
    'closed',
    'visible',
    'hidden',
    'expanded',
    'collapsed',
    'highlighted',
    'focused',
    'dragging',
    'dropping',
    'valid',
    'invalid',
    'required',
    'optional',
    'checked',
    'pressed',
    'current',
    'complete',
    'error',
    'success',
    'warning',
    'info'
  ]);

  // Common data attributes with enumerated values
  private static readonly ENUMERATED_DATA_ATTRIBUTES: Record<string, string[]> = {
    'state': ['idle', 'loading', 'success', 'error', 'warning'],
    'status': ['pending', 'active', 'inactive', 'complete', 'error'],
    'theme': ['light', 'dark', 'auto'],
    'size': ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    'variant': ['primary', 'secondary', 'danger', 'warning', 'success', 'info'],
    'orientation': ['horizontal', 'vertical'],
    'position': ['top', 'right', 'bottom', 'left', 'center'],
    'align': ['start', 'center', 'end', 'stretch'],
    'justify': ['start', 'center', 'end', 'between', 'around', 'evenly'],
    'direction': ['ltr', 'rtl', 'row', 'column'],
    'placement': ['auto', 'top', 'bottom', 'left', 'right']
  };

  static isValidDataModifier(modifier: string): boolean {
    // Check for data- prefix
    if (!modifier.startsWith('data-')) {
      return false;
    }

    const dataPart = modifier.slice(5); // Remove 'data-' prefix

    // Check for boolean attributes (data-active, data-loading, etc.)
    if (this.BOOLEAN_DATA_ATTRIBUTES.has(dataPart)) {
      return true;
    }

    // Check for enumerated attributes with specific values (data-state-loading)
    for (const [attribute, values] of Object.entries(this.ENUMERATED_DATA_ATTRIBUTES)) {
      if (dataPart.startsWith(attribute + '-')) {
        const value = dataPart.slice(attribute.length + 1);
        if (values.includes(value)) {
          return true;
        }
      }
    }

    // Check for arbitrary values (data-[size="large"])
    if (dataPart.startsWith('[') && dataPart.endsWith(']')) {
      return this.isValidArbitraryDataValue(dataPart);
    }

    return false;
  }

  private static isValidArbitraryDataValue(arbitraryValue: string): boolean {
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

    // Validate attribute name (should be valid data attribute)
    if (!/^[a-z]+[a-z0-9-]*$/.test(attribute)) {
      return false;
    }

    // Value should be quoted
    return /^["'][^"']*["']$/.test(value);
  }

  static parseDataModifier(modifier: string): DataModifier | null {
    if (!this.isValidDataModifier(modifier)) {
      return null;
    }

    const dataPart = modifier.slice(5); // Remove 'data-' prefix

    // Handle boolean attributes
    if (this.BOOLEAN_DATA_ATTRIBUTES.has(dataPart)) {
      return {
        type: 'data',
        attribute: dataPart,
        priority: 20
      };
    }

    // Handle enumerated attributes
    for (const [attribute, values] of Object.entries(this.ENUMERATED_DATA_ATTRIBUTES)) {
      if (dataPart.startsWith(attribute + '-')) {
        const value = dataPart.slice(attribute.length + 1);
        if (values.includes(value)) {
          return {
            type: 'data',
            attribute,
            value,
            priority: 20
          };
        }
      }
    }

    // Handle arbitrary values
    if (dataPart.startsWith('[') && dataPart.endsWith(']')) {
      const content = dataPart.slice(1, -1);
      
      if (!content.includes('=')) {
        // Simple attribute existence check
        return {
          type: 'data',
          attribute: content,
          priority: 20
        };
      }

      const [attribute, ...valueParts] = content.split('=');
      const value = valueParts.join('=');

      return {
        type: 'data',
        attribute,
        value: value.slice(1, -1), // Remove quotes
        priority: 20
      };
    }

    return null;
  }

  static generateDataSelector(modifier: DataModifier): string {
    if (modifier.value !== undefined) {
      return `[data-${modifier.attribute}="${modifier.value}"]`;
    } else {
      return `[data-${modifier.attribute}]`;
    }
  }

  /**
   * Get all supported boolean data attributes
   */
  static getSupportedBooleanAttributes(): string[] {
    return Array.from(this.BOOLEAN_DATA_ATTRIBUTES);
  }

  /**
   * Get all supported enumerated data attributes
   */
  static getSupportedEnumeratedAttributes(): Record<string, string[]> {
    return { ...this.ENUMERATED_DATA_ATTRIBUTES };
  }

  /**
   * Generate group and peer variants for data modifiers
   */
  static generateGroupSelector(modifier: DataModifier): string {
    const dataSelector = this.generateDataSelector(modifier);
    return `:where(.group)${dataSelector}`;
  }

  static generatePeerSelector(modifier: DataModifier): string {
    const dataSelector = this.generateDataSelector(modifier);
    return `:where(.peer)${dataSelector}`;
  }

  /**
   * Generate CSS variable-based data selector for dynamic values
   */
  static generateCSSVariableSelector(attribute: string): string {
    return `[data-${attribute}]`;
  }

  /**
   * Check if a data attribute supports multiple values (space-separated)
   */
  static supportsMultipleValues(attribute: string): boolean {
    // Attributes that commonly support multiple space-separated values
    const multiValueAttributes = new Set([
      'ui', 'class', 'tags', 'flags', 'modes', 'types'
    ]);
    
    return multiValueAttributes.has(attribute);
  }

  /**
   * Generate selector for multi-value data attributes using CSS attribute selectors
   */
  static generateMultiValueSelector(attribute: string, value: string): string {
    return `[data-${attribute}~="${value}"]`;
  }
} 
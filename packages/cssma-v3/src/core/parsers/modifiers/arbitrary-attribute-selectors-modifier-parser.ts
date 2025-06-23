// https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties
// Arbitrary properties
// If you ever need to use a CSS property that Tailwind doesn't include a utility for out of the box, you can also use square bracket notation to write completely arbitrary CSS:

// [my-property="value"] {
//   /* ... */
// }

// [my-property~="value"] {
//   /* ... */
// }

export interface ArbitraryAttributeSelectorModifier {
  type: 'arbitrary-attribute';
  attribute: string;
  value?: string;
  priority: number;
}

export class ArbitraryAttributeSelectorModifierParser {


  static isValidArbitraryAttributeSelector(modifier: string): boolean {
    return this.canParse(modifier);
  }

  private static isValidArbitraryAttributeSelectorValue(value: string): boolean {
    return value.startsWith('[') && value.endsWith(']') && value.length > 2;
  }

  static parseArbitraryAttributeModifier(input: string): ArbitraryAttributeSelectorModifier | null {
    if (!this.isValidArbitraryAttributeSelector(input)) {
      return null;
    }

    // Remove the square brackets
    const content = input.slice(1, -1);
    
    // Check if content is empty
    if (!content) {
      return null;
    }

    // Parse attribute selector patterns
    // Patterns: [attr], [attr="value"], [attr~="value"], [attr|="value"], [attr^="value"], [attr$="value"], [attr*="value"]
    
    // Check for attribute with value (contains =)
    const valueMatch = content.match(/^([^=]+)(=|~=|\|=|\^=|\$=|\*=)(.*)$/);
    
    if (valueMatch) {
      const [, attribute, operator, value] = valueMatch;
      
      // Clean up attribute name
      const cleanAttribute = attribute.trim();
      
      // Clean up value (remove quotes if present)
      let cleanValue = value.trim();
      if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
          (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
        cleanValue = cleanValue.slice(1, -1);
      }
      
      // Combine operator and value for the final value
      const finalValue = operator + (cleanValue.includes(' ') ? `"${cleanValue}"` : cleanValue);
      
      return {
        type: 'arbitrary-attribute',
        attribute: cleanAttribute,
        value: finalValue,
        priority: 1000 // High priority for arbitrary selectors
      };
    }
    
    // Simple attribute selector without value
    const attributeMatch = content.match(/^([a-zA-Z][a-zA-Z0-9_-]*)$/);
    
    if (attributeMatch) {
      return {
        type: 'arbitrary-attribute',
        attribute: content.trim(),
        priority: 1000
      };
    }
    
    return null;
  }

  static canParse(input: string): boolean {
    console.log('canParse', input);
    return input.startsWith('[') && input.endsWith(']') && input.length > 2;
  }

  static generateSelector(modifier: ArbitraryAttributeSelectorModifier): string {
    return `[${modifier.attribute}${modifier.value ? modifier.value : ''}]`;
  }

  static getSupportedAttributes(): string[] {
    return [];
  }

  static getAllSupportedAttributes(): string[] {
    return [];
  }

  static getAttributeType(attribute: string): string | null {
    return 'arbitrary-attribute';
  }

  static isValidAttributeName(attribute: string): boolean {
    return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(attribute);
  }

  static parseAttributeValue(value: string): { operator: string; value: string } | null {
    const match = value.match(/^(=|~=|\|=|\^=|\$=|\*=)(.*)$/);
    if (!match) return null;
    
    const [, operator, val] = match;
    let cleanValue = val.trim();
    
    // Remove quotes if present
    if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
        (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
      cleanValue = cleanValue.slice(1, -1);
    }
    
    return { operator, value: cleanValue };
  }

  static getSupportedOperators(): string[] {
    return ['=', '~=', '|=', '^=', '$=', '*='];
  }

  static validateSelector(selector: string): boolean {
    if (!selector.startsWith('[') || !selector.endsWith(']')) {
      return false;
    }
    
    const content = selector.slice(1, -1);
    if (!content) return false;
    
    // Check if it's a simple attribute or attribute with value
    const valueMatch = content.match(/^([^=]+)(=|~=|\|=|\^=|\$=|\*=)(.*)$/);
    if (valueMatch) {
      const [, attribute, operator, value] = valueMatch;
      return this.isValidAttributeName(attribute.trim()) && 
             this.getSupportedOperators().includes(operator) &&
             value.trim().length > 0;
    }
    
    return this.isValidAttributeName(content.trim());
  }

  static getModifierInfo(modifier: ArbitraryAttributeSelectorModifier): {
    type: string;
    attribute: string;
    hasValue: boolean;
    operator?: string;
    value?: string;
    priority: number;
  } {
    const info: any = {
      type: modifier.type,
      attribute: modifier.attribute,
      hasValue: !!modifier.value,
      priority: modifier.priority
    };

    if (modifier.value) {
      const parsed = this.parseAttributeValue(modifier.value);
      if (parsed) {
        info.operator = parsed.operator;
        info.value = parsed.value;
      }
    }

    return info;
  }

  static createModifier(
    attribute: string, 
    operator?: string, 
    value?: string
  ): ArbitraryAttributeSelectorModifier | null {
    if (!this.isValidAttributeName(attribute)) {
      return null;
    }

    const modifier: ArbitraryAttributeSelectorModifier = {
      type: 'arbitrary-attribute',
      attribute,
      priority: 1000
    };

    if (operator && value !== undefined) {
      if (!this.getSupportedOperators().includes(operator)) {
        return null;
      }
      const formattedValue = value.includes(' ') ? `"${value}"` : value;
      modifier.value = operator + formattedValue;
    }

    return modifier;
  }

  static compareModifiers(
    a: ArbitraryAttributeSelectorModifier, 
    b: ArbitraryAttributeSelectorModifier
  ): number {
    // Compare by priority first
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    
    // Then by attribute name
    if (a.attribute !== b.attribute) {
      return a.attribute.localeCompare(b.attribute);
    }
    
    // Finally by value presence and content
    if (a.value && !b.value) return 1;
    if (!a.value && b.value) return -1;
    if (a.value && b.value) {
      return a.value.localeCompare(b.value);
    }
    
    return 0;
  }

  static generateAttributeSelector(modifier: ArbitraryAttributeSelectorModifier): string {
    return `[${modifier.attribute}${modifier.value ? modifier.value : ''}]`;
  }
}
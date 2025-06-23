/**
 * Nth modifier parser for CSSMA-V3
 * Handles CSS nth-child, nth-of-type, and related selectors
 * Following Tailwind CSS nth-* variant patterns
 */

export interface NthModifier {
  type: 'nth-child' | 'nth-of-type' | 'nth-last-child' | 'nth-last-of-type';
  formula: string; // e.g., "2n+1", "3", "odd", "even"
  raw: string;
  priority: number;
}

export class NthModifierParser {
  // Supported nth types
  private static readonly NTH_TYPES = [
    'nth-child',
    'nth-of-type', 
    'nth-last-child',
    'nth-last-of-type'
  ] as const;

  // Common nth formulas
  private static readonly COMMON_FORMULAS = [
    'odd', 'even',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '2n', '3n', '4n', '5n',
    '2n+1', '2n+2', '3n+1', '3n+2', '4n+1', '4n+2', '4n+3'
  ];

  /**
   * Check if modifier is an nth modifier
   */
  static isNthModifier(modifier: string): boolean {
    // Check for standard nth patterns: nth-child-3, nth-of-type-2n+1
    for (const type of this.NTH_TYPES) {
      if (modifier.startsWith(`${type}-`)) {
        return true;
      }
    }

    // Check for arbitrary nth patterns: nth-child-[2n+3]
    return this.isArbitraryNthModifier(modifier);
  }

  /**
   * Check if modifier is an arbitrary nth modifier
   */
  static isArbitraryNthModifier(modifier: string): boolean {
    for (const type of this.NTH_TYPES) {
      if (modifier.startsWith(`${type}-[`) && modifier.endsWith(']')) {
        return true;
      }
    }
    return false;
  }

  /**
   * Parse nth modifier
   */
  static parseNthModifier(modifier: string): NthModifier | null {
    if (!this.isNthModifier(modifier)) {
      return null;
    }

    // Try to parse each nth type
    for (const type of this.NTH_TYPES) {
      const result = this.parseSpecificNthType(modifier, type);
      if (result) {
        return result;
      }
    }

    return null;
  }

  /**
   * Parse specific nth type
   */
  private static parseSpecificNthType(
    modifier: string, 
    type: typeof this.NTH_TYPES[number]
  ): NthModifier | null {
    const prefix = `${type}-`;
    
    if (!modifier.startsWith(prefix)) {
      return null;
    }

    const formulaPart = modifier.slice(prefix.length);

    // Handle arbitrary values: nth-child-[2n+3]
    if (formulaPart.startsWith('[') && formulaPart.endsWith(']')) {
      const formula = formulaPart.slice(1, -1); // Remove brackets
      if (this.isValidNthFormula(formula)) {
        return {
          type,
          formula,
          raw: modifier,
          priority: 11
        };
      }
    }
    // Handle standard values: nth-child-3, nth-child-odd
    else if (this.isValidNthFormula(formulaPart)) {
      return {
        type,
        formula: formulaPart,
        raw: modifier,
        priority: 11
      };
    }

    return null;
  }

  /**
   * Validate nth formula
   */
  private static isValidNthFormula(formula: string): boolean {
    if (!formula) return false;

    // Check common formulas first
    if (this.COMMON_FORMULAS.includes(formula)) {
      return true;
    }

    // Validate nth formula pattern (an+b, where a and b are integers)
    // Examples: 2n+1, 3n-2, -2n+5, n+0, -n-1
    const nthPattern = /^(-?\d*n?(?:[+-]\d+)?|odd|even|\d+)$/;
    return nthPattern.test(formula);
  }

  /**
   * Generate CSS selector for nth modifier
   */
  static generateNthSelector(modifier: NthModifier, baseSelector: string): string {
    const pseudoClass = `:${modifier.type}(${modifier.formula})`;
    return `${baseSelector}${pseudoClass}`;
  }

  /**
   * Get all supported nth modifiers for a given formula
   */
  static getSupportedNthModifiers(formula?: string): string[] {
    const modifiers: string[] = [];
    const formulas = formula ? [formula] : this.COMMON_FORMULAS;

    for (const type of this.NTH_TYPES) {
      for (const f of formulas) {
        modifiers.push(`${type}-${f}`);
      }
    }

    return modifiers;
  }

  /**
   * Parse nth formula to extract coefficient and constant
   * Returns {a, b} where formula is "an+b"
   */
  static parseNthFormula(formula: string): { a: number; b: number } | null {
    if (formula === 'odd') return { a: 2, b: 1 };
    if (formula === 'even') return { a: 2, b: 0 };
    
    // Simple number: "3" -> 0n+3
    if (/^\d+$/.test(formula)) {
      return { a: 0, b: parseInt(formula, 10) };
    }

    // Complex formula: "2n+1", "3n-2", "-n+5"
    const match = formula.match(/^(-?\d*)n?([+-]\d+)?$/);
    if (!match) return null;

    const aStr = match[1] || '1';
    const bStr = match[2] || '0';

    const a = aStr === '' || aStr === '+' ? 1 : 
              aStr === '-' ? -1 : 
              parseInt(aStr, 10);
    const b = parseInt(bStr, 10) || 0;

    return { a, b };
  }

  /**
   * Check if nth formula matches a specific position
   */
  static matchesPosition(formula: string, position: number): boolean {
    const parsed = this.parseNthFormula(formula);
    if (!parsed) return false;

    const { a, b } = parsed;
    
    if (a === 0) {
      // Simple position match: nth-child-3
      return position === b;
    }

    // Formula match: an+b
    if (a > 0) {
      return position >= b && (position - b) % a === 0;
    } else if (a < 0) {
      return position <= b && (b - position) % Math.abs(a) === 0;
    }

    return false;
  }

  /**
   * Get modifier priority
   */
  static getModifierPriority(modifier: NthModifier): number {
    return modifier.priority;
  }

  /**
   * Validate nth modifier syntax
   */
  static validateSyntax(modifier: string): boolean {
    return this.parseNthModifier(modifier) !== null;
  }

  /**
   * Get CSS pseudo-class for nth modifier
   */
  static getCssPseudoClass(modifier: NthModifier): string {
    return `:${modifier.type}(${modifier.formula})`;
  }

  /**
   * Get all nth modifiers for comprehensive parsing
   */
  static getAllNthModifiers(): string[] {
    return this.getSupportedNthModifiers();
  }
} 
/**
 * Not modifier parser for CSSMA-V3
 * Handles CSS :not() pseudo-class modifiers
 * Following Tailwind CSS not-* variant patterns
 */

export interface NotModifier {
  negatedSelector: string;
  raw: string;
  priority: number;
}

export class NotModifierParser {
  // Supported selectors that can be negated with :not()
  private static readonly NEGATABLE_SELECTORS = [
    'first', 'last', 'odd', 'even',
    'first-child', 'last-child', 'only-child',
    'first-of-type', 'last-of-type', 'only-of-type',
    'empty', 'disabled', 'enabled',
    'checked', 'indeterminate',
    'default', 'required', 'valid', 'invalid',
    'in-range', 'out-of-range',
    'placeholder-shown', 'autofill',
    'read-only', 'read-write'
  ];

  // Mapping from Tailwind not-* classes to CSS selectors
  private static readonly NOT_SELECTOR_MAP: Record<string, string> = {
    'not-first': ':not(:first-child)',
    'not-last': ':not(:last-child)',
    'not-odd': ':not(:nth-child(odd))',
    'not-even': ':not(:nth-child(even))',
    'not-first-child': ':not(:first-child)',
    'not-last-child': ':not(:last-child)',
    'not-only-child': ':not(:only-child)',
    'not-first-of-type': ':not(:first-of-type)',
    'not-last-of-type': ':not(:last-of-type)',
    'not-only-of-type': ':not(:only-of-type)',
    'not-empty': ':not(:empty)',
    'not-disabled': ':not(:disabled)',
    'not-enabled': ':not(:enabled)',
    'not-checked': ':not(:checked)',
    'not-indeterminate': ':not(:indeterminate)',
    'not-default': ':not(:default)',
    'not-required': ':not(:required)',
    'not-valid': ':not(:valid)',
    'not-invalid': ':not(:invalid)',
    'not-in-range': ':not(:in-range)',
    'not-out-of-range': ':not(:out-of-range)',
    'not-placeholder-shown': ':not(:placeholder-shown)',
    'not-autofill': ':not(:autofill)',
    'not-read-only': ':not(:read-only)',
    'not-read-write': ':not(:read-write)'
  };

  /**
   * Check if modifier is a not modifier
   */
  static isNotModifier(modifier: string): boolean {
    return modifier.startsWith('not-') && this.NOT_SELECTOR_MAP.hasOwnProperty(modifier);
  }

  /**
   * Parse not modifier
   */
  static parseNotModifier(modifier: string): NotModifier | null {
    if (!this.isNotModifier(modifier)) {
      return null;
    }

    const negatedSelector = this.NOT_SELECTOR_MAP[modifier];
    if (!negatedSelector) {
      return null;
    }

    return {
      negatedSelector,
      raw: modifier,
      priority: 12 // Same priority as other pseudo-class modifiers
    };
  }

  /**
   * Generate CSS selector for not modifier
   */
  static generateNotSelector(modifier: NotModifier, baseSelector: string): string {
    return `${baseSelector}${modifier.negatedSelector}`;
  }

  /**
   * Get all supported not modifiers
   */
  static getSupportedNotModifiers(): string[] {
    return Object.keys(this.NOT_SELECTOR_MAP);
  }

  /**
   * Check if a selector can be negated
   */
  static isNegatable(selector: string): boolean {
    return this.NEGATABLE_SELECTORS.includes(selector);
  }

  /**
   * Get CSS selector for not modifier
   */
  static getCssSelector(modifier: string): string | null {
    return this.NOT_SELECTOR_MAP[modifier] || null;
  }

  /**
   * Validate not modifier syntax
   */
  static validateSyntax(modifier: string): boolean {
    if (!modifier.startsWith('not-')) {
      return false;
    }

    const selector = modifier.slice(4); // Remove 'not-' prefix
    return this.NEGATABLE_SELECTORS.includes(selector);
  }

  /**
   * Parse complex not modifier with arbitrary values
   * e.g., not-[.custom-class]
   */
  static parseArbitraryNotModifier(modifier: string): NotModifier | null {
    if (!modifier.startsWith('not-[') || !modifier.endsWith(']')) {
      return null;
    }

    const arbitraryValue = modifier.slice(5, -1); // Remove 'not-[' and ']'
    if (!arbitraryValue) {
      return null;
    }

    return {
      negatedSelector: `:not(${arbitraryValue})`,
      raw: modifier,
      priority: 12
    };
  }

  /**
   * Check if modifier is an arbitrary not modifier
   */
  static isArbitraryNotModifier(modifier: string): boolean {
    return modifier.startsWith('not-[') && modifier.endsWith(']') && modifier.length > 6;
  }

  /**
   * Get modifier priority
   */
  static getModifierPriority(modifier: NotModifier): number {
    return modifier.priority;
  }

  /**
   * Get all not modifiers for comprehensive parsing
   */
  static getAllNotModifiers(): string[] {
    return this.getSupportedNotModifiers();
  }
} 
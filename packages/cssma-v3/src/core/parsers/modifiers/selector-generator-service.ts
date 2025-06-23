/**
 * Selector Generator Service for CSSMA-V3
 * Centralized service for generating CSS selectors from modifiers
 * Handles complex selector combinations and precedence
 */

import type { ParsedModifiers } from '../../../types';
import type { GroupPeerModifier } from './group-peer-modifier-parser';
import type { NotModifier } from './not-modifier-parser';
import type { NthModifier } from './nth-modifier-parser';
import type { SpecialModifier } from './special-modifier-parser';

export interface SelectorContext {
  baseSelector: string;
  modifiers: ParsedModifiers;
  className: string;
}

export class SelectorGeneratorService {
  /**
   * Generate complete CSS selector from parsed modifiers
   */
  static generateSelector(context: SelectorContext): string {
    const { baseSelector, modifiers } = context;
    let selector = baseSelector;

    // Apply modifiers in priority order
    const modifierApplications = [
      () => this.applyResponsiveModifiers(selector, modifiers),
      () => this.applyContainerModifiers(selector, modifiers),
      () => this.applyStateModifiers(selector, modifiers),
      () => this.applyPseudoElementModifiers(selector, modifiers),
      () => this.applyAttributeModifiers(selector, modifiers),
      () => this.applySpecialModifiers(selector, modifiers)
    ];

    // Apply each modifier type
    for (const applyModifier of modifierApplications) {
      selector = applyModifier();
    }

    return selector;
  }

  /**
   * Apply responsive modifiers (breakpoints)
   */
  private static applyResponsiveModifiers(
    selector: string, 
    modifiers: ParsedModifiers
  ): string {
    if (!modifiers.responsive) return selector;

    const { breakpoint, minWidth } = modifiers.responsive;
    
    if (breakpoint && minWidth) {
      return `@media (min-width: ${minWidth}) { ${selector} }`;
    }

    return selector;
  }

  /**
   * Apply container query modifiers
   */
  private static applyContainerModifiers(
    selector: string,
    modifiers: ParsedModifiers
  ): string {
    if (!modifiers.container) return selector;

    const { name, condition } = modifiers.container;
    
    if (condition) {
      const containerQuery = name 
        ? `@container ${name} (${condition})`
        : `@container (${condition})`;
      
      return `${containerQuery} { ${selector} }`;
    }

    return selector;
  }

  /**
   * Apply state modifiers (pseudo-classes)
   */
  private static applyStateModifiers(
    selector: string,
    modifiers: ParsedModifiers
  ): string {
    if (!modifiers.state) {
      return selector;
    }

    let modifiedSelector = selector;

    // Apply the state modifier
    const pseudoClass = this.getStatePseudoClass(modifiers.state);
    if (pseudoClass) {
      modifiedSelector = `${modifiedSelector}${pseudoClass}`;
    }

    return modifiedSelector;
  }

  /**
   * Apply pseudo-element modifiers
   */
  private static applyPseudoElementModifiers(
    selector: string,
    modifiers: ParsedModifiers
  ): string {
    if (!modifiers.pseudoElement) {
      return selector;
    }

    let modifiedSelector = selector;

    // Apply the pseudo-element
    const pseudoElementSelector = this.getPseudoElementSelector(modifiers.pseudoElement);
    if (pseudoElementSelector) {
      modifiedSelector = `${modifiedSelector}${pseudoElementSelector}`;
    }

    return modifiedSelector;
  }

  /**
   * Apply attribute modifiers (aria, data)
   */
  private static applyAttributeModifiers(
    selector: string,
    modifiers: ParsedModifiers
  ): string {
    let modifiedSelector = selector;

    // Apply ARIA attributes
    if (modifiers.aria) {
      for (const [attribute, value] of Object.entries(modifiers.aria)) {
        const ariaSelector = value 
          ? `[aria-${attribute}="${value}"]`
          : `[aria-${attribute}]`;
        modifiedSelector = `${modifiedSelector}${ariaSelector}`;
      }
    }

    // Apply data attributes
    if (modifiers.data) {
      for (const [attribute, value] of Object.entries(modifiers.data)) {
        const dataSelector = value 
          ? `[data-${attribute}="${value}"]`
          : `[data-${attribute}]`;
        modifiedSelector = `${modifiedSelector}${dataSelector}`;
      }
    }

    return modifiedSelector;
  }

  /**
   * Apply special modifiers (noscript, starting, etc.)
   */
  private static applySpecialModifiers(
    selector: string,
    modifiers: ParsedModifiers
  ): string {
    // This would need to be implemented when special modifiers are added to ParsedModifiers
    // For now, return selector unchanged
    return selector;
  }

  /**
   * Generate selector for group/peer modifier
   */
  static generateGroupPeerSelector(
    modifier: GroupPeerModifier, 
    baseSelector: string
  ): string {
    if (modifier.type === 'group') {
      if (modifier.state) {
        return `.group:${modifier.state} ${baseSelector}`;
      } else {
        return `.group ${baseSelector}`;
      }
    } else if (modifier.type === 'peer') {
      if (modifier.state) {
        return `.peer:${modifier.state} + ${baseSelector}`;
      } else {
        return `.peer + ${baseSelector}`;
      }
    }

    return baseSelector;
  }

  /**
   * Generate selector for not modifier
   */
  static generateNotSelector(modifier: NotModifier, baseSelector: string): string {
    return `${baseSelector}${modifier.negatedSelector}`;
  }

  /**
   * Generate selector for nth modifier
   */
  static generateNthSelector(modifier: NthModifier, baseSelector: string): string {
    const pseudoClass = `:${modifier.type}(${modifier.formula})`;
    return `${baseSelector}${pseudoClass}`;
  }

  /**
   * Generate selector for special modifier
   */
  static generateSpecialSelector(
    modifier: SpecialModifier, 
    baseSelector: string
  ): string {
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
          return `@media (${modifier.condition}) { ${baseSelector} }`;
        }
        break;
    }

    return baseSelector;
  }

  /**
   * Get CSS pseudo-class for state
   */
  private static getStatePseudoClass(state: string): string | null {
    const stateMap: Record<string, string> = {
      // Interactive states
      'hover': ':hover',
      'focus': ':focus',
      'focus-within': ':focus-within',
      'focus-visible': ':focus-visible',
      'active': ':active',
      'visited': ':visited',
      'target': ':target',
      
      // Form states
      'disabled': ':disabled',
      'enabled': ':enabled',
      'checked': ':checked',
      'indeterminate': ':indeterminate',
      'default': ':default',
      'required': ':required',
      'valid': ':valid',
      'invalid': ':invalid',
      'user-valid': ':user-valid',
      'user-invalid': ':user-invalid',
      'in-range': ':in-range',
      'out-of-range': ':out-of-range',
      'placeholder-shown': ':placeholder-shown',
      'autofill': ':autofill',
      'read-only': ':read-only',
      'read-write': ':read-write',
      
      // Structural states
      'first': ':first-child',
      'last': ':last-child',
      'only': ':only-child',
      'odd': ':nth-child(odd)',
      'even': ':nth-child(even)',
      'first-of-type': ':first-of-type',
      'last-of-type': ':last-of-type',
      'only-of-type': ':only-of-type',
      'empty': ':empty',
      
      // Interactive content states
      'open': ':open',
      'closed': ':closed',
      
      // Media preference states
      'motion-safe': '@media (prefers-reduced-motion: no-preference)',
      'motion-reduce': '@media (prefers-reduced-motion: reduce)',
      'contrast-more': '@media (prefers-contrast: more)',
      'contrast-less': '@media (prefers-contrast: less)',
      'inverted-colors': '@media (inverted-colors: inverted)',
      
      // Pointer states
      'pointer-fine': '@media (pointer: fine)',
      'pointer-coarse': '@media (pointer: coarse)',
      'pointer-none': '@media (pointer: none)',
      'any-pointer-fine': '@media (any-pointer: fine)',
      'any-pointer-coarse': '@media (any-pointer: coarse)',
      'any-pointer-none': '@media (any-pointer: none)',
      
      // Hover capability
      'can-hover': '@media (hover: hover)',
      'no-hover': '@media (hover: none)',
      
      // Color scheme
      'dark': '@media (prefers-color-scheme: dark)',
      'light': '@media (prefers-color-scheme: light)',
      
      // Print
      'print': '@media print'
    };

    return stateMap[state] || null;
  }

  /**
   * Get CSS pseudo-element selector
   */
  private static getPseudoElementSelector(pseudoElement: string): string | null {
    const pseudoElementMap: Record<string, string> = {
      'before': '::before',
      'after': '::after',
      'first-line': '::first-line',
      'first-letter': '::first-letter',
      'selection': '::selection',
      'file-selector-button': '::file-selector-button',
      'placeholder': '::placeholder',
      'marker': '::marker',
      'backdrop': '::backdrop'
    };

    return pseudoElementMap[pseudoElement] || null;
  }

  /**
   * Combine multiple selectors with proper precedence
   */
  static combineSelectors(selectors: string[], combinator: ' ' | '>' | '+' | '~' = ' '): string {
    return selectors.filter(Boolean).join(combinator);
  }

  /**
   * Validate selector syntax
   */
  static validateSelector(selector: string): boolean {
    try {
      // Basic validation - check for common CSS selector patterns
      const selectorPattern = /^[.#]?[\w-]+(:[\w-]+)*(\[[\w-]+(="[^"]*")?\])*$/;
      return selectorPattern.test(selector.trim());
    } catch {
      return false;
    }
  }

  /**
   * Escape CSS selector special characters
   */
  static escapeSelector(selector: string): string {
    return selector.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '\\$&');
  }
} 
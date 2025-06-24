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

    // Apply pseudo-element first (most specific)
    if (modifiers.pseudoElement) {
      selector = this.applyPseudoElementModifiers(selector, modifiers);
    }

    // Apply state modifiers (pseudo-classes)
    if (modifiers.state && Array.isArray(modifiers.state) && modifiers.state.length > 0) {
      selector = this.applyStateModifiers(selector, modifiers);
    }

    // Apply attribute modifiers (aria, data) - these are already complete selectors
    if (modifiers.aria) {
      selector = this.applyAriaModifiers(selector, modifiers);
    }
    
    if (modifiers.data) {
      selector = this.applyDataModifiers(selector, modifiers);
    }

    // Apply container queries (wrap in container query)
    if (modifiers.container) {
      selector = this.applyContainerModifiers(selector, modifiers);
    }

    // Apply motion preferences (wrap in media query)
    if (modifiers.motion) {
      selector = this.applyMotionModifiers(selector, modifiers);
    }

    // Apply responsive modifiers last (outermost wrapper)
    if (modifiers.responsive) {
      selector = this.applyResponsiveModifiers(selector, modifiers);
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

    // modifiers.responsive is in the format { md: '@media (min-width: 768px)' }
    for (const [breakpoint, mediaQuery] of Object.entries(modifiers.responsive)) {
      selector = `${mediaQuery} { ${selector} }`;
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

    // modifiers.container is in the format { '@container': '@container (min-width: 400px)' }
    for (const [key, containerQuery] of Object.entries(modifiers.container)) {
      selector = `${containerQuery} { ${selector} }`;
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
    if (!modifiers.state || !Array.isArray(modifiers.state)) {
      return selector;
    }

    let modifiedSelector = selector;

    // Apply each state modifier in the array
    for (const state of modifiers.state) {
      // state is already in CSS format like ':hover' or '@media (...)'
      if (state.startsWith('@media') || state.startsWith('@supports')) {
        // Media queries and supports queries wrap the selector
        modifiedSelector = `${state} { ${modifiedSelector} }`;
      } else {
        // Pseudo-classes append to the selector
        modifiedSelector = `${modifiedSelector}${state}`;
      }
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

    // pseudoElement is already in CSS format like '::before'
    return `${selector}${modifiers.pseudoElement}`;
  }

  /**
    // Apply ARIA attributes - values are already complete selectors like '[aria-label]'
    if (modifiers.aria) {
      for (const [attribute, ariaSelector] of Object.entries(modifiers.aria)) {
        modifiedSelector = `${modifiedSelector}${ariaSelector}`;
      }
    }

    // Apply data attributes - values are already complete selectors like '[data-size="large"]'
    if (modifiers.data) {
      for (const [attribute, dataSelector] of Object.entries(modifiers.data)) {
        modifiedSelector = `${modifiedSelector}${dataSelector}`;
      }
    }
  /**
   * Apply data attribute modifiers
   */
  private static applyDataModifiers(
    selector: string,
    modifiers: ParsedModifiers
  ): string {
    if (!modifiers.data) return selector;

    let modifiedSelector = selector;

    // modifiers.data values are already complete selectors like '[data-size="large"]'
    for (const [attribute, dataSelector] of Object.entries(modifiers.data)) {
      modifiedSelector = `${modifiedSelector}${dataSelector}`;
    }

    return modifiedSelector;
  }

  /**
   * Apply motion preferences (wrap in media query)
   */
  private static applyMotionModifiers(
    selector: string,
    modifiers: ParsedModifiers
  ): string {
    if (!modifiers.motion) return selector;

    // modifiers.motion is already in media query format
    return `${modifiers.motion} { ${selector} }`;
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
/**
 * Unified modifier parser for CSSMA-V3
 * Following Tailwind CSS architecture and specifications
 * Supports all modifiers: responsive, container queries, states, pseudo-elements, attributes
 */

import type { ParsedModifiers } from '../../../types';
import { ResponsiveModifierParser } from './responsive-modifier-parser';
import { StateModifierParser } from './state-modifier-parser';
import { ContainerModifierParser } from './container-modifier-parser';
import { MotionModifierParser } from './motion-modifier-parser';
import { DataModifierParser } from './data-modifier-parser';
import { AriaModifierParser } from './aria-modifier-parser';
import { PseudoElementModifierParser } from './pseudo-element-modifier-parser';

// Tailwind CSS modifier priority order (처리 순서)
const MODIFIER_PRIORITY = {
  // 1. Media queries (highest priority)
  responsive: 1,
  container: 2,
  motion: 3,
  
  // 2. Pseudo-classes and states
  state: 4,
  
  // 3. Pseudo-elements
  pseudoElement: 5,
  
  // 4. Attributes
  aria: 6,
  data: 7,
  
  // 5. Special modifiers
  not: 8,
  starting: 9,
  pointer: 10,
  noscript: 11,
  userValid: 12,
  invertedColors: 13,
  detailsContent: 14
} as const;

// Tailwind responsive breakpoints
const RESPONSIVE_BREAKPOINTS: Record<string, string> = {
  'sm': '@media (min-width: 640px)',
  'md': '@media (min-width: 768px)', 
  'lg': '@media (min-width: 1024px)',
  'xl': '@media (min-width: 1280px)',
  '2xl': '@media (min-width: 1536px)',
  // Also supports arbitrary breakpoints: sm:[640px]
};

// Container query modifiers
const CONTAINER_QUERIES: Record<string, string> = {
  '@sm': '@container (min-width: 640px)',
  '@md': '@container (min-width: 768px)',
  '@lg': '@container (min-width: 1024px)', 
  '@xl': '@container (min-width: 1280px)',
  '@2xl': '@container (min-width: 1536px)',
  '@3xl': '@container (min-width: 1920px)',
  '@4xl': '@container (min-width: 2560px)',
  '@5xl': '@container (min-width: 3840px)',
  '@6xl': '@container (min-width: 5120px)',
  '@7xl': '@container (min-width: 7680px)',
  // Max-width container queries
  '@max-sm': '@container (max-width: 639px)',
  '@max-md': '@container (max-width: 767px)',
  '@max-lg': '@container (max-width: 1023px)',
  '@max-xl': '@container (max-width: 1279px)',
  '@max-2xl': '@container (max-width: 1535px)',
  // Named containers: @container/name
  // Dynamic: @min-*, @max-*
};

// Motion preference modifiers
const MOTION_MODIFIERS: Record<string, string> = {
  'motion-safe': '@media (prefers-reduced-motion: no-preference)',
  'motion-reduce': '@media (prefers-reduced-motion: reduce)',
};

// State pseudo-classes (comprehensive list)
const STATE_MODIFIERS: Record<string, string> = {
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
  'in-range': ':in-range',
  'out-of-range': ':out-of-range',
  'placeholder-shown': ':placeholder-shown',
  'autofill': ':autofill',
  'read-only': ':read-only',
  
  // Form validation states
  'user-valid': ':user-valid',
  'user-invalid': ':user-invalid',
  
  // UI states
  'first': ':first-child',
  'last': ':last-child',
  'only': ':only-child',
  'odd': ':nth-child(odd)',
  'even': ':nth-child(even)',
  'first-of-type': ':first-of-type',
  'last-of-type': ':last-of-type',
  'only-of-type': ':only-of-type',
  'empty': ':empty',
  
  // Additional states
  'open': ':open', // for details and dialog
  'closed': ':closed',
  'fullscreen': ':fullscreen',
  'loading': ':loading',
  'inert': ':inert',
  
  // Print media
  'print': '@media print',
  
  // Dark mode
  'dark': '@media (prefers-color-scheme: dark)',
  'light': '@media (prefers-color-scheme: light)',
  
  // OS/accessibility states
  'inverted-colors': '@media (inverted-colors: inverted)',
  'no-inverted-colors': '@media (inverted-colors: none)',
  'noscript': 'html:not(.js)',
  
  // Pointer device variants
  'pointer-fine': '@media (pointer: fine)',
  'pointer-coarse': '@media (pointer: coarse)',
  'pointer-none': '@media (pointer: none)',
  'any-pointer-fine': '@media (any-pointer: fine)',
  'any-pointer-coarse': '@media (any-pointer: coarse)',
  'any-pointer-none': '@media (any-pointer: none)',
  
  // Hover capability
  'can-hover': '@media (hover: hover)',
  'no-hover': '@media (hover: none)',
  
  // Starting style modifier
  'starting': '@starting-style',
};

// Pseudo-elements
const PSEUDO_ELEMENTS: Record<string, string> = {
  'before': '::before',
  'after': '::after',
  'first-line': '::first-line',
  'first-letter': '::first-letter',
  'selection': '::selection',
  'file': '::file-selector-button',
  'backdrop': '::backdrop',
  'placeholder': '::placeholder',
  'marker': '::marker',
  'details-content': '> :not(summary)', // Special case for details content
};

// Group and peer modifiers
const GROUP_PEER_MODIFIERS = ['group', 'peer'] as const;

// Not modifier (negation)
const NOT_MODIFIER_REGEX = /^not-(.+)$/;

// Arbitrary value modifier patterns
const ARBITRARY_VALUE_REGEX = /\[([^\]]+)\]/;

export class ModifierParser {
  /**
   * Parse all modifiers from a className
   */
  static parseModifiers(className: string): ParsedModifiers {
    const modifiers: ParsedModifiers = this.createEmptyModifiers();
    
    // Split className by colon to get modifiers and base class
    const parts = className.split(':');
    if (parts.length <= 1) {
      return modifiers; // No modifiers
    }
    
    // Process each modifier (all parts except the last one)
    const modifierParts = parts.slice(0, -1);
    
    for (const modifier of modifierParts) {
      this.processModifier(modifier, modifiers);
    }
    
    return modifiers;
  }

  /**
   * Create empty modifiers structure
   */
  private static createEmptyModifiers(): ParsedModifiers {
    return {
      responsive: {},
      container: {},
      motion: null,
      state: null,
      pseudoElement: null,
      aria: {},
      data: {},
      group: null,
      peer: null,
      not: null,
      starting: false,
      noscript: null,
      userValid: null,
      invertedColors: null,
      pointer: null,
      detailsContent: null
    };
  }

  /**
   * Process individual modifier using specialized parsers
   */
  private static processModifier(modifier: string, modifiers: ParsedModifiers): void {
    // 1. Check for responsive modifiers
    if (ResponsiveModifierParser.isResponsiveModifier(modifier)) {
      const responsiveResult = ResponsiveModifierParser.parse(modifier);
      if (responsiveResult) {
        const breakpointName = ResponsiveModifierParser.getBreakpointName(modifier);
        const breakpointValue = this.getBreakpointMediaQuery(responsiveResult.modifier);
        modifiers.responsive[breakpointName] = breakpointValue;
      }
      return;
    }

    // 2. Check for container queries
    if (ContainerModifierParser.isContainerModifier(modifier)) {
      const containerResult = ContainerModifierParser.parse(modifier);
      if (containerResult) {
        const containerQuery = this.getContainerMediaQuery(containerResult.modifier);
        modifiers.container[modifier] = containerQuery;
      }
      return;
    }

    // 3. Check for motion preferences
    if (MotionModifierParser.isValidMotionModifier(modifier)) {
      const motionResult = MotionModifierParser.parseMotionModifier(modifier);
      if (motionResult) {
        modifiers.motion = this.getMotionMediaQuery(motionResult.preference);
      }
      return;
    }

    // 4. Check for special modifiers (noscript, starting)
    if (modifier === 'noscript') {
      modifiers.noscript = modifier;
      return;
    }
    
    if (modifier === 'starting') {
      modifiers.starting = true;
      return;
    }

    // 5. Check for group/peer state combinations
    if (modifier.startsWith('group-') || modifier.startsWith('peer-')) {
      const [type, state] = modifier.split('-', 2);
      if (type === 'group') {
        modifiers.group = modifier; // Store full "group-hover" format
      } else if (type === 'peer') {
        modifiers.peer = modifier; // Store full "peer-focus" format
      }
      return;
    }

    // 6. Check for not modifier
    const notMatch = modifier.match(NOT_MODIFIER_REGEX);
    if (notMatch) {
      modifiers.not = notMatch[1];
      return;
    }

    // 7. Check for group/peer modifiers (basic)
    if (GROUP_PEER_MODIFIERS.includes(modifier as any)) {
      modifiers[modifier as 'group' | 'peer'] = modifier;
      return;
    }

    // 8. Check for state modifiers
    if (StateModifierParser.isStateModifier(modifier)) {
      const stateResult = StateModifierParser.parse(modifier);
      if (stateResult) {
        modifiers.state = this.getStatePseudoClass(stateResult.modifier);
      }
      return;
    }

    // 9. Check for pseudo-elements
    if (PseudoElementModifierParser.isValidPseudoElementModifier(modifier)) {
      const pseudoElementResult = PseudoElementModifierParser.parsePseudoElementModifier(modifier);
      if (pseudoElementResult) {
        modifiers.pseudoElement = this.getPseudoElementSelector(pseudoElementResult.element);
      }
      return;
    }

    // 10. Check for aria attributes
    if (AriaModifierParser.isValidAriaModifier(modifier)) {
      const ariaResult = AriaModifierParser.parseAriaModifier(modifier);
      if (ariaResult) {
        const ariaName = modifier.replace('aria-', '');
        modifiers.aria[ariaName] = `[aria-${ariaName}]`;
      }
      return;
    }

    // 11. Check for data attributes
    if (DataModifierParser.isValidDataModifier(modifier)) {
      const dataResult = DataModifierParser.parseDataModifier(modifier);
      if (dataResult) {
        const dataName = modifier.replace('data-', '');
        modifiers.data[dataName] = `[data-${dataName}]`;
      }
      return;
    }

    // 12. Handle nth-child patterns
    if (modifier.startsWith('nth-')) {
      this.parseNthModifier(modifier, modifiers);
      return;
    }

    // 13. Fallback: treat as custom state
    console.warn(`Unknown modifier: ${modifier}`);
  }

  /**
   * Convert breakpoint modifier to media query
   */
  private static getBreakpointMediaQuery(breakpoint: any): string {
    if (breakpoint.type === 'min-width') {
      return `@media (min-width: ${breakpoint.value})`;
    } else if (breakpoint.type === 'max-width') {
      return `@media (max-width: ${breakpoint.value})`;
    }
    return `@media (min-width: ${breakpoint.value})`;
  }

  /**
   * Convert container modifier to container query
   */
  private static getContainerMediaQuery(container: any): string {
    if (container.type === 'min-width') {
      return `@container (min-width: ${container.value})`;
    } else if (container.type === 'max-width') {
      return `@container (max-width: ${container.value})`;
    } else if (container.type === 'named-container') {
      return `@container ${container.containerName} (min-width: ${container.value})`;
    }
    return `@container (min-width: ${container.value})`;
  }

  /**
   * Convert motion modifier to media query
   */
  private static getMotionMediaQuery(preference: 'safe' | 'reduce'): string {
    if (preference === 'safe') {
      return '@media (prefers-reduced-motion: no-preference)';
    } else if (preference === 'reduce') {
      return '@media (prefers-reduced-motion: reduce)';
    }
    return '';
  }

  /**
   * Convert state modifier to pseudo-class
   */
  private static getStatePseudoClass(state: string): string {
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
      'in-range': ':in-range',
      'out-of-range': ':out-of-range',
      'placeholder-shown': ':placeholder-shown',
      'autofill': ':autofill',
      'read-only': ':read-only',
      
      // Form validation states
      'user-valid': ':user-valid',
      'user-invalid': ':user-invalid',
      
      // UI states
      'first': ':first-child',
      'last': ':last-child',
      'only': ':only-child',
      'odd': ':nth-child(odd)',
      'even': ':nth-child(even)',
      'first-of-type': ':first-of-type',
      'last-of-type': ':last-of-type',
      'only-of-type': ':only-of-type',
      'empty': ':empty',
      
      // Additional states
      'open': ':open',
      'closed': ':closed',
      'fullscreen': ':fullscreen',
      'loading': ':loading',
      'inert': ':inert',
      
      // Print media
      'print': '@media print',
      
      // Dark mode
      'dark': '@media (prefers-color-scheme: dark)',
      'light': '@media (prefers-color-scheme: light)',
      
      // OS/accessibility states
      'inverted-colors': '@media (inverted-colors: inverted)',
      'no-inverted-colors': '@media (inverted-colors: none)',
      'noscript': 'html:not(.js)',
      
      // Pointer device variants
      'pointer-fine': '@media (pointer: fine)',
      'pointer-coarse': '@media (pointer: coarse)',
      'pointer-none': '@media (pointer: none)',
      'any-pointer-fine': '@media (any-pointer: fine)',
      'any-pointer-coarse': '@media (any-pointer: coarse)',
      'any-pointer-none': '@media (any-pointer: none)',
      
      // Hover capability
      'can-hover': '@media (hover: hover)',
      'no-hover': '@media (hover: none)',
      
      // Starting style modifier
      'starting': '@starting-style',
    };
    
    return stateMap[state] || `:${state}`;
  }

  /**
   * Convert pseudo-element modifier to selector
   */
  private static getPseudoElementSelector(pseudoElement: string): string {
    const pseudoElementMap: Record<string, string> = {
      'before': '::before',
      'after': '::after',
      'first-line': '::first-line',
      'first-letter': '::first-letter',
      'selection': '::selection',
      'file': '::file-selector-button',
      'backdrop': '::backdrop',
      'placeholder': '::placeholder',
      'marker': '::marker',
      'details-content': '> :not(summary)', // Special case for details content
    };
    
    return pseudoElementMap[pseudoElement] || `::${pseudoElement}`;
  }

  /**
   * Parse nth-child modifiers
   */
  private static parseNthModifier(modifier: string, modifiers: ParsedModifiers): void {
    // nth-[2n+1], nth-[3], etc.
    const arbitraryMatch = modifier.match(/^nth-\[([^\]]+)\]$/);
    if (arbitraryMatch) {
      modifiers.state = `:nth-child(${arbitraryMatch[1]})`;
      return;
    }
    
    // Predefined nth patterns
    const nthPatterns: Record<string, string> = {
      'nth-1': ':nth-child(1)',
      'nth-2': ':nth-child(2)',
      'nth-3': ':nth-child(3)',
      // Add more as needed
    };
    
    if (nthPatterns[modifier]) {
      modifiers.state = nthPatterns[modifier];
    }
  }

  /**
   * Generate CSS selector from parsed modifiers
   */
  static generateSelector(modifiers: ParsedModifiers, baseSelector: string): string {
    let selector = baseSelector;
    let mediaQueries: string[] = [];
    let containerQueries: string[] = [];
    
    // 1. Apply responsive breakpoints
    Object.values(modifiers.responsive).forEach(query => {
      if (query.startsWith('@media')) {
        mediaQueries.push(query);
      }
    });
    
    // 2. Apply container queries
    Object.values(modifiers.container).forEach(query => {
      if (query.startsWith('@container')) {
        containerQueries.push(query);
      }
    });
    
    // 3. Apply motion preferences
    if (modifiers.motion && modifiers.motion.startsWith('@media')) {
      mediaQueries.push(modifiers.motion);
    }
    
    // 4. Apply not modifier
    if (modifiers.not) {
      const stateSelector = this.getStatePseudoClass(modifiers.not);
      if (stateSelector.startsWith(':')) {
        selector += `:not(${stateSelector})`;
      } else {
        selector += `:not(.${modifiers.not})`;
      }
    }
    
    // 5. Apply starting style
    if (modifiers.starting) {
      // @starting-style is handled at CSS rule level, not selector level
      // This is a flag for the CSS generator
    }
    
    // 6. Apply group/peer modifiers
    if (modifiers.group) {
      selector = `.group:hover ${selector}`;
    }
    if (modifiers.peer) {
      selector = `.peer:hover + ${selector}`;
    }
    
    // 7. Apply state modifiers
    if (modifiers.state) {
      if (modifiers.state.startsWith('@media')) {
        mediaQueries.push(modifiers.state);
      } else {
        selector += modifiers.state;
      }
    }
    
    // 8. Apply pseudo-elements
    if (modifiers.pseudoElement) {
      if (modifiers.pseudoElement === '> :not(summary)') {
        // Special case for details-content
        selector = `${selector} > :not(summary)`;
      } else {
        selector += modifiers.pseudoElement;
      }
    }
    
    // 9. Apply aria attributes
    Object.values(modifiers.aria).forEach(attr => {
      selector += attr;
    });
    
    // 10. Apply data attributes
    Object.values(modifiers.data).forEach(attr => {
      selector += attr;
    });
    
    // Wrap in media/container queries
    let finalSelector = selector;
    
    // Wrap in container queries first
    containerQueries.forEach(query => {
      finalSelector = `${query} { ${finalSelector} }`;
    });
    
    // Then wrap in media queries
    mediaQueries.forEach(query => {
      finalSelector = `${query} { ${finalSelector} }`;
    });
    
    return finalSelector;
  }

  /**
   * Check if a modifier is valid
   */
  static isValidModifier(modifier: string): boolean {
    // Check using specialized parsers
    return (
      ResponsiveModifierParser.isResponsiveModifier(modifier) ||
      ContainerModifierParser.isContainerModifier(modifier) ||
      MotionModifierParser.isValidMotionModifier(modifier) ||
      StateModifierParser.isStateModifier(modifier) ||
      PseudoElementModifierParser.isValidPseudoElementModifier(modifier) ||
      AriaModifierParser.isValidAriaModifier(modifier) ||
      DataModifierParser.isValidDataModifier(modifier) ||
      GROUP_PEER_MODIFIERS.includes(modifier as any) ||
      modifier.startsWith('nth-') ||
      modifier.match(NOT_MODIFIER_REGEX) !== null ||
      modifier === 'starting' ||
      modifier === 'noscript' ||
      modifier.match(ARBITRARY_VALUE_REGEX) !== null
    );
  }

  /**
   * Get modifier priority for sorting
   */
  static getModifierPriority(modifier: string): number {
    if (ResponsiveModifierParser.isResponsiveModifier(modifier)) return MODIFIER_PRIORITY.responsive;
    if (ContainerModifierParser.isContainerModifier(modifier)) return MODIFIER_PRIORITY.container;
    if (MotionModifierParser.isValidMotionModifier(modifier)) return MODIFIER_PRIORITY.motion;
    if (StateModifierParser.isStateModifier(modifier)) return MODIFIER_PRIORITY.state;
    if (PseudoElementModifierParser.isValidPseudoElementModifier(modifier)) return MODIFIER_PRIORITY.pseudoElement;
    if (AriaModifierParser.isValidAriaModifier(modifier)) return MODIFIER_PRIORITY.aria;
    if (DataModifierParser.isValidDataModifier(modifier)) return MODIFIER_PRIORITY.data;
    if (modifier.match(NOT_MODIFIER_REGEX)) return MODIFIER_PRIORITY.not;
    if (modifier === 'starting') return MODIFIER_PRIORITY.starting;
    if (modifier.startsWith('pointer-') || modifier.startsWith('any-pointer-')) return MODIFIER_PRIORITY.pointer;
    if (modifier === 'noscript') return MODIFIER_PRIORITY.noscript;
    if (modifier === 'user-valid' || modifier === 'user-invalid') return MODIFIER_PRIORITY.userValid;
    if (modifier === 'inverted-colors') return MODIFIER_PRIORITY.invertedColors;
    if (modifier === 'details-content') return MODIFIER_PRIORITY.detailsContent;
    
    return 999; // Unknown modifiers get lowest priority
  }
} 
/**
 * Unified modifier parser for CSSMA-V3
 * Following Tailwind CSS architecture and specifications
 * Supports all modifiers: responsive, container queries, states, pseudo-elements, attributes
 */

import type { ParsedModifiers } from '../../../types';

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
  
  // 5. v4.1 new modifiers
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
   * Parse a complete modifier chain following Tailwind v4.1 specification
   * Example: "md:@container/sidebar:motion-safe:hover:not-disabled:before:bg-blue-500"
   */
  static parseModifiers(className: string): ParsedModifiers {
    const parts = className.split(':');
    const baseClass = parts[parts.length - 1];
    const modifierParts = parts.slice(0, -1);
    
    const modifiers: ParsedModifiers = {
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
      arbitrary: null
    };
    
    // Process modifiers in order
    for (const modifier of modifierParts) {
      this.processModifier(modifier, modifiers);
    }
    
    return modifiers;
  }
  
  /**
   * Process a single modifier and update the modifiers object
   */
  private static processModifier(modifier: string, modifiers: ParsedModifiers): void {
    // 1. Check for arbitrary values first
    const arbitraryMatch = modifier.match(ARBITRARY_VALUE_REGEX);
    if (arbitraryMatch) {
      modifiers.arbitrary = arbitraryMatch[1];
      return;
    }
    
    // 2. Check for responsive breakpoints
    if (RESPONSIVE_BREAKPOINTS[modifier]) {
      modifiers.responsive[modifier] = RESPONSIVE_BREAKPOINTS[modifier];
      return;
    }
    
    // 3. Check for container queries
    if (this.isContainerQuery(modifier)) {
      this.parseContainerQuery(modifier, modifiers);
      return;
    }
    
    // 4. Check for motion preferences
    if (MOTION_MODIFIERS[modifier]) {
      modifiers.motion = MOTION_MODIFIERS[modifier];
      return;
    }
    
    // 5. Check for special modifiers (noscript, starting)
    if (modifier === 'noscript') {
      modifiers.noscript = modifier;
      return;
    }
    
    if (modifier === 'starting') {
      modifiers.starting = true;
      return;
    }
    
    // 6. Check for group/peer state combinations
    if (modifier.startsWith('group-') || modifier.startsWith('peer-')) {
      const [type, state] = modifier.split('-', 2);
      if (type === 'group') {
        modifiers.group = modifier; // Store full "group-hover" format
      } else if (type === 'peer') {
        modifiers.peer = modifier; // Store full "peer-focus" format
      }
      return;
    }
    
    // 7. Check for not modifier
    const notMatch = modifier.match(NOT_MODIFIER_REGEX);
    if (notMatch) {
      modifiers.not = notMatch[1];
      return;
    }
    

    
    // 9. Check for group/peer modifiers (basic)
    if (GROUP_PEER_MODIFIERS.includes(modifier as any)) {
      modifiers[modifier as 'group' | 'peer'] = modifier;
      return;
    }
    
    // 10. Check for state modifiers
    if (STATE_MODIFIERS[modifier]) {
      modifiers.state = STATE_MODIFIERS[modifier];
      return;
    }
    
    // 11. Check for pseudo-elements
    if (PSEUDO_ELEMENTS[modifier]) {
      modifiers.pseudoElement = PSEUDO_ELEMENTS[modifier];
      return;
    }
    
    // 12. Check for aria attributes
    if (modifier.startsWith('aria-')) {
      const ariaName = modifier.replace('aria-', '');
      modifiers.aria[ariaName] = `[aria-${ariaName}]`;
      return;
    }
    
    // 13. Check for data attributes
    if (modifier.startsWith('data-')) {
      const dataName = modifier.replace('data-', '');
      modifiers.data[dataName] = `[data-${dataName}]`;
      return;
    }
    
    // 14. Handle nth-child patterns
    if (modifier.startsWith('nth-')) {
      this.parseNthModifier(modifier, modifiers);
      return;
    }
    
    // 15. Fallback: treat as custom state
    console.warn(`Unknown modifier: ${modifier}`);
  }
  
  /**
   * Check if modifier is a container query
   */
  private static isContainerQuery(modifier: string): boolean {
    return modifier.startsWith('@') || 
           CONTAINER_QUERIES[modifier] !== undefined;
  }
  
  /**
   * Parse container query modifiers
   */
  private static parseContainerQuery(modifier: string, modifiers: ParsedModifiers): void {
    // Standard container queries
    if (CONTAINER_QUERIES[modifier]) {
      modifiers.container[modifier] = CONTAINER_QUERIES[modifier];
      return;
    }
    
    // Named container queries: @container/name
    if (modifier.includes('/')) {
      const [size, name] = modifier.split('/');
      if (size.startsWith('@')) {
        const baseQuery = CONTAINER_QUERIES[size];
        if (baseQuery) {
          modifiers.container[modifier] = baseQuery.replace('@container', `@container ${name}`);
        }
      }
      return;
    }
    
    // Dynamic container queries: @min-*, @max-*
    if (modifier.startsWith('@min-') || modifier.startsWith('@max-')) {
      const [type, value] = modifier.split('-').slice(1); // Remove '@'
      const operator = modifier.startsWith('@min-') ? 'min-width' : 'max-width';
      modifiers.container[modifier] = `@container (${operator}: ${value})`;
      return;
    }
    
    // Arbitrary container queries: @[...]
    const arbitraryMatch = modifier.match(/^@\[([^\]]+)\]$/);
    if (arbitraryMatch) {
      modifiers.container[modifier] = `@container ${arbitraryMatch[1]}`;
      return;
    }
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
      if (STATE_MODIFIERS[modifiers.not]) {
        selector += `:not(${STATE_MODIFIERS[modifiers.not]})`;
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
    // Check all known modifier types
    return (
      RESPONSIVE_BREAKPOINTS[modifier] !== undefined ||
      CONTAINER_QUERIES[modifier] !== undefined ||
      MOTION_MODIFIERS[modifier] !== undefined ||
      STATE_MODIFIERS[modifier] !== undefined ||
      PSEUDO_ELEMENTS[modifier] !== undefined ||
      GROUP_PEER_MODIFIERS.includes(modifier as any) ||
      modifier.startsWith('aria-') ||
      modifier.startsWith('data-') ||
      modifier.startsWith('nth-') ||
      modifier.startsWith('@') ||
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
    if (RESPONSIVE_BREAKPOINTS[modifier]) return MODIFIER_PRIORITY.responsive;
    if (this.isContainerQuery(modifier)) return MODIFIER_PRIORITY.container;
    if (MOTION_MODIFIERS[modifier]) return MODIFIER_PRIORITY.motion;
    if (STATE_MODIFIERS[modifier]) return MODIFIER_PRIORITY.state;
    if (PSEUDO_ELEMENTS[modifier]) return MODIFIER_PRIORITY.pseudoElement;
    if (modifier.startsWith('aria-')) return MODIFIER_PRIORITY.aria;
    if (modifier.startsWith('data-')) return MODIFIER_PRIORITY.data;
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
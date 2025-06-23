/**
 * Modifier Parser Orchestrator for CSSMA-V3
 * Coordinates all specialized modifier parsers
 * Clean orchestration layer with delegated responsibilities
 */

import type { ParsedModifiers } from '../../../types';

// Import all specialized parsers
import { ResponsiveModifierParser } from './responsive-modifier-parser';
import { StateModifierParser } from './state-modifier-parser';
import { ContainerModifierParser } from './container-modifier-parser';
import { MotionModifierParser } from './motion-modifier-parser';
import { AriaModifierParser } from './aria-modifier-parser';
import { DataModifierParser } from './data-modifier-parser';
import { PseudoElementModifierParser } from './pseudo-element-modifier-parser';
import { GroupPeerModifierParser } from './group-peer-modifier-parser';
import { NotModifierParser } from './not-modifier-parser';
import { NthModifierParser } from './nth-modifier-parser';
import { SpecialModifierParser } from './special-modifier-parser';
import { SelectorGeneratorService } from './selector-generator-service';

export interface ModifierParseResult {
  modifiers: ParsedModifiers;
  baseClassName: string;
  hasModifiers: boolean;
}

export class ModifierParser {
  /**
   * Parse complete modifier chain from className
   * Delegates to specialized parsers based on modifier type
   */
  static parseModifiers(className: string): ModifierParseResult {
    const parts = className.split(':');
    const baseClassName = parts[parts.length - 1];
    const modifierParts = parts.slice(0, -1);

    if (modifierParts.length === 0) {
      return {
        modifiers: this.createEmptyModifiers(),
        baseClassName,
        hasModifiers: false
      };
    }

    const modifiers = this.createEmptyModifiers();

    // Process each modifier part
    for (const modifierPart of modifierParts) {
      this.processModifierPart(modifierPart, modifiers);
    }

    return {
      modifiers,
      baseClassName,
      hasModifiers: true
    };
  }

  /**
   * Process individual modifier part
   * Routes to appropriate specialized parser
   */
  private static processModifierPart(modifier: string, modifiers: ParsedModifiers): void {
    // Try each parser in priority order
    const parsers = [
      // Responsive (highest priority)
      () => this.tryResponsiveParser(modifier, modifiers),
      
      // Container queries
      () => this.tryContainerParser(modifier, modifiers),
      
      // Group/Peer (before states to handle group-hover)
      () => this.tryGroupPeerParser(modifier, modifiers),
      
      // Not modifiers (before states to handle not-first)
      () => this.tryNotParser(modifier, modifiers),
      
      // Nth modifiers (before states to handle nth-child-3)
      () => this.tryNthParser(modifier, modifiers),
      
      // State modifiers
      () => this.tryStateParser(modifier, modifiers),
      
      // Motion preferences
      () => this.tryMotionParser(modifier, modifiers),
      
      // Pseudo-elements
      () => this.tryPseudoElementParser(modifier, modifiers),
      
      // Attribute modifiers
      () => this.tryAriaParser(modifier, modifiers),
      () => this.tryDataParser(modifier, modifiers),
      
      // Special modifiers (lowest priority)
      () => this.trySpecialParser(modifier, modifiers)
    ];

    // Try each parser until one succeeds
    for (const tryParser of parsers) {
      if (tryParser()) {
        return; // Parser succeeded, stop trying
      }
    }

    // If no parser handled it, it might be an unknown modifier
    console.warn(`Unknown modifier: ${modifier}`);
  }

  /**
   * Try responsive modifier parser
   */
  private static tryResponsiveParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (ResponsiveModifierParser.isValidResponsiveModifier(modifier)) {
      const result = ResponsiveModifierParser.parse(modifier);
      if (result) {
        modifiers.responsive = {
          [result.raw]: `@media (${result.modifier.type}: ${result.modifier.value})`
        };
        return true;
      }
    }
    return false;
  }

  /**
   * Try container modifier parser
   */
  private static tryContainerParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (ContainerModifierParser.isValidContainerModifier(modifier)) {
      const result = ContainerModifierParser.parse(modifier);
      if (result) {
        modifiers.container = {
          [`@${result.raw.slice(1)}`]: `@container (${result.modifier.type}: ${result.modifier.value})`
        };
        return true;
      }
    }
    return false;
  }

  /**
   * Try group/peer modifier parser
   */
  private static tryGroupPeerParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (GroupPeerModifierParser.isGroupPeerModifier(modifier)) {
      const result = GroupPeerModifierParser.parseGroupPeerModifier(modifier);
      if (result) {
        // Group/peer modifiers need special handling
        if (modifier.startsWith('group-')) {
          modifiers.group = modifier;
        } else if (modifier.startsWith('peer-')) {
          modifiers.peer = modifier;
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Try not modifier parser
   */
  private static tryNotParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (NotModifierParser.isNotModifier(modifier) || NotModifierParser.isArbitraryNotModifier(modifier)) {
      const result = NotModifierParser.parseNotModifier(modifier) || 
                    NotModifierParser.parseArbitraryNotModifier(modifier);
      if (result) {
        modifiers.not = modifier;
        return true;
      }
    }
    return false;
  }

  /**
   * Try nth modifier parser
   */
  private static tryNthParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (NthModifierParser.isNthModifier(modifier)) {
      const result = NthModifierParser.parseNthModifier(modifier);
      if (result) {
        modifiers.nthChild = modifier;
        return true;
      }
    }
    return false;
  }

  /**
   * Try state modifier parser
   */
  private static tryStateParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (StateModifierParser.isValidStateModifier(modifier)) {
      const result = StateModifierParser.parse(modifier);
      if (result) {
        modifiers.state = this.convertStateToCSS(result.modifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Try motion modifier parser
   */
  private static tryMotionParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (MotionModifierParser.isMotionModifier(modifier)) {
      const result = MotionModifierParser.parse(modifier);
      if (result) {
        modifiers.motion = `@media ${MotionModifierParser.generateMotionMediaQuery(result)}`;
        return true;
      }
    }
    return false;
  }

  /**
   * Try pseudo-element modifier parser
   */
  private static tryPseudoElementParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (PseudoElementModifierParser.isPseudoElementModifier(modifier)) {
      const result = PseudoElementModifierParser.parse(modifier);
      if (result) {
        modifiers.pseudoElement = this.convertPseudoElementToCSS(result.element);
        return true;
      }
    }
    return false;
  }

  /**
   * Try ARIA modifier parser
   */
  private static tryAriaParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (AriaModifierParser.isValidAriaModifier(modifier)) {
      const result = AriaModifierParser.parseAriaModifier(modifier);
      if (result) {
        if (!modifiers.aria) modifiers.aria = {};
        modifiers.aria[result.attribute] = `[aria-${result.attribute}]`;
        return true;
      }
    }
    return false;
  }

  /**
   * Try data modifier parser
   */
  private static tryDataParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (DataModifierParser.isValidDataModifier(modifier)) {
      const result = DataModifierParser.parseDataModifier(modifier);
      if (result) {
        if (!modifiers.data) modifiers.data = {};
        modifiers.data[result.attribute] = `[data-${result.attribute}]`;
        return true;
      }
    }
    return false;
  }

  /**
   * Try special modifier parser
   */
  private static trySpecialParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (SpecialModifierParser.isSpecialModifier(modifier)) {
      const result = SpecialModifierParser.parseSpecialModifier(modifier);
      if (result) {
        // Special modifiers need special handling
        if (modifier === 'noscript') {
          modifiers.noscript = modifier;
        } else if (modifier === 'user-valid') {
          modifiers.state = ':user-valid';
        } else if (modifier === 'user-invalid') {
          modifiers.state = ':user-invalid';
        } else if (modifier === 'inverted-colors') {
          modifiers.state = '@media (inverted-colors: inverted)';
        } else if (modifier === 'pointer-fine') {
          modifiers.state = '@media (pointer: fine)';
        } else if (modifier === 'pointer-coarse') {
          modifiers.state = '@media (pointer: coarse)';
        } else if (modifier === 'starting') {
          modifiers.starting = true;
        } else {
          modifiers.state = modifier; // fallback for other special modifiers
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Convert state modifier to CSS format
   */
  private static convertStateToCSS(state: string): string {
    // Special modifiers that need media query format
    if (state === 'user-valid') return ':user-valid';
    if (state === 'user-invalid') return ':user-invalid';
    if (state === 'inverted-colors') return '@media (inverted-colors: inverted)';
    if (state === 'pointer-fine') return '@media (pointer: fine)';
    if (state === 'pointer-coarse') return '@media (pointer: coarse)';
    if (state === 'dark') return '@media (prefers-color-scheme: dark)';
    if (state === 'light') return '@media (prefers-color-scheme: light)';
    if (state === 'print') return '@media print';
    
    // Standard pseudo-classes
    return `:${state}`;
  }

  /**
   * Convert pseudo-element to CSS format
   */
  private static convertPseudoElementToCSS(element: string): string {
    return `::${element}`;
  }

  /**
   * Create empty modifiers structure
   */
  private static createEmptyModifiers(): ParsedModifiers {
    return {
      responsive: undefined,
      container: undefined,
      motion: undefined,
      state: undefined,
      pseudoElement: undefined,
      aria: undefined,
      data: undefined,
      not: undefined,
      starting: undefined,
      pointer: undefined,
      noscript: undefined,
      userValid: undefined,
      invertedColors: undefined,
      detailsContent: undefined,
      contrast: undefined,
      colorScheme: undefined,
      orientation: undefined,
      print: undefined,
      scripting: undefined,
      group: undefined,
      peer: undefined,
      has: undefined,
      supports: undefined,
      nthChild: undefined,
      nthLastChild: undefined,
      nthOfType: undefined,
      nthLastOfType: undefined,
      arbitrary: undefined
    };
  }

  /**
   * Generate CSS selector from parsed modifiers
   * Delegates to SelectorGeneratorService
   */
  static generateSelector(baseSelector: string, modifiers: ParsedModifiers, className: string): string {
    return SelectorGeneratorService.generateSelector({
      baseSelector,
      modifiers,
      className
    });
  }

  /**
   * Check if className has any modifiers
   */
  static hasModifiers(className: string): boolean {
    return className.includes(':');
  }

  /**
   * Get base class name without modifiers
   */
  static getBaseClassName(className: string): string {
    const parts = className.split(':');
    return parts[parts.length - 1];
  }

  /**
   * Get modifier parts from className
   */
  static getModifierParts(className: string): string[] {
    const parts = className.split(':');
    return parts.slice(0, -1);
  }

  /**
   * Validate modifier syntax
   */
  static validateModifier(modifier: string): boolean {
    // Try each parser to see if any can handle the modifier
    const parsers = [
      ResponsiveModifierParser.isValidResponsiveModifier,
      ContainerModifierParser.isValidContainerModifier,
      StateModifierParser.isValidStateModifier,
      MotionModifierParser.isMotionModifier,
      PseudoElementModifierParser.isPseudoElementModifier,
      AriaModifierParser.isValidAriaModifier,
      DataModifierParser.isValidDataModifier,
      GroupPeerModifierParser.isGroupPeerModifier,
      NotModifierParser.isNotModifier,
      NthModifierParser.isNthModifier,
      SpecialModifierParser.isSpecialModifier
    ];

    return parsers.some(parser => parser(modifier));
  }

  /**
   * Get all supported modifiers from all parsers
   */
  static getAllSupportedModifiers(): string[] {
    const allModifiers: string[] = [];

    // Collect from each parser
    allModifiers.push(...ResponsiveModifierParser.getAllBreakpoints());
    allModifiers.push(...StateModifierParser.getAllStateModifiers());
    allModifiers.push(...PseudoElementModifierParser.getAllPseudoElements());
    allModifiers.push(...AriaModifierParser.getAllAriaAttributes());
    allModifiers.push(...DataModifierParser.getAllDataAttributes());
    allModifiers.push(...GroupPeerModifierParser.getAllGroupPeerModifiers());
    allModifiers.push(...NotModifierParser.getAllNotModifiers());
    allModifiers.push(...NthModifierParser.getAllNthModifiers());
    allModifiers.push(...SpecialModifierParser.getAllSpecialModifiers());
    allModifiers.push(...ContainerModifierParser.getAllContainerModifiers());
    allModifiers.push(...MotionModifierParser.getAllMotionModifiers());

    return [...new Set(allModifiers)]; // Remove duplicates
  }

  /**
   * Get modifier type for a given modifier string
   */
  static getModifierType(modifier: string): string | null {
    if (ResponsiveModifierParser.isValidResponsiveModifier(modifier)) return 'responsive';
    if (ContainerModifierParser.isValidContainerModifier(modifier)) return 'container';
    if (StateModifierParser.isValidStateModifier(modifier)) return 'state';
    if (MotionModifierParser.isMotionModifier(modifier)) return 'motion';
    if (PseudoElementModifierParser.isPseudoElementModifier(modifier)) return 'pseudo-element';
    if (AriaModifierParser.isValidAriaModifier(modifier)) return 'aria';
    if (DataModifierParser.isValidDataModifier(modifier)) return 'data';
    if (GroupPeerModifierParser.isGroupPeerModifier(modifier)) return 'group-peer';
    if (NotModifierParser.isNotModifier(modifier)) return 'not';
    if (NthModifierParser.isNthModifier(modifier)) return 'nth';
    if (SpecialModifierParser.isSpecialModifier(modifier)) return 'special';
    
    return null;
  }

  /**
   * Parse and validate complete className with modifiers
   */
  static parseClassName(className: string): ModifierParseResult {
    const result = this.parseModifiers(className);
    
    // Validate all modifiers
    const modifierParts = this.getModifierParts(className);
    const invalidModifiers = modifierParts.filter(modifier => !this.validateModifier(modifier));
    
    if (invalidModifiers.length > 0) {
      console.warn(`Invalid modifiers found: ${invalidModifiers.join(', ')}`);
    }

    return result;
  }
} 
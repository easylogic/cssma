/**
 * Modifier Parser Orchestrator for CSSMA-V3
 * Coordinates all specialized modifier parsers
 * Clean orchestration layer with delegated responsibilities
 */

import type { 
  ParsedModifiers, 
  ParsedModifier,
  ResponsiveModifier,
  ContainerQueryModifier,
  ArbitraryVariantModifier,
  ArbitraryAttributeModifier,
  ColorSchemeModifier,
  MotionModifier,
  ContrastModifier,
  GroupModifier,
  PeerModifier,
  PseudoClassModifier,
  PseudoElementModifier,
  AriaModifier,
  DataModifier,
  NotModifier,
  HasModifier,
  NthChildModifier,
  NthOfTypeModifier,
  SpecialModifier
} from '../../../types';

import { ModifierType } from '../../../types';

import { ParsedModifiersImpl } from '../../../types';

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
import { ArbitraryAttributeSelectorModifierParser } from './arbitrary-attribute-selectors-modifier-parser';
import { ArbitraryVariantParser } from './arbitrary-variant-parser';

export interface ModifierParseResult {
  modifiers: ParsedModifiers;
  baseClassName: string;
  hasModifiers: boolean;
  isArbitrary: boolean;
}

export class ModifierParser {

  /**
   * Parse className into modifier parts and base class name
   * 
   * algorithm:
   * 1. Split className by colon
   *   1. parts 중간에 colon 이 있을 수 있어서 단순히 분리하면 안됨 
   *   2. 따라서 분리하고 나서 마지막 부분이 무엇인지 확인해야 함
   * 2. The last part is the base class name
   * 3. The remaining parts are the modifier parts
   * 4. If the base class name starts with a square bracket, it is an arbitrary property
   * 5. If the base class name does not start with a square bracket, it is not an arbitrary property
   * 
   * @param className - The className to parse
   * @returns An object containing the modifier parts, base class name, and whether it is an arbitrary property
   */

  static parseClassNameParts(className: string): {
    modifierParts: string[];
    baseClassName: string;
    isArbitrary: boolean;
  } {
    // Handle empty string
    if (!className) {
      return {
        modifierParts: [],
        baseClassName: '',
        isArbitrary: false
      };
    }

    // Handle arbitrary values that may contain colons
    const parts: string[] = [];
    let currentPart = '';
    let bracketDepth = 0;
    let parenthesesDepth = 0;
    let inBrackets = false;
    let inParentheses = false;
    
    for (let i = 0; i < className.length; i++) {
      const char = className[i];
      
      if (char === '[') {
        bracketDepth++;
        inBrackets = true;
        currentPart += char;
      } else if (char === ']') {
        bracketDepth--;
        if (bracketDepth === 0) {
          inBrackets = false;
        }
        currentPart += char;
      } else if (char === '(') {
        parenthesesDepth++;
        inParentheses = true;
        currentPart += char;
      } else if (char === ')') {
        parenthesesDepth--;
        if (parenthesesDepth === 0) {
          inParentheses = false;
        }
        currentPart += char;
      } else if (char === ':' && !inBrackets && !inParentheses) {
        // Only split on colons that are not inside brackets or parentheses
        parts.push(currentPart);
        currentPart = '';
      } else {
        currentPart += char;
      }
    }
    
    // Always add the final part (even if empty)
    parts.push(currentPart);
    
    // If only one part and it's the entire string without colons outside brackets
    if (parts.length === 1) {
      return {
        modifierParts: [],
        baseClassName: className,
        isArbitrary: className.startsWith('[') && className.endsWith(']')
      };
    }
    
    const baseClassName = parts[parts.length - 1];
    const modifierParts = parts.slice(0, -1);
    
    // Check if the base class is arbitrary
    const isArbitrary = baseClassName.startsWith('[') && baseClassName.endsWith(']');

    return {
      modifierParts,
      baseClassName,
      isArbitrary
    };
  }


  /**
   * Parse complete modifier chain from className
   * Delegates to specialized parsers based on modifier type
   */
  static parseModifiers(className: string): ModifierParseResult | null {
    // Use the improved parseClassNameParts method that handles arbitrary values correctly
    const parsedParts = this.parseClassNameParts(className);
    const { modifierParts, baseClassName, isArbitrary } = parsedParts;

    // Check if this is an arbitrary property (e.g., [mask-type:luminance])
    if (isArbitrary && modifierParts.length === 0) {
      return {
        modifiers: this.createEmptyModifiers(),
        baseClassName,
        hasModifiers: false,
        isArbitrary: true
      };
    }

    if (modifierParts.length === 0) {
      // Return null for classes without modifiers (for test compatibility)
      return null;
    }

    const modifiers = this.createEmptyModifiers();

    // Process each modifier part
    for (const modifierPart of modifierParts) {
      this.processModifierPart(modifierPart, modifiers);
    }

    return {
      modifiers,
      baseClassName,
      hasModifiers: true,
      isArbitrary
    };
  }

  /**
   * Process individual modifier part
   * Routes to appropriate specialized parser
   */
  private static processModifierPart(modifier: string, modifiers: ParsedModifiers): void {
    // Try each parser in priority order
    const parsers = [
      // Arbitrary variants (highest priority for complex selectors)
      () => this.tryArbitraryVariantParser(modifier, modifiers),
      
      // Arbitrary attribute selectors
      () => this.tryArbitraryAttributeParser(modifier, modifiers),
      
      // Responsive (high priority)
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
      
      // ARIA attributes
      () => this.tryAriaParser(modifier, modifiers),
      
      // Data attributes
      () => this.tryDataParser(modifier, modifiers),
      
      // Special modifiers (lowest priority)
      () => this.trySpecialParser(modifier, modifiers)
    ];

    // Try each parser until one succeeds
    for (const parser of parsers) {
      if (parser()) {
        return; // Successfully parsed, exit
      }
    }

    // If no parser could handle this modifier, log a warning
    console.warn(`Unknown modifier: ${modifier}`);
  }

  /**
   * Try parsing as arbitrary variant (e.g., [&:nth-child(3)])
   */
  private static tryArbitraryVariantParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (ArbitraryVariantParser.isValidArbitraryVariant(modifier)) {
      const result = ArbitraryVariantParser.parseArbitraryVariant(modifier);
      if (result) {
        const arbitraryModifier: ArbitraryVariantModifier = {
          type: ModifierType.ARBITRARY_VARIANT,
          raw: modifier,
          priority: 10, // High priority for arbitrary variants
          selector: result.selector,
          cssSelector: result.selector
        };
        modifiers.modifiers.push(arbitraryModifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as arbitrary attribute selector (e.g., [data-size="large"])
   */
  private static tryArbitraryAttributeParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (ArbitraryAttributeSelectorModifierParser.isValidArbitraryAttributeSelector(modifier)) {
      const result = ArbitraryAttributeSelectorModifierParser.parseArbitraryAttributeModifier(modifier);
      if (result) {
        const arbitraryAttrModifier: ArbitraryAttributeModifier = {
          type: ModifierType.ARBITRARY_ATTRIBUTE,
          raw: modifier,
          priority: 15, // High priority for arbitrary attributes
          attribute: result.attribute,
          value: result.value,
          cssSelector: `[${result.attribute}${result.value ? `="${result.value}"` : ''}]`
        };
        modifiers.modifiers.push(arbitraryAttrModifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as responsive modifier (e.g., md, lg, xl)
   */
  private static tryResponsiveParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (ResponsiveModifierParser.isValidResponsiveModifier(modifier)) {
      const result = ResponsiveModifierParser.parse(modifier);
      if (result) {
        const responsiveModifier: ResponsiveModifier = {
          type: ModifierType.RESPONSIVE,
          raw: modifier,
          priority: 20, // High priority for responsive
          breakpoint: result.modifier,
          cssSelector: `@media (min-width: ${result.modifier.value})`
        };
        modifiers.modifiers.push(responsiveModifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as container query modifier
   */
  private static tryContainerParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (ContainerModifierParser.isValidContainerModifier(modifier)) {
      const result = ContainerModifierParser.parse(modifier);
      if (result) {
        const containerModifier: ContainerQueryModifier = {
          type: ModifierType.CONTAINER_QUERY,
          raw: modifier,
          priority: 25, // High priority for container queries
          container: result.modifier,
          cssSelector: `@container ${result.modifier.containerName || ''} (min-width: ${result.modifier.value})`
        };
        modifiers.modifiers.push(containerModifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as group/peer modifier
   */
  private static tryGroupPeerParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (GroupPeerModifierParser.isGroupPeerModifier(modifier)) {
      const result = GroupPeerModifierParser.parseGroupPeerModifier(modifier);
      if (result) {
        if (result.type === 'group') {
          const groupModifier: GroupModifier = {
            type: ModifierType.GROUP,
            raw: modifier,
            priority: 50, // Medium priority
            state: result.state,
            cssSelector: result.state ? `.group:${result.state} &` : '.group &'
          };
          modifiers.modifiers.push(groupModifier);
        } else {
          const peerModifier: PeerModifier = {
            type: ModifierType.PEER,
            raw: modifier,
            priority: 55, // Medium priority
            state: result.state,
            cssSelector: result.state ? `.peer:${result.state} ~ &` : '.peer ~ &'
          };
          modifiers.modifiers.push(peerModifier);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as not modifier
   */
  private static tryNotParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (NotModifierParser.isNotModifier(modifier)) {
      const result = NotModifierParser.parseNotModifier(modifier);
      if (result) {
        const notModifier: NotModifier = {
          type: ModifierType.NOT,
          raw: modifier,
          priority: 60, // Medium priority
          negatedSelector: result.selector,
          cssSelector: `:not(${result.selector})`
        };
        modifiers.modifiers.push(notModifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as nth modifier
   */
  private static tryNthParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (NthModifierParser.isNthModifier(modifier)) {
      const result = NthModifierParser.parseNthModifier(modifier);
      if (result) {
        if (result.type === 'nth-child' || result.type === 'nth-last-child') {
          const nthChildModifier: NthChildModifier = {
            type: ModifierType.NTH_CHILD,
            raw: modifier,
            priority: 65, // Medium priority
            nthType: result.type,
            formula: result.formula,
            cssSelector: `:${result.type}(${result.formula})`
          };
          modifiers.modifiers.push(nthChildModifier);
        } else {
          const nthOfTypeModifier: NthOfTypeModifier = {
            type: ModifierType.NTH_OF_TYPE,
            raw: modifier,
            priority: 70, // Medium priority
            nthType: result.type,
            formula: result.formula,
            cssSelector: `:${result.type}(${result.formula})`
          };
          modifiers.modifiers.push(nthOfTypeModifier);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as state modifier (hover, focus, etc.)
   */
  private static tryStateParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (StateModifierParser.isValidStateModifier(modifier)) {
      const result = StateModifierParser.parse(modifier);
      if (result) {
        const pseudoClassModifier: PseudoClassModifier = {
          type: ModifierType.PSEUDO_CLASS,
          raw: modifier,
          priority: 80, // Lower priority for states
          pseudoClass: result.modifier,
          cssSelector: this.convertStateToCSS(result.modifier)
        };
        modifiers.modifiers.push(pseudoClassModifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as motion modifier
   */
  private static tryMotionParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (MotionModifierParser.isMotionModifier(modifier)) {
      const result = MotionModifierParser.parse(modifier);
      if (result) {
        const motionModifier: MotionModifier = {
          type: ModifierType.MOTION,
          raw: modifier,
          priority: 30, // High priority for motion
          preference: result.preference,
          cssSelector: `@media (prefers-reduced-motion: ${result.preference === 'reduce' ? 'reduce' : 'no-preference'})`
        };
        modifiers.modifiers.push(motionModifier);
      return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as pseudo-element modifier
   */
  private static tryPseudoElementParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (PseudoElementModifierParser.isPseudoElementModifier(modifier)) {
      const result = PseudoElementModifierParser.parse(modifier);
      if (result) {
        const pseudoElementModifier: PseudoElementModifier = {
          type: ModifierType.PSEUDO_ELEMENT,
          raw: modifier,
          priority: 85, // Lower priority for pseudo-elements
          pseudoElement: result.element,
          cssSelector: this.convertPseudoElementToCSS(result.element)
        };
        modifiers.modifiers.push(pseudoElementModifier);
      return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as ARIA modifier
   */
  private static tryAriaParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (AriaModifierParser.isValidAriaModifier(modifier)) {
      const result = AriaModifierParser.parseAriaModifier(modifier);
      if (result) {
        const ariaModifier: AriaModifier = {
          type: ModifierType.ARIA,
          raw: modifier,
          priority: 90, // Lower priority for ARIA
          attribute: result.attribute,
          value: result.value,
          cssSelector: `[aria-${result.attribute}${result.value ? `="${result.value}"` : ''}]`
        };
        modifiers.modifiers.push(ariaModifier);
      return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as data modifier
   */
  private static tryDataParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (DataModifierParser.isValidDataModifier(modifier)) {
      const result = DataModifierParser.parseDataModifier(modifier);
      if (result) {
        const dataModifier: DataModifier = {
          type: ModifierType.DATA,
          raw: modifier,
          priority: 95, // Lower priority for data attributes
          attribute: result.attribute,
          value: result.value,
          cssSelector: `[data-${result.attribute}${result.value ? `="${result.value}"` : ''}]`
        };
        modifiers.modifiers.push(dataModifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Try parsing as special modifier
   */
  private static trySpecialParser(modifier: string, modifiers: ParsedModifiers): boolean {
    if (SpecialModifierParser.isSpecialModifier(modifier)) {
      const result = SpecialModifierParser.parseSpecialModifier(modifier);
      if (result) {
        let modifierType: ModifierType;
        let cssSelector: string;
        
        switch (result.type) {
          case 'starting':
            modifierType = ModifierType.STARTING;
            cssSelector = '@starting-style';
            break;
          case 'noscript':
            modifierType = ModifierType.NOSCRIPT;
            cssSelector = 'noscript &';
            break;
          case 'print':
            modifierType = ModifierType.PRINT;
            cssSelector = '@media print';
            break;
          case 'scripting':
            modifierType = ModifierType.SCRIPTING;
            cssSelector = '@media (scripting: enabled)';
            break;
          default:
            return false;
          }
          
        const specialModifier: SpecialModifier = {
          type: modifierType,
          raw: modifier,
          priority: 100, // Lowest priority for special modifiers
          condition: result.condition,
          cssSelector
        };
        modifiers.modifiers.push(specialModifier);
        return true;
      }
    }
    return false;
  }

  /**
   * Convert state modifier to CSS format
   */
  private static convertStateToCSS(state: string): string {
    // Pointer device variants - need media query format
    if (state === 'pointer-fine') return '@media (pointer: fine)';
    if (state === 'pointer-coarse') return '@media (pointer: coarse)';
    if (state === 'pointer-none') return '@media (pointer: none)';
    if (state === 'any-pointer-fine') return '@media (any-pointer: fine)';
    if (state === 'any-pointer-coarse') return '@media (any-pointer: coarse)';
    if (state === 'any-pointer-none') return '@media (any-pointer: none)';
    
    // Other special modifiers that need media query format
    if (state === 'user-valid') return ':user-valid';
    if (state === 'user-invalid') return ':user-invalid';
    if (state === 'inverted-colors') return '@media (inverted-colors: inverted)';
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
   * Create empty modifiers structure using new array-based system
   */
  private static createEmptyModifiers(): ParsedModifiers {
    return new ParsedModifiersImpl();
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
  static parseClassName(className: string): ModifierParseResult | null {
    const result = this.parseModifiers(className);
    
    if (!result) {
      return null;
    }
    
    // Validate all modifiers
    const modifierParts = this.getModifierParts(className);
    const invalidModifiers = modifierParts.filter(modifier => !this.validateModifier(modifier));
    
    if (invalidModifiers.length > 0) {
      console.warn(`Invalid modifiers found: ${invalidModifiers.join(', ')}`);
    }

    return result;
  }
} 
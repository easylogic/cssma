/**
 * Group/Peer modifier parser for CSSMA-V3
 * Handles group and peer state modifiers
 * Following Tailwind CSS group/peer variant patterns
 */

export interface GroupPeerModifier {
  type: 'group' | 'peer';
  state?: string; // hover, focus, etc.
  raw: string;
  priority: number;
}

export class GroupPeerModifierParser {
  // Basic group/peer modifiers
  private static readonly BASIC_GROUP_PEER_MODIFIERS = ['group', 'peer'] as const;

  // Common states that can be combined with group/peer
  private static readonly COMBINABLE_STATES = [
    'hover', 'focus', 'active', 'visited', 'target',
    'disabled', 'enabled', 'checked', 'indeterminate',
    'valid', 'invalid', 'required', 'optional',
    'first', 'last', 'odd', 'even', 'open', 'closed'
  ];

  /**
   * Check if modifier is a group/peer modifier
   */
  static isGroupPeerModifier(modifier: string): boolean {
    // Basic group/peer
    if (this.BASIC_GROUP_PEER_MODIFIERS.includes(modifier as any)) {
      return true;
    }

    // Group with state (group-hover, group-focus, etc.)
    if (modifier.startsWith('group-')) {
      const state = modifier.slice(6);
      return this.COMBINABLE_STATES.includes(state);
    }

    // Peer with state (peer-hover, peer-focus, etc.)
    if (modifier.startsWith('peer-')) {
      const state = modifier.slice(5);
      return this.COMBINABLE_STATES.includes(state);
    }

    return false;
  }

  /**
   * Parse group/peer modifier
   */
  static parseGroupPeerModifier(modifier: string): GroupPeerModifier | null {
    if (!this.isGroupPeerModifier(modifier)) {
      return null;
    }

    // Basic group/peer
    if (this.BASIC_GROUP_PEER_MODIFIERS.includes(modifier as any)) {
      return {
        type: modifier as 'group' | 'peer',
        raw: modifier,
        priority: modifier === 'group' ? 15 : 16
      };
    }

    // Group with state
    if (modifier.startsWith('group-')) {
      const state = modifier.slice(6);
      if (this.COMBINABLE_STATES.includes(state)) {
        return {
          type: 'group',
          state,
          raw: modifier,
          priority: 15
        };
      }
    }

    // Peer with state
    if (modifier.startsWith('peer-')) {
      const state = modifier.slice(5);
      if (this.COMBINABLE_STATES.includes(state)) {
        return {
          type: 'peer',
          state,
          raw: modifier,
          priority: 16
        };
      }
    }

    return null;
  }

  /**
   * Generate CSS selector for group/peer modifier
   */
  static generateGroupPeerSelector(modifier: GroupPeerModifier, baseSelector: string): string {
    if (modifier.type === 'group') {
      if (modifier.state) {
        // .group:hover .child
        return `.group:${modifier.state} ${baseSelector}`;
      } else {
        // Basic group - typically used with descendant selectors
        return `.group ${baseSelector}`;
      }
    } else if (modifier.type === 'peer') {
      if (modifier.state) {
        // .peer:hover + .sibling
        return `.peer:${modifier.state} + ${baseSelector}`;
      } else {
        // Basic peer - typically used with sibling selectors
        return `.peer + ${baseSelector}`;
      }
    }

    return baseSelector;
  }

  /**
   * Get all supported group/peer combinations
   */
  static getSupportedCombinations(): string[] {
    const combinations: string[] = [...this.BASIC_GROUP_PEER_MODIFIERS];
    
    // Add group-* combinations
    this.COMBINABLE_STATES.forEach(state => {
      combinations.push(`group-${state}`);
      combinations.push(`peer-${state}`);
    });

    return combinations;
  }

  /**
   * Check if state is combinable with group/peer
   */
  static isCombinable(state: string): boolean {
    return this.COMBINABLE_STATES.includes(state);
  }

  /**
   * Get modifier priority
   */
  static getModifierPriority(modifier: GroupPeerModifier): number {
    return modifier.priority;
  }

  /**
   * Validate group/peer modifier syntax
   */
  static validateSyntax(modifier: string): boolean {
    if (!modifier.includes('-')) {
      return this.BASIC_GROUP_PEER_MODIFIERS.includes(modifier as any);
    }

    const [type, state] = modifier.split('-', 2);
    return (type === 'group' || type === 'peer') && this.COMBINABLE_STATES.includes(state);
  }

  /**
   * Get all group/peer modifiers for comprehensive parsing
   */
  static getAllGroupPeerModifiers(): string[] {
    return this.getSupportedCombinations();
  }
} 
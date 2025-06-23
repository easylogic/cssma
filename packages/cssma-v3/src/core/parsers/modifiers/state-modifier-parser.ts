/**
 * State Modifier Parser - 상태 관련 모디파이어 전용 파서
 * 
 * 처리하는 모디파이어:
 * - Mouse interactions: hover, active
 * - Focus states: focus, focus-within, focus-visible
 * - Form states: disabled, enabled, checked, etc.
 * - Selection states: first, last, only, odd, even
 * - Content states: visited, target, open, etc.
 */

import { StateModifier } from '../../../types';

export interface StateModifierResult {
  type: 'state';
  modifier: StateModifier;
  raw: string;
  priority: number; // 적용 우선순위
}

export class StateModifierParser {
  // Mouse interactions (높은 우선순위)
  private static readonly MOUSE_INTERACTION_MODIFIERS = [
    'hover', 'active'
  ];

  // Focus states (높은 우선순위)  
  private static readonly FOCUS_MODIFIERS = [
    'focus', 'focus-within', 'focus-visible'
  ];

  // Form element states
  private static readonly FORM_STATE_MODIFIERS = [
    'disabled', 'enabled', 'checked', 'indeterminate', 'default',
    'required', 'valid', 'invalid', 'in-range', 'out-of-range',
    'placeholder-shown', 'autofill', 'read-only', 'user-valid', 'user-invalid'
  ];

  // Selection states
  private static readonly SELECTION_MODIFIERS = [
    'first', 'last', 'only', 'odd', 'even',
    'first-of-type', 'last-of-type', 'only-of-type', 'empty'
  ];

  // Content and display states
  private static readonly CONTENT_STATE_MODIFIERS = [
    'visited', 'target', 'open', 'details-content'
  ];

  // Advanced states
  private static readonly ADVANCED_STATE_MODIFIERS = [
    'starting', 'scripting', 'inverted-colors', 'no-inverted-colors'
  ];

  // Media query states
  private static readonly MEDIA_QUERY_MODIFIERS = [
    'pointer-fine', 'pointer-coarse', 'pointer-none',
    'any-pointer-fine', 'any-pointer-coarse', 'any-pointer-none',
    'can-hover', 'no-hover', 'dark', 'light', 'print'
  ];

  // 모든 상태 모디파이어 통합
  private static readonly ALL_STATE_MODIFIERS = [
    ...StateModifierParser.MOUSE_INTERACTION_MODIFIERS,
    ...StateModifierParser.FOCUS_MODIFIERS,
    ...StateModifierParser.FORM_STATE_MODIFIERS,
    ...StateModifierParser.SELECTION_MODIFIERS,
    ...StateModifierParser.CONTENT_STATE_MODIFIERS,
    ...StateModifierParser.ADVANCED_STATE_MODIFIERS,
    ...StateModifierParser.MEDIA_QUERY_MODIFIERS
  ];

  /**
   * 상태 모디파이어인지 확인
   */
  static isValidStateModifier(modifier: string): boolean {
    return this.ALL_STATE_MODIFIERS.includes(modifier);
  }

  /**
   * 상태 모디파이어 파싱
   */
  static parse(modifier: string): StateModifierResult | null {
    if (!this.isValidStateModifier(modifier)) {
      return null;
    }

    const priority = this.getModifierPriority(modifier);

    return {
      type: 'state',
      modifier: modifier as StateModifier,
      raw: modifier,
      priority
    };
  }

  /**
   * Group/Peer 상태 모디파이어 파싱
   */
  static parseGroupPeerState(modifier: string): StateModifierResult | null {
    if (modifier.startsWith('group-')) {
      const groupState = modifier.slice(6);
      if (this.isValidStateModifier(groupState)) {
        return {
          type: 'state',
          modifier: modifier as StateModifier,
          raw: modifier,
          priority: this.getModifierPriority(groupState) + 100 // group은 낮은 우선순위
        };
      }
    }

    if (modifier.startsWith('peer-')) {
      const peerState = modifier.slice(5);
      if (this.isValidStateModifier(peerState)) {
        return {
          type: 'state',
          modifier: modifier as StateModifier,
          raw: modifier,
          priority: this.getModifierPriority(peerState) + 200 // peer는 가장 낮은 우선순위
        };
      }
    }

    return null;
  }

  /**
   * 모디파이어 우선순위 계산
   * 숫자가 낮을수록 높은 우선순위
   */
  private static getModifierPriority(modifier: string): number {
    if (this.MOUSE_INTERACTION_MODIFIERS.includes(modifier)) return 1;
    if (this.FOCUS_MODIFIERS.includes(modifier)) return 2;
    if (this.FORM_STATE_MODIFIERS.includes(modifier)) return 3;
    if (this.SELECTION_MODIFIERS.includes(modifier)) return 4;
    if (this.CONTENT_STATE_MODIFIERS.includes(modifier)) return 5;
    if (this.ADVANCED_STATE_MODIFIERS.includes(modifier)) return 6;
    if (this.MEDIA_QUERY_MODIFIERS.includes(modifier)) return 7;
    
    return 99; // 기본 우선순위
  }

  /**
   * 중첩 가능한 상태 모디파이어 목록
   */
  static getNestablePseudoClasses(): string[] {
    return [
      ...this.MOUSE_INTERACTION_MODIFIERS,
      ...this.FOCUS_MODIFIERS,
      ...this.FORM_STATE_MODIFIERS,
      ...this.CONTENT_STATE_MODIFIERS
    ];
  }

  /**
   * 모디파이어가 중첩을 지원하는지 확인
   */
  static supportsNesting(modifier: string): boolean {
    return this.getNestablePseudoClasses().includes(modifier);
  }

  /**
   * 카테고리별 모디파이어 목록 반환
   */
  static getModifiersByCategory(): Record<string, string[]> {
    return {
      mouseInteraction: this.MOUSE_INTERACTION_MODIFIERS,
      focus: this.FOCUS_MODIFIERS,
      formState: this.FORM_STATE_MODIFIERS,
      selection: this.SELECTION_MODIFIERS,
      contentState: this.CONTENT_STATE_MODIFIERS,
      advanced: this.ADVANCED_STATE_MODIFIERS,
      mediaQuery: this.MEDIA_QUERY_MODIFIERS
    };
  }

  /**
   * 모든 지원되는 상태 모디파이어 반환
   */
  static getAllStateModifiers(): string[] {
    return [...this.ALL_STATE_MODIFIERS];
  }
} 
/**
 * Unified modifier parser for CSSMA-V3
 * Integrates all modifier types following Tailwind CSS patterns
 * Now supports arrays for multiple modifiers and proper priority ordering
 */

import { StateModifierParser, type StateModifierResult } from './state-modifier-parser';
import { ResponsiveModifierParser, type ResponsiveModifierResult } from './responsive-modifier-parser';
import { ContainerModifierParser, type ContainerModifierResult } from './container-modifier-parser';
import { PseudoElementModifierParser, type PseudoElementModifier } from './pseudo-element-modifier-parser';
import { AriaModifierParser, type AriaModifier } from './aria-modifier-parser';
import { DataModifierParser, type DataModifier } from './data-modifier-parser';
import { MotionModifierParser, type MotionModifier } from './motion-modifier-parser';
import { StateModifier, BreakpointModifier, ContainerQueryModifier, DesignPreset } from '../../../types';

// Union type for all modifier results
export type ModifierResult = 
  | StateModifierResult 
  | ResponsiveModifierResult 
  | ContainerModifierResult;

// New modifier types (for new parsers)
export type NewModifier = 
  | PseudoElementModifier
  | AriaModifier
  | DataModifier
  | MotionModifier;

// Array-based modifier result to support multiple modifiers and ordering
export interface ModifierParseResult {
  baseClassName: string;
  stateModifier?: StateModifier;
  breakpointModifier?: BreakpointModifier;
  containerQueryModifier?: ContainerQueryModifier;
  stateModifiers?: StateModifier[];
  specialSelector?: {
    type: 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type';
    value: string;
  };
  breakpointModifiers?: BreakpointModifier[];
  modifier?: string;
  // New modifier fields
  pseudoElementModifier?: PseudoElementModifier;
  ariaModifier?: AriaModifier;
  dataModifier?: DataModifier;
  motionModifier?: MotionModifier;
  newModifiers?: NewModifier[];
}

export class ModifierParser {
  /**
   * 클래스명에서 모디파이어들을 파싱하여 CSSParser 호환 형태로 반환
   */
  parseClassNameModifiers(className: string, preset?: DesignPreset): ModifierParseResult {
    let baseClassName = className;
    let stateModifier: StateModifier | undefined;
    let breakpointModifier: BreakpointModifier | undefined;
    let containerQueryModifier: ContainerQueryModifier | undefined;
    let stateModifiers: StateModifier[] = [];
    let breakpointModifiers: BreakpointModifier[] = [];
    let specialSelector: { 
      type: 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type'; 
      value: string; 
    } | undefined;

    // New modifier types
    let pseudoElementModifier: PseudoElementModifier | undefined;
    let ariaModifier: AriaModifier | undefined;
    let dataModifier: DataModifier | undefined;
    let motionModifier: MotionModifier | undefined;
    let newModifiers: NewModifier[] = [];

    // 콜론으로 분리
    const parts = className.split(':');
    baseClassName = parts[parts.length - 1]; // 마지막 부분이 실제 클래스

    // 각 모디파이어 파싱
    const modifierParts = parts.slice(0, -1);
    const allResults: ModifierResult[] = [];

    // 각 모디파이어 부분을 개별 파서로 처리
    for (const modifierPart of modifierParts) {
      // 1. 컨테이너 쿼리 파서 시도
      const containerResult = ContainerModifierParser.parse(modifierPart, preset);
      if (containerResult) {
        allResults.push(containerResult);
        containerQueryModifier = containerResult.modifier;
        continue;
      }

      // 2. 반응형 파서 시도
      const responsiveResult = ResponsiveModifierParser.parse(modifierPart, preset);
      if (responsiveResult) {
        allResults.push(responsiveResult);
        if (!breakpointModifier) breakpointModifier = responsiveResult.modifier;
        breakpointModifiers.push(responsiveResult.modifier);
        continue;
      }

      // 3. Pseudo-element 파서 시도
      const pseudoElementResult = PseudoElementModifierParser.parsePseudoElementModifier(modifierPart);
      if (pseudoElementResult) {
        if (!pseudoElementModifier) pseudoElementModifier = pseudoElementResult;
        newModifiers.push(pseudoElementResult);
        continue;
      }

      // 4. ARIA 파서 시도
      const ariaResult = AriaModifierParser.parseAriaModifier(modifierPart);
      if (ariaResult) {
        if (!ariaModifier) ariaModifier = ariaResult;
        newModifiers.push(ariaResult);
        continue;
      }

      // 5. Data 파서 시도
      const dataResult = DataModifierParser.parseDataModifier(modifierPart);
      if (dataResult) {
        if (!dataModifier) dataModifier = dataResult;
        newModifiers.push(dataResult);
        continue;
      }

      // 6. Motion 파서 시도
      const motionResult = MotionModifierParser.parseMotionModifier(modifierPart);
      if (motionResult) {
        if (!motionModifier) motionModifier = motionResult;
        newModifiers.push(motionResult);
        continue;
      }

      // 7. 상태 파서 시도 (group/peer 포함)
      let stateResult = StateModifierParser.parse(modifierPart);
      if (!stateResult) {
        stateResult = StateModifierParser.parseGroupPeerState(modifierPart);
      }
      
      if (stateResult) {
        allResults.push(stateResult);
        if (!stateModifier) stateModifier = stateResult.modifier;
        stateModifiers.push(stateResult.modifier);
        continue;
      }

      // 8. 특수 선택자 처리 (nth-child 등)
      if (this.isSpecialSelector(modifierPart)) {
        specialSelector = this.parseSpecialSelector(modifierPart);
        continue;
      }

      // 9. 복합 모디파이어 처리 (has-, not-, supports- 등)
      if (this.isComplexModifier(modifierPart)) {
        const complexState = modifierPart as StateModifier;
        if (!stateModifier) stateModifier = complexState;
        stateModifiers.push(complexState);
        continue;
      }

      // 10. 임의값 모디파이어 처리
      if (modifierPart.startsWith('[') && modifierPart.endsWith(']')) {
        const arbitraryState = modifierPart as StateModifier;
        if (!stateModifier) stateModifier = arbitraryState;
        stateModifiers.push(arbitraryState);
        continue;
      }

      // 11. 다크모드 및 기타 모디파이어
      if (['dark', 'light', 'print'].includes(modifierPart)) {
        const themeState = modifierPart as StateModifier;
        if (!stateModifier) stateModifier = themeState;
        stateModifiers.push(themeState);
        continue;
      }
    }

    // 우선순위에 따라 결과 정렬
    allResults.sort((a, b) => a.priority - b.priority);

    // modifier 필드 생성 (테스트 호환성)
    const modifierValue = this.generateModifierValue(
      stateModifier, 
      stateModifiers, 
      breakpointModifier, 
      preset
    );

    return {
      baseClassName,
      stateModifier,
      breakpointModifier,
      containerQueryModifier,
      stateModifiers: stateModifiers.length > 0 ? stateModifiers : undefined,
      specialSelector,
      breakpointModifiers: breakpointModifiers.length > 0 ? breakpointModifiers : undefined,
      modifier: modifierValue,
      // New modifier fields
      pseudoElementModifier,
      ariaModifier,
      dataModifier,
      motionModifier,
      newModifiers: newModifiers.length > 0 ? newModifiers : undefined
    };
  }

  /**
   * 특수 선택자인지 확인
   */
  private isSpecialSelector(modifier: string): boolean {
    return modifier.startsWith('nth-[') ||
           /^nth-\d+$/.test(modifier) ||
           /^nth-child-\d+$/.test(modifier) ||
           /^nth-last-child-\d+$/.test(modifier) ||
           /^nth-of-type-\d+$/.test(modifier) ||
           /^(nth-child|nth-last-child|nth-of-type|nth-last-of-type)\(.+\)$/.test(modifier);
  }

  /**
   * 특수 선택자 파싱
   */
  private parseSpecialSelector(modifier: string): { type: 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type'; value: string } | undefined {
    // nth-[expression]: 패턴 (nth-[3n+1]:)
    if (modifier.startsWith('nth-[') && modifier.endsWith(']')) {
      const value = modifier.slice(5, -1);
      return { type: 'nth-child', value };
    }

    // nth-{number}: 패턴 (nth-3:)
    const nthMatch = modifier.match(/^nth-(\d+)$/);
    if (nthMatch) {
      return { type: 'nth-child', value: nthMatch[1] };
    }

    // nth-child-{number}: 패턴 (nth-child-3:)
    const nthChildMatch = modifier.match(/^nth-child-(\d+)$/);
    if (nthChildMatch) {
      return { type: 'nth-child', value: nthChildMatch[1] };
    }

    // nth-last-child-{number}: 패턴
    const nthLastChildMatch = modifier.match(/^nth-last-child-(\d+)$/);
    if (nthLastChildMatch) {
      return { type: 'nth-last-child', value: nthLastChildMatch[1] };
    }

    // nth-of-type-{number}: 패턴
    const nthOfTypeMatch = modifier.match(/^nth-of-type-(\d+)$/);
    if (nthOfTypeMatch) {
      return { type: 'nth-of-type', value: nthOfTypeMatch[1] };
    }

    // 기존 괄호 패턴 (후위 호환성)
    const bracketMatch = modifier.match(/^(nth-child|nth-last-child|nth-of-type|nth-last-of-type)\((.+)\)$/);
    if (bracketMatch) {
      return {
        type: bracketMatch[1] as 'nth-child' | 'nth-last-child' | 'nth-of-type' | 'nth-last-of-type',
        value: bracketMatch[2]
      };
    }

    return undefined;
  }

  /**
   * 복합 모디파이어인지 확인
   */
  private isComplexModifier(modifier: string): boolean {
    return modifier.startsWith('has-[') || 
           modifier.startsWith('not-[') || 
           modifier.startsWith('supports-[') ||
           modifier.startsWith('where-') ||
           modifier.startsWith('is-');
  }

  /**
   * 모디파이어 값 생성 (테스트 호환성)
   */
  private generateModifierValue(
    stateModifier?: StateModifier,
    stateModifiers?: StateModifier[],
    breakpointModifier?: BreakpointModifier,
    preset?: DesignPreset
  ): string | undefined {
    // 복합 모디파이어 (예: md:hover)의 경우 상태 부분만 반환
    if (breakpointModifier && stateModifier) {
      return stateModifiers && stateModifiers.length > 0 
        ? stateModifiers[stateModifiers.length - 1] 
        : stateModifier;
    }
    // 상태 모디파이어만 있는 경우
    else if (stateModifier || (stateModifiers && stateModifiers.length > 0)) {
      return stateModifiers && stateModifiers.length > 0 
        ? stateModifiers[stateModifiers.length - 1] 
        : stateModifier;
    }
    // 브레이크포인트 모디파이어만 있는 경우
    else if (breakpointModifier) {
      return ResponsiveModifierParser.getBreakpointName(
        this.getBreakpointModifierName(breakpointModifier), 
        preset
      );
    }

    return undefined;
  }

  /**
   * BreakpointModifier에서 모디파이어 이름 추출
   */
  private getBreakpointModifierName(breakpoint: BreakpointModifier): string {
    const values = ResponsiveModifierParser.getBreakpointValues();
    const key = Object.keys(values).find(k => values[k] === breakpoint.value);
    
    if (key) {
      return breakpoint.type === 'max-width' ? `max-${key}` : key;
    }
    
    // 임의값인 경우
    const prefix = breakpoint.type === 'max-width' ? 'max-' : 'min-';
    return `${prefix}[${breakpoint.value}]`;
  }

  /**
   * 지원되는 모든 모디파이어 반환
   */
  getSupportedModifiers(): string[] {
    return [
      ...StateModifierParser.getAllStateModifiers(),
      ...ResponsiveModifierParser.getAllBreakpoints(),
      ...ContainerModifierParser.getAllContainerSizes().map(size => `@${size}`),
      ...PseudoElementModifierParser.getSupportedModifiers(),
      ...AriaModifierParser.getSupportedBooleanAttributes().map(attr => `aria-${attr}`),
      ...DataModifierParser.getSupportedBooleanAttributes().map(attr => `data-${attr}`),
      ...MotionModifierParser.getSupportedPreferences()
    ];
  }

  /**
   * 카테고리별 모디파이어 목록 반환
   */
  getSupportedModifiersByCategory(): Record<string, string[]> {
    return {
      ...StateModifierParser.getModifiersByCategory(),
      responsive: ResponsiveModifierParser.getAllBreakpoints(),
      container: ContainerModifierParser.getAllContainerSizes().map(size => `@${size}`),
      pseudoElement: PseudoElementModifierParser.getSupportedModifiers(),
      aria: AriaModifierParser.getSupportedBooleanAttributes().map(attr => `aria-${attr}`),
      data: DataModifierParser.getSupportedBooleanAttributes().map(attr => `data-${attr}`),
      motion: MotionModifierParser.getSupportedPreferences()
    };
  }

  /**
   * 모디파이어 검증
   */
  isValidModifier(modifier: string): boolean {
    return StateModifierParser.isStateModifier(modifier) ||
           ResponsiveModifierParser.isResponsiveModifier(modifier) ||
           ContainerModifierParser.isContainerModifier(modifier) ||
           PseudoElementModifierParser.isValidPseudoElementModifier(modifier) ||
           AriaModifierParser.isValidAriaModifier(modifier) ||
           DataModifierParser.isValidDataModifier(modifier) ||
           MotionModifierParser.isValidMotionModifier(modifier) ||
           this.isSpecialSelector(modifier) ||
           this.isComplexModifier(modifier);
  }
}

// 기존 호환성을 위한 export
export { StateModifierParser } from './state-modifier-parser';
export { ResponsiveModifierParser } from './responsive-modifier-parser';
export { ContainerModifierParser } from './container-modifier-parser';
export { PseudoElementModifierParser } from './pseudo-element-modifier-parser';
export { AriaModifierParser } from './aria-modifier-parser';
export { DataModifierParser } from './data-modifier-parser';
export { MotionModifierParser } from './motion-modifier-parser'; 
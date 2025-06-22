/**
 * Unified Modifier Parser - 모든 모디파이어 파서의 통합 인터페이스
 * 
 * 분산된 모디파이어 파서들을 통합하여 관리하고
 * 기존 CSSParser와의 호환성을 유지합니다.
 */

import { StateModifier, BreakpointModifier, ContainerQueryModifier, DesignPreset } from '../../../types';
import { StateModifierParser, StateModifierResult } from './state-modifier-parser';
import { ResponsiveModifierParser, ResponsiveModifierResult } from './responsive-modifier-parser';
import { ContainerModifierParser, ContainerModifierResult } from './container-modifier-parser';

// 통합 모디파이어 결과 타입
export type ModifierResult = StateModifierResult | ResponsiveModifierResult | ContainerModifierResult;

// CSSParser와 호환되는 결과 타입 (기존과 동일)
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
}

/**
 * 새로운 통합 ModifierParser
 * 분산된 파서들을 조합하여 모디파이어를 처리합니다
 */
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

      // 3. 상태 파서 시도 (group/peer 포함)
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

      // 4. 특수 선택자 처리 (nth-child 등)
      if (this.isSpecialSelector(modifierPart)) {
        specialSelector = this.parseSpecialSelector(modifierPart);
        continue;
      }

      // 5. 복합 모디파이어 처리 (has-, not-, supports- 등)
      if (this.isComplexModifier(modifierPart)) {
        const complexState = modifierPart as StateModifier;
        if (!stateModifier) stateModifier = complexState;
        stateModifiers.push(complexState);
        continue;
      }

      // 6. 임의값 모디파이어 처리
      if (modifierPart.startsWith('[') && modifierPart.endsWith(']')) {
        const arbitraryState = modifierPart as StateModifier;
        if (!stateModifier) stateModifier = arbitraryState;
        stateModifiers.push(arbitraryState);
        continue;
      }

      // 7. 다크모드 및 기타 모디파이어
      if (['dark', 'light', 'print', 'motion-safe', 'motion-reduce'].includes(modifierPart)) {
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
      modifier: modifierValue
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
      ...ContainerModifierParser.getAllContainerSizes().map(size => `@${size}`)
    ];
  }

  /**
   * 카테고리별 모디파이어 목록 반환
   */
  getSupportedModifiersByCategory(): Record<string, string[]> {
    return {
      ...StateModifierParser.getModifiersByCategory(),
      responsive: ResponsiveModifierParser.getAllBreakpoints(),
      container: ContainerModifierParser.getAllContainerSizes().map(size => `@${size}`)
    };
  }

  /**
   * 모디파이어 검증
   */
  isValidModifier(modifier: string): boolean {
    return StateModifierParser.isStateModifier(modifier) ||
           ResponsiveModifierParser.isResponsiveModifier(modifier) ||
           ContainerModifierParser.isContainerModifier(modifier) ||
           this.isSpecialSelector(modifier) ||
           this.isComplexModifier(modifier);
  }
}

// 기존 호환성을 위한 export
export { StateModifierParser } from './state-modifier-parser';
export { ResponsiveModifierParser } from './responsive-modifier-parser';
export { ContainerModifierParser } from './container-modifier-parser'; 
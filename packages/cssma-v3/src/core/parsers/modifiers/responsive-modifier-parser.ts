/**
 * Responsive Modifier Parser - 반응형 모디파이어 전용 파서
 * 
 * 처리하는 모디파이어:
 * - Standard breakpoints: sm, md, lg, xl, 2xl
 * - Min/Max variants: min-*, max-*
 * - Arbitrary breakpoints: min-[...], max-[...]
 */

import { BreakpointModifier, DesignPreset } from '../../../types';

export interface ResponsiveModifierResult {
  type: 'responsive';
  modifier: BreakpointModifier;
  raw: string;
  priority: number;
}

export class ResponsiveModifierParser {
  // 표준 반응형 브레이크포인트
  private static readonly STANDARD_BREAKPOINTS = [
    'sm', 'md', 'lg', 'xl', '2xl'
  ];

  /**
   * 반응형 모디파이어인지 확인
   */
  static isResponsiveModifier(modifier: string): boolean {
    // 표준 브레이크포인트
    if (this.STANDARD_BREAKPOINTS.includes(modifier)) {
      return true;
    }

    // Max 브레이크포인트
    if (modifier.startsWith('max-')) {
      const breakpoint = modifier.slice(4);
      return this.STANDARD_BREAKPOINTS.includes(breakpoint) || 
             (breakpoint.startsWith('[') && breakpoint.endsWith(']'));
    }

    // Min 브레이크포인트
    if (modifier.startsWith('min-')) {
      const breakpoint = modifier.slice(4);
      return this.STANDARD_BREAKPOINTS.includes(breakpoint) || 
             (breakpoint.startsWith('[') && breakpoint.endsWith(']'));
    }

    // 임의 브레이크포인트
    if (modifier.startsWith('min-[') && modifier.endsWith(']')) {
      return true;
    }

    if (modifier.startsWith('max-[') && modifier.endsWith(']')) {
      return true;
    }

    return false;
  }

  /**
   * 반응형 모디파이어 파싱
   */
  static parse(modifier: string, preset?: DesignPreset): ResponsiveModifierResult | null {
    if (!this.isResponsiveModifier(modifier)) {
      return null;
    }

    const breakpointModifier = this.parseBreakpoint(modifier, preset);
    if (!breakpointModifier) {
      return null;
    }

    const priority = this.getModifierPriority(modifier);

    return {
      type: 'responsive',
      modifier: breakpointModifier,
      raw: modifier,
      priority
    };
  }

  /**
   * 브레이크포인트 모디파이어 파싱
   */
  private static parseBreakpoint(modifier: string, preset?: DesignPreset): BreakpointModifier | null {
    const defaultScreens = {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };

    const screens = preset?.screens || defaultScreens;

    // Max 반응형 모디파이어
    if (modifier.startsWith('max-')) {
      const breakpoint = modifier.slice(4);
      
      // 임의 값 처리
      if (breakpoint.startsWith('[') && breakpoint.endsWith(']')) {
        return {
          type: 'max-width',
          value: breakpoint.slice(1, -1) // [] 제거
        };
      }
      
      // 표준 브레이크포인트
      if (this.STANDARD_BREAKPOINTS.includes(breakpoint)) {
        return {
          type: 'max-width',
          value: (screens as Record<string, string>)[breakpoint] || breakpoint
        };
      }
    }

    // Min 반응형 모디파이어
    if (modifier.startsWith('min-')) {
      const breakpoint = modifier.slice(4);
      
      // 임의 값 처리
      if (breakpoint.startsWith('[') && breakpoint.endsWith(']')) {
        return {
          type: 'min-width',
          value: breakpoint.slice(1, -1) // [] 제거
        };
      }
      
      // 표준 브레이크포인트
      if (this.STANDARD_BREAKPOINTS.includes(breakpoint)) {
        return {
          type: 'min-width',
          value: (screens as Record<string, string>)[breakpoint] || breakpoint
        };
      }
    }

    // 임의 min-width 브레이크포인트
    if (modifier.startsWith('min-[') && modifier.endsWith(']')) {
      return {
        type: 'min-width',
        value: modifier.slice(5, -1)
      };
    }

    // 임의 max-width 브레이크포인트
    if (modifier.startsWith('max-[') && modifier.endsWith(']')) {
      return {
        type: 'max-width',
        value: modifier.slice(5, -1)
      };
    }

    // 표준 반응형 모디파이어 (기본값은 min-width)
    if (this.STANDARD_BREAKPOINTS.includes(modifier)) {
      return {
        type: 'min-width',
        value: (screens as Record<string, string>)[modifier] || modifier
      };
    }

    return null;
  }

  /**
   * 모디파이어 우선순위 계산
   * 숫자가 낮을수록 높은 우선순위
   */
  private static getModifierPriority(modifier: string): number {
    // Max-width가 min-width보다 우선순위가 높음 (더 구체적)
    if (modifier.startsWith('max-')) return 1;
    if (modifier.startsWith('min-')) return 2;
    
    // 표준 브레이크포인트 우선순위 (큰 화면부터)
    const breakpointOrder = ['2xl', 'xl', 'lg', 'md', 'sm'];
    const index = breakpointOrder.indexOf(modifier);
    
    return index !== -1 ? index + 3 : 99;
  }

  /**
   * 브레이크포인트 이름 생성 (레거시 호환)
   */
  static getBreakpointName(modifier: string, preset?: DesignPreset): string {
    if (!modifier) return '';

    const defaultScreens = {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };

    const screens = preset?.screens || defaultScreens;

    // Max 처리
    if (modifier.startsWith('max-')) {
      const breakpoint = modifier.slice(4);
      if (breakpoint.startsWith('[') && breakpoint.endsWith(']')) {
        return `max-[${breakpoint.slice(1, -1)}]`;
      }
      return modifier;
    }

    // Min 처리
    if (modifier.startsWith('min-')) {
      const breakpoint = modifier.slice(4);
      if (breakpoint.startsWith('[') && breakpoint.endsWith(']')) {
        return `min-[${breakpoint.slice(1, -1)}]`;
      }
      return modifier;
    }

    // 임의값 처리
    if (modifier.startsWith('[') && modifier.endsWith(']')) {
      return modifier;
    }

    // 표준 브레이크포인트
    return modifier;
  }

  /**
   * 모든 지원되는 브레이크포인트 반환
   */
  static getAllBreakpoints(): string[] {
    return [...this.STANDARD_BREAKPOINTS];
  }

  /**
   * 브레이크포인트별 픽셀 값 반환
   */
  static getBreakpointValues(preset?: DesignPreset): Record<string, string> {
    const defaultScreens: Record<string, string> = {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };

    return (preset?.screens as Record<string, string>) || defaultScreens;
  }
} 
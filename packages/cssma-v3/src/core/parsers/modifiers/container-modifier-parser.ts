/**
 * Container Modifier Parser - 컨테이너 쿼리 모디파이어 전용 파서
 * 
 * 처리하는 모디파이어:
 * - Container queries: @sm, @md, @lg, @xl, @2xl, etc.
 * - Min/Max container queries: @min-*, @max-*
 * - Named container queries: @md/sidebar
 * - Arbitrary container queries: @[200px], @min-[300px], @max-[400px]
 */

import { ContainerQueryModifier, DesignPreset } from '../../../types';

export interface ContainerModifierResult {
  type: 'container';
  modifier: ContainerQueryModifier;
  raw: string;
  priority: number;
}

export class ContainerModifierParser {
  // 표준 컨테이너 쿼리 크기
  private static readonly STANDARD_CONTAINER_SIZES = [
    'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'
  ];

  /**
   * 컨테이너 쿼리 모디파이어인지 확인
   */
  static isContainerModifier(modifier: string): boolean {
    if (!modifier.startsWith('@')) {
      return false;
    }

    const query = modifier.slice(1); // @ 제거

    // 표준 컨테이너 크기
    if (this.STANDARD_CONTAINER_SIZES.includes(query)) {
      return true;
    }

    // Max 컨테이너 쿼리
    if (query.startsWith('max-')) {
      const size = query.slice(4);
      return this.STANDARD_CONTAINER_SIZES.includes(size) || 
             (size.startsWith('[') && size.endsWith(']'));
    }

    // Min 컨테이너 쿼리
    if (query.startsWith('min-')) {
      const size = query.slice(4);
      return this.STANDARD_CONTAINER_SIZES.includes(size) || 
             (size.startsWith('[') && size.endsWith(']'));
    }

    // 임의 값 컨테이너 쿼리
    if (query.startsWith('[') && query.endsWith(']')) {
      return true;
    }

    // 명명된 컨테이너 쿼리 (예: md/sidebar)
    if (query.includes('/')) {
      const [size] = query.split('/');
      return this.STANDARD_CONTAINER_SIZES.includes(size);
    }

    return false;
  }

  /**
   * 컨테이너 쿼리 모디파이어 파싱
   */
  static parse(modifier: string, preset?: DesignPreset): ContainerModifierResult | null {
    if (!this.isContainerModifier(modifier)) {
      return null;
    }

    const containerModifier = this.parseContainer(modifier, preset);
    if (!containerModifier) {
      return null;
    }

    const priority = this.getModifierPriority(modifier);

    return {
      type: 'container',
      modifier: containerModifier,
      raw: modifier,
      priority
    };
  }

  /**
   * 컨테이너 쿼리 파싱
   */
  private static parseContainer(modifier: string, preset?: DesignPreset): ContainerQueryModifier | null {
    if (!modifier.startsWith('@')) return null;

    const containerQuery = modifier.slice(1); // @ 제거
    const defaultScreens: Record<string, string> = {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1728px',
      '4xl': '1984px',
      '5xl': '2240px',
      '6xl': '2496px',
      '7xl': '2752px'
    };

    const screens = (preset?.screens as Record<string, string>) || defaultScreens;

    // Max 컨테이너 쿼리
    if (containerQuery.startsWith('max-')) {
      const size = containerQuery.slice(4);
      
      // 임의 값 처리
      if (size.startsWith('[') && size.endsWith(']')) {
        return {
          type: 'max-width',
          value: size.slice(1, -1) // [] 제거
        };
      }
      
      // 표준 크기
      return {
        type: 'max-width',
        value: screens[size] || size
      };
    }

    // Min 컨테이너 쿼리
    if (containerQuery.startsWith('min-')) {
      const size = containerQuery.slice(4);
      
      // 임의 값 처리
      if (size.startsWith('[') && size.endsWith(']')) {
        return {
          type: 'min-width',
          value: size.slice(1, -1) // [] 제거
        };
      }
      
      // 표준 크기
      return {
        type: 'min-width',
        value: screens[size] || size
      };
    }

    // 임의 값 컨테이너 쿼리
    if (containerQuery.startsWith('[') && containerQuery.endsWith(']')) {
      return {
        type: 'min-width',
        value: containerQuery.slice(1, -1) // [] 제거
      };
    }

    // 명명된 컨테이너 쿼리 (예: md/sidebar)
    if (containerQuery.includes('/')) {
      return {
        type: 'min-width',
        value: containerQuery // 그대로 유지
      };
    }

    // 표준 컨테이너 크기 (기본값은 min-width)
    return {
      type: 'min-width',
      value: screens[containerQuery] || containerQuery
    };
  }

  /**
   * 모디파이어 우선순위 계산
   * 숫자가 낮을수록 높은 우선순위
   */
  private static getModifierPriority(modifier: string): number {
    const query = modifier.slice(1); // @ 제거

    // Max-width가 min-width보다 우선순위가 높음
    if (query.startsWith('max-')) return 1;
    if (query.startsWith('min-')) return 2;

    // 명명된 컨테이너는 높은 우선순위
    if (query.includes('/')) return 3;

    // 표준 컨테이너 크기 우선순위 (큰 화면부터)
    const sizeOrder = ['7xl', '6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    const index = sizeOrder.indexOf(query);
    
    return index !== -1 ? index + 4 : 99;
  }

  /**
   * 컨테이너 이름 생성 (레거시 호환)
   */
  static getContainerName(modifier: string, preset?: DesignPreset): string {
    if (!modifier || !modifier.startsWith('@')) return '';

    const query = modifier.slice(1); // @ 제거

    // Max 처리
    if (query.startsWith('max-')) {
      const size = query.slice(4);
      if (size.startsWith('[') && size.endsWith(']')) {
        return `@max-[${size.slice(1, -1)}]`;
      }
      return modifier;
    }

    // Min 처리
    if (query.startsWith('min-')) {
      const size = query.slice(4);
      if (size.startsWith('[') && size.endsWith(']')) {
        return `@min-[${size.slice(1, -1)}]`;
      }
      return modifier;
    }

    // 임의값 처리
    if (query.startsWith('[') && query.endsWith(']')) {
      return modifier;
    }

    // 명명된 컨테이너 및 표준 크기
    return modifier;
  }

  /**
   * 모든 지원되는 컨테이너 크기 반환
   */
  static getAllContainerSizes(): string[] {
    return [...this.STANDARD_CONTAINER_SIZES];
  }

  /**
   * 컨테이너 크기별 픽셀 값 반환
   */
  static getContainerValues(preset?: DesignPreset): Record<string, string> {
    const defaultSizes: Record<string, string> = {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1728px',
      '4xl': '1984px',
      '5xl': '2240px',
      '6xl': '2496px',
      '7xl': '2752px'
    };

    return (preset?.screens as Record<string, string>) || defaultSizes;
  }
} 
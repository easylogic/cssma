/**
 * Animation Parser - 애니메이션 관련 CSS 속성 파서
 * 
 * animate, duration, delay, ease, transition 등의
 * 애니메이션 관련 속성을 처리합니다.
 */

import { ParsedClass, AnimationStyles, DesignPreset } from '../../types';

export class AnimationParser {
  /**
   * 클래스명이 애니메이션 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns 애니메이션 관련 클래스 여부
   */
  static isValidClass(className: string): boolean {
    // transition 관련
    if (className === 'transition') return true;
    if (className.startsWith('transition-')) return true;
    
    // animate 관련
    if (className.startsWith('animate-')) return true;
    
    // duration 관련
    if (className.startsWith('duration-')) return true;
    
    // timing function 관련
    if (className.startsWith('ease-')) return true;
    
    // delay 관련
    if (className.startsWith('delay-')) return true;
    
    // repeat/iteration count 관련
    if (className.startsWith('repeat-')) return true;
    
    // animation direction 관련
    if (className.startsWith('direction-')) return true;
    
    // animation fill mode 관련
    if (className.startsWith('fill-')) return true;
    
    return false;
  }

  /**
   * 클래스명을 파싱하여 속성과 값을 추출합니다.
   * @param className 클래스명
   * @returns 파싱된 결과
   */
  static parseValue(className: string): { property: string; value: string; isArbitrary: boolean } | null {
    // transition 처리
    if (className === 'transition') {
      return { property: 'transition', value: '', isArbitrary: false };
    }
    
    // transition-[property] 형태
    if (className.startsWith('transition-')) {
      const value = className.slice('transition-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'transition',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }
    
    // animate-{name} 형태
    if (className.startsWith('animate-')) {
      const value = className.slice('animate-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'animate',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }
    
    // duration-{value} 형태
    if (className.startsWith('duration-')) {
      const value = className.slice('duration-'.length);
      // CSS 변수 형태인지 확인: duration-(my-var)
      const isCssVar = value.startsWith('(') && value.endsWith(')');
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'duration',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary: isArbitrary || isCssVar
      };
    }
    
    // ease-{function} 형태
    if (className.startsWith('ease-')) {
      const value = className.slice('ease-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'ease',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }
    
    // delay-{value} 형태
    if (className.startsWith('delay-')) {
      const value = className.slice('delay-'.length);
      // CSS 변수 형태인지 확인: delay-(my-var)
      const isCssVar = value.startsWith('(') && value.endsWith(')');
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'delay',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary: isArbitrary || isCssVar
      };
    }
    
    // repeat-{count} 형태
    if (className.startsWith('repeat-')) {
      const value = className.slice('repeat-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'repeat',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }
    
    // direction-{value} 형태
    if (className.startsWith('direction-')) {
      const value = className.slice('direction-'.length);
      return {
        property: 'direction',
        value: value,
        isArbitrary: false
      };
    }
    
    // fill-{mode} 형태
    if (className.startsWith('fill-')) {
      const value = className.slice('fill-'.length);
      return {
        property: 'fill',
        value: value,
        isArbitrary: false
      };
    }
    
    return null;
  }

  /**
   * 애니메이션 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋
   */
  static applyAnimationStyle(
    parsedClass: ParsedClass, 
    styles: { animation?: AnimationStyles }, 
    preset: DesignPreset
  ): void {
    const { property, value, isArbitrary } = parsedClass;
    
    if (!styles.animation) {
      styles.animation = {};
    }
    
    if (property === 'transition') {
      // transition 활성화
      styles.animation.transition = true;
    } else if (property === 'animate' && !isArbitrary) {
      // 애니메이션 프리셋
      const animationPreset = preset.animation?.presets?.[value];
      if (animationPreset) {
        styles.animation.name = animationPreset.name;
        styles.animation.duration = String(animationPreset.duration);
        styles.animation.timingFunction = animationPreset.timingFunction;
        styles.animation.iterationCount = animationPreset.iterationCount;
        styles.animation.fillMode = animationPreset.fillMode;
        return;
      }
    }

    // Handle individual animation properties
    if (property === 'duration') {
      styles.animation.duration = this.parseDuration(value, isArbitrary || false, preset);
    } else if (property === 'ease') {
      styles.animation.timingFunction = this.parseTimingFunction(value, isArbitrary || false);
    } else if (property === 'delay') {
      styles.animation.delay = this.parseDelay(value, isArbitrary || false, preset);
    } else if (property === 'repeat') {
      styles.animation.iterationCount = this.parseIterationCount(value, isArbitrary || false);
    } else if (property === 'direction') {
      styles.animation.direction = value as any;
    } else if (property === 'fill') {
      styles.animation.fillMode = value as any;
    }
  }

  /**
   * 애니메이션 지속 시간을 파싱합니다.
   */
  private static parseDuration(value: string, isArbitrary: boolean, preset: DesignPreset): string {
    if (isArbitrary) {
      // CSS 변수 처리: duration-(my-duration)
      const cssVarMatch = value.match(/^\((.*)\)$/);
      if (cssVarMatch) {
        // CSS 변수 반환
        const varName = cssVarMatch[1];
        return `var(--${varName})`;
      }
      
      // 임의 값 처리: duration-[1s] 또는 duration-[1000ms]
      // 이미 단위가 포함된 경우 그대로 반환
      if (value.includes('s') || value.includes('ms')) {
        return value;
      }
      // 단위가 없는 숫자인 경우 ms 추가
      return `${value}ms`;
    } else {
      // 프리셋에서 값 확인
      const duration = preset.animation?.durations?.[value];
      if (duration !== undefined) {
        return `${duration}ms`;
      }

      // 숫자 값은 ms 단위로 처리
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue)) {
        return `${numericValue}ms`;
      }
      
      // 기본값
      return '150ms';
    }
  }

  /**
   * 애니메이션 타이밍 함수를 파싱합니다.
   */
  private static parseTimingFunction(value: string, isArbitrary: boolean): string {
    if (isArbitrary) {
      // 임의 값 타이밍 함수 (예: cubic-bezier)
      return value;
    } else {
      // 특수 처리 - ease-in-out 등 복합 타이밍 함수
      if (value.includes('-')) {
        return `ease-${value}`;
      } else {
        // ease-linear 같은 일반 타이밍 함수
        return value;
      }
    }
  }

  /**
   * 애니메이션 지연 시간을 파싱합니다.
   */
  private static parseDelay(value: string, isArbitrary: boolean, preset: DesignPreset): string {
    if (isArbitrary) {
      // CSS 변수 처리: delay-(my-delay-var)
      const cssVarMatch = value.match(/^\((.*)\)$/);
      if (cssVarMatch) {
        // CSS 변수 반환
        const varName = cssVarMatch[1];
        return `var(--${varName})`;
      }
      
      // 임의 값: delay-[200ms] 또는 delay-[1s]
      // 이미 단위가 포함된 경우 그대로 반환
      if (value.includes('s') || value.includes('ms')) {
        return value;
      }
      // 단위가 없는 숫자인 경우 ms 추가
      return `${value}ms`;
    } else {
      // 프리셋에서 값 확인 (delays 속성이 없으므로 durations 사용)
      const delay = preset.animation?.durations?.[value];
      if (delay !== undefined) {
        return `${delay}ms`;
      }

      // 숫자 값은 ms 단위로 처리
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue)) {
        return `${numericValue}ms`;
      }
      
      // 기본값
      return '0ms';
    }
  }

  /**
   * 애니메이션 반복 횟수를 파싱합니다.
   */
  private static parseIterationCount(value: string, isArbitrary: boolean): number | 'infinite' {
    if (value === 'infinite') {
      return 'infinite';
    }
    
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      return numericValue;
    }
    
    // 기본값
    return 1;
  }
} 
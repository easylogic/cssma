/**
 * Animation Parser - 애니메이션 관련 CSS 속성 파서
 * 
 * animate, duration, delay, ease, transition 등의
 * 애니메이션 관련 속성을 처리합니다.
 */

import { ParsedClass, AnimationStyles, DesignPreset } from '../../types';

export class AnimationParser {
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
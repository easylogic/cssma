/**
 * Accessibility Parser - 접근성 관련 CSS 속성 파서
 * 
 * sr-only, forced-color-adjust 등의 접근성 관련 속성을 처리합니다.
 */

import { ParsedClass, ParsedStyle, ParsedStyles, DesignPreset } from '../../types';

export class AccessibilityParser {
  /**
   * 접근성 관련 클래스를 파싱합니다.
   * @param className 클래스명
   * @returns 파싱된 스타일 또는 null
   */
  static parse(className: string): ParsedStyle | null {
    // Screen reader utilities
    if (className === 'sr-only') {
      return {
        property: 'screenReader',
        value: 'sr-only',
        variant: 'preset'
      };
    }

    if (className === 'not-sr-only') {
      return {
        property: 'screenReader',
        value: 'not-sr-only',
        variant: 'preset'
      };
    }

    // Forced color adjust utilities
    if (className === 'forced-color-adjust-auto') {
      return {
        property: 'forcedColorAdjust',
        value: 'auto',
        variant: 'preset'
      };
    }

    if (className === 'forced-color-adjust-none') {
      return {
        property: 'forcedColorAdjust',
        value: 'none',
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * 접근성 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋
   */
  static applyAccessibilityStyle(
    parsedClass: ParsedClass,
    styles: Partial<ParsedStyles>,
    preset: DesignPreset
  ): void {
    const { property, value } = parsedClass;

    if (!styles.accessibility) {
      styles.accessibility = {};
    }

    if (property === 'screenReader') {
      if (value === 'true') {
        // sr-only 스타일 적용
        styles.accessibility.position = 'absolute';
        styles.accessibility.width = '1px';
        styles.accessibility.height = '1px';
        styles.accessibility.padding = '0';
        styles.accessibility.margin = '-1px';
        styles.accessibility.overflow = 'hidden';
        styles.accessibility.clip = 'rect(0, 0, 0, 0)';
        styles.accessibility.whiteSpace = 'nowrap';
        styles.accessibility.borderWidth = '0';
      } else if (value === 'false') {
        // not-sr-only 스타일 적용
        styles.accessibility.position = 'static';
        styles.accessibility.width = 'auto';
        styles.accessibility.height = 'auto';
        styles.accessibility.padding = '0';
        styles.accessibility.margin = '0';
        styles.accessibility.overflow = 'visible';
        styles.accessibility.clip = 'auto';
        styles.accessibility.whiteSpace = 'normal';
      }
    } else if (property === 'forcedColorAdjust' && typeof value === 'string') {
      // forced-color-adjust 스타일 적용
      styles.accessibility.forcedColorAdjust = value;
    }
  }

  /**
   * 주어진 클래스가 접근성 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns 접근성 관련 클래스 여부
   */
  static isAccessibilityClass(className: string): boolean {
    return (
      className === 'sr-only' ||
      className === 'not-sr-only' ||
      className === 'forced-color-adjust-auto' ||
      className === 'forced-color-adjust-none'
    );
  }

  /**
   * 표준 인터페이스: 클래스가 accessibility 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // 접근성 관련 클래스들 (sr-only와 forced-color-adjust 모두 포함)
    const exactMatches = [
      'sr-only', 'not-sr-only',
      'forced-color-adjust-auto', 'forced-color-adjust-none'
    ];
    
    return exactMatches.includes(className);
  }

  /**
   * 표준 인터페이스: accessibility 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    if (!this.isValidClass(className)) {
      return null;
    }

    // sr-only 관련 클래스들
    switch (className) {
      case 'sr-only':
        return {
          property: 'screenReader',
          value: 'true',
          isArbitrary: false
        };
      case 'not-sr-only':
        return {
          property: 'screenReader',
          value: 'false',
          isArbitrary: false
        };
      case 'forced-color-adjust-auto':
        return {
          property: 'forcedColorAdjust',
          value: 'auto',
          isArbitrary: false
        };
      case 'forced-color-adjust-none':
        return {
          property: 'forcedColorAdjust',
          value: 'none',
          isArbitrary: false
        };
      default:
        return null;
    }
  }
} 
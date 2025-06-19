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
        value: {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        },
        variant: 'preset'
      };
    }

    if (className === 'not-sr-only') {
      return {
        property: 'screenReader',
        value: {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal'
        },
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

    if (property === 'screenReader' && typeof value === 'object') {
      // sr-only 스타일 적용
      Object.assign(styles.accessibility, value);
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
} 
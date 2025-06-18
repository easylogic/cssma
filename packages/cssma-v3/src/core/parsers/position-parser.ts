/**
 * Position Parser - 위치 관련 CSS 속성 파서
 * 
 * static, absolute, relative, top, left, z-index 등의
 * 위치 관련 속성을 처리합니다.
 */

import { ParsedClass, PositionStyles, DesignPreset } from '../../types';

export class PositionParser {
  /**
   * 위치 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋
   */
  static applyPositionStyle(
    parsedClass: ParsedClass, 
    styles: { position?: PositionStyles }, 
    preset: DesignPreset
  ): void {
    if (!styles.position) {
      styles.position = {};
    }

    const { property, value, isArbitrary } = parsedClass;

    if (['top', 'right', 'bottom', 'left'].includes(property)) {
      this.handlePositionValue(property, value, isArbitrary || false, styles.position, preset);
    } else if (property === 'static' || property === 'fixed' || property === 'absolute' || 
               property === 'relative' || property === 'sticky') {
      styles.position.position = property;
      styles.position.type = property;
    } else if (property.startsWith('inset')) {
      this.handleInsetValue(value, isArbitrary || false, styles.position, preset);
    } else if (property === 'z') {
      this.handleZIndex(value, isArbitrary || false, styles.position);
    }
  }

  /**
   * 위치 값을 처리합니다 (top, right, bottom, left)
   */
  private static handlePositionValue(
    property: string,
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    preset: DesignPreset
  ): void {
    let positionValue: number | string;

    if (isArbitrary) {
      // 임의 값 처리
      positionValue = this.parseArbitraryValue(value);
    } else {
      // 프리셋 값 처리
      if (value === 'auto') {
        positionValue = 'auto';
      } else if (value === 'full') {
        positionValue = '100%';
      } else if (value in preset.spacing) {
        positionValue = preset.spacing[value];
      } else {
        // 분수 값 처리 (예: top-1/2)
        if (value.includes('/')) {
          const [numerator, denominator] = value.split('/').map(Number);
          positionValue = `${(numerator / denominator) * 100}%`;
        } else {
          positionValue = value;
        }
      }
    }

    // 속성에 따라 설정
    switch (property) {
      case 'top':
        position.top = positionValue;
        break;
      case 'right':
        position.right = positionValue;
        break;
      case 'bottom':
        position.bottom = positionValue;
        break;
      case 'left':
        position.left = positionValue;
        break;
    }
  }

  /**
   * inset 값을 처리합니다 (모든 방향)
   */
  private static handleInsetValue(
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    preset: DesignPreset
  ): void {
    let insetValue: number | string;

    if (isArbitrary) {
      insetValue = this.parseArbitraryValue(value);
    } else if (value === 'auto') {
      insetValue = 'auto';
    } else if (value === 'full') {
      insetValue = '100%';
    } else if (value in preset.spacing) {
      insetValue = preset.spacing[value];
    } else {
      // 분수 값 처리 (예: inset-1/2)
      if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        insetValue = `${(numerator / denominator) * 100}%`;
      } else {
        insetValue = value;
      }
    }

    // 모든 방향에 적용
    position.top = insetValue;
    position.right = insetValue;
    position.bottom = insetValue;
    position.left = insetValue;
  }

  /**
   * z-index를 처리합니다.
   */
  private static handleZIndex(
    value: string,
    isArbitrary: boolean,
    position: PositionStyles
  ): void {
    if (value === 'auto') {
      // zIndex를 string으로 타입 확장이 필요하거나, 'auto' 문자열로 저장
      (position as any).zIndex = 'auto';
    } else if (isArbitrary) {
      position.zIndex = parseInt(value, 10) || 0;
    } else {
      const zIndexMap: Record<string, number> = {
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
      };
      position.zIndex = zIndexMap[value] ?? (parseInt(value, 10) || 0);
    }
  }

  /**
   * 임의 값을 파싱합니다.
   */
  private static parseArbitraryValue(value: string): number | string {
    // 단위가 있는 값 (예: 10px, 1rem, 50%)
    if (/^(\d+(?:\.\d+)?)(px|rem|em|%|vh|vw)$/.test(value)) {
      return value;
    }
    
    // 숫자만 있는 값
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return numericValue;
    }
    
    // 그 외는 문자열로 반환
    return value;
  }
} 
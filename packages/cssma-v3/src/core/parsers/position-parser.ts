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

    const { property, value, isArbitrary, baseClassName } = parsedClass;

    // Handle negative values (e.g., -top-4, -inset-4)
    const isNegative = baseClassName.startsWith('-');
    const cleanProperty = isNegative ? baseClassName.substring(1).split('-')[0] : property;
    const cleanValue = isNegative ? baseClassName.substring(1).split('-').slice(1).join('-') : value;

    if (['top', 'right', 'bottom', 'left'].includes(cleanProperty)) {
      this.handlePositionValue(cleanProperty, cleanValue, isArbitrary || false, styles.position, preset, isNegative);
    } else if (cleanProperty === 'static' || cleanProperty === 'fixed' || cleanProperty === 'absolute' || 
               cleanProperty === 'relative' || cleanProperty === 'sticky') {
      styles.position.position = cleanProperty;
      styles.position.type = cleanProperty;
    } else if (cleanProperty === 'inset') {
      this.handleInsetValue(cleanValue, isArbitrary || false, styles.position, preset, isNegative);
    } else if (cleanProperty === 'inset-x' || baseClassName.startsWith('inset-x-')) {
      this.handleInsetXValue(cleanValue, isArbitrary || false, styles.position, preset, isNegative);
    } else if (cleanProperty === 'inset-y' || baseClassName.startsWith('inset-y-')) {
      this.handleInsetYValue(cleanValue, isArbitrary || false, styles.position, preset, isNegative);
    } else if (cleanProperty === 'z') {
      this.handleZIndex(cleanValue, isArbitrary || false, styles.position);
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
    preset: DesignPreset,
    isNegative: boolean = false
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

    // Handle negative values
    if (isNegative && typeof positionValue === 'number') {
      positionValue = -positionValue;
    } else if (isNegative && typeof positionValue === 'string' && !isNaN(parseFloat(positionValue))) {
      // Handle string values like "16px" -> "-16px"
      positionValue = `-${positionValue}`;
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
    preset: DesignPreset,
    isNegative: boolean = false
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

    // Handle negative values
    if (isNegative && typeof insetValue === 'number') {
      insetValue = -insetValue;
    } else if (isNegative && typeof insetValue === 'string' && !isNaN(parseFloat(insetValue))) {
      insetValue = `-${insetValue}`;
    }

    // 모든 방향에 적용
    position.top = insetValue;
    position.right = insetValue;
    position.bottom = insetValue;
    position.left = insetValue;
  }

  /**
   * inset-x 값을 처리합니다 (좌우 방향)
   */
  private static handleInsetXValue(
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    preset: DesignPreset,
    isNegative: boolean = false
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
      insetValue = value;
    }

    // Handle negative values
    if (isNegative && typeof insetValue === 'number') {
      insetValue = -insetValue;
    } else if (isNegative && typeof insetValue === 'string' && !isNaN(parseFloat(insetValue))) {
      insetValue = `-${insetValue}`;
    }

    // 좌우 방향에만 적용
    position.left = insetValue;
    position.right = insetValue;
  }

  /**
   * inset-y 값을 처리합니다 (상하 방향)
   */
  private static handleInsetYValue(
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    preset: DesignPreset,
    isNegative: boolean = false
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
      insetValue = value;
    }

    // Handle negative values
    if (isNegative && typeof insetValue === 'number') {
      insetValue = -insetValue;
    } else if (isNegative && typeof insetValue === 'string' && !isNaN(parseFloat(insetValue))) {
      insetValue = `-${insetValue}`;
    }

    // 상하 방향에만 적용
    position.top = insetValue;
    position.bottom = insetValue;
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
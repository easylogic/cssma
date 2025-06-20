/**
 * Position Parser - 위치 관련 CSS 속성 파서
 * 
 * static, absolute, relative, top, left, z-index 등의
 * 위치 관련 속성을 처리합니다.
 */

import { ParsedClass, PositionStyles, DesignPreset } from '../../types';

export class PositionParser {
  /**
   * 표준 인터페이스: 클래스가 position 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // Position types
    const positionTypes = ['static', 'fixed', 'absolute', 'relative', 'sticky'];
    if (positionTypes.includes(className)) {
      return true;
    }

    // Position properties patterns
    const patterns = [
      /^(top|right|bottom|left)-/, // top-0, right-4, bottom-auto, left-1/2, left-[10px]
      /^-?(top|right|bottom|left)-/, // -top-4, -right-8 (negative values)
      /^inset(-[xy])?-/, // inset-0, inset-x-4, inset-y-8, inset-[10px]
      /^-?inset(-[xy])?-/, // -inset-4, -inset-x-8, -inset-y-[5px]
      /^z-/, // z-10, z-50, z-auto, z-[999]
      /^-?z-/, // -z-10 (negative z-index)
    ];

    return patterns.some(pattern => pattern.test(className));
  }

  /**
   * 표준 인터페이스: position 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    if (!this.isValidClass(className)) {
      return null;
    }

    // Position types (static, fixed, absolute, relative, sticky)
    const positionTypes = ['static', 'fixed', 'absolute', 'relative', 'sticky'];
    if (positionTypes.includes(className)) {
      return {
        property: className, // property를 클래스명 그대로 유지 (기존 로직 호환)
        value: '',
        isArbitrary: false
      };
    }

    // Z-index 패턴
    const zIndexMatch = className.match(/^(-?)z-(.+)$/);
    if (zIndexMatch) {
      const isNegative = zIndexMatch[1] === '-';
      let value = zIndexMatch[2];
      
      // 임의 값 [...]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arbitraryValue = value.slice(1, -1);
        return {
          property: 'z',
          value: isNegative ? `-${arbitraryValue}` : arbitraryValue,
          isArbitrary: true
        };
      }
      
      return {
        property: 'z',
        value: isNegative ? `-${value}` : value,
        isArbitrary: false
      };
    }

    // Inset 패턴 (inset, inset-x, inset-y)
    const insetMatch = className.match(/^(-?)inset(-[xy])?-(.+)$/);
    if (insetMatch) {
      const isNegative = insetMatch[1] === '-';
      const direction = insetMatch[2] || ''; // '', '-x', '-y'
      let value = insetMatch[3];
      
      // 임의 값 [...]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
        return {
          property: `inset${direction}`,
          value: isNegative ? `-${value}` : value,
          isArbitrary: true
        };
      }
      
      // 분수 값 처리 (1/2 → 50%)
      if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        if (!isNaN(numerator) && !isNaN(denominator)) {
          const percentage = `${(numerator / denominator) * 100}%`;
          return {
            property: `inset${direction}`,
            value: isNegative ? `-${percentage}` : percentage,
            isArbitrary: false
          };
        }
      }
      
      return {
        property: `inset${direction}`,
        value: isNegative ? `-${value}` : value,
        isArbitrary: false
      };
    }

    // Position directional 패턴 (top, right, bottom, left)
    const positionMatch = className.match(/^(-?)(top|right|bottom|left)-(.+)$/);
    if (positionMatch) {
      const isNegative = positionMatch[1] === '-';
      const direction = positionMatch[2];
      let value = positionMatch[3];
      
      // 임의 값 [...]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
        return {
          property: direction,
          value: isNegative ? `-${value}` : value,
          isArbitrary: true
        };
      }
      
      // 분수 값 처리 (1/2 → 50%)
      if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        if (!isNaN(numerator) && !isNaN(denominator)) {
          const percentage = `${(numerator / denominator) * 100}%`;
          return {
            property: direction,
            value: isNegative ? `-${percentage}` : percentage,
            isArbitrary: false
          };
        }
      }
      
      return {
        property: direction,
        value: isNegative ? `-${value}` : value,
        isArbitrary: false
      };
    }

    return null;
  }

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

    // Position types (static, fixed, absolute, relative, sticky)
    const positionTypes = ['static', 'fixed', 'absolute', 'relative', 'sticky'];
    if (positionTypes.includes(property)) {
      styles.position.position = property;
      styles.position.type = property;
      return;
    }

    // Directional positions (top, right, bottom, left)
    if (['top', 'right', 'bottom', 'left'].includes(property)) {
      this.handlePositionValue(property, value, isArbitrary || false, styles.position, preset);
      return;
    }

    // Z-index
    if (property === 'z') {
      this.handleZIndex(value, isArbitrary || false, styles.position);
      return;
    }

    // Inset patterns (inset, inset-x, inset-y)
    if (property === 'inset') {
      this.handleInsetValue(value, isArbitrary || false, styles.position, preset);
    } else if (property === 'inset-x') {
      this.handleInsetXValue(value, isArbitrary || false, styles.position, preset);
    } else if (property === 'inset-y') {
      this.handleInsetYValue(value, isArbitrary || false, styles.position, preset);
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

    // 음수 값 확인
    const isNegative = value.startsWith('-');
    const cleanValue = isNegative ? value.substring(1) : value;

    if (isArbitrary) {
      // 임의 값 처리
      positionValue = this.parseArbitraryValue(cleanValue);
    } else {
      // 프리셋 값 처리
      if (cleanValue === 'auto') {
        positionValue = 'auto';
      } else if (cleanValue === 'full') {
        positionValue = '100%';
      } else if (cleanValue.includes('%')) {
        // 이미 백분율로 변환된 값 (50% 등)
        positionValue = cleanValue;
      } else if (cleanValue in preset.spacing) {
        positionValue = preset.spacing[cleanValue];
      } else {
        positionValue = cleanValue;
      }
    }

    // 음수 처리
    if (isNegative && typeof positionValue === 'number') {
      positionValue = -positionValue;
    } else if (isNegative && typeof positionValue === 'string' && !isNaN(parseFloat(positionValue))) {
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
    preset: DesignPreset
  ): void {
    let insetValue: number | string;

    // 음수 값 확인
    const isNegative = value.startsWith('-');
    const cleanValue = isNegative ? value.substring(1) : value;

    if (isArbitrary) {
      insetValue = this.parseArbitraryValue(cleanValue);
    } else if (cleanValue === 'auto') {
      insetValue = 'auto';
    } else if (cleanValue === 'full') {
      insetValue = '100%';
    } else if (cleanValue.includes('%')) {
      // 이미 백분율로 변환된 값 (50% 등)
      insetValue = cleanValue;
    } else if (cleanValue in preset.spacing) {
      insetValue = preset.spacing[cleanValue];
    } else {
      insetValue = cleanValue;
    }

    // 음수 처리
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
    preset: DesignPreset
  ): void {
    let insetValue: number | string;

    // 음수 값 확인
    const isNegative = value.startsWith('-');
    const cleanValue = isNegative ? value.substring(1) : value;

    if (isArbitrary) {
      insetValue = this.parseArbitraryValue(cleanValue);
    } else if (cleanValue === 'auto') {
      insetValue = 'auto';
    } else if (cleanValue === 'full') {
      insetValue = '100%';
    } else if (cleanValue.includes('%')) {
      // 이미 백분율로 변환된 값 (50% 등)
      insetValue = cleanValue;
    } else if (cleanValue in preset.spacing) {
      insetValue = preset.spacing[cleanValue];
    } else {
      insetValue = cleanValue;
    }

    // 음수 처리
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
    preset: DesignPreset
  ): void {
    let insetValue: number | string;

    // 음수 값 확인
    const isNegative = value.startsWith('-');
    const cleanValue = isNegative ? value.substring(1) : value;

    if (isArbitrary) {
      insetValue = this.parseArbitraryValue(cleanValue);
    } else if (cleanValue === 'auto') {
      insetValue = 'auto';
    } else if (cleanValue === 'full') {
      insetValue = '100%';
    } else if (cleanValue.includes('%')) {
      // 이미 백분율로 변환된 값 (50% 등)
      insetValue = cleanValue;
    } else if (cleanValue in preset.spacing) {
      insetValue = preset.spacing[cleanValue];
    } else {
      insetValue = cleanValue;
    }

    // 음수 처리
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
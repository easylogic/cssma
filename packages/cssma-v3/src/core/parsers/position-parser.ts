/**
 * Position Parser - 위치 관련 CSS 속성 파서
 * 
 * static, absolute, relative, top, left, z-index 등의
 * 위치 관련 속성을 처리합니다.
 */

import { ParsedClass, PositionStyles, DesignPreset, ParsedStyles, ParserContext } from '../../types';

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
   * Context Pattern을 사용한 새로운 스타일 적용 메서드
   */
  static applyPositionStyle(
    parsedClass: ParsedClass, 
    styles: Partial<ParsedStyles>, 
    context: ParserContext
  ): void {
    if (!styles.position) {
      styles.position = {};
    }

    const { property, value, isArbitrary } = parsedClass;
    
    // Context에서 preset 추출
    const preset = context.preset;

    // Position types (static, fixed, absolute, relative, sticky)
    const positionTypes = ['static', 'fixed', 'absolute', 'relative', 'sticky'];
    if (positionTypes.includes(property)) {
      styles.position.position = property;
      styles.position.type = property;
      return;
    }

    // Directional positions (top, right, bottom, left)
    if (['top', 'right', 'bottom', 'left'].includes(property)) {
      this.handlePositionValue(property, value, isArbitrary || false, styles.position, context);
      return;
    }

    // Z-index
    if (property === 'z') {
      this.handleZIndex(value, isArbitrary || false, styles.position, context);
      return;
    }

    // Inset patterns (inset, inset-x, inset-y)
    if (property === 'inset') {
      this.handleInsetValue(value, isArbitrary || false, styles.position, context);
    } else if (property === 'inset-x') {
      this.handleInsetXValue(value, isArbitrary || false, styles.position, context);
    } else if (property === 'inset-y') {
      this.handleInsetYValue(value, isArbitrary || false, styles.position, context);
    }
  }

  /**
   * Position 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns Position 관련 클래스 여부
   */
  static isPositionClass(className: string): boolean {
    return this.isValidClass(className);
  }

  /**
   * 위치 값을 처리합니다. (Context Pattern 버전)
   */
  private static handlePositionValue(
    property: string,
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    context: ParserContext
  ): void {
    const preset = context.preset;
    
    if (isArbitrary) {
      // 임의 값 처리
      const convertedValue = this.parseArbitraryValue(value);
      (position as any)[property] = convertedValue;
      return;
    }

    // 특수 값 처리
    if (value === 'auto') {
      (position as any)[property] = 'auto';
      return;
    }

    if (value === 'full') {
      (position as any)[property] = '100%';
      return;
    }

    // 음수 값 처리
    const isNegative = value.startsWith('-');
    const positiveValue = isNegative ? value.slice(1) : value;

    // 분수 값 처리 (이미 parseValue에서 처리되었을 수 있음)
    if (positiveValue.includes('/')) {
      const [numerator, denominator] = positiveValue.split('/').map(Number);
      if (!isNaN(numerator) && !isNaN(denominator)) {
        const percentage = `${(numerator / denominator) * 100}%`;
        (position as any)[property] = isNegative ? `-${percentage}` : percentage;
        return;
      }
    }

    // 퍼센트 값 처리 (이미 파싱된 경우)
    if (positiveValue.endsWith('%')) {
      (position as any)[property] = value; // 음수 포함하여 그대로 사용
      return;
    }

    // 숫자 값 처리 (spacing scale 적용)
    if (/^\d+(\.\d+)?$/.test(positiveValue)) {
      const numericValue = parseFloat(positiveValue);
      const pixelValue = numericValue * 4; // Tailwind spacing scale
      (position as any)[property] = isNegative ? -pixelValue : pixelValue;
      return;
    }

    // 기타 값들은 그대로 적용
    (position as any)[property] = value;
  }

  /**
   * inset 값을 처리합니다. (Context Pattern 버전)
   */
  private static handleInsetValue(
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    context: ParserContext
  ): void {
    // inset은 top, right, bottom, left 모두에 동일한 값 적용
    this.handlePositionValue('top', value, isArbitrary, position, context);
    this.handlePositionValue('right', value, isArbitrary, position, context);
    this.handlePositionValue('bottom', value, isArbitrary, position, context);
    this.handlePositionValue('left', value, isArbitrary, position, context);
  }

  /**
   * inset-x 값을 처리합니다. (Context Pattern 버전)
   */
  private static handleInsetXValue(
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    context: ParserContext
  ): void {
    // inset-x는 left, right에 동일한 값 적용
    this.handlePositionValue('left', value, isArbitrary, position, context);
    this.handlePositionValue('right', value, isArbitrary, position, context);
  }

  /**
   * inset-y 값을 처리합니다. (Context Pattern 버전)
   */
  private static handleInsetYValue(
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    context: ParserContext
  ): void {
    // inset-y는 top, bottom에 동일한 값 적용
    this.handlePositionValue('top', value, isArbitrary, position, context);
    this.handlePositionValue('bottom', value, isArbitrary, position, context);
  }

  /**
   * z-index 값을 처리합니다. (Context Pattern 버전)
   */
  private static handleZIndex(
    value: string,
    isArbitrary: boolean,
    position: PositionStyles,
    context?: ParserContext
  ): void {
    if (isArbitrary) {
      // 임의 값 처리
      const convertedValue = this.parseArbitraryValue(value);
      position.zIndex = convertedValue;
      return;
    }

    // auto 값 처리
    if (value === 'auto') {
      position.zIndex = 'auto';
      return;
    }

    // 음수 값 처리
    const isNegative = value.startsWith('-');
    const positiveValue = isNegative ? value.slice(1) : value;

    // 숫자 값 처리
    if (/^\d+$/.test(positiveValue)) {
      const numericValue = parseInt(positiveValue, 10);
      position.zIndex = isNegative ? -numericValue : numericValue;
      return;
    }

    // 기타 값들은 그대로 적용
    position.zIndex = value;
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
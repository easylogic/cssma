/**
 * Tables Parser
 * Tailwind CSS의 모든 Table 관련 유틸리티 클래스를 파싱합니다.
 */

import { ParsedStyle, ParsedClass, TablesStyles, DesignPreset, ParsedStyles, ParserContext } from '../../types';

const TABLE_CLASSES = {
  'border-collapse': 'collapse',
  'border-separate': 'separate',
  'border-spacing': 'spacing',
  'table-auto': 'auto',
  'table-fixed': 'fixed',
  'caption': 'caption'
};

const PREFIX_CLASSES = [
  'border-spacing-', 'caption-'
];

export class TablesParser {

  /**
   * 클래스명이 테이블 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns 테이블 관련 클래스 여부
   */
  static isValidClass(className: string): boolean {
    // border-collapse/separate
    if (['border-collapse', 'border-separate'].includes(className)) return true;
    
    // border-spacing
    if (className.startsWith('border-spacing-')) return true;
    
    // table-layout
    if (['table-auto', 'table-fixed'].includes(className)) return true;
    
    // caption-side
    if (className.startsWith('caption-')) return true;
    
    return false;
  }

  /**
   * 클래스명을 파싱하여 속성과 값을 추출합니다.
   * @param className 클래스명
   * @returns 파싱된 결과
   */
  static parseValue(className: string): { property: string; value: string; isArbitrary: boolean } | null {
    // border-collapse/separate
    if (className === 'border-collapse') {
      return { property: 'border-collapse', value: 'collapse', isArbitrary: false };
    }
    if (className === 'border-separate') {
      return { property: 'border-separate', value: 'separate', isArbitrary: false };
    }
    
    // border-spacing
    if (className.startsWith('border-spacing-')) {
      const value = className.slice('border-spacing-'.length);
      const isArbitrary = value.startsWith('[') && value.endsWith(']');
      return {
        property: 'border-spacing',
        value: isArbitrary ? value.slice(1, -1) : value,
        isArbitrary
      };
    }
    
    // table-layout
    if (className === 'table-auto') {
      return { property: 'table-layout', value: 'auto', isArbitrary: false };
    }
    if (className === 'table-fixed') {
      return { property: 'table-layout', value: 'fixed', isArbitrary: false };
    }
    
    // caption-side
    if (className.startsWith('caption-')) {
      const value = className.slice('caption-'.length);
      return {
        property: 'caption-side',
        value: value,
        isArbitrary: false
      };
    }
    
    return null;
  }

  /**
   * 테이블 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns 테이블 관련 클래스인지 여부
   */
  static isTableClass(className: string): boolean {
    if (className in TABLE_CLASSES || PREFIX_CLASSES.some(prefix => className.startsWith(prefix))) {
      return true;
    }

    return false;
  }

  /**
   * Context Pattern을 사용한 새로운 스타일 적용 메서드
   */
  static applyTablesStyle(
    parsedClass: ParsedClass, 
    styles: Partial<ParsedStyles>, 
    context: ParserContext
  ): void {
    if (!styles.tables) {
      styles.tables = {};
    }

    const { property, value, isArbitrary } = parsedClass;
    
    // Context에서 preset 추출
    const preset = context.preset;

    // 속성별 처리
    switch (property) {
      // Border collapse
      case 'border-collapse':
      case 'border-separate':
        this.handleBorderCollapse(property, value, styles.tables);
        break;
        
      // Border spacing
      case 'border-spacing':
        this.handleBorderSpacing(value, isArbitrary, styles.tables);
        break;
        
      // Table layout
      case 'table-layout':
        this.handleTableLayout(value, styles.tables);
        break;
        
      // Caption side
      case 'caption-side':
        this.handleCaptionSide(value, styles.tables);
        break;
        
      default:
        // Generic property 처리
        styles.tables[property] = isArbitrary ? value : this.convertTableValue(property, value);
        break;
    }
  }

  /**
   * Tables 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns Tables 관련 클래스 여부
   */
  static isTablesClass(className: string): boolean {
    return this.isValidClass(className);
  }

  /**
   * Border collapse 처리 헬퍼 메서드
   */
  private static handleBorderCollapse(property: string, value: string, tableStyles: any): void {
    if (property === 'border-collapse') {
      tableStyles.borderCollapse = 'collapse';
    } else if (property === 'border-separate') {
      tableStyles.borderCollapse = 'separate';
    } else {
      tableStyles.borderCollapse = value;
    }
  }

  /**
   * Border spacing 처리 헬퍼 메서드
   */
  private static handleBorderSpacing(value: string, isArbitrary: boolean, tableStyles: any): void {
    if (isArbitrary) {
      tableStyles.borderSpacing = value;
    } else {
      // 표준 spacing 값 매핑
      const spacingMap: Record<string, string> = {
        '0': '0px',
        'px': '1px',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem'
      };

      // x/y 축별 spacing 처리
      if (value.startsWith('x-')) {
        const spacingValue = value.slice(2);
        const mappedValue = spacingMap[spacingValue] || `${spacingValue}px`;
        tableStyles.borderSpacing = `${mappedValue} 0px`;
      } else if (value.startsWith('y-')) {
        const spacingValue = value.slice(2);
        const mappedValue = spacingMap[spacingValue] || `${spacingValue}px`;
        tableStyles.borderSpacing = `0px ${mappedValue}`;
      } else {
        const mappedValue = spacingMap[value] || `${value}px`;
        tableStyles.borderSpacing = mappedValue;
      }
    }
  }

  /**
   * Table layout 처리 헬퍼 메서드
   */
  private static handleTableLayout(value: string, tableStyles: any): void {
    if (value === 'auto' || value === 'fixed') {
      tableStyles.tableLayout = value;
    } else {
      tableStyles.tableLayout = value;
    }
  }

  /**
   * Caption side 처리 헬퍼 메서드
   */
  private static handleCaptionSide(value: string, tableStyles: any): void {
    if (value === 'top' || value === 'bottom') {
      tableStyles.captionSide = value;
    } else {
      tableStyles.captionSide = value;
    }
  }

  /**
   * Table 값 변환 헬퍼 메서드
   */
  private static convertTableValue(property: string, value: string): string {
    // 특정 property에 따른 값 변환 로직
    return value;
  }

  // Border Collapse
  static parseBorderCollapse(className: string): ParsedStyle | null {
    const borderCollapseMap: Record<string, string> = {
      'border-collapse': 'collapse',
      'border-separate': 'separate'
    };

    if (className in borderCollapseMap) {
      return {
        property: 'borderCollapse',
        value: borderCollapseMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Border Spacing
  static parseBorderSpacing(className: string): ParsedStyle | null {
    if (!className.startsWith('border-spacing-')) return null;

    const value = className.slice(15);
    
    const spacingMap: Record<string, string> = {
      '0': '0px',
      'px': '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '2.5': '0.625rem',
      '3': '0.75rem',
      '3.5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '44': '11rem',
      '48': '12rem',
      '52': '13rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '96': '24rem'
    };

    if (value in spacingMap) {
      return {
        property: 'borderSpacing',
        value: spacingMap[value],
        variant: 'preset'
      };
    }

    // Handle x/y spacing
    if (value.startsWith('x-')) {
      const spacingValue = value.slice(2);
      if (spacingValue in spacingMap) {
        return {
          property: 'borderSpacing',
          value: `${spacingMap[spacingValue]} 0px`,
          variant: 'preset'
        };
      }
    }

    if (value.startsWith('y-')) {
      const spacingValue = value.slice(2);
      if (spacingValue in spacingMap) {
        return {
          property: 'borderSpacing',
          value: `0px ${spacingMap[spacingValue]}`,
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Table Layout
  static parseTableLayout(className: string): ParsedStyle | null {
    const tableLayoutMap: Record<string, string> = {
      'table-auto': 'auto',
      'table-fixed': 'fixed'
    };

    if (className in tableLayoutMap) {
      return {
        property: 'tableLayout',
        value: tableLayoutMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Caption Side
  static parseCaptionSide(className: string): ParsedStyle | null {
    const captionSideMap: Record<string, string> = {
      'caption-top': 'top',
      'caption-bottom': 'bottom'
    };

    if (className in captionSideMap) {
      return {
        property: 'captionSide',
        value: captionSideMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * 메인 파싱 메서드 - 모든 table 관련 클래스를 파싱
   */
  static parse(className: string): ParsedStyle | null {
    // 각 파싱 메서드를 순서대로 시도
    return (
      this.parseBorderCollapse(className) ||
      this.parseBorderSpacing(className) ||
      this.parseTableLayout(className) ||
      this.parseCaptionSide(className)
    );
  }
} 
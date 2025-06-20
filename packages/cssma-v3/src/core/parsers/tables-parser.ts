/**
 * Tables Parser
 * Tailwind CSS의 모든 Table 관련 유틸리티 클래스를 파싱합니다.
 */

import { ParsedStyle, ParsedClass, TablesStyles, DesignPreset } from '../../types';

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
   * Tables 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋 (옵션)
   */
  static applyTablesStyle(
    parsedClass: ParsedClass, 
    styles: { tables?: TablesStyles }, 
    preset?: DesignPreset
  ): void {
    if (!styles.tables) {
      styles.tables = {};
    }
    
    // 개별 파서를 사용하여 속성 값 설정
    const result = this.parse(parsedClass.baseClassName);
    if (result) {
      switch (result.property) {
        case 'borderCollapse':
          styles.tables.borderCollapse = result.value;
          break;
        case 'borderSpacing':
          styles.tables.borderSpacing = result.value;
          break;
        case 'tableLayout':
          styles.tables.tableLayout = result.value;
          break;
        case 'captionSide':
          styles.tables.captionSide = result.value;
          break;
      }
    }
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
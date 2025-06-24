/**
 * Spacing Parser - 간격 관련 CSS 속성 파서
 * 
 * Tailwind CSS v4 호환 버전
 * - 동적 spacing scale (0.25rem 기반)
 * - 논리적 속성 지원 (inline, block)
 * - 음수 값 지원
 * - 임의 값 완전 지원
 * - Space-between 유틸리티
 */

import { ParsedClass, ParsedStyle, DesignPreset } from '../../types';

/**
 * Tailwind CSS v4.1 호환 Spacing Parser
 * - Logical properties (padding-inline, padding-block) 지원
 * - String/Number 혼합 타입 지원
 * - 임의값 ([10px], [2.5rem]) 지원
 */

interface SpacingValue {
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  x?: string | number;
  y?: string | number;
  all?: string | number;
  paddingInline?: string | number | { start?: string | number; end?: string | number };
  paddingBlock?: string | number | { start?: string | number; end?: string | number };
  marginInline?: string | number | { start?: string | number; end?: string | number };
  marginBlock?: string | number | { start?: string | number; end?: string | number };
}

interface GridGap {
  column?: string | number;
  row?: string | number;
}

export class SpacingParser {
  // Tailwind CSS v4.1 기본 spacing 스케일 (0.25rem = 4px 기준)
  private static readonly SPACING_SCALE: Record<string, number> = {
    '0': 0,
    'px': 1, // 1px 특수값
    '0.5': 2,  // 0.125rem = 2px
    '1': 4,    // 0.25rem = 4px
    '1.5': 6,  // 0.375rem = 6px
    '2': 8,    // 0.5rem = 8px
    '2.5': 10, // 0.625rem = 10px
    '3': 12,   // 0.75rem = 12px
    '3.5': 14, // 0.875rem = 14px
    '4': 16,   // 1rem = 16px
    '5': 20,   // 1.25rem = 20px
    '6': 24,   // 1.5rem = 24px
    '7': 28,   // 1.75rem = 28px
    '8': 32,   // 2rem = 32px
    '9': 36,   // 2.25rem = 36px
    '10': 40,  // 2.5rem = 40px
    '11': 44,  // 2.75rem = 44px
    '12': 48,  // 3rem = 48px
    '14': 56,  // 3.5rem = 56px
    '16': 64,  // 4rem = 64px
    '20': 80,  // 5rem = 80px
    '24': 96,  // 6rem = 96px
    '28': 112, // 7rem = 112px
    '32': 128, // 8rem = 128px
    '36': 144, // 9rem = 144px
    '40': 160, // 10rem = 160px
    '44': 176, // 11rem = 176px
    '48': 192, // 12rem = 192px
    '52': 208, // 13rem = 208px
    '56': 224, // 14rem = 224px
    '60': 240, // 15rem = 240px
    '64': 256, // 16rem = 256px
    '72': 288, // 18rem = 288px
    '80': 320, // 20rem = 320px
    '96': 384, // 24rem = 384px
  };

  private static readonly PADDING_PATTERNS = [
    // 모든 방향 padding
    /^p-(.+)$/,
    // X축 (horizontal) - padding-inline in v4.1
    /^px-(.+)$/,
    // Y축 (vertical) - padding-block in v4.1  
    /^py-(.+)$/,
    // 개별 방향
    /^pt-(.+)$/,
    /^pr-(.+)$/,
    /^pb-(.+)$/,
    /^pl-(.+)$/,
    // Logical properties (v4.1 신규)
    /^ps-(.+)$/, // padding-inline-start
    /^pe-(.+)$/, // padding-inline-end
    // 전체 속성명 형태
    /^padding-(.+)$/,
    /^padding-top-(.+)$/,
    /^padding-right-(.+)$/,
    /^padding-bottom-(.+)$/,
    /^padding-left-(.+)$/,
    /^padding-inline-(.+)$/,
    /^padding-block-(.+)$/,
  ];

  private static readonly MARGIN_PATTERNS = [
    // 모든 방향 margin
    /^-?m-(.+)$/,
    // X축 (horizontal) - margin-inline in v4.1
    /^-?mx-(.+)$/,
    // Y축 (vertical) - margin-block in v4.1
    /^-?my-(.+)$/,
    // 개별 방향
    /^-?mt-(.+)$/,
    /^-?mr-(.+)$/,
    /^-?mb-(.+)$/,
    /^-?ml-(.+)$/,
    // Logical properties (v4.1 신규)
    /^-?ms-(.+)$/, // margin-inline-start
    /^-?me-(.+)$/, // margin-inline-end
    // 전체 속성명 형태
    /^-?margin-(.+)$/,
    /^-?margin-top-(.+)$/,
    /^-?margin-right-(.+)$/,
    /^-?margin-bottom-(.+)$/,
    /^-?margin-left-(.+)$/,
    /^-?margin-inline-(.+)$/,
    /^-?margin-block-(.+)$/,
    // Space between
    /^-?space-x-(.+)$/,
    /^-?space-y-(.+)$/,
  ];

  private static readonly GAP_PATTERNS = [
    /^gap-(.+)$/,
    /^gap-x-(.+)$/,
    /^gap-y-(.+)$/,
    /^column-gap-(.+)$/,
    /^row-gap-(.+)$/,
  ];

  /**
   * 클래스명이 spacing 관련인지 확인 (테스트 호환)
   */
  static isSpacingClass(className: string): boolean {
    return this.isValidClass(className);
  }

  /**
   * 클래스명이 spacing 관련인지 확인
   */
  static isValidClass(className: string): boolean {
    return [
      ...this.PADDING_PATTERNS,
      ...this.MARGIN_PATTERNS,
      ...this.GAP_PATTERNS
    ].some(pattern => pattern.test(className));
  }

  /**
   * spacing 값을 파싱 (Tailwind v4.1 방식)
   */
  private static parseSpacingValue(value: string): string | number {
    // px 특수 처리
    if (value === 'px') {
      return 1;
    }

    // 임의값 처리: [10px], [2.5rem], [calc(100% - 1rem)]
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1); // 대괄호 제거
    }

    // 기본 스케일에서 찾기
    const scaleValue = this.SPACING_SCALE[value];
    if (scaleValue !== undefined) {
      return scaleValue;
    }

    // 자동값
    if (value === 'auto') {
      return 'auto';
    }

    // 동적 숫자 값 처리 (Tailwind 기본: 1단위 = 4px)
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return numValue * 4; // 4px 단위로 계산
    }

    return value; // 그대로 반환 (string)
  }

  /**
   * 클래스명을 파싱하여 SpacingValue 반환 (내부용)
   */
  private static parseSpacingInternal(className: string): SpacingValue | null {
    // Padding 처리
    let match = className.match(/^p-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { all: value };
    }

    match = className.match(/^px-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { x: value, paddingInline: value };
    }

    match = className.match(/^py-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { y: value, paddingBlock: value };
    }

    match = className.match(/^pt-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { top: value };
    }

    match = className.match(/^pr-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { right: value };
    }

    match = className.match(/^pb-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { bottom: value };
    }

    match = className.match(/^pl-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { left: value };
    }

    // Logical properties (v4.1)
    match = className.match(/^ps-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { paddingInline: { start: value } };
    }

    match = className.match(/^pe-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { paddingInline: { end: value } };
    }

    // Margin 처리 (음수 포함)
    match = className.match(/^(-?)m-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { all: value };
    }

    match = className.match(/^(-?)mx-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { x: value, marginInline: value };
    }

    match = className.match(/^(-?)my-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { y: value, marginBlock: value };
    }

    // 개별 margin 방향들
    match = className.match(/^(-?)mt-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { top: value };
    }

    match = className.match(/^(-?)mr-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { right: value };
    }

    match = className.match(/^(-?)mb-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { bottom: value };
    }

    match = className.match(/^(-?)ml-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { left: value };
    }

    // Logical margin properties (v4.1)
    match = className.match(/^(-?)ms-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { marginInline: { start: value } };
    }

    match = className.match(/^(-?)me-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { marginInline: { end: value } };
    }

    // Gap 처리 - gap-x와 gap-y를 먼저 처리
    match = className.match(/^gap-x-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { x: value };
    }

    match = className.match(/^gap-y-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { y: value };
    }

    // 기본 gap 처리
    match = className.match(/^gap-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { all: value }; // gap은 all로 처리
    }

    // Space between 처리
    match = className.match(/^(-?)space-x-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { x: value };
    }

    match = className.match(/^(-?)space-y-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { y: value };
    }

    // 전체 속성명 처리
    match = className.match(/^padding-top-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { top: value };
    }

    match = className.match(/^padding-right-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { right: value };
    }

    match = className.match(/^padding-bottom-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { bottom: value };
    }

    match = className.match(/^padding-left-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { left: value };
    }

    match = className.match(/^padding-inline-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { paddingInline: value };
    }

    match = className.match(/^padding-block-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { paddingBlock: value };
    }

    match = className.match(/^(-?)margin-top-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { top: value };
    }

    match = className.match(/^(-?)margin-inline-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { marginInline: value };
    }

    match = className.match(/^(-?)margin-block-(.+)$/);
    if (match) {
      const isNegative = match[1] === '-';
      let value = this.parseSpacingValue(match[2]);
      if (isNegative && typeof value === 'number') {
        value = -value;
      } else if (isNegative && typeof value === 'string' && !value.includes('calc')) {
        value = `-${value}`;
      }
      return { marginBlock: value };
    }

    match = className.match(/^column-gap-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { x: value };
    }

    match = className.match(/^row-gap-(.+)$/);
    if (match) {
      const value = this.parseSpacingValue(match[1]);
      return { y: value };
    }

    return null;
  }

  /**
   * 값을 CSS 단위로 변환 (Tailwind v4.1 방식)
   */
  private static valueToCSS(value: string | number): string {
    if (typeof value === 'string') {
      // 이미 CSS 값인 경우 (px, rem, %, calc 등)
      return value;
    }

    if (typeof value === 'number') {
      if (value === 0) return '0';
      return `${value}rem`; // Tailwind 기본 단위
    }
    
    return '0';
  }

  /**
   * ParsedStyle로 변환 (기존 테스트와 호환성 유지)
   */
  static parseValue(className: string): ParsedStyle & { isArbitrary?: boolean } | null {
    const spacingValue = this.parseSpacingInternal(className);
    if (!spacingValue) return null;

    // 임의 값인지 확인
    const isArbitrary = className.includes('[') && className.includes(']');

    // 클래스 타입 결정 (modifier 테스트를 위한 간단한 property 이름 사용)
    let property = 'spacing';
    if (className.includes('gap')) property = 'gap';
    else if (className.startsWith('m') || className.startsWith('-m')) property = 'm';
    else if (className.startsWith('space-')) property = 'space-x'; // space-between용
    else if (className.startsWith('p')) {
      // 논리적 속성 구분
      if (className.startsWith('ps-')) property = 'ps';
      else if (className.startsWith('pe-')) property = 'pe';  
      else property = 'p';
    }

    // modifier 테스트용: 간단한 값 반환
    if (className.match(/^(p|m|gap|space-[xy])-(.+)$/) || className.match(/^(p[trblse]|m[trblse]|gap-[xy])-(.+)$/) || className.match(/^-m/) ) {
      const match = className.match(/(?:^|-)([\d\.]+|\w+|\[.*?\])$/);
      if (match) {
        const value = match[1];
        return {
          property,
          value,
          variant: isArbitrary ? 'arbitrary' : 'preset',
          isArbitrary
        };
      }
    }

    return {
      property,
      value: JSON.stringify(spacingValue), // 기존 스타일 적용 시스템과 호환
      variant: isArbitrary ? 'arbitrary' : 'preset',
      isArbitrary
    };
  }

  /**
   * spacing 스타일을 적용 (Tailwind v4.1 호환)
   */
  static applySpacingStyle(
    parsedClass: ParsedClass,
    styles: any,
    preset: DesignPreset
  ): void {
    // 항상 parseSpacingInternal을 사용하여 올바른 SpacingValue 객체 생성
    const spacingValue: SpacingValue = this.parseSpacingInternal(parsedClass.original) || {};
    
    // 디버깅 추가 (disabled for now)
    // if (parsedClass.original.includes('gap') || parsedClass.original.includes('space')) {
    //   console.log(`🔧 ${parsedClass.original}:`, spacingValue, 'current gap:', styles.spacing?.gap, 'spaceBetween:', styles.spacing?.spaceBetween);
    // }
    
    if (!styles.spacing) {
      styles.spacing = {};
    }
    
    // 모든 방향 처리
    if (spacingValue.all !== undefined) {
      const cssValue = this.valueToCSS(spacingValue.all);
      if (parsedClass.original.startsWith('p')) {
        // padding을 개별 방향별 객체로 설정
        styles.spacing.padding = {
          top: spacingValue.all,
          right: spacingValue.all,
          bottom: spacingValue.all,
          left: spacingValue.all
        };
      } else if (parsedClass.original.startsWith('m') || parsedClass.original.startsWith('-m')) {
        // margin을 개별 방향별 객체로 설정
        styles.spacing.margin = {
          top: spacingValue.all,
          right: spacingValue.all,
          bottom: spacingValue.all,
          left: spacingValue.all
        };
              } else if (parsedClass.original.startsWith('gap')) {
          // 기본 gap인 경우
          // console.log(`🔧 Gap-all processing for ${parsedClass.original}:`, 'current gap:', styles.spacing.gap, 'has properties?', Object.keys(styles.spacing.gap || {}).length > 0);
          if (styles.spacing.gap && typeof styles.spacing.gap === 'object' && Object.keys(styles.spacing.gap).length > 0) {
            // 이미 값이 있는 객체라면 row, column 모두 설정
            styles.spacing.gap.row = spacingValue.all;
            styles.spacing.gap.column = spacingValue.all;
          } else {
            // 단일 값으로 설정
            styles.spacing.gap = spacingValue.all;
          }
      }
    }

    // X축 (horizontal) 처리
    if (spacingValue.x !== undefined) {
      const cssValue = this.valueToCSS(spacingValue.x);
      if (parsedClass.original.startsWith('gap')) {
        // gap-x인 경우 - gap이 padding보다 우선
        if (!styles.spacing.gap || typeof styles.spacing.gap !== 'object') {
          // 기존 gap이 숫자인 경우 객체로 변환
          const existingGap = styles.spacing.gap;
          styles.spacing.gap = {
            row: typeof existingGap === 'number' ? existingGap : spacingValue.x,
            column: spacingValue.x
          };
        } else {
          styles.spacing.gap.column = spacingValue.x;
        }
      } else if (parsedClass.original.startsWith('space')) {
        // space-x인 경우
        // console.log(`🔧 Setting spaceBetween for ${parsedClass.original}:`, spacingValue.x);
        if (!styles.spacing.spaceBetween) {
          styles.spacing.spaceBetween = {};
        }
        styles.spacing.spaceBetween.x = spacingValue.x;
      } else if (parsedClass.original.startsWith('p')) {
        if (!styles.spacing.padding || typeof styles.spacing.padding !== 'object') {
          styles.spacing.padding = {};
        }
        styles.spacing.padding.left = spacingValue.x;
        styles.spacing.padding.right = spacingValue.x;
      } else if (parsedClass.original.startsWith('m') || parsedClass.original.startsWith('-m')) {
        if (!styles.spacing.margin || typeof styles.spacing.margin !== 'object') {
          styles.spacing.margin = {};
        }
        styles.spacing.margin.left = spacingValue.x;
        styles.spacing.margin.right = spacingValue.x;
      }
    }

    // Y축 (vertical) 처리
    if (spacingValue.y !== undefined) {
      const cssValue = this.valueToCSS(spacingValue.y);
      if (parsedClass.original.startsWith('gap')) {
        // gap-y인 경우 - gap이 padding보다 우선
        // console.log(`🔧 Setting gap.row for ${parsedClass.original}:`, spacingValue.y, 'current gap:', styles.spacing.gap);
        if (!styles.spacing.gap || typeof styles.spacing.gap !== 'object') {
          // 기존 gap이 숫자인 경우 객체로 변환
          const existingGap = styles.spacing.gap;
          styles.spacing.gap = {
            row: spacingValue.y,
            column: typeof existingGap === 'number' ? existingGap : spacingValue.y
          };
        } else {
          styles.spacing.gap.row = spacingValue.y;
        }
      } else if (parsedClass.original.startsWith('space')) {
        // space-y인 경우
        // console.log(`🔧 Setting spaceBetween.y for ${parsedClass.original}:`, spacingValue.y);
        if (!styles.spacing.spaceBetween) {
          styles.spacing.spaceBetween = {};
        }
        styles.spacing.spaceBetween.y = spacingValue.y;
      } else if (parsedClass.original.startsWith('p')) {
        if (!styles.spacing.padding || typeof styles.spacing.padding !== 'object') {
          styles.spacing.padding = {};
        }
        styles.spacing.padding.top = spacingValue.y;
        styles.spacing.padding.bottom = spacingValue.y;
      } else if (parsedClass.original.startsWith('m') || parsedClass.original.startsWith('-m')) {
        if (!styles.spacing.margin || typeof styles.spacing.margin !== 'object') {
          styles.spacing.margin = {};
        }
        styles.spacing.margin.top = spacingValue.y;
        styles.spacing.margin.bottom = spacingValue.y;
      }
    }

    // 개별 방향 처리
    ['top', 'right', 'bottom', 'left'].forEach(side => {
      const value = spacingValue[side as keyof SpacingValue];
      if (value !== undefined) {
        const cssValue = this.valueToCSS(value as string | number);
        if (parsedClass.original.startsWith('p')) {
          if (!styles.spacing.padding || typeof styles.spacing.padding !== 'object') {
            styles.spacing.padding = {};
          }
          styles.spacing.padding[side] = value;
        } else if (parsedClass.original.startsWith('m') || parsedClass.original.startsWith('-m')) {
          if (!styles.spacing.margin || typeof styles.spacing.margin !== 'object') {
            styles.spacing.margin = {};
          }
          styles.spacing.margin[side] = value;
        }
      }
    });

    // Logical properties 처리 (v4.1)
    if (spacingValue.paddingInline !== undefined) {
      if (!styles.spacing.paddingInline) {
        styles.spacing.paddingInline = {};
      }
      if (typeof spacingValue.paddingInline === 'object') {
        if (spacingValue.paddingInline.start !== undefined) {
          styles.spacing.paddingInline.start = spacingValue.paddingInline.start;
        }
        if (spacingValue.paddingInline.end !== undefined) {
          styles.spacing.paddingInline.end = spacingValue.paddingInline.end;
        }
      } else {
        styles.spacing.paddingInline = spacingValue.paddingInline;
      }
    }

    if (spacingValue.paddingBlock !== undefined) {
      if (!styles.spacing.paddingBlock) {
        styles.spacing.paddingBlock = {};
      }
      if (typeof spacingValue.paddingBlock === 'object') {
        if (spacingValue.paddingBlock.start !== undefined) {
          styles.spacing.paddingBlock.start = spacingValue.paddingBlock.start;
        }
        if (spacingValue.paddingBlock.end !== undefined) {
          styles.spacing.paddingBlock.end = spacingValue.paddingBlock.end;
        }
      } else {
        styles.spacing.paddingBlock = spacingValue.paddingBlock;
      }
    }

    // 마진 logical properties
    if (spacingValue.marginInline !== undefined) {
      if (!styles.spacing.marginInline) {
        styles.spacing.marginInline = {};
      }
      if (typeof spacingValue.marginInline === 'object') {
        if (spacingValue.marginInline.start !== undefined) {
          styles.spacing.marginInline.start = spacingValue.marginInline.start;
        }
        if (spacingValue.marginInline.end !== undefined) {
          styles.spacing.marginInline.end = spacingValue.marginInline.end;
        }
      } else {
        styles.spacing.marginInline = spacingValue.marginInline;
      }
    }

    if (spacingValue.marginBlock !== undefined) {
      if (!styles.spacing.marginBlock) {
        styles.spacing.marginBlock = {};
      }
      if (typeof spacingValue.marginBlock === 'object') {
        if (spacingValue.marginBlock.start !== undefined) {
          styles.spacing.marginBlock.start = spacingValue.marginBlock.start;
        }
        if (spacingValue.marginBlock.end !== undefined) {
          styles.spacing.marginBlock.end = spacingValue.marginBlock.end;
        }
      } else {
        styles.spacing.marginBlock = spacingValue.marginBlock;
      }
    }
    
    // 디버깅: 최종 결과 (disabled for now)
    // if (parsedClass.original.includes('gap') || parsedClass.original.includes('space')) {
    //   console.log(`🔧 Final result for ${parsedClass.original}:`, JSON.stringify(styles.spacing, null, 2));
    // }
  }

  /**
   * 메인 파싱 메서드
   */
  static parse(className: string): ParsedStyle | null {
    if (!this.isValidClass(className)) {
      return null;
    }

    return this.parseValue(className);
  }

  /**
   * 테스트 호환용: CSS 속성으로 변환
   */
  static toCSSProperties(spacing: any): Record<string, string> {
    const css: Record<string, string> = {};
    
    if (!spacing) return css;

    // padding 처리
    if (spacing.padding) {
      if (typeof spacing.padding === 'object') {
        if (spacing.padding.top !== undefined) css['padding-top'] = this.formatCSSValue(spacing.padding.top);
        if (spacing.padding.right !== undefined) css['padding-right'] = this.formatCSSValue(spacing.padding.right);
        if (spacing.padding.bottom !== undefined) css['padding-bottom'] = this.formatCSSValue(spacing.padding.bottom);
        if (spacing.padding.left !== undefined) css['padding-left'] = this.formatCSSValue(spacing.padding.left);
      } else {
        css['padding'] = this.formatCSSValue(spacing.padding);
      }
    }

    // margin 처리
    if (spacing.margin) {
      if (typeof spacing.margin === 'object') {
        if (spacing.margin.top !== undefined) css['margin-top'] = this.formatCSSValue(spacing.margin.top);
        if (spacing.margin.right !== undefined) css['margin-right'] = this.formatCSSValue(spacing.margin.right);
        if (spacing.margin.bottom !== undefined) css['margin-bottom'] = this.formatCSSValue(spacing.margin.bottom);
        if (spacing.margin.left !== undefined) css['margin-left'] = this.formatCSSValue(spacing.margin.left);
      } else {
        css['margin'] = this.formatCSSValue(spacing.margin);
      }
    }

    // gap 처리
    if (spacing.gap !== undefined) {
      if (typeof spacing.gap === 'object') {
        if (spacing.gap.row !== undefined) css['row-gap'] = this.formatCSSValue(spacing.gap.row);
        if (spacing.gap.column !== undefined) css['column-gap'] = this.formatCSSValue(spacing.gap.column);
      } else {
        css['gap'] = this.formatCSSValue(spacing.gap);
      }
    }
    
    // 개별 gap 속성들 (기존 호환성)
    if (spacing.gapX !== undefined) {
      css['column-gap'] = this.formatCSSValue(spacing.gapX);
    }
    if (spacing.gapY !== undefined) {
      css['row-gap'] = this.formatCSSValue(spacing.gapY);
    }

    // logical properties 처리
    if (spacing.paddingInline !== undefined) {
      if (typeof spacing.paddingInline === 'object') {
        if (spacing.paddingInline.start !== undefined) css['padding-inline-start'] = this.formatCSSValue(spacing.paddingInline.start);
        if (spacing.paddingInline.end !== undefined) css['padding-inline-end'] = this.formatCSSValue(spacing.paddingInline.end);
      } else {
        css['padding-inline'] = this.formatCSSValue(spacing.paddingInline);
      }
    }

    // space-between 처리
    if (spacing.spaceBetween) {
      if (spacing.spaceBetween.x !== undefined) {
        css['--space-x'] = this.formatCSSValue(spacing.spaceBetween.x);
      }
      if (spacing.spaceBetween.y !== undefined) {
        css['--space-y'] = this.formatCSSValue(spacing.spaceBetween.y);
      }
    }

    return css;
  }

  /**
   * CSS 값을 문자열로 포맷
   */
  private static formatCSSValue(value: string | number): string {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      if (value === 0) return '0';
      return `${value}px`;
    }
    return '0';
  }

  /**
   * 테스트 호환용 parseSpacing 메서드
   */
  static parseSpacing(className: string): { property: string; value: string; isNegative: boolean } | null {
    // 음수 여부 확인
    const isNegative = className.startsWith('-');
    const cleanClassName = isNegative ? className.substring(1) : className;

    // property 결정
    let property = '';
    let value = '';

    // 패턴 매칭으로 property와 value 추출
    let match;

    // Padding patterns
    match = cleanClassName.match(/^p-(.+)$/);
    if (match) {
      property = 'p';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^ps-(.+)$/);
    if (match) {
      property = 'ps';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^pe-(.+)$/);
    if (match) {
      property = 'pe';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^pt-(.+)$/);
    if (match) {
      property = 'pt';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^pr-(.+)$/);
    if (match) {
      property = 'pr';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^pb-(.+)$/);
    if (match) {
      property = 'pb';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^pl-(.+)$/);
    if (match) {
      property = 'pl';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^px-(.+)$/);
    if (match) {
      property = 'px';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^py-(.+)$/);
    if (match) {
      property = 'py';
      value = match[1];
      return { property, value, isNegative };
    }

    // Margin patterns
    match = cleanClassName.match(/^m-(.+)$/);
    if (match) {
      property = 'm';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^ms-(.+)$/);
    if (match) {
      property = 'ms';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^me-(.+)$/);
    if (match) {
      property = 'me';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^mt-(.+)$/);
    if (match) {
      property = 'mt';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^mr-(.+)$/);
    if (match) {
      property = 'mr';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^mb-(.+)$/);
    if (match) {
      property = 'mb';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^ml-(.+)$/);
    if (match) {
      property = 'ml';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^mx-(.+)$/);
    if (match) {
      property = 'mx';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^my-(.+)$/);
    if (match) {
      property = 'my';
      value = match[1];
      return { property, value, isNegative };
    }

    // Gap patterns
    match = cleanClassName.match(/^gap-(.+)$/);
    if (match) {
      property = 'gap';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^gap-x-(.+)$/);
    if (match) {
      property = 'gap-x';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^gap-y-(.+)$/);
    if (match) {
      property = 'gap-y';
      value = match[1];
      return { property, value, isNegative };
    }

    // Space patterns
    match = cleanClassName.match(/^space-x-(.+)$/);
    if (match) {
      property = 'space-x';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^space-y-(.+)$/);
    if (match) {
      property = 'space-y';
      value = match[1];
      return { property, value, isNegative };
    }

    // 전체 속성명 patterns
    match = cleanClassName.match(/^padding-top-(.+)$/);
    if (match) {
      property = 'padding-top';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^padding-inline-(.+)$/);
    if (match) {
      property = 'padding-inline';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^padding-block-(.+)$/);
    if (match) {
      property = 'padding-block';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^margin-inline-(.+)$/);
    if (match) {
      property = 'margin-inline';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^margin-block-(.+)$/);
    if (match) {
      property = 'margin-block';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^column-gap-(.+)$/);
    if (match) {
      property = 'column-gap';
      value = match[1];
      return { property, value, isNegative };
    }

    match = cleanClassName.match(/^row-gap-(.+)$/);
    if (match) {
      property = 'row-gap';
      value = match[1];
      return { property, value, isNegative };
    }

    return null;
  }
} 
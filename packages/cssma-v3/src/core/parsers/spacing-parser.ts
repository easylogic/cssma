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

import { ParsedClass, SpacingStyles, DesignPreset } from '../../types';

export interface EnhancedSpacingStyles extends SpacingStyles {
  // 논리적 속성 지원
  paddingInline?: number | { start?: number; end?: number };
  paddingBlock?: number | { start?: number; end?: number };
  marginInline?: number | { start?: number; end?: number };
  marginBlock?: number | { start?: number; end?: number };
  
  // Space-between 지원
  spaceBetween?: {
    x?: number;
    y?: number;
    reverse?: boolean;
  };
}

export class SpacingParser {
  // Tailwind v4 default spacing scale (0.25rem base)
  private static readonly SPACING_SCALE = {
    '0': 0,
    'px': 1,
    '0.5': 2,
    '1': 4,
    '1.5': 6,
    '2': 8,
    '2.5': 10,
    '3': 12,
    '3.5': 14,
    '4': 16,
    '5': 20,
    '6': 24,
    '7': 28,
    '8': 32,
    '9': 36,
    '10': 40,
    '11': 44,
    '12': 48,
    '14': 56,
    '16': 64,
    '20': 80,
    '24': 96,
    '28': 112,
    '32': 128,
    '36': 144,
    '40': 160,
    '44': 176,
    '48': 192,
    '52': 208,
    '56': 224,
    '60': 240,
    '64': 256,
    '72': 288,
    '80': 320,
    '96': 384
  };

  // 기본 인식 가능한 속성들
  private static readonly EXACT_PROPERTIES = [
    // Padding
    'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
    'ps', 'pe', // 논리적 속성
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'padding-inline', 'padding-inline-start', 'padding-inline-end',
    'padding-block', 'padding-block-start', 'padding-block-end',
    
    // Margin  
    'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
    'ms', 'me', // 논리적 속성
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'margin-inline', 'margin-inline-start', 'margin-inline-end',
    'margin-block', 'margin-block-start', 'margin-block-end',
    
    // Gap
    'gap', 'gap-x', 'gap-y', 'column-gap', 'row-gap',
    
    // Space between
    'space-x', 'space-y', 'space-x-reverse', 'space-y-reverse'
  ];

  /**
   * 클래스가 spacing 관련인지 확인합니다.
   */
  static isSpacingClass(className: string): boolean {
    // 정확한 매치 우선
    if (this.EXACT_PROPERTIES.includes(className)) {
      return true;
    }

    // 접두사 매치 (음수 값, 소수점 값, 임의 값 포함)
    const prefixPatterns = [
      /^-?(p|pt|pr|pb|pl|px|py|ps|pe)(-[\w\.\[\]\/\-]+)?$/, // padding
      /^-?(m|mt|mr|mb|ml|mx|my|ms|me)(-[\w\.\[\]\/\-]+)?$/, // margin
      /^(gap|gap-x|gap-y)(-[\w\.\[\]\/\-]+)?$/, // gap (음수 불가)
      /^(space-x|space-y)(-[\w\.\[\]\/\-]+)?$/, // space-between (음수 불가)
      /^(padding|margin)(-top|-right|-bottom|-left|-inline|-block|-inline-start|-inline-end|-block-start|-block-end)?(-[\w\.\[\]\/\-]+)?$/, // 전체 속성명
      /^(column-gap|row-gap)(-[\w\.\[\]\/\-]+)?$/ // gap 전체 속성명
    ];

    return prefixPatterns.some(pattern => pattern.test(className));
  }

  /**
   * spacing 클래스를 파싱합니다.
   */
  static parseSpacing(className: string): {
    property: string;
    value: string;
    isNegative: boolean;
    unit?: string;
  } | null {
    if (!this.isSpacingClass(className)) {
      return null;
    }

    // 음수 값 처리
    let isNegative = false;
    let workingClassName = className;
    
    if (className.startsWith('-') && !className.startsWith('--')) {
      isNegative = true;
      workingClassName = className.slice(1);
    }

    // 정확한 매치 (값 없는 속성들)
    if (this.EXACT_PROPERTIES.includes(workingClassName)) {
      return {
        property: workingClassName,
        value: '',
        isNegative
      };
    }

    // 값이 있는 속성들 파싱
    const patterns = [
      // 단축 속성 - 임의 값, 소수점, 일반 값 모두 포함
      { regex: /^(p|pt|pr|pb|pl|px|py|ps|pe)-([\w\.\[\]\/\-]+)$/, type: 'padding' },
      { regex: /^(m|mt|mr|mb|ml|mx|my|ms|me)-([\w\.\[\]\/\-]+)$/, type: 'margin' },
      { regex: /^(gap-x|gap-y)-([\w\.\[\]\/\-]+)$/, type: 'gap-directional' }, // gap-x, gap-y 먼저 처리
      { regex: /^(gap)-([\w\.\[\]\/\-]+)$/, type: 'gap' }, // 단순 gap은 나중에 처리
      { regex: /^(space-x|space-y)-([\w\.\[\]\/\-]+)$/, type: 'space' },
      
      // 전체 속성명
      { regex: /^(padding|margin)(-top|-right|-bottom|-left|-inline|-block|-inline-start|-inline-end|-block-start|-block-end)?-([\w\.\[\]\/\-]+)$/, type: 'full' },
      { regex: /^(column-gap|row-gap)-([\w\.\[\]\/\-]+)$/, type: 'gap-full' }
    ];

    for (const pattern of patterns) {
      const match = workingClassName.match(pattern.regex);
      if (match) {
        const property = pattern.type === 'full' || pattern.type === 'gap-full' 
          ? match[1] + (match[2] || '')
          : pattern.type === 'gap-directional'
          ? match[1] // gap-x, gap-y 그대로 유지
          : match[1];
        const value = pattern.type === 'full' ? match[3] : match[2];
        
        return {
          property,
          value,
          isNegative
        };
      }
    }

    return null;
  }

  /**
   * 간격 스타일을 적용합니다.
   */
  static applySpacingStyle(
    parsedClass: ParsedClass, 
    styles: { spacing?: EnhancedSpacingStyles }, 
    preset: DesignPreset
  ): void {
    const { property, value, isArbitrary } = parsedClass;
    
    if (!styles.spacing) {
      styles.spacing = {};
    }
    
    // 메인 파서에서 이미 처리된 값들을 사용 (대괄호 제거된 상태)
    const parsed = this.parseSpacing(parsedClass.baseClassName);
    if (!parsed) return;

    // 값 계산 - 메인 파서에서 처리된 value 사용
    const spacingValue = this.calculateSpacingValue(value, isArbitrary, parsed.isNegative, preset);
    
    // 속성에 따라 스타일 적용
    this.applySpacingProperty(parsed.property, spacingValue, styles.spacing);
  }

  /**
   * 간격 값을 계산합니다.
   */
  private static calculateSpacingValue(
    value: string, 
    isArbitrary: boolean, 
    isNegative: boolean,
    preset: DesignPreset
  ): number | string {
    let result: number | string;

    if (isArbitrary) {
      // 임의 값 처리 - 단위 유지
      result = this.parseArbitraryValue(value);
    } else if (value === '') {
      // 값이 없는 경우 기본값
      result = 0;
    } else {
      // 프리셋 값 또는 동적 spacing scale
      result = this.getSpacingFromScale(value, preset);
    }

    // 음수 적용
    if (isNegative && typeof result === 'number') {
      result = -result;
    } else if (isNegative && typeof result === 'string') {
      // CSS 문자열 값에 음수 적용
      if (!result.startsWith('-')) {
        result = `-${result}`;
      }
    }

    return result;
  }

  /**
   * Spacing scale에서 값을 가져옵니다.
   */
  private static getSpacingFromScale(value: string, preset: DesignPreset): number {
    // 1. 기본 스케일에서 찾기
    if (this.SPACING_SCALE[value] !== undefined) {
      return this.SPACING_SCALE[value];
    }

    // 2. 프리셋에서 찾기
    if (preset.spacing && preset.spacing[value] !== undefined) {
      return preset.spacing[value];
    }

    // 3. 동적 값 처리 (Tailwind v4의 동적 spacing)
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      // 0.25rem 기반으로 계산 (4px)
      return numValue * 4;
    }

    // 4. 기본값
    return 0;
  }

  /**
   * 임의 값을 파싱합니다.
   */
  private static parseArbitraryValue(value: string): string {
    // CSS 값 그대로 반환 (단위 포함)
    if (value.includes('px') || value.includes('rem') || value.includes('em') || 
        value.includes('%') || value.includes('vh') || value.includes('vw') ||
        value.includes('ch') || value.includes('ex')) {
      return value;
    }

    // 단위 없는 숫자는 px로 가정
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return `${numValue}px`;
    }

    // CSS 변수나 기타 값들
    return value;
  }

  /**
   * 간격 속성을 적용합니다.
   */
  private static applySpacingProperty(
    property: string, 
    value: number | string, 
    spacing: EnhancedSpacingStyles
  ): void {
    switch (property) {
      // Padding - 기본 속성
      case 'p':
      case 'padding':
        spacing.padding = {
          top: value,
          right: value,
          bottom: value,
          left: value,
        };
        break;
      case 'pt':
      case 'padding-top':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.top = value;
        break;
      case 'pr':
      case 'padding-right':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.right = value;
        break;
      case 'pb':
      case 'padding-bottom':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.bottom = value;
        break;
      case 'pl':
      case 'padding-left':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.left = value;
        break;
      case 'px':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.left = value;
        spacing.padding.right = value;
        break;
      case 'py':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.top = value;
        spacing.padding.bottom = value;
        break;

      // Padding - 논리적 속성
      case 'ps':
      case 'padding-inline-start':
        if (!spacing.paddingInline) spacing.paddingInline = {};
        if (typeof spacing.paddingInline === 'number') {
          spacing.paddingInline = { end: spacing.paddingInline, start: value };
        } else {
          spacing.paddingInline.start = value;
        }
        break;
      case 'pe':
      case 'padding-inline-end':
        if (!spacing.paddingInline) spacing.paddingInline = {};
        if (typeof spacing.paddingInline === 'number') {
          spacing.paddingInline = { start: spacing.paddingInline, end: value };
        } else {
          spacing.paddingInline.end = value;
        }
        break;
      case 'padding-inline':
        spacing.paddingInline = value;
        break;
      case 'padding-block':
        spacing.paddingBlock = value;
        break;
      case 'padding-block-start':
        if (!spacing.paddingBlock) spacing.paddingBlock = {};
        if (typeof spacing.paddingBlock === 'number') {
          spacing.paddingBlock = { end: spacing.paddingBlock, start: value };
        } else {
          spacing.paddingBlock.start = value;
        }
        break;
      case 'padding-block-end':
        if (!spacing.paddingBlock) spacing.paddingBlock = {};
        if (typeof spacing.paddingBlock === 'number') {
          spacing.paddingBlock = { start: spacing.paddingBlock, end: value };
        } else {
          spacing.paddingBlock.end = value;
        }
        break;

      // Margin - 기본 속성
      case 'm':
      case 'margin':
        spacing.margin = {
          top: value,
          right: value,
          bottom: value,
          left: value,
        };
        break;
      case 'mt':
      case 'margin-top':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.top = value;
        break;
      case 'mr':
      case 'margin-right':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.right = value;
        break;
      case 'mb':
      case 'margin-bottom':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.bottom = value;
        break;
      case 'ml':
      case 'margin-left':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.left = value;
        break;
      case 'mx':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.left = value;
        spacing.margin.right = value;
        break;
      case 'my':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.top = value;
        spacing.margin.bottom = value;
        break;

      // Margin - 논리적 속성
      case 'ms':
      case 'margin-inline-start':
        if (!spacing.marginInline) spacing.marginInline = {};
        if (typeof spacing.marginInline === 'number') {
          spacing.marginInline = { end: spacing.marginInline, start: value };
        } else {
          spacing.marginInline.start = value;
        }
        break;
      case 'me':
      case 'margin-inline-end':
        if (!spacing.marginInline) spacing.marginInline = {};
        if (typeof spacing.marginInline === 'number') {
          spacing.marginInline = { start: spacing.marginInline, end: value };
        } else {
          spacing.marginInline.end = value;
        }
        break;
      case 'margin-inline':
        spacing.marginInline = value;
        break;
      case 'margin-block':
        spacing.marginBlock = value;
        break;
      case 'margin-block-start':
        if (!spacing.marginBlock) spacing.marginBlock = {};
        if (typeof spacing.marginBlock === 'number') {
          spacing.marginBlock = { end: spacing.marginBlock, start: value };
        } else {
          spacing.marginBlock.start = value;
        }
        break;
      case 'margin-block-end':
        if (!spacing.marginBlock) spacing.marginBlock = {};
        if (typeof spacing.marginBlock === 'number') {
          spacing.marginBlock = { start: spacing.marginBlock, end: value };
        } else {
          spacing.marginBlock.end = value;
        }
        break;

      // Gap
      case 'gap':
        spacing.gap = value;
        break;
      case 'gap-x':
      case 'column-gap':
        if (!spacing.gap) spacing.gap = {};
        if (typeof spacing.gap === 'number') {
          spacing.gap = { row: spacing.gap, column: value };
        } else {
          spacing.gap.column = value;
        }
        break;
      case 'gap-y':
      case 'row-gap':
        if (!spacing.gap) spacing.gap = {};
        if (typeof spacing.gap === 'number') {
          spacing.gap = { row: value, column: spacing.gap };
        } else {
          spacing.gap.row = value;
        }
        break;

      // Space between
      case 'space-x':
        if (!spacing.spaceBetween) spacing.spaceBetween = {};
        spacing.spaceBetween.x = value;
        break;
      case 'space-y':
        if (!spacing.spaceBetween) spacing.spaceBetween = {};
        spacing.spaceBetween.y = value;
        break;
      case 'space-x-reverse':
        if (!spacing.spaceBetween) spacing.spaceBetween = {};
        spacing.spaceBetween.reverse = true;
        break;
      case 'space-y-reverse':
        if (!spacing.spaceBetween) spacing.spaceBetween = {};
        spacing.spaceBetween.reverse = true;
        break;
    }
  }

  /**
   * CSS 속성으로 변환합니다.
   */
  static toCSSProperties(spacing: EnhancedSpacingStyles): Record<string, string> {
    const css: Record<string, string> = {};

    // Padding
    if (spacing.padding) {
      if (typeof spacing.padding === 'object') {
        if (spacing.padding.top !== undefined) css['padding-top'] = this.formatValue(spacing.padding.top);
        if (spacing.padding.right !== undefined) css['padding-right'] = this.formatValue(spacing.padding.right);
        if (spacing.padding.bottom !== undefined) css['padding-bottom'] = this.formatValue(spacing.padding.bottom);
        if (spacing.padding.left !== undefined) css['padding-left'] = this.formatValue(spacing.padding.left);
      } else {
        css['padding'] = this.formatValue(spacing.padding);
      }
    }

    // Padding 논리적 속성
    if (spacing.paddingInline) {
      if (typeof spacing.paddingInline === 'object') {
        if (spacing.paddingInline.start !== undefined) css['padding-inline-start'] = this.formatValue(spacing.paddingInline.start);
        if (spacing.paddingInline.end !== undefined) css['padding-inline-end'] = this.formatValue(spacing.paddingInline.end);
      } else {
        css['padding-inline'] = this.formatValue(spacing.paddingInline);
      }
    }

    if (spacing.paddingBlock) {
      if (typeof spacing.paddingBlock === 'object') {
        if (spacing.paddingBlock.start !== undefined) css['padding-block-start'] = this.formatValue(spacing.paddingBlock.start);
        if (spacing.paddingBlock.end !== undefined) css['padding-block-end'] = this.formatValue(spacing.paddingBlock.end);
      } else {
        css['padding-block'] = this.formatValue(spacing.paddingBlock);
      }
    }

    // Margin
    if (spacing.margin) {
      if (typeof spacing.margin === 'object') {
        if (spacing.margin.top !== undefined) css['margin-top'] = this.formatValue(spacing.margin.top);
        if (spacing.margin.right !== undefined) css['margin-right'] = this.formatValue(spacing.margin.right);
        if (spacing.margin.bottom !== undefined) css['margin-bottom'] = this.formatValue(spacing.margin.bottom);
        if (spacing.margin.left !== undefined) css['margin-left'] = this.formatValue(spacing.margin.left);
      } else {
        css['margin'] = this.formatValue(spacing.margin);
      }
    }

    // Margin 논리적 속성
    if (spacing.marginInline) {
      if (typeof spacing.marginInline === 'object') {
        if (spacing.marginInline.start !== undefined) css['margin-inline-start'] = this.formatValue(spacing.marginInline.start);
        if (spacing.marginInline.end !== undefined) css['margin-inline-end'] = this.formatValue(spacing.marginInline.end);
      } else {
        css['margin-inline'] = this.formatValue(spacing.marginInline);
      }
    }

    if (spacing.marginBlock) {
      if (typeof spacing.marginBlock === 'object') {
        if (spacing.marginBlock.start !== undefined) css['margin-block-start'] = this.formatValue(spacing.marginBlock.start);
        if (spacing.marginBlock.end !== undefined) css['margin-block-end'] = this.formatValue(spacing.marginBlock.end);
      } else {
        css['margin-block'] = this.formatValue(spacing.marginBlock);
      }
    }

    // Gap
    if (spacing.gap) {
      if (typeof spacing.gap === 'object') {
        if (spacing.gap.row !== undefined) css['row-gap'] = this.formatValue(spacing.gap.row);
        if (spacing.gap.column !== undefined) css['column-gap'] = this.formatValue(spacing.gap.column);
      } else {
        css['gap'] = this.formatValue(spacing.gap);
      }
    }

    // Space between (CSS 변수나 선택자 기반 구현 필요)
    if (spacing.spaceBetween) {
      if (spacing.spaceBetween.x !== undefined) {
        css['--space-x'] = this.formatValue(spacing.spaceBetween.x);
      }
      if (spacing.spaceBetween.y !== undefined) {
        css['--space-y'] = this.formatValue(spacing.spaceBetween.y);
      }
    }

    return css;
  }

  /**
   * 값을 CSS 형식으로 포맷팅합니다.
   */
  private static formatValue(value: number | string): string {
    if (typeof value === 'string') {
      return value;
    }
    return value === 0 ? '0' : `${value}px`;
  }
} 
import type { ParsedClass, ParsedStyles, ParserContext, SpacingStyles } from '../../types';
import type { DesignPreset, Config } from '../../config';

interface ParseResult {
  category: string;
  property: string;
  value: string;
  modifiers?: {
    negative?: boolean;
  };
  isArbitrary?: boolean;
}

export class SpacingParser {
  // ===== 클래스 인식 =====
  
  static isValidClass(className: string): boolean {
    // 음수 클래스 처리
    const cleanClassName = className.startsWith('-') ? className.slice(1) : className;
    
    // 패딩 클래스
    if (/^p([trblxy]?|[se]|adding-(top|right|bottom|left|inline|block)(-start|-end)?)-/.test(cleanClassName)) {
      return true;
    }
    
    // 마진 클래스
    if (/^m([trblxy]?|[se]|argin-(top|right|bottom|left|inline|block)(-start|-end)?)-/.test(cleanClassName)) {
      return true;
    }
    
    // Gap 클래스
    if (/^(gap|column-gap|row-gap)(-[xy])?-/.test(cleanClassName)) {
      return true;
    }
    
    // Space-between 클래스
    if (/^space-[xy](-reverse)?(-|$)/.test(cleanClassName)) {
      return true;
    }
    
    return false;
  }

  // ===== 값 파싱 =====
  
  static parseValue(className: string): ParseResult | null {
    if (!this.isValidClass(className)) return null;

    const isNegative = className.startsWith('-');
    const cleanClassName = isNegative ? className.slice(1) : className;

    // 마진 패턴
    let match = cleanClassName.match(/^m([trblxy]?|[se]|argin-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)-(.+)$/);
    if (match) {
      const [, direction, value] = match;
      return {
        category: 'spacing',
        property: direction === '' ? 'm' : `m${direction}`,
        value,
        modifiers: { negative: isNegative },
        isArbitrary: value.startsWith('[') && value.endsWith(']')
      };
    }

    // 패딩 패턴
    match = cleanClassName.match(/^p([trblxy]?|[se]|adding-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)-(.+)$/);
    if (match) {
      const [, direction, value] = match;
      return {
        category: 'spacing',
        property: direction === '' ? 'p' : `p${direction}`,
        value,
        modifiers: { negative: isNegative },
        isArbitrary: value.startsWith('[') && value.endsWith(']')
      };
    }

    // Gap 패턴
    match = cleanClassName.match(/^(gap|column-gap|row-gap)(-[xy])?-(.+)$/);
    if (match) {
      const [, base, direction, value] = match;
      const property = direction ? `${base}${direction}` : base;
      return {
        category: 'spacing',
        property,
        value,
        isArbitrary: value.startsWith('[') && value.endsWith(']')
      };
    }

    // Space-between 패턴
    match = cleanClassName.match(/^space-([xy])(-reverse)?(?:-(.+))?$/);
    if (match) {
      const [, direction, reverse, value] = match;
      const property = reverse ? `space-${direction}-reverse` : `space-${direction}`;
      return {
        category: 'spacing',
        property,
        value: value || 'reverse',
        isArbitrary: value && value.startsWith('[') && value.endsWith(']')
      };
    }

    return null;
  }

  // ===== 스타일 적용 (Context Pattern) =====
  
  static applySpacingStyle(
    parsedClass: ParsedClass,
    styles: Partial<ParsedStyles>,
    context: ParserContext
  ): void {
    if (!parsedClass.property) return;

    const baseClassName = parsedClass.baseClassName || parsedClass.className;
    const spacingResult = this.parseSpacing(baseClassName);
    if (!spacingResult) return;

    if (!styles.spacing) {
      styles.spacing = {};
    }

    const { property, value, isNegative } = spacingResult;
    
    // Context의 UnitUtils 사용하여 값 변환
    const cssValue = this.valueToNumber(value);
    
    // 음수 처리 - 문자열과 숫자를 구분하여 처리
    let finalValue: number | string;
    if (typeof cssValue === 'string') {
      // 문자열인 경우 음수 부호를 문자열로 처리
      finalValue = isNegative ? `-${cssValue}` : cssValue;
    } else {
      // 숫자인 경우 산술 연산으로 처리
      finalValue = isNegative ? -cssValue : cssValue;
    }
    
    this.applySpacingProperty(property, finalValue, styles.spacing);
  }

  // ===== Legacy 호환성 메서드 =====
  
  static isSpacingClass(className: string): boolean {
    return this.isValidClass(className);
  }

  static parseSpacing(className: string): { property: string; value: string; isNegative: boolean } | null {
    const result = this.parseValue(className);
    if (!result) return null;

    return {
      property: result.property,
      value: result.value,
      isNegative: result.modifiers?.negative || false
    };
  }

  // ===== 값 변환 헬퍼 =====
  
  private static valueToNumber(value: string): number | string {
    // 임의 값 처리
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      // 단위가 포함된 경우 그대로 반환 (문자열)
      if (/px|rem|em|%|vh|vw|ch|ex/i.test(arbitraryValue)) {
        return arbitraryValue;
      }
      // 숫자만 있는 경우 숫자로 변환
      const numMatch = arbitraryValue.match(/^-?[\d.]+$/);
      if (numMatch) {
        return parseFloat(numMatch[0]);
      }
      // 기타 임의값은 문자열로 반환
      return arbitraryValue;
    }

    // 기본 값 처리
    if (value === '0') return 0;
    if (value === 'px') return 1;
    if (value === 'auto') return 0;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;

    // Tailwind 기본 단위: 1 = 4px (0.25rem)
    return numValue * 4;
  }

  // ===== 스타일 속성 적용 =====
  
  private static applySpacingProperty(property: string, value: number | string, spacing: SpacingStyles): void {
    switch (property) {
      case 'p':
        spacing.padding = { top: value, right: value, bottom: value, left: value };
        break;
      case 'pt':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.top = value;
        break;
      case 'pr':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.right = value;
        break;
      case 'pb':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.bottom = value;
        break;
      case 'pl':
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
      case 'ps':
        if (!spacing.paddingInline) spacing.paddingInline = {};
        spacing.paddingInline.start = value;
        break;
      case 'pe':
        if (!spacing.paddingInline) spacing.paddingInline = {};
        spacing.paddingInline.end = value;
        break;
      case 'padding-top':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.top = value;
        break;
      case 'padding-inline-start':
        if (!spacing.paddingInline) spacing.paddingInline = {};
        spacing.paddingInline.start = value;
        break;
      case 'padding-inline-end':
        if (!spacing.paddingInline) spacing.paddingInline = {};
        spacing.paddingInline.end = value;
        break;
      case 'padding-block':
        if (!spacing.padding) spacing.padding = {};
        spacing.padding.top = value;
        spacing.padding.bottom = value;
        break;

      case 'm':
        spacing.margin = { top: value, right: value, bottom: value, left: value };
        break;
      case 'mt':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.top = value;
        break;
      case 'mr':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.right = value;
        break;
      case 'mb':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.bottom = value;
        break;
      case 'ml':
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
      case 'ms':
        if (!spacing.marginInline) spacing.marginInline = {};
        spacing.marginInline.start = value;
        break;
      case 'me':
        if (!spacing.marginInline) spacing.marginInline = {};
        spacing.marginInline.end = value;
        break;
      case 'margin-inline':
        if (!spacing.marginInline) spacing.marginInline = {};
        spacing.marginInline.start = value;
        spacing.marginInline.end = value;
        break;
      case 'margin-block':
        if (!spacing.margin) spacing.margin = {};
        spacing.margin.top = value;
        spacing.margin.bottom = value;
        break;

      case 'gap':
        spacing.gap = value;
        break;
      case 'gap-x':
        if (typeof spacing.gap === 'object') {
          spacing.gap.column = value;
        } else {
          spacing.gap = { row: spacing.gap || 0, column: value };
        }
        break;
      case 'gap-y':
        if (typeof spacing.gap === 'object') {
          spacing.gap.row = value;
        } else {
          spacing.gap = { row: value, column: spacing.gap || 0 };
        }
        break;
      case 'column-gap':
        if (typeof spacing.gap === 'object') {
          spacing.gap.column = value;
        } else {
          spacing.gap = { row: 0, column: value };
        }
        break;
      case 'row-gap':
        if (typeof spacing.gap === 'object') {
          spacing.gap.row = value;
        } else {
          spacing.gap = { row: value, column: 0 };
        }
        break;

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
        spacing.spaceBetween.xReverse = true;
        break;
      case 'space-y-reverse':
        if (!spacing.spaceBetween) spacing.spaceBetween = {};
        spacing.spaceBetween.yReverse = true;
        break;
    }
  }

  // ===== CSS 속성 변환 =====
  
  static toCSSProperties(spacing: SpacingStyles): Record<string, string> {
    const css: Record<string, string> = {};

    // Padding 처리
    if (spacing.padding) {
      if (typeof spacing.padding === 'object') {
        if (spacing.padding.top !== undefined) css['padding-top'] = this.formatCSSValue(spacing.padding.top);
        if (spacing.padding.right !== undefined) css['padding-right'] = this.formatCSSValue(spacing.padding.right);
        if (spacing.padding.bottom !== undefined) css['padding-bottom'] = this.formatCSSValue(spacing.padding.bottom);
        if (spacing.padding.left !== undefined) css['padding-left'] = this.formatCSSValue(spacing.padding.left);
      }
    }

    // Margin 처리
    if (spacing.margin) {
      if (typeof spacing.margin === 'object') {
        if (spacing.margin.top !== undefined) css['margin-top'] = this.formatCSSValue(spacing.margin.top);
        if (spacing.margin.right !== undefined) css['margin-right'] = this.formatCSSValue(spacing.margin.right);
        if (spacing.margin.bottom !== undefined) css['margin-bottom'] = this.formatCSSValue(spacing.margin.bottom);
        if (spacing.margin.left !== undefined) css['margin-left'] = this.formatCSSValue(spacing.margin.left);
      }
    }

    // PaddingInline 처리
    if (spacing.paddingInline) {
      if (spacing.paddingInline.start !== undefined) {
        css['padding-inline-start'] = this.formatCSSValue(spacing.paddingInline.start);
      }
      if (spacing.paddingInline.end !== undefined) {
        css['padding-inline-end'] = this.formatCSSValue(spacing.paddingInline.end);
      }
    }

    // Gap 처리
    if (spacing.gap) {
      if (typeof spacing.gap === 'object') {
        if (spacing.gap.row !== undefined) css['row-gap'] = this.formatCSSValue(spacing.gap.row);
        if (spacing.gap.column !== undefined) css['column-gap'] = this.formatCSSValue(spacing.gap.column);
      } else {
        css['gap'] = this.formatCSSValue(spacing.gap);
      }
    }

    // Space-between 처리
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

  // ===== CSS 값 포맷팅 =====
  
  private static formatCSSValue(value: number | string): string {
    if (typeof value === 'string') {
      return value;
    }
    if (value === 0) {
      return '0';
    }
    return `${value}px`;
  }
} 
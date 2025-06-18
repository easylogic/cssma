/**
 * Typography Parser - 타이포그래피 관련 CSS 속성 파서
 * 
 * Tailwind CSS v4 호환 버전
 * - 완전한 폰트 시스템 지원
 * - 임의 값 완전 지원
 * - 현대적 타이포그래피 기능
 * - 텍스트 관련 모든 유틸리티
 */

import { ParsedClass, TypographyStyles, DesignPreset } from '../../types';

export interface EnhancedTypographyStyles extends TypographyStyles {
  // 확장된 폰트 속성
  fontVariantNumeric?: string; // font-variant-numeric
  fontOpticalSizing?: 'auto' | 'none';
  
  // 텍스트 장식 확장
  textDecorationThickness?: string;
  textUnderlineOffset?: string;
  
  // 텍스트 간격 및 크기
  textIndent?: string;
  
  // 현대적 타이포그래피
  fontStretch?: string;
  fontSynthesis?: string;
  textSizeAdjust?: string;
  
  // 하이픈 및 단어 분리
  hyphens?: 'none' | 'manual' | 'auto';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  overflowWrap?: 'normal' | 'break-word' | 'anywhere';
  
  // 텍스트 렌더링
  textRendering?: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision';
}

export class TypographyParser {
  // Tailwind v4 폰트 크기 스케일
  private static readonly FONT_SIZE_SCALE: Record<string, { size: number; lineHeight?: number }> = {
    'xs': { size: 12, lineHeight: 16 },
    'sm': { size: 14, lineHeight: 20 },
    'base': { size: 16, lineHeight: 24 },
    'lg': { size: 18, lineHeight: 28 },
    'xl': { size: 20, lineHeight: 28 },
    '2xl': { size: 24, lineHeight: 32 },
    '3xl': { size: 30, lineHeight: 36 },
    '4xl': { size: 36, lineHeight: 40 },
    '5xl': { size: 48, lineHeight: 48 },
    '6xl': { size: 60, lineHeight: 60 },
    '7xl': { size: 72, lineHeight: 72 },
    '8xl': { size: 96, lineHeight: 96 },
    '9xl': { size: 128, lineHeight: 128 }
  };

  // 폰트 두께 매핑
  private static readonly FONT_WEIGHT_SCALE: Record<string, number> = {
    'thin': 100,
    'extralight': 200,
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
    'black': 900
  };

  // 자간(Letter Spacing) 스케일
  private static readonly LETTER_SPACING_SCALE: Record<string, string> = {
    'tighter': '-0.05em',
    'tight': '-0.025em',
    'normal': '0em',
    'wide': '0.025em',
    'wider': '0.05em',
    'widest': '0.1em'
  };

  // 행간(Line Height) 스케일
  private static readonly LINE_HEIGHT_SCALE: Record<string, number> = {
    'none': 1,
    'tight': 1.25,
    'snug': 1.375,
    'normal': 1.5,
    'relaxed': 1.625,
    'loose': 2,
    // 숫자 스케일
    '3': 0.75,
    '4': 1,
    '5': 1.25,
    '6': 1.5,
    '7': 1.75,
    '8': 2,
    '9': 2.25,
    '10': 2.5
  };

  // 정확한 매치가 필요한 속성들
  private static readonly EXACT_PROPERTIES = [
    // 텍스트 변형
    'uppercase', 'lowercase', 'capitalize', 'normal-case',
    // 텍스트 장식
    'underline', 'overline', 'line-through', 'no-underline',
    // 수직 정렬
    'align-baseline', 'align-top', 'align-middle', 'align-bottom', 'align-text-top', 'align-text-bottom',
    'align-sub', 'align-super',
    // 화이트스페이스
    'whitespace-normal', 'whitespace-nowrap', 'whitespace-pre', 'whitespace-pre-line', 
    'whitespace-pre-wrap', 'whitespace-break-spaces',
    // 단어 분리
    'break-normal', 'break-words', 'break-all', 'break-keep',
    // 하이픈
    'hyphens-none', 'hyphens-manual', 'hyphens-auto',
    // 폰트 스타일
    'italic', 'not-italic',
    // 폰트 변형
    'normal-nums', 'ordinal', 'slashed-zero', 'lining-nums', 'oldstyle-nums',
    'proportional-nums', 'tabular-nums', 'diagonal-fractions', 'stacked-fractions',
    // 텍스트 오버플로우
    'truncate', 'text-ellipsis', 'text-clip',
    // 안티앨리어싱
    'antialiased', 'subpixel-antialiased'
  ];

  /**
   * 클래스가 타이포그래피 관련인지 확인합니다.
   */
  static isTypographyClass(className: string): boolean {
    // 정확한 매치 우선
    if (this.EXACT_PROPERTIES.includes(className)) {
      return true;
    }

    // 접두사 매치 (임의 값, 소수점 값 포함)
    const prefixPatterns = [
      /^text-(xs|sm|base|lg|xl|\d*xl)$/, // 폰트 크기 (명시적)
      /^text-\[.*?\]$/, // 폰트 크기 임의 값
      /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\d+)$/, // 폰트 두께
      /^font-\[.*?\]$/, // 폰트 두께/패밀리 임의 값
      /^font-(sans|serif|mono)$/, // 폰트 패밀리
      /^tracking-(tighter|tight|normal|wide|wider|widest)$/, // 자간
      /^tracking-\[.*?\]$/, // 자간 임의 값
      /^leading-(none|tight|snug|normal|relaxed|loose|\d+)$/, // 행간
      /^leading-\[.*?\]$/, // 행간 임의 값
      /^decoration-(solid|double|dotted|dashed|wavy)$/, // 텍스트 장식 스타일
      /^decoration-\[.*?\]$/, // 텍스트 장식 스타일 임의 값
      /^decoration-(auto|from-font|\d+)$/, // 텍스트 장식 두께
      /^underline-offset-(auto|\d+)$/, // 밑줄 오프셋
      /^underline-offset-\[.*?\]$/, // 밑줄 오프셋 임의 값
      /^indent-\d+$/, // 텍스트 들여쓰기
      /^indent-\[.*?\]$/, // 텍스트 들여쓰기 임의 값
      /^text-(left|center|right|justify|start|end)$/, // 텍스트 정렬
      /^align-(baseline|top|middle|bottom|text-top|text-bottom|sub|super)$/, // 수직 정렬
    ];

    return prefixPatterns.some(pattern => pattern.test(className));
  }

  /**
   * 타이포그래피 클래스를 파싱합니다.
   */
  static parseTypography(className: string): { property: string; value: string; isArbitrary?: boolean } | null {
    // 정확한 매치 우선
    if (this.EXACT_PROPERTIES.includes(className)) {
      return {
        property: className,
        value: '',
        isArbitrary: false
      };
    }

    // 값이 있는 속성들 파싱
    const patterns = [
      // 폰트 크기 (text-lg, text-[20px])
      { regex: /^text-(xs|sm|base|lg|xl|\d*xl)$/, property: 'font-size', extractValue: true },
      { regex: /^text-\[(.*?)\]$/, property: 'font-size', extractValue: true, isArbitrary: true },
      
      // 폰트 두께 (font-bold, font-[500])
      { regex: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\d+)$/, property: 'font-weight', extractValue: true },
      
      // 폰트 패밀리 (font-sans, font-[Arial])
      { regex: /^font-(sans|serif|mono)$/, property: 'font-family', extractValue: true },
      
      // 자간 (tracking-wide, tracking-[0.1em])
      { regex: /^tracking-(tighter|tight|normal|wide|wider|widest)$/, property: 'letter-spacing', extractValue: true },
      { regex: /^tracking-\[(.*?)\]$/, property: 'letter-spacing', extractValue: true, isArbitrary: true },
      
      // 행간 (leading-normal, leading-[1.5])
      { regex: /^leading-(none|tight|snug|normal|relaxed|loose|\d+)$/, property: 'line-height', extractValue: true },
      { regex: /^leading-\[(.*?)\]$/, property: 'line-height', extractValue: true, isArbitrary: true },
      
      // 텍스트 장식 스타일 (decoration-solid, decoration-[wavy])
      { regex: /^decoration-(solid|double|dotted|dashed|wavy)$/, property: 'text-decoration-style', extractValue: true },
      { regex: /^decoration-\[(.*?)\]$/, property: 'text-decoration-style', extractValue: true },
      
      // 텍스트 장식 두께 (decoration-2, decoration-[3px])
      { regex: /^decoration-(auto|from-font|\d+)$/, property: 'text-decoration-thickness', extractValue: true },
      
      // 밑줄 오프셋 (underline-offset-4, underline-offset-[2px])
      { regex: /^underline-offset-(auto|\d+)$/, property: 'text-underline-offset', extractValue: true },
      { regex: /^underline-offset-\[(.*?)\]$/, property: 'text-underline-offset', extractValue: true },
      
      // 텍스트 들여쓰기 (indent-4, indent-[2rem])
      { regex: /^indent-(\d+)$/, property: 'text-indent', extractValue: true },
      { regex: /^indent-\[(.*?)\]$/, property: 'text-indent', extractValue: true },
      
      // 텍스트 정렬 (text-center, text-left)
      { regex: /^text-(left|center|right|justify|start|end)$/, property: 'text-align', extractValue: true },
      
      // 텍스트 변형 (uppercase, lowercase, capitalize)
      { regex: /^(uppercase|lowercase|capitalize|normal-case)$/, property: 'text-transform', extractValue: false },
      
      // 텍스트 장식 (underline, line-through, no-underline)
      { regex: /^(underline|overline|line-through|no-underline)$/, property: 'text-decoration-line', extractValue: false },
      
      // 텍스트 장식 스타일 (decoration-solid, decoration-dashed)
      { regex: /^decoration-(solid|dashed|dotted|double|wavy)$/, property: 'text-decoration-style', extractValue: true },
      
      // 텍스트 장식 두께 (decoration-1, decoration-[3px])
      { regex: /^decoration-(auto|from-font|0|1|2|4|8)$/, property: 'text-decoration-thickness', extractValue: true },
      { regex: /^decoration-\[(.*?)\]$/, property: 'text-decoration-thickness', extractValue: true, isArbitrary: true },
      
      // 밑줄 오프셋 (underline-offset-auto, underline-offset-[3px])
      { regex: /^underline-offset-(auto|0|1|2|4|8)$/, property: 'text-underline-offset', extractValue: true },
      { regex: /^underline-offset-\[(.*?)\]$/, property: 'text-underline-offset', extractValue: true, isArbitrary: true },
      
      // 텍스트 들여쓰기 (indent-4, indent-[2rem])
      { regex: /^indent-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/, property: 'text-indent', extractValue: true },
      { regex: /^indent-\[(.*?)\]$/, property: 'text-indent', extractValue: true, isArbitrary: true },
      
      // 폰트 스타일 (italic, not-italic)
      { regex: /^(italic|not-italic)$/, property: 'font-style', extractValue: false }
    ];

    for (const pattern of patterns) {
      const match = className.match(pattern.regex);
      if (match) {
        let value = '';
        
        if (pattern.extractValue && match[1]) {
          value = match[1];
        } else if (!pattern.extractValue) {
          // 값이 없는 경우 클래스명 자체를 값으로 사용
          value = className;
        }
        
        return {
          property: pattern.property,
          value,
          isArbitrary: pattern.isArbitrary || false
        };
      }
    }

    // 스마트한 font-[...] 임의 값 처리
    const fontArbitraryMatch = className.match(/^font-\[(.*?)\]$/);
    if (fontArbitraryMatch) {
      const value = fontArbitraryMatch[1];
      
      // 값의 내용을 분석해서 font-weight vs font-family 결정
      if (this.isFontWeightValue(value)) {
        return {
          property: 'font-weight',
          value,
          isArbitrary: true
        };
      } else {
        return {
          property: 'font-family',
          value,
          isArbitrary: true
        };
      }
    }

    return null;
  }

  /**
   * 값이 폰트 두께인지 판단합니다.
   */
  private static isFontWeightValue(value: string): boolean {
    // 숫자 값 (100, 200, 300, ..., 900, 500)
    if (/^\d{1,3}$/.test(value)) {
      const num = parseInt(value);
      return num >= 100 && num <= 900 && num % 100 === 0;
    }
    
    // 폰트 두께 키워드
    const weightKeywords = [
      'thin', 'extralight', 'light', 'normal', 'medium', 
      'semibold', 'bold', 'extrabold', 'black', 'lighter', 'bolder'
    ];
    
    return weightKeywords.includes(value.toLowerCase());
  }

  /**
   * 타이포그래피 스타일을 적용합니다.
   */
  static applyTypographyStyle(
    parsedClass: ParsedClass, 
    styles: { typography?: EnhancedTypographyStyles }, 
    preset: DesignPreset
  ): void {
    const { property, value, isArbitrary } = parsedClass;
    
    if (!styles.typography) {
      styles.typography = {};
    }
    
    const parsed = this.parseTypography(parsedClass.baseClassName);
    if (!parsed) return;

    // 속성별 처리
    switch (parsed.property) {
      case 'font-size':
        this.applyFontSize(value, isArbitrary, styles.typography, preset);
        break;
        
      case 'font-weight':
        this.applyFontWeight(value, isArbitrary, styles.typography);
        break;
        
      case 'font-family':
        this.applyFontFamily(value, isArbitrary, styles.typography, preset);
        break;
        
      case 'letter-spacing':
        this.applyLetterSpacing(value, isArbitrary, styles.typography);
        break;
        
      case 'line-height':
        this.applyLineHeight(value, isArbitrary, styles.typography);
        break;
        
      case 'text-align':
        // 텍스트 정렬 처리 추가
        if (isArbitrary) {
          styles.typography.textAlign = this.parseArbitraryValue(value) as any;
        } else {
          const validAligns = ['left', 'center', 'right', 'justify', 'start', 'end'];
          if (validAligns.includes(value)) {
            styles.typography.textAlign = value as any;
          }
        }
        break;
        
      case 'text-decoration-style':
        this.applyTextDecorationStyle(value, isArbitrary, styles.typography);
        break;
        
      case 'text-decoration-thickness':
        this.applyTextDecorationThickness(value, isArbitrary, styles.typography);
        break;
        
      case 'text-underline-offset':
        this.applyTextUnderlineOffset(value, isArbitrary, styles.typography);
        break;
        
      case 'text-indent':
        this.applyTextIndent(value, isArbitrary, styles.typography);
        break;
        
      // 값이 없는 속성들
      default:
        this.applyExactProperty(parsed.property, styles.typography);
        break;
    }
  }

  /**
   * 폰트 크기를 적용합니다.
   */
  private static applyFontSize(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles, preset: DesignPreset): void {
    if (isArbitrary) {
      typography.fontSize = this.parseArbitraryValue(value);
    } else if (this.FONT_SIZE_SCALE[value]) {
      const scale = this.FONT_SIZE_SCALE[value];
      typography.fontSize = scale.size;
      if (scale.lineHeight) {
        typography.lineHeight = scale.lineHeight / scale.size;
      }
    } else if (preset.typography?.fontSize?.[value]) {
      typography.fontSize = preset.typography.fontSize[value];
    }
  }

  /**
   * 폰트 두께를 적용합니다.
   */
  private static applyFontWeight(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      const parsed = this.parseArbitraryValue(value);
      typography.fontWeight = typeof parsed === 'string' ? parseInt(parsed) : parsed;
    } else if (this.FONT_WEIGHT_SCALE[value]) {
      typography.fontWeight = this.FONT_WEIGHT_SCALE[value];
    } else if (!isNaN(Number(value))) {
      typography.fontWeight = Number(value);
    }
  }

  /**
   * 폰트 패밀리를 적용합니다.
   */
  private static applyFontFamily(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles, preset: DesignPreset): void {
    if (isArbitrary) {
      typography.fontFamily = this.parseArbitraryValue(value);
    } else if (preset.typography?.fontFamily?.[value]) {
      typography.fontFamily = preset.typography.fontFamily[value];
    } else {
      // 기본 폰트 패밀리
      const defaultFamilies: Record<string, string> = {
        'sans': 'ui-sans-serif, system-ui, sans-serif',
        'serif': 'ui-serif, Georgia, serif',
        'mono': 'ui-monospace, SFMono-Regular, monospace'
      };
      if (defaultFamilies[value]) {
        typography.fontFamily = defaultFamilies[value];
      }
    }
  }

  /**
   * 자간을 적용합니다.
   */
  private static applyLetterSpacing(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      typography.letterSpacing = this.parseArbitraryValue(value);
    } else if (this.LETTER_SPACING_SCALE[value]) {
      typography.letterSpacing = this.LETTER_SPACING_SCALE[value];
    }
  }

  /**
   * 행간을 적용합니다.
   */
  private static applyLineHeight(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      typography.lineHeight = this.parseArbitraryValue(value);
    } else if (this.LINE_HEIGHT_SCALE[value]) {
      typography.lineHeight = this.LINE_HEIGHT_SCALE[value];
    } else if (!isNaN(Number(value))) {
      // 숫자 값은 그대로 사용 (상대값)
      typography.lineHeight = Number(value);
    }
  }

  /**
   * 텍스트 장식 스타일을 적용합니다.
   */
  private static applyTextDecorationStyle(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      typography.textDecorationStyle = this.parseArbitraryValue(value);
    } else {
      const validStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
      if (validStyles.includes(value)) {
        typography.textDecorationStyle = value as any;
      }
    }
  }

  /**
   * 텍스트 장식 두께를 적용합니다.
   */
  private static applyTextDecorationThickness(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      typography.textDecorationThickness = this.parseArbitraryValue(value);
    } else if (value === 'auto' || value === 'from-font') {
      typography.textDecorationThickness = value;
    } else if (!isNaN(Number(value))) {
      typography.textDecorationThickness = `${value}px`;
    }
  }

  /**
   * 밑줄 오프셋을 적용합니다.
   */
  private static applyTextUnderlineOffset(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      typography.textUnderlineOffset = this.parseArbitraryValue(value);
    } else if (value === 'auto') {
      typography.textUnderlineOffset = 'auto';
    } else if (!isNaN(Number(value))) {
      typography.textUnderlineOffset = `${Number(value) * 4}px`; // 4px 기준
    }
  }

  /**
   * 텍스트 들여쓰기를 적용합니다.
   */
  private static applyTextIndent(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      typography.textIndent = this.parseArbitraryValue(value);
    } else if (!isNaN(Number(value))) {
      typography.textIndent = `${Number(value) * 4}px`; // 4px 기준
    }
  }

  /**
   * 정확한 속성을 적용합니다.
   */
  private static applyExactProperty(property: string, typography: EnhancedTypographyStyles): void {
    switch (property) {
      // 텍스트 변형
      case 'uppercase':
        typography.textTransform = 'uppercase';
        break;
      case 'lowercase':
        typography.textTransform = 'lowercase';
        break;
      case 'capitalize':
        typography.textTransform = 'capitalize';
        break;
      case 'normal-case':
        typography.textTransform = 'none';
        break;
        
      // 텍스트 장식
      case 'underline':
        typography.textDecoration = 'underline';
        break;
      case 'overline':
        typography.textDecoration = 'overline';
        break;
      case 'line-through':
        typography.textDecoration = 'line-through';
        break;
      case 'no-underline':
        typography.textDecoration = 'none';
        break;
        
      // 텍스트 정렬
      case 'text-left':
        typography.textAlign = 'left';
        break;
      case 'text-center':
        typography.textAlign = 'center';
        break;
      case 'text-right':
        typography.textAlign = 'right';
        break;
      case 'text-justify':
        typography.textAlign = 'justify';
        break;
      case 'text-start':
        typography.textAlign = 'start';
        break;
      case 'text-end':
        typography.textAlign = 'end';
        break;
        
      // 폰트 스타일
      case 'italic':
        typography.fontStyle = 'italic';
        break;
      case 'not-italic':
        typography.fontStyle = 'normal';
        break;
    }
  }

  /**
   * 임의 값을 파싱합니다.
   */
  private static parseArbitraryValue(value: string): string {
    // CSS 값 그대로 반환 (단위 포함)
    if (value.includes('px') || value.includes('rem') || value.includes('em') || 
        value.includes('%') || value.includes('vh') || value.includes('vw') ||
        value.includes('ch') || value.includes('ex') || value.includes('pt')) {
      return value;
    }

    // 폰트 패밀리 경우 따옴표 처리
    if (value.includes(',') || value.includes(' ')) {
      return value;
    }

    // 단위 없는 숫자는 적절한 단위 추가
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return value; // 폰트 두께나 line-height는 단위 없음
    }

    // 기타 값들
    return value;
  }

  /**
   * CSS 속성으로 변환합니다.
   */
  static toCSSProperties(typography: EnhancedTypographyStyles): Record<string, string> {
    const css: Record<string, string> = {};

    if (typography.fontSize !== undefined) {
      css['font-size'] = typeof typography.fontSize === 'number' ? `${typography.fontSize}px` : typography.fontSize;
    }

    if (typography.fontWeight !== undefined) {
      css['font-weight'] = typography.fontWeight.toString();
    }

    if (typography.fontFamily !== undefined) {
      css['font-family'] = typography.fontFamily;
    }

    if (typography.fontStyle !== undefined) {
      css['font-style'] = typography.fontStyle;
    }

    if (typography.lineHeight !== undefined) {
      css['line-height'] = typeof typography.lineHeight === 'number' ? typography.lineHeight.toString() : typography.lineHeight;
    }

    if (typography.letterSpacing !== undefined) {
      css['letter-spacing'] = typeof typography.letterSpacing === 'number' ? `${typography.letterSpacing}em` : typography.letterSpacing;
    }

    if (typography.textAlign !== undefined) {
      css['text-align'] = typography.textAlign;
    }

    if (typography.textTransform !== undefined) {
      css['text-transform'] = typography.textTransform;
    }

    if (typography.textDecoration !== undefined) {
      css['text-decoration'] = typography.textDecoration;
    }

    if (typography.textDecorationStyle !== undefined) {
      css['text-decoration-style'] = typography.textDecorationStyle;
    }

    if (typography.textDecorationThickness !== undefined) {
      css['text-decoration-thickness'] = typography.textDecorationThickness;
    }

    if (typography.textUnderlineOffset !== undefined) {
      css['text-underline-offset'] = typography.textUnderlineOffset;
    }

    if (typography.textIndent !== undefined) {
      css['text-indent'] = typography.textIndent;
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
    return value === 0 ? '0' : value.toString();
  }
} 
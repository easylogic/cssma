/**
 * Typography Parser - 타이포그래피 관련 CSS 속성 파서
 * 
 * Tailwind CSS v4 호환 버전
 * - 완전한 폰트 시스템 지원
 * - 임의 값 완전 지원
 * - 현대적 타이포그래피 기능
 * - 텍스트 관련 모든 유틸리티
 */

import { 
  ParsedClass, 
  ParsedStyles, 
  DesignPreset, 
  TypographyStyles,
  ColorValue
} from '../../types';

export interface EnhancedTypographyStyles extends TypographyStyles {
  // 확장된 폰트 속성
  fontVariantNumeric?: string; // font-variant-numeric
  fontOpticalSizing?: 'auto' | 'none';
  
  // 텍스트 장식 확장 (TypographyStyles와 호환성 확보)
  textDecorationThickness?: string | number; // TypographyStyles 타입과 일치
  textUnderlineOffset?: string | number; // TypographyStyles 타입과 일치
  
  // 텍스트 간격 및 크기 (TypographyStyles와 호환성 확보)
  textIndent?: string | number; // TypographyStyles 타입과 일치
  
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
    // Text Wrap Utilities (v4.1)
    'wrap-normal', 'wrap-break-word', 'wrap-anywhere',
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
   * 표준 인터페이스: 클래스가 typography 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    return this.isTypographyClass(className);
  }

  /**
   * 표준 인터페이스: typography 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    const parsed = this.parseTypography(className);
    if (!parsed) return null;

    return {
      property: parsed.property,
      value: parsed.value,
      isArbitrary: parsed.isArbitrary || false
    };
  }

  /**
   * 클래스가 타이포그래피 관련인지 확인합니다.
   */
  static isTypographyClass(className: string): boolean {
    // 정확한 매치 우선
    if (this.EXACT_PROPERTIES.includes(className)) {
      return true;
    }

    // text-[...] 임의 값 (색상 포함)
    const textArbitraryMatch = className.match(/^text-\[(.*?)\]$/);
    if (textArbitraryMatch) {
      // 모든 text-[...] 패턴을 Typography에서 처리 (색상 포함)
      return true;
    }

    // 접두사 매치 (임의 값, 소수점 값 포함)
    const prefixPatterns = [
      /^text-(xs|sm|base|lg|xl|\d*xl)$/, // 폰트 크기 (명시적)
      /^text-[a-z]+-\d+$/, // 텍스트 색상 (text-blue-500)
      /^text-(black|white|transparent|current)$/, // 기본 텍스트 색상
      // text-[...] 패턴은 위에서 이미 처리됨
      /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\d+)$/, // 폰트 두께
      /^font-\[.*?\]$/, // 폰트 두께/패밀리 임의 값
      /^font-\([^:]+:[^)]+\)$/, // CSS 변수 문법: font-(family-name:--my-font)
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
   * 값이 색상 값인지 판단합니다.
   */
  private static isColorValue(value: string): boolean {
    // HEX 색상 (#FF0000, #F00)
    if (/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value)) {
      return true;
    }
    
    // RGB/RGBA 함수 (rgb(255,0,0), rgba(255,0,0,0.5))
    if (/^rgba?\(/.test(value)) {
      return true;
    }
    
    // HSL/HSLA 함수 (hsl(0,100%,50%), hsla(0,100%,50%,0.5))
    if (/^hsla?\(/.test(value)) {
      return true;
    }
    
    // 색상 키워들
    const colorKeywords = [
      'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'gray', 'black', 'white',
      'transparent', 'current', 'inherit', 'initial', 'unset'
    ];
    
    if (colorKeywords.includes(value.toLowerCase())) {
      return true;
    }
    
    // Tailwind 색상 패턴 (red-500, blue-300 등)
    if (/^[a-z]+-\d+$/.test(value)) {
      return true;
    }
    
    return false;
  }

  /**
   * 타이포그래피 클래스를 파싱합니다.
   */
  static parseTypography(className: string): { property: string; value: string; isArbitrary?: boolean } | null {
    // 정확한 매치 우선 처리
    if (this.EXACT_PROPERTIES.includes(className)) {
      return { property: className, value: '' };
    }

    // CSS 변수 문법 처리: font-(family-name:--my-font)
    const cssVarMatch = className.match(/^font-\(([^:]+):([^)]+)\)$/);
    if (cssVarMatch) {
      const [, property, customProp] = cssVarMatch;
      return { 
        property: 'fontFamily', 
        value: `${property}:var(${customProp})`, 
        isArbitrary: true 
      };
    }

    // 텍스트 크기 (text-*)
    const textSizeMatch = className.match(/^text-(xs|sm|base|lg|xl|\d*xl)$/);
    if (textSizeMatch) {
      return { property: 'text', value: textSizeMatch[1] };
    }

    // 임의 값 텍스트 크기 (text-[...])
    const textArbitraryMatch = className.match(/^text-\[(.*?)\]$/);
    if (textArbitraryMatch) {
      const value = textArbitraryMatch[1];
      // 색상 값인 경우도 text 속성으로 처리 (Tailwind 스타일)
      if (this.isColorValue(value)) {
        return { property: 'text', value: this.parseArbitraryValue(value), isArbitrary: true };
      }
      // 크기 값인 경우 text 속성으로 처리
      return { property: 'text', value: this.parseArbitraryValue(value), isArbitrary: true };
    }

    // 텍스트 색상 (text-blue-500, text-red-300 등) - property는 'text'로 통일
    const textColorMatch = className.match(/^text-([a-z]+-\d+)$/);
    if (textColorMatch) {
      return { property: 'text', value: textColorMatch[1] };
    }

    // 기본 텍스트 색상 (text-black, text-white, text-transparent, text-current)
    const basicTextColorMatch = className.match(/^text-(black|white|transparent|current)$/);
    if (basicTextColorMatch) {
      return { property: 'text', value: basicTextColorMatch[1] };
    }

    // 폰트 두께 (font-*)
    const fontWeightMatch = className.match(/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\d+)$/);
    if (fontWeightMatch) {
      return { property: 'font', value: fontWeightMatch[1] };
    }

    // 폰트 패밀리 기본값 (font-sans/serif/mono)
    const fontFamilyMatch = className.match(/^font-(sans|serif|mono)$/);
    if (fontFamilyMatch) {
      return { property: 'font', value: fontFamilyMatch[1] };
    }

    // 임의 값 폰트 (font-[...])
    const fontArbitraryMatch = className.match(/^font-\[(.*?)\]$/);
    if (fontArbitraryMatch) {
      const value = fontArbitraryMatch[1];
      const cleanValue = this.parseArbitraryValue(value);
      
      return { property: 'font', value: cleanValue, isArbitrary: true };
    }

    // 자간 (tracking-*)
    const trackingMatch = className.match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);
    if (trackingMatch) {
      return { property: 'tracking', value: trackingMatch[1] };
    }

    // 임의 값 자간 (tracking-[...])
    const trackingArbitraryMatch = className.match(/^tracking-\[(.*?)\]$/);
    if (trackingArbitraryMatch) {
      return { property: 'tracking', value: this.parseArbitraryValue(trackingArbitraryMatch[1]), isArbitrary: true };
    }

    // 행간 (leading-*)
    const leadingMatch = className.match(/^leading-(none|tight|snug|normal|relaxed|loose|\d+)$/);
    if (leadingMatch) {
      return { property: 'leading', value: leadingMatch[1] };
    }

    // 임의 값 행간 (leading-[...])
    const leadingArbitraryMatch = className.match(/^leading-\[(.*?)\]$/);
    if (leadingArbitraryMatch) {
      return { property: 'leading', value: this.parseArbitraryValue(leadingArbitraryMatch[1]), isArbitrary: true };
    }

    // 텍스트 정렬 (text-align)
    const textAlignMatch = className.match(/^text-(left|center|right|justify|start|end)$/);
    if (textAlignMatch) {
      return { property: 'text', value: textAlignMatch[1] };
    }

    // 텍스트 장식 스타일 (decoration-*)
    const decorationStyleMatch = className.match(/^decoration-(solid|double|dotted|dashed|wavy)$/);
    if (decorationStyleMatch) {
      return { property: 'decoration', value: decorationStyleMatch[1] };
    }

    // 임의 값 텍스트 장식 스타일 (decoration-[...])
    const decorationStyleArbitraryMatch = className.match(/^decoration-\[(.*?)\]$/);
    if (decorationStyleArbitraryMatch) {
      return { property: 'decoration', value: this.parseArbitraryValue(decorationStyleArbitraryMatch[1]), isArbitrary: true };
    }

    // 텍스트 장식 두께 (decoration-*)
    const decorationThicknessMatch = className.match(/^decoration-(auto|from-font|\d+)$/);
    if (decorationThicknessMatch) {
      return { property: 'decoration', value: decorationThicknessMatch[1] };
    }

    // 밑줄 오프셋 (underline-offset-*)
    const underlineOffsetMatch = className.match(/^underline-offset-(auto|\d+)$/);
    if (underlineOffsetMatch) {
      return { property: 'underline-offset', value: underlineOffsetMatch[1] };
    }

    // 임의 값 밑줄 오프셋 (underline-offset-[...])
    const underlineOffsetArbitraryMatch = className.match(/^underline-offset-\[(.*?)\]$/);
    if (underlineOffsetArbitraryMatch) {
      return { property: 'underline-offset', value: this.parseArbitraryValue(underlineOffsetArbitraryMatch[1]), isArbitrary: true };
    }

    // 텍스트 들여쓰기 (indent-*)
    const indentMatch = className.match(/^indent-(\d+)$/);
    if (indentMatch) {
      return { property: 'indent', value: indentMatch[1] };
    }

    // 임의 값 텍스트 들여쓰기 (indent-[...])
    const indentArbitraryMatch = className.match(/^indent-\[(.*?)\]$/);
    if (indentArbitraryMatch) {
      return { property: 'indent', value: this.parseArbitraryValue(indentArbitraryMatch[1]), isArbitrary: true };
    }

    // 수직 정렬 (align-*)
    const verticalAlignMatch = className.match(/^align-(baseline|top|middle|bottom|text-top|text-bottom|sub|super)$/);
    if (verticalAlignMatch) {
      return { property: 'verticalAlign', value: verticalAlignMatch[1] };
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
    styles: Partial<ParsedStyles>, 
    preset: DesignPreset
  ): void {
    const { property, value } = parsedClass;
    const isArbitrary = Boolean(parsedClass.isArbitrary); // undefined를 false로 변환
    
    if (!styles.typography) {
      styles.typography = {};
    }
    
    // 원래 Tailwind 접두사 기반으로 직접 처리
    // 속성별 처리
    switch (property) {
      case 'text':
        // text-blue-500 (색상) vs text-lg (크기) vs text-center (정렬) 구분
        const baseClassName = parsedClass.baseClassName;
        
        if (baseClassName.match(/^text-[a-z]+-\d+$/) || 
            baseClassName.match(/^text-(black|white|transparent|current)$/) ||
            (baseClassName.match(/^text-\[.*?\]$/) && isArbitrary && this.isColorValue(value))) {
          // 텍스트 색상인 경우
          this.applyTextColor(value, isArbitrary, styles.typography, preset);
        } else if (baseClassName.match(/^text-(left|center|right|justify|start|end)$/)) {
          // 텍스트 정렬인 경우
          styles.typography.textAlign = value;
        } else {
          // 폰트 크기인 경우 (기본값)
          this.applyFontSize(value, isArbitrary, styles.typography, preset);
        }
        break;
        
      case 'color':
        this.applyTextColor(value, isArbitrary, styles.typography, preset);
        break;
        
      case 'font':
        // font-sans/serif/mono vs font-bold 구분
        const fontFamilies = ['sans', 'serif', 'mono'];
        if (fontFamilies.includes(value)) {
          this.applyFontFamily(value, isArbitrary, styles.typography, preset);
        } else if (isArbitrary) {
          // 임의 값인 경우 폰트 두께인지 폰트 패밀리인지 판단
          if (this.isFontWeightValue(value)) {
            this.applyFontWeight(value, isArbitrary, styles.typography);
          } else {
            this.applyFontFamily(value, isArbitrary, styles.typography, preset);
          }
        } else {
          this.applyFontWeight(value, isArbitrary, styles.typography);
        }
        break;
        
      case 'tracking':
        this.applyLetterSpacing(value, isArbitrary, styles.typography);
        break;
        
      case 'leading':
        this.applyLineHeight(value, isArbitrary, styles.typography);
        break;
        
      case 'decoration':
        // decoration-dashed (스타일) vs decoration-2 (두께) 구분
        const decorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
        if (decorationStyles.includes(value)) {
          this.applyTextDecorationStyle(value, isArbitrary, styles.typography);
        } else {
          this.applyTextDecorationThickness(value, isArbitrary, styles.typography);
        }
        break;
        
      case 'underline-offset':
        this.applyTextUnderlineOffset(value, isArbitrary, styles.typography);
        break;
        
      case 'indent':
        this.applyTextIndent(value, isArbitrary, styles.typography);
        break;
        
      // 값이 없는 속성들 (italic, uppercase 등)
      default:
        this.applyExactProperty(property, styles.typography);
        break;
    }
    
    // text-center, text-left 등 텍스트 정렬 특별 처리
    if (property === 'text' && ['left', 'center', 'right', 'justify', 'start', 'end'].includes(value)) {
      styles.typography.textAlign = value as any;
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
      // 픽셀 값을 rem으로 변환 (16px = 1rem 기준)
      typography.fontSize = `${scale.size / 16}rem`;
      if (scale.lineHeight) {
        typography.lineHeight = scale.lineHeight / scale.size;
      }
    } else if (preset.typography?.fontSize?.[value]) {
      const presetSize = preset.typography.fontSize[value];
      // 숫자인 경우 rem으로 변환, 문자열인 경우 그대로 사용
      if (typeof presetSize === 'number') {
        typography.fontSize = `${presetSize / 16}rem`;
      } else {
        typography.fontSize = presetSize;
      }
    }
  }

  /**
   * 폰트 두께를 적용합니다.
   */
  private static applyFontWeight(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      // 임의 값은 문자열로 유지 (테스트 기대값과 일치)
      typography.fontWeight = value;
    } else {
      const weight = this.FONT_WEIGHT_SCALE[value];
      if (weight !== undefined) {
        typography.fontWeight = weight; // 테스트가 숫자 기대
      }
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
      // 임의 값에서 숫자인 경우 숫자로, 아니면 문자열로
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && value === numValue.toString()) {
        typography.lineHeight = numValue; // 테스트가 1.5 숫자를 기대
      } else {
        typography.lineHeight = value;
      }
    } else {
      const height = this.LINE_HEIGHT_SCALE[value];
      if (height !== undefined) {
        typography.lineHeight = height;
      }
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
      typography.textUnderlineOffset = value;
    } else {
      // Tailwind v4: underline-offset-4 = 1px * 4 = 4px
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        typography.textUnderlineOffset = `${numValue}px`;
      } else {
        typography.textUnderlineOffset = value; // 'auto' 등
      }
    }
  }

  /**
   * 텍스트 들여쓰기를 적용합니다.
   */
  private static applyTextIndent(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles): void {
    if (isArbitrary) {
      typography.textIndent = value;
    } else {
      // Tailwind v4: indent-4 = 0.25rem * 4 = 1rem
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        typography.textIndent = `${numValue * 0.25}rem`;
      }
    }
  }

  /**
   * 텍스트 색상을 적용합니다.
   */
  private static applyTextColor(value: string, isArbitrary: boolean, typography: EnhancedTypographyStyles, preset: DesignPreset): void {
    if (isArbitrary) {
      // 임의 값 색상 (rgb(255,0,0), #FF0000 등)
      typography.color = value;
    } else {
      // Tailwind 색상 (blue-500, red-300 등) 또는 기본 색상 (black, white 등)
      typography.color = this.resolveColor(value, preset);
    }
  }

  /**
   * 색상 값을 해결합니다.
   */
  private static resolveColor(value: string, preset: DesignPreset): string {
    // 기본 색상들
    const basicColors: Record<string, string> = {
      'black': '#000000',
      'white': '#ffffff',
      'transparent': 'transparent',
      'current': 'currentColor'
    };

    if (basicColors[value]) {
      return basicColors[value];
    }

    // Tailwind 스타일 색상 (blue-500 등)
    if (value.includes('-')) {
      const [colorName, intensity] = value.split('-');
      
      // 프리셋에서 색상 찾기
      if (preset.colors?.[colorName]?.[intensity]) {
        const color = preset.colors[colorName][intensity];
        // RGB 객체인 경우 hex로 변환
        if (typeof color === 'object' && 'r' in color) {
          return this.rgbToHex(color.r, color.g, color.b);
        }
        // 이미 문자열인 경우 그대로 반환
        return color as string;
      }
      
      // 기본 Tailwind 색상 팔레트 (일부)
      const defaultColors: Record<string, Record<string, string>> = {
        'blue': {
          '50': '#eff6ff',
          '100': '#dbeafe',
          '200': '#bfdbfe',
          '300': '#93c5fd',
          '400': '#60a5fa',
          '500': '#3b82f6',
          '600': '#2563eb',
          '700': '#1d4ed8',
          '800': '#1e40af',
          '900': '#1e3a8a'
        },
        'red': {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '200': '#fecaca',
          '300': '#fca5a5',
          '400': '#f87171',
          '500': '#ef4444',
          '600': '#dc2626',
          '700': '#b91c1c',
          '800': '#991b1b',
          '900': '#7f1d1d'
        },
        'green': {
          '50': '#f0fdf4',
          '100': '#dcfce7',
          '200': '#bbf7d0',
          '300': '#86efac',
          '400': '#4ade80',
          '500': '#22c55e',
          '600': '#16a34a',
          '700': '#15803d',
          '800': '#166534',
          '900': '#14532d'
        }
      };

      if (defaultColors[colorName]?.[intensity]) {
        return defaultColors[colorName][intensity];
      }
    }

    // 그대로 반환 (CSS 색상 키워드 등)
    return value;
  }

  /**
   * RGB 값을 hex string으로 변환합니다.
   */
  private static rgbToHex(r: number, g: number, b: number): string {
    const toHex = (component: number) => {
      const hex = Math.round(component * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
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

      // 텍스트 장식 - textDecorationLine 사용
      case 'underline':
        typography.textDecorationLine = 'underline';
        break;
      case 'overline':
        typography.textDecorationLine = 'overline';
        break;
      case 'line-through':
        typography.textDecorationLine = 'line-through';
        break;
      case 'no-underline':
        typography.textDecorationLine = 'none';
        break;

      // 수직 정렬
      case 'align-baseline':
        typography.verticalAlign = 'baseline';
        break;
      case 'align-top':
        typography.verticalAlign = 'top';
        break;
      case 'align-middle':
        typography.verticalAlign = 'middle';
        break;
      case 'align-bottom':
        typography.verticalAlign = 'bottom';
        break;
      case 'align-text-top':
        typography.verticalAlign = 'text-top';
        break;
      case 'align-text-bottom':
        typography.verticalAlign = 'text-bottom';
        break;
      case 'align-sub':
        typography.verticalAlign = 'sub';
        break;
      case 'align-super':
        typography.verticalAlign = 'super';
        break;

      // 화이트스페이스
      case 'whitespace-normal':
        typography.whiteSpace = 'normal';
        break;
      case 'whitespace-nowrap':
        typography.whiteSpace = 'nowrap';
        break;
      case 'whitespace-pre':
        typography.whiteSpace = 'pre';
        break;
      case 'whitespace-pre-line':
        typography.whiteSpace = 'pre-line';
        break;
      case 'whitespace-pre-wrap':
        typography.whiteSpace = 'pre-wrap';
        break;
      case 'whitespace-break-spaces':
        typography.whiteSpace = 'break-spaces';
        break;

      // 단어 분리
      case 'break-normal':
        typography.overflowWrap = 'normal';
        typography.wordBreak = 'normal';
        break;
      case 'break-words':
        typography.overflowWrap = 'break-word';
        break;
      case 'break-all':
        typography.wordBreak = 'break-all';
        break;
      case 'break-keep':
        typography.wordBreak = 'keep-all';
        break;

      // Text Wrap Utilities (v4.1)
      case 'wrap-normal':
        typography.overflowWrap = 'normal';
        break;
      case 'wrap-break-word':
        typography.overflowWrap = 'break-word';
        break;
      case 'wrap-anywhere':
        typography.overflowWrap = 'anywhere';
        break;

      // 하이픈
      case 'hyphens-none':
        typography.hyphens = 'none';
        break;
      case 'hyphens-manual':
        typography.hyphens = 'manual';
        break;
      case 'hyphens-auto':
        typography.hyphens = 'auto';
        break;

      // 폰트 스타일
      case 'italic':
        typography.fontStyle = 'italic';
        break;
      case 'not-italic':
        typography.fontStyle = 'normal';
        break;

      // 폰트 변형
      case 'normal-nums':
        typography.fontVariantNumeric = 'normal';
        break;
      case 'ordinal':
        typography.fontVariantNumeric = 'ordinal';
        break;
      case 'slashed-zero':
        typography.fontVariantNumeric = 'slashed-zero';
        break;
      case 'lining-nums':
        typography.fontVariantNumeric = 'lining-nums';
        break;
      case 'oldstyle-nums':
        typography.fontVariantNumeric = 'oldstyle-nums';
        break;
      case 'proportional-nums':
        typography.fontVariantNumeric = 'proportional-nums';
        break;
      case 'tabular-nums':
        typography.fontVariantNumeric = 'tabular-nums';
        break;
      case 'diagonal-fractions':
        typography.fontVariantNumeric = 'diagonal-fractions';
        break;
      case 'stacked-fractions':
        typography.fontVariantNumeric = 'stacked-fractions';
        break;

      // 텍스트 오버플로우
      case 'truncate':
        typography.overflow = 'hidden';
        typography.textOverflow = 'ellipsis';
        typography.whiteSpace = 'nowrap';
        break;
      case 'text-ellipsis':
        typography.textOverflow = 'ellipsis';
        break;
      case 'text-clip':
        typography.textOverflow = 'clip';
        break;

      // 안티앨리어싱
      case 'antialiased':
        typography.WebkitFontSmoothing = 'antialiased';
        typography.MozOsxFontSmoothing = 'grayscale';
        break;
      case 'subpixel-antialiased':
        typography.WebkitFontSmoothing = 'auto';
        typography.MozOsxFontSmoothing = 'auto';
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
      css['text-decoration-thickness'] = this.formatValue(typography.textDecorationThickness);
    }

    if (typography.textUnderlineOffset !== undefined) {
      css['text-underline-offset'] = this.formatValue(typography.textUnderlineOffset);
    }

    if (typography.textIndent !== undefined) {
      css['text-indent'] = this.formatValue(typography.textIndent);
    }

    if (typography.color !== undefined) {
      css['color'] = typeof typography.color === 'string' ? typography.color : this.colorToString(typography.color);
    }

    // Text Wrap Utilities (v4.1)
    if (typography.overflowWrap !== undefined) {
      css['overflow-wrap'] = typography.overflowWrap;
    }

    if (typography.wordBreak !== undefined) {
      css['word-break'] = typography.wordBreak;
    }

    if (typography.whiteSpace !== undefined) {
      css['white-space'] = typography.whiteSpace;
    }

    if (typography.hyphens !== undefined) {
      css['hyphens'] = typography.hyphens;
    }

    if (typography.textOverflow !== undefined) {
      css['text-overflow'] = typography.textOverflow;
    }

    if (typography.overflow !== undefined) {
      css['overflow'] = typography.overflow;
    }

    if (typography.verticalAlign !== undefined) {
      css['vertical-align'] = typography.verticalAlign;
    }

    if (typography.textDecorationLine !== undefined) {
      css['text-decoration-line'] = typography.textDecorationLine;
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

  /**
   * 색상을 CSS 형식으로 변환합니다.
   */
  private static colorToString(color: ColorValue): string {
    // 이미 문자열인 경우
    if (typeof color === 'string') {
      return color;
    }

    // Color 객체인 경우 hex로 변환
    if (typeof color === 'object' && 'r' in color) {
      return this.rgbToHex(color.r, color.g, color.b);
    }

    // 기본값
    return '#000000';
  }
} 
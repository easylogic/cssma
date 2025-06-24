/**
 * Blend Modes Parser - 블렌드 모드 관련 CSS 속성 파서
 * 
 * mix-blend-mode, background-blend-mode 등의 블렌드 관련 속성을 처리합니다.
 */

import { ParsedStyle, BlendModesStyles, ParsedClass, ParsedStyles, ParserContext } from '../../types';

const BLEND_MODES_CLASSES = {
  'mix-blend-normal': 'normal',
  'mix-blend-multiply': 'multiply',
  'mix-blend-screen': 'screen',
  'mix-blend-overlay': 'overlay',
  'mix-blend-darken': 'darken',
  'mix-blend-lighten': 'lighten',
  'mix-blend-color-dodge': 'color-dodge',
  'mix-blend-color-burn': 'color-burn',
  'mix-blend-hard-light': 'hard-light',
  'mix-blend-soft-light': 'soft-light',
  'mix-blend-difference': 'difference',
  'mix-blend-exclusion': 'exclusion',
  'mix-blend-hue': 'hue',
  'mix-blend-saturation': 'saturation',
  'mix-blend-color': 'color',
  'mix-blend-luminosity': 'luminosity',
  'bg-blend-normal': 'normal',
  'bg-blend-multiply': 'multiply',
  'bg-blend-screen': 'screen',
  'bg-blend-overlay': 'overlay',
  'bg-blend-darken': 'darken',
  'bg-blend-lighten': 'lighten',
  'bg-blend-color-dodge': 'color-dodge',
  'bg-blend-color-burn': 'color-burn',
  'bg-blend-hard-light': 'hard-light',
  'bg-blend-soft-light': 'soft-light',
  'bg-blend-difference': 'difference',
  'bg-blend-exclusion': 'exclusion',
  'bg-blend-hue': 'hue',
  'bg-blend-saturation': 'saturation',
  'bg-blend-color': 'color',
  'bg-blend-luminosity': 'luminosity'
};

const PREFIX_CLASSES = [
  'mix-blend-',
  'bg-blend-'
];

export class BlendModesParser {

  /**
   * 클래스명이 블렌드 모드 관련 클래스인지 확인합니다.
   * @param className 클래스명
   * @returns 블렌드 모드 관련 클래스 여부
   */
  static isValidClass(className: string): boolean {
    // mix-blend 관련
    if (className.startsWith('mix-blend-')) return true;
    
    // bg-blend 관련
    if (className.startsWith('bg-blend-')) return true;
    
    return false;
  }

  /**
   * 클래스명을 파싱하여 속성과 값을 추출합니다.
   * @param className 클래스명
   * @returns 파싱된 결과
   */
  static parseValue(className: string): { property: string; value: string; isArbitrary: boolean } | null {
    // mix-blend 관련
    if (className.startsWith('mix-blend-')) {
      const value = className.slice('mix-blend-'.length);
      return {
        property: 'mix-blend-mode',
        value: value,
        isArbitrary: false
      };
    }
    
    // bg-blend 관련
    if (className.startsWith('bg-blend-')) {
      const value = className.slice('bg-blend-'.length);
      return {
        property: 'bg-blend-mode',
        value: value,
        isArbitrary: false
      };
    }
    
    return null;
  }

  static isBlendModesClass(className: string): boolean {
    if (className in BLEND_MODES_CLASSES || PREFIX_CLASSES.some(prefix => className.startsWith(prefix))) {
      return true;
    }
    return false;
  }

  /**
   * 블렌드 모드 클래스를 파싱합니다.
   * @param className CSS 클래스명
   * @returns 파싱 결과 또는 null
   */
  static parse(className: string): ParsedStyle | null {
    // Mix blend mode utilities
    if (className.startsWith('mix-blend-')) {
      return this.parseMixBlendMode(className);
    }

    // Background blend mode utilities
    if (className.startsWith('bg-blend-')) {
      return this.parseBackgroundBlendMode(className);
    }

    return null;
  }

  /**
   * Mix blend mode 유틸리티를 파싱합니다.
   */
  private static parseMixBlendMode(className: string): ParsedStyle | null {
    if (className in BLEND_MODES_CLASSES) {
      return {
        property: 'mixBlendMode',
        value: BLEND_MODES_CLASSES[className as keyof typeof BLEND_MODES_CLASSES],
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * Background blend mode 유틸리티를 파싱합니다.
   */
  private static parseBackgroundBlendMode(className: string): ParsedStyle | null {
    if (className in BLEND_MODES_CLASSES) {
      return {
        property: 'backgroundBlendMode',
        value: BLEND_MODES_CLASSES[className as keyof typeof BLEND_MODES_CLASSES],
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * Context Pattern을 사용한 새로운 스타일 적용 메서드
   */
  static applyBlendModesStyle(
    parsedClass: ParsedClass,
    styles: Partial<ParsedStyles>,
    context: ParserContext
  ): void {
    if (!styles.blendModes) {
      styles.blendModes = {};
    }

    const { property, value, isArbitrary } = parsedClass;
    
    // Context에서 preset 추출
    const preset = context.preset;

    // 속성별 처리
    switch (property) {
      // Mix blend mode
      case 'mix-blend-mode':
        this.handleMixBlendMode(value, isArbitrary!, styles.blendModes);
        break;
        
      // Background blend mode
      case 'bg-blend-mode':
        this.handleBackgroundBlendMode(value, isArbitrary!, styles.blendModes);
        break;
        
      default:
        // Generic property 처리
        styles.blendModes[property] = isArbitrary ? value : this.convertBlendModeValue(property, value);
        break;
    }
  }

  /**
   * Mix blend mode 처리 헬퍼 메서드
   */
  private static handleMixBlendMode(value: string, isArbitrary: boolean, blendModeStyles: any): void {
    if (isArbitrary) {
      blendModeStyles.mixBlendMode = value;
    } else {
      // 표준 blend mode 값 매핑
      const blendModeMap: Record<string, string> = {
        'normal': 'normal',
        'multiply': 'multiply',
        'screen': 'screen',
        'overlay': 'overlay',
        'darken': 'darken',
        'lighten': 'lighten',
        'color-dodge': 'color-dodge',
        'color-burn': 'color-burn',
        'hard-light': 'hard-light',
        'soft-light': 'soft-light',
        'difference': 'difference',
        'exclusion': 'exclusion',
        'hue': 'hue',
        'saturation': 'saturation',
        'color': 'color',
        'luminosity': 'luminosity'
      };
      
      blendModeStyles.mixBlendMode = blendModeMap[value] || value;
    }
  }

  /**
   * Background blend mode 처리 헬퍼 메서드
   */
  private static handleBackgroundBlendMode(value: string, isArbitrary: boolean, blendModeStyles: any): void {
    if (isArbitrary) {
      blendModeStyles.backgroundBlendMode = value;
    } else {
      // 표준 blend mode 값 매핑
      const blendModeMap: Record<string, string> = {
        'normal': 'normal',
        'multiply': 'multiply',
        'screen': 'screen',
        'overlay': 'overlay',
        'darken': 'darken',
        'lighten': 'lighten',
        'color-dodge': 'color-dodge',
        'color-burn': 'color-burn',
        'hard-light': 'hard-light',
        'soft-light': 'soft-light',
        'difference': 'difference',
        'exclusion': 'exclusion',
        'hue': 'hue',
        'saturation': 'saturation',
        'color': 'color',
        'luminosity': 'luminosity'
      };
      
      blendModeStyles.backgroundBlendMode = blendModeMap[value] || value;
    }
  }

  /**
   * Blend mode 값 변환 헬퍼 메서드
   */
  private static convertBlendModeValue(property: string, value: string): string {
    // 특정 property에 따른 값 변환 로직
    return value;
  }
} 
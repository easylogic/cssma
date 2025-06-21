/**
 * StyleEngine - CSS 파서와 변환기를 통합하는 엔진
 * 
 * 이 클래스는 CSS 클래스 파싱과 Figma 스타일 변환을 통합하여
 * 완전한 CSS ↔ Figma 변환 기능을 제공합니다.
 */

import { CSSParser } from './parser';
import { StyleConverter } from './converter';
import { ParserConfig, ConversionResult, DesignPreset, Config } from '../types';

export class StyleEngine {
  private parser: CSSParser;
  private converter: StyleConverter;
  private config: Config;
  
  /**
   * StyleEngine 생성자
   * @param config 파서 설정
   * @param preset 디자인 프리셋
   */
  constructor(config: ParserConfig = {}, preset?: DesignPreset) {
    // Convert ParserConfig to Config
    const fullConfig: Config = {
      prefix: config.prefix || '',
      separator: config.separator || ':',
      important: false,
      enableArbitraryValues: config.enableArbitraryValues !== false,
      enableStateModifiers: config.enableStateModifiers !== false,
      enableResponsiveModifiers: config.enableResponsiveModifiers !== false
    };
    
    this.config = fullConfig;
    const usedPreset = preset || this.getDefaultPreset();
    this.parser = new CSSParser(fullConfig, usedPreset);
    this.converter = new StyleConverter(fullConfig, usedPreset);
  }
  
  /**
   * CSS 클래스를 모든 형식으로 처리합니다.
   * @param cssClasses CSS 클래스 문자열
   * @returns 모든 변환 결과
   */
  process(cssClasses: string): {
    parsed: any;
    cssObject: any;
    cssString: string;
    reactStyles: any;
    figmaStyles: any;
  } {
    // 1. CSS 클래스 파싱
    const parsed = this.parser.parse(cssClasses);
    
    // 2. 다양한 형식으로 변환
    const cssObject = this.converter.toCSSObject ? this.converter.toCSSObject(parsed) : {};
    const cssString = this.converter.toCSSString ? this.converter.toCSSString(cssObject) : '';
    const reactStyles = this.converter.toReactStyles ? this.converter.toReactStyles(parsed) : {};
    const figmaStyles = this.converter.toFigmaStyles ? this.converter.toFigmaStyles(parsed) : {};
    
    return {
      parsed,
      cssObject,
      cssString,
      reactStyles,
      figmaStyles
    };
  }

  /**
   * CSS 클래스를 CSS 객체로 변환합니다.
   * @param cssClasses CSS 클래스 문자열
   * @returns CSS 객체
   */
  toCSSObject(cssClasses: string): any {
    const parsed = this.parser.parse(cssClasses);
    return this.converter.toCSSObject ? this.converter.toCSSObject(parsed) : {};
  }

  /**
   * CSS 클래스를 CSS 문자열로 변환합니다.
   * @param cssClasses CSS 클래스 문자열
   * @returns CSS 문자열
   */
  toCSSString(cssClasses: string): string {
    const cssObject = this.toCSSObject(cssClasses);
    return this.converter.toCSSString ? this.converter.toCSSString(cssObject) : '';
  }

  /**
   * CSS 클래스를 React 스타일 객체로 변환합니다.
   * @param cssClasses CSS 클래스 문자열
   * @returns React 스타일 객체
   */
  toReactStyles(cssClasses: string): any {
    const parsed = this.parser.parse(cssClasses);
    return this.converter.toReactStyles ? this.converter.toReactStyles(parsed) : {};
  }

  /**
   * CSS 클래스를 Figma 스타일 객체로 변환합니다.
   * @param cssClasses CSS 클래스 문자열
   * @returns Figma 스타일 객체
   */
  toFigmaStyles(cssClasses: string): any {
    const parsed = this.parser.parse(cssClasses);
    return this.converter.toFigmaStyles ? this.converter.toFigmaStyles(parsed) : {};
  }

  /**
   * CSS 클래스 문자열을 Figma 스타일로 변환합니다.
   * @param cssClasses CSS 클래스 문자열
   * @returns Figma 스타일 객체
   */
  cssToFigma(cssClasses: string): any {
    // 1. CSS 클래스 파싱
    const parsedData = this.parser.parse(cssClasses);
    
    // 2. 파싱된 데이터를 Figma 스타일로 변환
    return this.converter.cssToFigma(parsedData);
  }
  
  /**
   * Figma 스타일을 CSS 클래스로 변환합니다.
   * @param figmaStyles Figma 스타일 객체
   * @returns CSS 변환 결과
   */
  figmaToCss(figmaStyles: any): ConversionResult {
    return this.converter.figmaToCss(figmaStyles);
  }
  
  /**
   * 단일 CSS 클래스를 파싱합니다.
   * @param className CSS 클래스 이름
   * @returns 파싱 결과
   */
  parseClass(className: string): any {
    return this.parser.parseClassName(className);
  }
  
  /**
   * 브레이크포인트 설정을 가져옵니다.
   * @param name 브레이크포인트 이름
   * @returns 브레이크포인트 설정
   */
  getBreakpointConfig(name: string): { min?: string; max?: string } | undefined {
    const defaultBreakpoints = {
      'sm': { min: '640px' },
      'md': { min: '768px' },
      'lg': { min: '1024px' },
      'xl': { min: '1280px' },
      '2xl': { min: '1536px' },
    };
    
    return defaultBreakpoints[name as keyof typeof defaultBreakpoints];
  }
  
  /**
   * 현재 파서 설정을 가져옵니다.
   * @returns 파서 설정
   */
  getConfig(): ParserConfig {
    return this.parser['config'];
  }
  
  /**
   * 현재 프리셋을 가져옵니다.
   * @returns 디자인 프리셋
   */
  getPreset(): DesignPreset {
    return this.parser['preset'];
  }
  
  /**
   * 파서 설정을 업데이트합니다.
   * @param config 새 파서 설정
   */
  updateConfig(config: Partial<ParserConfig>): void {
    this.parser = new CSSParser({
      ...this.parser['config'],
      ...config
    }, this.parser['preset']);
  }
  
  /**
   * 프리셋을 업데이트합니다.
   * @param preset 새 디자인 프리셋
   */
  updatePreset(preset: DesignPreset): void {
    this.parser = new CSSParser(
      this.parser['config'],
      preset
    );
  }

  /**
   * 기본 프리셋을 가져옵니다.
   * @returns 기본 프리셋
   */
  private getDefaultPreset(): DesignPreset {
    return {
      name: 'default',
      version: '3.0.0',
      colors: {
        blue: { '500': { r: 0.25, g: 0.53, b: 0.94 } },
        red: { '500': { r: 0.94, g: 0.25, b: 0.25 } },
        green: { '500': { r: 0.25, g: 0.8, b: 0.25 } }
      },
      spacing: {
        '0': 0, '1': 4, '2': 8, '4': 16, '8': 32
      },
      typography: {
        fontSize: { 'base': 16 },
        fontWeight: { 'normal': 400 },
        lineHeight: { 'normal': 1.5 },
        letterSpacing: { 'normal': 0 },
        fontFamily: { 'sans': 'system-ui, sans-serif' }
      },
      effects: {
        boxShadow: { 'default': '0 1px 3px rgba(0,0,0,0.1)' },
        textShadow: { 'default': '0 2px 4px rgba(0,0,0,0.1)' },
        blur: { 'default': 8 },
        brightness: { '100': 1 },
        contrast: { '100': 1 },
        grayscale: { '0': 0 },
        saturate: { '100': 1 },
        dropShadow: { 'default': '0 2px 4px rgba(0,0,0,0.1)' },
        opacity: { '100': 1 },
        borderRadius: { 'default': 4 },
      },
      layout: {
        width: { 'full': '100%' },
        height: { 'full': '100%' },
        maxWidth: { 'full': '100%' },
        maxHeight: { 'full': '100%' },
        minWidth: { 'full': '100%' },
        minHeight: { 'full': '100%' }
      },
      animation: {
        presets: {
          'spin': {
            name: 'spin',
            duration: 1000,
            timingFunction: 'linear',
            iterationCount: 'infinite',
            keyframes: [
              { offset: 0, transform: 'rotate(0deg)' },
              { offset: 1, transform: 'rotate(360deg)' },
            ],
          },
        },
        durations: { '300': 300, '500': 500 },
        easings: { 'linear': 'linear', 'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)' },
      },
      screens: { sm: '640px', md: '768px', lg: '1024px' },
      containers: { sm: '640px', md: '768px', lg: '1024px' },
      borders: {
        borderWidth: { 'default': '1px' },
        borderRadius: { 'default': '0.25rem' },
        borderStyle: { 'solid': 'solid' },
      },
      backgrounds: {
        backgroundImage: { 'none': 'none' },
        gradients: { 'none': 'transparent' },
      },
      transitions: {
        property: { 'default': 'all' },
        duration: { '300': '300ms' },
        timingFunction: { 'linear': 'linear' },
        delay: { '75': '75ms' },
      },
      transforms: {
        scale: { '100': '1' },
        rotate: { '0': '0deg' },
        translate: { '0': '0px' },
        skew: { '0': '0deg' },
      },
    };
  }
}

// 별칭 export
export { StyleEngine as CSSEngine }; 
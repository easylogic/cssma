/**
 * Blend Modes Parser - 블렌드 모드 관련 CSS 속성 파서
 * 
 * mix-blend-mode, background-blend-mode 등의 블렌드 관련 속성을 처리합니다.
 */

import { ParsedStyle, BlendModesStyles } from '../../types';

export class BlendModesParser {
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
    const mode = className.replace('mix-blend-', '');
    
    const mixBlendModes: Record<string, string> = {
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

    if (mode in mixBlendModes) {
      return {
        property: 'mixBlendMode',
        value: mixBlendModes[mode],
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * Background blend mode 유틸리티를 파싱합니다.
   */
  private static parseBackgroundBlendMode(className: string): ParsedStyle | null {
    const mode = className.replace('bg-blend-', '');
    
    const backgroundBlendModes: Record<string, string> = {
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

    if (mode in backgroundBlendModes) {
      return {
        property: 'backgroundBlendMode',
        value: backgroundBlendModes[mode],
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * 블렌드 모드 스타일을 적용합니다.
   */
  static applyBlendModesStyle(
    parsedClass: { property: string; value: string; baseClassName: string },
    styles: { blendModes?: BlendModesStyles },
    preset: any
  ): void {
    const parsed = this.parse(parsedClass.baseClassName);
    if (!parsed) return;

    if (!styles.blendModes) {
      styles.blendModes = {};
    }

    if (parsed.property === 'mixBlendMode') {
      styles.blendModes.mixBlendMode = parsed.value;
    } else if (parsed.property === 'backgroundBlendMode') {
      styles.blendModes.backgroundBlendMode = parsed.value;
    }
  }
} 
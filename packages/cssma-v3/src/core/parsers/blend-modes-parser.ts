/**
 * Blend Modes Parser - 블렌드 모드 관련 CSS 속성 파서
 * 
 * mix-blend-mode, background-blend-mode 등의 블렌드 관련 속성을 처리합니다.
 */

import { ParsedStyle, BlendModesStyles } from '../../types';

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
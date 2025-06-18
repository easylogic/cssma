/**
 * Filters Parser
 * Tailwind CSS의 모든 Filter 및 Backdrop Filter 유틸리티 클래스를 파싱합니다.
 */

import { ParsedStyle, ParsedClass, FiltersStyles, DesignPreset } from '../../types';

export class FiltersParser {
  /**
   * Filters 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋 (옵션)
   */
  static applyFiltersStyle(
    parsedClass: ParsedClass, 
    styles: { filters?: FiltersStyles }, 
    preset?: DesignPreset
  ): void {
    if (!styles.filters) {
      styles.filters = {};
    }
    
    // 개별 파서를 사용하여 속성 값 설정
    const result = this.parse(parsedClass.baseClassName);
    if (result) {
      if (result.property === 'filter') {
        // 기존 filter와 결합
        if (styles.filters.filter) {
          styles.filters.filter += ` ${result.value}`;
        } else {
          styles.filters.filter = result.value;
        }
      } else if (result.property === 'backdropFilter') {
        // 기존 backdropFilter와 결합
        if (styles.filters.backdropFilter) {
          styles.filters.backdropFilter += ` ${result.value}`;
        } else {
          styles.filters.backdropFilter = result.value;
        }
      }
    }
  }

  // Blur
  static parseBlur(className: string): ParsedStyle | null {
    if (!className.startsWith('blur')) return null;

    const blurMap: Record<string, string> = {
      'blur-none': 'blur(0)',
      'blur-sm': 'blur(4px)',
      'blur': 'blur(8px)',
      'blur-md': 'blur(12px)',
      'blur-lg': 'blur(16px)',
      'blur-xl': 'blur(24px)',
      'blur-2xl': 'blur(40px)',
      'blur-3xl': 'blur(64px)'
    };

    if (className in blurMap) {
      return {
        property: 'filter',
        value: blurMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Brightness
  static parseBrightness(className: string): ParsedStyle | null {
    if (!className.startsWith('brightness-')) return null;

    const value = className.slice(11);
    const brightnessMap: Record<string, string> = {
      '0': 'brightness(0)',
      '50': 'brightness(0.5)',
      '75': 'brightness(0.75)',
      '90': 'brightness(0.9)',
      '95': 'brightness(0.95)',
      '100': 'brightness(1)',
      '105': 'brightness(1.05)',
      '110': 'brightness(1.1)',
      '125': 'brightness(1.25)',
      '150': 'brightness(1.5)',
      '200': 'brightness(2)'
    };

    if (value in brightnessMap) {
      return {
        property: 'filter',
        value: brightnessMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Contrast
  static parseContrast(className: string): ParsedStyle | null {
    if (!className.startsWith('contrast-')) return null;

    const value = className.slice(9);
    const contrastMap: Record<string, string> = {
      '0': 'contrast(0)',
      '50': 'contrast(0.5)',
      '75': 'contrast(0.75)',
      '100': 'contrast(1)',
      '125': 'contrast(1.25)',
      '150': 'contrast(1.5)',
      '200': 'contrast(2)'
    };

    if (value in contrastMap) {
      return {
        property: 'filter',
        value: contrastMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Drop Shadow
  static parseDropShadow(className: string): ParsedStyle | null {
    if (!className.startsWith('drop-shadow')) return null;

    const dropShadowMap: Record<string, string> = {
      'drop-shadow-sm': 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
      'drop-shadow': 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
      'drop-shadow-md': 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      'drop-shadow-lg': 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
      'drop-shadow-xl': 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
      'drop-shadow-2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
      'drop-shadow-none': 'drop-shadow(0 0 #0000)'
    };

    if (className in dropShadowMap) {
      return {
        property: 'filter',
        value: dropShadowMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Grayscale
  static parseGrayscale(className: string): ParsedStyle | null {
    if (className === 'grayscale') {
      return {
        property: 'filter',
        value: 'grayscale(100%)',
        variant: 'preset'
      };
    }

    if (className.startsWith('grayscale-')) {
      const value = className.slice(10);
      if (value === '0') {
        return {
          property: 'filter',
          value: 'grayscale(0)',
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Hue Rotate
  static parseHueRotate(className: string): ParsedStyle | null {
    if (!className.startsWith('hue-rotate-')) return null;

    const value = className.slice(11);
    const hueRotateMap: Record<string, string> = {
      '0': 'hue-rotate(0deg)',
      '15': 'hue-rotate(15deg)',
      '30': 'hue-rotate(30deg)',
      '60': 'hue-rotate(60deg)',
      '90': 'hue-rotate(90deg)',
      '180': 'hue-rotate(180deg)'
    };

    if (value in hueRotateMap) {
      return {
        property: 'filter',
        value: hueRotateMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Invert
  static parseInvert(className: string): ParsedStyle | null {
    if (className === 'invert') {
      return {
        property: 'filter',
        value: 'invert(100%)',
        variant: 'preset'
      };
    }

    if (className.startsWith('invert-')) {
      const value = className.slice(7);
      if (value === '0') {
        return {
          property: 'filter',
          value: 'invert(0)',
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Saturate
  static parseSaturate(className: string): ParsedStyle | null {
    if (!className.startsWith('saturate-')) return null;

    const value = className.slice(9);
    const saturateMap: Record<string, string> = {
      '0': 'saturate(0)',
      '50': 'saturate(0.5)',
      '100': 'saturate(1)',
      '150': 'saturate(1.5)',
      '200': 'saturate(2)'
    };

    if (value in saturateMap) {
      return {
        property: 'filter',
        value: saturateMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Sepia
  static parseSepia(className: string): ParsedStyle | null {
    if (className === 'sepia') {
      return {
        property: 'filter',
        value: 'sepia(100%)',
        variant: 'preset'
      };
    }

    if (className.startsWith('sepia-')) {
      const value = className.slice(6);
      if (value === '0') {
        return {
          property: 'filter',
          value: 'sepia(0)',
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Backdrop Blur
  static parseBackdropBlur(className: string): ParsedStyle | null {
    if (!className.startsWith('backdrop-blur')) return null;

    const backdropBlurMap: Record<string, string> = {
      'backdrop-blur-none': 'blur(0)',
      'backdrop-blur-sm': 'blur(4px)',
      'backdrop-blur': 'blur(8px)',
      'backdrop-blur-md': 'blur(12px)',
      'backdrop-blur-lg': 'blur(16px)',
      'backdrop-blur-xl': 'blur(24px)',
      'backdrop-blur-2xl': 'blur(40px)',
      'backdrop-blur-3xl': 'blur(64px)'
    };

    if (className in backdropBlurMap) {
      return {
        property: 'backdropFilter',
        value: backdropBlurMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Backdrop Brightness
  static parseBackdropBrightness(className: string): ParsedStyle | null {
    if (!className.startsWith('backdrop-brightness-')) return null;

    const value = className.slice(20);
    const backdropBrightnessMap: Record<string, string> = {
      '0': 'brightness(0)',
      '50': 'brightness(0.5)',
      '75': 'brightness(0.75)',
      '90': 'brightness(0.9)',
      '95': 'brightness(0.95)',
      '100': 'brightness(1)',
      '105': 'brightness(1.05)',
      '110': 'brightness(1.1)',
      '125': 'brightness(1.25)',
      '150': 'brightness(1.5)',
      '200': 'brightness(2)'
    };

    if (value in backdropBrightnessMap) {
      return {
        property: 'backdropFilter',
        value: backdropBrightnessMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Backdrop Contrast
  static parseBackdropContrast(className: string): ParsedStyle | null {
    if (!className.startsWith('backdrop-contrast-')) return null;

    const value = className.slice(18);
    const backdropContrastMap: Record<string, string> = {
      '0': 'contrast(0)',
      '50': 'contrast(.5)',
      '75': 'contrast(.75)',
      '100': 'contrast(1)',
      '125': 'contrast(1.25)',
      '150': 'contrast(1.5)',
      '200': 'contrast(2)'
    };

    if (value in backdropContrastMap) {
      return {
        property: 'backdropFilter',
        value: backdropContrastMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Backdrop Grayscale
  static parseBackdropGrayscale(className: string): ParsedStyle | null {
    if (className === 'backdrop-grayscale') {
      return {
        property: 'backdropFilter',
        value: 'grayscale(100%)',
        variant: 'preset'
      };
    }

    if (className.startsWith('backdrop-grayscale-')) {
      const value = className.slice(19);
      if (value === '0') {
        return {
          property: 'backdropFilter',
          value: 'grayscale(0)',
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Backdrop Hue Rotate
  static parseBackdropHueRotate(className: string): ParsedStyle | null {
    if (!className.startsWith('backdrop-hue-rotate-')) return null;

    const value = className.slice(20);
    const backdropHueRotateMap: Record<string, string> = {
      '0': 'hue-rotate(0deg)',
      '15': 'hue-rotate(15deg)',
      '30': 'hue-rotate(30deg)',
      '60': 'hue-rotate(60deg)',
      '90': 'hue-rotate(90deg)',
      '180': 'hue-rotate(180deg)'
    };

    if (value in backdropHueRotateMap) {
      return {
        property: 'backdropFilter',
        value: backdropHueRotateMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Backdrop Invert
  static parseBackdropInvert(className: string): ParsedStyle | null {
    if (className === 'backdrop-invert') {
      return {
        property: 'backdropFilter',
        value: 'invert(100%)',
        variant: 'preset'
      };
    }

    if (className.startsWith('backdrop-invert-')) {
      const value = className.slice(16);
      if (value === '0') {
        return {
          property: 'backdropFilter',
          value: 'invert(0)',
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Backdrop Opacity
  static parseBackdropOpacity(className: string): ParsedStyle | null {
    if (!className.startsWith('backdrop-opacity-')) return null;

    const value = className.slice(17);
    const backdropOpacityMap: Record<string, string> = {
      '0': 'opacity(0)',
      '5': 'opacity(0.05)',
      '10': 'opacity(0.1)',
      '20': 'opacity(0.2)',
      '25': 'opacity(0.25)',
      '30': 'opacity(0.3)',
      '40': 'opacity(0.4)',
      '50': 'opacity(0.5)',
      '60': 'opacity(0.6)',
      '70': 'opacity(0.7)',
      '75': 'opacity(0.75)',
      '80': 'opacity(0.8)',
      '90': 'opacity(0.9)',
      '95': 'opacity(0.95)',
      '100': 'opacity(1)'
    };

    if (value in backdropOpacityMap) {
      return {
        property: 'backdropFilter',
        value: backdropOpacityMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Backdrop Saturate
  static parseBackdropSaturate(className: string): ParsedStyle | null {
    if (!className.startsWith('backdrop-saturate-')) return null;

    const value = className.slice(18);
    const backdropSaturateMap: Record<string, string> = {
      '0': 'saturate(0)',
      '50': 'saturate(.5)',
      '100': 'saturate(1)',
      '150': 'saturate(1.5)',
      '200': 'saturate(2)'
    };

    if (value in backdropSaturateMap) {
      return {
        property: 'backdropFilter',
        value: backdropSaturateMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Backdrop Sepia
  static parseBackdropSepia(className: string): ParsedStyle | null {
    if (className === 'backdrop-sepia') {
      return {
        property: 'backdropFilter',
        value: 'sepia(100%)',
        variant: 'preset'
      };
    }

    if (className.startsWith('backdrop-sepia-')) {
      const value = className.slice(15);
      if (value === '0') {
        return {
          property: 'backdropFilter',
          value: 'sepia(0)',
          variant: 'preset'
        };
      }
    }

    return null;
  }

  /**
   * 메인 파싱 메서드 - 모든 필터 관련 클래스를 파싱
   */
  static parse(className: string): ParsedStyle | null {
    // 각 파싱 메서드를 순서대로 시도
    return (
      this.parseBlur(className) ||
      this.parseBrightness(className) ||
      this.parseContrast(className) ||
      this.parseDropShadow(className) ||
      this.parseGrayscale(className) ||
      this.parseHueRotate(className) ||
      this.parseInvert(className) ||
      this.parseSaturate(className) ||
      this.parseSepia(className) ||
      this.parseBackdropBlur(className) ||
      this.parseBackdropBrightness(className) ||
      this.parseBackdropContrast(className) ||
      this.parseBackdropGrayscale(className) ||
      this.parseBackdropHueRotate(className) ||
      this.parseBackdropInvert(className) ||
      this.parseBackdropOpacity(className) ||
      this.parseBackdropSaturate(className) ||
      this.parseBackdropSepia(className)
    );
  }
} 
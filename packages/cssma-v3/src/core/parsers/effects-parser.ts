/**
 * Effects Parser - 효과 관련 CSS 속성 파서
 * 
 * shadow, opacity, blur, border-radius 등의 효과 관련 속성을 처리합니다.
 */

import { ParsedClass, EffectsStyles, DesignPreset } from '../../types';
import { TAILWIND_DEFAULTS } from '../constants/tailwind-defaults';

export class EffectsParser {
  /**
   * 효과 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋
   */
  static applyEffectStyle(
    parsedClass: ParsedClass, 
    styles: { effects?: EffectsStyles }, 
    preset: DesignPreset
  ): void {
    if (!styles.effects) {
      styles.effects = {};
    }

    const { property, value, isArbitrary } = parsedClass;

    if (property.startsWith('rounded')) {
      // 테두리 반경
      this.handleBorderRadius(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'border' || property.startsWith('border-')) {
      // 테두리 너비 - border와 border-로 시작하는 모든 속성 처리
      this.handleBorderWidth(property, value, isArbitrary || false, styles.effects);
    } else if (property === 'shadow') {
      // 그림자
      this.handleBoxShadow(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'opacity') {
      // 불투명도
      this.handleOpacity(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'blur') {
      // 흐림 효과
      this.handleBlur(value, isArbitrary || false, styles.effects, preset);
    } else if (property === 'brightness') {
      // 밝기
      this.handleBrightness(value, isArbitrary || false, styles.effects);
    } else if (property === 'contrast') {
      // 대비
      this.handleContrast(value, isArbitrary || false, styles.effects);
    } else if (property === 'grayscale') {
      // 그레이스케일
      this.handleGrayscale(value, isArbitrary || false, styles.effects);
    } else if (property === 'saturate') {
      // 채도
      this.handleSaturate(value, isArbitrary || false, styles.effects);
    } else if (property === 'text-shadow') {
      // 텍스트 그림자
      this.handleTextShadow(value, isArbitrary || false, styles.effects, preset);
    }
  }

  /**
   * 테두리 반경을 처리합니다.
   */
  private static handleBorderRadius(
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles, 
    preset: DesignPreset
  ): void {
    if (!isArbitrary && value in preset.effects.borderRadius) {
      effects.borderRadius = preset.effects.borderRadius[value];
    } else if (isArbitrary) {
      effects.borderRadius = parseInt(value, 10) || 0;
    } else {
      // 숫자 값 처리 (예: rounded-8 => 8px)
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue)) {
        effects.borderRadius = numericValue;
      }
    }
  }

  /**
   * 테두리 너비를 처리합니다.
   */
  private static handleBorderWidth(
    property: string,
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles
  ): void {
    const borderValue = isArbitrary ? parseInt(value, 10) : parseInt(value, 10);
    
    if (!effects.borderWidth) {
      effects.borderWidth = {};
    }
    
    switch (property) {
      case 'border':
        // 모든 방향
        effects.borderWidth = {
          top: borderValue,
          right: borderValue,
          bottom: borderValue,
          left: borderValue,
        };
        break;
      case 'border-t':
        // 상단
        effects.borderWidth.top = borderValue;
        break;
      case 'border-r':
        // 우측
        effects.borderWidth.right = borderValue;
        break;
      case 'border-b':
        // 하단
        effects.borderWidth.bottom = borderValue;
        break;
      case 'border-l':
        // 좌측
        effects.borderWidth.left = borderValue;
        break;
      case 'border-x':
        // 좌우
        effects.borderWidth.left = borderValue;
        effects.borderWidth.right = borderValue;
        break;
      case 'border-y':
        // 상하
        effects.borderWidth.top = borderValue;
        effects.borderWidth.bottom = borderValue;
        break;
    }
  }

  /**
   * 박스 그림자를 처리합니다.
   */
  private static handleBoxShadow(
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles, 
    preset: DesignPreset
  ): void {
    if (!isArbitrary && preset.effects?.boxShadow && value in preset.effects.boxShadow) {
      const shadowValue = preset.effects.boxShadow[value];
      // 배열로 저장 (테스트 호환성)
      effects.boxShadow = Array.isArray(shadowValue) ? shadowValue : [shadowValue];
    } else if (isArbitrary) {
      effects.boxShadow = [value];
    } else if (value in TAILWIND_DEFAULTS.boxShadow) {
      // 프리셋에 없는 경우 Tailwind 기본값 사용
      effects.boxShadow = [TAILWIND_DEFAULTS.boxShadow[value as keyof typeof TAILWIND_DEFAULTS.boxShadow]];
    }
  }

  /**
   * 불투명도를 처리합니다.
   */
  private static handleOpacity(
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles, 
    preset: DesignPreset
  ): void {
    if (!isArbitrary && value in preset.effects.opacity) {
      effects.opacity = preset.effects.opacity[value];
    } else if (isArbitrary) {
      effects.opacity = parseFloat(value) / 100;
    } else {
      // 숫자 값 처리 (예: opacity-50 => 0.5)
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        effects.opacity = numericValue / 100;
      }
    }
  }

  /**
   * 흐림 효과를 처리합니다.
   */
  private static handleBlur(
    value: string, 
    isArbitrary: boolean, 
    effects: EffectsStyles, 
    preset: DesignPreset
  ): void {
    if (!isArbitrary && value in preset.effects.blur) {
      effects.filter = effects.filter ? `${effects.filter} blur(${preset.effects.blur[value]}px)` : `blur(${preset.effects.blur[value]}px)`;
    } else if (isArbitrary) {
      effects.filter = effects.filter ? `${effects.filter} blur(${value})` : `blur(${value})`;
    }
  }

  /**
   * 밝기를 처리합니다.
   */
  private static handleBrightness(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (isArbitrary) {
      effects.brightness = parseFloat(value);
    } else {
      // 숫자 값 처리 (예: brightness-110 => 1.1)
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        effects.brightness = numericValue / 100;
      }
    }
  }

  /**
   * 대비를 처리합니다.
   */
  private static handleContrast(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (isArbitrary) {
      effects.contrast = parseFloat(value);
    } else {
      // 숫자 값 처리 (예: contrast-125 => 1.25)
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        effects.contrast = numericValue / 100;
      }
    }
  }

  /**
   * 그레이스케일을 처리합니다.
   */
  private static handleGrayscale(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (value === '') {
      // grayscale 클래스 (값 없음)
      effects.grayscale = 1;
    } else if (isArbitrary) {
      effects.grayscale = parseFloat(value);
    } else {
      // 숫자 값 처리 (예: grayscale-50 => 0.5)
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        effects.grayscale = numericValue / 100;
      }
    }
  }

  /**
   * 채도를 처리합니다.
   */
  private static handleSaturate(value: string, isArbitrary: boolean, effects: EffectsStyles): void {
    if (isArbitrary) {
      effects.saturate = parseFloat(value);
    } else {
      // 숫자 값 처리 (예: saturate-150 => 1.5)
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        effects.saturate = numericValue / 100;
      }
    }
  }

  /**
   * 텍스트 그림자를 처리합니다.
   */
  private static handleTextShadow(
    value: string,
    isArbitrary: boolean,
    effects: EffectsStyles,
    preset: DesignPreset
  ): void {
    if (!isArbitrary && preset.effects?.textShadow && value in preset.effects.textShadow) {
      // 프리셋에서 먼저 확인
      effects.textShadow = preset.effects.textShadow[value];
    } else if (isArbitrary) {
      effects.textShadow = value;
    } else {
      // 프리셋에 없는 경우 Tailwind 기본값 사용
      const shadowValue = value === '' ? 'DEFAULT' : value;
      if (shadowValue in TAILWIND_DEFAULTS.textShadow) {
        effects.textShadow = TAILWIND_DEFAULTS.textShadow[shadowValue as keyof typeof TAILWIND_DEFAULTS.textShadow];
      }
    }
  }
} 
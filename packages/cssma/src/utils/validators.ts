import type { BaseNode, SceneNode } from '@figma/plugin-typings';

/**
 * 레이아웃 스타일의 유효성을 검사하고 필요한 경우 수정합니다.
 * 특히 w-full, h-full과 같은 스타일이 부모 노드의 레이아웃 모드와 호환되는지 확인합니다.
 */
export function validateLayoutStyles(parent: BaseNode | null, child: SceneNode, styles: string[]): string[] {
  // 부모가 없거나 레이아웃 모드가 없는 경우
  if (!parent || !('layoutMode' in parent)) {
    return styles.map(style => {
      // w-full, h-full을 w-auto, h-auto로 변환
      if (style === 'w-full' || style === 'h-full') {
        return style.replace('full', 'auto');
      }
      return style;
    });
  }

  // 부모에 레이아웃 모드가 있는 경우 스타일을 그대로 유지
  return styles;
}

/**
 * 유효한 회전 값인지 검사합니다.
 */
export function isValidRotation(value: any): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * 유효한 HEX 색상 문자열인지 검사합니다.
 */
export function isValidHexColor(value: string): boolean {
  return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value);
}

/**
 * 유효한 RGB/RGBA 색상 문자열인지 검사합니다.
 */
export function isValidRgbColor(value: string): boolean {
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;
  
  if (rgbRegex.test(value)) {
    const [, r, g, b] = value.match(rgbRegex) || [];
    return Number(r) <= 255 && Number(g) <= 255 && Number(b) <= 255;
  }
  
  if (rgbaRegex.test(value)) {
    const [, r, g, b, a] = value.match(rgbaRegex) || [];
    return Number(r) <= 255 && Number(g) <= 255 && Number(b) <= 255 && Number(a) <= 1;
  }
  
  return false;
}

/**
 * 유효한 숫자 값인지 검사합니다.
 */
export function isValidNumber(value: any, options: { min?: number; max?: number; allowNegative?: boolean } = {}): value is number {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return false;
  }

  const { min, max, allowNegative = true } = options;

  if (!allowNegative && value < 0) {
    return false;
  }

  if (min !== undefined && value < min) {
    return false;
  }

  if (max !== undefined && value > max) {
    return false;
  }

  return true;
}

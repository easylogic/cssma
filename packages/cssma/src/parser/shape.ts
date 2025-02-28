import { ParsedStyle } from '../types';

const OPACITY_MAP = {
  '0': 0,
  '25': 0.25,
  '50': 0.5,
  '75': 0.75,
  '100': 1
} as const;

/**
 * 불투명도 값을 파싱합니다.
 * 1. 퍼센트 값인 경우 0-1 사이의 소수로 변환
 * 2. 일반 숫자인 경우 그대로 사용
 */
function parseOpacityValue(value: string): number | null {
  // 퍼센트 값 처리
  if (value.endsWith('%')) {
    const percent = parseFloat(value.slice(0, -1));
    if (!isNaN(percent) && percent >= 0 && percent <= 100) {
      return percent / 100;
    }
    return null;
  }

  // 일반 숫자 처리
  const opacity = parseFloat(value);
  if (!isNaN(opacity) && opacity >= 0 && opacity <= 1) {
    return opacity;
  }
  return null;
}

export function parseShapeStyleValue(className: string): ParsedStyle | null {
  // Opacity 처리
  if (className.startsWith('opacity-')) {
    // 프리셋 값 처리
    const presetMatch = className.match(/^opacity-(\d+)$/);
    if (presetMatch) {
      const [, value] = presetMatch;
      const opacity = OPACITY_MAP[value as keyof typeof OPACITY_MAP];
      
      if (opacity !== undefined) {
        return {
          property: 'opacity',
          value: opacity,
          variant: 'preset'
        };
      }
    }

    // 임의값 처리
    const arbitraryMatch = className.match(/^opacity-\[([\d.%]+)\]$/);
    if (arbitraryMatch) {
      const [, value] = arbitraryMatch;
      const opacity = parseOpacityValue(value);
      
      if (opacity !== null) {
        return {
          property: 'opacity',
          value: opacity,
          variant: 'arbitrary'
        };
      }
    }
  }

  return null;
} 
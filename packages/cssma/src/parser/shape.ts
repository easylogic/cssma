import { ParsedStyle } from '../types';
import { parseArbitraryValue } from '../utils/converters';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';

const OPACITY_MAP = {
  '0': 0,
  '5': 0.05,
  '10': 0.1,
  '20': 0.2,
  '25': 0.25,
  '30': 0.3,
  '40': 0.4,
  '50': 0.5,
  '60': 0.6,
  '70': 0.7,
  '75': 0.75,
  '80': 0.8,
  '90': 0.9,
  '95': 0.95,
  '100': 1
} as const;

/**
 * 불투명도 값을 파싱합니다.
 * 1. 퍼센트 값인 경우 0-1 사이의 소수로 변환
 * 2. 일반 숫자인 경우 0-1 범위로 정규화
 */
function parseOpacityValue(value: string): number | null {
  // 퍼센트 값 처리
  if (value.endsWith('%')) {
    const percent = parseFloat(value.slice(0, -1));
    if (!isNaN(percent)) {
      if (percent < 0) {
        return null;
      }

      if (percent > 100) {
        return null;
      }

      // 퍼센트를 0-1 사이 값으로 변환하고 범위 제한
      return Math.max(0, Math.min(1, percent / 100));
    }
    return null;
  }

  // 일반 숫자 처리
  const opacity = parseFloat(value);
  if (!isNaN(opacity)) {

    if (opacity < 0) {
      return null;
    }

    // 값이 0-1보다 크면 0-100 스케일로 간주하고 변환
    if (opacity > 1 && opacity <= 100) {
      return opacity / 100;
    }
    // 항상 0-1 범위로 제한
    return Math.max(0, Math.min(1, opacity));
  }
  return null;
}

// 기본적인 변수 경로 유효성 검사 (슬래시 형식)
const isValidVariablePath = (path: string) => {
  return path !== '' && 
         !path.startsWith('/') && 
         !path.endsWith('/') && 
         !path.includes('//');
};

export function parseShapeStyleValue(className: string): ParsedStyle | null {
  // Handle Figma variables
  if (className.includes('$[')) {
    const match = className.match(/^opacity-\$\[(.*?)\]$/);
    if (!match) return null;

    const variableId = extractFigmaVariableId(`$[${match[1]}]`);
    if (!variableId) return null;

    return createFigmaVariableStyle('opacity', variableId);
  }

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
    const arbitraryMatch = className.match(/^opacity-\[([\d.%]+(?:px)?)\]$/);
    if (arbitraryMatch) {
      const [, value] = arbitraryMatch;
      // px 단위 제거 (Tailwind에서 간혹 px 단위가 포함될 수 있음)
      const cleanValue = value.replace('px', '');
      const opacity = parseOpacityValue(cleanValue);
      
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
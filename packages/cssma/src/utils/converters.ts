import { ParsedStyle, FigmaColor, FigmaFontName, FigmaLineHeight, Shadow } from '../types';
import { isValidHexColor, isValidRgbColor } from './validators';

/**
 * 각도를 라디안으로 변환합니다.
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export type ParsedValue = {
  value: number | string | FigmaColor | FigmaFontName | FigmaLineHeight | Shadow[];
  variant: 'preset' | 'arbitrary' | 'figma-variable';
  variableId?: string;
};

/**
 * 값의 타입을 파싱합니다.
 * 1. Figma 변수 ($[...])
 * 2. 임의 값 ([...])
 * 3. 일반 값
 */
export function parseValue(value: string): ParsedValue | null {
  // Figma 변수 처리
  if (value.startsWith('$[') && value.endsWith(']')) {
    const variablePath = value.slice(2, -1);
    return {
      value: variablePath,
      variant: 'figma-variable',
      variableId: variablePath
    };
  }

  // 임의 값 처리
  if (value.startsWith('[') && value.endsWith(']')) {
    const innerValue = value.slice(1, -1);
    return {
      value: innerValue,
      variant: 'arbitrary'
    };
  }

  // 일반 값은 null 반환 (프리셋 처리는 각 파서에서)
  return null;
}

/**
 * 임의 값을 파싱합니다.
 */
export function parseArbitraryValue(value: string, options: { 
  allowNegative?: boolean;
  allowUnits?: boolean;
  allowColors?: boolean;
  requireValidColor?: boolean;
  allowFigmaVariables?: boolean;
} = {}): ParsedValue | null {
  const { 
    allowNegative = false, 
    allowUnits = true, 
    allowColors = true,
    requireValidColor = false,
    allowFigmaVariables = false
  } = options;

  // Figma 변수 처리
  if (allowFigmaVariables && value.startsWith('$[') && value.endsWith(']')) {
    const variablePath = value.slice(2, -1);
    
    // 변수 경로 유효성 검사
    // 1. 빈 경로가 아니어야 함
    // 2. 시작이나 끝이 '/'가 아니어야 함
    // 3. 연속된 '/'가 없어야 함
    if (!variablePath || 
        variablePath.startsWith('/') || 
        variablePath.endsWith('/') ||
        variablePath.includes('//')) {
      return null;
    }

    return {
      value: variablePath,
      variant: 'figma-variable',
      variableId: variablePath
    };
  }

  // 임의 값 처리
  if (value.startsWith('[') && value.endsWith(']')) {
    const innerValue = value.slice(1, -1);
    
    // 색상 처리
    if (allowColors) {
      const isHexColor = innerValue.startsWith('#');
      const isRgbColor = innerValue.startsWith('rgb');
      
      if (isHexColor || isRgbColor) {
        const isValidColor = isHexColor ? isValidHexColor(innerValue) : isValidRgbColor(innerValue);
        
        // 유효하지 않은 색상이고 색상 검증이 필요한 경우
        if (!isValidColor && requireValidColor) {
          return null;
        }

        if (isValidColor) {
          return {
            value: innerValue,
            variant: 'arbitrary'
          };
        }
      }
    }
    
    // 단위가 있는 경우
    if (allowUnits) {
      const unitMatch = innerValue.match(/^(-?\d*\.?\d+)(px|rem|em)?$/);
      if (unitMatch) {
        const [, num, unit = 'px'] = unitMatch;
        const numValue = parseFloat(num);
        
        if (!allowNegative && numValue < 0) return null;
        
        // 단위 변환
        switch (unit) {
          case 'px':
            return { value: numValue, variant: 'arbitrary' };
          case 'rem':
          case 'em':
            return { value: numValue * 16, variant: 'arbitrary' };
        }
      }
    }
    
    // 단순 숫자
    const numValue = parseFloat(innerValue);
    if (!isNaN(numValue)) {
      if (!allowNegative && numValue < 0) return null;
      return { value: numValue, variant: 'arbitrary' };
    }

    // 그 외의 문자열 값 (색상 검증이 필요한 경우 또는 단위가 필요한 경우 null 반환)
    if (requireValidColor || allowUnits) {
      return null;
    }

    return {
      value: innerValue,
      variant: 'arbitrary'
    };
  }

  return null;
}

/**
 * 비율 값을 파싱합니다.
 */
export function parseRatioValue(value: string): number | null {
  if (!/^\d+\/\d+$/.test(value)) return null;

  const [width, height] = value.split('/').map(Number);
  if (isNaN(width) || isNaN(height)) return null;
  if (width <= 0 || height <= 0) return null;
  if (height === 0) return null;

  return width / height;
}

/**
 * 퍼센트 값을 소수로 변환합니다.
 */
export function percentToDecimal(value: string): number | null {
  if (!value.endsWith('%')) return null;
  
  const num = parseFloat(value.slice(0, -1));
  if (isNaN(num)) return null;
  
  return num / 100;
} 
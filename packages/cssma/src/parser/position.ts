import { ParsedStyle } from '../types';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';

const POSITION_TYPE_MAP = {
  'absolute': 'ABSOLUTE',
  'relative': 'RELATIVE',
  'fixed': 'FIXED'
} as const;

const Z_INDEX_MAP = {
  '0': 0,
  '10': 10,
  '20': 20,
  '30': 30,
  '40': 40,
  '50': 50
} as const;

// 소수점 3자리까지 반올림
function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function parsePositionValue(value: string): { value: number; isPercent: boolean } | null {
  // 퍼센트 값 처리
  if (value.endsWith('%')) {
    const num = parseFloat(value.slice(0, -1));
    return !isNaN(num) ? { value: round(num / 100), isPercent: true } : null;
  }
  
  // 픽셀 값 처리
  if (value.endsWith('px')) {
    value = value.slice(0, -2);
  }
  const num = parseFloat(value);
  return !isNaN(num) ? { value: round(num), isPercent: false } : null;
}

function parseMixedPositionValues(value: string): (number | null)[] {
  return value.split('_').map(part => {
    const parsed = parsePositionValue(part);
    if (!parsed) return null;
    return parsed.value;
  });
}

type ConstraintValue = 'SCALE' | 'MIN' | 'MAX' | 'CENTER' | 'STRETCH';
type Constraints = {
  horizontal?: ConstraintValue;
  vertical?: ConstraintValue;
};

function getPositionConstraints(direction: string, isPercent: boolean = false): Constraints {
  switch (direction) {
    case 'left':
      return { horizontal: isPercent ? 'SCALE' : 'MIN' };
    case 'right':
      return { horizontal: isPercent ? 'SCALE' : 'MAX' };
    case 'top':
      return { vertical: isPercent ? 'SCALE' : 'MIN' };
    case 'bottom':
      return { vertical: isPercent ? 'SCALE' : 'MAX' };
    case 'inset':
      return { horizontal: 'SCALE', vertical: 'SCALE' };
    default:
      return {};
  }
}

export function parsePositionStyleValue(className: string): ParsedStyle | null {
  // Position type 처리
  if (POSITION_TYPE_MAP[className as keyof typeof POSITION_TYPE_MAP]) {
    return {
      property: 'position',
      value: POSITION_TYPE_MAP[className as keyof typeof POSITION_TYPE_MAP],
      variant: 'preset'
    };
  }

  // Z-index 처리
  if (className.startsWith('z-')) {
    const value = className.replace('z-', '');
    
    // 임의값 처리
    if (value.startsWith('[') && value.endsWith(']')) {
      const zIndex = parseInt(value.slice(1, -1));
      if (!isNaN(zIndex) && zIndex >= 0) {
        return {
          property: 'zIndex',
          value: zIndex,
          variant: 'arbitrary'
        };
      }
      return null;
    }

    // 프리셋 값 처리
    const preset = Z_INDEX_MAP[value as keyof typeof Z_INDEX_MAP];
    if (preset !== undefined) {
      return {
        property: 'zIndex',
        value: preset,
        variant: 'preset'
      };
    }
  }

  // Position values 처리
  const positionMatch = className.match(/^(top|right|bottom|left|inset)-(.+)$/);
  if (positionMatch) {
    const [, direction, value] = positionMatch;

    // Figma 변수 처리
    if (value.startsWith('$[')) {
      const variableId = extractFigmaVariableId(value);
      if (!variableId) return null;

      const style = createFigmaVariableStyle(
        direction === 'inset' ? 'position' : direction,
        variableId
      );

      return {
        ...style,
        constraints: getPositionConstraints(direction)
      };
    }

    // 프리셋 값 처리 (0)
    if (value === '0') {
      return {
        property: direction === 'inset' ? 'position' : direction,
        value: 0,
        variant: 'preset',
        constraints: getPositionConstraints(direction)
      };
    }

    // 임의값 처리
    if (value.startsWith('[') && value.endsWith(']')) {
      const innerValue = value.slice(1, -1);

      // Mixed position values 처리 (inset의 경우)
      if (direction === 'inset' && innerValue.includes('_')) {
        const values = parseMixedPositionValues(innerValue);
        if (values.every(v => v !== null)) {
          return {
            property: 'position',
            value: values as number[],
            variant: 'arbitrary',
            constraints: { horizontal: 'SCALE', vertical: 'SCALE' }
          };
        }
        return null;
      }

      // 단일 값 처리
      const posValue = parsePositionValue(innerValue);
      if (posValue) {
        return {
          property: direction === 'inset' ? 'position' : direction,
          value: posValue.value,
          variant: 'arbitrary',
          constraints: getPositionConstraints(direction, posValue.isPercent)
        };
      }
    }
  }

  return null;
} 
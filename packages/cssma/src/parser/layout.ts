import { ParsedStyle } from '../types';

const LAYOUT_WRAP_MAP = {
  'wrap': 'WRAP',
  'nowrap': 'NO_WRAP'
} as const;

const PRIMARY_AXIS_ALIGN_MAP = {
  'justify-start': 'MIN',
  'justify-center': 'CENTER',
  'justify-end': 'MAX',
  'justify-between': 'SPACE_BETWEEN'
} as const;

const COUNTER_AXIS_ALIGN_MAP = {
  'items-start': 'MIN',
  'items-center': 'CENTER',
  'items-end': 'MAX',
  'items-baseline': 'BASELINE'
} as const;

/**
 * 임의 값에서 숫자를 추출합니다.
 * @param value 파싱할 값
 * @param allowNegative 음수 허용 여부 (기본값: false)
 * @returns 파싱된 숫자 또는 null
 */
function parseArbitraryValue(value: string, allowNegative: boolean = false): number | null {
  const match = value.match(/^\[([-\d.]+)(?:px)?\]$/);
  if (!match) return null;
  
  const num = parseFloat(match[1]);
  if (isNaN(num)) return null;
  
  // 음수가 허용되지 않는 경우 음수 값은 null 반환
  if (!allowNegative && num < 0) return null;
  
  return num;
}

/**
 * Layout 관련 스타일을 파싱합니다.
 */
export function parseLayoutValue(className: string): ParsedStyle | null {
  // Flex direction
  if (className === 'flex-row') {
    return {
      property: 'layoutMode',
      value: 'HORIZONTAL',
      variant: 'preset'
    };
  }

  if (className === 'flex-col') {
    return {
      property: 'layoutMode',
      value: 'VERTICAL',
      variant: 'preset'
    };
  }

  // Flex wrap
  if (className in LAYOUT_WRAP_MAP) {
    return {
      property: 'layoutWrap',
      value: LAYOUT_WRAP_MAP[className as keyof typeof LAYOUT_WRAP_MAP],
      variant: 'preset'
    };
  }

  // Alignment
  if (className in COUNTER_AXIS_ALIGN_MAP) {
    return {
      property: 'counterAxisAlignItems',
      value: COUNTER_AXIS_ALIGN_MAP[className as keyof typeof COUNTER_AXIS_ALIGN_MAP],
      variant: 'preset'
    };
  }

  if (className in PRIMARY_AXIS_ALIGN_MAP) {
    return {
      property: 'primaryAxisAlignItems',
      value: PRIMARY_AXIS_ALIGN_MAP[className as keyof typeof PRIMARY_AXIS_ALIGN_MAP],
      variant: 'preset'
    };
  }

  // Size
  if (className === 'w-full') {
    return {
      property: 'layoutSizingHorizontal',
      value: 'FILL',
      variant: 'preset'
    };
  }

  if (className === 'w-auto') {
    return {
      property: 'layoutSizingHorizontal',
      value: 'HUG',
      variant: 'preset'
    };
  }

  if (className === 'h-full') {
    return {
      property: 'layoutSizingVertical',
      value: 'FILL',
      variant: 'preset'
    };
  }

  if (className === 'h-auto') {
    return {
      property: 'layoutSizingVertical',
      value: 'HUG',
      variant: 'preset'
    };
  }

  // 임의값 처리
  if (className.startsWith('w-')) {
    const value = className.slice(2); // 'w-' 제거
    const size = parseArbitraryValue(value);
    if (size !== null) {
      return {
        property: 'width',
        value: size,
        variant: 'arbitrary'
      };
    }
  }

  if (className.startsWith('h-')) {
    const value = className.slice(2); // 'h-' 제거
    const size = parseArbitraryValue(value);
    if (size !== null) {
      return {
        property: 'height',
        value: size,
        variant: 'arbitrary'
      };
    }
  }

  return null;
} 
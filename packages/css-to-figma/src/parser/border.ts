import { ParsedStyle } from '../types';
import { COLORS, RADIUS } from '../config/tokens';
import { isValidHexColor, isValidRgbColor } from '../utils/colors';

const BORDER_STYLE_MAP = {
  'solid': 'SOLID',
  'dashed': 'DASHED',
  'dotted': 'DOTTED'
} as const;

type RadiusPosition = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'br' | 'bl';

const RADIUS_POSITION_MAP: Record<RadiusPosition, string> = {
  't': 'borderRadiusTop',
  'r': 'borderRadiusRight',
  'b': 'borderRadiusBottom',
  'l': 'borderRadiusLeft',
  'tl': 'borderRadiusTopLeft',
  'tr': 'borderRadiusTopRight',
  'br': 'borderRadiusBottomRight',
  'bl': 'borderRadiusBottomLeft'
};

export function parseBorderStyleValue(className: string): ParsedStyle | null {
  // 기본 border 처리
  if (className === 'border') {
    return {
      property: 'borderWidth',
      value: 1,
      variant: 'preset'
    };
  }

  // 임의값 처리 ([...] 형식)
  if (className.includes('[') && className.includes(']')) {
    const match = className.match(/^([a-z-]+)-\[(.*?)\]$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // 보더 색상 처리
    if (type === 'border' && (value.startsWith('#') || value.startsWith('rgb'))) {
      if (!isValidHexColor(value) && !isValidRgbColor(value)) {
        return null;
      }
      return {
        property: 'borderColor',
        value,
        variant: 'arbitrary'
      };
    }

    // 보더 너비 처리
    if (type === 'border') {
      const width = parseFloat(value);
      if (!isNaN(width)) {
        return {
          property: 'borderWidth',
          value: width,
          variant: 'arbitrary'
        };
      }
    }

    // 보더 반경 처리 - 임의값
    if (type.startsWith('rounded')) {
      const radius = parseFloat(value);
      if (!isNaN(radius)) {
        // 위치 지정이 있는 경우 (예: rounded-t-[8])
        const position = type.replace('rounded-', '') as RadiusPosition;
        if (position && RADIUS_POSITION_MAP[position]) {
          return {
            property: RADIUS_POSITION_MAP[position],
            value: radius,
            variant: 'arbitrary'
          };
        }
        // 전체 적용
        return {
          property: 'borderRadius',
          value: radius,
          variant: 'arbitrary'
        };
      }
    }
  }

  // 프리셋 값 처리
  if (className.startsWith('border-')) {
    const value = className.replace('border-', '');

    // Border color
    if (COLORS[value]) {
      return {
        property: 'borderColor',
        value: COLORS[value],
        variant: 'preset'
      };
    }

    // Border style
    if (BORDER_STYLE_MAP[value as keyof typeof BORDER_STYLE_MAP]) {
      return {
        property: 'borderStyle',
        value: BORDER_STYLE_MAP[value as keyof typeof BORDER_STYLE_MAP],
        variant: 'preset'
      };
    }

    // Border width
    if (value === 'none') {
      return {
        property: 'borderWidth',
        value: 0,
        variant: 'preset'
      };
    }

    const width = parseInt(value);
    if (!isNaN(width)) {
      return {
        property: 'borderWidth',
        value: width,
        variant: 'preset'
      };
    }
  }

  // Border radius
  if (className.startsWith('rounded')) {
    const parts = className.split('-');
    
    // 기본 rounded
    if (parts.length === 1) {
      return {
        property: 'borderRadius',
        value: RADIUS.DEFAULT,
        variant: 'preset'
      };
    }

    // rounded-none
    if (parts[1] === 'none') {
      return {
        property: 'borderRadius',
        value: 0,
        variant: 'preset'
      };
    }

    // 위치가 있는 경우 (예: rounded-t-lg)
    if (parts.length === 3) {
      const position = parts[1] as RadiusPosition;
      const size = parts[2];
      
      if (RADIUS_POSITION_MAP[position]) {
        return {
          property: RADIUS_POSITION_MAP[position],
          value: RADIUS[size] || RADIUS.DEFAULT,
          variant: 'preset'
        };
      }
    }

    // 일반 프리셋 (예: rounded-lg)
    const size = parts[1];
    if (RADIUS[size]) {
      return {
        property: 'borderRadius',
        value: RADIUS[size],
        variant: 'preset'
      };
    }
  }

  return null;
}

function getBorderRadiusProperty(className: string): string {
  if (className === 'rounded' || className.startsWith('rounded-[')) {
    return 'borderRadius';
  }

  const map: Record<string, string> = {
    'rounded-t': 'borderRadiusTop',
    'rounded-r': 'borderRadiusRight',
    'rounded-b': 'borderRadiusBottom',
    'rounded-l': 'borderRadiusLeft',
    'rounded-tl': 'borderRadiusTopLeft',
    'rounded-tr': 'borderRadiusTopRight',
    'rounded-br': 'borderRadiusBottomRight',
    'rounded-bl': 'borderRadiusBottomLeft'
  };

  for (const [prefix, property] of Object.entries(map)) {
    if (className.startsWith(prefix)) {
      return property;
    }
  }

  return 'borderRadius';
} 
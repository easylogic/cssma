import { ParsedStyle } from '../types';
import { COLORS, RADIUS } from '../config/tokens';
import { isValidHexColor, isValidRgbColor } from '../utils/colors';
import { parseArbitraryValue } from '../utils/converters';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';

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
    const match = className.match(/^([a-z-]+)-(\$?\[.*?\])$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // border-dashed-[value] 형태 처리
    if (type === 'border-dashed') {
      // Figma 변수인 경우
      if (value.startsWith('$[')) {
        const parsedValue = parseArbitraryValue(value, {
          allowFigmaVariables: true
        });
        
        if (parsedValue?.variant === 'figma-variable') {
          return {
            property: 'dashPattern',
            value: parsedValue.value,
            variant: 'figma-variable',
            variableId: parsedValue.variableId
          };
        }
        return null;
      }

      // 쉼표로 구분된 값들을 배열로 변환
      const dashValues = value.slice(1, -1).split(',').map(v => parseFloat(v.trim()));
      
      // 모든 값이 유효한 숫자인지 확인
      if (dashValues.every(v => !isNaN(v))) {
        return {
          property: 'dashPattern',
          value: dashValues,
          variant: 'arbitrary'
        };
      }
      return null;
    }
    
    // Figma 변수 경로 유효성 검사 함수
    const isValidVariablePath = (path: string, prefix?: string) => {
      const isValidFormat = path !== '' && 
                          !path.startsWith('/') && 
                          !path.endsWith('/') && 
                          !path.includes('//');
      
      if (!isValidFormat) return false;
      if (prefix && !path.startsWith(prefix)) return false;
      
      return true;
    };

    // Figma 변수 경로 추출 및 검증
    if (value.startsWith('$[')) {
      const variableId = extractFigmaVariableId(value);
      if (!variableId) return null;
      
      // rounded- 관련 변수는 radii/ 로 시작해야 함
      if (type.startsWith('rounded') && !variableId.startsWith('radii/')) {
        return null;
      }

      // 보더 반경 처리
      if (type.startsWith('rounded')) {
        const position = type.replace('rounded-', '') as RadiusPosition;
        const property = position && RADIUS_POSITION_MAP[position] ? 
                        RADIUS_POSITION_MAP[position] : 
                        'borderRadius';
        return createFigmaVariableStyle(property, variableId);
      }
      
      // 명시적 보더 색상 처리
      if (type === 'border-color') {
        return createFigmaVariableStyle('borderColor', variableId);
      }
      
      // 명시적 보더 너비 처리
      if (type === 'border-width') {
        return createFigmaVariableStyle('borderWidth', variableId);
      }
      
      // 기존 border- 처리 (숫자만 허용)
      if (type === 'border') {
        return createFigmaVariableStyle('borderWidth', variableId);
      }
    }

    // 보더 색상, 너비, 반경 처리
    const parsedValue = parseArbitraryValue(value, {
      allowNegative: type.startsWith('rounded'),
      allowUnits: true,
      allowColors: type === 'border-color' || type === 'border',
      allowFigmaVariables: true
    });

    if (parsedValue !== null) {
      let property: string;
      
      // 보더 반경 처리
      if (type.startsWith('rounded')) {
        const position = type.replace('rounded-', '') as RadiusPosition;
        property = position && RADIUS_POSITION_MAP[position] ? 
                  RADIUS_POSITION_MAP[position] : 
                  'borderRadius';
      }
      // 명시적 보더 색상 처리
      else if (type === 'border-color') {
        property = 'borderColor';
      }
      // 명시적 보더 너비 처리
      else if (type === 'border-width') {
        property = 'borderWidth';
      }
      // 기존 border- 처리 (숫자 또는 색상 리터럴만 허용)
      else if (type === 'border') {
        if (parsedValue.variant === 'figma-variable') {
          // Figma 변수의 경우 숫자로만 처리
          property = 'borderWidth';
        } else {
          // 리터럴 값은 타입에 따라 처리
          property = (typeof parsedValue.value === 'string' && 
                     (parsedValue.value.startsWith('#') || parsedValue.value.startsWith('rgb'))) ?
                    'borderColor' : 'borderWidth';
        }
      }
      else {
        return null;
      }

      const result: ParsedStyle = {
        property,
        value: parsedValue.value,
        variant: parsedValue.variant
      };

      if (parsedValue.variant === 'figma-variable' && parsedValue.variableId) {
        result.variableId = parsedValue.variableId;
      }

      return result;
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
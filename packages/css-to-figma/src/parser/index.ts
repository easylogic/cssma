import { COLORS, FONT_SIZES, RADIUS, TEXT_ALIGNMENTS } from '../config/tokens';
import { ParsedStyle } from '../types';
import { parseBackgroundStyleValue } from './background';
import { parseBorderStyleValue } from './border';
import { parseFontStyleValue } from './font';
import { parseTextStyleValue } from './text';

type PropertyPrefix = 
  | 'w' | 'h' | 'min-w' | 'min-h' | 'max-w' | 'max-h'
  | 'p' | 'pt' | 'pr' | 'pb' | 'pl' | 'px' | 'py'
  | 'gap' | 'gap-x' | 'gap-y'
  | 'flex-row' | 'flex-col'
  | 'items' | 'justify';

const PROPERTY_PREFIXES: Record<PropertyPrefix, string> = {
  // Layout
  'w': 'width',
  'h': 'height',
  'min-w': 'minWidth',
  'min-h': 'minHeight',
  'max-w': 'maxWidth',
  'max-h': 'maxHeight',

  // Flex
  'flex-row': 'layoutMode',
  'flex-col': 'layoutMode',
  'items': 'counterAxisAlignItems',
  'justify': 'primaryAxisAlignItems',

  // Spacing
  'p': 'padding',
  'pt': 'paddingTop',
  'pr': 'paddingRight',
  'pb': 'paddingBottom',
  'pl': 'paddingLeft',
  'px': 'paddingX',
  'py': 'paddingY',
  'gap': 'gap',
  'gap-x': 'columnGap',
  'gap-y': 'rowGap'
};

type StyleType = 'preset' | 'arbitrary';

function isValidHexColor(value: string): boolean {
  return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value);
}

function isValidRgbColor(value: string): boolean {
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

const BLEND_MODES: Record<string, string> = {
  'normal': 'NORMAL',
  'multiply': 'MULTIPLY',
  'screen': 'SCREEN',
  'overlay': 'OVERLAY'
};

/**
 * Tailwind CSS 스타일 값을 파싱합니다.
 * 프리셋 값과 임의 값 모두 처리합니다.
 */
export function parseStyleValue(className: string): ParsedStyle | null {
  // Background 관련 처리를 위임
  if (className.startsWith('bg-') || 
      className.startsWith('from-') || 
      className.startsWith('via-') || 
      className.startsWith('to-')) {
    return parseBackgroundStyleValue(className);
  }

  // Text 관련 처리를 위임
  if (className.startsWith('text-') || 
      className === 'underline' || 
      className === 'line-through' || 
      className === 'no-underline') {
    return parseTextStyleValue(className);
  }

  // Font 관련 처리를 위임
  if (className.startsWith('font-')) {
    return parseFontStyleValue(className);
  }

  // Border 관련 처리를 위임
  if (className.startsWith('border-') || className.startsWith('rounded')) {
    return parseBorderStyleValue(className);
  }

  // 임의값 처리 ([...] 형식)
  if (className.includes('[') && className.includes(']')) {
    const match = className.match(/^([a-z-]+)-\[(.*?)\]$/);
    if (!match) return null;

    const [, prefix, value] = match;
    
    // 숫자값 처리
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      switch (prefix) {
        case 'w':
          return { property: 'width', value: numericValue, variant: 'arbitrary' };
        case 'h':
          return { property: 'height', value: numericValue, variant: 'arbitrary' };
        case 'p':
          return { property: 'padding', value: numericValue, variant: 'arbitrary' };
        case 'pt':
          return { property: 'paddingTop', value: numericValue, variant: 'arbitrary' };
        case 'pr':
          return { property: 'paddingRight', value: numericValue, variant: 'arbitrary' };
        case 'pb':
          return { property: 'paddingBottom', value: numericValue, variant: 'arbitrary' };
        case 'pl':
          return { property: 'paddingLeft', value: numericValue, variant: 'arbitrary' };
        case 'gap':
          return { property: 'gap', value: numericValue, variant: 'arbitrary' };
        case 'gap-x':
          return { property: 'columnGap', value: numericValue, variant: 'arbitrary' };
        case 'gap-y':
          return { property: 'rowGap', value: numericValue, variant: 'arbitrary' };
        case 'opacity':
          return { property: 'opacity', value: numericValue, variant: 'arbitrary' };
      }
    }

    return null;
  }

  // 레이아웃 방향
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

  // 정렬
  if (className.startsWith('items-')) {
    const value = className.replace('items-', '');
    const alignMap: Record<string, string> = {
      'start': 'MIN',
      'center': 'CENTER',
      'end': 'MAX',
      'baseline': 'BASELINE'
    };
    if (alignMap[value]) {
      return {
        property: 'counterAxisAlignItems',
        value: alignMap[value],
        variant: 'preset'
      };
    }
  }

  if (className.startsWith('justify-')) {
    const value = className.replace('justify-', '');
    const alignMap: Record<string, string> = {
      'start': 'MIN',
      'center': 'CENTER',
      'end': 'MAX',
      'between': 'SPACE_BETWEEN'
    };
    if (alignMap[value]) {
      return {
        property: 'primaryAxisAlignItems',
        value: alignMap[value],
        variant: 'preset'
      };
    }
  }

  // gap 처리
  if (className.startsWith('gap-')) {
    const gapMatch = className.match(/^gap-(x|y)?-(\d+)$/);
    if (gapMatch) {
      const [, direction, value] = gapMatch;
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        if (direction === 'x') {
          return {
            property: 'columnGap',
            value: numericValue,
            variant: 'preset'
          };
        } else if (direction === 'y') {
          return {
            property: 'rowGap',
            value: numericValue,
            variant: 'preset'
          };
        } else {
          return {
            property: 'gap',
            value: numericValue,
            variant: 'preset'
          };
        }
      }
    }
  }

  // 크기 관련
  if (className.startsWith('w-')) {
    const size = className.replace('w-', '');
    return {
      property: 'width',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('h-')) {
    const size = className.replace('h-', '');
    return {
      property: 'height',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('min-w-')) {
    const size = className.replace('min-w-', '');
    return {
      property: 'minWidth',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('min-h-')) {
    const size = className.replace('min-h-', '');
    return {
      property: 'minHeight',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('max-w-')) {
    const size = className.replace('max-w-', '');
    return {
      property: 'maxWidth',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('max-h-')) {
    const size = className.replace('max-h-', '');
    return {
      property: 'maxHeight',
      value: size,
      variant: 'preset' 
    };
  }

  if (className.startsWith('p-')) {
    const size = className.replace('p-', '');
    return {
      property: 'padding',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('pt-')) {
    const size = className.replace('pt-', '');
    return {
      property: 'paddingTop',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('pr-')) {
    const size = className.replace('pr-', '');
    return {
      property: 'paddingRight',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('pb-')) {
    const size = className.replace('pb-', '');
    return {
      property: 'paddingBottom',
      value: size,
      variant: 'preset'
    };
  }

  if (className.startsWith('pl-')) {
    const size = className.replace('pl-', '');
    return {
      property: 'paddingLeft',
      value: size,
      variant: 'preset'
    };
  }
  
  return null;
}

/**
 * 여러 클래스를 파싱합니다.
 */
export function parseClasses(classNames: string = ''): ParsedStyle[] {
  return classNames
    .split(' ')
    .filter(Boolean)
    .map(parseStyleValue)
    .filter((style): style is ParsedStyle => style !== null);
} 
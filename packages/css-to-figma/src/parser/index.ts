import { ParsedStyle } from '../types';

type PropertyPrefix = 
  | 'w' | 'h' | 'min-w' | 'min-h' | 'max-w' | 'max-h'
  | 'p' | 'pt' | 'pr' | 'pb' | 'pl' | 'px' | 'py'
  | 'gap' | 'gap-x' | 'gap-y'
  | 'bg' | 'text' | 'border'
  | 'opacity' | 'shadow' | 'blur'
  | 'rounded' | 'rounded-t' | 'rounded-r' | 'rounded-b' | 'rounded-l'
  | 'rounded-tl' | 'rounded-tr' | 'rounded-br' | 'rounded-bl'
  | 'flex-row' | 'flex-col'
  | 'items' | 'justify'
  | 'font-bold' | 'text-xl';

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
  'gap-y': 'rowGap',

  // Colors
  'bg': 'backgroundColor',
  'text': 'color',
  'border': 'borderColor',

  // Effects
  'opacity': 'opacity',
  'shadow': 'boxShadow',
  'blur': 'blur',

  // Border
  'rounded': 'borderRadius',
  'rounded-t': 'borderRadiusTop',
  'rounded-r': 'borderRadiusRight',
  'rounded-b': 'borderRadiusBottom',
  'rounded-l': 'borderRadiusLeft',
  'rounded-tl': 'borderRadiusTopLeft',
  'rounded-tr': 'borderRadiusTopRight',
  'rounded-br': 'borderRadiusBottomRight',
  'rounded-bl': 'borderRadiusBottomLeft',

  // Typography
  'font-bold': 'fontWeight',
  'text-xl': 'fontSize'
};

/**
 * 임의값 구문을 파싱합니다.
 * 예: w-[100px] -> { property: 'width', value: '100', unit: 'px' }
 */
export function parseArbitraryValue(className: string): ParsedStyle | null {
  const match = className.match(/^([a-z-]+)-\[(.*?)(px|rem|em|%)?]$/);
  if (!match) return null;

  const [, prefix, value, unit] = match;
  const property = PROPERTY_PREFIXES[prefix as PropertyPrefix];
  if (!property) return null;

  return {
    property,
    value: value.startsWith('#') ? value : value,
    unit: unit || undefined,
    variant: 'arbitrary'
  };
}

/**
 * 프리셋 값을 파싱합니다.
 * 예: w-full -> { property: 'width', value: 'full' }
 */
export function parsePresetValue(className: string): ParsedStyle | null {
  // 특별한 케이스 처리
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
  if (className === 'font-bold') {
    return {
      property: 'fontWeight',
      value: 'bold',
      variant: 'preset'
    };
  }
  if (className === 'text-xl') {
    return {
      property: 'fontSize',
      value: 'xl',
      variant: 'preset'
    };
  }

  // 그라디언트 방향 처리
  if (className.startsWith('bg-gradient-')) {
    return {
      property: 'backgroundColor',
      value: 'gradient',
      variant: 'preset'
    };
  }

  // 그라디언트 색상 처리
  if (className.startsWith('from-[') || className.startsWith('to-[')) {
    const match = className.match(/^(from|to)-\[(.*?)]$/);
    if (match) {
      const [, type, color] = match;
      return {
        property: type === 'from' ? 'gradientFrom' : 'gradientTo',
        value: color,
        variant: 'arbitrary'
      };
    }
  }

  // 그림자 처리
  if (className.startsWith('shadow-')) {
    const size = className.replace('shadow-', '');
    return {
      property: 'boxShadow',
      value: size,
      variant: 'preset'
    };
  }

  // items-{value} 처리
  const itemsMatch = className.match(/^items-([a-z]+)$/);
  if (itemsMatch) {
    return {
      property: 'counterAxisAlignItems',
      value: itemsMatch[1],
      variant: 'preset'
    };
  }

  // justify-{value} 처리
  const justifyMatch = className.match(/^justify-([a-z]+)$/);
  if (justifyMatch) {
    return {
      property: 'primaryAxisAlignItems',
      value: justifyMatch[1],
      variant: 'preset'
    };
  }

  const match = className.match(/^([a-z-]+)-([a-z0-9]+)$/);
  if (!match) return null;

  const [, prefix, value] = match;
  const property = PROPERTY_PREFIXES[prefix as PropertyPrefix];
  if (!property) return null;

  return {
    property,
    value,
    variant: 'preset'
  };
}

/**
 * 단일 클래스를 파싱합니다.
 */
export function parseClass(className: string): ParsedStyle | null {
  return parseArbitraryValue(className) || parsePresetValue(className);
}

/**
 * 여러 클래스를 파싱합니다.
 */
export function parseClasses(classNames: string): ParsedStyle[] {
  return classNames
    .split(' ')
    .filter(Boolean)
    .map(parseClass)
    .filter((style): style is ParsedStyle => style !== null);
} 
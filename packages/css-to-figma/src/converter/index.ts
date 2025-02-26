import { ParsedStyle } from '../types';
import { FigmaStyleProperties, FigmaColor, FigmaPaint } from '../types';

interface ConversionContext {
  parentLayoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
}

function parseColorToFigma(value: string): FigmaColor | null {
  // #RRGGBB 형식 처리
  if (value.startsWith('#')) {
    const hex = value.slice(1);
    if (hex.length !== 6) return null;
    
    try {
      return {
        r: parseInt(hex.slice(0, 2), 16) / 255,
        g: parseInt(hex.slice(2, 4), 16) / 255,
        b: parseInt(hex.slice(4, 6), 16) / 255
      };
    } catch {
      return null;
    }
  }
  
  return null;
}

function convertSize(value: string | number, unit?: string): number | null {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return null;
  
  switch (unit) {
    case 'px':
      return numValue;
    case 'rem':
      return numValue * 16;
    case 'em':
      return numValue * 16;
    case '%':
      return numValue / 100;
    default:
      return numValue;
  }
}

function convertPresetColor(value: string): FigmaColor | null {
  switch (value) {
    case 'white':
      return { r: 1, g: 1, b: 1 };
    case 'black':
      return { r: 0, g: 0, b: 0 };
    default:
      return null;
  }
}

function convertPresetRadius(value: string): number | null {
  const RADIUS_MAP: Record<string, number> = {
    'sm': 4,
    'md': 6,
    'lg': 8,
    'xl': 12,
    '2xl': 16,
    'full': 9999
  };
  return RADIUS_MAP[value] || null;
}

function convertGeometry(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = { geometry: {} };

  if (style.property === 'borderRadius') {
    const radius = style.variant === 'arbitrary' 
      ? convertSize(style.value, style.unit)
      : convertPresetRadius(style.value as string);
    
    if (radius !== null) {
      result.geometry!.cornerRadius = radius;
    }
  }

  if (Object.keys(result.geometry!).length === 0) {
    delete result.geometry;
  }

  return result;
}

function convertLayout(style: ParsedStyle, context: ConversionContext): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = { layout: {} };

  switch (style.property) {
    case 'layoutMode': {
      result.layout!.layoutMode = style.value as 'HORIZONTAL' | 'VERTICAL';
      break;
    }

    case 'counterAxisAlignItems': {
      const alignMap: Record<string, string> = {
        'start': 'MIN',
        'center': 'CENTER',
        'end': 'MAX',
        'baseline': 'BASELINE'
      };
      result.layout!.counterAxisAlignItems = alignMap[style.value as string] as 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
      break;
    }

    case 'primaryAxisAlignItems': {
      const alignMap: Record<string, string> = {
        'start': 'MIN',
        'center': 'CENTER',
        'end': 'MAX',
        'between': 'SPACE_BETWEEN'
      };
      result.layout!.primaryAxisAlignItems = alignMap[style.value as string] as 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
      break;
    }

    case 'width': {
      if (style.value === 'full') {
        result.layout!.layoutSizingHorizontal = 'FILL';
      } else if (style.value === 'auto') {
        result.layout!.layoutSizingHorizontal = 'HUG';
      } else {
        const size = convertSize(style.value, style.unit);
        if (size !== null) {
          result.layout!.layoutSizingHorizontal = 'FIXED';
          result.layout!.width = size;
        }
      }
      break;
    }

    case 'height': {
      if (style.value === 'full') {
        result.layout!.layoutSizingVertical = 'FILL';
      } else if (style.value === 'auto') {
        result.layout!.layoutSizingVertical = 'HUG';
      } else {
        const size = convertSize(style.value, style.unit);
        if (size !== null) {
          result.layout!.layoutSizingVertical = 'FIXED';
          result.layout!.height = size;
        }
      }
      break;
    }

    case 'padding':
    case 'paddingTop':
    case 'paddingRight':
    case 'paddingBottom':
    case 'paddingLeft': {
      const size = convertSize(style.value, style.unit);
      if (size !== null) {
        switch (style.property) {
          case 'padding':
            result.layout!.paddingTop = size;
            result.layout!.paddingRight = size;
            result.layout!.paddingBottom = size;
            result.layout!.paddingLeft = size;
            break;
          case 'paddingTop':
            result.layout!.paddingTop = size;
            break;
          case 'paddingRight':
            result.layout!.paddingRight = size;
            break;
          case 'paddingBottom':
            result.layout!.paddingBottom = size;
            break;
          case 'paddingLeft':
            result.layout!.paddingLeft = size;
            break;
        }
      }
      break;
    }

    case 'gap': {
      const size = convertSize(style.value, style.unit);
      if (size !== null) {
        result.layout!.itemSpacing = size;
        result.layout!.counterAxisSpacing = size;
      }
      break;
    }

    case 'columnGap': {
      const size = convertSize(style.value, style.unit);
      if (size !== null) {
        result.layout!.itemSpacing = size;
      }
      break;
    }

    case 'rowGap': {
      const size = convertSize(style.value, style.unit);
      if (size !== null) {
        result.layout!.counterAxisSpacing = size;
      }
      break;
    }
  }

  if (Object.keys(result.layout!).length === 0) {
    delete result.layout;
  }

  return result;
}

function convertColorStyle(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  switch (style.property) {
    case 'backgroundColor': {
      if (style.value === 'gradient') {
        // 그라디언트는 나중에 처리됨
        break;
      }
      const color = style.variant === 'arbitrary'
        ? parseColorToFigma(style.value as string)
        : convertPresetColor(style.value as string);
      
      if (color) {
        const paint: FigmaPaint = {
          type: 'SOLID',
          color
        };
        result.fills = [paint];
      }
      break;
    }
    case 'gradientFrom':
    case 'gradientTo': {
      // 그라디언트 색상은 나중에 처리됨
      break;
    }
    case 'color': {
      const color = parseColorToFigma(style.value as string);
      if (color) {
        const paint: FigmaPaint = {
          type: 'SOLID',
          color
        };
        result.fills = [paint];
      }
      break;
    }
    case 'borderColor': {
      const color = parseColorToFigma(style.value as string);
      if (color) {
        const paint: FigmaPaint = {
          type: 'SOLID',
          color
        };
        result.strokes = [paint];
      }
      break;
    }
  }

  return result;
}

function convertEffects(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  switch (style.property) {
    case 'opacity': {
      const value = convertSize(style.value);
      if (value !== null) {
        result.opacity = value;
      }
      break;
    }
    case 'boxShadow': {
      const shadowMap: Record<string, any> = {
        'sm': {
          offset: { x: 0, y: 1 },
          radius: 2,
          spread: 0,
          color: { r: 0, g: 0, b: 0, a: 0.05 }
        },
        'md': {
          offset: { x: 0, y: 4 },
          radius: 6,
          spread: -2,
          color: { r: 0, g: 0, b: 0, a: 0.1 }
        },
        'lg': {
          offset: { x: 0, y: 8 },
          radius: 10,
          spread: -3,
          color: { r: 0, g: 0, b: 0, a: 0.1 }
        }
      };

      const shadowConfig = shadowMap[style.value as string];
      if (shadowConfig) {
        result.effects = [{
          type: 'DROP_SHADOW',
          ...shadowConfig,
          visible: true,
          blendMode: 'NORMAL'
        }];
      }
      break;
    }
  }

  return result;
}

function convertTypography(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = { text: {} };

  switch (style.property) {
    case 'fontSize': {
      const sizeMap: Record<string, number> = {
        'xs': 12,
        'sm': 14,
        'base': 16,
        'lg': 18,
        'xl': 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36
      };
      result.text!.fontSize = sizeMap[style.value as string];
      break;
    }
    case 'fontWeight': {
      const weightMap: Record<string, { family: string; style: string }> = {
        'normal': { family: 'Inter', style: 'Regular' },
        'medium': { family: 'Inter', style: 'Medium' },
        'semibold': { family: 'Inter', style: 'SemiBold' },
        'bold': { family: 'Inter', style: 'Bold' }
      };
      result.text!.fontName = weightMap[style.value as string];
      break;
    }
  }

  if (Object.keys(result.text!).length === 0) {
    delete result.text;
  }

  return result;
}

/**
 * 파싱된 스타일을 Figma 스타일로 변환합니다.
 */
export function convertToFigma(
  style: ParsedStyle,
  context: ConversionContext = {}
): Partial<FigmaStyleProperties> {
  switch (style.property) {
    // Layout properties
    case 'layoutMode':
    case 'width':
    case 'height':
    case 'padding':
    case 'paddingTop':
    case 'paddingRight':
    case 'paddingBottom':
    case 'paddingLeft':
    case 'gap':
    case 'columnGap':
    case 'rowGap':
    case 'counterAxisAlignItems':
    case 'primaryAxisAlignItems':
      return convertLayout(style, context);

    // Color properties
    case 'backgroundColor':
    case 'color':
    case 'borderColor':
      return convertColorStyle(style);

    // Typography properties
    case 'fontSize':
    case 'fontWeight':
      return convertTypography(style);

    // Geometry properties
    case 'borderRadius':
      return convertGeometry(style);

    // Effect properties
    case 'opacity':
    case 'boxShadow':
    case 'blur':
      return convertEffects(style);

    default:
      return {};
  }
}

/**
 * 여러 스타일을 Figma 스타일로 변환합니다.
 */
export function convertStylesToFigma(
  styles: ParsedStyle[],
  context: ConversionContext = {}
): FigmaStyleProperties {
  // 그라디언트 처리를 위한 상태
  let gradientFrom: string | null = null;
  let gradientTo: string | null = null;
  let isGradient = false;

  // 먼저 그라디언트 관련 스타일을 찾음
  styles.forEach(style => {
    if (style.property === 'backgroundColor' && style.value === 'gradient') {
      isGradient = true;
    }
    if (style.property === 'gradientFrom') {
      gradientFrom = style.value as string;
    }
    if (style.property === 'gradientTo') {
      gradientTo = style.value as string;
    }
  });

  // 기본 변환 수행
  const result = styles.reduce<FigmaStyleProperties>((acc, style) => {
    const converted = convertToFigma(style, context);
    
    if (Object.keys(converted).length === 0) {
      return acc;
    }

    return {
      ...acc,
      // ...converted,
      ...(converted.layout || {}),
      ...(converted.text || {}),
      ...(converted.geometry || {}),
      opacity: (converted.opacity || acc.opacity),
      fills: (converted.fills || []).concat(acc.fills || []),
      strokes: (converted.strokes || []).concat(acc.strokes || []),
      effects: (converted.effects || []).concat(acc.effects || [])
    };
  }, {});

  // 그라디언트가 있으면 fills 추가
  if (isGradient && gradientFrom && gradientTo) {
    const fromColor = parseColorToFigma(gradientFrom);
    const toColor = parseColorToFigma(gradientTo);
    
    if (fromColor && toColor) {
      result.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          { position: 0, color: fromColor },
          { position: 1, color: toColor }
        ],
        gradientTransform: [
          [0.7071, 0.7071, 0],
          [-0.7071, 0.7071, 0]
        ]
      }];
    }
  }

  return result;
} 
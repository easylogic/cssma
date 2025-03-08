import { COLORS } from '../config/tokens';
import { ParsedStyle, FigmaStyleProperties, FigmaEffect, FigmaColor } from '../types';
import { parseColor } from '../utils/colors';

interface ShadowValue {
  type: 'outer' | 'inner';
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

/**
 * Shadow 스타일을 Figma 스타일로 변환합니다.
 */
export function convertShadowToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  if (style.property === 'boxShadow' && Array.isArray(style.value)) {
    const effects: FigmaEffect[] = [];

    for (const shadow of style.value) {
      if (!isShadowValue(shadow)) continue;

      let color: string | FigmaColor = shadow.color;
      
      if (typeof color === 'string') {
        color = COLORS[color as keyof typeof COLORS] || parseColor(color);
      }
      
      if (!color) continue;

      effects.push({
        type: shadow.type === 'inner' ? 'INNER_SHADOW' : 'DROP_SHADOW',
        color: {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a ?? 1
        },
        offset: {
          x: shadow.x,
          y: shadow.y
        },
        radius: shadow.blur,
        spread: shadow.spread,
        visible: true,
        blendMode: 'NORMAL'
      });
    }

    if (effects.length > 0) {
      result.effects = effects;
    }
  }

  return result;
}

function isShadowValue(value: any): value is ShadowValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value.type === 'outer' || value.type === 'inner') &&
    typeof value.x === 'number' &&
    typeof value.y === 'number' &&
    typeof value.blur === 'number' &&
    typeof value.spread === 'number' &&
    (typeof value.color === 'string' || typeof value.color === 'object')
  );
} 
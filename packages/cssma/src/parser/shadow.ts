import { parseArbitraryValue } from '../utils/converters';
import { ParsedStyle } from '../types';
import { COLORS } from '../config/tokens';
import { parseColor } from '../utils/colors';
import { isValidHexColor, isValidNumber, isValidRgbColor } from '../utils/validators';

interface ShadowConfig {
  type: 'outer' | 'inner';
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

const SHADOW_PRESETS: Record<string, ShadowConfig[]> = {
  'shadow-sm': [{
    type: 'outer',
    x: 0,
    y: 1,
    blur: 2,
    spread: 0,
    color: 'rgba(0,0,0,0.05)'
  }],
  'shadow': [{
    type: 'outer',
    x: 0,
    y: 2,
    blur: 4,
    spread: -1,
    color: 'rgba(0,0,0,0.1)'
  }],
  'shadow-md': [{
    type: 'outer',
    x: 0,
    y: 4,
    blur: 6,
    spread: -2,
    color: 'rgba(0,0,0,0.1)'
  }],
  'shadow-lg': [{
    type: 'outer',
    x: 0,
    y: 8,
    blur: 10,
    spread: -3,
    color: 'rgba(0,0,0,0.1)'
  }],
  'shadow-xl': [{
    type: 'outer',
    x: 0,
    y: 12,
    blur: 14,
    spread: -4,
    color: 'rgba(0,0,0,0.1)'
  }],
  'shadow-2xl': [{
    type: 'outer',
    x: 0,
    y: 16,
    blur: 20,
    spread: -5,
    color: 'rgba(0,0,0,0.25)'
  }],
  'shadow-inner': [{
    type: 'inner',
    x: 0,
    y: 2,
    blur: 4,
    spread: 0,
    color: 'rgba(0,0,0,0.06)'
  }]
};

export function parseShadowStyleValue(className: string): ParsedStyle | null {
  // opacity 처리를 위한 분리
  let [prefix, opacityValue] = className.split('/');
  let opacity: number | undefined;
  
  if (opacityValue) {
    const numericOpacity = parseFloat(opacityValue);
    if (isNaN(numericOpacity) || numericOpacity < 0 || numericOpacity > 100) {
      return null;
    }
    opacity = numericOpacity / 100;
  }

  // custom shadow
  if (prefix.includes('[') && prefix.includes(']')) {
    const [x, y, blur, spread, color] = prefix.replace('shadow-[', '').replace(']', '').split('_');
    const newX = `[${x}]`;
    const newY = `[${y}]`;
    const newBlur = `[${blur}]`;
    const newSpread = `[${spread}]`;

    if (!isValidNumber(parseArbitraryValue(newX, { allowNegative: true }))) {
      return null;
    }

    if (!isValidNumber(parseArbitraryValue(newY, { allowNegative: true }))) {
      return null;
    }

    if (!isValidNumber(parseArbitraryValue(newBlur, { allowNegative: true }))) {
      return null;
    }

    if (!isValidNumber(parseArbitraryValue(newSpread, { allowNegative: true }))) {
      return null;
    }

    if (color.startsWith('#') && !isValidHexColor(color)) {
      return null;
    }

    if (color.startsWith('rgb') && !isValidRgbColor(color)) {
      return null;
    }

    const colorValue = COLORS[color as keyof typeof COLORS] || parseColor(color);

    if (!colorValue) {
      return null;
    }

    return {
      property: 'boxShadow',
      value: [{
        type: 'outer',
        x: parseArbitraryValue(newX, { allowNegative: true }) as number,
        y: parseArbitraryValue(newY, { allowNegative: true }) as number,
        blur: parseArbitraryValue(newBlur, { allowNegative: true }) as number,
        spread: parseArbitraryValue(newSpread, { allowNegative: true }) as number,
        color: colorValue
      }],
      variant: 'arbitrary'
    };
  }

  // 컬러 그림자 처리
  if (prefix.startsWith('shadow-')) {
    const colorName = prefix.replace('shadow-', '');
    if (COLORS[colorName]) {
      const colorValue = COLORS[colorName];
      if (typeof colorValue === 'object') {
        return {
          property: 'boxShadow',
          value: [{
            type: 'outer',
            x: 0,
            y: 2,
            blur: 4,
            spread: -1,
            color: {
              ...colorValue,
              a: opacity ?? 1
            }
          }],
          variant: 'preset'
        };
      }
    }
  }

  if (prefix in SHADOW_PRESETS) {
    return {
      property: 'boxShadow',
      value: [...SHADOW_PRESETS[prefix]],
      variant: 'preset'
    };
  }

  return null;
} 
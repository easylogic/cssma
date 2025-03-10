import { parseArbitraryValue } from '../utils/converters';
import { ParsedStyle } from '../types';
import { COLORS } from '../config/tokens';
import { parseColor } from '../utils/colors';
import { isValidHexColor, isValidNumber, isValidRgbColor } from '../utils/validators';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';

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

const isValidVariablePath = (path: string) => {
  return path !== '' && 
         !path.startsWith('/') && 
         !path.endsWith('/') && 
         !path.includes('//');
};

export function parseShadowStyleValue(className: string): ParsedStyle | null {
  
  let opacity: number | undefined;
  let prefix = className;
  
  
  const lastSlashIndex = className.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    const potentialOpacity = className.slice(lastSlashIndex + 1);
    const beforeSlash = className.slice(0, lastSlashIndex);
    
    
    const isInsideVariable = (
      beforeSlash.includes('$[') && 
      !beforeSlash.endsWith(']') && 
      className.indexOf(']', lastSlashIndex) !== -1
    );
    
    if (!isInsideVariable) {
      const numericOpacity = parseFloat(potentialOpacity);
      if (!isNaN(numericOpacity) && numericOpacity >= 0 && numericOpacity <= 100) {
        opacity = numericOpacity / 100;
        prefix = beforeSlash;
      }
    }
  }

  
  if (prefix.includes('$[')) {
    const match = prefix.match(/^shadow(?:-color)?-\$\[(.*?)\]$/);
    if (!match) return null;

    const variableId = extractFigmaVariableId(`$[${match[1]}]`);
    if (!variableId) return null;

    const isColorVariable = prefix.startsWith('shadow-color-');
    return createFigmaVariableStyle(
      isColorVariable ? 'boxShadowColor' : 'boxShadow',
      variableId,
      { opacity }
    );
  }

  // custom shadow
  if (prefix.includes('[') && prefix.includes(']')) {
    const [x, y, blur, spread, color] = prefix.replace('shadow-[', '').replace(']', '').split('_');
    const newX = `[${x}]`;
    const newY = `[${y}]`;
    const newBlur = `[${blur}]`;
    const newSpread = `[${spread}]`;

    const parsedX = parseArbitraryValue(newX, { allowNegative: true, allowUnits: true });
    const parsedY = parseArbitraryValue(newY, { allowNegative: true, allowUnits: true });
    const parsedBlur = parseArbitraryValue(newBlur, { allowNegative: true, allowUnits: true });
    const parsedSpread = parseArbitraryValue(newSpread, { allowNegative: true, allowUnits: true });

    if (parsedX?.value === undefined || parsedY?.value === undefined || parsedBlur?.value === undefined || parsedSpread?.value === undefined) {
      return null;
    }

    const xValue = Number(parsedX.value);
    const yValue = Number(parsedY.value);
    const blurValue = Number(parsedBlur.value);
    const spreadValue = Number(parsedSpread.value);

    if (isNaN(xValue) || isNaN(yValue) || isNaN(blurValue) || isNaN(spreadValue)) {
      return null;
    }

    let colorValue;
    if (color.startsWith('#')) {
      if (!isValidHexColor(color)) return null;
      colorValue = parseColor(color);
    } else if (color.startsWith('rgb')) {
      if (!isValidRgbColor(color)) return null;
      colorValue = parseColor(color);
    } else {
      colorValue = COLORS[color as keyof typeof COLORS] || parseColor(color);
    }

    if (!colorValue) {
      return null;
    }

    return {
      property: 'boxShadow',
      value: [{
        type: 'outer',
        x: xValue,
        y: yValue,
        blur: blurValue,
        spread: spreadValue,
        color: colorValue
      }],
      variant: 'arbitrary'
    };
  }

  
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
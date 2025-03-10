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
  
  if (className === 'border') {
    return {
      property: 'borderWidth',
      value: 1,
      variant: 'preset'
    };
  }

  if (className.includes('[') && className.includes(']')) {
    const match = className.match(/^([a-z-]+)-(\$?\[.*?\])$/);
    if (!match) return null;

    const [, type, value] = match;
    
    
    if (type === 'border-dashed') {
      
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

      
      const dashValues = value.slice(1, -1).split(',').map(v => parseFloat(v.trim()));
      
      
      if (dashValues.every(v => !isNaN(v))) {
        return {
          property: 'dashPattern',
          value: dashValues,
          variant: 'arbitrary'
        };
      }
      return null;
    }
    
    
    const isValidVariablePath = (path: string, prefix?: string) => {
      const isValidFormat = path !== '' && 
                          !path.startsWith('/') && 
                          !path.endsWith('/') && 
                          !path.includes('//');
      
      if (!isValidFormat) return false;
      if (prefix && !path.startsWith(prefix)) return false;
      
      return true;
    };

    
    if (value.startsWith('$[')) {
      const variableId = extractFigmaVariableId(value);
      if (!variableId) return null;
      
      
      if (type.startsWith('rounded') && !variableId.startsWith('radii/')) {
        return null;
      }

      
      if (type.startsWith('rounded')) {
        const position = type.replace('rounded-', '') as RadiusPosition;
        const property = position && RADIUS_POSITION_MAP[position] ? 
                        RADIUS_POSITION_MAP[position] : 
                        'borderRadius';
        return createFigmaVariableStyle(property, variableId);
      }
      
      
      if (type === 'border-color') {
        return createFigmaVariableStyle('borderColor', variableId);
      }
      
      
      if (type === 'border-width') {
        return createFigmaVariableStyle('borderWidth', variableId);
      }
      
      
      if (type === 'border') {
        return createFigmaVariableStyle('borderWidth', variableId);
      }
    }

    
    const parsedValue = parseArbitraryValue(value, {
      allowNegative: type.startsWith('rounded'),
      allowUnits: true,
      allowColors: type === 'border-color' || type === 'border',
      allowFigmaVariables: true
    });

    if (parsedValue !== null) {
      let property: string;
      
      
      if (type.startsWith('rounded')) {
        const position = type.replace('rounded-', '') as RadiusPosition;
        property = position && RADIUS_POSITION_MAP[position] ? 
                  RADIUS_POSITION_MAP[position] : 
                  'borderRadius';
      }
      
      else if (type === 'border-color') {
        property = 'borderColor';
      }
      
      else if (type === 'border-width') {
        property = 'borderWidth';
      }
      
      else if (type === 'border') {
        if (parsedValue.variant === 'figma-variable') {
          
          property = 'borderWidth';
        } else {
          
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
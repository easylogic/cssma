import { ParsedStyle } from '../types';
import { COLORS } from '../config/tokens';
import { isValidHexColor, isValidRgbColor, parseColor } from '../utils/colors';
import { parseArbitraryValue } from '../utils/converters';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';

const BACKGROUND_SIZE_MAP = {
  'auto': 'AUTO',
  'cover': 'COVER',
  'contain': 'CONTAIN'
} as const;

const BACKGROUND_POSITION_MAP = {
  'center': 'CENTER',
  'top': 'TOP',
  'right': 'RIGHT',
  'bottom': 'BOTTOM',
  'left': 'LEFT'
} as const;

const BACKGROUND_BLEND_MODES = {
  'normal': 'NORMAL',
  'multiply': 'MULTIPLY',
  'screen': 'SCREEN',
  'overlay': 'OVERLAY'
} as const;

const BACKGROUND_REPEAT_MAP = {
  'repeat': 'REPEAT',
  'no-repeat': 'NO_REPEAT',
  'repeat-x': 'REPEAT_X',
  'repeat-y': 'REPEAT_Y'
} as const;

const BACKGROUND_ATTACHMENT_MAP = {
  'fixed': 'FIXED',
  'local': 'LOCAL',
  'scroll': 'SCROLL'
} as const;

const BACKGROUND_ORIGIN_MAP = {
  'border': 'BORDER_BOX',
  'padding': 'PADDING_BOX',
  'content': 'CONTENT_BOX'
} as const;

const BACKGROUND_CLIP_MAP = {
  'border': 'BORDER_BOX',
  'padding': 'PADDING_BOX',
  'content': 'CONTENT_BOX',
  'text': 'TEXT'
} as const;

export function parseBackgroundStyleValue(className: string): ParsedStyle | null {
  // Handle opacity separation
  let opacity: number | undefined;
  let prefix = className;
  
  // Find the last slash for opacity handling (excluding those inside Figma variables)
  const lastSlashIndex = className.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    const potentialOpacity = className.slice(lastSlashIndex + 1);
    const beforeSlash = className.slice(0, lastSlashIndex);
    
    // Check if the slash is not inside a Figma variable
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

  // Handle arbitrary values and Figma variables
  if (prefix.includes('[') && prefix.includes(']')) {
    const match = prefix.match(/^([a-z-]+)-(\$?\[.*?\])$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // Handle background color
    if (type === 'bg') { 
      // Handle Figma variables
      if (value.startsWith('$[') && value.endsWith(']')) {
        const variableId = extractFigmaVariableId(value);
        if (!variableId) return null;
        
        return createFigmaVariableStyle('backgroundColor', variableId, { opacity });
      }

      // Handle arbitrary values
      const parsedValue = parseArbitraryValue(value, { 
        allowUnits: false,
        allowColors: true,
        requireValidColor: true
      });

      if (parsedValue) {
        const result: ParsedStyle = {
          property: 'backgroundColor',
          value: parsedValue.value,
          variant: parsedValue.variant,
          ...(opacity !== undefined && { opacity })
        };

        if (parsedValue.variant === 'figma-variable' && parsedValue.variableId) {
          result.variableId = parsedValue.variableId;
        }

        return result;
      }
    }

    // Handle gradient colors
    if (['from', 'via', 'to'].includes(type)) {
      const parsedValue = parseArbitraryValue(value, { 
        allowUnits: false,
        allowColors: true,
        requireValidColor: true
      });
      
      if (parsedValue) {
        const property = `gradient${type.charAt(0).toUpperCase() + type.slice(1)}`;
        const result: ParsedStyle = {
          property,
          value: parsedValue.value,
          variant: parsedValue.variant,
          ...(opacity !== undefined && { opacity })
        };

        if (parsedValue.variant === 'figma-variable' && parsedValue.variableId) {
          result.variableId = parsedValue.variableId;
        }

        return result;
      }
    }
  }

  // Handle preset gradient colors
  const gradientMatch = prefix.match(/^(from|via|to)-(.+)$/);
  if (gradientMatch) {
    const [, type, colorValue] = gradientMatch;
    
    // Handle Figma variables
    if (colorValue.startsWith('$[') && colorValue.endsWith(']')) {
      const variableId = extractFigmaVariableId(colorValue);
      if (!variableId) return null;
      
      return createFigmaVariableStyle(
        `gradient${type.charAt(0).toUpperCase() + type.slice(1)}`,
        variableId,
        { opacity }
      );
    }

    // Handle regular colors
    if (colorValue.includes('[')) {
      const parsedValue = parseArbitraryValue(colorValue, { 
        allowUnits: false,
        allowColors: true,
        requireValidColor: true
      });
      if (parsedValue) {
        const result: ParsedStyle = {
          property: `gradient${type.charAt(0).toUpperCase() + type.slice(1)}`,
          value: parsedValue.value,
          variant: parsedValue.variant,
          ...(opacity !== undefined && { opacity })
        };

        if (parsedValue.variant === 'figma-variable' && parsedValue.variableId) {
          result.variableId = parsedValue.variableId;
        }

        return result;
      }
    }
    
    // Handle preset colors
    return {
      property: `gradient${type.charAt(0).toUpperCase() + type.slice(1)}`,
      value: COLORS[colorValue] || parseColor(colorValue),
      variant: 'preset',
      ...(opacity !== undefined && { opacity })
    };
  }

  // Handle preset values
  if (prefix.startsWith('bg-')) {
    const value = prefix.replace('bg-', '');

    // Background blend mode
    if (value.startsWith('blend-')) {
      const mode = value.replace('blend-', '');
      if (BACKGROUND_BLEND_MODES[mode as keyof typeof BACKGROUND_BLEND_MODES]) {
        return {
          property: 'backgroundBlendMode',
          value: BACKGROUND_BLEND_MODES[mode as keyof typeof BACKGROUND_BLEND_MODES],
          variant: 'preset',
        };
      }
      return null;
    }

    // Background size
    if (BACKGROUND_SIZE_MAP[value as keyof typeof BACKGROUND_SIZE_MAP]) {
      return {
        property: 'backgroundSize',
        value: BACKGROUND_SIZE_MAP[value as keyof typeof BACKGROUND_SIZE_MAP],
        variant: 'preset',
        ...(opacity !== undefined && { opacity })
      };
    }

    // Background position
    if (BACKGROUND_POSITION_MAP[value as keyof typeof BACKGROUND_POSITION_MAP]) {
      return {
        property: 'backgroundPosition',
        value: BACKGROUND_POSITION_MAP[value as keyof typeof BACKGROUND_POSITION_MAP],
        variant: 'preset',
        ...(opacity !== undefined && { opacity })
      };
    }

    // Background repeat
    if (value === 'repeat' || value === 'no-repeat' || value.startsWith('repeat-')) {
      const repeat = BACKGROUND_REPEAT_MAP[value as keyof typeof BACKGROUND_REPEAT_MAP];
      if (repeat) {
        return {
          property: 'backgroundRepeat',
          value: repeat,
          variant: 'preset',
          ...(opacity !== undefined && { opacity })
        };
      }
      return null;
    }

    // Background attachment
    if (BACKGROUND_ATTACHMENT_MAP[value as keyof typeof BACKGROUND_ATTACHMENT_MAP]) {
      return {
        property: 'backgroundAttachment',
        value: BACKGROUND_ATTACHMENT_MAP[value as keyof typeof BACKGROUND_ATTACHMENT_MAP],
        variant: 'preset',
        ...(opacity !== undefined && { opacity })
      };
    }

    // Background origin
    if (value.startsWith('origin-')) {
      const origin = value.replace('origin-', '');
      if (BACKGROUND_ORIGIN_MAP[origin as keyof typeof BACKGROUND_ORIGIN_MAP]) {
        return {
          property: 'backgroundOrigin',
          value: BACKGROUND_ORIGIN_MAP[origin as keyof typeof BACKGROUND_ORIGIN_MAP],
          variant: 'preset',
          ...(opacity !== undefined && { opacity })
        };
      }
      return null;
    }

    // Background clip
    if (value.startsWith('clip-')) {
      const clip = value.replace('clip-', '');
      if (BACKGROUND_CLIP_MAP[clip as keyof typeof BACKGROUND_CLIP_MAP]) {
        return {
          property: 'backgroundClip',
          value: BACKGROUND_CLIP_MAP[clip as keyof typeof BACKGROUND_CLIP_MAP],
          variant: 'preset',
          ...(opacity !== undefined && { opacity })
        };
      }
      return null;
    }

    // Linear gradients
    if (value.startsWith('linear-to-')) {
      return {
        property: 'backgroundColor',
        value: 'linear',
        direction: value.replace('linear-to-', ''),
        variant: 'preset',
        ...(opacity !== undefined && { opacity })
      };
    }

    // Radial gradients
    if (value === 'radial') {
      return {
        property: 'backgroundColor',
        value: 'radial',
        variant: 'preset',
        ...(opacity !== undefined && { opacity })
      };
    }

    // Conic gradients
    if (value === 'conic') {
      return {
        property: 'backgroundColor',
        value: 'conic',
        variant: 'preset',
        ...(opacity !== undefined && { opacity })
      };
    }

    // Preset colors
    if (COLORS[value]) {
      return {
        property: 'backgroundColor',
        value: COLORS[value],
        ...(opacity !== undefined && { opacity }),
        variant: 'preset'
      };
    }
  }

  return null;
} 
import { ParsedStyle } from '../types';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';
import { parseArbitraryValue } from '../utils/converters';

const LAYOUT_WRAP_MAP = {
  'wrap': 'WRAP',
  'nowrap': 'NO_WRAP'
} as const;

const PRIMARY_AXIS_ALIGN_MAP = {
  'justify-start': 'MIN',
  'justify-center': 'CENTER',
  'justify-end': 'MAX',
  'justify-between': 'SPACE_BETWEEN'
} as const;

const COUNTER_AXIS_ALIGN_MAP = {
  'items-start': 'MIN',
  'items-center': 'CENTER',
  'items-end': 'MAX',
  'items-baseline': 'BASELINE'
} as const;

const SELF_ALIGN_MAP = {
  'self-start': 'MIN',
  'self-center': 'CENTER',
  'self-end': 'MAX',
  'self-stretch': 'STRETCH'
} as const;

/**
 * Parse arbitrary numeric value from a string
 * @param value Value to parse
 * @param allowNegative Whether to allow negative values
 * @returns Parsed number or null if invalid
 */
function parseArbitraryNumericValue(value: string, allowNegative: boolean = false): number | null {
  const match = value.match(/^\[([-\d.]+)(?:px)?\]$/);
  if (!match) return null;
  
  const num = parseFloat(match[1]);
  if (isNaN(num)) return null;
  
  if (!allowNegative && num < 0) return null;
  
  return num;
}

/**
 * Parse layout-related style values
 */
export function parseLayoutValue(className: string): ParsedStyle | null {

  if (className === 'grid') {
    return {
      property: 'layoutMode',
      value: 'GRID',
      variant: 'preset'
    };
  }

  // Handle Flex direction
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

  // Handle Flex wrap
  if (className in LAYOUT_WRAP_MAP) {
    return {
      property: 'layoutWrap',
      value: LAYOUT_WRAP_MAP[className as keyof typeof LAYOUT_WRAP_MAP],
      variant: 'preset'
    };
  }

  // Handle Alignment
  if (className in COUNTER_AXIS_ALIGN_MAP) {
    return {
      property: 'counterAxisAlignItems',
      value: COUNTER_AXIS_ALIGN_MAP[className as keyof typeof COUNTER_AXIS_ALIGN_MAP],
      variant: 'preset'
    };
  }

  if (className in PRIMARY_AXIS_ALIGN_MAP) {
    return {
      property: 'primaryAxisAlignItems',
      value: PRIMARY_AXIS_ALIGN_MAP[className as keyof typeof PRIMARY_AXIS_ALIGN_MAP],
      variant: 'preset'
    };
  }

  // Handle Self Alignment (individual item alignment)
  if (className in SELF_ALIGN_MAP) {
    return {
      property: 'layoutAlign',
      value: SELF_ALIGN_MAP[className as keyof typeof SELF_ALIGN_MAP],
      variant: 'preset'
    };
  }

  // Handle Width
  if (className.startsWith('w-')) {
    const value = className.slice(2);

    // Handle preset values
    if (value === 'full') {
      return {
        property: 'layoutSizingHorizontal',
        value: 'FILL',
        variant: 'preset'
      };
    }

    if (value === 'auto') {
      return {
        property: 'layoutSizingHorizontal',
        value: 'HUG',
        variant: 'preset'
      };
    }

    // Handle Figma variables
    if (value.startsWith('$[')) {
      const variableId = extractFigmaVariableId(value);
      if (!variableId) return null;
      
      return createFigmaVariableStyle('width', variableId);
    }

    // Handle arbitrary values
    const size = parseArbitraryNumericValue(value);
    if (size !== null) {
      return {
        property: 'width',
        value: size,
        variant: 'arbitrary'
      };
    }
  }

  // Handle Height
  if (className.startsWith('h-')) {
    const value = className.slice(2);

    // Handle preset values
    if (value === 'full') {
      return {
        property: 'layoutSizingVertical',
        value: 'FILL',
        variant: 'preset'
      };
    }

    if (value === 'auto') {
      return {
        property: 'layoutSizingVertical',
        value: 'HUG',
        variant: 'preset'
      };
    }

    // Handle Figma variables
    if (value.startsWith('$[')) {
      const variableId = extractFigmaVariableId(value);
      if (!variableId) return null;
      
      return createFigmaVariableStyle('height', variableId);
    }

    // Handle arbitrary values
    const size = parseArbitraryNumericValue(value);
    if (size !== null) {
      return {
        property: 'height',
        value: size,
        variant: 'arbitrary'
      };
    }
  }

  // Handle Gap
  if (className.startsWith('gap-')) {
    const match = className.match(/^gap-(x|y)?-?(.+)$/);
    if (!match) return null;

    const [, direction, value] = match;

    // Handle Figma variables
    if (value.startsWith('$[')) {
      const variableId = extractFigmaVariableId(value);
      if (!variableId) return null;
      
      return createFigmaVariableStyle(
        direction === 'x' ? 'itemSpacing' :
        direction === 'y' ? 'counterAxisSpacing' :
        'gap',
        variableId
      );
    }

    // Handle arbitrary values
    const size = parseArbitraryNumericValue(value);
    if (size !== null) {
      return {
        property: direction === 'x' ? 'itemSpacing' :
                 direction === 'y' ? 'counterAxisSpacing' :
                 'gap',
        value: size,
        variant: 'arbitrary'
      };
    }
  }

  return null;
} 
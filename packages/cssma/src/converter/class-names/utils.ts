import { parseArbitraryValue } from "../../utils/converters";

/**
 * Get CSS property from prefix using standard mapping
 */
export function getPropertyFromPrefix(prefix: string): string | null {
  const prefixMap: Record<string, string> = {
    'text': 'color',
    'bg': 'background-color',
    'border': 'border-width',
    'shadow': 'box-shadow',
    'w': 'width',
    'h': 'height',
    'm': 'margin',
    'mt': 'margin-top',
    'mr': 'margin-right',
    'mb': 'margin-bottom',
    'ml': 'margin-left',
    'mx': 'margin-inline',
    'my': 'margin-block',
    'p': 'padding',
    'pt': 'padding-top',
    'pr': 'padding-right',
    'pb': 'padding-bottom',
    'pl': 'padding-left',
    'px': 'padding-inline',
    'py': 'padding-block',
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left'
  };

  return prefixMap[prefix] || null;
}

/**
 * Convert size classes (w-4, h-8, etc.) using parseArbitraryValue
 */
export function convertSizeClasses(className: string): Record<string, string> | null {
  // Handle missing size parsers - w-4, h-8, etc. (without units as expected by tests)
  if (className.match(/^[wh]-\d+$/)) {
    const [type, size] = className.split('-');
    return {
      [type === 'w' ? 'width' : 'height']: size
    };
  }

  // Handle arbitrary size values w-[400px] h-[50%] using parseArbitraryValue
  if (className.match(/^[wh]-\[.+\]$/)) {
    const [type, valueWithBrackets] = className.split('-');
    
    // Extract the raw value from brackets to preserve units
    const rawValue = valueWithBrackets.slice(1, -1); // Remove [ and ]
    
    // For arbitrary values with units, return the raw value directly
    if (rawValue.match(/\d+(px|%|rem|em|vh|vw|fr)/)) {
      return {
        [type === 'w' ? 'width' : 'height']: rawValue
      };
    }
    
    // For numeric values without units, use parseArbitraryValue
    const parsedValue = parseArbitraryValue(valueWithBrackets, {
      allowUnits: true,
      allowNumbers: true
    });
    
    if (parsedValue) {
      return {
        [type === 'w' ? 'width' : 'height']: String(parsedValue.value)
      };
    }
  }

  return null;
}

/**
 * Convert arbitrary values with CSS variables using parseArbitraryValue
 */
export function convertArbitraryValues(className: string): Record<string, string> | null {
  // Handle arbitrary values with CSS variables
  if (className.match(/^[a-z]+-\[var\(--[^)]+\)\]$/)) {
    const [prefix, valueWithBrackets] = className.split('-[');
    const value = valueWithBrackets.slice(0, -1); // Remove ]
    const property = getPropertyFromPrefix(prefix);
    
    if (property) {
      return {
        [property]: value
      };
    }
  }

  // Handle other arbitrary values (including CSS variables and complex values)
  if (className.match(/^[a-z]+-\[.+\]$/)) {
    const [prefix, valueWithBrackets] = className.split('-[');
    const value = valueWithBrackets.slice(0, -1); // Remove ]
    const property = getPropertyFromPrefix(prefix);
    
    if (property) {
      // Handle space replacements in arbitrary values
      const processedValue = value.replace(/_/g, ' ');
      return {
        [property]: processedValue
      };
    }
  }

  return null;
}

/**
 * Convert individual border classes
 */
export function convertIndividualBorderClasses(className: string): Record<string, string> | null {
  // Handle individual border width: border-t-2, border-r, border-b-0, etc.
  if (className.match(/^border-[trblxy](-\d+)?$/)) {
    const match = className.match(/^border-([trblxy])(-(\d+))?$/);
    if (!match) return null;
    
    const [, direction, , size] = match;
    const value = size || '1'; // Default to 1 if no size specified
    
    const directionMap: Record<string, string> = {
      't': 'border-top-width',
      'r': 'border-right-width',
      'b': 'border-bottom-width', 
      'l': 'border-left-width',
      'x': 'border-inline-width',
      'y': 'border-block-width'
    };
    
    const property = directionMap[direction];
    return property ? { [property]: value } : null;
  }
  
  return null;
}

/**
 * Convert display and layout utility classes
 */
export function convertDisplayClasses(className: string): Record<string, string> | null {
  const displayMap: Record<string, string> = {
    'block': 'block',
    'inline': 'inline',
    'inline-block': 'inline-block',
    'flex': 'flex',
    'inline-flex': 'inline-flex',
    'grid': 'grid',
    'inline-grid': 'inline-grid',
    'hidden': 'none',
    'table': 'table',
    'table-row': 'table-row',
    'table-cell': 'table-cell'
  };
  
  if (displayMap[className]) {
    return { 'display': displayMap[className] };
  }
  
  return null;
}

/**
 * Convert position utility classes
 */
export function convertPositionClasses(className: string): Record<string, string> | null {
  const positionMap: Record<string, string> = {
    'static': 'static',
    'fixed': 'fixed',
    'absolute': 'absolute',
    'relative': 'relative',
    'sticky': 'sticky'
  };
  
  if (positionMap[className]) {
    return { 'position': positionMap[className] };
  }
  
  return null;
}

/**
 * Convert flexbox utility classes
 */
export function convertFlexboxClasses(className: string): Record<string, string> | null {
  // Flex direction
  const flexDirectionMap: Record<string, string> = {
    'flex-row': 'row',
    'flex-row-reverse': 'row-reverse',
    'flex-col': 'column',
    'flex-col-reverse': 'column-reverse'
  };
  
  if (flexDirectionMap[className]) {
    return { 'flex-direction': flexDirectionMap[className] };
  }
  
  // Flex wrap
  const flexWrapMap: Record<string, string> = {
    'flex-wrap': 'wrap',
    'flex-wrap-reverse': 'wrap-reverse',
    'flex-nowrap': 'nowrap'
  };
  
  if (flexWrapMap[className]) {
    return { 'flex-wrap': flexWrapMap[className] };
  }
  
  // Common flex values (check these first before numeric patterns)
  const flexMap: Record<string, string> = {
    'flex-1': '1 1 0%',
    'flex-auto': '1 1 auto',
    'flex-initial': '0 1 auto',
    'flex-none': 'none'
  };
  
  if (flexMap[className]) {
    return { 'flex': flexMap[className] };
  }
  
  // Flex grow/shrink
  if (className.match(/^flex-grow(-\d+)?$/)) {
    const match = className.match(/^flex-grow(-(\d+))?$/);
    const value = match?.[2] || '1';
    return { 'flex-grow': value };
  }
  
  if (className.match(/^flex-shrink(-\d+)?$/)) {
    const match = className.match(/^flex-shrink(-(\d+))?$/);
    const value = match?.[2] || '1';
    return { 'flex-shrink': value };
  }
  
  // Flex basis (for custom numeric values like flex-2, flex-3, etc.)
  if (className.match(/^flex-\d+$/)) {
    const value = className.replace('flex-', '');
    return { 'flex': value };
  }
  
  return null;
}

/**
 * Convert z-index utility classes
 */
export function convertZIndexClasses(className: string): Record<string, string> | null {
  // Handle z-index classes: z-0, z-10, z-50, etc.
  if (className.match(/^z-\d+$/)) {
    const value = className.replace('z-', '');
    return { 'z-index': value };
  }
  
  // Handle negative z-index: -z-10, -z-50, etc.
  if (className.match(/^-z-\d+$/)) {
    const value = '-' + className.replace('-z-', '');
    return { 'z-index': value };
  }
  
  // Common z-index values
  const zIndexMap: Record<string, string> = {
    'z-auto': 'auto'
  };
  
  if (zIndexMap[className]) {
    return { 'z-index': zIndexMap[className] };
  }
  
  return null;
}

/**
 * Convert other utility classes
 */
export function convertUtilityClasses(className: string): Record<string, string> | null {
  // Try individual border classes
  const borderResult = convertIndividualBorderClasses(className);
  if (borderResult) return borderResult;
  
  // Try display classes
  const displayResult = convertDisplayClasses(className);
  if (displayResult) return displayResult;
  
  // Try position classes
  const positionResult = convertPositionClasses(className);
  if (positionResult) return positionResult;
  
  // Try flexbox classes
  const flexboxResult = convertFlexboxClasses(className);
  if (flexboxResult) return flexboxResult;
  
  // Try z-index classes
  const zIndexResult = convertZIndexClasses(className);
  if (zIndexResult) return zIndexResult;

  // Handle missing overflow directional parsers
  if (className.match(/^overflow-[xy]-\w+$/)) {
    const [, direction, overflowValue] = className.split('-');
    return {
      [`overflow-${direction}`]: overflowValue
    };
  }

  // Handle grid template columns
  if (className.match(/^grid-cols-\d+$/)) {
    const [, , count] = className.split('-');
    return {
      'grid-template-columns': `repeat(${count}, 1fr)`
    };
  }

  // Handle border radius
  if (className.match(/^rounded(-\w+)?$/)) {
    const radiusMap: Record<string, string> = {
      'rounded-sm': '2px',
      'rounded': '4px',
      'rounded-md': '6px',
      'rounded-lg': '8px',
      'rounded-xl': '12px',
      'rounded-2xl': '16px',
      'rounded-3xl': '24px',
      'rounded-full': '9999px'
    };
    return {
      'border-radius': radiusMap[className] || '4px'
    };
  }

  return null;
} 
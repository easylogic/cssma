import { ParsedStyle } from '../types';
import { FONT_SIZES, COLORS } from '../config/tokens';
import { isValidHexColor, isValidRgbColor } from '../utils/colors';
import { extractFigmaVariableId, createFigmaVariableStyle } from '../utils/variables';
import { parseArbitraryValue } from '../utils/converters';

const TEXT_ALIGN_HORIZONTAL_MAP = {
  'left': 'LEFT',
  'center': 'CENTER',
  'right': 'RIGHT',
  'justify': 'JUSTIFIED'
} as const;

const TEXT_ALIGN_VERTICAL_MAP = {
  'top': 'TOP',
  'middle': 'CENTER',
  'bottom': 'BOTTOM'
} as const;

const TEXT_DECORATION_MAP = {
  'underline': 'UNDERLINE',
  'line-through': 'STRIKETHROUGH',
  'no-underline': 'NONE'
} as const;

const TEXT_TRANSFORM_MAP = {
  'uppercase': 'UPPERCASE',
  'lowercase': 'LOWERCASE',
  'capitalize': 'CAPITALIZE',
  'normal-case': 'NONE'
} as const;

const LINE_HEIGHT_MAP = {
  'none': 100,
  'tight': 125,
  'snug': 137.5,
  'normal': 150,
  'relaxed': 165,
  'loose': 200
} as const;

const LETTER_SPACING_MAP = {
  'tighter': -0.8,
  'tight': -0.4,
  'normal': 0,
  'wide': 0.4,
  'wider': 0.8,
  'widest': 1.6
} as const;

const PARAGRAPH_SPACING_MAP = {
  'tight': 8,
  'normal': 16,
  'loose': 24
} as const;

const PARAGRAPH_INDENT_MAP = {
  'none': 0,
  'sm': 16,
  'md': 24,
  'lg': 32
} as const;

const TEXT_AUTO_RESIZE_MAP = {
  'fixed': 'NONE',
  'auto': 'WIDTH_AND_HEIGHT',
  'auto-h': 'HEIGHT',
  'truncate': 'TRUNCATE'
} as const;

const TEXT_CASE_MAP = {
  'uppercase': 'UPPER',
  'lowercase': 'LOWER',
  'capitalize': 'TITLE',
  'normal-case': 'ORIGINAL'
} as const;

const TEXT_TRUNCATION_MAP = {
  'truncate-none': 'DISABLED',
  'truncate-end': 'ENDING'
} as const;

const TEXT_WRAP_MAP = {
  'wrap-balance': 'BALANCE',
  'wrap': 'WRAP',
  'wrap-truncate': 'TRUNCATE'
} as const;

const LEADING_TRIM_MAP = {
  'leading-trim': 'CAP_HEIGHT',
  'leading-trim-cap': 'CAP_HEIGHT',
  'leading-trim-none': 'NONE'
} as const;

// Helper function to handle text properties
function handleTextProperty(value: string): ParsedStyle | null {
  // Text Auto Resize
  if (TEXT_AUTO_RESIZE_MAP[value as keyof typeof TEXT_AUTO_RESIZE_MAP]) {
    return {
      property: 'textAutoResize',
      value: TEXT_AUTO_RESIZE_MAP[value as keyof typeof TEXT_AUTO_RESIZE_MAP],
      variant: 'preset'
    };
  }

  // Text Case
  if (TEXT_CASE_MAP[value as keyof typeof TEXT_CASE_MAP]) {
    return {
      property: 'textCase',
      value: TEXT_CASE_MAP[value as keyof typeof TEXT_CASE_MAP],
      variant: 'preset'
    };
  }

  // Text Truncation
  if (TEXT_TRUNCATION_MAP[value as keyof typeof TEXT_TRUNCATION_MAP]) {
    return {
      property: 'textTruncation',
      value: TEXT_TRUNCATION_MAP[value as keyof typeof TEXT_TRUNCATION_MAP],
      variant: 'preset'
    };
  }

  // Text Wrap
  if (value === 'wrap' || TEXT_WRAP_MAP[value as keyof typeof TEXT_WRAP_MAP]) {
    return {
      property: 'textWrap',
      value: value === 'wrap' ? 'WRAP' : TEXT_WRAP_MAP[value as keyof typeof TEXT_WRAP_MAP],
      variant: 'preset'
    };
  }

  return null;
}

export function parseTextStyleValue(className: string): ParsedStyle | null {
  
  if (LEADING_TRIM_MAP[className as keyof typeof LEADING_TRIM_MAP]) {
    return {
      property: 'leadingTrim',
      value: LEADING_TRIM_MAP[className as keyof typeof LEADING_TRIM_MAP],
      variant: 'preset'
    };
  }

  
  let opacity: number | undefined;
  let prefix = className;
  
  // Handle truncate class directly
  if (prefix === 'truncate') {
    return {
      property: 'textAutoResize',
      value: 'TRUNCATE',
      variant: 'preset'
    };
  }

  
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

  // Check for Figma variables first
  if (prefix.includes('$[')) {
    const match = prefix.match(/^([a-z-]+)-(\$\[.*?\])$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // Handle Figma variables
    if (value.startsWith('$[') && value.endsWith(']')) {
      const variableId = extractFigmaVariableId(value);
      if (!variableId) return null;
      
      // Color variable
      if (type === 'text') {
        return createFigmaVariableStyle('color', variableId, { opacity });
      }
      
      // Paragraph spacing variable
      if (type === 'paragraph') {
        return createFigmaVariableStyle('paragraphSpacing', variableId);
      }
      
      // Paragraph indent variable
      if (type === 'indent') {
        return createFigmaVariableStyle('paragraphIndent', variableId);
      }

      // Text wrap variable
      if (type === 'text-wrap') {
        return createFigmaVariableStyle('textWrap', variableId);
      }

      if (type === 'align') {
        return createFigmaVariableStyle('textAlignVertical', variableId);
      }
    }
    return null;
  }

  if (prefix.includes('[') && prefix.includes(']')) {
    const match = prefix.match(/^([a-z-]+)-\[(.*?)\]$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // Handle text color
    if (type === 'text') {
      
      const cleanValue = value.replace(/^\[|\]$/g, '');

      
      const size = parseFloat(cleanValue);
      if (!isNaN(size) && cleanValue === size.toString()) {
        return {
          property: 'fontSize',
          value: size,
          variant: 'arbitrary'
        };
      }

      
      if (cleanValue.startsWith('#') || cleanValue.startsWith('rgb')) {
        if (!isValidHexColor(cleanValue) && !isValidRgbColor(cleanValue)) {
          return null;
        }
        return {
          property: 'color',
          value: cleanValue,
          opacity,
          variant: 'arbitrary'
        };
      }

      return null;
    }

    // Paragraph spacing
    if (type === 'paragraph') {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        return {
          property: 'paragraphSpacing',
          value: numericValue,
          variant: 'arbitrary'
        };
      }
    }

    // Paragraph indent
    if (type === 'indent') {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        return {
          property: 'paragraphIndent',
          value: numericValue,
          variant: 'arbitrary'
        };
      }
    }

    
    if (type === 'leading') {
      const cleanValue = value.replace(/^\[|\]$/g, '');
      if (cleanValue.endsWith('px')) {
        const size = parseFloat(cleanValue);
        if (!isNaN(size)) {
          return {
            property: 'lineHeight',
            value: size,
            unit: 'PIXELS',
            variant: 'arbitrary'
          };
        }
      } else {
        const ratio = parseFloat(cleanValue);
        if (!isNaN(ratio)) {
          return {
            property: 'lineHeight',
            value: ratio * 100,
            unit: 'PERCENT',
            variant: 'arbitrary'
          };
        }
      }
    }

    
    if (type === 'tracking') {
      const cleanValue = value.replace(/^\[|\]$/g, '');
      const spacing = parseFloat(cleanValue);
      if (!isNaN(spacing)) {
        
        if (cleanValue.endsWith('px')) {
          return {
            property: 'letterSpacing',
            value: { value: spacing, unit: 'PIXELS' },
            variant: 'arbitrary'
          };
        } else if (cleanValue.endsWith('em')) {
          return {
            property: 'letterSpacing',
            value: { value: spacing * 100, unit: 'PERCENT' },
            variant: 'arbitrary'
          };
        } else {
          
          return {
            property: 'letterSpacing',
            value: spacing,
            variant: 'arbitrary'
          };
        }
      }
    }
  }

  // Handle text properties
  if (prefix.startsWith('text-')) {
    const value = prefix.replace('text-', '');
    
    // Text Auto Resize
    if (TEXT_AUTO_RESIZE_MAP[value as keyof typeof TEXT_AUTO_RESIZE_MAP]) {
      return {
        property: 'textAutoResize',
        value: TEXT_AUTO_RESIZE_MAP[value as keyof typeof TEXT_AUTO_RESIZE_MAP],
        variant: 'preset'
      };
    }

    // Text Truncation
    if (TEXT_TRUNCATION_MAP[value as keyof typeof TEXT_TRUNCATION_MAP] || value === 'truncate') {
      return {
        property: 'textTruncation',
        value: value === 'truncate' ? 'ENDING' : TEXT_TRUNCATION_MAP[value as keyof typeof TEXT_TRUNCATION_MAP],
        variant: 'preset'
      };
    }

    // Font size
    if (FONT_SIZES[value]) {
      return {
        property: 'fontSize',
        value: FONT_SIZES[value],
        variant: 'preset'
      };
    }

    // Text properties (auto resize, case)
    const textPropertyResult = handleTextProperty(value);
    if (textPropertyResult) return textPropertyResult;

    // Horizontal text alignment
    if (TEXT_ALIGN_HORIZONTAL_MAP[value as keyof typeof TEXT_ALIGN_HORIZONTAL_MAP]) {
      return {
        property: 'textAlignHorizontal',
        value: TEXT_ALIGN_HORIZONTAL_MAP[value as keyof typeof TEXT_ALIGN_HORIZONTAL_MAP],
        variant: 'preset'
      };
    }

    // Vertical text alignment
    if (TEXT_ALIGN_VERTICAL_MAP[value as keyof typeof TEXT_ALIGN_VERTICAL_MAP]) {
      return {
        property: 'textAlignVertical',
        value: TEXT_ALIGN_VERTICAL_MAP[value as keyof typeof TEXT_ALIGN_VERTICAL_MAP],
        variant: 'preset'
      };
    }

    // Preset colors
    if (COLORS[value]) {
      return {
        property: 'color',
        value: COLORS[value],
        opacity,
        variant: 'preset'
      };
    }

    // Text Case with Figma variables
    if (value.startsWith('text-case-$[')) {
      const variableId = extractFigmaVariableId(value.replace('text-case-', ''));
      if (variableId) {
        return createFigmaVariableStyle('textCase', variableId);
      }
      return null;
    }
  }

  // Text transform
  if (TEXT_CASE_MAP[prefix as keyof typeof TEXT_CASE_MAP]) {
    return {
      property: 'textCase',
      value: TEXT_CASE_MAP[prefix as keyof typeof TEXT_CASE_MAP],
      variant: 'preset'
    };
  }

  // Text decoration
  if (TEXT_DECORATION_MAP[prefix as keyof typeof TEXT_DECORATION_MAP]) {
    return {
      property: 'textDecoration',
      value: TEXT_DECORATION_MAP[prefix as keyof typeof TEXT_DECORATION_MAP],
      variant: 'preset'
    };
  }

  // Line height
  if (prefix.startsWith('leading-')) {
    const value = prefix.replace('leading-', '');
    
    
    if (value === 'auto') {
      return {
        property: 'lineHeight',
        value: 0,
        unit: 'AUTO',
        variant: 'preset'
      };
    }
    
    
    if (LINE_HEIGHT_MAP[value as keyof typeof LINE_HEIGHT_MAP] !== undefined) {
      return {
        property: 'lineHeight',
        value: LINE_HEIGHT_MAP[value as keyof typeof LINE_HEIGHT_MAP],
        unit: 'PERCENT',
        variant: 'preset'
      };
    }

    
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      
      
      if (arbitraryValue.endsWith('%')) {
        const percent = parseFloat(arbitraryValue);
        if (!isNaN(percent)) {
          return {
            property: 'lineHeight',
            value: percent,
            unit: 'PERCENT',
            variant: 'arbitrary'
          };
        }
      }
      
      
      if (arbitraryValue.endsWith('px')) {
        const pixels = parseFloat(arbitraryValue);
        if (!isNaN(pixels)) {
          return {
            property: 'lineHeight',
            value: pixels,
            unit: 'PIXELS',
            variant: 'arbitrary'
          };
        }
      }
      
      
      const number = parseFloat(arbitraryValue);
      if (!isNaN(number)) {
        return {
          property: 'lineHeight',
          value: number * 100,
          unit: 'PERCENT',
          variant: 'arbitrary'
        };
      }
    }
  }

  // Letter spacing
  if (prefix.startsWith('tracking-')) {
    const value = prefix.replace('tracking-', '');
    
    
    if (LETTER_SPACING_MAP[value as keyof typeof LETTER_SPACING_MAP] !== undefined) {
      return {
        property: 'letterSpacing',
        value: LETTER_SPACING_MAP[value as keyof typeof LETTER_SPACING_MAP],
        variant: 'preset'
      };
    }

    
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      
      
      if (arbitraryValue.endsWith('%')) {
        const percent = parseFloat(arbitraryValue);
        if (!isNaN(percent)) {
          return {
            property: 'letterSpacing',
            value: percent,
            unit: 'PERCENT',
            variant: 'arbitrary'
          };
        }
      }
      
      
      if (arbitraryValue.endsWith('px')) {
        const pixels = parseFloat(arbitraryValue);
        if (!isNaN(pixels)) {
          return {
            property: 'letterSpacing',
            value: pixels,
            unit: 'PIXELS',
            variant: 'arbitrary'
          };
        }
      }
      
      
      const number = parseFloat(arbitraryValue);
      if (!isNaN(number)) {
        return {
          property: 'letterSpacing',
          value: number,
          variant: 'arbitrary'
        };
      }
    }
  }

  // Preset paragraph spacing
  if (prefix.startsWith('paragraph-')) {
    const value = prefix.replace('paragraph-', '');
    if (value in PARAGRAPH_SPACING_MAP) {
      return {
        property: 'paragraphSpacing',
        value: PARAGRAPH_SPACING_MAP[value as keyof typeof PARAGRAPH_SPACING_MAP],
        variant: 'preset'
      };
    }
  }

  // Preset paragraph indent
  if (prefix.startsWith('indent-')) {
    const value = prefix.replace('indent-', '');
    if (value in PARAGRAPH_INDENT_MAP) {
      return {
        property: 'paragraphIndent',
        value: PARAGRAPH_INDENT_MAP[value as keyof typeof PARAGRAPH_INDENT_MAP],
        variant: 'preset'
      };
    }
  }

  // Handle vertical alignment directly
  if (prefix.startsWith('align-')) {
    const value = prefix.replace('align-', '');

    // Handle Figma variables for vertical alignment
    if (value.startsWith('$[')) {
      const variableId = extractFigmaVariableId(value);
      if (variableId) {
        return {
          property: 'textAlignVertical',
          value: variableId,
          variant: 'figma-variable',
          variableId: variableId
        };
      }
      return null;
    }

    // Handle preset vertical alignment values
    if (TEXT_ALIGN_VERTICAL_MAP[value as keyof typeof TEXT_ALIGN_VERTICAL_MAP]) {
      return {
        property: 'textAlignVertical',
        value: TEXT_ALIGN_VERTICAL_MAP[value as keyof typeof TEXT_ALIGN_VERTICAL_MAP],
        variant: 'preset'
      };
    }
  }

  return null;
} 
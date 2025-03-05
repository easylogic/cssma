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

export function parseTextStyleValue(className: string): ParsedStyle | null {
  // opacity 처리를 위한 분리
  let opacity: number | undefined;
  let prefix = className;
  
  // Figma 변수가 아닌 부분에서 마지막 '/'를 찾아 opacity 처리
  const lastSlashIndex = className.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    const potentialOpacity = className.slice(lastSlashIndex + 1);
    const beforeSlash = className.slice(0, lastSlashIndex);
    
    // Figma 변수 내부의 '/'가 아닌지 확인
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
    }
    return null;
  }

  // 임의값 처리 ([...] 형식)
  if (prefix.includes('[') && prefix.includes(']')) {
    const match = prefix.match(/^([a-z-]+)-\[(.*?)\]$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // Handle text color
    if (type === 'text') {
      // 대괄호 제거
      const cleanValue = value.replace(/^\[|\]$/g, '');

      // 텍스트 크기 처리 (숫자만 있는 경우)
      const size = parseFloat(cleanValue);
      if (!isNaN(size) && cleanValue === size.toString()) {
        return {
          property: 'fontSize',
          value: size,
          variant: 'arbitrary'
        };
      }

      // 일반 색상 처리
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

    // 행간 처리
    if (type === 'leading') {
      const cleanValue = value.replace(/^\[|\]$/g, '');
      if (cleanValue.endsWith('px')) {
        const size = parseFloat(cleanValue);
        if (!isNaN(size)) {
          return {
            property: 'lineHeight',
            value: { value: size, unit: 'PIXELS' },
            variant: 'arbitrary'
          };
        }
      } else {
        const ratio = parseFloat(cleanValue);
        if (!isNaN(ratio)) {
          return {
            property: 'lineHeight',
            value: { value: ratio * 100, unit: 'PERCENT' },
            variant: 'arbitrary'
          };
        }
      }
    }

    // 자간 처리
    if (type === 'tracking') {
      const cleanValue = value.replace(/^\[|\]$/g, '');
      const spacing = parseFloat(cleanValue);
      if (!isNaN(spacing)) {
        // 단위가 있는 경우 (예: px, em)
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
          // 단위가 없는 경우 기본값으로 픽셀 사용
          return {
            property: 'letterSpacing',
            value: spacing,
            variant: 'arbitrary'
          };
        }
      }
    }
  }

  // 프리셋 값 처리
  if (prefix.startsWith('text-')) {
    const value = prefix.replace('text-', '');
    // Font size
    if (FONT_SIZES[value]) {
      return {
        property: 'fontSize',
        value: FONT_SIZES[value],
        variant: 'preset'
      };
    }

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
  }

  // Text transform
  if (TEXT_TRANSFORM_MAP[prefix as keyof typeof TEXT_TRANSFORM_MAP]) {
    return {
      property: 'textTransform',
      value: TEXT_TRANSFORM_MAP[prefix as keyof typeof TEXT_TRANSFORM_MAP],
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
    const preset = LINE_HEIGHT_MAP[value as keyof typeof LINE_HEIGHT_MAP];
    if (preset) {
      return {
        property: 'lineHeight',
        value: { value: preset, unit: 'PERCENT' },
        variant: 'preset'
      };
    }
  }

  // Letter spacing
  if (prefix.startsWith('tracking-')) {
    const value = prefix.replace('tracking-', '');
    const preset = LETTER_SPACING_MAP[value as keyof typeof LETTER_SPACING_MAP];
    if (preset !== undefined) {
      return {
        property: 'letterSpacing',
        value: preset,
        variant: 'preset'
      };
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

  return null;
} 
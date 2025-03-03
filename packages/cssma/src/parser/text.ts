import { ParsedStyle } from '../types';
import { FONT_SIZES, COLORS } from '../config/tokens';
import { isValidHexColor, isValidRgbColor } from '../utils/colors';

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

export function parseTextStyleValue(className: string): ParsedStyle | null {
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

  // 임의값 처리 ([...] 형식)
  if (prefix.includes('[') && prefix.includes(']')) {
    const match = prefix.match(/^([a-z-]+)-\[(.*?)\]$/);
    if (!match) return null;

    const [, type, value] = match;
    
    // 텍스트 색상 처리
    if (type === 'text' && (value.startsWith('#') || value.startsWith('rgb'))) {
      if (!isValidHexColor(value) && !isValidRgbColor(value)) {
        return null;
      }
      return {
        property: 'color',
        value,
        opacity,
        variant: 'arbitrary'
      };
    }

    // 텍스트 크기 처리
    if (type === 'text') {
      const size = parseFloat(value);
      if (!isNaN(size)) {
        return {
          property: 'fontSize',
          value: size,
          variant: 'arbitrary'
        };
      }
    }

    // 행간 처리
    if (type === 'leading') {
      if (value.endsWith('px')) {
        const size = parseFloat(value);
        if (!isNaN(size)) {
          return {
            property: 'lineHeight',
            value: { value: size, unit: 'PIXELS' },
            variant: 'arbitrary'
          };
        }
      } else {
        const ratio = parseFloat(value);
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
      const spacing = parseFloat(value);
      if (!isNaN(spacing)) {
        // 단위가 있는 경우 (예: px, em)
        if (value.endsWith('px')) {
          return {
            property: 'letterSpacing',
            value: { value: spacing, unit: 'PIXELS' },
            variant: 'arbitrary'
          };
        } else if (value.endsWith('em')) {
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

  return null;
} 
import { ParsedStyle } from '../types';
import { COLORS } from '../config/tokens';
import { isValidHexColor, isValidRgbColor, parseColor } from '../utils/colors';

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
    
    // 배경색 처리
    if (type === 'bg' && (value.startsWith('#') || value.startsWith('rgb'))) {
      if (!isValidHexColor(value) && !isValidRgbColor(value)) {
        return null;
      }
      return {
        property: 'backgroundColor',
        value,
        opacity,
        variant: 'arbitrary'
      };
    }

    // 그라디언트 색상 처리
    if (['from', 'via', 'to'].includes(type) && (value.startsWith('#') || value.startsWith('rgb'))) {
      if (!isValidHexColor(value) && !isValidRgbColor(value)) {
        return null;
      }
      return {
        property: `gradient${type.charAt(0).toUpperCase() + type.slice(1)}`,
        value,
        opacity,
        variant: 'arbitrary'
      };
    }
  }

  if (prefix.startsWith('from-')) {
    const colorValue = prefix.replace('from-', '');
    return {
      property: 'gradientFrom',
      value: COLORS[colorValue] || parseColor(colorValue),
      variant: 'preset'
    };
  }

  if (prefix.startsWith('via-')) {
    const colorValue = prefix.replace('via-', '');
    return {
      property: 'gradientVia',
      value: COLORS[colorValue] || parseColor(colorValue),
      variant: 'preset'
    };
  }

  if (prefix.startsWith('to-')) {
    const colorValue = prefix.replace('to-', '');
    return {
      property: 'gradientTo',
      value: COLORS[colorValue] || parseColor(colorValue),
      variant: 'preset'
    };
  }
  // 프리셋 값 처리
  if (prefix.startsWith('bg-')) {
    const value = prefix.replace('bg-', '');

    // Background blend mode
    if (value.startsWith('blend-')) {
      const mode = value.replace('blend-', '');
      if (BACKGROUND_BLEND_MODES[mode as keyof typeof BACKGROUND_BLEND_MODES]) {
        return {
          property: 'backgroundBlendMode',
          value: BACKGROUND_BLEND_MODES[mode as keyof typeof BACKGROUND_BLEND_MODES],
          variant: 'preset'
        };
      }
      return null;
    }

    // Background size
    if (BACKGROUND_SIZE_MAP[value as keyof typeof BACKGROUND_SIZE_MAP]) {
      return {
        property: 'backgroundSize',
        value: BACKGROUND_SIZE_MAP[value as keyof typeof BACKGROUND_SIZE_MAP],
        variant: 'preset'
      };
    }

    // Background position
    if (BACKGROUND_POSITION_MAP[value as keyof typeof BACKGROUND_POSITION_MAP]) {
      return {
        property: 'backgroundPosition',
        value: BACKGROUND_POSITION_MAP[value as keyof typeof BACKGROUND_POSITION_MAP],
        variant: 'preset'
      };
    }

    // Background repeat
    if (value === 'repeat' || value === 'no-repeat' || value.startsWith('repeat-')) {
      const repeat = BACKGROUND_REPEAT_MAP[value as keyof typeof BACKGROUND_REPEAT_MAP];
      if (repeat) {
        return {
          property: 'backgroundRepeat',
          value: repeat,
          variant: 'preset'
        };
      }
      return null;
    }

    // Background attachment
    if (BACKGROUND_ATTACHMENT_MAP[value as keyof typeof BACKGROUND_ATTACHMENT_MAP]) {
      return {
        property: 'backgroundAttachment',
        value: BACKGROUND_ATTACHMENT_MAP[value as keyof typeof BACKGROUND_ATTACHMENT_MAP],
        variant: 'preset'
      };
    }

    // Background origin
    if (value.startsWith('origin-')) {
      const origin = value.replace('origin-', '');
      if (BACKGROUND_ORIGIN_MAP[origin as keyof typeof BACKGROUND_ORIGIN_MAP]) {
        return {
          property: 'backgroundOrigin',
          value: BACKGROUND_ORIGIN_MAP[origin as keyof typeof BACKGROUND_ORIGIN_MAP],
          variant: 'preset'
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
          variant: 'preset'
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
        variant: 'preset'
      };
    }

    // Radial gradients
    if (value === 'radial') {
      return {
        property: 'backgroundColor',
        value: 'radial',
        variant: 'preset'
      };
    }

    // Conic gradients
    if (value === 'conic') {
      return {
        property: 'backgroundColor',
        value: 'conic',
        variant: 'preset'
      };
    }

    // Preset colors
    if (COLORS[value]) {
      return {
        property: 'backgroundColor',
        value: COLORS[value],
        opacity,
        variant: 'preset'
      };
    }
  }

  return null;
} 
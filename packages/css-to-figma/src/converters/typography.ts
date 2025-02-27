import { FigmaTextProps } from '../types';

const FONT_SIZE_MAP: Record<string, number> = {
  'xs': 12,
  'sm': 14,
  'base': 16,
  'md': 16,
  'lg': 18,
  'xl': 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60
};

const FONT_WEIGHT_MAP: Record<string, string> = {
  'thin': 'Thin',
  'extralight': 'ExtraLight',
  'light': 'Light',
  'normal': 'Regular',
  'medium': 'Medium',
  'semibold': 'SemiBold',
  'bold': 'Bold',
  'extrabold': 'ExtraBold',
  'black': 'Black'
};

const LINE_HEIGHT_MAP: Record<string, number> = {
  'none': 100,
  'tight': 125,
  'snug': 137.5,
  'normal': 150,
  'relaxed': 165,
  'loose': 200
};

const LETTER_SPACING_MAP: Record<string, number> = {
  'tighter': -0.8,
  'tight': -0.4,
  'normal': 0,
  'wide': 0.4,
  'wider': 0.8,
  'widest': 1.6
};

export function convertTypography(value: string): FigmaTextProps {
  const classes = value.split(' ');
  const result: FigmaTextProps = {};

  // Handle font size
  for (const cls of classes) {
    if (cls.startsWith('text-')) {
      const size = cls.replace('text-', '');
      if (FONT_SIZE_MAP[size]) {
        result.fontSize = FONT_SIZE_MAP[size];
      }
    }
  }

  // Handle font weight
  for (const cls of classes) {
    if (cls.startsWith('font-')) {
      const weight = cls.replace('font-', '');
      if (FONT_WEIGHT_MAP[weight]) {
        result.fontName = {
          family: 'Inter',
          style: FONT_WEIGHT_MAP[weight]
        };
      }
    }
  }

  // Handle text alignment
  if (classes.includes('text-left')) {
    result.textAlignHorizontal = 'LEFT';
  } else if (classes.includes('text-center')) {
    result.textAlignHorizontal = 'CENTER';
  } else if (classes.includes('text-right')) {
    result.textAlignHorizontal = 'RIGHT';
  } else if (classes.includes('text-justify')) {
    result.textAlignHorizontal = 'JUSTIFIED';
  }

  // Handle line height
  for (const cls of classes) {
    if (cls.startsWith('leading-')) {
      const height = cls.replace('leading-', '');
      if (LINE_HEIGHT_MAP[height]) {
        result.lineHeight = {
          value: LINE_HEIGHT_MAP[height],
          unit: 'PERCENT'
        };
      }
    }
  }

  // Handle letter spacing
  for (const cls of classes) {
    if (cls.startsWith('tracking-')) {
      const spacing = cls.replace('tracking-', '');
      if (LETTER_SPACING_MAP[spacing] !== undefined) {
        result.letterSpacing = LETTER_SPACING_MAP[spacing];
      }
    }
  }

  // Handle text decoration
  if (classes.includes('underline')) {
    result.textDecoration = 'UNDERLINE';
  } else if (classes.includes('line-through')) {
    result.textDecoration = 'STRIKETHROUGH';
  } else if (classes.includes('no-underline')) {
    result.textDecoration = 'NONE';
  }

  return result;
}

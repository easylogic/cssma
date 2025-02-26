import { FigmaEffect, FigmaColor } from '../types';

interface ShadowConfig {
  y: number;
  blur: number;
  spread: number;
  opacity: number;
}

const SHADOW_PRESETS: Record<string, ShadowConfig> = {
  'sm': { y: 1, blur: 2, spread: 0, opacity: 0.05 },
  'DEFAULT': { y: 2, blur: 4, spread: -1, opacity: 0.1 },
  'md': { y: 4, blur: 6, spread: -2, opacity: 0.1 },
  'lg': { y: 8, blur: 10, spread: -3, opacity: 0.1 },
  'xl': { y: 12, blur: 14, spread: -4, opacity: 0.1 },
  '2xl': { y: 16, blur: 20, spread: -5, opacity: 0.1 }
};

const BLUR_SIZES: Record<string, number> = {
  'sm': 4,
  'DEFAULT': 8,
  'md': 12,
  'lg': 16,
  'xl': 24,
  '2xl': 40,
  '3xl': 64
};

const TAILWIND_COLORS: Record<string, FigmaColor> = {
  'blue-500': { r: 0.24, g: 0.47, b: 0.95 },
  'red-500': { r: 0.94, g: 0.23, b: 0.23 },
  'green-500': { r: 0.14, g: 0.76, b: 0.38 }
  // Add more colors as needed
};

function createDropShadow(config: ShadowConfig): FigmaEffect {
  return {
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: config.opacity },
    offset: { x: 0, y: config.y },
    radius: config.blur,
    spread: config.spread,
    visible: true,
    blendMode: 'NORMAL'
  };
}

function createInnerShadow(): FigmaEffect {
  return {
    type: 'INNER_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.06 },
    offset: { x: 0, y: 2 },
    radius: 4,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL'
  };
}

function createColoredShadow(color: FigmaColor, opacity: number): FigmaEffect {
  const defaultConfig = SHADOW_PRESETS['DEFAULT'];
  return {
    type: 'DROP_SHADOW',
    color: { ...color, a: opacity },
    offset: { x: 0, y: defaultConfig.y },
    radius: defaultConfig.blur,
    spread: defaultConfig.spread,
    visible: true,
    blendMode: 'NORMAL'
  };
}

function parseShadowColor(colorString: string): { color: FigmaColor; opacity: number } {
  const [color, opacity] = colorString.split('/');
  const baseColor = TAILWIND_COLORS[color] || { r: 0, g: 0, b: 0 };
  return {
    color: baseColor,
    opacity: opacity ? parseFloat(opacity) / 100 : 1
  };
}

function parseBlurSize(value: string): number {
  if (!value || value === 'blur') {
    return BLUR_SIZES['DEFAULT'];
  }
  const size = value.match(/\d+xl|\d+|[a-z]+/)?.[0];
  return size ? (BLUR_SIZES[size] || parseInt(size)) : BLUR_SIZES['DEFAULT'];
}

export function convertEffects(value: string): FigmaEffect[] {
  const classes = value.split(' ');
  const effects: FigmaEffect[] = [];

  for (const cls of classes) {
    // Handle shadows
    if (cls === 'shadow' || cls.startsWith('shadow-')) {
      const size = cls === 'shadow' ? 'DEFAULT' : cls.replace('shadow-', '');

      if (size === 'inner') {
        effects.push(createInnerShadow());
      } else if (size.includes('-')) {
        const { color, opacity } = parseShadowColor(size);
        effects.push(createColoredShadow(color, opacity));
      } else {
        const config = SHADOW_PRESETS[size];
        if (config) {
          effects.push(createDropShadow(config));
        }
      }
    }

    // Handle blur effects
    if (cls === 'blur' || cls.startsWith('blur-')) {
      const size = cls === 'blur' ? '' : cls.replace('blur-', '');
      const radius = parseBlurSize(size);
      effects.push({
        type: 'LAYER_BLUR',
        radius,
        visible: true,
        blendMode: 'NORMAL'
      });
    }

    // Handle backdrop blur
    if (cls === 'backdrop-blur' || cls.startsWith('backdrop-blur-')) {
      const size = cls === 'backdrop-blur' ? '' : cls.replace('backdrop-blur-', '');
      const radius = parseBlurSize(size);
      effects.push({
        type: 'BACKGROUND_BLUR',
        radius,
        visible: true,
        blendMode: 'NORMAL'
      });
    }
  }

  return effects;
}

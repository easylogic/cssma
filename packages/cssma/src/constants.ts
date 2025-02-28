// Position Types
export const VALID_POSITION_TYPES = ['ABSOLUTE', 'RELATIVE', 'FIXED'] as const;

// Layout Modes
export const VALID_LAYOUT_MODES = ['HORIZONTAL', 'VERTICAL'] as const;

// Alignment Values
export const VALID_PRIMARY_AXIS_VALUES = ['MIN', 'CENTER', 'MAX', 'SPACE_BETWEEN'] as const;
export const VALID_COUNTER_AXIS_VALUES = ['MIN', 'CENTER', 'MAX', 'BASELINE'] as const;

// Sizing Values
export const VALID_SIZING_VALUES = ['FIXED', 'FILL', 'HUG'] as const;

// Blend Modes
export const VALID_BLEND_MODES = ['NORMAL', 'MULTIPLY', 'SCREEN', 'OVERLAY', 'DARKEN', 'LIGHTEN'] as const;

// Text Alignment
export const VALID_TEXT_ALIGN_HORIZONTAL = ['LEFT', 'CENTER', 'RIGHT', 'JUSTIFIED'] as const;
export const VALID_TEXT_ALIGN_VERTICAL = ['TOP', 'CENTER', 'BOTTOM'] as const;

// Text Decoration
export const VALID_TEXT_DECORATION = ['NONE', 'UNDERLINE', 'STRIKETHROUGH'] as const;

// Font Weights
export const FONT_WEIGHTS: Record<string, number> = {
  'thin': 100,
  'extralight': 200,
  'light': 300,
  'normal': 400,
  'regular': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700,
  'extrabold': 800,
  'black': 900
} as const;

// Font Families
export const FONT_FAMILIES = {
  'sans': 'Inter',
  'serif': 'Georgia',
  'mono': 'Roboto Mono'
} as const;

// Font Styles
export const VALID_FONT_STYLES = ['NORMAL', 'ITALIC'] as const;

// Border Style
export const VALID_BORDER_STYLES = ['SOLID', 'DASHED', 'DOTTED'] as const;

// Border Align
export const VALID_STROKE_ALIGN = ['INSIDE', 'OUTSIDE', 'CENTER'] as const;

// Effect Types
export const VALID_EFFECT_TYPES = ['DROP_SHADOW', 'INNER_SHADOW', 'LAYER_BLUR', 'BACKGROUND_BLUR'] as const;

// Spacing Map
export const SPACING_MAP: Record<string, number> = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64
}; 
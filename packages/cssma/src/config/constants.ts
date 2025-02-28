// Layout Mode Constants
export const LAYOUT_MODE_MAP = {
  'flex-row': 'HORIZONTAL',
  'flex-col': 'VERTICAL'
} as const;

// Layout Wrap Constants
export const LAYOUT_WRAP_MAP = {
  'wrap': 'WRAP',
  'nowrap': 'NO_WRAP'
} as const;

// Alignment Constants
export const PRIMARY_AXIS_ALIGN_MAP = {
  'justify-start': 'MIN',
  'justify-center': 'CENTER',
  'justify-end': 'MAX',
  'justify-between': 'SPACE_BETWEEN'
} as const;

export const COUNTER_AXIS_ALIGN_MAP = {
  'items-start': 'MIN',
  'items-center': 'CENTER',
  'items-end': 'MAX',
  'items-baseline': 'BASELINE'
} as const;

// Sizing Constants
export const SIZING_MAP = {
  'auto': 'HUG',
  'full': 'FILL'
} as const;

// Text Alignment Constants
export const TEXT_ALIGNMENTS = {
  'left': 'LEFT',
  'center': 'CENTER',
  'right': 'RIGHT',
  'justify': 'JUSTIFIED'
} as const;

// Blend Mode Constants
export const BLEND_MODE_MAP = {
  'normal': 'NORMAL',
  'multiply': 'MULTIPLY',
  'screen': 'SCREEN',
  'overlay': 'OVERLAY',
  'darken': 'DARKEN',
  'lighten': 'LIGHTEN',
  'color-dodge': 'COLOR_DODGE',
  'color-burn': 'COLOR_BURN',
  'hard-light': 'HARD_LIGHT',
  'soft-light': 'SOFT_LIGHT',
  'difference': 'DIFFERENCE',
  'exclusion': 'EXCLUSION',
  'hue': 'HUE',
  'saturation': 'SATURATION',
  'color': 'COLOR',
  'luminosity': 'LUMINOSITY'
} as const;

// Gradient Transform Constants
export const GRADIENT_TRANSFORMS = {
  'to-t': [[1, 0, 0], [0, -1, 1]],
  'to-r': [[1, 0, 0], [0, 1, 0]],
  'to-b': [[1, 0, 0], [0, 1, 0]],
  'to-l': [[-1, 0, 1], [0, 1, 0]],
  'to-tr': [[0.7071, -0.7071, 0], [0.7071, 0.7071, 0]],
  'to-tl': [[-0.7071, -0.7071, 1], [0.7071, -0.7071, 0]],
  'to-br': [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0]],
  'to-bl': [[-0.7071, 0.7071, 1], [-0.7071, -0.7071, 1]]
} as const; 
import {
  VALID_POSITION_TYPES,
  VALID_LAYOUT_MODES,
  VALID_PRIMARY_AXIS_VALUES,
  VALID_COUNTER_AXIS_VALUES,
  VALID_SIZING_VALUES,
  VALID_BLEND_MODES,
  VALID_TEXT_ALIGN_HORIZONTAL,
  VALID_TEXT_ALIGN_VERTICAL,
  VALID_TEXT_DECORATION,
  VALID_BORDER_STYLES,
  VALID_STROKE_ALIGN,
  VALID_EFFECT_TYPES
} from '../constants';

export type PositionType = typeof VALID_POSITION_TYPES[number];
export type LayoutMode = typeof VALID_LAYOUT_MODES[number];
export type PrimaryAxisValue = typeof VALID_PRIMARY_AXIS_VALUES[number];
export type CounterAxisValue = typeof VALID_COUNTER_AXIS_VALUES[number];
export type SizingValue = typeof VALID_SIZING_VALUES[number];
export type BlendMode = typeof VALID_BLEND_MODES[number];
export type TextAlignHorizontal = typeof VALID_TEXT_ALIGN_HORIZONTAL[number];
export type TextAlignVertical = typeof VALID_TEXT_ALIGN_VERTICAL[number];
export type TextDecoration = typeof VALID_TEXT_DECORATION[number];
export type BorderStyle = typeof VALID_BORDER_STYLES[number];
export type StrokeAlign = typeof VALID_STROKE_ALIGN[number];
export type EffectType = typeof VALID_EFFECT_TYPES[number]; 
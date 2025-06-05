import { ParsedStyle, FigmaStyleProperties } from '../types';

type LayoutMode = 'HORIZONTAL' | 'VERTICAL' | 'GRID';
type PrimaryAxisAlignValue = 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
type CounterAxisAlignValue = 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
type LayoutAlignValue = 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
type SizingValue = 'FIXED' | 'FILL' | 'HUG';

const SPACING_MAP: Record<string, number> = {
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

function parseSpacing(value: string): number {
  const size = value.match(/\d+/)?.[0];
  return size ? (SPACING_MAP[size] || parseInt(size) * 4) : 0;
}

const VALID_LAYOUT_MODES: readonly LayoutMode[] = ['HORIZONTAL', 'VERTICAL', 'GRID'];
const VALID_PRIMARY_AXIS_VALUES: readonly PrimaryAxisAlignValue[] = ['MIN', 'CENTER', 'MAX', 'SPACE_BETWEEN'];
const VALID_COUNTER_AXIS_VALUES: readonly CounterAxisAlignValue[] = ['MIN', 'CENTER', 'MAX', 'BASELINE'];
const VALID_LAYOUT_ALIGN_VALUES: readonly LayoutAlignValue[] = ['MIN', 'CENTER', 'MAX', 'STRETCH'];
const VALID_SIZING_VALUES: readonly SizingValue[] = ['FIXED', 'FILL', 'HUG'];

export function convertLayoutToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {};

  switch (style.property) {
    case 'layoutMode':
      if (typeof style.value === 'string' && VALID_LAYOUT_MODES.includes(style.value as LayoutMode)) {
        result.layoutMode = style.value as LayoutMode;
      }
      break;

    case 'layoutWrap':
      if (typeof style.value === 'string') {
        result.layoutWrap = style.value as 'NO_WRAP' | 'WRAP';
      }
      break;

    case 'primaryAxisAlignItems':
      if (typeof style.value === 'string' && VALID_PRIMARY_AXIS_VALUES.includes(style.value as PrimaryAxisAlignValue)) {
        result.primaryAxisAlignItems = style.value as PrimaryAxisAlignValue;
      }
      break;

    case 'counterAxisAlignItems':
      if (typeof style.value === 'string' && VALID_COUNTER_AXIS_VALUES.includes(style.value as CounterAxisAlignValue)) {
        result.counterAxisAlignItems = style.value as CounterAxisAlignValue;
      }
      break;

    case 'layoutAlign':
      if (typeof style.value === 'string' && VALID_LAYOUT_ALIGN_VALUES.includes(style.value as LayoutAlignValue)) {
        result.layoutAlign = style.value as LayoutAlignValue;
      }
      break;

    case 'width':
      if (typeof style.value === 'number' && style.value >= 0) {
        result.width = style.value;
        result.layoutSizingHorizontal = 'FIXED';
      } else if (style.value === 'full') {
        result.layoutSizingHorizontal = 'FILL';
      } else if (style.value === 'auto') {
        result.layoutSizingHorizontal = 'HUG';
      }
      break;

    case 'height':
      if (typeof style.value === 'number' && style.value >= 0) {
        result.height = style.value;
        result.layoutSizingVertical = 'FIXED';
      } else if (style.value === 'full') {
        result.layoutSizingVertical = 'FILL';
      } else if (style.value === 'auto') {
        result.layoutSizingVertical = 'HUG';
      }
      break;

    case 'layoutSizingHorizontal':
      if (typeof style.value === 'string' && VALID_SIZING_VALUES.includes(style.value as SizingValue)) {
        result.layoutSizingHorizontal = style.value as SizingValue;
      }
      break;

    case 'layoutSizingVertical':
      if (typeof style.value === 'string' && VALID_SIZING_VALUES.includes(style.value as SizingValue)) {
        result.layoutSizingVertical = style.value as SizingValue;
      }
      break;
  }

  return result;
}

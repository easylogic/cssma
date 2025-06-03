import { parseStyles } from '../parser';
import { convertStylesToFigma } from '../converter';
import type { FigmaStyleProperties } from '../types';

export interface StyleProcessorOptions {
  parentLayoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
}

export function processCssStyles(
  classNames?: string,
  options: StyleProcessorOptions = {}
): FigmaStyleProperties {
  if (!classNames) return {};

  const parsedStyles = parseStyles(classNames);
  const result = convertStylesToFigma(parsedStyles, options);
  
  const hasArbitraryWidth = parsedStyles.some(
    style => style.property === 'width' && style.variant === 'arbitrary'
  );

  
  if (result.width !== undefined && result.layoutSizingHorizontal === undefined) {
    result.layoutSizingHorizontal = 'FIXED';
  }

  
  if (hasArbitraryWidth) {
    result.layoutSizingHorizontal = 'FIXED';
  }

  
  if (result.height !== undefined && result.layoutSizingVertical === undefined) {
    result.layoutSizingVertical = 'FIXED';
  }

  return result;
} 
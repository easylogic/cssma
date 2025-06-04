import { ParsedStyle } from '../types';
import { parseBackgroundStyleValue } from './background';
import { parseBorderStyleValue } from './border';
import { parseFontStyleValue } from './font';
import { parseLayoutValue } from './layout';
import { parseSpacingValue } from './spacing';
import { parseTextStyleValue } from './text';
import { parseShapeStyleValue } from './shape';
import { parseShadowStyleValue } from './shadow';
import { parseTransformStyleValue } from './transform';
import { parseBlendStyleValue } from './blend';
import { parseFilterStyleValue } from './filter';
import { parseAspectStyleValue } from './aspect';
import { parseOverflowStyleValue } from './overflow';
import { parsePositionStyleValue, parsePositionStyles } from './position';

import { FontState } from './font';
import { parseSizeStyleValue } from './size';

export function parseStyleValue(className: string, fontState?: FontState): ParsedStyle | null {

  const positionStyle = parsePositionStyleValue(className);
  if (positionStyle) return positionStyle;

  const transformStyle = parseTransformStyleValue(className);
  if (transformStyle) return transformStyle;

  const blendStyle = parseBlendStyleValue(className);
  if (blendStyle) return blendStyle;

  const filterStyle = parseFilterStyleValue(className);
  if (filterStyle) return filterStyle;

  const aspectStyle = parseAspectStyleValue(className);
  if (aspectStyle) return aspectStyle;

  const overflowStyle = parseOverflowStyleValue(className);
  if (overflowStyle) return overflowStyle;

  if (className.startsWith('bg-') || 
      className.startsWith('fill-') ||
      className.startsWith('from-') || 
      className.startsWith('via-') || 
      className.startsWith('to-')) {
    return parseBackgroundStyleValue(className);
  }

  if (className.startsWith('text-') || 
      className.startsWith('text-wrap') ||
      className.startsWith('align-') ||
      className === 'uppercase' || 
      className === 'lowercase' || 
      className === 'capitalize' || 
      className === 'normal-case' || 
      className === 'underline' || 
      className === 'line-through' || 
      className === 'no-underline') {
    return parseTextStyleValue(className);
  }

  if (className.startsWith('font-') || 
      className === 'italic' || 
      className === 'not-italic') {
    return parseFontStyleValue(className);
  }

  if (className.startsWith('border') || className.startsWith('rounded')) {
    return parseBorderStyleValue(className);
  }

  if (className.startsWith('flex-') || 
      className.startsWith('grid') ||
      className.startsWith('items-') || 
      className.startsWith('justify-') || 
      className.startsWith('w-') || 
      className.startsWith('h-')) {
    return parseLayoutValue(className);
  }

  if (className.startsWith('min-w-') || 
      className.startsWith('max-w-') || 
      className.startsWith('min-h-') || 
      className.startsWith('max-h-')) {
    return parseSizeStyleValue(className);
  }

  if (className.startsWith('gap-') || className.startsWith('p')) {
    return parseSpacingValue(className);
  }

  if (className.startsWith('opacity-')) {
    return parseShapeStyleValue(className);
  }

  if (className.startsWith('shadow')) {
    return parseShadowStyleValue(className);
  }

  return null;
}

export function parseStyles(classNames: string): ParsedStyle[] {
  let allClasses = classNames.split(' ').filter(Boolean);
  const fontState = new FontState();
  const styles: ParsedStyle[] = [];
  
  const positionClasses = allClasses.filter(cls => 
    cls === 'absolute' || 
    cls === 'relative' ||
    cls.startsWith('left-') || 
    cls.startsWith('right-') || 
    cls.startsWith('top-') || 
    cls.startsWith('bottom-') ||
    cls.startsWith('center-') ||
    cls.startsWith('stretch-')
  );

  if (positionClasses.length > 0) {
    const positionStyle = parsePositionStyles(positionClasses);
    if (positionStyle) {
      styles.push(positionStyle);
    }
    
    allClasses = allClasses.filter(cls => !positionClasses.includes(cls));
  }

  // all classes processed
  for (const className of allClasses) {
    const style = parseStyleValue(className, fontState);
    if (style) {
      styles.push(style);
    }
  }

  return styles;
} 
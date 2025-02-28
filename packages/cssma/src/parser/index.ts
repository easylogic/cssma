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
import { parsePositionStyleValue } from './position';

// 폰트 상태를 저장하는 클래스 import
import { FontState } from './font';

/**
 * Tailwind CSS 스타일 값을 파싱합니다.
 * 프리셋 값과 임의 값 모두 처리합니다.
 */
export function parseStyleValue(className: string, fontState?: FontState): ParsedStyle | null {
  // Position 관련 스타일
  const positionStyle = parsePositionStyleValue(className);
  if (positionStyle) return positionStyle;

  // Transform 관련 스타일
  const transformStyle = parseTransformStyleValue(className);
  if (transformStyle) return transformStyle;

  // Blend mode 관련 스타일
  const blendStyle = parseBlendStyleValue(className);
  if (blendStyle) return blendStyle;

  // Filter 관련 스타일
  const filterStyle = parseFilterStyleValue(className);
  if (filterStyle) return filterStyle;

  // Aspect ratio 관련 스타일
  const aspectStyle = parseAspectStyleValue(className);
  if (aspectStyle) return aspectStyle;

  // Overflow 관련 스타일
  const overflowStyle = parseOverflowStyleValue(className);
  if (overflowStyle) return overflowStyle;

  // Background 관련 스타일
  if (className.startsWith('bg-') || 
      className.startsWith('from-') || 
      className.startsWith('via-') || 
      className.startsWith('to-')) {
    return parseBackgroundStyleValue(className);
  }

  // Text 관련 스타일
  if (className.startsWith('text-') || 
      className === 'underline' || 
      className === 'line-through' || 
      className === 'no-underline') {
    return parseTextStyleValue(className);
  }

  // Font 관련 스타일
  if (className.startsWith('font-') || 
      className === 'italic' || 
      className === 'not-italic') {
    return parseFontStyleValue(className);
  }

  // Border 관련 스타일
  if (className.startsWith('border') || className.startsWith('rounded')) {
    return parseBorderStyleValue(className);
  }

  // Layout 관련 스타일
  if (className.startsWith('flex-') || 
      className.startsWith('items-') || 
      className.startsWith('justify-') || 
      className.startsWith('w-') || 
      className.startsWith('h-')) {
    return parseLayoutValue(className);
  }

  // Spacing 관련 스타일
  if (className.startsWith('gap-') || className.startsWith('p')) {
    return parseSpacingValue(className);
  }

  // Shape 관련 스타일
  if (className.startsWith('opacity-')) {
    return parseShapeStyleValue(className);
  }

  // Shadow 관련 스타일
  if (className.startsWith('shadow')) {
    return parseShadowStyleValue(className);
  }

  return null;
}

/**
 * 여러 Tailwind CSS 클래스를 파싱합니다.
 */
export function parseStyles(classNames: string): ParsedStyle[] {
  const classes = classNames.split(' ').filter(Boolean);
  const fontState = new FontState();
  const styles: ParsedStyle[] = [];

  for (const className of classes) {
    const style = parseStyleValue(className, fontState);
    if (style) {
      styles.push(style);
    }
  }

  return styles;
} 
import { ParsedStyle, FigmaStyleProperties, FigmaPaint } from '../types';
import { convertAspectToFigma } from './aspect';
import { convertBackgroundToFigma, convertGradientListToFigma } from './background';
import { convertBlendToFigma } from './blend';
import { convertBorderToFigma } from './border';
import { convertFilterToFigma } from './filter';
import { convertFontToFigma } from './font';
import { convertLayoutToFigma } from './layout';
import { convertOverflowToFigma } from './overflow';
import { convertShadowToFigma } from './shadow';
import { convertShapeToFigma } from './shape';
import { convertSpacingToFigma } from './spacing';
import { convertTextToFigma } from './text';
import { convertTransformToFigma } from './transform';

const FONT_PROPERTIES = ['fontSize', 'fontFamily', 'fontWeight', 'fontStyle'];
const TEXT_PROPERTIES = ['color', 'textAlign', 'textDecoration', 'letterSpacing', 'lineHeight'];

/**
 * 파싱된 스타일들을 Figma 스타일로 변환합니다.
 */
export function convertStylesToFigma(
  styles: ParsedStyle[],
  context: { parentLayoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL' } = {}
): FigmaStyleProperties {
  const result: Partial<FigmaStyleProperties> = {};
  let gradientStyles: ParsedStyle[] = [];
  let fontStyles: ParsedStyle[] = [];
  let textStyles: ParsedStyle[] = [];

  // 스타일들을 분류
  for (const style of styles) {
    // 그라디언트와 배경색 처리
    if (style.property.startsWith('gradient') || 
        (style.property === 'backgroundColor' && !style.property.startsWith('text'))) {
      gradientStyles.push(style);
      continue;
    }

    // 폰트 속성 처리
    if (FONT_PROPERTIES.includes(style.property)) {
      fontStyles.push(style);
      continue;
    }

    // 텍스트 속성 처리 (색상 포함)
    if (TEXT_PROPERTIES.includes(style.property) || 
        style.property.startsWith('text') || 
        style.property === 'color') {
      textStyles.push(style);
      continue;
    }

    let converted: Partial<FigmaStyleProperties> = {};

    // 나머지 스타일 처리
    if (style.property.startsWith('aspect')) {
      converted = convertAspectToFigma(style);
    } else if (style.property.includes('blendMode')) {
      const blendResult = convertBlendToFigma(style);
      if ('blendMode' in blendResult) {
        converted = blendResult as Partial<FigmaStyleProperties>;
      }
    } else if (style.property.startsWith('border') || style.property.startsWith('stroke')) {
      converted = convertBorderToFigma(style);
    } else if (style.property.includes('blur')) {
      converted = convertFilterToFigma(style);
    } else if (
      style.property.startsWith('layout') 
      || style.property === 'width' 
      || style.property === 'height'
      || style.property === 'min-width'
      || style.property === 'min-height'
      || style.property === 'max-width'
      || style.property === 'max-height'
      || style.property === 'flex-row'
      || style.property === 'flex-col'
      || style.property === 'counterAxisAlignItems'
      || style.property === 'primaryAxisAlignItems'
    ) {
      converted = convertLayoutToFigma(style);
    } else if (style.property === 'overflow') {
      converted = convertOverflowToFigma(style);
    } else if (style.property.includes('boxShadow')) {
      converted = convertShadowToFigma(style);
    } else if (style.property === 'opacity') {
      converted = convertShapeToFigma(style);
    } else if (
      style.property.startsWith('padding') 
      || style.property === 'gap'
      || style.property === 'counterAxisSpacing'
      || style.property === 'itemSpacing'
    ) {
      converted = convertSpacingToFigma(style);
    } else if (style.property === 'rotation') {
      converted = convertTransformToFigma(style);
    }

    // 변환된 스타일을 결과에 병합
    Object.assign(result, converted);
  }

  // 폰트 스타일 처리
  if (fontStyles.length > 0) {
    const fontResult = convertFontToFigma(fontStyles);
    Object.assign(result, fontResult);
  }

  // 텍스트 스타일 처리
  if (textStyles.length > 0) {
    for (const style of textStyles) {
      const textResult = convertTextToFigma(style);
      Object.assign(result, textResult);
    }
  }

  // 그라디언트 스타일 처리
  const fills: FigmaPaint[] = [];
  if (gradientStyles.length > 0) {
    if (gradientStyles[0].property === 'backgroundColor') {
      if (gradientStyles[0].value === 'linear' || gradientStyles[0].value === 'radial' || gradientStyles[0].value === 'conic') {
        fills.push(...convertGradientListToFigma(gradientStyles));
      } else {
        fills.push(...convertBackgroundToFigma(gradientStyles[0]));
      }
    }
  }

  if (fills.length > 0) {
    result.fills = fills;
  }

  return result as FigmaStyleProperties;
} 
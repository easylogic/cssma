import { ParsedStyle, FigmaStyleProperties, FigmaPaint } from '../types';
import { convertAspectToFigma } from './aspect';
import { convertBackgroundToFigma, convertGradientToFigma, convertImageToFigma } from './background';
import { convertBlendToFigma } from './blend';
import { convertBorderToFigma } from './border';
import { convertFilterToFigma } from './filter';
import { convertFontToFigma } from './font';
import { convertLayoutToFigma } from './layout';
import { convertOverflowToFigma } from './overflow';
import { convertPositionToFigma } from './position';
import { convertShadowToFigma } from './shadow';
import { convertShapeToFigma } from './shape';
import { convertSpacingToFigma } from './spacing';
import { convertTextToFigma } from './text';
import { convertTransformToFigma } from './transform';
import { convertAnimationToFigma, extractAnimationMetadata } from './animation';
import { convertAnimationToFigmaReactions, generatePrototypeSuggestions, FigmaReaction } from '../figma/prototyping';

// CSS converters
import { convertAspectToCss } from './css/aspect';
import { convertBackgroundToCss, convertGradientToCss, convertImageToCss } from './css/background';
import { convertBlendToCss } from './css/blend';
import { convertBorderToCss } from './css/border';
import { convertFilterToCss } from './css/filter';
import { convertFontToCss } from './css/font';
import { convertLayoutToCss } from './css/layout';
import { convertOverflowToCss } from './css/overflow';
import { convertPositionToCss } from './css/position';
import { convertShadowToCss } from './css/shadow';
import { convertShapeToCss } from './css/shape';
import { convertSpacingToCss } from './css/spacing';
import { convertTextToCss } from './css/text';
import { convertTransformToCss } from './css/transform';
import { convertAnimationToCSS } from './css/animation';

const FONT_PROPERTIES = ['fontSize', 'fontFamily', 'fontWeight', 'fontStyle'];
const TEXT_PROPERTIES = ['color', 'textAlign', 'textDecoration', 'letterSpacing', 'lineHeight'];

export function convertStylesToFigma(
  styles: ParsedStyle[],
  context: { parentLayoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL' | 'GRID' } = {}
): FigmaStyleProperties {
  const result: Partial<FigmaStyleProperties> = {};
  let gradientStyles: ParsedStyle[] = [];
  let fontStyles: ParsedStyle[] = [];
  let textStyles: ParsedStyle[] = [];
  let positionStyles: ParsedStyle[] = [];
  let animationStyles: ParsedStyle[] = [];

  
  for (const style of styles) {
    
    if (style.property.startsWith('gradient') || 
        (style.property === 'backgroundColor' && !style.property.startsWith('text')) ||
        style.property === 'backgroundBlendMode' || 
        style.property === 'backgroundImage' ||
        style.property === 'backgroundSize' ||
        style.property === 'backgroundRepeat' ||
        style.property === 'backgroundPosition') {
      gradientStyles.push(style);
      continue;
    }
    
    if (FONT_PROPERTIES.includes(style.property)) {
      fontStyles.push(style);
      continue;
    }
 
    if (TEXT_PROPERTIES.includes(style.property) || 
        style.property.startsWith('text') || 
        style.property === 'color') {
      textStyles.push(style);
      continue;
    }

    
    if (style.property === 'position' || 
        style.property === 'top' ||
        style.property === 'right' ||
        style.property === 'bottom' ||
        style.property === 'left' ||
        style.property === 'zIndex') {
      positionStyles.push(style);
      continue;
    }

    // Animation styles (transitions and animations)
    if (style.property.startsWith('transition') || 
        style.property === 'animation') {
      animationStyles.push(style);
      continue;
    }

    let converted: Partial<FigmaStyleProperties> = {};

    
    if (style.property.startsWith('aspect')) {
      converted = convertAspectToFigma(style);
    } else if (style.property.includes('blendMode')) {
      const blendResult = convertBlendToFigma(style);
      if ('blendMode' in blendResult) {
        converted = blendResult as Partial<FigmaStyleProperties>;
      }
    } else if (style.property.startsWith('border') || style.property.startsWith('stroke') || style.property === 'dashPattern') {
      converted = convertBorderToFigma(style);
    } else if (style.property.includes('blur') || style.property === 'dropShadow') {
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
      || style.property === 'grid'
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

    
    Object.assign(result, converted);
  }

  
  if (positionStyles.length > 0) {
    const positionResult = convertPositionToFigma(positionStyles);
    Object.assign(result, positionResult);
  }

  
  if (fontStyles.length > 0) {
    const fontResult = convertFontToFigma(fontStyles);
    Object.assign(result, fontResult);
  }

  
  if (textStyles.length > 0) {
    for (const style of textStyles) {
      const textResult = convertTextToFigma(style);
      Object.assign(result, textResult);
    }
  }

  // Handle animation styles  
  if (animationStyles.length > 0) {
    const animationResult = convertAnimationToFigma(animationStyles);
    Object.assign(result, animationResult);
  }

  
  const fills: FigmaPaint[] = [];
  if (gradientStyles.length > 0) {
    // backgroundColor를 시작점으로 gradientStyles를 그룹화
    const backgroundGroups: ParsedStyle[][] = [];
    let currentGroup: ParsedStyle[] = [];

    for (const style of gradientStyles) {
      if (style.property === 'backgroundColor' || style.property === 'backgroundImage') {
        // 새로운 background 그룹 시작
        if (currentGroup.length > 0) {
          backgroundGroups.push(currentGroup);
        }
        currentGroup = [style];
      } else {
        // 현재 그룹에 속성 추가
        currentGroup.push(style);
      }
    }

    // 마지막 그룹 추가
    if (currentGroup.length > 0) {
      backgroundGroups.push(currentGroup);
    }

    // 각 그룹을 개별적으로 처리
    for (const group of backgroundGroups) {

      if (group[0].property === 'backgroundColor') {  
        if (group[0].value === 'linear' || group[0].value === 'radial' || group[0].value === 'conic') {
          const groupFills = convertGradientToFigma(group);
          fills.push(...groupFills);
        } else {
          const groupFills = convertBackgroundToFigma(group);
          fills.push(...groupFills);
        }
      } else if (group[0].property === 'backgroundImage') {
        const groupFills = convertImageToFigma(group);
        fills.push(...groupFills);
      }
    }
  }

  // Always set fills even when fills.length > 0
  // Because figma.createFrame() automatically adds fills,
  // which could result in unintended colors being added
  if (Array.isArray(result.fills)) {
    result.fills = [...result.fills, ...fills];
  } else {
    result.fills = fills;
  }

  return result as FigmaStyleProperties;
}

export function convertStylesToCss(styles: ParsedStyle[]): Record<string, string> {
  const result: Record<string, string> = {};
  let backgroundStyles: ParsedStyle[] = [];
  let fontStyles: ParsedStyle[] = [];
  let textStyles: ParsedStyle[] = [];
  let positionStyles: ParsedStyle[] = [];
  let animationStyles: ParsedStyle[] = [];

  // Group styles by category
  for (const style of styles) {
    // Background and gradient styles
    if (style.property.startsWith('gradient') || 
        (style.property === 'backgroundColor' && !style.property.startsWith('text')) ||
        style.property === 'backgroundBlendMode' || 
        style.property === 'backgroundImage' ||
        style.property === 'backgroundSize' ||
        style.property === 'backgroundRepeat' ||
        style.property === 'backgroundPosition') {
      backgroundStyles.push(style);
      continue;
    }
    
    // Font styles
    if (FONT_PROPERTIES.includes(style.property)) {
      fontStyles.push(style);
      continue;
    }
 
    // Text styles
    if (TEXT_PROPERTIES.includes(style.property) || 
        style.property.startsWith('text') || 
        style.property === 'color') {
      textStyles.push(style);
      continue;
    }

    // Position styles (group these for complex positioning)
    if (style.property === 'position' || 
        style.property === 'top' ||
        style.property === 'right' ||
        style.property === 'bottom' ||
        style.property === 'left' ||
        style.property === 'zIndex') {
      positionStyles.push(style);
      continue;
    }

    // Animation styles (transitions and animations) 
    if (style.property.startsWith('transition') || 
        style.property === 'animation') {
      animationStyles.push(style);
      continue;
    }

    let converted: Record<string, string> = {};

    // Convert individual style properties
    if (style.property.startsWith('aspect')) {
      converted = convertAspectToCss(style);
    } else if (style.property.includes('blendMode')) {
      converted = convertBlendToCss(style);
    } else if (style.property.startsWith('border') || style.property.startsWith('stroke') || style.property === 'dashPattern') {
      converted = convertBorderToCss(style);
    } else if (style.property.includes('blur') || style.property === 'dropShadow') {
      converted = convertFilterToCss(style);
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
      || style.property === 'grid'
      || style.property === 'counterAxisAlignItems'
      || style.property === 'primaryAxisAlignItems'
    ) {
      converted = convertLayoutToCss(style);
    } else if (style.property === 'overflow') {
      converted = convertOverflowToCss(style);
    } else if (style.property.includes('boxShadow')) {
      converted = convertShadowToCss(style);
    } else if (style.property === 'opacity') {
      converted = convertShapeToCss(style);
    } else if (
      style.property.startsWith('padding') 
      || style.property === 'gap'
      || style.property === 'counterAxisSpacing'
      || style.property === 'itemSpacing'
    ) {
      converted = convertSpacingToCss(style);
    } else if (style.property === 'rotation') {
      converted = convertTransformToCss(style);
    }

    // Merge converted styles
    Object.assign(result, converted);
  }

  // Process grouped styles
  if (positionStyles.length > 0) {
    const positionResult = convertPositionToCss(positionStyles);
    Object.assign(result, positionResult);
  }

  if (fontStyles.length > 0) {
    const fontResult = convertFontToCss(fontStyles);
    Object.assign(result, fontResult);
  }

  if (textStyles.length > 0) {
    for (const style of textStyles) {
      const textResult = convertTextToCss(style);
      Object.assign(result, textResult);
    }
  }

  // Handle animation styles
  if (animationStyles.length > 0) {
    // Convert ParsedStyle[] to ParsedClassName[] for animation converter
    const animationClassNames = animationStyles.map(style => {
      // Ensure value is converted to string or valid ParsedClassName value type
      let validValue: string | number | number[] | string[];
      if (typeof style.value === 'string' || typeof style.value === 'number') {
        validValue = style.value;
      } else if (Array.isArray(style.value)) {
        validValue = style.value as number[] | string[];
      } else {
        validValue = String(style.value);
      }
      
      return {
        className: `${style.property}-${validValue}`, // synthetic className
        property: style.property,
        value: validValue,
        variant: (style.variant || 'preset') as 'arbitrary' | 'preset'
      };
    });
    
    const animationCSS = convertAnimationToCSS(animationClassNames);
    if (animationCSS) {
      // Parse the CSS string and extract properties
      const lines = animationCSS.split('\n').filter(line => line.trim());
      for (const line of lines) {
        const match = line.match(/^(.+?):\s*(.+?);$/);
        if (match) {
          const [, property, value] = match;
          result[property.trim()] = value.trim();
        }
      }
    }
  }

  // Handle background styles (including gradients)
  if (backgroundStyles.length > 0) {
    // Group background styles similar to Figma converter
    const backgroundGroups: ParsedStyle[][] = [];
    let currentGroup: ParsedStyle[] = [];

    for (const style of backgroundStyles) {
      if (style.property === 'backgroundColor' || style.property === 'backgroundImage') {
        // Start new background group
        if (currentGroup.length > 0) {
          backgroundGroups.push(currentGroup);
        }
        currentGroup = [style];
      } else {
        // Add property to current group
        currentGroup.push(style);
      }
    }

    // Add the last group
    if (currentGroup.length > 0) {
      backgroundGroups.push(currentGroup);
    }

    // Process each group individually
    for (const group of backgroundGroups) {
      let backgroundResult: Record<string, string> = {};

      if (group[0].property === 'backgroundColor') {  
        if (group[0].value === 'linear' || group[0].value === 'radial' || group[0].value === 'conic') {
          backgroundResult = convertGradientToCss(group);
        } else {
          backgroundResult = convertBackgroundToCss(group);
        }
      } else if (group[0].property === 'backgroundImage') {
        backgroundResult = convertImageToCss(group);
      }

      Object.assign(result, backgroundResult);
    }
  }

  return result;
}

// Enhanced conversion result with prototyping information
export interface FigmaConversionResult extends FigmaStyleProperties {
  prototyping: {
    reactions: FigmaReaction[];
    recommendations: string[];
    animationMetadata: any;
  };
}

// Generate prototyping information from styles
export function generatePrototypingInfo(styles: ParsedStyle[]): FigmaConversionResult['prototyping'] {
  const animationStyles = styles.filter(style => 
    style.property.startsWith('transition') || 
    style.property === 'animation'
  );

  const prototypingSuggestions = generatePrototypeSuggestions(animationStyles);
  const animationMetadata = extractAnimationMetadata(animationStyles);

  return {
    reactions: prototypingSuggestions.reactions,
    recommendations: prototypingSuggestions.recommendations,
    animationMetadata
  };
} 
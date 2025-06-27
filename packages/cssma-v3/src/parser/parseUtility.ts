// 모든 Tailwind 유틸리티 파서를 통합 호출하는 parseUtility
// parseModifier와 동일한 패턴

import { parseBackgroundAttachment } from './utilities/backgroundAttachment';
import { parseBackgroundClip } from './utilities/backgroundClip';
import { parseBackgroundColor } from './utilities/backgroundColor';
import { parseBackgroundImage } from './utilities/backgroundImage';
import { parseBackgroundOrigin } from './utilities/backgroundOrigin';
import { parseBackgroundPosition } from './utilities/backgroundPosition';
import { parseBackgroundRepeat } from './utilities/backgroundRepeat';
import { parseBackgroundSize } from './utilities/backgroundSize';
import { parseContent } from './utilities/content';
import { parseGradientStop } from './utilities/gradientStops';
import { parseTextAlign } from './utilities/textAlign';
import { parseTextDecorationLine } from './utilities/textDecorationLine';
import { parseTextDecorationColor } from './utilities/textDecorationColor';
import { parseTextDecorationStyle } from './utilities/textDecorationStyle';
import { parseTextDecorationThickness } from './utilities/textDecorationThickness';
import { parseTextUnderlineOffset } from './utilities/textUnderlineOffset';
import { parseTextTransform } from './utilities/textTransform';
import { parseTextOverflow } from './utilities/textOverflow';
import { parseTextWrap } from './utilities/textWrap';
import { parseTextIndent } from './utilities/textIndent';
import { parseVerticalAlign } from './utilities/verticalAlign';
import { parseWhiteSpace } from './utilities/whiteSpace';
import { parseWordBreak } from './utilities/wordBreak';
import { parseOverflowWrap } from './utilities/overflowWrap';
import { parseHyphens } from './utilities/hyphens';
import { parsePadding } from './utilities/padding';
import { parseMargin } from './utilities/margin';
import { parseFlexGrow } from './utilities/flexGrow';
import { parseFlexShrink } from './utilities/flexShrink';
import { parseOrder } from './utilities/order';
import { parseAlignItems } from './utilities/alignItems';
import { parseAlignSelf } from './utilities/alignSelf';
import { parseJustifySelf } from './utilities/justifySelf';
import { parseColumns } from './utilities/columns';
import { parseGridTemplateColumns } from './utilities/gridTemplateColumns';
import { parseGridTemplateRows } from './utilities/gridTemplateRows';
import { parseGridAutoColumns } from './utilities/gridAutoColumns';
import { parseGridAutoRows } from './utilities/gridAutoRows';
import { parseGridRow } from './utilities/gridRow';
import { parseRowEnd } from './utilities/rowEnd';
import { parseColEnd } from './utilities/colEnd';
import { parseFontFamily } from './utilities/fontFamily';
import { parseLineClamp } from './utilities/lineClamp';
import { parseLineHeight } from './utilities/lineHeight';
import { parseBreakBefore } from './utilities/breakBefore';
import { parseBreakAfter } from './utilities/breakAfter';
import { parseBreakInside } from './utilities/breakInside';
import { parseDisplay } from './utilities/display';
import { parseFloat } from './utilities/float';
import { parseClear } from './utilities/clear';
import { parseBox } from './utilities/box';
import { parseZIndex } from './utilities/zIndex';
import { parseVisibility } from './utilities/visibility';
import { parseFlex } from './utilities/flex';
import { parseFlexBasis } from './utilities/flexBasis';
import { parseGap } from './utilities/gap';
import { parseGridColumn } from './utilities/gridColumn';
import { parseGridAutoFlow } from './utilities/gridAutoFlow';
import { parseColSpan } from './utilities/colSpan';
import { parseColStart } from './utilities/colStart';
import { parseRowSpan } from './utilities/rowSpan';
import { parseRowStart } from './utilities/rowStart';
import { parseObjectFit } from './utilities/objectFit';
import { parseObjectPosition } from './utilities/objectPosition';
import { parsePosition } from './utilities/position';
import { parseInset } from './utilities/inset';
import { parseWidth } from './utilities/width';
import { parseMinWidth } from './utilities/minWidth';
import { parseMaxWidth } from './utilities/maxWidth';
import { parseHeight } from './utilities/height';
import { parseMinHeight } from './utilities/minHeight';
import { parseMaxHeight } from './utilities/maxHeight';
import { parseListStyleType } from './utilities/listStyleType';
import { parseListStylePosition } from './utilities/listStylePosition';
import { parseListStyleImage } from './utilities/listStyleImage';
import { parseLetterSpacing } from './utilities/letterSpacing';
import { parseFontWeight } from './utilities/fontWeight';
import { parseFontStyle } from './utilities/fontStyle';
import { parseFontSmoothing } from './utilities/fontSmoothing';
import { parseFontStretch } from './utilities/fontStretch';
import { parseFontSize } from './utilities/fontSize';
import { parseFontVariantNumeric } from './utilities/fontVariantNumeric';
import { parseIsolation } from './utilities/isolation';
import { parseBoxDecorationBreak } from './utilities/boxDecorationBreak';
import { parseTextColor } from './utilities/color';
import { parseJustifyContent } from './utilities/justifyContent';
import { parseBorderRadius } from './utilities/borderRadius';
import { parseBorderWidth } from './utilities/borderWidth';
import { parseBorderColor } from './utilities/borderColor';
import { parseBorderStyle } from './utilities/borderStyle';
import { parseOutlineWidth } from './utilities/outlineWidth';
import { parseOutlineColor } from './utilities/outlineColor';
import { parseOutlineStyle } from './utilities/outlineStyle';
import { parseOutlineOffset } from './utilities/outlineOffset';
import { parseOpacity } from './utilities/opacity';
import { parseMixBlendMode } from './utilities/mixBlendMode';
import { parseBackgroundBlendMode } from './utilities/backgroundBlendMode';
import { parseMaskClip } from './utilities/maskClip';
import { parseMaskComposite } from './utilities/maskComposite';
import { parseMaskImage } from './utilities/maskImage';
import { parseMaskMode } from './utilities/maskMode';
import { parseMaskOrigin } from './utilities/maskOrigin';
import { parseMaskPosition } from './utilities/maskPosition';
import { parseMaskRepeat } from './utilities/maskRepeat';
import { parseMaskSize } from './utilities/maskSize';
import { parseMaskType } from './utilities/maskType';
// ... (spacing, flex/grid 등 추가 가능)

const utilityParsers = [
  // Layout & Display
  parseDisplay,
  parseFloat,
  parseClear,
  parseBox,
  parseBorderRadius,
  parseBorderWidth,
  parseBorderColor,
  parseBorderStyle,
  parseOutlineStyle,
  parseOutlineWidth,
  parseOutlineColor,
  parseOutlineOffset,
  parseZIndex,
  parseVisibility,
  parsePosition,
  parseInset,
  // Flex/Grid
  parseFlex,
  parseFlexGrow,
  parseFlexShrink,
  parseFlexBasis,
  parseOrder,
  parseGap,
  parseAlignItems,
  parseAlignSelf,
  parseJustifySelf,
  parseColumns,
  parseGridTemplateColumns,
  parseGridTemplateRows,
  parseGridAutoColumns,
  parseGridAutoRows,
  parseGridRow,
  parseGridColumn,
  parseGridAutoFlow,
  parseColSpan,
  parseColStart,
  parseColEnd,
  parseRowSpan,
  parseRowStart,
  parseRowEnd,
  parseColEnd,
  // Sizing
  parseWidth,
  parseMinWidth,
  parseMaxWidth,
  parseHeight,
  parseMinHeight,
  parseMaxHeight,
  // Spacing
  parsePadding,
  parseMargin,
  // Object
  parseObjectFit,
  parseObjectPosition,
  // Typography
  parseTextColor,
  parseTextAlign,
  parseAlignItems,
  parseJustifyContent,
  parseFontFamily,
  parseFontWeight,
  parseFontStyle,
  parseFontSmoothing,
  parseFontStretch,
  parseFontSize,
  parseLineClamp,
  parseLineHeight,
  parseLetterSpacing,
  parseFontVariantNumeric,
  parseTextDecorationLine,
  parseTextDecorationColor,
  parseTextDecorationStyle,
  parseTextDecorationThickness,
  // List
  parseListStyleType,
  parseListStylePosition,
  parseListStyleImage,
  // Break utilities
  parseBreakBefore,
  parseBreakAfter,
  parseBreakInside,
  // Background (구체적 → 범용 순서)
  parseBackgroundSize,
  parseBackgroundRepeat,
  parseBackgroundOrigin,
  parseBackgroundPosition,
  parseBackgroundClip,
  parseBackgroundAttachment,
  parseBackgroundImage,
  parseBackgroundColor,
  // Content
  parseContent,
  // Gradient stops
  parseGradientStop,
  // Box Decoration
  parseBoxDecorationBreak,
  // Isolation
  parseIsolation,
  // Typography
  parseTextUnderlineOffset,
  parseTextTransform,
  parseTextOverflow,
  parseTextWrap,
  parseTextIndent,
  parseVerticalAlign,
  parseWhiteSpace,
  parseWordBreak,
  parseOverflowWrap,
  parseHyphens,
  // Effects
  parseOpacity,
  parseMixBlendMode,
  parseBackgroundBlendMode,
  parseMaskClip,
  parseMaskComposite,
  parseMaskImage,
  parseMaskMode,
  parseMaskOrigin,
  parseMaskPosition,
  parseMaskRepeat,
  parseMaskSize,
  parseMaskType,
  // ... (spacing, flex/grid 등 확장 가능)
];

export function parseUtility(token: string): any {
  for (const parser of utilityParsers) {
    const result = parser(token);
    if (result) return result;
  }
  return { type: 'unknown', raw: token };
} 
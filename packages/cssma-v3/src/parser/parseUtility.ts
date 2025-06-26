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
// ... (spacing, flex/grid 등 추가 가능)

const utilityParsers = [
  // Spacing
  parsePadding,
  parseMargin,
  // Flex/Grid
  parseFlexGrow,
  parseFlexShrink,
  parseOrder,
  parseAlignItems,
  parseAlignSelf,
  parseJustifySelf,
  parseColumns,
  parseGridTemplateColumns,
  parseGridTemplateRows,
  parseGridAutoColumns,
  parseGridAutoRows,
  parseGridRow,
  parseRowEnd,
  parseColEnd,
  // Typography
  parseFontFamily,
  parseLineClamp,
  parseLineHeight,
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
  // Typography
  parseTextAlign,
  parseTextDecorationLine,
  parseTextDecorationColor,
  parseTextDecorationStyle,
  parseTextDecorationThickness,
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
  // ... (spacing, flex/grid 등 확장 가능)
];

export function parseUtility(token: string): any {
  for (const parser of utilityParsers) {
    const result = parser(token);
    if (result) return result;
  }
  return { type: 'unknown', raw: token };
} 
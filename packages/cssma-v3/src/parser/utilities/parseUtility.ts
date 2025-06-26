// 모든 Tailwind 유틸리티 파서를 통합 호출하는 parseUtility
// parseModifier와 동일한 패턴

import { parseBackgroundAttachment } from './backgroundAttachment';
import { parseBackgroundClip } from './backgroundClip';
import { parseBackgroundColor } from './backgroundColor';
import { parseBackgroundImage } from './backgroundImage';
import { parseBackgroundOrigin } from './backgroundOrigin';
import { parseBackgroundPosition } from './backgroundPosition';
import { parseBackgroundRepeat } from './backgroundRepeat';
import { parseBackgroundSize } from './backgroundSize';
import { parseContent } from './content';
import { parseGradientStop } from './gradientStops';
import { parseTextAlign } from './textAlign';
import { parseTextDecorationLine } from './textDecorationLine';
import { parseTextDecorationColor } from './textDecorationColor';
import { parseTextDecorationStyle } from './textDecorationStyle';
import { parseTextDecorationThickness } from './textDecorationThickness';
import { parseTextUnderlineOffset } from './textUnderlineOffset';
import { parseTextTransform } from './textTransform';
import { parseTextOverflow } from './textOverflow';
import { parseTextWrap } from './textWrap';
import { parseTextIndent } from './textIndent';
import { parseVerticalAlign } from './verticalAlign';
import { parseWhiteSpace } from './whiteSpace';
import { parseWordBreak } from './wordBreak';
import { parseOverflowWrap } from './overflowWrap';
import { parseHyphens } from './hyphens';
// ... (spacing, flex/grid 등 추가 가능)

const utilityParsers = [
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
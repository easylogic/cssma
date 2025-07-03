// 모든 Tailwind 유틸리티 파서를 통합 호출하는 parseUtility
// parseModifier와 동일한 패턴

import { parseBackground } from './utilities/background';
import { parseBorder } from './utilities/border';
import { parseBreak } from './utilities/break';
import { parseColor } from './utilities/color';
import { parseEffects } from './utilities/effects';
import { parseFlexGrid } from './utilities/flexGrid';
import { parseFont } from './utilities/font';
import { parseGradient } from './utilities/gradient';
import { parseGrid } from './utilities/grid';
import { parseInteractivity } from './utilities/interactivity';
import { parseLayout } from './utilities/layout';
import { parseList } from './utilities/list';
import { parseMask } from './utilities/mask';
import { parseMisc } from './utilities/misc';
import { parseObject } from './utilities/object';
import { parseOutline } from './utilities/outline';
import { parseOverflow } from './utilities/overflow';
import { parsePosition } from './utilities/position';
import { parseScroll } from './utilities/scroll';
import { parseSizing } from './utilities/sizing';
import { parseSpacing } from './utilities/spacing';
import { parseSVG } from './utilities/svg';
import { parseTable } from './utilities/table';
import { parseText } from './utilities/text';
import { parseTypography } from './utilities/typography';
import { parseTransition } from './utilities/transition';
import { parseTransform } from './utilities/transform';
import { parseColorScheme } from './utilities/colorScheme';
import { parseBox } from './utilities/box';


import type { ParsedUtility, CssmaContext } from '../types';

const utilityParsers = [
  // 순서: specificity/우선순위 고려 (예: background → gradient → color 등)
  parseMisc,
  parseBreak,
  parseBorder,
  parseBox,
  parseOutline,
  parseMask,
  parseBackground,
  parseGradient,
  parseColor,
  parseEffects,
  parseTable,
  parseGrid,
  parseFlexGrid,
  parseLayout,
  parseObject,
  parseOverflow,
  parsePosition,
  parseSizing,
  parseSpacing,
  parseScroll,
  parseList,
  parseFont,
  parseTypography,
  parseText,
  parseSVG,
  parseInteractivity,
  parseTransition,
  parseTransform,
  parseColorScheme,
];

export function parseUtility(token: string, context?: CssmaContext): ParsedUtility {
  let important = false;
  if (token.endsWith('!')) {
    important = true;
    token = token.slice(0, -1);
  }
  for (const parser of utilityParsers) {
    const result = parser(token, context);
    if (result) {
      if (important) result.important = true;
      return result;
    }
  }
  const unknown: ParsedUtility = { type: 'unknown', raw: token };
  if (important) unknown.important = true;
  return unknown;
} 